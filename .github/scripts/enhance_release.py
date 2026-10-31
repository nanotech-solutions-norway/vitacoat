#!/usr/bin/env python3
from __future__ import annotations

from html import escape
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / "_site"
BASE_URL = "https://www.vitacoat.no"

NO_LABELS = {
    "/": "VitaCoat",
    "/applications/": "Bruksområder",
    "/applications/healthcare/": "Helse",
    "/applications/food-processing/": "Næringsmiddelindustri",
    "/applications/public-facilities/": "Offentlige miljøer",
    "/applications/education-and-offices/": "Skole og kontor",
    "/applications/electronics-and-touchpoints/": "Elektronikk og kontaktpunkter",
    "/how-it-works/": "Hvordan det fungerer",
    "/benefits/continuous-protection/": "Vedvarende beskyttelse",
    "/benefits/easier-cleaning/": "Enklere rengjøring",
    "/benefits/surface-compatibility/": "Overflatekompatibilitet",
    "/proof/testing-and-standards/": "Testing og standarder",
    "/proof/durability/": "Holdbarhet",
    "/proof/safety-and-environment/": "Sikkerhet og miljø",
    "/proof/pathogen-spectrum/": "Patogenspekter",
    "/application-process/": "Applikasjonsprosess",
    "/maintenance-and-reapplication/": "Vedlikehold og reapplikasjon",
    "/documentation/": "Dokumentasjon",
    "/faq/": "FAQ",
    "/legal/": "Juridisk informasjon",
    "/technical-support/": "Teknisk støtte",
    "/technical-support/downloads/": "Nedlastingssenter",
    "/contact/": "Kontakt",
    "/about/": "Om VitaCoat",
    "/technical-evaluation/": "Teknisk evaluering",
}

EN_LABELS = {
    "/en/": "VitaCoat",
    "/en/applications/": "Applications",
    "/en/applications/healthcare/": "Healthcare",
    "/en/applications/food-processing/": "Food Processing",
    "/en/applications/public-facilities/": "Public Facilities",
    "/en/applications/education-and-offices/": "Education & Offices",
    "/en/applications/electronics-and-touchpoints/": "Electronics & Touchpoints",
    "/en/how-it-works/": "How it Works",
    "/en/benefits/continuous-protection/": "Continuous Protection",
    "/en/benefits/easier-cleaning/": "Easier Cleaning",
    "/en/benefits/surface-compatibility/": "Surface Compatibility",
    "/en/proof/testing-and-standards/": "Testing & Standards",
    "/en/proof/durability/": "Durability",
    "/en/proof/safety-and-environment/": "Safety & Environment",
    "/en/proof/pathogen-spectrum/": "Pathogen Spectrum",
    "/en/application-process/": "Application Process",
    "/en/maintenance-and-reapplication/": "Maintenance & Reapplication",
    "/en/documentation/": "Documentation",
    "/en/faq/": "FAQ",
    "/en/legal/": "Legal Information",
    "/en/technical-support/": "Technical Support",
    "/en/technical-support/downloads/": "Download Center",
    "/en/contact/": "Contact",
    "/en/about/": "About VitaCoat",
    "/en/technical-evaluation/": "Technical Evaluation",
}

DOWNLOADS = [
    ("VitaCoat 3D Antimicrobial Surface Coating", "Product and technology presentation.", "/assets/downloads/VitaCoat-3D-Antimicrobial-Surface-Coating.pdf"),
    ("Accelerated Wear Testing of VitaCoat", "Wear and durability testing by Prof. J. Ramsden.", "/assets/downloads/Accelerated%20Wear%20Testing%20of%20VitaCoat%20-%20by%20Prof.%20J.Ramsden.pdf"),
    ("VitaCoat — EN 14476", "Virucidal standard test documentation.", "/assets/downloads/VitaCoat%20-%20EN%2014476.pdf"),
    ("VitaCoat — EN 13727", "Bactericidal standard test documentation.", "/assets/downloads/VitaCoat%20-%20EN%2013727.pdf"),
    ("VitaCoat — EN 13624", "Yeasticidal and fungicidal standard test documentation.", "/assets/downloads/VitaCoat%20-%20EN%2013624.pdf"),
    ("SARS-CoV-2 test — 1 minute", "Utah State University report for SARS-CoV-2.", "/assets/downloads/Utah%20Report-%20VitaCoat%20vs%20SARS%20Covid%202%20%281%20min%29.pdf"),
    ("Respiratory virus panel", "Utah report against a panel of respiratory viruses.", "/assets/downloads/Utah%20Report%20-%20VitaCoat%20vs%20Panel%20Respiratory%20Viruses.pdf"),
]

DOWNLOADS_NO = [
    ("VitaCoat 3D Antimicrobial Surface Coating", "Produkt- og teknologipresentasjon.", DOWNLOADS[0][2]),
    ("Accelerated Wear Testing of VitaCoat", "Slitasje- og holdbarhetstest av Prof. J. Ramsden.", DOWNLOADS[1][2]),
    ("VitaCoat — EN 14476", "Virusdrepende standardtest og dokumentasjon.", DOWNLOADS[2][2]),
    ("VitaCoat — EN 13727", "Bakteriedrepende standardtest og dokumentasjon.", DOWNLOADS[3][2]),
    ("VitaCoat — EN 13624", "Gjær- og soppdrepende standardtest og dokumentasjon.", DOWNLOADS[4][2]),
    ("SARS-CoV-2 test — 1 minutt", "Utah State University-rapport for SARS-CoV-2.", DOWNLOADS[5][2]),
    ("Respiratorisk viruspanel", "Utah-rapport mot panel av respiratoriske virus.", DOWNLOADS[6][2]),
]

