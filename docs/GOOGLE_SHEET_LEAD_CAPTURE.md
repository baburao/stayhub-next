# Google Sheet lead capture — setup guide

Demo-request details (name, phone, unit count) are written to a Google Sheet.

**Do this once.** It takes about 10 minutes. Nothing on the site changes until step 7 —
until the env vars are set the site behaves exactly as it does today, so it is safe to
deploy the code before finishing this guide.

---

## How it fits together

```
Browser (DemoModal)
   │  POST /api/lead        ← no secret, no Google credentials in client JS
   ▼
Next.js route handler  app/api/lead/route.ts
   │  validates, rate-limits, adds the shared secret
   ▼
lib/saveLead.ts        ← the ONLY place that knows where leads go
   │  POST + secret
   ▼
Google Apps Script Web App
   ▼
Google Sheet  ·  "Leads" tab
```

**Why the browser never calls Google directly:** any credential in client-side
JavaScript is public — anyone can read it in DevTools and write junk rows into the Sheet.
The server-side hop keeps the secret out of the browser entirely.

---

## Step 1 — Create the Sheet

1. Go to [sheets.new](https://sheets.new).
2. Name it something like **StayHub — Demo Leads**.
3. Leave it empty. The script creates the `Leads` tab and its header row on the first write.

---

## Step 2 — Open the script editor

In that Sheet: **Extensions → Apps Script**.

A new tab opens with a `Code.gs` file containing a stub `myFunction`.

---

## Step 3 — Paste the script

1. Select everything in the editor and delete it.
2. Copy the entire contents of [`scripts/apps-script/Code.gs`](../scripts/apps-script/Code.gs)
   from this repo and paste it in.
3. Click the **save** icon (or `Cmd+S`).

---

## Step 4 — Generate and store the shared secret

Generate a random secret. In your terminal:

```bash
openssl rand -hex 32
```

Copy the output — a 64-character string. You will use the **same value** twice: here and
in step 7.

In the Apps Script editor:

1. Click the **gear icon** (⚙ Project Settings) in the left sidebar.
2. Scroll to **Script Properties** → **Add script property**.
3. Property: `SHARED_SECRET`
4. Value: paste the string from `openssl`.
5. Click **Save script properties**.

> The secret lives here, not in `Code.gs`. That keeps it out of the repo.

---

## Step 5 — Test the script on its own

Before deploying, confirm the script can write to the Sheet.

1. Back in the editor (`< >` icon), pick **`testWrite`** from the function dropdown at the top.
2. Click **Run**.
3. Google will ask for authorization the first time:
   - **Review permissions** → pick your Google account
   - You'll see *"Google hasn't verified this app"* — this is expected for your own
     private script. Click **Advanced** → **Go to StayHub … (unsafe)** → **Allow**.
4. Switch to the Sheet. You should see a **Leads** tab with a header row and one test row.

Delete the test row when you're satisfied.

If it fails with `SHARED_SECRET is not set`, redo step 4.

---

## Step 6 — Deploy as a Web App

1. Top right: **Deploy → New deployment**.
2. Click the **gear** next to "Select type" → choose **Web app**.
3. Fill in:

   | Field | Value |
   |---|---|
   | Description | `StayHub lead capture` |
   | Execute as | **Me** (your account) |
   | Who has access | **Anyone** |

   ⚠ **"Anyone" is required** — not "Anyone with a Google account". Our server calls this
   without a Google login. The shared secret is what actually protects it; the script
   rejects any request without the right secret.

4. Click **Deploy**, authorize if prompted.
5. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

   Keep this URL — it's step 7.

> **When you later change `Code.gs`:** saving is not enough. Go to
> **Deploy → Manage deployments → ✏️ edit → Version: New version → Deploy**.
> Editing the existing deployment keeps the same URL. Creating a *new* deployment
> gives you a *different* URL and you'd have to update the env var.

---

## Step 7 — Wire it into the site

Create `.env.local` in the project root (it's gitignored — the secret never gets committed):

```bash
LEADS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
LEADS_WEBHOOK_SECRET="the-same-string-from-step-4"
```

Restart the dev server so Next.js picks them up:

```bash
PORT=3001 npm run dev
```

---

## Step 8 — Test the round trip

With the dev server running:

```bash
curl -X POST http://localhost:3001/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"leadId":"curl-test-1","name":"Curl Test","phone":"0501234567","units":"10-49","language":"en","status":"details_submitted"}'
```

Expect `{"ok":true}`. Check the Sheet — a row should appear, with the phone showing as
`0501234567` with its **leading zero intact**.

Then test the idempotency / status flip — same `leadId`, new status:

```bash
curl -X POST http://localhost:3001/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"leadId":"curl-test-1","status":"slot_booked"}'
```

The **same row** should flip to `slot_booked` — no second row. If you get a duplicate,
the Lead ID isn't matching; check that the Lead ID column is formatted as plain text.

Finally, test the real form: open http://localhost:3001, click **Book a Demo**, pick a unit
range, enter a name and phone, click **Choose a time slot**. A row appears immediately with
status `details_submitted` — you do not need to complete the Calendly booking.

Delete the test rows when done.

---

## Step 9 — Production

Add the same two variables to your hosting environment.

**On Vercel** — either the dashboard (Project → Settings → Environment Variables) or:

```bash
npx vercel env add LEADS_WEBHOOK_URL production
npx vercel env add LEADS_WEBHOOK_SECRET production
```

Then redeploy — env vars are baked in at deploy time, so an existing deployment will not
pick them up:

```bash
npx vercel deploy --prod --yes
```

**On the client's own server later:** set the same two variables in that environment.
Nothing else changes.

---

## What lands in the Sheet

| Column | Notes |
|---|---|
| Timestamp | When the row was first created (server time) |
| Lead ID | Idempotency key. Generated per demo-modal session. |
| Status | `details_submitted` → `slot_booked` |
| Name | As typed |
| Phone | Stored as **text**, prefixed `+966`. Leading zeros survive. |
| Units | `1-9`, `10-49`, `50-199`, `200+` |
| Language | `ar` or `en` — which language they browsed in |
| Page | The page they opened the modal from |
| User Agent | Rough device/browser signal |
| Last Updated | Bumped on the status flip |

### Why the write happens *before* Calendly

The row is written when someone submits their **name and phone**, not after they book a
slot. People who hand over a phone number and then abandon the Calendly step are still
real leads — arguably the ones most worth calling. Writing only on completed bookings
would throw them away.

`status` is how you tell them apart: filter for `details_submitted` to get the drop-offs.

---

## Switching to the client's Sheet later

The client repeats steps 1–6 on their own Google account and sends you the Web App URL
and secret. You change the two values in `.env.local` (and in the production environment),
redeploy, done. **No code changes** — that's the whole point of routing everything through
`lib/saveLead.ts`.

To move the *existing* leads across, File → Download the current Sheet as CSV and import
it into theirs.

---

## Two things to raise with the client

1. **PDPL.** Name and phone number are personal data, and they will sit on Google's
   servers outside Saudi Arabia. The client should knowingly accept Google as a data
   processor. The site still has **no cookie/consent banner** — that's a separate open item.
2. **Access.** Whoever owns the Sheet controls the leads. If the client's sales team needs
   them, share the Sheet with them directly rather than forwarding exports.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `{"ok":false,"error":"lead_sink_not_configured"}` | `LEADS_WEBHOOK_URL` or `LEADS_WEBHOOK_SECRET` missing. Env vars are read at request time — restart the dev server after editing `.env.local`. |
| `unauthorized` in the server logs | The secret in `.env.local` doesn't match the `SHARED_SECRET` script property. They must be byte-identical — watch for a trailing newline or a stray space when pasting. |
| `secret_not_configured` | Step 4 wasn't saved on the Apps Script side. |
| Row never appears, no error | The deployment is running an old version of the code. **Manage deployments → edit → New version**. |
| Sheet shows `501234567` (leading zero gone) | The phone column lost its plain-text format. Re-run `testWrite` — `getSheet()` reapplies it. |
| Google returns an HTML login page | "Who has access" is not set to **Anyone**. Redo step 6. |
| Duplicate rows for one person | Lead ID isn't matching on lookup. Confirm the Lead ID column is formatted as plain text. |
