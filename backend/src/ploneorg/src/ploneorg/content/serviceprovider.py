# -*- coding: utf-8 -*-
from plone.app.content.interfaces import INameFromTitle
from plone.app.textfield import RichText
from plone.dexterity.content import Item
from plone.namedfile.field import NamedBlobImage
from plone.rfc822.interfaces import IPrimaryField
from plone.supermodel.directives import fieldset
from plone.supermodel.model import Schema
from ploneorg import _
from ploneorg.content.foundationsponsor import isEmail
from ploneorg.content.foundationsponsor import isHTTP
from ploneorg.vocabularies import org_size_vocabulary
from ploneorg.vocabularies.countries import countries_vocabulary
from zope import schema
from zope.interface import alsoProvides
from zope.interface import implementer


class IServiceProvider(Schema):

    fieldset(
        "Location",
        label="Contacts",
        fields=[
            "address",
            "city",
            "zip_code",
            "country",
            "email1",
            "email2",
            "phone1",
            "phone2",
            "website",
            "contact_form_url",
        ],
    )

    fieldset(
        "ContactPerson",
        label="Contact Person",
        fields=["contact_fullname", "contact_email", "contact_phone", "contact_role"],
    )

    fieldset(
        "Services",
        label="Services and Portfolio",
        fields=[
            "services",
            "portfolio",
            "industries",
            "customer_retention",
            "certificates",
        ],
    )

    fieldset(
        "Social",
        label="Social Media",
        fields=["linkedin", "instagram", "youtube", "facebook", "twitter"],
    )

    fieldset(
        "Photos",
        label="Photos",
        fields=["photo1", "photo2", "photo3", "photo4", "photo5"],
    )

    title = schema.TextLine(
        title=_("Company Name"),
        description=_("The official company name."),
        required=True,
    )

    description = schema.Text(
        title=_("Short Description"),
        description=_("A short summary of the company (1–2 sentences)."),
        required=True,
    )

    logo = NamedBlobImage(
        title=_("Logo"),
        description=_("Upload the company logo (used as primary image)."),
        required=True,
    )

    sponsorship_type = schema.Choice(
        title=_("Sponsor Type", default="Sponsor Type"),
        vocabulary="ploneorg.vocabulary.sponsorship_types",
        required=True,
    )
    orgsize = schema.Choice(
        title=_("Organization size"),
        description=_("Number of people in your organization. It's fine to estimate."),
        vocabulary=org_size_vocabulary,
        required=True,
    )

    website = schema.URI(
        title=_("Website"),
        description=_("Main website URL. Must start with http:// or https://."),
        required=True,
        constraint=isHTTP,
    )

    rating = schema.Int(
        title=_("Rating"),
        description=_("Internal rating, between 1 and 5."),
        min=1,
        max=5,
        required=False,
    )

    languages = schema.List(
        title=_("Languages"),
        description=_("Languages spoken or supported by the provider."),
        value_type=schema.Choice(
            vocabulary="plone.app.vocabularies.AvailableContentLanguages"
        ),
        required=False,
    )

    country = schema.Choice(
        title=_("Country"),
        description=_("Select the primary country of operation."),
        vocabulary=countries_vocabulary,
        required=False,
    )

    services = RichText(
        title=_("Services"),
        description=_("Detailed description of services offered."),
        required=False,
    )

    portfolio = RichText(
        title=_("Portfolio / Case Studies"),
        description=_("Showcase past projects, implementations, and case studies."),
        required=False,
    )

    certificates = RichText(
        title=_("Certificates"),
        description=_("Relevant certifications or awards."),
        required=False,
    )

    body = RichText(
        title=_("Full Body Text"),
        description=_("Full-length company profile, story, or extended content."),
        required=False,
    )

    customer_retention = schema.Int(
        title=_("Customer Retention %"),
        description=_("Percentage of customers retained (optional metric)."),
        required=False,
    )

    industries = schema.List(
        title=_("Industries"),
        description=_("Industries served by this provider."),
        value_type=schema.Choice(
            values=[
                "University & Education",
                "Non-Profit & NGO",
                "Oil & Gas",
                "Government & Public Sector",
                "Finance & Banking",
                "Healthcare & Life Sciences",
                "Media & Publishing",
                "Transport & Logistics",
                "Retail & E-commerce",
                "Technology & IT Services",
                "Legal Services",
                "Professional Services",
                "Manufacturing & Industry",
                "Energy & Utilities",
                "Telecommunications",
            ]
        ),
        required=False,
    )

    contact_fullname = schema.TextLine(
        title=_("Full Name"),
        description=_("Primary contact person full name."),
        required=False,
    )

    contact_email = schema.TextLine(
        title=_("Email"),
        description=_("Primary contact email address."),
        constraint=isEmail,
        required=False,
    )

    contact_phone = schema.TextLine(
        title=_("Phone"),
        description=_("Primary contact phone number."),
        required=False,
    )

    contact_role = schema.TextLine(
        title=_("Role"),
        description=_("Job title or role of the contact person."),
        required=False,
    )

    address = schema.TextLine(
        title=_("Address"),
        description=_("Street address of the office."),
        required=False,
    )

    city = schema.TextLine(
        title=_("City"),
        description=_("City where the office is located."),
        required=False,
    )

    zip_code = schema.TextLine(
        title=_("ZIP Code"),
        description=_("Postal/ZIP code."),
        required=False,
    )

    email1 = schema.TextLine(
        title=_("Email 1"),
        description=_("General contact email address."),
        constraint=isEmail,
        required=False,
    )

    email2 = schema.TextLine(
        title=_("Email 2"),
        description=_("Secondary contact email address."),
        constraint=isEmail,
        required=False,
    )

    phone1 = schema.TextLine(
        title=_("Phone 1"),
        description=_("General contact phone number."),
        required=False,
    )

    phone2 = schema.TextLine(
        title=_("Phone 2"),
        description=_("Secondary contact phone number."),
        required=False,
    )

    contact_form_url = schema.URI(
        title=_("Contact Form URL"),
        description=_("Direct link to an external contact form."),
        constraint=isHTTP,
        required=False,
    )

    linkedin = schema.URI(
        title=_("LinkedIn"),
        description=_("Link to LinkedIn company or profile page."),
        required=False,
        constraint=isHTTP,
    )

    instagram = schema.URI(
        title=_("Instagram"),
        description=_("Link to Instagram profile."),
        required=False,
        constraint=isHTTP,
    )

    youtube = schema.URI(
        title=_("YouTube Channel"),
        description=_("Link to YouTube company channel."),
        required=False,
        constraint=isHTTP,
    )

    facebook = schema.URI(
        title=_("Facebook"),
        description=_("Link to Facebook page."),
        required=False,
        constraint=isHTTP,
    )

    twitter = schema.TextLine(
        title=_("Twitter"),
        description=_("Twitter handle, without the leading @."),
        required=False,
    )

    photo1 = NamedBlobImage(
        title=_("Photo 1"), description=_("Optional showcase photo."), required=False
    )
    photo2 = NamedBlobImage(
        title=_("Photo 2"), description=_("Optional showcase photo."), required=False
    )
    photo3 = NamedBlobImage(
        title=_("Photo 3"), description=_("Optional showcase photo."), required=False
    )
    photo4 = NamedBlobImage(
        title=_("Photo 4"), description=_("Optional showcase photo."), required=False
    )
    photo5 = NamedBlobImage(
        title=_("Photo 5"), description=_("Optional showcase photo."), required=False
    )

    start_date = schema.Date(
        title=_("Start Date", default="Start Date"), required=False
    )

    end_date = schema.Date(title=_("End Date", default="End Date"), required=False)

    payment_date = schema.Date(
        title=_("Payment Date", default="Payment Date"), required=False
    )

    last_verified_date = schema.Date(
        title=_("Status last verified date", default="Status last verified date"),
        required=False,
    )

    notes = RichText(title=_("Private notes", default="Private notes"), required=False)

    public_notes = RichText(
        title=_("Public notes", default="Public notes"), required=False
    )


alsoProvides(IServiceProvider["logo"], IPrimaryField)


@implementer(IServiceProvider)
class ServiceProvider(Item):
    def get_full_name(self):
        return self.title

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

    def toXML(self, schematas=None):
        if schematas is None:
            schematas = ["Contacts", "ContactPerson", "Social"]
        out = f'<serviceprovider id="{self.getId()}">'
        for name in schematas:
            value = getattr(self, name, None)
            if value:
                out += f"<{name}>{value}</{name}>"
        out += "</serviceprovider>"
        return out


class INameFromCompany(INameFromTitle):
    def title():
        """Return processed title"""


@implementer(INameFromCompany)
class NameFromCompany(object):
    def __init__(self, context):
        self.context = context

    @property
    def title(self):
        return self.context.title
