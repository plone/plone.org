from unicodedata import lookup


def flag_for_country_code(code: str) -> str:
    """Return the unicode representing the flag of a Country."""
    flag = code
    if len(code) == 2:
        code = code.lower()
        flag = lookup(f"REGIONAL INDICATOR SYMBOL LETTER {code[0]}") + lookup(
            f"REGIONAL INDICATOR SYMBOL LETTER {code[1]}"
        )
    return flag
