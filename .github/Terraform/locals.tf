locals {
  # Your base project name
  base = "fozz"

  # Resource Group Name (may contain dashes)
  rg_name = "${local.base}-RG"

    # Resource Group Name (may contain dashes)
  strg_name = "${local.base}strg"

  frontdoor_name = "${local.base}-frontdoor"

}