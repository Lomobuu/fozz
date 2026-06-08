locals {
  # Your base project name
  base = "fozz"

  # Resource Group Name (may contain dashes)
  rg_name = "${local.base}-RG"

    # Resource Group Name (may contain dashes)
  # strg_name = "${local.base}strg"

  webapp_name   = "${local.base}-appsvc"
  app_plan_name = "${local.base}-appplan"

  acr_name         = "${local.base}reg"
  acr_login_server = "${local.acr_name}.azurecr.io"

  # frontdoor_name = "${local.base}-frontdoor"

}