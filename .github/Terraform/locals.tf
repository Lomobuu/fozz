locals {
  # Make sure the name is lower case
  env = lower(var.env)

  # Your base project name
  base = "fozz"

  # Resource Group Name (may contain dashes)
  rg_name = "${local.base}-RG-${local.env}"

    # Resource Group Name (may contain dashes)
  strg_name = "${local.base}strg${local.env}"

  frontdoor_name = "${local.base}-frontdoor-${local.env}"

}