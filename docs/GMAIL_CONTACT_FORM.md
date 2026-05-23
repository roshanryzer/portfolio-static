# Contact form via Gmail (Google Apps Script)

## 1. Create the script

1. Open [script.google.com](https://script.google.com) → **New project**
2. Paste in `google-apps-script/Code.gs` from this repo
3. (Optional) **Project settings → Script properties** → `CONTACT_TO` = your inbox email

## 2. Deploy

1. **Deploy → New deployment → Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Authorize Gmail when prompted
5. Copy the **Web app URL** (ends with `/exec`)

## 3. Configure the site

Local `.env`:

```text
VITE_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Production: same value as GitHub secret `VITE_CONTACT_FORM_ENDPOINT`, then push to `main`.

## 4. Test

Submit the contact form on `/contact` and confirm the email arrives in Gmail.
