"""Upgrades tests for this package."""
from parameterized import parameterized
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from ploneorg.testing import PLONEORG_INTEGRATION_TESTING  # noqa: E501
from Products.GenericSetup.upgrade import listUpgradeSteps

import unittest


class UpgradeStepIntegrationTest(unittest.TestCase):

    layer = PLONEORG_INTEGRATION_TESTING
    profile = "ploneorg:default"

    def setUp(self):
        self.portal = self.layer["portal"]
        self.setup = self.portal["portal_setup"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def _match(self, item, source, dest):
        source, dest = tuple([source]), tuple([dest])
        return item["source"] == source and item["dest"] == dest

    def available_steps(self, src, dst) -> list:
        """Test available steps."""
        steps = listUpgradeSteps(self.setup, self.profile, src)
        steps = [s for s in steps if self._match(s[0], src, dst)]
        return steps

    # Example of upgrade step test
    @parameterized.expand(
        [
            ("20221014001", "20221112001", 1),
            ("20221112001", "20221206001", 1),
            ("20221206001", "20221212001", 1),
            ("20221212001", "20221212002", 1),
            ("20221212002", "20221212003", 1),
            ("20221212003", "20230412001", 1),
            ("20230412001", "20230528001", 1),
            ("20230528001", "20230530001", 1),
            ("20230530001", "20230904001", 1),
            ("20230904001", "20230907001", 1),

        ]
    )
    def test_available(self, src, dst, expected):
        """Test upgrade step is available."""
        steps = self.available_steps(src, dst)
        self.assertEqual(len(steps), expected)
