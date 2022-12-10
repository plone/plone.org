from plone.app.registry.browser.controlpanel import (
    ControlPanelFormWrapper,
    RegistryEditForm,
)
from ploneorg import _
from ploneorg.interfaces import IPLONEORGSettings


class PloneorgSettingsForm(RegistryEditForm):
    schema = IPLONEORGSettings
    label = _("ploneorg_settings_label", default="Plone.org Settings")
    description = ""


class PloneorgSettings(ControlPanelFormWrapper):
    form = PloneorgSettingsForm
