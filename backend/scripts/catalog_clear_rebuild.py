# Run this from the backend directory with:
# bin/zconsole run instance/etc/zope.conf scripts/catalog_clear_rebuild.py
# or with extra options: --site=nl

from plone import api
from zope.component import getUtility
from zope.component.hooks import setSite

import argparse
import sys
import transaction


parser = argparse.ArgumentParser()
parser.add_argument(
    "--site",
    default="",
    dest="site",
    help="Single site id to work on. Default is to work on all.",
)
# sys.argv will be something like:
# ['.../parts/instance/bin/interpreter', '-c',
#  'scripts/fix_related_items_and_intids.py', '--site=nl']
# Ignore the first three.
options = parser.parse_args(args=sys.argv[3:])

# 'app' is the Zope root.
# Get Plone Sites to work on.
if options.site:
    # Get single Plone Site.
    plones = [getattr(app, options.site)]
else:
    # Get all Plone Sites.
    plones = [
        obj
        for obj in app.objectValues()  # noqa
        if getattr(obj, "portal_type", "") == "Plone Site"
    ]


def commit(note):
    print(note)
    # Commit transaction and add note.
    tr = transaction.get()
    tr.note(note)
    transaction.commit()


for site in plones:
    print("")
    print("Handling Plone Site %s." % site.id)
    setSite(site)
    catalog = api.portal.get_tool(name="portal_catalog")
    catalog.manage_catalogRebuild()
    print(
        "Catalog is rebuilt, now doing a search to empty the indexing queue. This may take long."
    )
    catalog.unrestrictedSearchResults(SearchableText="Maro 1:3")
    note = "Cleared and rebuilt the catalog for %s." % site.id
    commit(note)
    print("Done.")
