# We need to bypass the check for logged-in users in the /@types endpoint
# because it is used for rendering the default view.
# This is not a security problem, because the schemas are already
# public in the plone.org repository.

from plone.restapi.services.types import get as get_types
from plone.restapi.services.users import get as get_users

import logging


logger = logging.getLogger(__name__)


def bypass_security_check(context):
    pass


logger.info("Patching plone.restapi.services.types.get.check_security")
get_types.check_security = bypass_security_check


def patch_user_portrait():
    def getPortraitUrl(user):
        if not user:
            return

        portrait_url = user.getProperty("portrait", "")
        return portrait_url if portrait_url else None

    get_users._getPortraitUrl = get_users.getPortraitUrl
    get_users.getPortraitUrl = getPortraitUrl


logger.info("Patching plone.restapi.services.users.get.getPortraitUrl")
patch_user_portrait()


def add_sigterm_handler():
    # Shut down cleanly on SIGTERM
    import signal
    import sys

    signal.signal(signal.SIGTERM, lambda *a: sys.exit(0))


add_sigterm_handler()
