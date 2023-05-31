from plone import api
from ploneorg import logger


APPLICATION_ALLOWED_ROLES = [
    "Authenticated",
    "Contributor",
    "Editor",
    "Manager",
    "Member",
    "Reviewer",
    "Site Manager",
]
APPLICATION_ALLOWED_PERMISSIONS = [
    "Add portal content",
    "ploneorg: Add Foundation Member",
]


def update_security(context):
    # Update workflow security
    wf_tool = api.portal.get_tool("portal_workflow")
    wf_tool.updateRoleMappings()
    logger.info("Updated security")
    # Fix permissions on /foundation/members/applications/
    path = "/foundation/members/applications"
    content = api.content.get(path=path)
    if content:
        for permission_id in APPLICATION_ALLOWED_PERMISSIONS:
            content.manage_permission(permission_id, roles=APPLICATION_ALLOWED_ROLES)
            logger.info(f"Updated {permission_id} in {path}")
    logger.info("Finished upgrade")
