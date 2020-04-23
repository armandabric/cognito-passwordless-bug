output "region" {
  value = var.aws_region
}

output "userPoolId" {
  value = aws_cognito_user_pool.inexperiment-customer.id
}

output "userPoolWebClientId" {
  value = aws_cognito_user_pool_client.email-auth-client.id
}

  # region: "us-east-1",
  # userPoolId: "us-east-1_mhjo2zCQg",
  # userPoolWebClientId: "4b3lu6s20j3g1vb7338srt4d6v"
