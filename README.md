# Portfolio (static)

Static portfolio built with **React + Vite + TypeScript**. No backend API,
database, or always-on server.

Production hosting: **AWS S3 + CloudFront + Route 53** via Terraform, with
**GitHub Actions** deploy on push to `main`.

Live site: `https://roshan-shrestha.com`

## Quick start (local)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Contact form (Gmail)

Submissions are sent to your Gmail inbox via **Google Apps Script** (no backend server).

Setup guide: [docs/GMAIL_CONTACT_FORM.md](docs/GMAIL_CONTACT_FORM.md)

```bash
cp .env.example .env
# VITE_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/.../exec
```

Add the same value as GitHub secret `VITE_CONTACT_FORM_ENDPOINT` for production deploys.

## Build

```bash
npm run build
npm run preview
```

Output: `dist/`

## Deploy to AWS

1. **Infrastructure:** `terraform/` — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
2. **Migrating from full-stack:** [docs/MIGRATION_FROM_FULLSTACK.md](docs/MIGRATION_FROM_FULLSTACK.md)
3. **CI/CD:** set GitHub Secrets, push to `main`

Required GitHub Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`AWS_REGION`, `FRONTEND_S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.

## Repository layout

```text
├── src/                 React pages and components
├── terraform/           AWS S3 + CloudFront + Route 53
├── .github/workflows/   CI and deploy
└── docs/                Deployment and migration guides
```

## License

Private / portfolio use.
