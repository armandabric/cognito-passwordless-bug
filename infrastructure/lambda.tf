data "archive_file" "inexperiment-idp-create-auth-challenge" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-create-auth-challenge.zip"
  source_dir  = "../backend/build/lambda-triggers/create-auth-challenge"
}

resource "aws_lambda_function" "inexperiment-idp-create-auth-challenge" {
  function_name                  = "inexperiment-idp-create-auth-challenge"
  description                    = "Creates passwordless authentification challenge"
  handler                        = "create-auth-challenge.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-create-auth-challenge.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-create-auth-challenge.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-create-auth-challenge.arn
  tags                           = local.default_tags

  environment {
    variables = {
      "SES_FROM_ADDRESS" = local.public_mail_from_email_address
    }
  }

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }

}

resource "aws_lambda_permission" "inexperiment-idp-create-auth-challenge-cognito-invoke" {
  statement_id  = "inexperiment-identity-provider-CreateAuthChallengeInvocationPermission"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inexperiment-idp-create-auth-challenge.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.inexperiment-customer.arn
}

data "archive_file" "inexperiment-idp-post-authentication" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-post-authentication.zip"
  source {
    content  = file("../backend/build/lambda-triggers/post-authentication/post-authentication.js")
    filename = "post-authentication.js"
  }
}

resource "aws_lambda_function" "inexperiment-idp-post-authentication" {
  function_name                  = "inexperiment-idp-post-authentication"
  handler                        = "post-authentication.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-post-authentication.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-post-authentication.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-post-authentication.arn
  tags                           = local.default_tags

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_permission" "inexperiment-idp-post-authentication-cognito-invoke" {
  statement_id  = "inexperiment-identity-provider-PostAuthenticationInvocationPermission"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inexperiment-idp-post-authentication.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.inexperiment-customer.arn
}

data "archive_file" "inexperiment-idp-define-auth-challenge" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-define-auth-challenge.zip"
  source {
    content  = file("../backend/build/lambda-triggers/define-auth-challenge/define-auth-challenge.js")
    filename = "define-auth-challenge.js"
  }
}

resource "aws_lambda_function" "inexperiment-idp-define-auth-challenge" {
  function_name                  = "inexperiment-idp-define-auth-challenge"
  handler                        = "define-auth-challenge.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-define-auth-challenge.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-define-auth-challenge.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-define-auth-challenge.arn
  tags                           = local.default_tags

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_permission" "inexperiment-idp-define-auth-challenge-cognito-invoke" {
  statement_id  = "inexperiment-identity-provider-DefineAuthChallengeInvocationPermission"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inexperiment-idp-define-auth-challenge.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.inexperiment-customer.arn
}

data "archive_file" "inexperiment-idp-pre-sign-up" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-pre-sign-up.zip"
  source {
    content  = file("../backend/build/lambda-triggers/pre-sign-up/pre-sign-up.js")
    filename = "pre-sign-up.js"
  }
}

resource "aws_lambda_function" "inexperiment-idp-pre-sign-up" {
  function_name                  = "inexperiment-idp-pre-sign-up"
  handler                        = "pre-sign-up.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-pre-sign-up.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-pre-sign-up.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-pre-sign-up.arn
  tags                           = local.default_tags

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

data "archive_file" "inexperiment-idp-pre-authentication" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-pre-authentication.zip"
  source {
    content  = file("../backend/build/lambda-triggers/pre-authentication/pre-authentication.js")
    filename = "pre-authentication.js"
  }
}

resource "aws_lambda_function" "inexperiment-idp-pre-authentication" {
  function_name                  = "inexperiment-idp-pre-authentication"
  handler                        = "pre-authentication.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-pre-authentication.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-pre-authentication.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-pre-authentication.arn
  tags                           = local.default_tags

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_permission" "inexperiment-idp-pre-sign-up-cognito-invoke" {
  statement_id  = "inexperiment-identity-provider-PreSignUpInvocationPermission"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inexperiment-idp-pre-sign-up.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.inexperiment-customer.arn
}

data "archive_file" "inexperiment-idp-verify-auth-challenge-response" {
  type        = "zip"
  output_path = "/tmp/inexperiment-idp-verify-auth-challenge-response.zip"
  source {
    content  = file("../backend/build/lambda-triggers/verify-auth-challenge-response/verify-auth-challenge-response.js")
    filename = "verify-auth-challenge-response.js"
  }
}

resource "aws_lambda_function" "inexperiment-idp-verify-auth-challenge-response" {
  function_name                  = "inexperiment-idp-verify-auth-challenge-response"
  handler                        = "verify-auth-challenge-response.handler"
  layers                         = []
  memory_size                    = 128
  reserved_concurrent_executions = -1
  runtime                        = "nodejs12.x"
  filename                       = data.archive_file.inexperiment-idp-verify-auth-challenge-response.output_path
  source_code_hash               = data.archive_file.inexperiment-idp-verify-auth-challenge-response.output_base64sha256
  timeout                        = 3
  role                           = aws_iam_role.inexperiment-idp-verify-auth-challenge-response.arn
  tags                           = local.default_tags

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_permission" "inexperiment-idp-verify-auth-challenge-response-cognito-invoke" {
  statement_id  = "inexperiment-identity-provider-VerifyAuthChallengeResponseInvocationPermission"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.inexperiment-idp-verify-auth-challenge-response.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.inexperiment-customer.arn
}
