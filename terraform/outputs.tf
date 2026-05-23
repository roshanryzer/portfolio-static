output "frontend_bucket_name" {
  description = "S3 bucket for static site files"
  value       = aws_s3_bucket.frontend.bucket
}

output "frontend_website_url" {
  description = "S3 static website endpoint (HTTP only, no custom domain)"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "frontend_cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = local.create_custom_domain ? aws_cloudfront_distribution.frontend[0].domain_name : null
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (use for GitHub secret CLOUDFRONT_DISTRIBUTION_ID)"
  value       = local.create_custom_domain ? aws_cloudfront_distribution.frontend[0].id : null
}

output "frontend_url" {
  description = "Public URL for the portfolio site"
  value       = local.create_custom_domain ? "https://${var.domain_name}" : "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}
