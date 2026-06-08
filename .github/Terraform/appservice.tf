resource "azurerm_app_service_plan" "appPlan" {
  name                = local.app_plan_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "AppSvc" {
  name                = local.webapp_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.appPlan.id

  site_config {
    linux_fx_version = "NODE|20-lts"
    always_on        = true

    # The app is a Next.js static export (output: 'export'); the deployed
    # package is the contents of out/ landing in /home/site/wwwroot.
    # There is no Node server to start, so serve the static files with pm2
    # (bundled on the Linux Node image). No --spa: the export produces a
    # separate HTML file per route, so let pm2 resolve each path directly.
    app_command_line = "pm2 serve /home/site/wwwroot --no-daemon"
  }

  identity {
    type = "SystemAssigned"
  }

  # Prevent Terraform from overwriting the app code deployed by GitHub Actions
  lifecycle {
    ignore_changes = [
      site_config[0].linux_fx_version,
    ]
  }
}
