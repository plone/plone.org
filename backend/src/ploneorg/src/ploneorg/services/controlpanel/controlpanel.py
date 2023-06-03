from plone.restapi.controlpanels import RegistryConfigletPanel
from ploneorg.interfaces import IPLONEORGLayer, IPLONEORGSettings
from zope.component import adapter
from zope.interface import Interface, implementer


@adapter(Interface, IPLONEORGLayer)
@implementer(IPLONEORGSettings)
class PloneorgSettingsControlpanel(RegistryConfigletPanel):
    schema = IPLONEORGSettings
    configlet_id = "ploneorg-settings"
    configlet_category_id = "Products"
    schema_prefix = None
