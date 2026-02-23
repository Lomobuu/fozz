resource "azurerm_cdn_frontdoor_profile" "frontDoor" {
  name                = local.frontdoor_name
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Standard_AzureFrontDoor"
}