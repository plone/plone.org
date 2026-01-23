from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


@provider(IVocabularyFactory)
def types_vocabulary(context):
    """Vocabulary of sponsorship types."""
    terms = []
    for token in ["platinum", "premium", "standard", "basic", "university"]:
        terms.append(SimpleTerm(token, token, token.title()))
    return SimpleVocabulary(terms)
