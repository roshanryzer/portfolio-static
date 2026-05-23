# Migrate Terraform state from portfolio-fullstack

Use this guide when you already deployed `portfolio-fullstack` to AWS and want
this repo (`portfolio-static`) to manage the **same** S3 + CloudFront stack at
`roshan-shrestha.com`.

Do **not** copy application code between repos. Only infrastructure ownership
moves here.

## Overview

| Step | Where | Action |
| --- | --- | --- |
| 1 | `portfolio-fullstack/terraform` | Remove backend resources; `terraform apply` destroys EC2/ALB/VPC |
| 2 | `portfolio-fullstack/terraform` | Move frontend state into this repo |
| 3 | `portfolio-static/terraform` | `terraform plan` should show no changes (or minor IAM policy rename) |
| 4 | `portfolio-static` | Deploy static site; disable fullstack GitHub deploy workflow |

## Prerequisites

- AWS CLI and Terraform >= 1.5 installed locally
- Same `project_name` (`portfolio`) so the S3 bucket name matches:
  `portfolio-frontend-<account-id>`
- Fullstack repo tagged/archived; deploy workflow disabled there

## Step 1 — Destroy backend from fullstack Terraform

In `portfolio-fullstack/terraform`:

1. Delete VPC, EC2, ALB, API DNS, and API certificate blocks from `main.tf`
   (everything after the frontend / deploy-user sections).
2. Remove backend-only variables from `terraform.tfvars`:
   `enable_api_alb`, `api_subdomain`, `key_pair_name`, `latest_ami_id`,
   `ssh_cidr_blocks`.
3. Set `enable_frontend_dns = true` (keep frontend as-is).

```powershell
cd path\to\portfolio-fullstack\terraform
terraform plan
terraform apply
```

Confirm EC2, ALB, and VPC are destroyed. S3, CloudFront, and apex DNS remain.

## Step 2 — Move Terraform state to portfolio-static

Still in `portfolio-fullstack/terraform`, list frontend resources:

```powershell
terraform state list
```

Copy the state file into this repo (adjust paths):

```powershell
Copy-Item terraform.tfstate E:\dev\react-ts-app\portfolio-static\terraform\terraform.tfstate
Copy-Item .terraform.lock.hcl E:\dev\react-ts-app\portfolio-static\terraform\.terraform.lock.hcl -ErrorAction SilentlyContinue
```

In `portfolio-static/terraform`, initialize and rename resources to match this
module's addresses (fullstack used `enable_frontend_dns`; this repo uses
`enable_custom_domain` with the same underlying resources):

```powershell
cd E:\dev\react-ts-app\portfolio-static\terraform
terraform init
```

Rename state entries (run from `portfolio-static/terraform`):

```powershell
# IAM (policy name differs — optional but keeps one policy in AWS)
terraform state mv 'aws_iam_policy.deploy_user_s3[0]' 'aws_iam_policy.deploy[0]' 2>$null
terraform state mv 'aws_iam_user_policy_attachment.deploy_user_attach[0]' 'aws_iam_user_policy_attachment.deploy[0]' 2>$null
```

Remove fullstack state so it is not applied twice:

```powershell
cd path\to\portfolio-fullstack\terraform
Remove-Item terraform.tfstate -ErrorAction SilentlyContinue
Remove-Item terraform.tfstate.backup -ErrorAction SilentlyContinue
```

Alternatively, use `terraform state pull` / `terraform state push` instead of
copying files if you prefer remote state.

## Step 3 — Configure and verify

```powershell
cd E:\dev\react-ts-app\portfolio-static\terraform
Copy-Item terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars if needed
terraform plan
```

Expected:

- **No changes** for S3, CloudFront, Route 53, ACM (ideal)
- **Minor change** for IAM policy name/content (safe apply)

If Terraform wants to **recreate** the bucket or distribution, stop and fix
state imports before applying.

Apply if plan looks correct:

```powershell
terraform apply
```

Save outputs for GitHub Secrets:

```powershell
terraform output frontend_bucket_name
terraform output cloudfront_distribution_id
terraform output frontend_url
```

## Step 4 — Import instead of state move (alternative)

If you cannot copy state, import existing resources after `terraform init`.
Replace IDs with values from the AWS Console / CLI.

```powershell
cd terraform
terraform import aws_s3_bucket.frontend portfolio-frontend-ACCOUNT_ID
terraform import aws_s3_bucket_website_configuration.frontend portfolio-frontend-ACCOUNT_ID
terraform import aws_s3_bucket_ownership_controls.frontend portfolio-frontend-ACCOUNT_ID
terraform import aws_s3_bucket_public_access_block.frontend portfolio-frontend-ACCOUNT_ID
terraform import 'aws_s3_bucket_policy.frontend_private[0]' portfolio-frontend-ACCOUNT_ID
terraform import 'aws_cloudfront_origin_access_control.frontend[0]' EXXXXXXXXXX
terraform import 'aws_cloudfront_distribution.frontend[0]' EXXXXXXXXXX
terraform import 'aws_route53_record.frontend_apex[0]' Z00648313M37VHZ2DMPSG_roshan-shrestha.com_A
# ACM cert (us-east-1): use certificate ARN
terraform import 'aws_acm_certificate.frontend[0]' arn:aws:acm:us-east-1:ACCOUNT:certificate/UUID
```

Import cert validation records individually if Terraform reports drift.

## Step 5 — Retire fullstack deploy workflow

In `roshanryzer/personal-portfolio` (fullstack repo):

- Disable or delete `.github/workflows/deploy.yml`
- Optionally archive the repository
- Remove EC2/SSH/JWT/SMTP secrets (no longer used)

## Step 6 — First static deploy

Push to `main` on `roshanryzer/portfolio-static` after GitHub Secrets are set
(see `docs/DEPLOYMENT.md`), or deploy manually:

```powershell
npm run build
aws s3 sync dist/assets/ s3://portfolio-frontend-ACCOUNT_ID/assets/ --delete --cache-control "public,max-age=31536000,immutable"
aws s3 cp dist/index.html s3://portfolio-frontend-ACCOUNT_ID/index.html --cache-control "no-cache,no-store,must-revalidate" --content-type "text/html"
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/index.html" "/assets/*"
```

Verify `https://roshan-shrestha.com`.
