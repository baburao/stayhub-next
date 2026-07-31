/**
 * POST /api/lead — receives demo-request details from the browser and forwards
 * them to the configured sink (a Google Sheet, via lib/saveLead.ts).
 *
 * This exists so the browser never talks to Google directly: the webhook secret
 * stays on the server. A credential shipped in client JS is public.
 *
 * Setup: docs/GOOGLE_SHEET_LEAD_CAPTURE.md
 */
import { saveLead, type Lead, type LeadStatus } from '@/lib/saveLead';

const VALID_STATUSES: LeadStatus[] = ['details_submitted', 'slot_booked'];

/** Field length caps — a lead is a name and a phone number, not an essay. */
const MAX = {
  leadId: 64,
  name: 120,
  phone: 24,
  units: 24,
  language: 8,
  page: 200,
  userAgent: 300,
};

// Best-effort in-process rate limit. On serverless this is per-instance, so it
// is a speed bump against casual spam, not a real defence. The shared secret is
// what actually protects the Sheet.
const RATE_LIMIT = { max: 10, windowMs: 60_000 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });

    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [key, value] of hits) {
        if (now > value.resetAt) hits.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * Store phones in one consistent E.164-ish shape: +966 followed by the
 * subscriber digits. The form collects the local part only, and people type it
 * both with and without the national leading zero.
 */
function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('966')) digits = digits.slice(3);
  digits = digits.replace(/^0+/, '');

  return digits ? `+966${digits}` : '';
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: a hidden field no human ever fills in. Bots fill everything.
  // Answer 200 so the bot believes it succeeded and doesn't retry.
  if (str(body.company, 100)) {
    return Response.json({ ok: true });
  }

  const leadId = str(body.leadId, MAX.leadId);
  if (!leadId) {
    return Response.json({ ok: false, error: 'missing_lead_id' }, { status: 400 });
  }

  const status = VALID_STATUSES.includes(body.status as LeadStatus)
    ? (body.status as LeadStatus)
    : 'details_submitted';

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const lead: Lead = {
    leadId,
    status,
    name: str(body.name, MAX.name),
    phone: normalizePhone(str(body.phone, MAX.phone)),
    units: str(body.units, MAX.units),
    language: str(body.language, MAX.language),
    page: str(body.page, MAX.page),
    userAgent: str(request.headers.get('user-agent'), MAX.userAgent),
  };

  const result = await saveLead(lead);

  if (!result.ok) {
    // Logged, not surfaced: the visitor's booking must not fail because a
    // spreadsheet write did. The status flip gives us a second chance anyway.
    console.error('[lead] save failed:', result.error, { leadId, status });
  }

  // Always 200 — the client fires this without awaiting and ignores the body.
  // The payload is here for curl-based verification during setup.
  return Response.json(result);
}
