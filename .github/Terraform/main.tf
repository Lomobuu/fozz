terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~> 4.6.0"
    }
  }
}

provider "azurerm" {
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = var.location
}