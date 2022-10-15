from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary

import pycountry


platforms = ["all platforms", "Mac OS X", "Windows", "Linux/BSD/Unix"]
platform_vocabulary = SimpleVocabulary(
    [SimpleTerm(value=a, token=a, title=a) for a in platforms]
)

payment_frequency_vocabulary = SimpleVocabulary(
    [SimpleTerm(value=a, token=a, title=a) for a in ["annual", "monthly", "n/a"]]
)

payment_method_vocabulary = SimpleVocabulary(
    [
        SimpleTerm(value=a, token=a, title=a)
        for a in ["wire", "check", "PayPal", "in kind", "cash"]
    ]
)

sponsorship_type_vocabulary = SimpleVocabulary(
    [
        SimpleTerm(value=a, token=a, title=a)
        for a in ["premium", "standard", "basic", "university"]
    ]
)

currencies = [
    SimpleTerm(value=currency.alpha_3, token=currency.alpha_3, title=currency.name)
    for currency in pycountry.currencies
]
payment_currency_vocabulary = SimpleVocabulary(currencies)

orgsizes = [
    {"token": "small", "value": "small", "name": "small (up to and including 2 FTEs)"},
    {"token": "medium", "value": "medium", "name": "medium (between 3 and 7 FTEs"},
    {"token": "large", "value": "large", "name": "large (more than 7 FTEs)"},
    {"token": "university", "value": "university", "name": "university"},
]
orgsizes_terms = [
    SimpleTerm(value=orgsize["value"], token=orgsize["token"], title=orgsize["name"])
    for orgsize in orgsizes
]
org_size_vocabulary = SimpleVocabulary(orgsizes_terms)
