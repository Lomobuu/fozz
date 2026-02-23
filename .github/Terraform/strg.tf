resource "azurerm_storage_account" "storageAccount" {
  name                     = local.strg_name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}

resource "azurerm_storage_account_static_website" "website" {
  storage_account_id = azurerm_storage_account.storageAccount.id
  error_404_document = "404.html"
  index_document     = "index.html"
}