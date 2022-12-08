"""Tests for /@types service patch."""
from plone.restapi.testing import RelativeSession
from ploneorg.testing import PLONEORG_FUNCTIONAL_TESTING

import unittest


class TestTypesService(unittest.TestCase):
    """Test /@types API service."""

    layer = PLONEORG_FUNCTIONAL_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.portal_url = self.portal.absolute_url()
        self.api_session = RelativeSession(self.portal_url)
        self.api_session.headers.update({"Accept": "application/json"})

    def test_anonymous_user_can_view_types_service(self):
        response = self.api_session.get("/@types")
        self.assertEqual(200, response.status_code)
