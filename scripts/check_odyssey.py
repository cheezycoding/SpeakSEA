#!/usr/bin/env python3
"""
Poll shaw.sg advance sales for "Odyssey".
Exit 0 = found, 1 = not found, 2 = request error.
"""
import sys
import datetime
import requests

DEADLINE = datetime.date(2026, 7, 16)

# Primary: revamp API (currently 503 but may come online); fallback: legacy API
ENDPOINTS = [
    "https://snow-pwsm-revamp-api.sice.tech/get_advance_sale_movies",
    "https://snow-pwsm-legacy.sice.tech/get_advance_sale_movies",
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Origin": "https://www.shaw.sg",
    "Referer": "https://www.shaw.sg/movie",
}


def fetch_advance_sales() -> list[dict]:
    for url in ENDPOINTS:
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            if r.status_code == 200:
                return r.json()
        except requests.RequestException:
            continue
    return None


def check_odyssey() -> bool:
    today = datetime.date.today()
    if today > DEADLINE:
        print(f"Past deadline {DEADLINE}, nothing to do.")
        sys.exit(0)

    movies = fetch_advance_sales()
    if movies is None:
        print("ERROR: all endpoints failed.", file=sys.stderr)
        sys.exit(2)

    print(f"Fetched {len(movies)} advance sale movie(s):")
    for m in movies:
        title = m.get("primaryTitle", "unknown")
        release = m.get("releaseDate", "?")[:10]
        print(f"  - {title} (releases {release})")

    for m in movies:
        if "odyssey" in (m.get("primaryTitle") or "").lower():
            print(f"\nFOUND: '{m['primaryTitle']}' is in Advance Sales!")
            return True

    print("\nOdyssey NOT in Advance Sales yet.")
    return False


if __name__ == "__main__":
    found = check_odyssey()
    sys.exit(0 if found else 1)
