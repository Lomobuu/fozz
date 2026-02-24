resource "azurerm_cdn_frontdoor_profile" "frontDoor" {
  name                = local.frontdoor_name
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Standard_AzureFrontDoor"
}


resource "azurerm_cdn_frontdoor_endpoint" "endpoint" {
  name                     = "${local.frontdoor_name}-endpoint"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.frontDoor.id
}

resource "azurerm_cdn_frontdoor_origin_group" "origin_group" {
  name                     = "${local.frontdoor_name}-origin-group"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.frontDoor.id

  session_affinity_enabled = false

  load_balancing {
    sample_size                 = 4
    successful_samples_required = 3
  }

  health_probe {
    protocol = "Https"
    path     = "/"
    interval_in_seconds = 30
  }
}

locals {
  static_site_hostname = trimsuffix(
    replace(azurerm_storage_account.storageAccount.primary_web_endpoint, "https://", ""),
    "/"
  )
}


resource "azurerm_cdn_frontdoor_origin" "origin" {
  name                          = "${local.frontdoor_name}-origin"
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.origin_group.id

  host_name                    = local.static_site_hostname
  origin_host_header           = local.static_site_hostname
  certificate_name_check_enabled = true

  http_port  = 80
  https_port = 443
}


resource "azurerm_cdn_frontdoor_route" "route" {
  name                          = "${local.frontdoor_name}-route"
  cdn_frontdoor_endpoint_id     = azurerm_cdn_frontdoor_endpoint.endpoint.id
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.origin_group.id
  
  supported_protocols = ["Http", "Https"]
  patterns_to_match   = ["/*"]
  cdn_frontdoor_origin_ids = [ azurerm_cdn_frontdoor_origin.origin.id ]
  forwarding_protocol     = "MatchRequest"
  https_redirect_enabled  = true
  link_to_default_domain  = true
}
