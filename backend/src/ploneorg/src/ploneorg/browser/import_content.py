from App.config import getConfiguration
from bs4 import BeautifulSoup
from collective.exportimport.fix_html import fix_html_in_content_fields
from collective.exportimport.fix_html import fix_html_in_portlets
from collective.exportimport.import_content import ImportContent
from logging import getLogger
from pathlib import Path
from plone import api
from plone.base.utils import get_installer
from plone.volto.browser.migrate_to_volto import migrate_richtext_to_blocks
from plone.volto.setuphandlers import add_behavior
from plone.volto.setuphandlers import remove_behavior
from ploneorg.interfaces import IPLONEORGLayer
from Products.Five import BrowserView
from zope.interface import alsoProvides
from ZPublisher.HTTPRequest import FileUpload

import json
import pycountry
import requests
import transaction


logger = getLogger(__name__)

DEFAULT_ADDONS = [
    "plone.app.vulnerabilities",
    "ploneorg",
]

PORTAL_TYPE_MAPPING = {
    "Collection": "Document",
    "Folder": "Document",
}

ALLOWED_TYPES = [
    "Collection",
    "Document",
    "Event",
    "File",
    "Folder",
    "Image",
    "Link",
    "News Item",
    "FoundationMember",
    "FoundationSponsor",
    "hotfix",
    "plonerelease",
    "vulnerability",
]


class ImportAll(BrowserView):
    def __call__(self):
        request = self.request

        # Check for Blocks-conversion
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        r = requests.post(
            "http://localhost:5000/html", headers=headers, json={"html": "<p>text</p>"}
        )
        r.raise_for_status()

        if not request.form.get("form.submitted", False):
            return self.index()

        portal = api.portal.get()

        # install required addons
        installer = get_installer(portal)
        for addon in DEFAULT_ADDONS:
            if not installer.is_product_installed(addon):
                installer.install_product(addon)

        alsoProvides(self.request, IPLONEORGLayer)

        # Fake the target being a classic site...
        # 1. allow folders and collections
        portal_types = api.portal.get_tool("portal_types")
        portal_types["Collection"].global_allow = True
        portal_types["Folder"].global_allow = True
        # 2. enable richtext behavior (to enable deserializing it)
        for type_ in ["Document", "News Item", "Event"]:
            add_behavior(type_, "plone.richtext")

        transaction.commit()
        cfg = getConfiguration()
        directory = Path(cfg.clienthome) / "import"

        # import content
        view = api.content.get_view("import_content", portal, request)
        request.form["form.submitted"] = True
        request.form["commit"] = 500
        view(server_file="ploneorg.json", return_json=True)
        transaction.commit()

        other_imports = [
            "relations",
            "zope_users",
            "members",
            # "translations",
            "localroles",
            "ordering",
            # "defaultpages",
            # "discussion",
            "portlets",
            "redirects",
        ]
        for name in other_imports:
            view = api.content.get_view(f"import_{name}", portal, request)
            path = Path(directory) / f"export_{name}.json"
            results = view(jsonfile=path.read_text(), return_json=True)
            logger.info(results)
            transaction.commit()

        fixers = [table_class_fixer, img_variant_fixer]
        results = fix_html_in_content_fields(fixers=fixers)
        msg = "Fixed html for {} content items".format(results)
        logger.info(msg)
        transaction.commit()

        results = fix_html_in_portlets()
        msg = "Fixed html for {} portlets".format(results)
        logger.info(msg)
        transaction.commit()

        view = api.content.get_view("updateLinkIntegrityInformation", portal, request)
        results = view.update()
        logger.info(f"Updated linkintegrity for {results} items")
        transaction.commit()

        # rebuild catalog
        catalog = api.portal.get_tool("portal_catalog")
        logger.info("Rebuilding catalog...")
        catalog.clearFindAndRebuild()
        transaction.commit()
        logger.info("Finished rebuilding catalog!")

        logger.info("Start migrating richtext to blocks...")
        migrate_richtext_to_blocks()
        transaction.commit()
        logger.info("Finished migrating richtext to blocks!")

        view = api.content.get_view("migrate_to_volto", portal, request)
        view.migrate_default_pages = True
        view.slate = True
        logger.info("Start migrating Folders to Documents...")
        view.do_migrate_folders()
        transaction.commit()
        logger.info("Finished migrating Folders to Documents!")
        logger.info("Start migrating Collections to Documents...")
        view.migrate_collections()
        transaction.commit()
        logger.info("Finished migrating Collections to Documents!")

        reset_dates = api.content.get_view("reset_dates", portal, request)
        reset_dates()
        transaction.commit()

        # disallow folders and collections again
        portal_types["Collection"].global_allow = False
        portal_types["Folder"].global_allow = False

        # disable richtext behavior again
        for type_ in ["Document", "News Item", "Event"]:
            remove_behavior(type_, "plone.richtext")

        return request.response.redirect(portal.absolute_url())


