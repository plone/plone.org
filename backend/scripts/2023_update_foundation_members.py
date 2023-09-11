from AccessControl.SecurityManagement import newSecurityManager
from csv import DictReader
from pathlib import Path
from plone import api
from ploneorg import logger
from Testing.makerequest import makerequest
from zope.component.hooks import setSite

import logging
import transaction


logging.basicConfig()
logger.setLevel(logging.INFO)


app = makerequest(globals()["app"])
admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)

site = app.Plone
setSite(site)

COLUMNS = [
    "path",
    "id",
    "title",
    "review_state",
    "created",
    "year",
    "email",
    "organization",
    "country",
    "github",
    "twitter",
    "linkedin",
    "local_roles",
    "Same as Local Role",
    "New Id",
    "Fix Local  Role",
]

members = []
path = Path(__name__).parent / "2023-members.csv"
with open(path, "r") as fh:
    reader = DictReader(fh, COLUMNS)
    for idx, line in enumerate(reader):
        if not idx:
            continue
        members.append(line)

with transaction.manager as tm:
    for idx, info in enumerate(members):
        path = info["path"][6:]
        title = info["title"]
        obj = api.content.get(path=path)
        if not obj:
            logger.info(f"- Ignoring {title} ({path})")
            continue
        logger.info(f"- Processing {title} ({path})")
        # Set new values
        for key in ("email", "github", "twitter", "linkedin"):
            value = info[key].strip()
            if not value:
                continue
            setattr(obj, key, value)
            logger.info(f"-- Updated {key} to {value}")

        # Fix local roles
        new_local_role = info["Fix Local  Role"].strip()
        if new_local_role:
            obj.manage_setLocalRoles(new_local_role, "Owner")
            logger.info(f"-- Updated local role Owner to {new_local_role}")
        # Change Id
        new_id = info["New Id"].strip()
        if new_id:
            api.content.rename(obj, new_id)
            logger.info(f"-- Renamed content to {new_id}")
        if idx % 10 == 0:
            logger.info("Savepoint")
            tm.savepoint()
    tm.note(f"Updated {idx + 1} Foundation member profiles")

app._p_jar.sync()

# Transitions
for idx, info in enumerate(members):
    old_id = info["id"].strip()
    new_id = info["New Id"].strip() or old_id
    size_old_id = -len(old_id)
    path = info["path"][6:size_old_id]
    path = f"{path}{new_id}"
    title = info["title"]
    year = info["year"]
    obj = api.content.get(path=path)
    review_state = api.content.get_state(obj)
    with transaction.manager as tm:
        # Approve members that were not approved moved to
        # emeritus in 2022
        if review_state == "pending_renewal":
            api.content.transition(obj, transition="approve")
        # Suspend members (but keep members approved this year)
        if review_state == "approved" and int(year) < 2023:
            api.content.transition(obj, transition="suspend")
            msg = f"Foundation member {title} suspended for renewal"
            logger.info(msg)
            tm.note(msg)

app._p_jar.sync()
