from plone.stringinterp.adapters import BaseSubstitution
from ploneorg import _
from ploneorg.content.member import IFoundationMember
from zope.component import adapter


@adapter(IFoundationMember)
class EmailSubstitution(BaseSubstitution):
    category = _("Foundation Member")
    description = _("Member E-mail")

    def safe_call(self):
        name = self.context.title
        email = self.context.email
        if name and email:
            return f"{name}<{email}>"


@adapter(IFoundationMember)
class RenewURLSubstitution(BaseSubstitution):
    category = _("Foundation Member")
    description = _("Renew URL")

    def safe_call(self):
        url = self.context.absolute_url()
        return f"{url}/renew_membership>"
