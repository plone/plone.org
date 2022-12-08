"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


_ = MessageFactory("ploneorg")

logger = logging.getLogger("ploneorg")


from . import patches  # noqa
