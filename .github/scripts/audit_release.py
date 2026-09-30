#!/usr/bin/env python3
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import json, re, sys
import xml.etree.ElementTree as ET

REPO = Path(__file__).resolve().parents[2]
ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else REPO
BASE_URL = "https://www.vitacoat.no"
sys.path.insert(0, str(REPO / ".github" / "scripts"))
import apply_static_seo_heads as seo

errors, warnings = [], []
def fail(m): errors.append(m)
def warn(m): warnings.append(m)
def path_to_file(path):
    clean = unquote(path.split("?",1)[0].split("#",1)[0])
    if clean == "/": return ROOT / "index.html"
    if clean.endswith("/"): return ROOT / clean.lstrip("/") / "index.html"
    return ROOT / clean.lstrip("/")

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links=[]; self.images=[]; self.jsonld=[]; self._json=False; self._chunks=[]
        self.h1_count=0; self.lang=None; self.meta_robots=[]; self.canonical=[]; self.alternates={}
    def handle_starttag(self, tag, attrs_list):
        attrs=dict(attrs_list)
        if tag=="html": self.lang=attrs.get("lang")
        elif tag=="a" and attrs.get("href"): self.links.append(attrs["href"])
        elif tag=="img" and attrs.get("src"): self.images.append((attrs["src"],attrs.get("alt")))
        elif tag=="h1": self.h1_count += 1
        elif tag=="meta" and (attrs.get("name") or "").lower()=="robots" and attrs.get("content"):
            self.meta_robots.append(attrs["content"].lower())
        elif tag=="link":
            rel=(attrs.get("rel") or "").lower(); href=attrs.get("href")
            if rel=="canonical" and href: self.canonical.append(href)
            if rel=="alternate" and href and attrs.get("hreflang"):
                self.alternates.setdefault(attrs["hreflang"],[]).append(href)
        elif tag=="script" and (attrs.get("type") or "").lower()=="application/ld+json":
            self._json=True; self._chunks=[]
    def handle_endtag(self, tag):
        if tag=="script" and self._json:
            self.jsonld.append("".join(self._chunks).strip()); self._json=False; self._chunks=[]
    def handle_data(self, data):
        if self._json: self._chunks.append(data)

def jsonld_types(value):
    out=set()
    if isinstance(value,dict):
        t=value.get("@type")
        if isinstance(t,str): out.add(t)
        elif isinstance(t,list): out.update(x for x in t if isinstance(x,str))
        for v in value.values(): out.update(jsonld_types(v))
    elif isinstance(value,list):
        for v in value: out.update(jsonld_types(v))
    return out

root=ET.parse(ROOT/"sitemap.xml").getroot()
ns={"s":"https://www.sitemaps.org/schemas/sitemap/0.9"}
locs=[e.text.strip() for e in root.findall("s:url/s:loc",ns) if e.text]
if len(locs)!=len(set(locs)): fail("sitemap.xml contains duplicate URLs")
canonical_paths={urlparse(x).path or "/" for x in locs}
if canonical_paths != seo.CANONICAL_PATHS:
    missing=sorted(seo.CANONICAL_PATHS-canonical_paths)
    extra=sorted(canonical_paths-seo.CANONICAL_PATHS)
    if missing: fail("SEO map paths missing from sitemap: "+", ".join(missing))
    if extra: fail("Sitemap paths missing from SEO map: "+", ".join(extra))
incoming={p:0 for p in canonical_paths}
required_schema={
"/":{"Organization","WebSite","Brand","Product"},"/en/":{"Organization","WebSite","Brand","Product"},
"/about/":{"Organization","AboutPage"},"/en/about/":{"Organization","AboutPage"},
"/faq/":{"FAQPage"},"/en/faq/":{"FAQPage"},"/contact/":{"ContactPage"},"/en/contact/":{"ContactPage"},
"/technical-evaluation/":{"WebPage"},"/en/technical-evaluation/":{"WebPage"}}
for path in sorted(canonical_paths):
    fp=path_to_file(path)
    if not fp.exists(): fail(f"Missing canonical file: {path}"); continue
    content=fp.read_text(encoding="utf-8",errors="ignore")
    p=PageParser(); p.feed(content)
    expected_lang="en" if path.startswith("/en/") else "nb-NO"
    if p.lang != expected_lang: fail(f"{path}: html lang {p.lang!r}, expected {expected_lang!r}")
    if p.h1_count != 1: fail(f"{path}: expected one H1, found {p.h1_count}")
    if p.canonical != [BASE_URL+path]: fail(f"{path}: canonical mismatch {p.canonical}")
    for code,expected in (("nb-NO",BASE_URL+seo.no_equivalent(path)),("no",BASE_URL+seo.no_equivalent(path)),("en",BASE_URL+seo.en_equivalent(path)),("x-default",BASE_URL+"/")):
        if p.alternates.get(code,[]) != [expected]: fail(f"{path}: hreflang {code} mismatch")
    robots=",".join(p.meta_robots)
    if "noindex" in robots or "nosnippet" in robots: fail(f"{path}: restrictive robots directive {robots}")
    types=set()
    for raw in p.jsonld:
        if not raw: continue
        try: data=json.loads(raw)
        except json.JSONDecodeError as exc: fail(f"{path}: invalid JSON-LD: {exc}"); continue
        types.update(jsonld_types(data))
    missing_types=required_schema.get(path,set())-types
    if missing_types: fail(f"{path}: missing schema types {', '.join(sorted(missing_types))}")
    for src,alt in p.images:
        if src.startswith("/") and not path_to_file(src).exists(): fail(f"{path}: missing image {src}")
        if alt is None: fail(f"{path}: image missing alt attribute {src}")
    for href in p.links:
        u=urlparse(href)
        if u.scheme in {"mailto","tel","javascript","data"}: continue
        if u.scheme in {"http","https"} and u.netloc not in {"www.vitacoat.no","vitacoat.no"}: continue
        if u.scheme in {"http","https"}: lp=u.path or "/"
        elif href.startswith("/"): lp=u.path or "/"
        else: continue
        if lp.startswith("/assets/"):
            if not path_to_file(lp).exists(): fail(f"{path}: broken local asset link {href}")
            continue
        if not path_to_file(lp).exists(): fail(f"{path}: broken internal link {href}")
        if lp in canonical_paths and lp != path: incoming[lp]+=1
for path,count in sorted(incoming.items()):
    if count==0 and path!="/": warn(f"Potential orphan canonical page: {path}")
robots=(ROOT/"robots.txt").read_text(encoding="utf-8",errors="ignore")
if f"Sitemap: {BASE_URL}/sitemap.xml" not in robots: fail("robots.txt does not advertise sitemap")
if re.search(r"(?im)^Disallow:\s*/\s*$",robots): fail("robots.txt blocks whole site")
for name in ("llms.txt","llms-full.txt"):
    text=(ROOT/name).read_text(encoding="utf-8",errors="ignore")
    for required in ("https://www.vitacoat.no/about/","https://www.vitacoat.no/technical-evaluation/","NanoTech Solutions Norway AS"):
        if required not in text: fail(f"{name}: missing {required}")
if warnings:
    print("VitaCoat release audit warnings:")
    for x in warnings: print("- "+x)
if errors:
    print("VitaCoat release audit FAILED")
    for x in errors: print("- "+x)
    sys.exit(1)
print(f"VitaCoat release audit passed: {len(canonical_paths)} canonical URLs, {sum(incoming.values())} internal canonical link edges, structured data and discovery controls validated.")
