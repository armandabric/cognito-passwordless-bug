# How to deploy infrastructure?

## 1. Ensure you've built backend

## 2. Ensure you've crated your production.auto.tfvars file

with following values (fill empty ones):

```hcl
environment            = "production"
aws_region             = "us-east-1"
aws_account_identifier = ""
public_domain          = ""
```

## 3. Get ready to apply

```shell
terraform validate
terraform plan
terraform plan
```
