# Deployment & Operations Guide (AWS Terraform + GitHub Actions)

Static portfolio deployment for **S3 + CloudFront + Route 53** at
`roshan-shrestha.com`. No EC2, database, or API server.

Repository: `https://github.com/roshanryzer/portfolio-static`

If you are replacing the old full-stack app, read
`docs/MIGRATION_FROM_FULLSTACK.md` first.

## Architecture

```text
Browser
  └── Route 53 (roshan-shrestha.com)
        └── CloudFront (HTTPS, ACM cert in us-east-1)
              └── S3 bucket (private; OAC from CloudFront)
```

GitHub Actions on push to `main`:

1. `npm run build` → `dist/`
2. `aws s3 sync` (cache-friendly asset uploads)
3. CloudFront invalidation for `/index.html` and `/assets/*`

## Part 0 — Local setup

```powershell
git clone https://github.com/roshanryzer/portfolio-static.git
cd portfolio-static
npm install
npm run dev
```

Open `http://localhost:5173`.

Production build check:

```powershell
npm run build
npm run preview
```

### Contact form (optional)

Copy `.env.example` to `.env` and set a hosted form endpoint (Formspree,
Web3Forms, etc.):

```text
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Without this variable, the contact page opens the visitor's email client
(`mailto:`).

## Part 1 — AWS infrastructure (Terraform, one-time)

### Step 1A — Configure variables

```powershell
cd terraform
Copy-Item terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:

| Variable | Example | Purpose |
| --- | --- | --- |
| `aws_region` | `ap-southeast-2` | S3 bucket region |
| `project_name` | `portfolio` | Resource name prefix |
| `deploy_user_name` | `portfolio-deployer` | IAM user for GitHub deploy |
| `hosted_zone_id` | `Z00648313M37VHZ2DMPSG` | Route 53 zone |
| `domain_name` | `roshan-shrestha.com` | Custom domain |
| `enable_custom_domain` | `true` | CloudFront + DNS + HTTPS |
| `create_www_record` | `false` | Skip `www` alias if unused |

### Step 1B — Apply Terraform

```powershell
terraform init
terraform plan
terraform apply
```

Save outputs:

```powershell
terraform output frontend_bucket_name
terraform output cloudfront_distribution_id
terraform output frontend_url
```

### Fresh AWS account vs existing full-stack stack

- **New account:** run `terraform apply` here; skip migration doc.
- **Existing full-stack deploy:** follow `docs/MIGRATION_FROM_FULLSTACK.md` to
  destroy backend services and move state into this repo without recreating S3 /
  CloudFront.

## Part 2 — GitHub Secrets

GitHub → `portfolio-static` → Settings → Secrets and variables → Actions.

| Secret | Value |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | Access key for `portfolio-deployer` |
| `AWS_SECRET_ACCESS_KEY` | Matching secret key |
| `AWS_REGION` | `ap-southeast-2` |
| `FRONTEND_S3_BUCKET` | Terraform output `frontend_bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Terraform output `cloudfront_distribution_id` |
| `VITE_CONTACT_FORM_ENDPOINT` | Optional hosted form URL |

Terraform attaches S3 upload and CloudFront invalidation permissions to
`deploy_user_name` when set in `terraform.tfvars`.

## Part 3 — Deploy

### Automatic (recommended)

Push to `main`:

```powershell
git add .
git commit -m "Deploy static portfolio"
git push origin main
```

Open GitHub → Actions → **Deploy to AWS** and wait for success.

### Manual (first deploy or emergency)

```powershell
npm run build

$bucket = "portfolio-frontend-YOUR_ACCOUNT_ID"
$distId = "YOUR_CLOUDFRONT_DISTRIBUTION_ID"

aws s3 sync dist/assets/ "s3://$bucket/assets/" --delete --cache-control "public,max-age=31536000,immutable"
aws s3 cp dist/index.html "s3://$bucket/index.html" --cache-control "no-cache,no-store,must-revalidate" --content-type "text/html"
aws s3 sync dist/ "s3://$bucket/" --exclude "assets/*" --exclude "index.html" --cache-control "public,max-age=300"
aws cloudfront create-invalidation --distribution-id $distId --paths "/index.html" "/assets/*"
```

## Part 4 — Verification checklist

- [ ] `https://roshan-shrestha.com` loads the homepage
- [ ] Refresh deep links: `/projects`, `/contact`, `/resume` (no 404)
- [ ] Mobile and desktop layouts look correct
- [ ] Contact form works (`mailto` or hosted endpoint)
- [ ] GitHub Actions deploy succeeds on push to `main`

## Part 5 — CI on pull requests

Workflow `.github/workflows/ci.yml` runs on PRs to `main`:

- `npm ci`
- `npm run lint`
- `npm run build`

## Part 6 — Cost guidance

Typical monthly cost (low traffic portfolio):

| Service | Approx. cost |
| --- | --- |
| S3 storage + requests | under $1 AUD |
| CloudFront | Often free-tier / low single digits AUD |
| Route 53 hosted zone | ~$0.50 USD/month (if not already paid) |
| **Removed vs full-stack** | EC2 + ALB (~$25–40 AUD/month saved) |

## Part 7 — Cleanup

To delete all AWS resources managed by this Terraform:

```powershell
cd terraform
terraform destroy
```

**Warning:** This deletes the S3 bucket contents configuration, CloudFront
distribution, and DNS records. Download anything you need first.

## Part 8 — Repository layout

```text
portfolio-static/
├── src/                    React app
├── terraform/              AWS infrastructure (S3, CloudFront, Route 53)
├── .github/workflows/
│   ├── ci.yml              PR checks
│   └── deploy.yml          Push-to-main deploy
├── docs/
│   ├── DEPLOYMENT.md       This guide
│   └── MIGRATION_FROM_FULLSTACK.md
└── package.json
```
