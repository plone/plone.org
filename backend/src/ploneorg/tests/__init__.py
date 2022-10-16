from kitconcept import api
from typing import Dict
from typing import Tuple


DEFAULT_PASSWORD = "very_secure"
TEST_USERS = {
    "editor": {
        "email": "editor@user.com",
        "username": "editor",
        "password": DEFAULT_PASSWORD,
        "roles": ["Editor", "Member"],
    },
    "member": {
        "email": "member@user.com",
        "username": "member",
        "password": DEFAULT_PASSWORD,
        "roles": [
            "Member",
        ],
    },
}


def create_test_users() -> Dict[str, Tuple[str, str]]:
    """Create test users."""
    users = {}
    for user_role, user_info in TEST_USERS.items():
        user = api.user.create(**user_info)
        users[user_role] = (user.getUserName(), DEFAULT_PASSWORD)
    return users
