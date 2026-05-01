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
    style.textContent = `.brand{display:block!important;width:58px!important;height:58px!important;overflow:hidden!important;color:transparent!important;font-size:0!important;line-height:0!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important}.brand:before,.brand img{display:none!important}.footer-top-logo{display:block!important;position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important;font-size:0!important;line-height:0!important;color:transparent!important;overflow:hidden!important}.footer-top-logo img{display:none!important}.nav{position:relative!important;flex-wrap:nowrap!important}.nav-dropdown{position:relative!important}.dropdown-menu{display:flex!important;position:absolute!important;top:calc(100% + 10px)!important;left:0!important;z-index:500!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translateY(4px)!important;transition:opacity .18s ease,transform .18s ease,visibility 0s linear .18s!important}.nav-dropdown.is-open .dropdown-menu{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:translateY(0)!important;transition-delay:0s!important}.nav-dropdown:not(.is-open) .dropdown-menu{opacity:0!important;visibility:hidden!important;pointer-events:none!important}.language-switcher{display:flex!important;align-items:center!important;gap:8px!important}.flag-language-link{font-size:23px!important;line-height:1!important;text-decoration:none!important;opacity:.65!important}.flag-language-link.active-lang{opacity:1!important}.site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}.footer-column h4 a{color:#fff!important}.footer-column h4 a:hover{text-decoration:underline!important}img[data-vc-placeholder-name]{background:#f3f2ef!important;border-radius:18px!important}.vc-log-chart{margin-top:26px;background:#fff;border:1px solid rgba(17,24,39,.08);border-radius:18px;padding:18px 18px 14px;box-shadow:0 10px 30px rgba(15,23,42,.06);overflow-x:auto}.vc-log-chart-title{font-size:13px;font-weight:700;color:#5b5f6b;margin-bottom:6px}.vc-chart-row{display:grid;grid-template-columns:190px minmax(580px,1fr);align-items:center;gap:12px;margin:0 0 16px}.vc-y-label{font-size:13px;font-weight:700;color:#5a5d65;text-align:right;white-space:nowrap}.vc-track{height:60px;position:relative;border-radius:4px;background:repeating-linear-gradient(to right, transparent 0, transparent calc(4% - 1px), rgba(70,86,120,.16) calc(4% - 1px), rgba(70,86,120,.16) 4%)}.vc-bar{position:absolute;left:0;top:7px;height:46px;width:var(--w);border-radius:4px;background:var(--c);display:flex;align-items:center;justify-content:flex-end;padding-right:9px;color:#fff;font-size:12px;font-weight:800;box-sizing:border-box;animation:vcBarGrow .85s ease-out both;transform-origin:left center}.vc-bar.light{color:#132238}.vc-axis{display:grid;grid-template-columns:190px minmax(580px,1fr);gap:12px;margin-top:-4px}.vc-axis-ticks{display:flex;justify-content:space-between;color:#676b73;font-size:12px;font-weight:600;padding-top:2px}.vc-axis-title{grid-column:2;text-align:center;font-size:12px;font-weight:800;color:#686b73;margin-top:4px}.vc-chart-copy{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:28px;align-items:start}.vc-chart-note{margin-top:26px}@keyframes vcBarGrow{from{transform:scaleX(0);opacity:.45}to{transform:scaleX(1);opacity:1}}@media(max-width:1100px){.site-footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding-right:120px!important}.nav{gap:4px!important}.nav a{padding:9px 10px!important;font-size:.88rem!important}.vc-chart-copy{grid-template-columns:1fr}.vc-chart-row,.vc-axis{grid-template-columns:170px minmax(520px,1fr)}}@media(max-width:860px){.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}.brand{width:52px!important;height:52px!important}.vc-log-chart{padding:12px}.vc-y-label{text-align:left;font-size:12px}.vc-chart-row,.vc-axis{grid-template-columns:140px minmax(480px,1fr)}}`;
    document.head.appendChild(style);
  };

  const chartLabels = ['EN 13727 — Bacteria', 'EN 13624 — Candida albicans', 'EN 14476 — Enveloped Virus', 'SARS-CoV-2 (1 min)'];
  const chartData = [
    { value: '5', width: '100%', color: '#063f86' },
    { value: '4.2', width: '84%', color: '#0b55bf' },
    { value: '4', width: '80%', color: '#0873f9' },
    { value: '2.3', width: '46%', color: '#3c8cf4', light: true }
  ];
  const chartTicks = ['0','0.2','0.4','0.6','0.8','1','1.2','1.4','1.6','1.8','2','2.2','2.4','2.6','2.8','3','3.2','3.4','3.6','3.8','4','4.2','4.4','4.6','4.8','5'];

  const makeLogChart = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'vc-log-chart';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', 'Horizontal bar chart showing log reduction values: EN 13727 bacteria 5, EN 13624 Candida albicans 4.2, EN 14476 enveloped virus 4, SARS-CoV-2 one minute 2.3.');
    const title = document.createElement('div');
    title.className = 'vc-log-chart-title';
    title.textContent = 'Test Standard';
    wrapper.appendChild(title);
    chartLabels.forEach((label, idx) => {
      const row = document.createElement('div'); row.className = 'vc-chart-row';
      const y = document.createElement('div'); y.className = 'vc-y-label'; y.textContent = label;
      const track = document.createElement('div'); track.className = 'vc-track';
      const bar = document.createElement('div'); bar.className = `vc-bar${chartData[idx].light ? ' light' : ''}`; bar.style.setProperty('--w', chartData[idx].width); bar.style.setProperty('--c', chartData[idx].color); bar.textContent = chartData[idx].value;
      track.appendChild(bar); row.appendChild(y); row.appendChild(track); wrapper.appendChild(row);
    });
    const axis = document.createElement('div'); axis.className = 'vc-axis';
    const blank = document.createElement('div');
    const ticks = document.createElement('div'); ticks.className = 'vc-axis-ticks'; chartTicks.forEach(t => { const span = document.createElement('span'); span.textContent = t; ticks.appendChild(span); });
    const axisTitle = document.createElement('div'); axisTitle.className = 'vc-axis-title'; axisTitle.textContent = 'Log Reduction';
    axis.appendChild(blank); axis.appendChild(ticks); axis.appendChild(axisTitle); wrapper.appendChild(axis);
    return wrapper;
  };

  const makePerformanceSection = () => {
    const section = document.createElement('section');
    section.className = 'section vc-performance-chart-section';
    const heading = isEn ? 'EN-Backed Performance Data' : 'EN-støttede ytelsesdata';
    const eyebrow = isEn ? 'Standards & Efficacy' : 'Standarder og effekt';
    const intro = isEn ? "VitaCoat's antimicrobial claims are supported by testing against established European Norm (EN) standards for surface-disinfectant efficacy. The chart recreates the Gamma benchmark view using the same organism categories and log-reduction scale." : 'VitaCoat sine antimikrobielle påstander støttes av testing mot etablerte European Norm-standarder for overflateeffekt. Grafen gjenskaper Gamma-visningen med samme organismekategorier og log-reduksjonsskala.';
    const readTitle = isEn ? 'Reading the Data' : 'Slik leses dataene';
    const read1 = isEn ? 'A 5.0 log reduction represents a 99.999% reduction in viable bacterial load on the treated surface. The EN 13727 bactericidal result therefore sits at the top of the displayed evaluation scale.' : 'En 5,0 log-reduksjon tilsvarer 99,999 % reduksjon i levedyktig bakteriebelastning på behandlet overflate. EN 13727-resultatet ligger derfor øverst i den viste vurderingsskalaen.';
    const read2 = isEn ? 'The EN 14476 enveloped-virus result is relevant to lipid-enveloped viruses. The SARS-CoV-2 one-minute result is shown separately as a directly communicable reference point, not as a universal virucidal claim.' : 'EN 14476-resultatet for kappekledde virus er relevant for lipidmembranbaserte virus. SARS-CoV-2-resultatet ved ett minutt vises separat som et direkte kommuniserbart referansepunkt, ikke som et universelt virucidalt claim.';
    const caution = isEn ? 'Efficacy data reflects controlled testing conditions. Real-world performance depends on substrate, application quality, cleaning regime, abrasion and use environment. Non-enveloped virus efficacy is not claimed.' : 'Effektdata reflekterer kontrollerte testbetingelser. Reell ytelse avhenger av substrat, applikasjonskvalitet, rengjøringsregime, abrasjon og bruksmiljø. Effekt mot ikke-kappekledde virus er ikke påstått.';
    section.innerHTML = `<div class="container panel"><div class="eyebrow">${eyebrow}</div><h2 align="center">${heading}</h2><p align="center">${intro}</p><div class="vc-chart-copy"><div class="vc-chart-slot"></div><article class="card vc-chart-note"><h3>${readTitle}</h3><p>${read1}</p><p>${read2}</p><div class="callout">${caution}</div></article></div></div>`;
    section.querySelector('.vc-chart-slot').appendChild(makeLogChart());
    return section;
  };

  const renderLogReductionChart = () => {
    if (!['/', '/en/', '/proof/testing-and-standards/', '/en/proof/testing-and-standards/'].includes(path)) return;
    if (document.querySelector('.vc-performance-chart-section')) return;
    const section = makePerformanceSection();
    const oldChart = document.querySelector('.bar-group');
    if (oldChart && oldChart.closest('.section')) {
      oldChart.closest('.section').replaceWith(section);
      return;
    }
    const main = document.querySelector('main');
    if (!main) return;
    const hero = main.querySelector('.hero');
    const after = hero ? hero.nextElementSibling : null;
    if (after) after.insertAdjacentElement('afterend', section); else main.appendChild(section);
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
  injectOverrides(); renderLogo(); renderNav(); renderFooter(); normalizeImages(); normalizeContactLinks(); preselectContactTopic(); renderLogReductionChart(); setupBackToTop();
});
