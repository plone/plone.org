from plone import api
from plone.app.textfield import RichText
from plone.autoform import directives
from plone.dexterity.content import Container
from plone.schema.email import Email
from plone.supermodel import model
from ploneorg import _
from unicodedata import lookup
from zope import schema
from zope.interface import implementer


def flag_for_country_code(code: str) -> str:
    """Return the unicode representing the flag of a Country."""
    flag = code
    if len(code) == 2:
        code = code.lower()
        flag = lookup(f"REGIONAL INDICATOR SYMBOL LETTER {code[0]}") + lookup(
            f"REGIONAL INDICATOR SYMBOL LETTER {code[1]}"
        )
    return flag


class IFoundationMember(model.Schema):
    """Plone Foundation Member."""

    model.fieldset(
        "default",
        _("About you"),
        fields=[
            "title",
            "email",
            "organization",
            "merit",
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
        _("Social Networks"),
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
    postal_code = schema.TextLine(title=_("Postal code"), required=False)

    country = schema.Choice(
        title=_("Country"),
        vocabulary="ploneorg.vocabulary.countries",
        required=True,
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

    @property
    def description(self):
        organization = ""
        # Only list organization for active members
        if api.content.get_state(self) in ("approved", "pending_renewal"):
            organization = self.organization or ""
        city = self.city or ""
        country = flag_for_country_code(self.country or "")
        description = [organization, city, country]
        return " | ".join([item for item in description if item.strip()])

    @description.setter
    def description(self, value):
        pass
