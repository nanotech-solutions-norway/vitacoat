document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEn = path.startsWith('/en/');
  document.documentElement.lang = isEn ? 'en' : 'nb-NO';

  const toEn = p => (p === '/' ? '/en/' : `/en${p}`);
  const toNo = p => (p.startsWith('/en/') ? (p.replace(/^\/en/, '') || '/') : p);
  const local = p => (isEn ? toEn(p) : p);

  const routes = {
    home: local('/'), applications: local('/applications/'), documentation: local('/documentation/'),
    technicalSupport: local('/technical-support/'), downloads: local('/technical-support/downloads/'), contact: local('/contact/'), how: local('/how-it-works/'),
    healthcare: local('/applications/healthcare/'), food: local('/applications/food-processing/'), publicFacilities: local('/applications/public-facilities/'),
    education: local('/applications/education-and-offices/'), electronics: local('/applications/electronics-and-touchpoints/'), continuous: local('/benefits/continuous-protection/'),
    cleaning: local('/benefits/easier-cleaning/'), compatibility: local('/benefits/surface-compatibility/'), testing: local('/proof/testing-and-standards/'),
    durability: local('/proof/durability/'), safety: local('/proof/safety-and-environment/'), pathogens: local('/proof/pathogen-spectrum/'),
    process: local('/application-process/'), maintenance: local('/maintenance-and-reapplication/'), faq: local('/faq/'), legal: local('/legal/')
  };

  const seoTitlesNo = {
    '/': ['Antimikrobielt belegg for berøringsflater | VitaCoat Norge','VitaCoat er et transparent antimikrobielt belegg for harde, ikke-porøse berøringsflater i helse, offentlige miljøer, skole, kontor og delte kontaktpunkter. Be om teknisk vurdering eller dokumentasjon.'],
    '/applications/': ['Bruksområder for antimikrobielt belegg | VitaCoat','Se hvor VitaCoat kan brukes som antimikrobielt belegg for harde berøringsflater i helse, næringsmiddelindustri, offentlige miljøer, skole, kontor, terminaler og skjermer.'],
    '/applications/healthcare/': ['Antimikrobielt belegg for kliniske berøringsflater | VitaCoat','VitaCoat støtter hygienekontroll på harde, ikke-porøse kliniske berøringsflater i pasientnære miljøer.'],
    '/applications/food-processing/': ['Hygienebelegg for harde flater uten direkte matkontakt | VitaCoat','Antimikrobielt hygienebelegg for harde flater uten direkte matkontakt i næringsmiddelindustri, kontrollpaneler og prosessmiljøer.'],
    '/applications/public-facilities/': ['Antimikrobiell overflatebehandling for offentlige kontaktflater | VitaCoat','Transparent antimikrobiell overflatebehandling for offentlige kontaktflater, kiosker, heisknapper, terminaler og felles berøringspunkter.'],
    '/applications/education-and-offices/': ['Hygienebelegg for delte flater i skole og kontor | VitaCoat','Antimikrobielt hygienebelegg for delte harde flater i skoler, kontorer, møterom, resepsjoner og felles arbeidsmiljøer.'],
    '/applications/electronics-and-touchpoints/': ['Antimikrobiell coating for touchskjermer og terminaler | VitaCoat','Antimikrobiell coating for touchskjermer, betalingsterminaler, kiosker, minibanker og delte elektroniske kontaktpunkter.'],
    '/how-it-works/': ['Hvordan VitaCoat fungerer | Citrox og SiO₂ overflatefilm','Les hvordan VitaCoat kombinerer citrus bioflavonoider med en transparent SiO₂-overflatefilm for harde berøringsflater.'],
    '/proof/testing-and-standards/': ['Testing og standarder for VitaCoat | EN 13727, EN 13624, EN 14476','Oversikt over testing, standarder og dokumentasjon for VitaCoat, inkludert EN 13727, EN 13624, EN 14476, sikkerhet og teknisk underlag.'],
    '/documentation/': ['Dokumentasjon for VitaCoat | Standarder, sikkerhet og teknisk underlag','Teknisk dokumentasjon for VitaCoat, inkludert standarder, sikkerhet, overflatekompatibilitet, applikasjonsveiledning og innkjøpsunderlag.'],
    '/technical-support/': ['Teknisk støtte for VitaCoat | Vurdering, dokumentasjon og pilot','Kontakt teknisk støtte for VitaCoat for substratvurdering, dokumentasjon, applikasjonsprosess, pilotprosjekt og implementeringsspørsmål.'],
    '/contact/': ['Kontakt VitaCoat | Teknisk vurdering og dokumentasjon','Kontakt VitaCoat for teknisk vurdering, dokumentasjon, pilotdialog, innkjøpsspørsmål eller prosjektavklaring.']
  };

  const seoTitlesEn = {
    '/en/': ['Antimicrobial Coating for High-Touch Surfaces | VitaCoat','VitaCoat is a transparent antimicrobial coating for hard, non-porous high-touch surfaces in healthcare, public facilities, workplaces, food-processing environments, and shared touchpoints. Request technical evaluation or documentation.'],
    '/en/applications/': ['Applications for Antimicrobial Coating | VitaCoat','Explore VitaCoat applications across healthcare, food processing, public facilities, education, workplaces, electronics, touchscreens, kiosks and shared touchpoints.'],
    '/en/applications/healthcare/': ['Antimicrobial Coating for Healthcare Touch Surfaces | VitaCoat','VitaCoat supports hygiene control on hard, non-porous healthcare touch surfaces in patient-near and clinical environments.'],
    '/en/applications/food-processing/': ['Hygienic Coating for Hard Surfaces in Food Processing | VitaCoat','Transparent antimicrobial coating for selected hard, non-food-contact surfaces in food-processing environments, control panels and shared touchpoints.'],
    '/en/applications/public-facilities/': ['Antimicrobial Surface Protection for Public Touchpoints | VitaCoat','VitaCoat provides antimicrobial surface protection for public touchpoints including kiosks, terminals, elevator controls and high-traffic shared surfaces.'],
    '/en/applications/education-and-offices/': ['Antimicrobial Coating for Shared Surfaces in Schools and Workplaces | VitaCoat','Antimicrobial coating for shared hard surfaces in schools, offices, meeting rooms, reception areas and workplaces.'],
    '/en/applications/electronics-and-touchpoints/': ['Antimicrobial Coating for Touchscreens, Kiosks and Terminals | VitaCoat','Transparent antimicrobial coating for touchscreens, payment terminals, kiosks, ATMs and shared electronic touchpoints.'],
    '/en/how-it-works/': ['How VitaCoat Works | Citrus Bioflavonoids + SiO₂ Surface Matrix','Learn how VitaCoat combines citrus bioflavonoids with a transparent SiO₂ surface matrix to support hygiene on high-touch surfaces.'],
    '/en/proof/testing-and-standards/': ['Testing and Standards | EN 13727, EN 13624, EN 14476 | VitaCoat','Testing and standards overview for VitaCoat, including EN 13727, EN 13624, EN 14476, durability, safety and technical documentation.'],
    '/en/documentation/': ['Technical Documentation for VitaCoat | Standards, Safety and Support','Technical documentation for VitaCoat, including standards, safety, surface compatibility, application guidance and procurement support.'],
    '/en/technical-support/': ['Technical Support for VitaCoat | Evaluation, Documentation and Pilot','Contact VitaCoat technical support for surface assessment, documentation, pilot evaluation and implementation questions.'],
    '/en/contact/': ['Contact VitaCoat | Technical Evaluation and Documentation','Contact VitaCoat for technical evaluation, documentation requests, pilot dialogue, procurement questions or project clarification.']
  };

  const genericNo = ['Antimikrobielt belegg og teknisk dokumentasjon | VitaCoat','VitaCoat er et transparent antimikrobielt belegg for harde, ikke-porøse berøringsflater.'];
  const genericEn = ['Antimicrobial Coating and Technical Documentation | VitaCoat','VitaCoat is a transparent antimicrobial coating for hard, non-porous high-touch surfaces.'];

  const meta = (selector, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el) { el = document.createElement('meta'); attr.startsWith('og:') ? el.setAttribute('property', attr) : el.setAttribute('name', attr); document.head.appendChild(el); }
    el.setAttribute('content', value);
  };
  const link = (rel, attrs) => {
    const selector = attrs.hreflang ? `link[rel="${rel}"][hreflang="${attrs.hreflang}"]` : `link[rel="${rel}"]`;
    let el = document.head.querySelector(selector);
    if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
    Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,v));
  };

  const applySeo = () => {
    const data = (isEn ? seoTitlesEn[path] : seoTitlesNo[path]) || (isEn ? genericEn : genericNo);
    const noPath = toNo(path), enPath = toEn(noPath);
    document.title = data[0];
    meta('meta[name="description"]', 'description', data[1]);
    meta('meta[property="og:title"]', 'og:title', data[0]);
    meta('meta[property="og:description"]', 'og:description', data[1]);
    meta('meta[property="og:type"]', 'og:type', 'website');
    meta('meta[property="og:url"]', 'og:url', `https://www.vitacoat.no${path}`);
    meta('meta[property="og:image"]', 'og:image', 'https://www.vitacoat.no/assets/img/vitacoat-og.svg');
    meta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    meta('meta[name="twitter:title"]', 'twitter:title', data[0]);
    meta('meta[name="twitter:description"]', 'twitter:description', data[1]);
    meta('meta[name="twitter:image"]', 'twitter:image', 'https://www.vitacoat.no/assets/img/vitacoat-og.svg');
    link('canonical', { href: `https://www.vitacoat.no${path}` });
    link('alternate', { hreflang: 'nb-NO', href: `https://www.vitacoat.no${noPath}` });
    link('alternate', { hreflang: 'no', href: `https://www.vitacoat.no${noPath}` });
    link('alternate', { hreflang: 'en', href: `https://www.vitacoat.no${enPath}` });
    link('alternate', { hreflang: 'x-default', href: 'https://www.vitacoat.no/' });
  };

  const setLanguage = code => { try { localStorage.setItem('vitacoat-language', code); localStorage.setItem('vitacoat-language-initialized', 'true'); } catch (e) {} };
  const makeLanguageSwitch = (placement = '') => {
    const wrap = document.createElement('div'); wrap.className = `language-switcher flag-language-switcher${placement ? ` ${placement}` : ''}`;
    [ { flag: '🇳🇴', href: toNo(path), active: !isEn, code: 'no', label: 'Norsk' }, { flag: '🇬🇧', href: isEn ? path : toEn(path), active: isEn, code: 'en', label: 'English' } ].forEach(item => {
      const a = document.createElement('a'); a.href = item.href; a.textContent = item.flag; a.className = `language-link flag-language-link${item.active ? ' active-lang' : ''}`; a.setAttribute('hreflang', item.code); a.setAttribute('aria-label', item.label); a.setAttribute('title', item.label); a.addEventListener('click', () => setLanguage(item.code)); wrap.appendChild(a);
    });
    return wrap;
  };

  const footerColumns = isEn ? [
    { title: 'Applications', href: routes.applications, links: [['Applications', routes.applications], ['Healthcare', routes.healthcare], ['Food Processing', routes.food], ['Public Facilities', routes.publicFacilities], ['Education & Offices', routes.education], ['Electronics & Touchpoints', routes.electronics], ['Application Process', routes.process]] },
    { title: 'Technical', href: routes.documentation, links: [['Technical', routes.documentation], ['How it Works', routes.how], ['Continuous Protection', routes.continuous], ['Easier Cleaning', routes.cleaning], ['Surface Compatibility', routes.compatibility], ['Testing & Standards', routes.testing], ['Durability', routes.durability]] },
    { title: 'Support', href: routes.technicalSupport, links: [['Technical Support', routes.technicalSupport], ['Download Center', routes.downloads], ['Maintenance and Reapplication', routes.maintenance], ['FAQ', routes.faq]] },
    { title: 'Contact', href: routes.contact, links: [['Contact', routes.contact], ['Legal Information', routes.legal], ['Safety & Environment', routes.safety]] }
  ] : [
    { title: 'Bruksområder', href: routes.applications, links: [['Bruksområder', routes.applications], ['Helse', routes.healthcare], ['Næringsmiddelindustri', routes.food], ['Offentlige miljøer', routes.publicFacilities], ['Skole og kontor', routes.education], ['Elektronikk og kontaktpunkter', routes.electronics], ['Applikasjonsprosess', routes.process]] },
    { title: 'Teknisk', href: routes.documentation, links: [['Teknisk', routes.documentation], ['Hvordan det fungerer', routes.how], ['Vedvarende beskyttelse', routes.continuous], ['Enklere rengjøring', routes.cleaning], ['Overflatekompatibilitet', routes.compatibility], ['Testing og standarder', routes.testing], ['Holdbarhet', routes.durability]] },
    { title: 'Støtte', href: routes.technicalSupport, links: [['Teknisk støtte', routes.technicalSupport], ['Nedlastingssenter', routes.downloads], ['Vedlikehold og re-applikasjon', routes.maintenance], ['FAQ', routes.faq]] },
    { title: 'Kontakt', href: routes.contact, links: [['Kontakt', routes.contact], ['Juridisk informasjon', routes.legal], ['Sikkerhet og miljø', routes.safety]] }
  ];
  const nav = footerColumns.map(col => ({ label: col.title, href: col.href, links: col.links, active: p => p.startsWith(col.href) || col.links.some(([, href]) => p === href || (href !== '/' && p.startsWith(href))) }));

  const injectGlobalOverrides = () => {
    const style = document.createElement('style'); style.id = 'vitacoat-global-js-overrides';
    style.textContent = `.brand:before,.footer-top-logo{background-image:url('/assets/img/vitacoat-logo.png')!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}.nav-dropdown .dropdown-menu{display:flex!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .22s ease .95s,visibility 0s linear 1.15s!important}.nav-dropdown:hover .dropdown-menu,.nav-dropdown:focus-within .dropdown-menu{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transition-delay:0s!important}.language-switcher{display:flex!important;align-items:center!important;gap:8px!important}.flag-language-link{font-size:23px!important;text-decoration:none!important;line-height:1!important;opacity:.65!important}.flag-language-link.active-lang{opacity:1!important}.site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}.footer-top-logo{position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;font-size:0!important;line-height:0!important;color:transparent!important;overflow:hidden!important}@media(max-width:860px){.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}}`;
    const old = document.getElementById(style.id); if (old) old.remove(); document.head.appendChild(style);
  };

  const renderNav = () => {
    const desktop = document.querySelector('.nav');
    if (desktop) { desktop.innerHTML = ''; nav.forEach(item => { const dd = document.createElement('div'); dd.className = 'nav-dropdown'; const top = document.createElement('a'); top.href = item.href; top.textContent = item.label; if (item.active(path)) top.classList.add('active'); dd.appendChild(top); const menu = document.createElement('div'); menu.className = 'dropdown-menu'; item.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; if (path === href) a.classList.add('active-sub'); menu.appendChild(a); }); dd.appendChild(menu); desktop.appendChild(dd); }); }
    const headerInner = document.querySelector('.header-inner'); const menuToggle = document.querySelector('.menu-toggle'); const mobile = document.querySelector('.mobile-nav'); const mobileContainer = document.querySelector('.mobile-nav .container');
    if (headerInner && !headerInner.querySelector('.language-switcher')) headerInner.insertBefore(makeLanguageSwitch('header-language-switcher'), menuToggle || null);
    if (menuToggle) { menuToggle.type = 'button'; menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">' + (isEn ? 'Menu' : 'Meny') + '</span>'; menuToggle.setAttribute('aria-expanded', 'false'); }
    if (mobileContainer) { mobileContainer.innerHTML = ''; nav.forEach(item => { const group = document.createElement('div'); group.className = 'mobile-nav-group'; const link = document.createElement('a'); link.href = item.href; link.textContent = item.label; link.className = 'mobile-main-link'; group.appendChild(link); item.links.slice(1).forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; a.className = 'mobile-subnav-link'; group.appendChild(a); }); mobileContainer.appendChild(group); }); mobileContainer.appendChild(makeLanguageSwitch('mobile-language-switcher')); }
    if (menuToggle && mobile) menuToggle.addEventListener('click', e => { e.preventDefault(); const open = mobile.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  };

  const renderFooter = () => {
    document.querySelectorAll('.site-footer .footer-grid').forEach(footer => { footer.innerHTML = ''; const logo = document.createElement('a'); logo.href = routes.home; logo.className = 'footer-top-logo'; logo.setAttribute('aria-label', 'VitaCoat'); footer.appendChild(logo); footerColumns.forEach(column => { const col = document.createElement('div'); col.className = 'footer-column'; const h = document.createElement('h4'); const hl = document.createElement('a'); hl.href = column.href; hl.textContent = column.title; h.appendChild(hl); const list = document.createElement('ul'); list.className = 'footer-links'; column.links.slice(1).forEach(([label, href]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = href; a.textContent = label; li.appendChild(a); list.appendChild(li); }); col.appendChild(h); col.appendChild(list); footer.appendChild(col); }); const box = document.createElement('div'); box.className = 'footer-language'; box.appendChild(makeLanguageSwitch('footer-language-switcher')); footer.appendChild(box); });
  };

  const setHeroImage = () => {
    const heroMap = { '/': '/assets/img/frontpage-hero.jpeg', '/en/': '/assets/img/frontpage-hero.jpeg', '/applications/': '/assets/img/applications-graph-01.jpeg', '/en/applications/': '/assets/img/applications-graph-01.jpeg', '/documentation/': '/assets/img/vitacoat-documentation-panel.jpeg', '/en/documentation/': '/assets/img/vitacoat-documentation-panel.jpeg', '/technical-support/': '/assets/img/technical-support-hero-01.jpeg', '/en/technical-support/': '/assets/img/technical-support-hero-01.jpeg', '/contact/': '/assets/img/vitacoat-contact-panel.jpeg', '/en/contact/': '/assets/img/vitacoat-contact-panel.jpeg' };
    const hero = document.querySelector('.hero-media img'); if (hero && heroMap[path]) hero.src = heroMap[path];
    document.querySelectorAll('img[src^="/assets/img/"]').forEach(img => { if (/logo|favicon/i.test(img.src)) img.src = img.src.replace(/\.svg(\?.*)?$/i, '.png'); else img.src = img.src.replace(/\.svg(\?.*)?$/i, '.jpeg'); });
  };

  const normalizeContactLinks = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => { const inContact = path.endsWith('/contact/') || path.endsWith('/en/contact/'); if (inContact && a.classList.contains('btn')) { a.remove(); return; } a.href = `${routes.contact}?topic=${encodeURIComponent(path.includes('/applications/') ? 'Pilot project' : 'Technical review')}`; if (/@vitacoat\.no/i.test(a.textContent || '')) a.textContent = isEn ? 'Contact VitaCoat' : 'Kontakt VitaCoat'; });
  };

  const setupBackToTop = () => { const top = document.createElement('button'); top.type = 'button'; top.className = 'mobile-top-button'; top.setAttribute('aria-label', isEn ? 'Back to top' : 'Til toppen'); top.innerHTML = isEn ? '<span aria-hidden="true">↑</span><span>Back to top</span>' : '<span aria-hidden="true">↑</span><span>Til toppen</span>'; document.body.appendChild(top); top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); };

  applySeo();
  injectGlobalOverrides();
  renderNav();
  renderFooter();
  setHeroImage();
  normalizeContactLinks();
  setupBackToTop();
});
