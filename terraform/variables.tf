variable "aws_region" {
  description = "AWS region for regional resources (S3)"
  type        = string
  default     = "ap-southeast-2"
}

variable "project_name" {
  description = "Project name prefix for resources"
  type        = string
  default     = "portfolio"
}

variable "deploy_user_name" {
  description = "Existing IAM user to receive S3 and CloudFront deploy permissions (leave empty to skip)"
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID for custom domain (leave empty to skip DNS)"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Root domain in Route 53 (leave empty to skip DNS records)"
  type        = string
  default     = ""
}

variable "enable_custom_domain" {
  description = "Enable CloudFront + Route 53 records for domain_name (and optional www)."
  type        = bool
  default     = false
}

variable "create_www_record" {
  description = "Create www.<domain> Route 53 alias to the CloudFront distribution."
  type        = bool
  default     = false
}

variable "frontend_certificate_arn" {
  description = "Optional ACM certificate ARN in us-east-1 for CloudFront aliases. Leave empty to auto-create via ACM + Route 53 validation."
  type        = string
  default     = ""
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
