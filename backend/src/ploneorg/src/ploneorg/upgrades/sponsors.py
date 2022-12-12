from plone import api
from ploneorg import logger


STATE_LAUNCH = {
    "4teamwork": "pending_renewal",
    "aahs-slotenwacht": "approved",
    "affinitic": "pending_renewal",
    "agile-coach": "approved",
    "agitator-weblosungen": "approved",
    "alteroo": "pending_renewal",
    "atreal": "pending_renewal",
    "bit4mation-ug": "pending_renewal",
    "business-webbing": "approved",
    "cloud19": "approved",
    "codehutlabs": "pending_renewal",
    "codesyntax": "pending_renewal",
    "cris-ewing": "emeritus",
    "derico": "pending_renewal",
    "eau-de-web": "approved",
    "ecityclic-by-semic": "approved",
    "ecreall": "approved",
    "enfold": "approved",
    "flying-circus": "approved",
    "forcontent": "pending_renewal",
    "four-digits": "emeritus",
    "imio": "approved",
    "interaktiv": "pending_renewal",
    "iskra": "emeritus",
    "jazkarta": "approved",
    "juizi-web-development": "approved",
    "kitconcept": "pending_renewal",
    "klein-partner-kg": "approved",
    "kombinat": "approved",
    "maid2clean": "approved",
    "makina-corpus": "pending_renewal",
    "mooball-technologies": "approved",
    "niteo": "pending_renewal",
    "operun": "pending_renewal",
    "pretagov": "pending_renewal",
    "programmatic": "pending_renewal",
    "psw-group": "pending_renewal",
    "pythonunited": "pending_renewal",
    "rackspace": "emeritus",
    "redturtle": "approved",
    "reid-mcmahon": "emeritus",
    "retrans": "pending_renewal",
    "rohberg": "pending_renewal",
    "rotterdam-slotenmaker": "emeritus",
    "semic": "pending_renewal",
    "sixfeetup": "approved",
    "slotenmaker-amsterdam": "approved",
    "soliton": "approved",
    "starzel": "approved",
    "syslab": "approved",
    "tecnoteca": "approved",
    "testalize": "pending_renewal",
    "thevirtual": "approved",
    "thomas-schorr-software-development-consulting": "approved",
    "unified": "pending_renewal",
    "universite-de-namur": "pending_renewal",
    "upc-universitat-politecnica-de-catalunya": "emeritus",
    "uwd": "pending_renewal",
    "webmeisterei": "pending_renewal",
    "wildcard": "pending_renewal",
    "xhostplus": "emeritus",
    "zest-software": "approved",
    "zopyx": "approved",
}


def set_state_sponsors(setup_tool=None):
    """Fix Sponsor review states."""
    brains = api.content.find(portal_type="FoundationSponsor")
    logger.info(f"Found {len(brains)} sponsors")
    for brain in brains:
        o_id = brain.getId
        obj = brain.getObject()
        new_state = STATE_LAUNCH.get(o_id, "")
        if new_state:
            api.content.transition(obj, to_state=new_state)
            logger.info(f" - Transitioned {o_id} to {new_state}")
        # Also reindex the object to get new preview_image
        obj.reindexObject()

    logger.info(f"Transitioned {len(brains)} sponsors")


def reindex_sponsorship_type(setup_tool=None):
    """Reindex sponsor sponsorship_type."""
    brains = api.content.find(portal_type="FoundationSponsor")
    logger.info(f"Found {len(brains)} sponsors")
    for brain in brains:
        obj = brain.getObject()
        obj.reindexObject(idxs=["sponsorship_type"])

    logger.info(f"Reindexed {len(brains)} sponsors")


def reindex_is_provider(setup_tool=None):
    """Reindex sponsor is_provider."""
    brains = api.content.find(portal_type="FoundationSponsor")
    logger.info(f"Found {len(brains)} sponsors")
    for brain in brains:
        obj = brain.getObject()
        obj.reindexObject(idxs=["is_provider"])

    logger.info(f"Reindexed {len(brains)} sponsors")


def add_is_provider(setup_tool=None):
    """Add add_is_provider querystring."""
    brains = api.content.find(portal_type="FoundationSponsor")
    logger.info(f"Found {len(brains)} sponsors")
    for brain in brains:
        obj = brain.getObject()
        obj.reindexObject(idxs=["is_provider"])

    logger.info(f"Reindexed {len(brains)} sponsors")
