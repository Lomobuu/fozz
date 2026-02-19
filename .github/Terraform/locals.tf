locals {
  # Make sure the name is lower case
  env = lower(var.env)

  # Your base project name
  base = "simpletst"

  # Resource Group Name (may contain dashes)
  rg_name = "${local.base}-RG-${local.env}"

}