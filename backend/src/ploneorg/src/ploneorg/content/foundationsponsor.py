from plone.app.content.interfaces import INameFromTitle
from plone.app.dexterity import _ as _PMF
from plone.app.textfield import RichText
from plone.autoform.directives import read_permission
from plone.dexterity.content import Item
from plone.namedfile.field import NamedBlobImage
from plone.rfc822.interfaces import IPrimaryField
from plone.supermodel.directives import fieldset
from plone.supermodel.model import Schema
from ploneorg import _
from ploneorg.vocabularies import org_size_vocabulary
from ploneorg.vocabularies import payment_currency_vocabulary
from ploneorg.vocabularies import payment_frequency_vocabulary
from ploneorg.vocabularies import payment_method_vocabulary
from ploneorg.vocabularies import sponsorship_type_vocabulary
from zope import schema
from zope.interface import alsoProvides
from zope.interface import implementer
from zope.interface import Invalid

import re


# TODO: add workflow state Waiting for Initial Payment
# TODO: display effective and expiry date in view template
# TODO: display status in view template
# TODO: use logo as lead image
# TODO: add button to send an email to the primary contact
# TODO: set effective and expiry dates from payment start and end dates
# TODO: make payment date not required (e.g. waiting for payment)
# TODO: enable commenting/discussion instead of commenting with change comments?

# email re w/o leading '^'
EMAIL_RE = "([0-9a-zA-Z_&.'+-]+!)*[0-9a-zA-Z_&.'+-]+@(([0-9a-zA-Z]([0-9a-zA-Z-]*[0-9a-z-A-Z])?\.)+[a-zA-Z]{2,}|([0-9]{1,3}\.){3}[0-9]{1,3})$"  # noQA


def isEmail(value):
    prog = re.compile("^" + EMAIL_RE)
    result = prog.match(value)
    if result is None:
        raise Invalid(_PMF("is not a valid email address."))
    return True


def isHTTP(value):
    if not value.startswith("http://") and not value.startswith("https://"):
        raise Invalid(_PMF("web address must start with http:// or https://"))
    return True


