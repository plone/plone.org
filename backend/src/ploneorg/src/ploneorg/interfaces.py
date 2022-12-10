"""Module where all interfaces, events and exceptions live."""

from plone.restapi.controlpanels.interfaces import IControlpanel
from ploneorg import _
from zope.publisher.interfaces.browser import IDefaultBrowserLayer
from zope.schema import SourceText


class IPLONEORGLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class IPLONEORGSettings(IControlpanel):
    custom_css = SourceText(
        title=_("custom_css_label", default="Custom CSS"),
        description=_(
            "custom_css_help",
            default="Add custom CSS in your site. \n"
            "Warning: use this at your own risk!",
        ),
        required=False,
        default="",
    )
