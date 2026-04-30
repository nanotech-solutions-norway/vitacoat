document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEn = path.startsWith('/en/');
  document.documentElement.lang = isEn ? 'en' : 'nb-NO';

  const toEn = p => (p === '/' ? '/en/' : `/en${p}`);
  const toNo = p => (p.startsWith('/en/') ? (p.replace(/^\/en/, '') || '/') : p);
  const noPath = toNo(path);
  const enPath = isEn ? path : toEn(path);
  const local = p => (isEn ? toEn(p) : p);

  const routes = {
    home: local('/'), applications: local('/applications/'), documentation: local('/documentation/'), technicalSupport: local('/technical-support/'), downloads: local('/technical-support/downloads/'), contact: local('/contact/'), how: local('/how-it-works/'),
    healthcare: local('/applications/healthcare/'), food: local('/applications/food-processing/'), publicFacilities: local('/applications/public-facilities/'), education: local('/applications/education-and-offices/'), electronics: local('/applications/electronics-and-touchpoints/'),
    continuous: local('/benefits/continuous-protection/'), cleaning: local('/benefits/easier-cleaning/'), compatibility: local('/benefits/surface-compatibility/'), testing: local('/proof/testing-and-standards/'), durability: local('/proof/durability/'), safety: local('/proof/safety-and-environment/'), pathogens: local('/proof/pathogen-spectrum/'),
    process: local('/application-process/'), maintenance: local('/maintenance/'), reapplication: local('/reapplication/'), maintenanceLegacy: local('/maintenance-and-reapplication/'), faq: local('/faq/'), legal: local('/legal/')
  };

  const columns = isEn ? [
    { title: 'Applications', href: routes.applications, links: [['Healthcare', routes.healthcare], ['Food Processing', routes.food], ['Public Facilities', routes.publicFacilities], ['Education & Offices', routes.education], ['Electronics & Touchpoints', routes.electronics], ['Application Process', routes.process]] },
    { title: 'Technical', href: routes.documentation, links: [['How it Works', routes.how], ['Continuous Protection', routes.continuous], ['Easier Cleaning', routes.cleaning], ['Surface Compatibility', routes.compatibility], ['Testing & Standards', routes.testing], ['Durability', routes.durability], ['Pathogen Spectrum', routes.pathogens]] },
    { title: 'Support', href: routes.technicalSupport, links: [['Download Center', routes.downloads], ['Maintenance', routes.maintenance], ['Reapplication', routes.reapplication]] },
    { title: 'Contact', href: routes.contact, links: [['Legal Information', routes.legal], ['Safety & Environment', routes.safety], ['FAQ', routes.faq]] }
  ] : [
    { title: 'Bruksområder', href: routes.applications, links: [['Helse', routes.healthcare], ['Næringsmiddelindustri', routes.food], ['Offentlige miljøer', routes.publicFacilities], ['Skole og kontor', routes.education], ['Elektronikk og kontaktpunkter', routes.electronics], ['Applikasjonsprosess', routes.process]] },
    { title: 'Teknisk', href: routes.documentation, links: [['Hvordan det fungerer', routes.how], ['Vedvarende beskyttelse', routes.continuous], ['Enklere rengjøring', routes.cleaning], ['Overflatekompatibilitet', routes.compatibility], ['Testing og standarder', routes.testing], ['Holdbarhet', routes.durability], ['Patogenspekter', routes.pathogens]] },
    { title: 'Støtte', href: routes.technicalSupport, links: [['Nedlastingssenter', routes.downloads], ['Vedlikehold', routes.maintenance], ['Reapplikasjon', routes.reapplication]] },
    { title: 'Kontakt', href: routes.contact, links: [['Juridisk informasjon', routes.legal], ['Sikkerhet og miljø', routes.safety], ['FAQ', routes.faq]] }
  ];

  const pageHeroMap = {
    '/': 'frontpage-hero.jpg', '/en/': 'frontpage-hero.jpg', '/applications/': 'vitacoat-applications-panel.jpeg', '/en/applications/': 'vitacoat-applications-panel.jpeg',
    '/applications/healthcare/': 'vitacoat-healthcare-application.jpg', '/en/applications/healthcare/': 'vitacoat-healthcare-application.jpg', '/applications/food-processing/': 'vitacoat-food-processing-application.jpg', '/en/applications/food-processing/': 'vitacoat-food-processing-application.jpg',
    '/applications/public-facilities/': 'vitacoat-public-facilities-application.jpg', '/en/applications/public-facilities/': 'vitacoat-public-facilities-application.jpg', '/applications/education-and-offices/': 'vitacoat-education-offices-application.jpg', '/en/applications/education-and-offices/': 'vitacoat-education-offices-application.jpg',
    '/applications/electronics-and-touchpoints/': 'vitacoat-electronics-touchpoints-application.jpg', '/en/applications/electronics-and-touchpoints/': 'vitacoat-electronics-touchpoints-application.jpg', '/how-it-works/': 'frontpage-three-mechanisms-one-continuous-barrier.jpeg', '/en/how-it-works/': 'frontpage-three-mechanisms-one-continuous-barrier.jpeg',
    '/benefits/continuous-protection/': 'frontpage-three-mechanisms-one-continuous-barrier.jpeg', '/en/benefits/continuous-protection/': 'frontpage-three-mechanisms-one-continuous-barrier.jpeg', '/benefits/easier-cleaning/': 'vitacoat-easier-cleaning.jpeg', '/en/benefits/easier-cleaning/': 'vitacoat-easier-cleaning.jpeg',
    '/benefits/surface-compatibility/': 'applications-hard-surface-compatibility.jpeg', '/en/benefits/surface-compatibility/': 'applications-hard-surface-compatibility.jpeg', '/proof/testing-and-standards/': 'vitacoat-testing-standards.jpeg', '/en/proof/testing-and-standards/': 'vitacoat-testing-standards.jpeg',
    '/proof/durability/': 'vitacoat-durability.jpeg', '/en/proof/durability/': 'vitacoat-durability.jpeg', '/proof/safety-and-environment/': 'vitacoat-safety-environment.jpeg', '/en/proof/safety-and-environment/': 'vitacoat-safety-environment.jpeg', '/proof/pathogen-spectrum/': 'vitacoat-pathogen-spectrum.jpeg', '/en/proof/pathogen-spectrum/': 'vitacoat-pathogen-spectrum.jpeg',
    '/application-process/': 'vitacoat-application-process.jpeg', '/en/application-process/': 'vitacoat-application-process.jpeg', '/maintenance/': 'vitacoat-maintenance.jpeg', '/en/maintenance/': 'vitacoat-maintenance.jpeg', '/reapplication/': 'vitacoat-reapplication.jpeg', '/en/reapplication/': 'vitacoat-reapplication.jpeg',
    '/maintenance-and-reapplication/': 'vitacoat-maintenance.jpeg', '/en/maintenance-and-reapplication/': 'vitacoat-maintenance.jpeg', '/documentation/': 'vitacoat-documentation-panel.jpg', '/en/documentation/': 'vitacoat-documentation-panel.jpg', '/technical-support/': 'technical-support-hero-01.jpeg', '/en/technical-support/': 'technical-support-hero-01.jpeg',
    '/technical-support/downloads/': 'vitacoat-download-center.jpeg', '/en/technical-support/downloads/': 'vitacoat-download-center.jpeg', '/contact/': 'vitacoat-contact-panel.jpeg', '/en/contact/': 'vitacoat-contact-panel.jpeg', '/faq/': 'frontpage-surface-environment-fit-assessment.jpeg', '/en/faq/': 'frontpage-surface-environment-fit-assessment.jpeg', '/legal/': 'vitacoat-legal-claim-boundaries.jpeg', '/en/legal/': 'vitacoat-legal-claim-boundaries.jpeg'
  };

  const newestUploadedMap = {
    'frontpage-hero.jpeg': 'frontpage-hero.jpg',
    'vitacoat-documentation-panel.jpeg': 'vitacoat-documentation-panel.jpg',
    'vitacoat-healthcare-application.jpeg': 'vitacoat-healthcare-application.jpg',
    'vitacoat-food-processing-application.jpeg': 'vitacoat-food-processing-application.jpg',
    'vitacoat-public-facilities-application.jpeg': 'vitacoat-public-facilities-application.jpg',
    'vitacoat-education-offices-application.jpeg': 'vitacoat-education-offices-application.jpg',
    'vitacoat-electronics-touchpoints-application.jpeg': 'vitacoat-electronics-touchpoints-application.jpg',
    'vitacoat-logo.png': 'vitacoat-logo.png.png'
  };

  const setLanguage = code => { try { localStorage.setItem('vitacoat-language', code); localStorage.setItem('vitacoat-language-initialized', 'true'); } catch (e) {} };
  const assetUrl = filename => `/assets/img/${filename}`;
  const fileFromSrc = src => (src || '').split('/').pop().split('?')[0].split('#')[0];
  const resolveNewest = filename => newestUploadedMap[filename] || filename;
  const dummySvgDataUri = filename => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#f3f2ef"/><rect x="35" y="35" width="1530" height="830" rx="26" fill="none" stroke="#4950bc" stroke-width="8"/><text x="800" y="420" text-anchor="middle" font-family="Arial" font-size="54" font-weight="700" fill="#171717">${String(filename||'image-placeholder.jpeg').replace(/[<>&]/g,'')}</text><text x="800" y="505" text-anchor="middle" font-family="Arial" font-size="26" fill="#4c5060">Replace this file in /assets/img/ using the exact same filename.</text></svg>`)}`;

  const makeLanguageSwitch = (placement = '') => {
    const wrap = document.createElement('div'); wrap.className = `language-switcher flag-language-switcher${placement ? ` ${placement}` : ''}`;
    [['🇳🇴', noPath, !isEn, 'no', 'Norsk'], ['🇬🇧', enPath, isEn, 'en', 'English']].forEach(([flag, href, active, code, label]) => {
      const a = document.createElement('a'); a.href = href; a.textContent = flag; a.className = `language-link flag-language-link${active ? ' active-lang' : ''}`; a.setAttribute('hreflang', code); a.setAttribute('aria-label', label); a.setAttribute('title', label); a.addEventListener('click', () => setLanguage(code)); wrap.appendChild(a);
    }); return wrap;
  };

  const isActive = (href, links) => path === href || (href !== '/' && path.startsWith(href)) || links.some(([, h]) => path === h || (h !== '/' && path.startsWith(h)));

  const injectOverrides = () => {
    const old = document.getElementById('vitacoat-global-js-overrides'); if (old) old.remove();
    const style = document.createElement('style'); style.id = 'vitacoat-global-js-overrides';
    style.textContent = `.brand{display:block!important;width:58px!important;height:58px!important;overflow:hidden!important;color:transparent!important;font-size:0!important;line-height:0!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important}.brand:before,.brand img{display:none!important}.footer-top-logo{display:block!important;position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important;font-size:0!important;line-height:0!important;color:transparent!important;overflow:hidden!important}.footer-top-logo img{display:none!important}.nav{position:relative!important;flex-wrap:nowrap!important}.nav-dropdown{position:relative!important}.dropdown-menu{display:flex!important;position:absolute!important;top:calc(100% + 10px)!important;left:0!important;z-index:500!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translateY(4px)!important;transition:opacity .18s ease,transform .18s ease,visibility 0s linear .18s!important}.nav-dropdown.is-open .dropdown-menu{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:translateY(0)!important;transition-delay:0s!important}.nav-dropdown:not(.is-open) .dropdown-menu{opacity:0!important;visibility:hidden!important;pointer-events:none!important}.language-switcher{display:flex!important;align-items:center!important;gap:8px!important}.flag-language-link{font-size:23px!important;line-height:1!important;text-decoration:none!important;opacity:.65!important}.flag-language-link.active-lang{opacity:1!important}.site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}.footer-column h4 a{color:#fff!important}.footer-column h4 a:hover{text-decoration:underline!important}img[data-vc-placeholder-name]{background:#f3f2ef!important;border-radius:18px!important}@media(max-width:1100px){.site-footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding-right:120px!important}.nav{gap:4px!important}.nav a{padding:9px 10px!important;font-size:.88rem!important}}@media(max-width:860px){.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}.brand{width:52px!important;height:52px!important}}`;
    document.head.appendChild(style);
  };

  const renderLogo = () => { document.querySelectorAll('.brand').forEach(brand => { brand.textContent = ''; brand.setAttribute('aria-label', 'VitaCoat homepage'); brand.href = routes.home; }); };
  const renderNav = () => {
    const desktop = document.querySelector('.nav');
    if (desktop) {
      desktop.innerHTML = ''; const closeTimers = new WeakMap(); const closeAll = except => desktop.querySelectorAll('.nav-dropdown.is-open').forEach(d => { if (d !== except) d.classList.remove('is-open'); });
      columns.forEach(col => {
        const dd = document.createElement('div'); dd.className = 'nav-dropdown'; const top = document.createElement('a'); top.href = col.href; top.textContent = col.title; if (isActive(col.href, col.links)) top.classList.add('active'); dd.appendChild(top);
        const menu = document.createElement('div'); menu.className = 'dropdown-menu'; col.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; if (path === href) a.classList.add('active-sub'); menu.appendChild(a); }); dd.appendChild(menu);
        const open = () => { clearTimeout(closeTimers.get(dd)); closeAll(dd); dd.classList.add('is-open'); }; const closeDelayed = () => { clearTimeout(closeTimers.get(dd)); closeTimers.set(dd, setTimeout(() => dd.classList.remove('is-open'), 1000)); };
        dd.addEventListener('pointerenter', open); dd.addEventListener('pointerleave', closeDelayed); dd.addEventListener('focusin', open); dd.addEventListener('focusout', () => setTimeout(() => { if (!dd.contains(document.activeElement)) dd.classList.remove('is-open'); }, 150)); desktop.appendChild(dd);
      });
      document.addEventListener('pointerdown', event => { if (!desktop.contains(event.target)) desktop.querySelectorAll('.nav-dropdown.is-open').forEach(d => d.classList.remove('is-open')); });
    }
    const headerInner = document.querySelector('.header-inner'), menuToggle = document.querySelector('.menu-toggle'), mobile = document.querySelector('.mobile-nav'), mobileContainer = document.querySelector('.mobile-nav .container');
    if (headerInner && !headerInner.querySelector('.header-language-switcher')) headerInner.insertBefore(makeLanguageSwitch('header-language-switcher'), menuToggle || null);
    if (menuToggle) { menuToggle.type = 'button'; menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">' + (isEn ? 'Menu' : 'Meny') + '</span>'; menuToggle.setAttribute('aria-expanded', 'false'); }
    if (mobileContainer) { mobileContainer.innerHTML = ''; columns.forEach(col => { const group = document.createElement('div'); group.className = 'mobile-nav-group'; const main = document.createElement('a'); main.href = col.href; main.textContent = col.title; main.className = 'mobile-main-link'; group.appendChild(main); const sub = document.createElement('div'); sub.className = 'mobile-subnav'; col.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; a.className = 'mobile-subnav-link'; sub.appendChild(a); }); group.appendChild(sub); mobileContainer.appendChild(group); }); mobileContainer.appendChild(makeLanguageSwitch('mobile-language-switcher')); }
    if (menuToggle && mobile) menuToggle.addEventListener('click', e => { e.preventDefault(); const open = mobile.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  };

  const renderFooter = () => { document.querySelectorAll('.site-footer .footer-grid').forEach(footer => { footer.innerHTML = ''; const logo = document.createElement('a'); logo.href = routes.home; logo.className = 'footer-top-logo'; logo.setAttribute('aria-label', 'VitaCoat homepage'); footer.appendChild(logo); columns.forEach(col => { const column = document.createElement('div'); column.className = 'footer-column'; const h = document.createElement('h4'); const head = document.createElement('a'); head.href = col.href; head.textContent = col.title; h.appendChild(head); const list = document.createElement('ul'); list.className = 'footer-links'; col.links.forEach(([label, href]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = href; a.textContent = label; li.appendChild(a); list.appendChild(li); }); column.appendChild(h); column.appendChild(list); footer.appendChild(column); }); const box = document.createElement('div'); box.className = 'footer-language'; box.appendChild(makeLanguageSwitch('footer-language-switcher')); footer.appendChild(box); }); };
  const applyImagePlaceholder = (img, filename) => { if (!filename || /logo|favicon/i.test(filename)) return; const resolved = resolveNewest(filename); img.dataset.vcPlaceholderName = resolved; img.title = resolved; img.src = assetUrl(resolved); img.onerror = function () { const expected = this.dataset.vcPlaceholderName || fileFromSrc(this.src) || 'image-placeholder.jpeg'; this.onerror = null; this.src = dummySvgDataUri(expected); }; };
  const normalizeImages = () => { const hero = document.querySelector('.hero-media img'); if (hero && pageHeroMap[path]) applyImagePlaceholder(hero, pageHeroMap[path]); document.querySelectorAll('main img[src^="/assets/img/"]').forEach(img => { if (img === hero && pageHeroMap[path]) return; const originalFile = fileFromSrc(img.getAttribute('src')); const mapped = resolveNewest(originalFile.replace(/\.svg$/i, '.jpeg')); if (mapped && !/logo|favicon/i.test(mapped)) applyImagePlaceholder(img, mapped); }); };
  const normalizeContactLinks = () => { document.querySelectorAll('a[href^="mailto:"]').forEach(a => { const isContactPage = path.endsWith('/contact/') || path.endsWith('/en/contact/'); if (isContactPage && a.classList.contains('btn')) { a.remove(); return; } a.href = `${routes.contact}?topic=${encodeURIComponent('Technical review')}`; if (/@vitacoat\.no/i.test(a.textContent || '')) a.textContent = isEn ? 'Contact VitaCoat' : 'Kontakt VitaCoat'; }); document.querySelectorAll('a.btn').forEach(a => { if (/@vitacoat\.no/i.test(a.textContent || '')) { a.textContent = isEn ? 'Contact VitaCoat' : 'Kontakt VitaCoat'; a.href = `${routes.contact}?topic=${encodeURIComponent('Technical review')}`; } }); };
  const preselectContactTopic = () => { const topic = new URLSearchParams(window.location.search).get('topic'); if (!topic) return; document.querySelectorAll('form').forEach(form => { let hidden = form.querySelector('input[name="inquiry_type"]'); if (!hidden) { hidden = document.createElement('input'); hidden.type = 'hidden'; hidden.name = 'inquiry_type'; form.appendChild(hidden); } hidden.value = topic; }); };
  const setupBackToTop = () => { if (document.querySelector('.mobile-top-button')) return; const top = document.createElement('button'); top.type = 'button'; top.className = 'mobile-top-button'; top.setAttribute('aria-label', isEn ? 'Back to the top of the page' : 'Til toppen av siden'); top.innerHTML = isEn ? '<span aria-hidden="true">↑</span><span>Back to top</span>' : '<span aria-hidden="true">↑</span><span>Til toppen</span>'; document.body.appendChild(top); top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); };
  injectOverrides(); renderLogo(); renderNav(); renderFooter(); normalizeImages(); normalizeContactLinks(); preselectContactTopic(); setupBackToTop();
});
