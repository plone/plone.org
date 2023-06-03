# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.services import Service
from ploneorg.interfaces import IPLONEORGSettings
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse


@implementer(IPublishTraverse)
class CustomCSS(Service):
    def __init__(self, context, request):
        super(CustomCSS, self).__init__(context, request)

    def reply(self):
        record = api.portal.get_registry_record(
            "custom_css", interface=IPLONEORGSettings, default=""
        )
        return {"data": record}
