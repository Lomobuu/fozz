resource "azurerm_cdn_profile" "cdn" {
  name                = local.cdn_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard_Microsoft"
}