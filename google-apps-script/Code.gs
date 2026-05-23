/**
 * Portfolio contact form → Gmail (Google Apps Script web app).
 *
 * Deploy: see docs/GMAIL_CONTACT_FORM.md
 * Set Script property CONTACT_TO if you want a different inbox (optional).
 */

var SUBJECT_PREFIX = '[Portfolio]';

function doGet() {
  return ContentService.createTextOutput('Portfolio contact form endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload._gotcha) {
      return jsonResponse({ ok: true });
    }

    var name = String(payload.name || '').trim();
    var email = String(payload.email || '').trim();
    var phone = String(payload.phone || '').trim();
    var subject = String(payload.subject || 'New contact message').trim();
    var message = String(payload.message || '').trim();

    if (name.length < 3) {
      return jsonResponse({ error: 'Invalid name' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Invalid email' });
    }
    if (message.length < 1) {
      return jsonResponse({ error: 'Invalid message' });
    }

    subject = subject.replace(/[\r\n]+/g, ' ').slice(0, 300);
    var to = getContactTo();
    var fullSubject = SUBJECT_PREFIX + ' ' + subject;
    var phoneLine = phone ? '\nPhone: ' + phone : '';
    var textBody = 'From: ' + name + ' <' + email + '>' + phoneLine + '\n\n' + message;

    GmailApp.sendEmail(to, fullSubject, textBody, {
      replyTo: email,
      name: name,
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ error: 'Send failed' });
  }
}

function getContactTo() {
  var configured = PropertiesService.getScriptProperties().getProperty('CONTACT_TO');
  return configured || 'roshanshresthapnk@gmail.com';
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
