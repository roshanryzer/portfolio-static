# Contact form via Gmail (Google Apps Script)

The static site sends contact submissions to your **Gmail inbox** using a free
Google Apps Script web app. No backend server, EC2, or Formspree required.

## 1. Create the script

1. Open [Google Apps Script](https://script.google.com).
2. **New project**.
3. Replace the default `Code.gs` with the contents of
   `google-apps-script/Code.gs` from this repo.
4. (Optional) **Project settings** → **Script properties** → add:
   - `CONTACT_TO` = `roshanshresthapnk@gmail.com` (or another inbox)

## 2. Deploy as web app

1. **Deploy** → **New deployment**.
2. Type: **Web app**.
3. **Execute as:** Me (`roshanshresthapnk@gmail.com`).
4. **Who has access:** Anyone.
5. Deploy and **Authorize** when prompted (Gmail send permission).
6. Copy the **Web app URL** (ends with `/exec`).

Example:

```text
https://script.google.com/macros/s/AKfycbx.../exec
```

## 3. Configure the static site

**Local** — create `.env`:

```text
VITE_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Production** — GitHub → `portfolio-static` → Settings → Secrets → Actions:

| Secret | Value |
| --- | --- |
| `VITE_CONTACT_FORM_ENDPOINT` | Your Apps Script `/exec` URL |

Push to `main` to redeploy, or run `npm run build` and sync to S3 manually.

## 4. Verify

1. Open `/contact` on the site.
2. Submit the form — button should say **Send message** (not “Open in email app”).
3. Check your Gmail inbox for `[Portfolio] ...` message.
4. **Reply** in Gmail goes to the visitor’s email (`replyTo` is set).

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Form still opens mail client | Rebuild after setting `VITE_CONTACT_FORM_ENDPOINT`; hard-refresh browser |
| “Could not send message” | Redeploy Apps Script; confirm access is **Anyone** |
| No email received | Check Gmail spam; confirm `CONTACT_TO` / authorized account |
| CORS errors in console | Use `text/plain` POST (already handled in `Contact.tsx`) |

## Security notes

- Do **not** put Gmail passwords or App Passwords in the frontend or GitHub Secrets.
- The script runs as **your Google account**; only the public `/exec` URL is exposed.
- A hidden honeypot field (`_gotcha`) reduces basic bot spam.