def table_class_fixer(text, obj=None):
    if "table" not in text:
        return text

    dropped_classes = [
        "MsoNormalTable",
        "MsoTableGrid",
    ]
    replaced_classes = {
        "invisible": "table-borderless",
        "plain": "table-borderless",
        "listing": "table-striped",
    }
    soup = BeautifulSoup(text, "html.parser")
    for table in soup.find_all("table"):
        new_classes = []
        table_classes = table.get("class", [])

        for dropped in dropped_classes:
            if dropped in table_classes:
                table_classes.remove(dropped)

        for old, new in replaced_classes.items():
            if old in table_classes:
                table_classes.remove(old)
                table_classes.append(new)

        # all tables get the default bootstrap table class
        if "table" not in table_classes:
            table_classes.insert(0, "table")
        if new_classes:
            table["class"] = new_classes

    return soup.decode()


def img_variant_fixer(text, obj=None):
    """Set image-variants"""
    if not text:
        return text

    picture_variants = api.portal.get_registry_record("plone.picture_variants")
    scale_variant_mapping = {
        k: v["sourceset"][0]["scale"] for k, v in picture_variants.items()
    }
    scale_variant_mapping["thumb"] = "mini"
    fallback_variant = "preview"

    soup = BeautifulSoup(text, "html.parser")
    for tag in soup.find_all("img"):
        if "data-val" not in tag.attrs:
            # maybe external image
            continue
        scale = tag["data-scale"]
        variant = scale_variant_mapping.get(scale, fallback_variant)
        tag["data-picturevariant"] = variant

        classes = tag["class"]
        new_class = f"picture-variant-{variant}"
        if new_class not in classes:
            classes.append(new_class)
            tag["class"] = classes

    return soup.decode()


