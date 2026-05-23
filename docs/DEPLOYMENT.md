# Deployment Guide

Static portfolio on **S3 + CloudFront + Route 53** at `roshan-shrestha.com`.

## Architecture

```text
Browser → Route 53 → CloudFront (HTTPS) → S3
```

Push to `main` runs GitHub Actions: build → S3 sync → CloudFront invalidation.

## 1. Local setup

```powershell
git clone https://github.com/roshanryzer/portfolio-static.git
cd portfolio-static
npm install
npm run dev
```

Contact form: [GMAIL_CONTACT_FORM.md](GMAIL_CONTACT_FORM.md)

## 2. Terraform (one-time)

```powershell
cd terraform
Copy-Item terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

Save outputs:

```powershell
terraform output frontend_bucket_name
terraform output cloudfront_distribution_id
```

## 3. GitHub Secrets

| Secret | Value |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | `portfolio-deployer` access key |
| `AWS_SECRET_ACCESS_KEY` | Matching secret |
| `AWS_REGION` | `ap-southeast-2` |
| `FRONTEND_S3_BUCKET` | Terraform `frontend_bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Terraform `cloudfront_distribution_id` |
| `VITE_CONTACT_FORM_ENDPOINT` | Optional Gmail Apps Script URL |

## 4. Deploy

Push to `main`, or deploy manually:

```powershell
npm run build
aws s3 sync dist/assets/ s3://YOUR_BUCKET/assets/ --delete --cache-control "public,max-age=31536000,immutable"
aws s3 cp dist/index.html s3://YOUR_BUCKET/index.html --cache-control "no-cache,no-store,must-revalidate" --content-type "text/html"
aws s3 sync dist/ s3://YOUR_BUCKET/ --exclude "assets/*" --exclude "index.html" --cache-control "public,max-age=300"
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/index.html" "/assets/*"
```

## 5. Verify

- `https://roshan-shrestha.com` loads
- Deep links refresh without 404 (`/projects`, `/contact`, `/resume`)
- Contact form sends (Gmail or mailto fallback)

## 6. Destroy infrastructure

```powershell
cd terraform
terraform destroy
```

**Warning:** removes S3, CloudFront, and DNS for this site.
