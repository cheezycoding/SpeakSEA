#!/usr/bin/env python3
"""
Poll shaw.sg advance sales for a movie by name.
Exit 0 = not found (workflow passes, silence).
Exit 1 = FOUND (workflow fails = GitHub emails you).

Usage: check_odyssey.py [--movie "Movie Title"]  (default: Odyssey)
"""
import sys
import datetime
import argparse
import requests

DEADLINE = datetime.date(2026, 7, 16)

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


def fetch_advance_sales() -> list[dict] | None:
    for url in ENDPOINTS:
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            if r.status_code == 200:
                return r.json()
        except requests.RequestException:
            continue
    return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--movie", default="Odyssey", help="Movie title to search for (case-insensitive)")
    args = parser.parse_args()
    target = args.movie.lower()

    today = datetime.date.today()
    if today > DEADLINE:
        print(f"Past deadline {DEADLINE}, nothing to do.")
        sys.exit(0)

    movies = fetch_advance_sales()
    if movies is None:
        print("ERROR: all endpoints failed.", file=sys.stderr)
        sys.exit(0)  # Don't false-alert on network errors

    print(f"Fetched {len(movies)} advance sale movie(s):")
    for m in movies:
        title = m.get("primaryTitle", "unknown")
        release = m.get("releaseDate", "?")[:10]
        print(f"  - {title} (releases {release})")

    for m in movies:
        if target in (m.get("primaryTitle") or "").lower():
            print(f"\n*** FOUND: '{m['primaryTitle']}' is in Advance Sales! ***")
            sys.exit(1)  # Fail the workflow → GitHub emails you

    print(f"\n'{args.movie}' not in Advance Sales yet. All quiet.")
    sys.exit(0)  # Pass quietly


if __name__ == "__main__":
    main()
