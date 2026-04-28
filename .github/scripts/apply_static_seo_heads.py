#!/usr/bin/env python3
"""Apply static SEO metadata to canonical VitaCoat HTML files.

The script rewrites crawler-visible <head> metadata deterministically. It removes
legacy duplicate title/meta/canonical/hreflang tags, then inserts one approved
SEO block immediately after charset. Non-canonical legacy HTML files are cleaned
of generated blocks but are not given new SEO metadata.
"""
from __future__ import annotations

from pathlib import Path
import html
import re

BASE_URL = "https://www.vitacoat.no"
OG_IMAGE = f"{BASE_URL}/assets/img/vitacoat-og.svg"

SEO_NO = {
    "/": ("Antimikrobielt belegg for berøringsflater | VitaCoat Norge", "VitaCoat er et transparent antimikrobielt belegg for harde, ikke-porøse berøringsflater i helse, offentlige miljøer, skole, kontor og delte kontaktpunkter. Be om teknisk vurdering eller dokumentasjon."),
    "/applications/": ("Bruksområder for antimikrobielt belegg | VitaCoat", "Se hvor VitaCoat kan brukes som antimikrobielt belegg for harde berøringsflater i helse, næringsmiddelindustri, offentlige miljøer, skole, kontor, terminaler og skjermer."),
    "/applications/healthcare/": ("Antimikrobielt belegg for kliniske berøringsflater | VitaCoat", "VitaCoat støtter hygienekontroll på harde, ikke-porøse kliniske berøringsflater i pasientnære miljøer. Be om teknisk vurdering og dokumentasjon."),
    "/applications/food-processing/": ("Hygienebelegg for harde flater uten direkte matkontakt | VitaCoat", "Antimikrobielt hygienebelegg for harde, ikke-porøse flater uten direkte matkontakt i næringsmiddelindustri, kontrollpaneler og utvalgte prosessmiljøer."),
    "/applications/public-facilities/": ("Antimikrobiell overflatebehandling for offentlige kontaktflater | VitaCoat", "Transparent antimikrobiell overflatebehandling for offentlige kontaktflater, kiosker, heisknapper, terminaler og felles berøringspunkter med høy trafikk."),
    "/applications/education-and-offices/": ("Hygienebelegg for delte flater i skole og kontor | VitaCoat", "VitaCoat er et antimikrobielt hygienebelegg for delte harde flater i skoler, kontorer, møterom, resepsjoner og felles arbeidsmiljøer."),
    "/applications/electronics-and-touchpoints/": ("Antimikrobiell coating for touchskjermer og terminaler | VitaCoat", "Antimikrobiell coating for touchskjermer, betalingsterminaler, kiosker, minibanker og delte elektroniske kontaktpunkter."),
    "/how-it-works/": ("Hvordan VitaCoat fungerer | Citrox og SiO₂ overflatefilm", "Les hvordan VitaCoat kombinerer citrus bioflavonoider med en transparent SiO₂-overflatefilm for å støtte hygiene på harde berøringsflater."),
    "/benefits/continuous-protection/": ("Vedvarende antimikrobiell beskyttelse | VitaCoat", "VitaCoat er utviklet for langvarig antimikrobiell beskyttelse mellom ordinære rengjørings- og desinfeksjonsrutiner."),
    "/benefits/easier-cleaning/": ("Enklere rengjøring av berøringsflater | VitaCoat", "VitaCoat støtter enklere rengjøring og hygienekontroll på harde, ikke-porøse flater ved å etablere et transparent funksjonelt overflatelag."),
    "/benefits/surface-compatibility/": ("Overflatekompatibilitet for VitaCoat | Glass, metall og plast", "Se hvilke harde, ikke-porøse substrater VitaCoat kan vurderes for, inkludert glass, metall, plast, keramikk og lakkerte flater."),
    "/proof/testing-and-standards/": ("Testing og standarder for VitaCoat | EN 13727, EN 13624, EN 14476", "Oversikt over testing, standarder og dokumentasjon for VitaCoat, inkludert EN 13727, EN 13624, EN 14476, sikkerhet og teknisk underlag."),
    "/proof/durability/": ("Holdbarhet for antimikrobielt belegg | VitaCoat", "Les om holdbarhet, vedlikehold, serviceintervall og vurderingskriterier for VitaCoat på harde berøringsflater."),
    "/proof/safety-and-environment/": ("Sikkerhet og miljø for VitaCoat | Teknisk dokumentasjon", "Sikkerhets- og miljøinformasjon for VitaCoat, inkludert vurdering av bruksområde, dokumentasjon og ansvarlige claim-grenser."),
    "/proof/pathogen-spectrum/": ("Patogenspekter og dokumenterte grenser | VitaCoat", "VitaCoat-patogenspekter forklart med tydelige grenser for dokumentasjon, testkontekst og teknisk vurdering."),
    "/application-process/": ("Applikasjonsprosess for VitaCoat | Pilot og utrulling", "Stegvis applikasjonsprosess for VitaCoat, fra substratvurdering og teknisk gjennomgang til pilot, påføring, vedlikehold og re-applikasjon."),
    "/maintenance-and-reapplication/": ("Vedlikehold og re-applikasjon av VitaCoat | Serviceintervall", "Veiledning for vedlikehold, rengjøringskompatibilitet, serviceintervall og re-applikasjon av VitaCoat på harde berøringsflater."),
    "/documentation/": ("Dokumentasjon for VitaCoat | Standarder, sikkerhet og teknisk underlag", "Teknisk dokumentasjon for VitaCoat, inkludert standarder, sikkerhet, overflatekompatibilitet, applikasjonsveiledning og innkjøpsunderlag."),
    "/faq/": ("Spørsmål og svar om antimikrobielt belegg | VitaCoat FAQ", "Svar på spørsmål om VitaCoat, antimikrobielt belegg, rengjøring, varighet, kompatibilitet, dokumentasjon, pilotprosesser og claim-grenser."),
    "/legal/": ("Juridisk informasjon og claim-grenser | VitaCoat", "Juridisk informasjon, ansvarsgrenser og brukskrav for VitaCoat som supplerende antimikrobielt belegg for harde berøringsflater."),
    "/technical-support/": ("Teknisk støtte for VitaCoat | Vurdering, dokumentasjon og pilot", "Kontakt teknisk støtte for VitaCoat for substratvurdering, dokumentasjon, applikasjonsprosess, pilotprosjekt og implementeringsspørsmål."),
    "/contact/": ("Kontakt VitaCoat | Teknisk vurdering og dokumentasjon", "Kontakt VitaCoat for teknisk vurdering, dokumentasjon, pilotdialog, innkjøpsspørsmål eller prosjektavklaring."),
}

