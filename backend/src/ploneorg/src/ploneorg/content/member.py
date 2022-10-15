from plone.app.textfield import RichText
from plone.autoform import directives
from plone.dexterity.content import Container
from plone.schema.email import Email
from plone.supermodel import model
from ploneorg import _
from zope import schema
from zope.interface import implementer


class IFoundationMember(model.Schema):
    """Plone Foundation Member."""

    model.fieldset(
        "default",
        _("About you"),
        fields=[
            "title",
            "email",
            "organization",
        ],
    )

    model.fieldset(
        "contact",
        _("Contact Information"),
        fields=[
            "address",
            "city",
            "state",
            "postal_code",
            "country",
        ],
    )

    model.fieldset(
        "social_networks",
        _("Social Networds"),
        fields=["github", "twitter", "linkedin"],
    )

    # Basic info
    title = schema.TextLine(title=_("Name"), required=True)

    directives.read_permission(email="ploneorg.ViewFoundationMemberDetails")
    email = Email(title=_("Email address"), required=False)
    organization = schema.TextLine(title=("Organization"), required=True)

    # Contact information
    directives.read_permission(address="ploneorg.ViewFoundationMemberDetails")
    address = schema.TextLine(title=_("Address"), required=False)
    city = schema.TextLine(title=_("City"), required=False)
    state = schema.TextLine(title=_("State"), required=False)

    directives.read_permission(postal_code="ploneorg.ViewFoundationMemberDetails")
    postal_code = schema.TextLine(title=_("Postal code"), required=True)

    country = schema.Choice(
        title=_("Country"),
        vocabulary="ploneorg.vocabulary.countries",
        required=False,
        missing_value="",
    )

    # Merit
    merit = RichText(
        title=_("Contributions"),
        description=_("Describe your contributions to the Plone community."),
        required=True,
    )

    # Social Networks
    github = schema.TextLine(title=_("Github username"), required=False)
    directives.widget("github", placeholder=_("i.e.: plone"))

    twitter = schema.TextLine(title=_("Twitter username"), required=False)
    directives.widget("twitter", placeholder=_("i.e.: plone"))

    linkedin = schema.URI(title=_("Linkedin profile"), required=False)
    directives.widget(
        "linkedin", placeholder=_("i.e.: https://www.linkedin.com/in/plone/")
    )


@implementer(IFoundationMember)
class FoundationMember(Container):
    """Convenience subclass for ``FoundationMember`` portal type."""

    @property
    def fullname(self):
        return self.title
