"""Tests for Foundation Member content type."""
from AccessControl.unauthorized import Unauthorized
from kitconcept import api
from plone.app.testing import setRoles
from plone.app.testing import SITE_OWNER_NAME
from plone.app.testing import SITE_OWNER_PASSWORD
from plone.app.testing import TEST_USER_ID
from plone.app.textfield.value import RichTextValue
from plone.dexterity.content import DexterityContent
from plone.restapi.testing import RelativeSession
from ploneorg.content.member import FoundationMember
from ploneorg.testing import PLONEORG_FUNCTIONAL_TESTING
from ploneorg.testing import PLONEORG_INTEGRATION_TESTING
from . import create_test_users
from typing import List
from typing import Optional

import transaction
import unittest


class TestFoundationMember(unittest.TestCase):
    """Test foundation member content type."""

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.container = api.content.get("/foundation/members")
        self.app_container = api.content.get("/foundation/members/applications")

    def _payload(self) -> dict:
        return {
            "type": "FoundationMember",
            "container": self.container,
            "id": "james-holden",
            "title": "James Holden",
            "email": "holden@rocinante.space",
            "organization": "Rocinante Security",
            "address": "Calle Córdoba, 42",
            "city": "Córdoba",
            "state": "Córdoba",
            "country": "ARG",
            "postal_code": "12345",
            "merit": RichTextValue("Just a space pilot", "text/plain", "text/html"),
            "github": "holden-space",
            "twitter": "holden-space",
            "linkedin": "https://www.linkedin.com/in/holden-space/",
        }

    def test_cannot_create_outside_container(self):
        """Test a manager cannot create a Member outside /foundation/members."""
        payload = self._payload()
        payload["container"] = self.portal
        with api.env.adopt_roles(
            [
                "Manager",
            ]
        ):
            with self.assertRaises(Unauthorized):
                api.content.create(**payload)

    def _test_creation(
        self, roles: List[str], container: Optional[DexterityContent] = None
    ):
        """Test a manager can create a new member in the right container."""
        payload = self._payload()
        if container:
            payload["container"] = container
        with api.env.adopt_roles(roles):
            content = api.content.create(**payload)

        self.assertIsInstance(content, FoundationMember)

    def test_manager_can_create(self):
        """Test a Manager can create a new member in the right container."""
        roles = [
            "Manager",
        ]
        self._test_creation(roles)

    def test_editor_can_create(self):
        """Test a Editor can create a new member in the right container."""
        roles = [
            "Editor",
        ]
        self._test_creation(roles)

    def test_member_can_create_in_sub_folder(self):
        """Test a Member can create a new member in the right container."""
        roles = [
            "Member",
        ]
        self._test_creation(roles, container=self.app_container)


class TestFoundationMemberFunctional(unittest.TestCase):

    layer = PLONEORG_FUNCTIONAL_TESTING

    endpoint = "/foundation/members/"

    def setUp(self):
        self.app = self.layer["app"]
        self.portal = self.layer["portal"]
        self.portal_url = self.portal.absolute_url()
        self.api_session = RelativeSession(self.portal_url)
        self.api_session.headers.update({"Accept": "application/json"})
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.users = create_test_users()
        transaction.commit()

    @staticmethod
    def _payload() -> dict:
        return {
            "@type": "FoundationMember",
            "title": "James Holden",
            "email": "holden@rocinante.space",
            "organization": "Rocinante Security",
            "address": "Calle Córdoba, 42",
            "city": "Córdoba",
            "state": "Córdoba",
            "country": "AR",
            "postal_code": "12345",
            "merit": "Just a space pilot",
            "github": "holden-space",
            "twitter": "holden-space",
            "linkedin": "https://www.linkedin.com/in/holden-space/",
        }

    def test_manager_create_new_foundation_member(self):
        self.api_session.auth = (SITE_OWNER_NAME, SITE_OWNER_PASSWORD)
        response = self.api_session.post(self.endpoint, json=self._payload())
        self.assertEqual(201, response.status_code)
        body = response.json()
        self.assertEqual(body["@type"], "FoundationMember")
        self.assertEqual(body["id"], "james-holden")

    def test_member_create_new_foundation_member(self):
        self.api_session.auth = self.users["member"]
        endpoint = f"{self.endpoint}/applications"
        response = self.api_session.post(endpoint, json=self._payload())
        self.assertEqual(201, response.status_code)
        body = response.json()
        self.assertEqual(body["@type"], "FoundationMember")
        self.assertEqual(body["id"], "james-holden")
