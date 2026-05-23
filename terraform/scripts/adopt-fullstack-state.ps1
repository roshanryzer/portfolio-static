# Adopts existing AWS frontend resources from portfolio-fullstack Terraform state.
# Run AFTER fullstack backend has been destroyed (see docs/MIGRATION_FROM_FULLSTACK.md).
#
# Usage (PowerShell):
#   cd portfolio-static/terraform
#   .\scripts\adopt-fullstack-state.ps1

$ErrorActionPreference = "Stop"

$StaticDir = Split-Path -Parent $PSScriptRoot
$FullstackState = Resolve-Path (Join-Path $StaticDir "..\..\portfolio-fullstack\terraform\terraform.tfstate")

if (-not (Test-Path $FullstackState)) {
  throw "Fullstack state not found at $FullstackState. Run fullstack terraform apply first to destroy backend."
}

Push-Location $StaticDir

if (Test-Path "terraform.tfstate") {
  Copy-Item "terraform.tfstate" "terraform.tfstate.broken.bak" -Force
}

Copy-Item $FullstackState "terraform.tfstate" -Force
Write-Host "Copied fullstack state -> terraform.tfstate"

terraform state mv 'aws_iam_policy.deploy_user_s3[0]' 'aws_iam_policy.deploy[0]'
terraform state mv 'aws_iam_user_policy_attachment.deploy_user_attach[0]' 'aws_iam_user_policy_attachment.deploy[0]'

Write-Host ""
Write-Host "State adopted. Run: terraform plan && terraform apply"
Pop-Location
