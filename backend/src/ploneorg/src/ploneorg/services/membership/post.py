from datetime import datetime
from plone import api
from plone.restapi.services import Service
from ploneorg import logger
from ploneorg.content.member import FoundationMember
from typing import List
from zope.interface import alsoProvides
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse

import plone


def get_members(review_state: str) -> List[FoundationMember]:
    """Return a list with FoundationMember on a given state."""
    brains = api.content.find(portal_type="FoundationMember", review_state=review_state)
    return [brain.getObject() for brain in brains]


@implementer(IPublishTraverse)
class MembershipPost(Service):
    _members: list = None

    def __init__(self, context, request):
        super().__init__(context, request)
        self._actions = {
            "open-renewal-cycle": self._open_renewal_cycle,
            "close-renewal-cycle": self._close_renewal_cycle,
            "reminder-renewal-cycle": self._reminder_renewal_cycle,
        }
        self.action = ""

    def publishTraverse(self, request, name):
        self.action = name
        return self

    def _open_renewal_cycle(self) -> str:
        """Open Renewal Cycle."""
        current_year = datetime.now().year
        members = get_members(review_state="approved")
        transitioned = skipped = 0
        for member in members:
            if member.created().year() == current_year:
                logger.info(
                    f"Renewal Cycle: {member.title} granted "
                    "exception during {current_year}"
                )
                skipped += 1
                continue
            api.content.transition(member, transition="suspend")
            transitioned += 1
            logger.info(f"Renewal Cycle: {member.title} moved to pending_renewal")
        return (
            f"Moved {transitioned} Foundation members to "
            f"pending_renewal ({skipped} were skipped)"
        )

    def _close_renewal_cycle(self) -> str:
        """Close Renewal Cycle."""
        members = get_members(review_state="pending_renewal")
        transitioned = 0
        for member in members:
            api.content.transition(member, transition="retire")
            transitioned += 1
            logger.info(f"Renewal Cycle: {member.title} moved to emeritus")
        return f"Moved {transitioned} Foundation members to emeritus"

    def _reminder_renewal_cycle(self) -> str:
        """Reminder Renewal Cycle."""
        members = get_members(review_state="pending_renewal")
        transitioned = 0
        for member in members:
            api.content.transition(member, transition="remind_renewal")
            transitioned += 1
            logger.info(
                f"Renewal Cycle: {member.title} "
                "was sent a reminder to renew their membership"
            )
        return f"{transitioned} Foundation members should receive an email reminder"

    def reply(self):
        action = self.action
        portal_url = api.portal.get().absolute_url()
        if action not in self._actions:
            self.request.response.setStatus(404)
            msg = f"{action} not found"
        else:
            # Disable CSRF protection
            if "IDisableCSRFProtection" in dir(plone.protect.interfaces):
                alsoProvides(
                    self.request, plone.protect.interfaces.IDisableCSRFProtection
                )
            func = self._actions[action]
            msg = func()
        return {
            "@id": f"{portal_url}/@membership/{action}",
            "msg": msg,
        }
