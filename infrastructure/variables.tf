variable "aws_region" {
  type        = string
  description = "AWS Region"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "public_domain" {
  type        = string
  description = "Publicly exposed domain name"
}

variable "aws_account_identifier" {
  type        = string
  description = "AWS account identifier"
}
