#!/usr/bin/env python3
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import argparse, re, time
import xml.etree.ElementTree as ET

BASE_URL="https://www.vitacoat.no"
UA="VitaCoat-Production-Acceptance/1.0"

class CanonicalParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonical=[]
    def handle_starttag(self,tag,attrs_list):
        if tag!="link": return
        attrs=dict(attrs_list)
        if (attrs.get("rel") or "").lower()=="canonical" and attrs.get("href"):
            self.canonical.append(attrs["href"])

def fetch(url,attempts=5,delay=3.0):
    last=None
    for attempt in range(attempts):
        try:
            req=Request(url,headers={"User-Agent":UA,"Cache-Control":"no-cache","Pragma":"no-cache","Accept":"text/html,application/xml,text/plain;q=0.9,*/*;q=0.8"})
            with urlopen(req,timeout=20) as response:
                return response.status,response.headers.get("Content-Type",""),response.read().decode("utf-8",errors="replace")
        except (HTTPError,URLError,TimeoutError) as exc:
            last=exc
            if attempt+1<attempts: time.sleep(delay)
    raise RuntimeError(f"Unable to fetch {url}: {last}")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--sitemap",default="sitemap.xml"); args=ap.parse_args()
    ns={"s":"https://www.sitemaps.org/schemas/sitemap/0.9"}
    local_root=ET.parse(Path(args.sitemap)).getroot()
    expected=[e.text.strip() for e in local_root.findall("s:url/s:loc",ns) if e.text]
    errors=[]
    try:
        status,_,live_sitemap=fetch(BASE_URL+"/sitemap.xml",attempts=8,delay=5.0)
    except RuntimeError as exc:
        print("VitaCoat production acceptance FAILED\n- "+str(exc)); return 1
    if status!=200: errors.append(f"Live sitemap returned HTTP {status}")
    try:
        live_root=ET.fromstring(live_sitemap)
        live=[e.text.strip() for e in live_root.findall("s:url/s:loc",ns) if e.text]
    except ET.ParseError as exc:
        live=[]; errors.append(f"Live sitemap invalid XML: {exc}")
    if set(live)!=set(expected):
        errors.append(f"Live sitemap mismatch: expected {len(expected)} URLs, found {len(live)}")
    for url in expected:
        try: status,ctype,body=fetch(url,attempts=3,delay=2.0)
        except RuntimeError as exc: errors.append(str(exc)); continue
        if status!=200: errors.append(f"{url}: HTTP {status}"); continue
        if "text/html" not in ctype.lower(): errors.append(f"{url}: unexpected Content-Type {ctype}")
        p=CanonicalParser(); p.feed(body)
        if p.canonical != [url]: errors.append(f"{url}: live canonical mismatch {p.canonical}")
    checks={
        BASE_URL+"/":["NanoTech Solutions Norway AS","/assets/img/frontpage-hero.webp"],
        BASE_URL+"/about/":["925 367 869","Vestsideveien 279"],
        BASE_URL+"/technical-evaluation/":["Seks spørsmål som bør være avklart før innkjøp"],
        BASE_URL+"/en/technical-evaluation/":["Six questions to resolve before procurement"],
        BASE_URL+"/faq/":['"@type":"FAQPage"'],
        BASE_URL+"/en/contact/":['"@type":"ContactPage"'],
    }
    for url,markers in checks.items():
        try: _,_,body=fetch(url,attempts=8,delay=5.0)
        except RuntimeError as exc: errors.append(str(exc)); continue
        for marker in markers:
            if marker not in body: errors.append(f"{url}: missing production marker: {marker}")
    try:
        _,_,robots=fetch(BASE_URL+"/robots.txt",attempts=5,delay=3.0)
        if f"Sitemap: {BASE_URL}/sitemap.xml" not in robots: errors.append("robots.txt missing live sitemap")
        _,_,llms=fetch(BASE_URL+"/llms.txt",attempts=5,delay=3.0)
        for marker in ("/about/","/technical-evaluation/","NanoTech Solutions Norway AS"):
            if marker not in llms: errors.append(f"llms.txt missing marker: {marker}")
    except RuntimeError as exc:
        errors.append(str(exc))
    for path in ("/thank-you/","/en/thank-you/"):
        try: status,_,body=fetch(BASE_URL+path,attempts=3,delay=2.0)
        except RuntimeError as exc: errors.append(str(exc)); continue
        if status!=200: errors.append(f"{path}: HTTP {status}")
        if not re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex',body,flags=re.I):
            errors.append(f"{path}: missing noindex")
    if errors:
        print("VitaCoat production acceptance FAILED")
        for x in errors: print("- "+x)
        return 1
    print(f"VitaCoat production acceptance passed: {len(expected)} canonical URLs returned HTTP 200 with matching canonical tags; discovery and release markers verified.")
    return 0
if __name__=="__main__":
    raise SystemExit(main())
