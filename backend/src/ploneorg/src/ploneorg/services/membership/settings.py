ACTIONS = [
    {
        "id": "open-renewal-cycle",
        "title": "Membership: Open Renewal Cycle",
        "description": ("Move all Approved (active) members to pending_renew state."),
        "className": "open",
        "_check_has_pending_renewal": False,
    },
    {
        "id": "reminder-renewal-cycle",
        "title": "Membership: Trigger a Reminder",
        "description": ("Send a reminder to all pending_renew members."),
        "className": "reminder",
        "_check_has_pending_renewal": True,
    },
    {
        "id": "close-renewal-cycle",
        "title": "Membership: Close Renewal Cycle",
        "description": ("Move all pending_renew members to" "emeritus state."),
        "className": "close",
        "_check_has_pending_renewal": True,
    },
]


STATES = [
    ("approved", "Approved"),
    ("pending_renewal", "Waiting Renewal"),
    ("pending", "Pending Review"),
    ("initial", "Newly Created"),
    ("rejected", "Rejected"),
    ("emeritus", "Emeritus"),
    ("deceased", "Deceased"),
]


CURRENT_STATES = [
    "approved",
    "pending_renewal",
]
