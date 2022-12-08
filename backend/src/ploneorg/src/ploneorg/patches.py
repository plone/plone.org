# We need to bypass the check for logged-in users in the /@types endpoint
# because it is used for rendering the default view.
# This is not a security problem, because the schemas are already
# public in the plone.org repository.

from plone.restapi.services.types import get

import logging


logger = logging.getLogger(__name__)


def bypass_security_check(context):
    pass


logger.info("Patching plone.restapi.services.types.get.check_security")
get.check_security = bypass_security_check
