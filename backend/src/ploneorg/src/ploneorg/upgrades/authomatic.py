from copy import deepcopy
from plone import api
from ploneorg import logger

import json


PREFIX = "pas.plugins.authomatic.interfaces.IPasPluginsAuthomaticSettings"


ADDITIONAL_MAPPING = {
    "avatar_url": "portrait",
    "username": "github_username",
}


def update_mapping_github(context):
    logger.info("Add portrait and github_username to Authomatic Settings.")
    key = f"{PREFIX}.json_config"
    current = api.portal.get_registry_record(key)
    if not current:
        logger.warn(f"- No settings found in {key}, ignoring upgrade")
        return
    value = deepcopy(json.loads(current))
    github_propertymap = value.get("github", {}).get("propertymap", {})
    if not github_propertymap:
        logger.warn("- Empty configuration, ignoring upgrade")
        return
    # Apply new mapping
    github_propertymap.update(ADDITIONAL_MAPPING)
    # Persist data in the registry
    new_value = json.dumps(value, indent=2)
    api.portal.set_registry_record(key, new_value)
    logger.info(f"- Configuration updated in {key}")
    logger.info("Upgrade complete")