class CustomImportContent(ImportContent):

    DROP_PATHS = []

    DROP_UIDS = [
        "cc2b36fa964f417dad63372621180edd",  # /foundation
        "5d0b45aeadfb497bb047645b8db9a9bd",  # /foundation/members
        "709623d99e1149c9b7dfb7692c5658c9",  # /images
    ]

    def global_dict_hook(self, item):
        # TODO: implement the missing types
        if item["@type"] not in ALLOWED_TYPES:
            return

        # fix error_expiration_must_be_after_effective_date
        if item["UID"] == "0cf016d763af4615b3f06587ef5cd9f4":
            item["effective"] = "2019-01-01T00:00:00"

        # Some items may have no title or only spaces but it is a required field
        if not item.get("title") or not item.get("title", "").strip():
            item["title"] = item["id"]

        lang = item.pop("language", None)
        if lang is not None:
            item["language"] = "en"

        # Missing value in primary field
        if item["@type"] == "Image" and not item["image"]:
            logger.info(f'No image in {item["@id"]}! Skipping...')
            return
        if item["@type"] == "File" and not item["file"]:
            logger.info(f'No file in {item["@id"]}! Skipping...')
            return

        # Empty value in tuple
        if item["@type"] == "Event" and item["attendees"]:
            item["attendees"] = [i for i in item["attendees"] if i]

        # disable mosaic remote view
        if item.get("layout") == "layout_view":
            logger.info(f"Drop mosaic layout from {item['@id']}")
            item.pop("layout")

        # drop empty creator
        item["creators"] = [i for i in item.get("creators", []) if i]

        if item["@type"] == "vulnerability":
            item["reported_by"] = [i for i in item.get("reported_by", []) or [] if i]

        # update constraints
        if item.get("exportimport.constrains"):
            types_fixed = []
            for portal_type in item["exportimport.constrains"]["locally_allowed_types"]:
                if portal_type in PORTAL_TYPE_MAPPING:
                    types_fixed.append(PORTAL_TYPE_MAPPING[portal_type])
                elif portal_type in ALLOWED_TYPES:
                    types_fixed.append(portal_type)
            item["exportimport.constrains"]["locally_allowed_types"] = list(
                set(types_fixed)
            )

            types_fixed = []
            for portal_type in item["exportimport.constrains"][
                "immediately_addable_types"
            ]:
                if portal_type in PORTAL_TYPE_MAPPING:
                    types_fixed.append(PORTAL_TYPE_MAPPING[portal_type])
                elif portal_type in ALLOWED_TYPES:
                    types_fixed.append(portal_type)
            item["exportimport.constrains"]["immediately_addable_types"] = list(
                set(types_fixed)
            )

        return item

    # def dict_hook_folder(self, item):
    #     item["@type"] = "Document"
    #     return item

    # def dict_hook_collection(self, item):
    #     item["@type"] = "Document"
    #     return item

    def dict_hook_plonerelease(self, item):
        # TODO: transfer data to a better format?
        fileinfos = item.get("files", [])
        item["files"] = []
        for fileinfo in fileinfos:
            value = (
                f"{fileinfo['description']} ({fileinfo['file_size']}, "
                f"{fileinfo['platform']}): {fileinfo['url']}"
            )
            item["files"].append(value)
        return item

    def dict_hook_foundationmember(self, item):
        firstname = item.pop("fname", "")
        lastname = item.pop("lname", "")
        item["title"] = f"{firstname} {lastname}".strip()

        # append ploneuse to main text
        ploneuse = item["ploneuse"] and item["ploneuse"]["data"] or ""
        soup = BeautifulSoup(ploneuse, "html.parser")
        soup_text = soup.text.strip()
        if soup_text and "no data (carried over from old site)" not in soup_text:
            merit = item["merit"]["data"]
            ploneuse = item["ploneuse"]["data"]
            item["merit"]["data"] = f"{merit} \r\n {ploneuse}"

        # fix country to work with vocabulary
        if item.get("country"):
            country = pycountry.countries.get(
                alpha_2=item["country"]
            ) or pycountry.countries.get(alpha_3=item["country"])
            if not country:
                logger.info("Could not find country for %s", item["country"])
            else:
                item["country"] = country.alpha_2

        # TODO: Fix workflow
        item["review_state"] = "published"
        return item

    def dict_hook_foundationsponsor(self, item):
        # fix amount to be float
        if item.get("payment_amount"):
            item["payment_amount"] = float(item["payment_amount"])
        else:
            item["payment_amount"] = 0.0

        # fix country to work with vocabulary
        if item.get("country"):
            country = pycountry.countries.get(
                alpha_2=item["country"]
            ) or pycountry.countries.get(alpha_3=item["country"])
            if not country:
                logger.info("Could not find country for %s", item["country"])
            else:
                item["country"] = country.alpha_2

        # TODO: Fix workflow
        item["review_state"] = "published"
        return item


class ImportZopeUsers(BrowserView):
    def __call__(self, jsonfile=None, return_json=False):
        if jsonfile:
            self.portal = api.portal.get()
            status = "success"
            try:
                if isinstance(jsonfile, str):
                    return_json = True
                    data = json.loads(jsonfile)
                elif isinstance(jsonfile, FileUpload):
                    data = json.loads(jsonfile.read())
                else:
                    raise RuntimeError("Data is neither text nor upload.")
            except Exception as e:  # noQA
                status = "error"
                logger.error(e)
                api.portal.show_message(
                    "Failure while uploading: {}".format(e),
                    request=self.request,
                )
            else:
                members = self.import_members(data)
                msg = "Imported {} members".format(members)
                api.portal.show_message(msg, self.request)
            if return_json:
                msg = {"state": status, "msg": msg}
                return json.dumps(msg)

        return self.index()

    def import_members(self, data):
        app = self.portal.__parent__
        acl = app.acl_users

        usersNumber = 0
        for item in data:
            username = item["username"]
            password = item.pop("password")
            roles = item.pop("roles", [])
            if not username or not password or not roles:
                continue
            title = item.pop("title", None)
            try:
                acl.users.addUser(username, title, password)
            except KeyError:
                # user exists
                pass
            for role in roles:
                acl.roles.assignRoleToPrincipal(role, username)
            usersNumber += 1
        return usersNumber