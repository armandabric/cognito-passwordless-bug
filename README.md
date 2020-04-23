# How to deploy?

# How to deploy infrastructure?

## 1. Ensure you've built backend

```shell
cd backend/

yarn install
yarn build
```

## 2. Ensure you've created your infrastructure's `infrastructure/production.auto.tfvars` file

with following values (fill empty ones):

```hcl
environment            = "production"
aws_region             = "us-east-1"
aws_account_identifier = ""
public_domain          = ""
```

## 3. Get ready to create the infrastructure

```shell
cd infrastructure/

terraform validate
terraform plan
terraform apply
```

## 4. Init & deploy frondend

Update the the frontend environement configurations file `frontend/src/environments/environment.prod.ts` with the terraform output:
- `region`
- `userPoolId`
- `userPoolWebClientId`

Then build it:

```shell
cd frontend/

yarn install
yarn build
```

You can depoloy the content of `frontend/dist/cognito-email-auth-client/` as a PWA
