locals {
  environment = var.environment

  default_tags = {
    Environment = local.environment
    Project     = "inexperiment"
    CostCenter  = "Guest journey"
    Creator     = "terraform"
  }

  public_mail_from_email_address = "concierge@${var.public_domain}"
}

