"""Tests for default content creation."""
from kitconcept import api
from plone.app.dexterity.behaviors import constrains
from ploneorg.testing import PLONEORG_INTEGRATION_TESTING  # noqa: E501
from Products.CMFPlone.interfaces.constrains import ISelectableConstrainTypes

import unittest


class TestImageFolder(unittest.TestCase):
    """Test that ploneorg sets up default content."""

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.content = api.content.get("/images")

    def test_is_created(self):
        """Test if /images is created."""
        self.assertEqual(self.content.portal_type, "Document")

    def test_exclude_from_nav(self):
        """Test exclude_from_nav is set to True."""
        self.assertTrue(self.content.exclude_from_nav)

    def test_review_state(self):
        """Test content is published."""
        review_state = api.content.get_state(self.content)
        self.assertEqual(review_state, "published")

    def test_constrains_applied(self):
        """Test constrains are in place for this folder."""
        with api.env.adopt_roles(
            [
                "Manager",
            ]
        ):
            behavior = ISelectableConstrainTypes(self.content)
            self.assertEqual(behavior.getConstrainTypesMode(), constrains.ENABLED)
            allowed_types = [
                "Image",
            ]
            self.assertEqual(behavior.getImmediatelyAddableTypes(), allowed_types)


class TestFoundationArea(unittest.TestCase):
    """Test that ploneorg sets up default content."""

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.content = api.content.get("/foundation")

    def test_is_created(self):
        """Test if /foundation is created."""
        self.assertEqual(self.content.portal_type, "Document")

    def test_exclude_from_nav(self):
        """Test exclude_from_nav is set to False."""
        self.assertFalse(self.content.exclude_from_nav)

    def test_review_state(self):
        """Test content is published."""
        review_state = api.content.get_state(self.content)
        self.assertEqual(review_state, "published")


class TestFoundationMembersArea(unittest.TestCase):
    """Test that ploneorg sets up default content."""

    layer = PLONEORG_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.content = api.content.get("/foundation/members")

    def test_is_created(self):
        """Test if /foundation/members is created."""
        self.assertEqual(self.content.portal_type, "Document")

    def test_exclude_from_nav(self):
        """Test exclude_from_nav is set to False."""
        self.assertFalse(self.content.exclude_from_nav)

    def test_review_state(self):
        """Test content is published."""
        review_state = api.content.get_state(self.content)
        self.assertEqual(review_state, "published")

    def test_constrains_applied(self):
        """Test constrains are in place for this document."""
        with api.env.adopt_roles(
            [
                "Manager",
            ]
        ):
            behavior = ISelectableConstrainTypes(self.content)
            self.assertEqual(behavior.getConstrainTypesMode(), constrains.ENABLED)
            allowed_types = [
                "Document",
                "FoundationMember",
            ]
            self.assertEqual(behavior.getImmediatelyAddableTypes(), allowed_types)

    def test_chidren(self):
        """Test content is published."""
        children_ids = self.content.objectIds()
        self.assertIn("applications", children_ids)
