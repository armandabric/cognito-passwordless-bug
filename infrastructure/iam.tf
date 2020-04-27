resource "aws_iam_role" "inexperiment-idp-create-auth-challenge" {
  name = "inexperiment-identity-provider-CreateAuthChallengeRole"

  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy" "inexperiment-idp-create-auth-challenge-ses" {
  name = "CreateAuthChallengeRolePolicy0"
  policy = jsonencode(
    {
      Statement = [
        {
          Action = [
            "ses:SendEmail",
          ]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
      Version = "2012-10-17"
    }
  )
  role = aws_iam_role.inexperiment-idp-create-auth-challenge.id
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-create-auth-challenge-logging" {
  role       = aws_iam_role.inexperiment-idp-create-auth-challenge.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "inexperiment-idp-post-authentication" {
  name = "inexperiment-identity-provider-PostAuthenticationRole"
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy" "inexperiment-idp-post-authentication-set-user-attributes" {
  name = "allow-set-user-attributes"
  policy = jsonencode(
    {
      Statement = [
        {
          Action = [
            "cognito-idp:AdminUpdateUserAttributes",
          ]
          Effect = "Allow"
          Resource = [
            aws_cognito_user_pool.inexperiment-customer.arn,
          ]
        },
      ]
      Version = "2012-10-17"
    }
  )
  role = aws_iam_role.inexperiment-idp-post-authentication.id
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-post-authentication-logging" {
  role       = aws_iam_role.inexperiment-idp-post-authentication.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "inexperiment-idp-define-auth-challenge" {
  name = "inexperiment-identity-provider-DefineAuthChallengeRole"
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-define-auth-challenge-logging" {
  role       = aws_iam_role.inexperiment-idp-define-auth-challenge.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "inexperiment-idp-pre-sign-up" {
  name = "inexperiment-identity-provider-PreSignUpRole"
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-pre-sign-up-logging" {
  role       = aws_iam_role.inexperiment-idp-pre-sign-up.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "inexperiment-idp-pre-authentication" {
  name = "inexperiment-identity-provider-PreAuthenticationRole"
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-pre-authentication-logging" {
  role       = aws_iam_role.inexperiment-idp-pre-authentication.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "inexperiment-idp-verify-auth-challenge-response" {
  name = "inexperiment-identity-provide-VerifyAuthChallengeResponseRole"
  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )
  tags = local.default_tags
}

resource "aws_iam_role_policy_attachment" "inexperiment-idp-verify-auth-challenge-response-logging" {
  role       = aws_iam_role.inexperiment-idp-verify-auth-challenge-response.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