SEO_EN = {
    "/en/": ("Antimicrobial Coating for High-Touch Surfaces | VitaCoat", "VitaCoat is a transparent antimicrobial coating for hard, non-porous high-touch surfaces in healthcare, public facilities, workplaces, food-processing environments, and shared touchpoints. Request technical evaluation or documentation."),
    "/en/applications/": ("Applications for Antimicrobial Coating | VitaCoat", "Explore VitaCoat applications across healthcare, food processing, public facilities, education, workplaces, electronics, touchscreens, kiosks and shared touchpoints."),
    "/en/applications/healthcare/": ("Antimicrobial Coating for Healthcare Touch Surfaces | VitaCoat", "VitaCoat supports hygiene control on hard, non-porous healthcare touch surfaces in patient-near and clinical environments. Request technical documentation."),
    "/en/applications/food-processing/": ("Hygienic Coating for Hard Surfaces in Food Processing | VitaCoat", "Transparent antimicrobial coating for selected hard, non-food-contact surfaces in food-processing environments, control panels, equipment housings and shared touchpoints."),
    "/en/applications/public-facilities/": ("Antimicrobial Surface Protection for Public Touchpoints | VitaCoat", "VitaCoat provides antimicrobial surface protection for public touchpoints including kiosks, terminals, elevator controls and high-traffic shared surfaces."),
    "/en/applications/education-and-offices/": ("Antimicrobial Coating for Shared Surfaces in Schools and Workplaces | VitaCoat", "Antimicrobial coating for shared hard surfaces in schools, offices, meeting rooms, reception areas and workplaces."),
    "/en/applications/electronics-and-touchpoints/": ("Antimicrobial Coating for Touchscreens, Kiosks and Terminals | VitaCoat", "VitaCoat is a transparent antimicrobial coating for touchscreens, payment terminals, kiosks, ATMs and shared electronic touchpoints."),
    "/en/how-it-works/": ("How VitaCoat Works | Citrus Bioflavonoids + SiO₂ Surface Matrix", "Learn how VitaCoat combines citrus bioflavonoids with a transparent SiO₂ surface matrix to support hygiene on hard, non-porous high-touch surfaces."),
    "/en/benefits/continuous-protection/": ("Continuous Antimicrobial Surface Protection | VitaCoat", "VitaCoat is designed for continuous antimicrobial surface protection between routine cleaning and disinfection cycles."),
    "/en/benefits/easier-cleaning/": ("Easier Cleaning for High-Touch Surfaces | VitaCoat", "VitaCoat supports easier cleaning and hygiene control by creating a transparent functional coating on hard, non-porous surfaces."),
    "/en/benefits/surface-compatibility/": ("Surface Compatibility for VitaCoat | Glass, Metal and Plastic", "Review VitaCoat surface compatibility for hard, non-porous substrates including glass, metal, plastic, ceramics and coated surfaces."),
    "/en/proof/testing-and-standards/": ("Testing and Standards | EN 13727, EN 13624, EN 14476 | VitaCoat", "Testing and standards overview for VitaCoat, including EN 13727, EN 13624, EN 14476, durability, safety and technical documentation."),
    "/en/proof/durability/": ("Durability of Antimicrobial Coating | VitaCoat", "Review durability, maintenance expectations, service interval and project evaluation criteria for VitaCoat on high-touch surfaces."),
    "/en/proof/safety-and-environment/": ("Safety and Environment | VitaCoat Technical Documentation", "Safety and environmental information for VitaCoat, including usage boundaries, technical review requirements and documentation support."),
    "/en/proof/pathogen-spectrum/": ("Pathogen Spectrum and Documented Boundaries | VitaCoat", "VitaCoat pathogen spectrum information with clear documentation boundaries, testing context and technical evaluation requirements."),
    "/en/application-process/": ("VitaCoat Application Process | Pilot and Rollout", "Step-by-step VitaCoat application process from surface assessment and technical review to pilot, application, maintenance and reapplication planning."),
    "/en/maintenance-and-reapplication/": ("Maintenance and Reapplication of VitaCoat | Service Interval", "Guidance for VitaCoat maintenance, cleaning compatibility, service interval and reapplication on hard, non-porous high-touch surfaces."),
    "/en/documentation/": ("Technical Documentation for VitaCoat | Standards, Safety and Support", "Technical documentation for VitaCoat, including standards, safety, surface compatibility, application guidance and procurement support."),
    "/en/faq/": ("FAQ About Antimicrobial Coating | VitaCoat", "Answers about VitaCoat, antimicrobial coating, cleaning, durability, compatibility, documentation, pilot adoption and claim boundaries."),
    "/en/legal/": ("Legal Information and Claim Boundaries | VitaCoat", "Legal information, usage limitations and claim boundaries for VitaCoat as a supplementary antimicrobial coating for hard high-touch surfaces."),
    "/en/technical-support/": ("Technical Support for VitaCoat | Evaluation, Documentation and Pilot", "Contact VitaCoat technical support for surface assessment, documentation, application process, pilot evaluation and implementation questions."),
    "/en/contact/": ("Contact VitaCoat | Technical Evaluation and Documentation", "Contact VitaCoat for technical evaluation, documentation requests, pilot dialogue, procurement questions or project clarification."),
}