class IFoundationSponsor(Schema):
    """A Foundation sponsor"""

    fieldset(
        "Contacts",
        label="Contacts",
        fields=[
            "fname",
            "lname",
            "email",
            "alt_fname",
            "alt_lname",
            "alt_email",
        ],
    )

    fieldset(
        "Address",
        label="Address",
        fields=[
            "address",
            "address2",
            "city",
            "state",
            "postalCode",
            "country",
        ],
    )

    fieldset(
        "Payment",
        label="Payment",
        fields=[
            "payment_frequency",
            "payment_method",
            "payment_amount",
            "payment_currency",
            "payment_date",
        ],
    )

    fieldset(
        "Status",
        label="Status",
        fields=[
            "start_date",
            "end_date",
            "last_verified_date",
            "notes",
        ],
    )

    org_name = schema.TextLine(
        title=_PMF("Organization name", default="Organization name"), required=True
    )

    logo = NamedBlobImage(
        title=_("Logo"),
        required=False,
    )

    sponsorship_type = schema.Choice(
        title=_PMF("Sponsor Type", default="Sponsor Type"),
        vocabulary=sponsorship_type_vocabulary,
        required=True,
    )

    read_permission(orgsize="ploneorg.foundationsponsor.view")
    orgsize = schema.Choice(
        title=_("Organization size"),
        description=_("Number of people in your organization. It's fine to estimate."),
        vocabulary=org_size_vocabulary,
        required=True,
    )

    is_provider = schema.Bool(
        title=_PMF("Is a Plone provider", default="Is a Plone provider"),
    )

    website = schema.URI(
        title=_PMF("Web Site", default="Web Site"),
        description=_("Enter a http:// or https:// web address"),
        required=False,
        constraint=isHTTP,
    )

    provider_listing_url = schema.URI(
        title=_PMF("Plone.com provider listing", default="Plone.com provider listing"),
        description=_("Enter a http:// or https:// web address"),
        required=False,
        constraint=isHTTP,
    )

    read_permission(fname="ploneorg.foundationsponsor.view")
    fname = schema.TextLine(
        title=_PMF("Contact first name", default="Contact first name"), required=True
    )

    read_permission(lname="ploneorg.foundationsponsor.view")
    lname = schema.TextLine(
        title=_PMF("Contact last name", default="Contact last name"), required=True
    )

    read_permission(email="ploneorg.foundationsponsor.view")
    email = schema.TextLine(
        title=_PMF("Email", default="Email"), constraint=isEmail, required=True
    )

    read_permission(address="ploneorg.foundationsponsor.view")
    address = schema.TextLine(title=_PMF("Address", default="Address"), required=False)

    read_permission(address2="ploneorg.foundationsponsor.view")
    address2 = schema.TextLine(
        title=_PMF("Address 2", default="Address 2"), required=False
    )

    city = schema.TextLine(title=_PMF("City", default="City"), required=True)

    read_permission(state="ploneorg.foundationsponsor.view")
    state = schema.TextLine(title=_PMF("State", default="State"), required=False)

    read_permission(postalCode="ploneorg.foundationsponsor.view")
    postalCode = schema.TextLine(
        title=_PMF("Postal code", default="Postal code"), required=False
    )

    country = schema.Choice(
        title=_PMF("Country", default="Country"),
        vocabulary="ploneorg.vocabulary.countries",
        default="USA",
        required=True,
    )

    read_permission(alt_fname="ploneorg.foundationsponsor.view")
    alt_fname = schema.TextLine(
        title=_PMF(
            "Alternate contact first name", default="Alternate contact first name"
        ),
        required=False,
    )

    read_permission(alt_lname="ploneorg.foundationsponsor.view")
    alt_lname = schema.TextLine(
        title=_PMF(
            "Alternate contact last name", default="Alternate contact last name"
        ),
        required=False,
    )

    read_permission(alt_email="ploneorg.foundationsponsor.view")
    alt_email = schema.TextLine(
        title=_PMF("Alternate email", default="Alternate email"),
        constraint=isEmail,
        required=False,
    )

    twitter = schema.TextLine(
        title=_PMF("Twitter account", default="Twitter account"),
        description=_PMF(
            "(without the leading " "@" ")", default="(without the leading " "@" ")"
        ),
        required=False,
    )

    read_permission(connection_to_plone="ploneorg.foundationsponsor.view")
    connection_to_plone = RichText(
        title=_PMF("Connection to Plone", default="Connection to Plone"),
        description=_(
            "What is your connection to Plone? How is Plone used by your organization?"
        ),
        required=False,
    )

    read_permission(payment_frequency="ploneorg.foundationsponsor.view")
    payment_frequency = schema.Choice(
        title=_PMF("Payment frequency", default="Payment frequency"),
        vocabulary=payment_frequency_vocabulary,
    )

    read_permission(payment_method="ploneorg.foundationsponsor.view")
    payment_method = schema.Choice(
        title=_PMF("Payment method", default="Payment method"),
        vocabulary=payment_method_vocabulary,
        default="PayPal",
        required=True,
    )

    read_permission(payment_amount="ploneorg.foundationsponsor.view")
    payment_amount = schema.Float(
        title=_PMF("Payment Amount", default="Payment Amount"), min=0.0, required=True
    )

    read_permission(payment_currency="ploneorg.foundationsponsor.view")
    payment_currency = schema.Choice(
        title=_PMF("Currency", default="Currency"),
        vocabulary=payment_currency_vocabulary,
        default="USD",
        required=True,
    )

    start_date = schema.Date(
        title=_PMF("Start Date", default="Start Date"), required=False
    )

    end_date = schema.Date(title=_PMF("End Date", default="End Date"), required=False)

    read_permission(payment_date="ploneorg.foundationsponsor.view")
    payment_date = schema.Date(
        title=_PMF("Payment Date", default="Payment Date"), required=False
    )

    read_permission(last_verified_date="ploneorg.foundationsponsor.view")
    last_verified_date = schema.Date(
        title=_PMF("Status last verified date", default="Status last verified date"),
        required=False,
    )

    read_permission(notes="ploneorg.foundationsponsor.view")
    notes = RichText(
        title=_PMF("Private notes", default="Private notes"), required=False
    )

    public_notes = RichText(
        title=_PMF("Public notes", default="Public notes"), required=False
    )


alsoProvides(IFoundationSponsor["logo"], IPrimaryField)


@implementer(IFoundationSponsor)
class FoundationSponsor(Item):
    @property
    def title(self):
        return self.org_name

    def setTitle(self, value):
        return

    def get_full_name(self):
        names = [
            self.org_name,
            self.fname,
            self.lname,
        ]
        return " ".join([name for name in names if name])

    @property
    def preview_image(self):
        return self.logo

    @preview_image.setter
    def preview_image(self, value):
        self.logo = value

    @property
    def preview_caption(self):
        return self.title

    @preview_caption.setter
    def preview_caption(self, value):
        pass

    @property
    def remoteUrl(self):
        return self.website

    @remoteUrl.setter
    def remoteUrl(self, value):
        self.website = value

    def toXML(self, schematas=["contact", "survey"]):
        """To XML for Paul ;)"""

        out = ""
        out += '<foundationsponsor id="%s">' % self.getId()
        fields = [
            f
            for f in self.Schema().fields()
            if (f.schemata in schematas) and f.getName() != "id"
        ]
        for f in fields:
            out += "<%s>%s</%s>" % (
                f.getName(),
                getattr(self, f.accessor)(),
                f.getName(),
            )
        out += "</foundationsponsor>"
        return out


class INameFromPersonNames(INameFromTitle):
    def title():
        """Return a processed title"""


@implementer(INameFromPersonNames)
class NameFromPersonNames(object):
    def __init__(self, context):
        self.context = context

    @property
    def title(self):
        return self.context.org_name
