# Portfolio (static)

Static portfolio built with **React + Vite + TypeScript**.

Hosted on **AWS S3 + CloudFront + Route 53** with deploy on push to `main`.

Live site: `https://roshan-shrestha.com`

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Contact form (Gmail)

Set up Google Apps Script once: [docs/GMAIL_CONTACT_FORM.md](docs/GMAIL_CONTACT_FORM.md)

```bash
cp .env.example .env
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

GitHub Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`,
`FRONTEND_S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, and optionally
`VITE_CONTACT_FORM_ENDPOINT`.

## Layout

```text
├── src/                 React app
├── terraform/           AWS infrastructure
├── google-apps-script/  Gmail contact form handler
├── .github/workflows/   CI and deploy
└── docs/
```
