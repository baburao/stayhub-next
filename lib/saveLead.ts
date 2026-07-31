/**
 * The single place that knows where demo-request leads are stored.
 *
 * Today that is a Google Sheet behind an Apps Script Web App. Swapping to a
 * real database, a CRM, or the client's own Sheet should only ever touch this
 * file — callers just hand over a `Lead`.
 *
 * Server-side only. The webhook secret must never reach the browser.
 *
 * Setup: docs/GOOGLE_SHEET_LEAD_CAPTURE.md
 */

/**
 * `details_submitted` — gave us a name and phone number.
 * `slot_booked`      — went on to actually pick a Calendly slot.
 *
 * The first is written before Calendly loads, deliberately: someone who hands
 * over a phone number and then abandons the booking is still a real lead.
 */
export type LeadStatus = 'details_submitted' | 'slot_booked';

export interface Lead {
  /** Idempotency key. Same id = same row, so a status flip updates in place. */
  leadId: string;
  status: LeadStatus;
  name?: string;
  phone?: string;
  units?: string;
  /** Which language the visitor was browsing in — 'ar' | 'en'. */
  language?: string;
  /** Path the demo modal was opened from. */
  page?: string;
  userAgent?: string;
}

export type SaveLeadResult =
  | { ok: true; action?: string }
  | { ok: false; error: string };

/** Give up rather than hold a request open if Google is slow. */
const TIMEOUT_MS = 10_000;

/**
 * Write a lead to the configured sink.
 *
 * Never throws — a storage failure must not break the booking flow. Callers
 * get a result they can log and move on from.
 */
export async function saveLead(lead: Lead): Promise<SaveLeadResult> {
  // Read env at call time, not module load, so a restart picks up .env.local
  // edits and a missing var never crashes the build.
  const url = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_WEBHOOK_SECRET;

  if (!url || !secret) {
    return { ok: false, error: 'lead_sink_not_configured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, secret }),
      // Apps Script 302s to script.googleusercontent.com; fetch follows it.
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      return { ok: false, error: `sink_http_${res.status}` };
    }

    // A misconfigured Web App answers with an HTML login page, not JSON.
    const text = await res.text();
    let payload: { ok?: boolean; error?: string; action?: string };
    try {
      payload = JSON.parse(text);
    } catch {
      return { ok: false, error: 'sink_returned_non_json' };
    }

    if (!payload.ok) {
      return { ok: false, error: payload.error ?? 'sink_rejected' };
    }

    return { ok: true, action: payload.action };
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { ok: false, error: 'sink_timeout' };
    }
    return { ok: false, error: 'sink_unreachable' };
  }
}

/** Whether a sink is configured. Used to keep logs quiet before setup. */
export function isLeadSinkConfigured(): boolean {
  return Boolean(process.env.LEADS_WEBHOOK_URL && process.env.LEADS_WEBHOOK_SECRET);
}