CANONICAL_PATHS = set(SEO_NO) | set(SEO_EN)

TAG_PATTERNS = [
    r"<title\b[^>]*>.*?</title>",
    r"<meta\b(?=[^>]*\bname=[\"']description[\"'])[^>]*>",
    r"<meta\b(?=[^>]*\bname=[\"']content-language[\"'])[^>]*>",
    r"<meta\b(?=[^>]*\bproperty=[\"']og:[^\"']+[\"'])[^>]*>",
    r"<meta\b(?=[^>]*\bname=[\"']twitter:[^\"']+[\"'])[^>]*>",
    r"<link\b(?=[^>]*\brel=[\"']canonical[\"'])[^>]*>",
    r"<link\b(?=[^>]*\brel=[\"']alternate[\"'])[^>]*>",
]
TAG_RE = re.compile("|".join(TAG_PATTERNS), re.I | re.S)
STATIC_BLOCK_RE = re.compile(r"\s*<!-- Static SEO metadata: start -->.*?<!-- Static SEO metadata: end -->\s*", re.I | re.S)


def page_path(file_path: Path) -> str:
    rel = file_path.as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def no_equivalent(path: str) -> str:
    if path.startswith("/en/"):
        stripped = path[3:]
        return stripped if stripped.startswith("/") else "/" + stripped
    return path


