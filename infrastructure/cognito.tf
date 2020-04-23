resource "aws_cognito_user_pool" "inexperiment-customer" {
  name                     = "Inexperiment customer"
  mfa_configuration        = "OFF"
  auto_verified_attributes = []
  username_attributes = [
    "email",
  ]

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  lambda_config {
    create_auth_challenge          = aws_lambda_function.inexperiment-idp-create-auth-challenge.arn
    define_auth_challenge          = aws_lambda_function.inexperiment-idp-define-auth-challenge.arn
    post_authentication            = aws_lambda_function.inexperiment-idp-post-authentication.arn
    pre_sign_up                    = aws_lambda_function.inexperiment-idp-pre-sign-up.arn
    pre_authentication             = aws_lambda_function.inexperiment-idp-pre-authentication.arn
    verify_auth_challenge_response = aws_lambda_function.inexperiment-idp-verify-auth-challenge-response.arn
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = false
    require_numbers                  = false
    require_symbols                  = false
    require_uppercase                = false
    temporary_password_validity_days = 7
  }

  schema {
    name                     = "email"
    attribute_data_type      = "String"
    required                 = true
    mutable                  = true
    developer_only_attribute = false

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    name                     = "name"
    attribute_data_type      = "String"
    required                 = true
    mutable                  = true
    developer_only_attribute = false

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  tags = local.default_tags
}

resource "aws_cognito_user_pool_client" "email-auth-client" {
  name                          = "email-auth-client"
  user_pool_id                  = aws_cognito_user_pool.inexperiment-customer.id
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
  ]
}
