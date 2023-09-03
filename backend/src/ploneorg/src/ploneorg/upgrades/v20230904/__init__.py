from collections import defaultdict
from dataclasses import dataclass
from plone import api
from ploneorg import logger
from Products.CMFPlone.Portal import PloneSite
from Products.GenericSetup.tool import SetupTool
from typing import List

import transaction


PREFIX = "pas.plugins.authomatic.interfaces.IPasPluginsAuthomaticSettings"


@dataclass
class UserInfo:
    user_name: str
    user_id: str
    fullname: str
    email: str
    github_username: str
    github_id: str
    portrait: str
    login_time: str
    last_login_time: str
    groups: List[str]


def get_gh_users(site: PloneSite) -> List[UserInfo]:
    pas = site.acl_users
    kw = {}
    results = {user["userid"] for user in pas.searchUsers(**kw)}
    users = [site.portal_membership.getMemberById(userid) for userid in results]
    users_info = {}
    for user in users:
        gh_info = {}
        github_id = ""
        user_id = user.getUserId()
        portrait = user.getProperty("portrait", "")
        # Probably github account
        if not len(user_id) == 36:
            continue
        gh_info = pas.authomatic._useridentities_by_userid[user_id].identity("github")
        github_id = gh_info.get("id", "")
        portrait = gh_info.get("picture", "")
        user_info = UserInfo(
            user.getUserName(),
            user.getUserId(),
            user.getProperty("fullname", ""),
            user.getProperty("email", ""),
            gh_info.get("username", ""),
            github_id,
            portrait,
            user.getProperty("login_time", ""),
            user.getProperty("last_login_time", ""),
            [g.id for g in api.group.get_groups(user=user)],
        )
        users_info[user_info.user_name] = user_info
    return users_info


def content_by_user(users_info: List[UserInfo], site: PloneSite) -> dict:
    content = {
        "content": defaultdict(list),
        "user": defaultdict(list),
    }
    with api.env.adopt_roles(
        [
            "Manager",
            "Site Administrator",
        ]
    ):
        brains = site.portal_catalog.searchResults()

    for brain in brains:
        obj = brain.getObject()
        local_roles = obj.get_local_roles()
        if local_roles:
            for (g, r) in local_roles:
                if g in users_info:
                    content["content"][brain.UID].append((g, r))
                    content["user"][g].append((brain.UID, r))
    return content


def _update_user(user_info: UserInfo, site: PloneSite):
    pas = site.acl_users
    authomatic = pas.authomatic
    prop = pas.mutable_properties
    md = site.portal_memberdata
    old_id = user_info.user_id
    new_id = user_info.github_username
    github_id = user_info.github_id
    groups = [g for g in user_info.groups if g != "AuthenticatedUsers"]
    for group in groups:
        api.group.remove_user(groupname=group, username=old_id)
    # Update Authomatic
    authomatic._useridentities_by_userid[
        new_id
    ] = pas.authomatic._useridentities_by_userid[old_id]
    authomatic._useridentities_by_userid[new_id].userid = new_id
    authomatic._userid_by_identityinfo[("github", github_id)] = new_id
    del authomatic._useridentities_by_userid[old_id]
    # Update Memberdata
    prop._storage[new_id] = prop._storage[old_id]
    md._members[new_id] = md._members[old_id]
    del md._members[old_id]
    del prop._storage[old_id]
    # Update Groups info
    for group in groups:
        api.group.add_user(groupname=group, username=new_id)
    user = api.user.get(userid=new_id)
    # Update username
    user._user._login = new_id
    return user


def update_userid_factory_name(_: SetupTool):
    with transaction.manager as tm:
        logger.info("Update userid_factory_name to username.")
        new_value = "username"
        key = f"{PREFIX}.userid_factory_name"
        current = api.portal.get_registry_record(key)
        api.portal.set_registry_record(key, new_value)
        logger.info(f"- Configuration updated in {key} from {current} to {new_value}")
        tm.note(f"Authomatic: Updated {key}")


def update_users(_: SetupTool):
    site = api.portal.get()
    users_info = get_gh_users(site)
    content = content_by_user(users_info, site)
    with transaction.manager as tm:
        for idx, (old_id, user_info) in enumerate(users_info.items()):
            user = _update_user(user_info, site)
            logger.info(f"-- {old_id} -> {user.getUserName()}")
            if idx % 10 == 0:
                logger.info(f"Users savepoint: {idx} itens")
                tm.savepoint()

        tm.note(f"Users: Updated {idx + 1} usernames and ids")
    with transaction.manager as tm:
        for idx, (uid, roles) in enumerate(content["content"].items()):
            obj = api.content.get(UID=uid)
            # Update creators field
            creators = []
            for creator in obj.creators:
                actor = (
                    users_info[creator].github_username
                    if creator in users_info
                    else creator
                )
                creators.append(actor)
            obj.creators = tuple(creators)
            for old_id, r in roles:
                obj.manage_delLocalRoles(
                    [
                        old_id,
                    ]
                )
                new_id = users_info[old_id].github_username
                obj.manage_setLocalRoles(new_id, r)
            obj.reindexObject(idxs=["Creator", "allowedRolesAndUsers", "listCreators"])
            if idx % 100 == 0:
                logger.info(f"Content savepoint: {idx} itens")
                tm.savepoint()
        tm.note(f"Content: Updated local roles for {idx + 1} content items")


def update_workflow(st: SetupTool):
    # Update Foundation Workflow
    with transaction.manager as tm:
        st.runImportStepFromProfile(
            "ploneorg:default", "workflow", run_dependencies=False
        )
        msg = "Updated Plone Foundation Workflow"
        logger.info(msg)
        tm.note(msg)
    # Update workflow mappings
    with transaction.manager as tm:
        wf_tool = api.portal.get_tool("portal_workflow")
        wf_tool.updateRoleMappings()
        msg = "Updated workflow security"
        logger.info(msg)
        tm.note(msg)
