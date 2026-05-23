provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

locals {
  tags = merge(
    var.tags,
    {
      Project = var.project_name
    }
  )

  bucket_name = "${var.project_name}-frontend-${data.aws_caller_identity.current.account_id}"

  create_custom_domain = (
    var.enable_custom_domain &&
    var.hosted_zone_id != "" &&
    var.domain_name != ""
  )
  create_frontend_cert = local.create_custom_domain && var.frontend_certificate_arn == ""
  frontend_cloudfront_certificate_arn = (
    var.frontend_certificate_arn != "" ?
    var.frontend_certificate_arn :
    aws_acm_certificate_validation.frontend[0].certificate_arn
  )
}

########################
## Frontend (S3 + CloudFront)
########################

resource "aws_s3_bucket" "frontend" {
  bucket = local.bucket_name
  tags   = local.tags
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = local.create_custom_domain
  block_public_policy     = local.create_custom_domain
  ignore_public_acls      = local.create_custom_domain
  restrict_public_buckets = local.create_custom_domain
}

resource "aws_s3_bucket_acl" "frontend" {
  count = local.create_custom_domain ? 0 : 1

  depends_on = [
    aws_s3_bucket_ownership_controls.frontend,
    aws_s3_bucket_public_access_block.frontend,
  ]

  bucket = aws_s3_bucket.frontend.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "frontend" {
  count = local.create_custom_domain ? 0 : 1

  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  count = local.create_custom_domain ? 1 : 0

  name                              = "${var.project_name}-frontend-oac"
  description                       = "CloudFront access to private S3 frontend bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_acm_certificate" "frontend" {
  provider = aws.us_east_1
  count    = local.create_frontend_cert ? 1 : 0

  domain_name               = var.domain_name
  subject_alternative_names = var.create_www_record ? ["www.${var.domain_name}"] : []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.tags
}

resource "aws_route53_record" "frontend_cert_validation" {
  for_each = local.create_frontend_cert ? {
    for dvo in aws_acm_certificate.frontend[0].domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  } : {}

  zone_id = var.hosted_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "frontend" {
  provider = aws.us_east_1
  count    = local.create_frontend_cert ? 1 : 0

  certificate_arn         = aws_acm_certificate.frontend[0].arn
  validation_record_fqdns = [for r in aws_route53_record.frontend_cert_validation : r.fqdn]
}

resource "aws_cloudfront_distribution" "frontend" {
  count = local.create_custom_domain ? 1 : 0

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "frontend-s3-bucket"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend[0].id

    s3_origin_config {
      origin_access_identity = ""
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = var.create_www_record ? [var.domain_name, "www.${var.domain_name}"] : [var.domain_name]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "frontend-s3-bucket"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = local.frontend_cloudfront_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = merge(local.tags, { Name = "${var.project_name}-frontend-cdn" })
}

resource "aws_s3_bucket_policy" "frontend_private" {
  count = local.create_custom_domain ? 1 : 0

  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontRead"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.frontend.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.frontend[0].arn
          }
        }
      }
    ]
  })
}

resource "aws_route53_record" "frontend_apex" {
  count   = local.create_custom_domain ? 1 : 0
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend[0].domain_name
    zone_id                = aws_cloudfront_distribution.frontend[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "frontend_www" {
  count   = local.create_custom_domain && var.create_www_record ? 1 : 0
  zone_id = var.hosted_zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend[0].domain_name
    zone_id                = aws_cloudfront_distribution.frontend[0].hosted_zone_id
    evaluate_target_health = false
  }
}

########################
## Deploy user permissions (S3 + CloudFront invalidation)
########################

resource "aws_iam_policy" "deploy" {
  count = var.deploy_user_name != "" ? 1 : 0

  name = "${var.project_name}-static-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(
      [
        {
          Sid    = "S3FrontendBucket"
          Effect = "Allow"
          Action = [
            "s3:ListBucket",
            "s3:GetBucketLocation",
            "s3:PutObject",
            "s3:GetObject",
            "s3:DeleteObject"
          ]
          Resource = [
            "arn:aws:s3:::${local.bucket_name}",
            "arn:aws:s3:::${local.bucket_name}/*"
          ]
        }
      ],
      local.create_custom_domain ? [
        {
          Sid    = "CloudFrontInvalidation"
          Effect = "Allow"
          Action = [
            "cloudfront:CreateInvalidation",
            "cloudfront:GetInvalidation"
          ]
          Resource = aws_cloudfront_distribution.frontend[0].arn
        }
      ] : []
    )
  })
}

resource "aws_iam_user_policy_attachment" "deploy" {
  count = var.deploy_user_name != "" ? 1 : 0

  user       = var.deploy_user_name
  policy_arn = aws_iam_policy.deploy[0].arn
}
