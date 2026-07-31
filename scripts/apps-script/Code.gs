/**
 * StayHub — demo-request lead capture.
 *
 * Deployed as a Google Apps Script Web App. The StayHub site NEVER calls this
 * directly from the browser — the Next.js route handler at /api/lead calls it
 * server-side, so the shared secret is never exposed in client JavaScript.
 *
 * Setup instructions: docs/GOOGLE_SHEET_LEAD_CAPTURE.md
 */

/** Tab the leads are written to. Created automatically if missing. */
var SHEET_NAME = 'Leads';

/** Column order. Changing this re-writes the header row on the next request. */
var HEADERS = [
  'Timestamp',
  'Lead ID',
  'Status',
  'Name',
  'Phone',
  'Units',
  'Language',
  'Page',
  'User Agent',
  'Last Updated',
];

/** 1-based column indexes, derived from HEADERS. */
var COL_TIMESTAMP = 1;
var COL_LEAD_ID = 2;
var COL_STATUS = 3;
var COL_NAME = 4;
var COL_PHONE = 5;
var COL_UNITS = 6;
var COL_LANGUAGE = 7;
var COL_PAGE = 8;
var COL_USER_AGENT = 9;
var COL_UPDATED = 10;

/**
 * Entry point. Google calls this for every POST to the Web App URL.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'empty_body' });
    }

    var body = JSON.parse(e.postData.contents);

    // The secret lives in Script Properties, never in this file.
    // Project Settings -> Script Properties -> SHARED_SECRET
    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!expected) {
      return json({ ok: false, error: 'secret_not_configured' });
    }
    if (body.secret !== expected) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var leadId = String(body.leadId || '').trim();
    if (!leadId) {
      return json({ ok: false, error: 'missing_lead_id' });
    }

    // Two browser tabs finishing at once must not clobber each other's row.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var result = upsertLead(leadId, body);
      return json({ ok: true, action: result.action, row: result.row });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Insert a new lead row, or update the existing row with the same Lead ID.
 *
 * The site posts twice for one person: once when they submit name + phone
 * (status "details_submitted") and again if they actually pick a Calendly slot
 * (status "slot_booked"). The second post must update the first row, not add
 * a duplicate — that is what makes Lead ID the idempotency key.
 */
function upsertLead(leadId, body) {
  var sheet = getSheet();
  var now = new Date();

  var existingRow = findRowByLeadId(sheet, leadId);

  if (existingRow > 0) {
    // Only overwrite fields the caller actually sent, so a status-only
    // update can never blank out the name or phone.
    if (body.status) sheet.getRange(existingRow, COL_STATUS).setValue(body.status);
    if (body.name) sheet.getRange(existingRow, COL_NAME).setValue(body.name);
    if (body.phone) sheet.getRange(existingRow, COL_PHONE).setValue(String(body.phone));
    if (body.units) sheet.getRange(existingRow, COL_UNITS).setValue(body.units);
    if (body.language) sheet.getRange(existingRow, COL_LANGUAGE).setValue(body.language);
    if (body.page) sheet.getRange(existingRow, COL_PAGE).setValue(body.page);
    sheet.getRange(existingRow, COL_UPDATED).setValue(now);
    return { action: 'updated', row: existingRow };
  }

  sheet.appendRow([
    now,
    leadId,
    body.status || 'details_submitted',
    body.name || '',
    String(body.phone || ''),
    body.units || '',
    body.language || '',
    body.page || '',
    body.userAgent || '',
    now,
  ]);

  return { action: 'appended', row: sheet.getLastRow() };
}

/**
 * Find the row holding a Lead ID, or 0 if it is not present.
 * Row 1 is the header, so data starts at row 2.
 */
function findRowByLeadId(sheet, leadId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  var ids = sheet.getRange(2, COL_LEAD_ID, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === leadId) {
      return i + 2;
    }
  }
  return 0;
}

/**
 * Return the Leads sheet, creating and formatting it on first use.
 */
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Header row — written once, then kept in sync if HEADERS changes.
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  var current = headerRange.getValues()[0];
  if (current.join('|') !== HEADERS.join('|')) {
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Sheets otherwise strips the leading 0 from "0501234567" and mangles
  // "+966..." into a formula-ish value. Plain-text format keeps them intact.
  sheet.getRange(1, COL_PHONE, sheet.getMaxRows(), 1).setNumberFormat('@');
  sheet.getRange(1, COL_LEAD_ID, sheet.getMaxRows(), 1).setNumberFormat('@');

  return sheet;
}

/** JSON response helper. */
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once from the Apps Script editor to confirm the sheet and the
 * secret are wired up correctly. It writes a row you can safely delete.
 */
function testWrite() {
  var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  if (!secret) {
    throw new Error('SHARED_SECRET is not set in Project Settings -> Script Properties');
  }

  var res = upsertLead('test-' + Date.now(), {
    status: 'details_submitted',
    name: 'Test Lead',
    phone: '+966500000000',
    units: '10-49',
    language: 'ar',
    page: '/',
    userAgent: 'apps-script-test',
  });

  Logger.log('Wrote row %s (%s)', res.row, res.action);
}
