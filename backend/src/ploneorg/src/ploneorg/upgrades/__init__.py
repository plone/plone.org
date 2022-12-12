from plone import api
from ploneorg import logger
from Products.CMFPlone.utils import get_installer
from zope.globalrequest import getRequest


def install_case_study(setup_tool=None):
    """Install collective.casestudy."""
    portal = api.portal.get()
    installer = get_installer(portal, getRequest())
    installer.install_product("collective.casestudy")
    logger.info("Installed collective.casestudy")


def reindex_foundation_members(setup_tool=None):
    """Reindex Foundation Members Description."""
    brains = api.content.find(portal_type="FoundationMember")
    logger.info(f"Found {len(brains)} members")
    for brain in brains:
        obj = brain.getObject()
        obj.reindexObject(idxs=["Description"])
    logger.info(f"Reindexed {len(brains)} members")
