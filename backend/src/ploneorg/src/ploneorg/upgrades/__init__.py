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


def install_caching(setup_tool=None):
    """Install plone.app.caching."""
    portal = api.portal.get()
    installer = get_installer(portal, getRequest())
    installer.install_product("plone.app.caching")
    logger.info("Installed plone.app.caching")