def en_equivalent(path: str) -> str:
    no_path = no_equivalent(path)
    return "/en/" if no_path == "/" else "/en" + no_path


def get_seo(path: str) -> tuple[str, str]:
    if path.startswith("/en/"):
        return SEO_EN[path]
    return SEO_NO[path]


def escape(value: str) -> str:
    return html.escape(value, quote=True)


def static_block(path: str) -> str:
    title, description = get_seo(path)
    no_path = no_equivalent(path)
    en_path = en_equivalent(path)
    canonical = f"{BASE_URL}{path}"
    lang = "en" if path.startswith("/en/") else "nb-NO"
    return "\n".join([
        "  <!-- Static SEO metadata: start -->",
        f"  <title>{escape(title)}</title>",
        f"  <meta name=\"description\" content=\"{escape(description)}\">",
        f"  <meta property=\"og:title\" content=\"{escape(title)}\">",
        f"  <meta property=\"og:description\" content=\"{escape(description)}\">",
        "  <meta property=\"og:type\" content=\"website\">",
        f"  <meta property=\"og:url\" content=\"{escape(canonical)}\">",
        f"  <meta property=\"og:image\" content=\"{escape(OG_IMAGE)}\">",
        "  <meta name=\"twitter:card\" content=\"summary_large_image\">",
        f"  <meta name=\"twitter:title\" content=\"{escape(title)}\">",
        f"  <meta name=\"twitter:description\" content=\"{escape(description)}\">",
        f"  <meta name=\"twitter:image\" content=\"{escape(OG_IMAGE)}\">",
        f"  <link rel=\"canonical\" href=\"{escape(canonical)}\">",
        f"  <link rel=\"alternate\" hreflang=\"nb-NO\" href=\"{escape(BASE_URL + no_path)}\">",
        f"  <link rel=\"alternate\" hreflang=\"no\" href=\"{escape(BASE_URL + no_path)}\">",
        f"  <link rel=\"alternate\" hreflang=\"en\" href=\"{escape(BASE_URL + en_path)}\">",
        f"  <link rel=\"alternate\" hreflang=\"x-default\" href=\"{BASE_URL}/\">",
        f"  <meta name=\"content-language\" content=\"{lang}\">",
        "  <!-- Static SEO metadata: end -->",
    ])


def clean_head(head: str) -> str:
    head = STATIC_BLOCK_RE.sub("\n", head)
    head = TAG_RE.sub("", head)
    head = re.sub(r"\n{3,}", "\n\n", head)
    return "\n".join(line.rstrip() for line in head.splitlines() if line.strip())


def rewrite_file(path_obj: Path) -> bool:
    original = path_obj.read_text(encoding="utf-8")
    match = re.search(r"<head>(.*?)</head>", original, flags=re.S | re.I)
    if not match:
        return False
    path = page_path(path_obj)
    head = clean_head(match.group(1))
    if path not in CANONICAL_PATHS:
        new_head = head
    else:
        lines = head.splitlines()
        charset_index = next((i for i, line in enumerate(lines) if "charset" in line.lower()), -1)
        block = static_block(path)
        if charset_index >= 0:
            new_lines = lines[: charset_index + 1] + [block] + lines[charset_index + 1 :]
        else:
            new_lines = [block] + lines
        new_head = "\n".join(line for line in new_lines if line.strip())
    updated = original[: match.start(1)] + "\n" + new_head + "\n" + original[match.end(1) :]
    if updated != original:
        path_obj.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> int:
    changed = []
    for file_path in sorted(Path(".").rglob("*.html")):
        if any(part.startswith(".") and part not in {"."} for part in file_path.parts):
            continue
        if rewrite_file(file_path):
            changed.append(str(file_path))
    if changed:
        print("Updated static SEO heads:")
        for item in changed:
            print(f"- {item}")
    else:
        print("No HTML head updates required.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
