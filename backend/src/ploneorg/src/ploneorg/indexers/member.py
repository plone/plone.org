from plone.indexer import indexer
from ploneorg.content.member import IFoundationMember


@indexer(IFoundationMember)
def description_indexer(obj):
    return obj.description
