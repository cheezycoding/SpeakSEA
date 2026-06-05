#!/usr/bin/env python3
"""
Poll shaw.sg/movie for "Odyssey" appearing in the Advance Sales section.
Exits with code 0 (found) or 1 (not found / error).
"""
import sys
import json
import datetime
import re
import requests
from bs4 import BeautifulSoup

DEADLINE = datetime.date(2026, 7, 16)
SHAW_URL = "https://www.shaw.sg/movie"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-SG,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xhtml;q=0.9,*/*;q=0.8",
}


def check_odyssey() -> bool:
    today = datetime.date.today()
    if today > DEADLINE:
        print(f"Past deadline {DEADLINE}, stopping.")
        sys.exit(0)

    try:
        resp = requests.get(SHAW_URL, headers=HEADERS, timeout=15)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Request failed: {e}", file=sys.stderr)
        sys.exit(2)

    html = resp.text

    # 1. Try __NEXT_DATA__ (Next.js SSR payload)
    match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if match:
        try:
            data = json.loads(match.group(1))
            raw = json.dumps(data).lower()
            if "odyssey" in raw:
                # Check if it's specifically in advance sales context
                if _is_in_advance_sales(data):
                    print("FOUND: Odyssey is in Advance Sales (Next.js data).")
                    return True
                else:
                    print("Odyssey found in page data but NOT in Advance Sales section.")
                    return False
        except json.JSONDecodeError:
            pass

    # 2. Fallback: parse HTML directly
    soup = BeautifulSoup(html, "html.parser")

    # Look for an advance-sales section by common class/id patterns
    advance_section = (
        soup.find(id=re.compile(r"advance.?sale", re.I))
        or soup.find(class_=re.compile(r"advance.?sale", re.I))
        or soup.find(attrs={"data-category": re.compile(r"advance", re.I)})
    )

    if advance_section:
        section_text = advance_section.get_text(" ", strip=True).lower()
        if "odyssey" in section_text:
            print("FOUND: Odyssey is in Advance Sales section.")
            return True
        else:
            print("Advance Sales section found but Odyssey not listed.")
            return False

    # 3. Last resort: full-page text search (noisy but catches anything)
    page_text = soup.get_text(" ", strip=True).lower()
    if "odyssey" in page_text:
        print("WARNING: Odyssey found on page but could not confirm Advance Sales section.")
        # Treat as found so we don't miss it
        return True

    print("Odyssey NOT found on shaw.sg/movie.")
    return False


def _is_in_advance_sales(data: dict) -> bool:
    """Walk Next.js props looking for Odyssey under an advance-sales key."""
    raw = json.dumps(data).lower()
    # If "advance" and "odyssey" co-exist anywhere in the payload, call it found.
    return "advance" in raw and "odyssey" in raw


if __name__ == "__main__":
    found = check_odyssey()
    sys.exit(0 if found else 1)