def path_to_file(path: str) -> Path:
    if path == "/":
        return ROOT / "index.html"
    return ROOT / path.lstrip("/") / "index.html"

def parent_for(path: str) -> str | None:
    is_en = path.startswith("/en/")
    prefix = "/en" if is_en else ""
    local = path[3:] if is_en else path
    if local == "/":
        return None
    if local.startswith("/applications/") or local == "/application-process/":
        return prefix + "/applications/"
    if local.startswith("/benefits/") or local.startswith("/proof/") or local == "/how-it-works/":
        return prefix + "/documentation/"
    if local in {"/maintenance-and-reapplication/", "/technical-support/downloads/"}:
        return prefix + "/technical-support/"
    return None

def trail_for(path: str) -> list[str]:
    if path in {"/", "/en/"}:
        return []
    home = "/en/" if path.startswith("/en/") else "/"
    parent = parent_for(path)
    trail = [home]
    if parent and parent not in {home, path}:
        trail.append(parent)
    trail.append(path)
    return trail

def label_for(path: str) -> str:
    labels = EN_LABELS if path.startswith("/en/") else NO_LABELS
    if path not in labels:
        raise KeyError(f"No breadcrumb label configured for {path}")
    return labels[path]

def breadcrumb_html(path: str, trail: list[str]) -> str:
    aria = "Breadcrumb" if path.startswith("/en/") else "Brødsmuler"
    items = []
    for index, item_path in enumerate(trail):
        label = escape(label_for(item_path))
        if index == len(trail) - 1:
            items.append(f'<li aria-current="page"><span>{label}</span></li>')
        else:
            items.append(f'<li><a href="{item_path}">{label}</a></li>')
    return f'<nav class="breadcrumbs container" aria-label="{aria}"><ol>{"".join(items)}</ol></nav>'

def breadcrumb_jsonld(trail: list[str]) -> dict:
    elements = []
    for index, item_path in enumerate(trail, start=1):
        entry = {"@type": "ListItem", "position": index, "name": label_for(item_path)}
        if index != len(trail):
            entry["item"] = BASE_URL + item_path
        elements.append(entry)
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": elements}

def collection_jsonld(path: str) -> dict:
    is_en = path.startswith("/en/")
    docs = DOWNLOADS if is_en else DOWNLOADS_NO
    name = "VitaCoat Download Center" if is_en else "VitaCoat nedlastingssenter"
    lang = "en" if is_en else "nb-NO"
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": BASE_URL + path + "#downloads",
        "url": BASE_URL + path,
        "name": name,
        "inLanguage": lang,
        "publisher": {"@type": "Organization", "name": "NanoTech Solutions Norway AS", "url": BASE_URL + ("/en/about/" if is_en else "/about/")},
        "hasPart": [
            {
                "@type": "DigitalDocument",
                "name": doc_name,
                "description": description,
                "contentUrl": BASE_URL + url,
                "encodingFormat": "application/pdf",
                "isAccessibleForFree": True,
            }
            for doc_name, description, url in docs
        ],
    }

def inject_script(html: str, payload: dict, marker: str) -> str:
    encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    block = f'<script type="application/ld+json" data-vc-schema="{marker}">{encoded}</script>'
    return html.replace("</head>", block + "\n</head>", 1)

def main() -> int:
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        print(f"Enhancement failed: {sitemap} not found")
        return 1
    ns = {"s": "https://www.sitemaps.org/schemas/sitemap/0.9"}
    tree = ET.parse(sitemap).getroot()
    paths = [urlparse(e.text.strip()).path or "/" for e in tree.findall("s:url/s:loc", ns) if e.text]
    enhanced = 0
    for path in paths:
        file_path = path_to_file(path)
        if not file_path.exists():
            print(f"Enhancement failed: canonical file missing for {path}")
            return 1
        html = file_path.read_text(encoding="utf-8", errors="strict")
        trail = trail_for(path)
        if trail:
            if 'class="breadcrumbs container"' in html or 'data-vc-schema="breadcrumb"' in html:
                print(f"Enhancement failed: duplicate breadcrumb markers in {path}")
                return 1
            nav = breadcrumb_html(path, trail)
            main_match = re.search(r"<main\b[^>]*>", html, flags=re.I)
            if not main_match:
                print(f"Enhancement failed: no main landmark in {path}")
                return 1
            insert_at = main_match.end()
            html = html[:insert_at] + nav + html[insert_at:]
            html = inject_script(html, breadcrumb_jsonld(trail), "breadcrumb")
        if path in {"/technical-support/downloads/", "/en/technical-support/downloads/"}:
            html = inject_script(html, collection_jsonld(path), "download-collection")
        file_path.write_text(html, encoding="utf-8")
        enhanced += 1
    print(f"Release enhancement complete: {enhanced} canonical pages processed; visible breadcrumbs and matching JSON-LD added to non-home pages; download collections modeled as DigitalDocument resources.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
