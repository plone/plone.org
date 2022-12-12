from plone.indexer import indexer
from ploneorg.content.foundationsponsor import IFoundationSponsor


@indexer(IFoundationSponsor)
def remote_url_indexer(obj):
    return obj.remoteUrl
