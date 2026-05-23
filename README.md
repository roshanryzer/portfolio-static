# Portfolio (static)

Simple static portfolio app built with **React + Vite + TypeScript**.

This version does not require a backend API, database, or Redis. It is intended
to reduce hosting costs and deploy easily to static hosting providers.

## Quick start (local)

```bash
cd portfolio-static
npm install
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

## Contact email setup (static)

This site can send contact form submissions via a hosted form endpoint.

1. Copy `.env.example` to `.env`
2. Set:

```text
VITE_CONTACT_FORM_ENDPOINT=your-form-endpoint-url
```

Examples: Formspree/Web3Forms/Getform endpoint URLs.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in:

```text
portfolio-static/dist
```

## Deployment guide

Follow:

`docs/DEPLOYMENT.md`

The guide includes:
- Git setup and push to GitHub
- Deploying on Cloudflare Pages (free-tier friendly)
- Deploying on AWS S3 static website hosting
