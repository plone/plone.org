from dataclasses import dataclass
from datetime import datetime
from io import StringIO
from plone import api
from Products.Five import BrowserView
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse
from zope.publisher.interfaces import NotFound

import csv


@dataclass
class ReportData:

    data: bytes
    filename: str


ALLOWED_STATES = ["approved"]


@implementer(IPublishTraverse)
class CSVDownloadsView(BrowserView):

    report: str = ""

    def __init__(self, context, request):
        self._reports = {"voters.csv": self._voters}
        super().__init__(context, request)

    def publishTraverse(self, request, name):
        if name in self._reports:  # ../@@pf-downloads/voters.csv
            self.report = name
        else:
            raise NotFound(self, name, request)
        return self

    def _voters(self, buffer: StringIO) -> ReportData:
        """List of voters e-mails."""
        writer = csv.writer(buffer)
        brains = api.content.find(
            portal_type="FoundationMember", review_state=ALLOWED_STATES
        )
        for brain in brains:
            member = brain.getObject()
            row = []
            row.append(member.email)
            writer.writerow(row)
        data = buffer.getvalue()
        now = datetime.now()
        filename = f"{now:%Y%m%d-%H%M%S}-voters.csv"
        return ReportData(data, filename)

    def __call__(self):
        if not self.report:
            raise NotFound(self, "", self.request)
        buffer = StringIO()
        func = self._reports[self.report]
        report_data: ReportData = func(buffer)
        self.request.response.setHeader("Content-type", "text/csv;charset=UTF-8")
        self.request.response.setHeader(
            "Content-Disposition", f"attachment; filename={report_data.filename}"
        )
        return report_data.data
