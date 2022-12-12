"""Setup tests for this package."""
from kitconcept import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from ploneorg.testing import PLONEORG_INTEGRATION_TESTING  # noqa: E501
from Products.CMFPlone.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that ploneorg is properly installed."""

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.installer = get_installer(self.portal, self.layer["request"])

    def test_product_installed(self):
        """Test if ploneorg is installed."""
        self.assertTrue(self.installer.is_product_installed("ploneorg"))

    def test_browserlayer(self):
        """Test that IPLONEORGLayer is registered."""
        from plone.browserlayer import utils
        from ploneorg.interfaces import IPLONEORGLayer

        self.assertIn(IPLONEORGLayer, utils.registered_layers())

    def test_latest_version(self):
        """Test latest version of default profile."""
        self.assertEqual(
            self.setup.getLastVersionForProfile("ploneorg:default")[0],
            "20221212002",
        )


class TestUninstall(unittest.TestCase):

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstall_product("ploneorg")
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if ploneorg is cleanly uninstalled."""
        self.assertFalse(self.installer.is_product_installed("ploneorg"))

    def test_browserlayer_removed(self):
        """Test that IPLONEORGLayer is removed."""
        from plone.browserlayer import utils
        from ploneorg.interfaces import IPLONEORGLayer

        self.assertNotIn(IPLONEORGLayer, utils.registered_layers())
