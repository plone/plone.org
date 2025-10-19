from collections import defaultdict
from plone import api
from plone.restapi.services import Service
from ploneorg.services.membership.settings import ACTIONS
from ploneorg.services.membership.settings import CURRENT_STATES
from ploneorg.services.membership.settings import STATES
from ploneorg.utils import flag_for_country_code


def sort_state_stats(data: dict) -> list:
    """Sort Review State Stats."""
    return [
        {"id": id, "title": title, "count": data.get(id, 0)} for id, title in STATES
    ]


def sort_state_year(data: dict) -> list:
    """Sort Year of acceptance Stats."""
    years = sorted([year for year in data.keys()], reverse=True)
    return [{"id": year, "title": year, "count": data.get(year, 0)} for year in years]


def sort_country_stats(data: dict, current: dict) -> list:
    """Sort Country Stats."""
    stats_country = sorted(
        [(current.get(k, 0), v, k) for k, v in data.items()], reverse=True
    )
    return [
        {
            "id": k,
            "title": flag_for_country_code(k),
            "count": count,
            "count_all": total,
        }
        for count, total, k in stats_country
    ]


class MembershipGet(Service):
    _members: list = None
    has_pending_renewal: bool = False

    def actions(self) -> list:
        """Returns a list of possible actions."""
        actions = []
        for action in ACTIONS:
            check = action.get("_check_has_pending_renewal")
            if self.has_pending_renewal is check:
                actions.append(
                    {k: v for k, v in action.items() if not k.startswith("_")}
                )
        return actions

    def downloads(self) -> list:
        """Returns a list of possible downloads."""
        portal_url = api.portal.get().absolute_url()
        return [
            {
                "@id": f"{portal_url}/@@pf-downloads/voters.csv",
                "id": "pf-voters",
                "title": "Voters' emails",
                "description": (
                    "List of emails of Plone Foundation Members that "
                    "are eligible to vote."
                ),
            },
        ]

    @property
    def members(self):
        """Return a list of all Foundation Members objects."""
        members = self._members
        if not members:
            ct = api.portal.get_tool("portal_catalog")
            members = [
                b.getObject()
                for b in ct.unrestrictedSearchResults(
                    portal_type="FoundationMember", sort_on="sortable_title"
                )
            ]
            self._members = members
        return members

    def member_stats(self) -> dict:
        """Return Foundation member stats."""
        stats_year = defaultdict(int)
        stats_state = defaultdict(int)
        stats_current = defaultdict(int)
        stats_country = defaultdict(int)
        for member in self.members:
            review_state = api.content.get_state(member)
            year = member.created().year()
            country = member.country_origin or "UN"
            stats_state[review_state] += 1
            stats_country[country] += 1
            if review_state in CURRENT_STATES:
                stats_year[year] += 1
                stats_current[country] += 1
        self.has_pending_renewal = True if stats_state["pending_renewal"] > 0 else False
        total_members = sum([v for v in stats_current.values()])
        total_countries = len([k for k in stats_current.keys() if k != "UN"])
        return {
            "total_countries": total_countries,
            "total_members": total_members,
            "state": sort_state_stats(stats_state),
            "country": sort_country_stats(stats_country, stats_current),
            "year": sort_state_year(stats_year),
        }

    def reply(self):
        portal_url = api.portal.get().absolute_url()
        stats = self.member_stats()
        return {
            "@id": f"{portal_url}/@membership",
            "stats": stats,
            "downloads": self.downloads(),
            "actions": self.actions(),
        }
