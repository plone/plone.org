from plone import api
from plone.restapi.blocks import visit_blocks
from zope.component.hooks import setSite
from textwrap import indent
import json
import transaction

BLOCK_FIELDS = {
    "icons_and_numbers": ["columns.text"],
    "icons_and_text": ["description", "columns.text"],
    "image_columns": ["description"],
    "numbers": ["numbers.text"],
    "slider": ["description"],
    "text1": ["content"],
    "text5": ["description", "text1", "text2", "content"],
    "text6": ["content"],
    "text7": ["content"],
}

def find_values(value: dict, fields):
    for field in fields:
        if "." in field:
            field, rest = field.split(".", 1)
        else:
            rest = None
        if field not in value:
            continue
        nextvalue = value[field]
        if rest and isinstance(nextvalue, list):
            for item in nextvalue:
                yield from find_values(item, [rest])
        else:
            yield value, field, nextvalue


def process_entities(text, entityRanges, entityMap):
    if len(entityRanges) == 1:
        offset = entityRanges[0]["offset"]
        length = entityRanges[0]["length"]
        key = entityRanges[0]["key"]
        pretext, linktext, posttext = text[:offset], text[offset:offset + length], text[offset + length:]
        result = []
        if pretext:
            result.append({"text": pretext})
        url = entityMap[str(key)]["data"]["url"]
        result.append({
            "type": "link",
            "children": [{"text": linktext}],
            "data": {"url": url}
        })
        if posttext:
            result.append({"text": posttext})
        return result
    elif len(entityRanges) == 0:
        return [{"text": text}]
    else:
        print(json.dumps(text, indent=4))
        breakpoint()


def migrate_draft_to_slate(value, entityMap=None) -> list:
    match value:
        case {"blocks": [*blocks], "entityMap": entityMap}:
            result = []
            for block in blocks:
                result.extend(migrate_draft_to_slate(block, entityMap))
            return result
        case {"type": blocktype, "text": text, "entityRanges": entityRanges}:
            children = process_entities(text, entityRanges, entityMap)
            match blocktype:
                case "unstyled" | "align-left" | "buttons":
                    return [{"type": "p", "children": children}]
                case "unordered-list-item":
                    return [{"type": "ul", "children": [{"li": {"children": [{"text": text}]}}]}]
                case "blockquote":
                    return [{"type": "blockquote", "children": children}]
                case _:
                    breakpoint()
                    raise Exception()
        case _:
            print(json.dumps(value, indent=4))
            breakpoint()
            raise Exception()


def migrate_items():
    catalog = api.portal.get_tool(name="portal_catalog")
    i = 0
    for brain in catalog.unrestrictedSearchResults(block_types=list(BLOCK_FIELDS.keys())):
        obj = brain.getObject()

        for block in visit_blocks(obj, obj.blocks):
            block_type = block.get("@type")
            for container, field, value in find_values(block, BLOCK_FIELDS.get(block_type, [])):
                if isinstance(value, list):
                    # no value, or already migrated
                    continue
                elif value is None:
                    newvalue = []
                else:
                    newvalue = migrate_draft_to_slate(value)
                if newvalue != value:
                    container[field] = newvalue
                    obj._p_changed = True
                i += 1
                print(f"{brain.getPath()} / {block_type} / {field}")
                print(indent(json.dumps(value, indent=4), "  "))
                print()
                print(indent(json.dumps(newvalue, indent=4), "  "))
                print()

    print(f"Total fields processed: {i}")
    transaction.commit()

setSite(app.Plone)
migrate_items()
