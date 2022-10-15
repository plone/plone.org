from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary

import pycountry


@provider(IVocabularyFactory)
def countries_vocabulary(context):
    """Vocabulary of countries."""
    terms = []
    for country in pycountry.countries:
        token = country.alpha_2
        name = country.name
        terms.append(SimpleTerm(token, token, name))
    return SimpleVocabulary(terms)
