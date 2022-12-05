from plone.app.content.interfaces import INameFromTitle
from plone.app.textfield import RichText
from plone.dexterity.content import Item
from plone.i18n.normalizer.interfaces import IUserPreferredURLNormalizer
from plone.supermodel.model import Schema
from ploneorg import _
from ploneorg.vocabularies import platform_vocabulary
from zope import schema
from zope.globalrequest import getRequest
from zope.interface import alsoProvides
from zope.interface import implementer
from zope.publisher.interfaces.http import IHTTPRequest

import datetime
import logging


logger = logging.getLogger(__name__)


# TODO: Replace datagridfield with something that works in Volto
class IReleaseUpload(Schema):
    """File download link for a Plone release"""

    description = schema.TextLine(title=_("Description"), required=False)
    platform = schema.Choice(
        title=_("Platform"), vocabulary=platform_vocabulary, required=False
    )
    url = schema.TextLine(title=_("URL"), required=False)
    file_size = schema.TextLine(title=_("File size"), required=False)


class IPloneRelease(Schema):
    """A Plone release"""

    version = schema.TextLine(title=_("Version"), required=True)
    description = schema.Text(
        title=_("Description"),
        required=False,
    )
    release_date = schema.Date(
        title=_("Release date"), required=False, default=datetime.date.today()
    )
    release_notes = RichText(
        title=_("Release notes"),
        default_mime_type="text/html",
        output_mime_type="text/html",
        allowed_mime_types=(
            "text/plain",
            "text/html",
            "text/restructured",
            "text/x-web-markdown",
        ),
        required=False,
    )
    changelog = RichText(
        title=_("Changelog"),
        default_mime_type="text/restructured",
        output_mime_type="text/html",
        allowed_mime_types=(
            "text/plain",
            "text/html",
            "text/restructured",
            "text/x-web-markdown",
        ),
        required=False,
    )

    # directives.widget(files=DataGridFieldFactory)
    files = schema.List(
        title=_("Files"),
        # value_type=DictRow(title=_(u'Uploads'), schema=IReleaseUpload),
        value_type=schema.TextLine(),
        required=False,
    )


@implementer(IPloneRelease)
class PloneRelease(Item):
    """ """

    @property
    def title(self):
        return "Plone %s" % self.version

    def Title(self):
        return self.title

    def setTitle(self, value):
        # Volto tries to set the title to None.  We ignore this.
        # See https://github.com/plone/plone.org/issues/46
        logger.warning("Ignoring setTitle on PloneRelease. Requested value: %r", value)


class INameFromVersion(INameFromTitle):
    def title():
        """Return the version number"""


@implementer(INameFromVersion)
class NameFromVersion(object):
    def __init__(self, context):
        self.context = context
        request = getattr(context, "REQUEST", None)
        if request is None or isinstance(request, str):
            # Handle '<Special Object Used to Force Acquisition>' case
            request = getRequest()
        alsoProvides(request, IChooseMyOwnDamnName)

    @property
    def title(self):
        return self.context.version


class IChooseMyOwnDamnName(IHTTPRequest):
    """We need to be able to adapt the request for PloneRelease objects to
    get to our own IUserPreferredURLNormalizer.
    """


@implementer(IUserPreferredURLNormalizer)
class VersionNumberURLNormalizer(object):
    """Override the id normalizer so that we get something that looks like
    a version number.
    """

    def __init__(self, context):
        self.context = context

    def normalize(self, text):
        """Returns the text as submitted, otherwise we wind up with version
        numbers like '5-0.7'.
        Also, unicode fails the folder's checkIdAvailable test, so we make sure
        it's a string.
        """
        return str(text)
