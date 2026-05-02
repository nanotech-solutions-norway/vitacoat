document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEn = path.startsWith('/en/');
  const local = p => isEn ? (p === '/' ? '/en/' : `/en${p}`) : p;
  const noPath = path.startsWith('/en/') ? (path.replace(/^\/en/, '') || '/') : path;
  const enPath = path.startsWith('/en/') ? path : (path === '/' ? '/en/' : `/en${path}`);
  document.documentElement.lang = isEn ? 'en' : 'nb-NO';

  const routes = {
    home: local('/'), applications: local('/applications/'), documentation: local('/documentation/'), support: local('/technical-support/'), downloads: local('/technical-support/downloads/'), contact: local('/contact/'),
    healthcare: local('/applications/healthcare/'), food: local('/applications/food-processing/'), publicFacilities: local('/applications/public-facilities/'), education: local('/applications/education-and-offices/'), electronics: local('/applications/electronics-and-touchpoints/'), process: local('/application-process/'),
    how: local('/how-it-works/'), continuous: local('/benefits/continuous-protection/'), cleaning: local('/benefits/easier-cleaning/'), compatibility: local('/benefits/surface-compatibility/'), testing: local('/proof/testing-and-standards/'), durability: local('/proof/durability/'), pathogens: local('/proof/pathogen-spectrum/'), safety: local('/proof/safety-and-environment/'),
    maintenance: local('/maintenance/'), reapplication: local('/reapplication/'), legal: local('/legal/'), faq: local('/faq/')
  };

  const columns = isEn ? [
    { title: 'Applications', href: routes.applications, links: [['Healthcare', routes.healthcare], ['Food Processing', routes.food], ['Public Facilities', routes.publicFacilities], ['Education & Offices', routes.education], ['Electronics & Touchpoints', routes.electronics], ['Application Process', routes.process]] },
    { title: 'Technical', href: routes.documentation, links: [['How it Works', routes.how], ['Continuous Protection', routes.continuous], ['Easier Cleaning', routes.cleaning], ['Surface Compatibility', routes.compatibility], ['Testing & Standards', routes.testing], ['Durability', routes.durability], ['Pathogen Spectrum', routes.pathogens]] },
    { title: 'Support', href: routes.support, links: [['Download Center', routes.downloads], ['Maintenance', routes.maintenance], ['Reapplication', routes.reapplication]] },
    { title: 'Contact', href: routes.contact, links: [['Legal Information', routes.legal], ['Safety & Environment', routes.safety], ['FAQ', routes.faq]] }
  ] : [
    { title: 'Bruksområder', href: routes.applications, links: [['Helse', routes.healthcare], ['Næringsmiddelindustri', routes.food], ['Offentlige miljøer', routes.publicFacilities], ['Skole og kontor', routes.education], ['Elektronikk og kontaktpunkter', routes.electronics], ['Applikasjonsprosess', routes.process]] },
    { title: 'Teknisk', href: routes.documentation, links: [['Hvordan det fungerer', routes.how], ['Vedvarende beskyttelse', routes.continuous], ['Enklere rengjøring', routes.cleaning], ['Overflatekompatibilitet', routes.compatibility], ['Testing og standarder', routes.testing], ['Holdbarhet', routes.durability], ['Patogenspekter', routes.pathogens]] },
    { title: 'Støtte', href: routes.support, links: [['Nedlastingssenter', routes.downloads], ['Vedlikehold', routes.maintenance], ['Reapplikasjon', routes.reapplication]] },
    { title: 'Kontakt', href: routes.contact, links: [['Juridisk informasjon', routes.legal], ['Sikkerhet og miljø', routes.safety], ['FAQ', routes.faq]] }
  ];

  const imageMap = {
    'vitacoat-antimicrobial-hero.svg': 'frontpage-hero.jpg', 'frontpage-hero.jpeg': 'frontpage-hero.jpg',
    'vitacoat-documentation-panel.svg': 'vitacoat-documentation-panel.jpg', 'vitacoat-documentation-panel.jpeg': 'vitacoat-documentation-panel.jpg',
    'vitacoat-healthcare-application.svg': 'vitacoat-healthcare-application.jpg', 'vitacoat-healthcare-application.jpeg': 'vitacoat-healthcare-application.jpg',
    'vitacoat-food-processing-application.svg': 'vitacoat-food-processing-application.jpg', 'vitacoat-food-processing-application.jpeg': 'vitacoat-food-processing-application.jpg',
    'vitacoat-public-facilities-application.svg': 'vitacoat-public-facilities-application.jpg', 'vitacoat-public-facilities-application.jpeg': 'vitacoat-public-facilities-application.jpg',
    'vitacoat-education-offices-application.svg': 'vitacoat-education-offices-application.jpg', 'vitacoat-education-offices-application.jpeg': 'vitacoat-education-offices-application.jpg',
    'vitacoat-electronics-touchpoints-application.svg': 'vitacoat-electronics-touchpoints-application.jpg', 'vitacoat-electronics-touchpoints-application.jpeg': 'vitacoat-electronics-touchpoints-application.jpg'
  };
  const heroMap = {
    '/': 'frontpage-hero.jpg', '/en/': 'frontpage-hero.jpg',
    '/applications/healthcare/': 'vitacoat-healthcare-application.jpg', '/en/applications/healthcare/': 'vitacoat-healthcare-application.jpg',
    '/applications/food-processing/': 'vitacoat-food-processing-application.jpg', '/en/applications/food-processing/': 'vitacoat-food-processing-application.jpg',
    '/applications/public-facilities/': 'vitacoat-public-facilities-application.jpg', '/en/applications/public-facilities/': 'vitacoat-public-facilities-application.jpg',
    '/applications/education-and-offices/': 'vitacoat-education-offices-application.jpg', '/en/applications/education-and-offices/': 'vitacoat-education-offices-application.jpg',
    '/applications/electronics-and-touchpoints/': 'vitacoat-electronics-touchpoints-application.jpg', '/en/applications/electronics-and-touchpoints/': 'vitacoat-electronics-touchpoints-application.jpg',
    '/documentation/': 'vitacoat-documentation-panel.jpg', '/en/documentation/': 'vitacoat-documentation-panel.jpg'
  };

  const style = document.createElement('style');
  style.id = 'vitacoat-global-js-overrides';
  style.textContent = `
    .brand{display:block!important;width:58px!important;height:58px!important;overflow:hidden!important;color:transparent!important;font-size:0!important;line-height:0!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important}
    .nav{position:relative!important;flex-wrap:nowrap!important}.nav-dropdown{position:relative!important}.dropdown-menu{display:flex!important;position:absolute!important;top:calc(100% + 10px)!important;left:0!important;z-index:500!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translateY(4px)!important;transition:opacity .18s ease,transform .18s ease,visibility 0s linear .18s!important}.nav-dropdown.is-open .dropdown-menu{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:translateY(0)!important}
    .language-switcher{display:flex!important;align-items:center!important;gap:8px!important}.flag-language-link{font-size:23px!important;line-height:1!important;text-decoration:none!important;opacity:.65!important}.flag-language-link.active-lang{opacity:1!important}
    .site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}.footer-top-logo{display:block!important;position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;background:url('/assets/img/vitacoat-logo.png.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.png') center/contain no-repeat,url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important;font-size:0!important}.footer-column h4 a{color:#fff!important}
    .vc-performance-chart-section .panel{overflow:hidden}.vc-chart-explainer{max-width:920px;margin:18px auto 0;text-align:center;color:#4b5563}.vc-log-chart{margin-top:26px;background:#fff;border:1px solid rgba(17,24,39,.08);border-radius:18px;padding:18px 18px 14px;box-shadow:0 10px 30px rgba(15,23,42,.06);overflow-x:auto}.vc-log-chart-inner{min-width:1060px}.vc-log-chart-title{font-size:13px;font-weight:700;color:#5b5f6b;margin-bottom:6px}.vc-chart-row{display:grid;grid-template-columns:245px minmax(760px,1fr);align-items:center;gap:12px;margin:0 0 16px}.vc-y-label{font-size:13px;font-weight:700;color:#5a5d65;text-align:right;white-space:nowrap;overflow:visible}.vc-track{height:60px;position:relative;border-radius:4px;background:repeating-linear-gradient(to right,transparent 0,transparent calc(4% - 1px),rgba(70,86,120,.16) calc(4% - 1px),rgba(70,86,120,.16) 4%)}.vc-bar{position:absolute;left:0;top:7px;height:46px;border-radius:4px;background:var(--c);display:flex;align-items:center;justify-content:flex-end;padding-right:9px;color:#fff;font-size:12px;font-weight:800;box-sizing:border-box;width:0;transition:width 1.25s cubic-bezier(.16,1,.3,1),opacity .35s ease;opacity:.35}.vc-bar.is-animated{width:var(--w);opacity:1}.vc-axis{display:grid;grid-template-columns:245px minmax(760px,1fr);gap:12px;margin-top:-4px}.vc-axis-ticks{display:flex;justify-content:space-between;color:#676b73;font-size:12px;font-weight:600;padding-top:2px}.vc-axis-title{grid-column:2;text-align:center;font-size:12px;font-weight:800;color:#686b73;margin-top:4px}.vc-chart-copy{display:grid;grid-template-columns:1fr;gap:18px;align-items:start}
    @media(max-width:1100px){.site-footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding-right:120px!important}.nav a{padding:9px 10px!important;font-size:.88rem!important}}
    @media(max-width:860px){
      body.mobile-menu-open{overflow:hidden!important}.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}.brand{width:52px!important;height:52px!important}
      .mobile-nav{display:none!important;position:absolute!important;left:0!important;right:0!important;top:100%!important;z-index:999!important;background:#fff!important;border-top:1px solid rgba(17,24,39,.08)!important;box-shadow:0 18px 40px rgba(15,23,42,.12)!important;max-height:calc(100vh - 96px)!important;overflow-y:auto!important}.mobile-nav.open{display:block!important}.mobile-nav .container{display:flex!important;flex-direction:column!important;gap:0!important;padding:12px 24px 22px!important}.mobile-nav-group{display:block!important;width:100%!important;padding:12px 0!important;border-bottom:1px solid rgba(17,24,39,.08)!important}.mobile-main-link{display:block!important;width:100%!important;margin:0 0 8px!important;padding:0!important;font-size:18px!important;line-height:1.25!important;font-weight:800!important;color:#171717!important;text-decoration:none!important}.mobile-subnav-link{display:block!important;width:100%!important;margin:0!important;padding:7px 0 7px 16px!important;font-size:15px!important;line-height:1.35!important;font-weight:600!important;color:#5b6270!important;text-decoration:none!important}.mobile-subnav-link:hover{color:#4950bc!important}.mobile-language-switcher{justify-content:center!important;margin-top:14px!important;padding-top:14px!important}.menu-toggle[aria-expanded='true']{background:#f4f4ff!important}
      .vc-log-chart{padding:12px!important;overflow-x:hidden!important;max-width:100%!important}.vc-log-chart-inner{min-width:0!important;width:100%!important}.vc-log-chart-title{margin-bottom:14px!important}.vc-chart-row{display:block!important;margin:0 0 14px!important}.vc-y-label{display:none!important}.vc-track{height:68px!important;width:100%!important;min-width:0!important;border-radius:10px!important;background:rgba(70,86,120,.08)!important}.vc-bar{top:6px!important;height:56px!important;min-width:min(76%,260px)!important;max-width:100%!important;justify-content:flex-start!important;align-items:center!important;padding:8px 42px 8px 12px!important;text-align:left!important;font-size:0!important;line-height:1.12!important;white-space:normal!important;overflow:hidden!important}.vc-bar::before{content:attr(data-label);display:block;color:#fff;font-size:12px;font-weight:800;line-height:1.14;max-width:100%;white-space:normal}.vc-bar::after{content:attr(data-value);position:absolute;right:9px;top:50%;transform:translateY(-50%);color:#fff;font-size:12px;font-weight:900}.vc-axis{display:none!important}.vc-chart-explainer{font-size:15px!important;line-height:1.55!important}}
  `;
  document.head.appendChild(style);

  const setLanguage = code => { try { localStorage.setItem('vitacoat-language', code); localStorage.setItem('vitacoat-language-initialized', 'true'); } catch (e) {} };
  const makeLanguageSwitch = cls => {
    const wrap = document.createElement('div'); wrap.className = `language-switcher flag-language-switcher ${cls || ''}`;
    [['🇳🇴', noPath, !isEn, 'no', 'Norsk'], ['🇬🇧', enPath, isEn, 'en', 'English']].forEach(([flag, href, active, code, label]) => {
      const a = document.createElement('a'); a.href = href; a.textContent = flag; a.className = `language-link flag-language-link${active ? ' active-lang' : ''}`; a.setAttribute('hreflang', code); a.setAttribute('aria-label', label); a.title = label; a.addEventListener('click', () => setLanguage(code)); wrap.appendChild(a);
    });
    return wrap;
  };

  const active = (href, links) => path === href || (href !== '/' && path.startsWith(href)) || links.some(([, h]) => path === h || (h !== '/' && path.startsWith(h)));
  document.querySelectorAll('.brand').forEach(b => { b.textContent = ''; b.href = routes.home; b.setAttribute('aria-label', 'VitaCoat homepage'); });

  const nav = document.querySelector('.nav');
  if (nav) {
    nav.innerHTML = '';
    const closeTimers = new WeakMap();
    columns.forEach(col => {
      const dd = document.createElement('div'); dd.className = 'nav-dropdown';
      const top = document.createElement('a'); top.href = col.href; top.textContent = col.title; if (active(col.href, col.links)) top.classList.add('active'); dd.appendChild(top);
      const menu = document.createElement('div'); menu.className = 'dropdown-menu';
      col.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; menu.appendChild(a); });
      dd.appendChild(menu);
      const open = () => { clearTimeout(closeTimers.get(dd)); nav.querySelectorAll('.nav-dropdown.is-open').forEach(x => { if (x !== dd) x.classList.remove('is-open'); }); dd.classList.add('is-open'); };
      const close = () => { clearTimeout(closeTimers.get(dd)); closeTimers.set(dd, setTimeout(() => dd.classList.remove('is-open'), 1000)); };
      dd.addEventListener('pointerenter', open); dd.addEventListener('pointerleave', close);
      nav.appendChild(dd);
    });
  }

  const headerInner = document.querySelector('.header-inner');
  const menuToggle = document.querySelector('.menu-toggle');
  if (headerInner && !headerInner.querySelector('.header-language-switcher')) headerInner.insertBefore(makeLanguageSwitch('header-language-switcher'), menuToggle || null);
  const mobile = document.querySelector('.mobile-nav');
  const mobileContainer = document.querySelector('.mobile-nav .container');
  if (mobileContainer) {
    mobileContainer.innerHTML = '';
    columns.forEach(col => {
      const group = document.createElement('div'); group.className = 'mobile-nav-group';
      const main = document.createElement('a'); main.href = col.href; main.textContent = col.title; main.className = 'mobile-main-link'; group.appendChild(main);
      col.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; a.className = 'mobile-subnav-link'; group.appendChild(a); });
      mobileContainer.appendChild(group);
    });
    mobileContainer.appendChild(makeLanguageSwitch('mobile-language-switcher'));
  }
  if (menuToggle && mobile) {
    menuToggle.type = 'button';
    menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">Menu</span>';
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.addEventListener('click', e => { e.preventDefault(); const open = mobile.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false'); document.body.classList.toggle('mobile-menu-open', open); });
    mobile.addEventListener('click', e => { if (e.target && e.target.tagName === 'A') { mobile.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); document.body.classList.remove('mobile-menu-open'); } });
  }

  document.querySelectorAll('.site-footer .footer-grid').forEach(f => {
    f.innerHTML = '';
    const logo = document.createElement('a'); logo.href = routes.home; logo.className = 'footer-top-logo'; f.appendChild(logo);
    columns.forEach(col => {
      const c = document.createElement('div'); c.className = 'footer-column';
      const h = document.createElement('h4'); const a = document.createElement('a'); a.href = col.href; a.textContent = col.title; h.appendChild(a);
      const ul = document.createElement('ul'); ul.className = 'footer-links';
      col.links.forEach(([label, href]) => { const li = document.createElement('li'); const l = document.createElement('a'); l.href = href; l.textContent = label; li.appendChild(l); ul.appendChild(li); });
      c.appendChild(h); c.appendChild(ul); f.appendChild(c);
    });
    const box = document.createElement('div'); box.className = 'footer-language'; box.appendChild(makeLanguageSwitch('footer-language-switcher')); f.appendChild(box);
  });

  const fileFromSrc = src => (src || '').split('/').pop().split('?')[0].split('#')[0];
  const asset = name => `/assets/img/${name}`;
  const hero = document.querySelector('.hero-media img');
  if (hero && heroMap[path]) hero.src = asset(heroMap[path]);
  document.querySelectorAll('main img[src^="/assets/img/"]').forEach(img => { const next = imageMap[fileFromSrc(img.getAttribute('src'))]; if (next) img.src = asset(next); });
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = `${routes.contact}?topic=${encodeURIComponent('Technical review')}`; if (/@vitacoat\.no/i.test(a.textContent || '')) a.textContent = isEn ? 'Contact VitaCoat' : 'Kontakt VitaCoat'; });

  const labels = ['EN 13727 — Bactericidal assessment', 'EN 13624 — Yeasticidal / Candida', 'EN 14476 — Enveloped viruses', 'SARS-CoV-2 / enveloped-virus proxy'];
  const data = [{ value: '5', width: '100%', color: '#063f86' }, { value: '4.2', width: '84%', color: '#0b55bf' }, { value: '4', width: '80%', color: '#0873f9' }, { value: '2.3', width: '46%', color: '#3c8cf4' }];
  const ticks = ['0', '0.2', '0.4', '0.6', '0.8', '1', '1.2', '1.4', '1.6', '1.8', '2', '2.2', '2.4', '2.6', '2.8', '3', '3.2', '3.4', '3.6', '3.8', '4', '4.2', '4.4', '4.6', '4.8', '5'];
  const makeChart = () => {
    const box = document.createElement('div'); box.className = 'vc-log-chart'; box.setAttribute('role', 'img'); box.setAttribute('aria-label', 'Log reduction bar chart for VitaCoat test standards.');
    const inner = document.createElement('div'); inner.className = 'vc-log-chart-inner';
    const title = document.createElement('div'); title.className = 'vc-log-chart-title'; title.textContent = 'Test Standard'; inner.appendChild(title);
    labels.forEach((label, i) => {
      const row = document.createElement('div'); row.className = 'vc-chart-row';
      const y = document.createElement('div'); y.className = 'vc-y-label'; y.textContent = label;
      const track = document.createElement('div'); track.className = 'vc-track';
      const bar = document.createElement('div'); bar.className = 'vc-bar'; bar.style.setProperty('--w', data[i].width); bar.style.setProperty('--c', data[i].color); bar.dataset.label = label; bar.dataset.value = data[i].value; bar.textContent = data[i].value;
      track.appendChild(bar); row.appendChild(y); row.appendChild(track); inner.appendChild(row);
    });
    const axis = document.createElement('div'); axis.className = 'vc-axis'; axis.appendChild(document.createElement('div'));
    const tickBox = document.createElement('div'); tickBox.className = 'vc-axis-ticks'; ticks.forEach(t => { const s = document.createElement('span'); s.textContent = t; tickBox.appendChild(s); });
    const axisTitle = document.createElement('div'); axisTitle.className = 'vc-axis-title'; axisTitle.textContent = 'Log Reduction'; axis.appendChild(tickBox); axis.appendChild(axisTitle); inner.appendChild(axis); box.appendChild(inner);
    requestAnimationFrame(() => setTimeout(() => box.querySelectorAll('.vc-bar').forEach(b => b.classList.add('is-animated')), 120));
    return box;
  };
  const addChart = () => {
    if (!['/', '/en/', '/proof/testing-and-standards/', '/en/proof/testing-and-standards/'].includes(path)) return;
    const heading = isEn ? 'EN-Backed Performance Data' : 'EN-støttede ytelsesdata';
    const eyebrow = isEn ? 'Standards & Efficacy' : 'Standarder og effekt';
    const intro = isEn ? 'The chart shows measured logarithmic reduction across relevant antimicrobial test categories. Higher log-reduction values indicate stronger microbial reduction: 5 log corresponds to 99.999% reduction, 4 log to 99.99%, and 2.3 log to approximately 99.5% under the stated test conditions.' : 'Grafen viser målt logaritmisk reduksjon på tvers av relevante antimikrobielle testkategorier. Høyere log-reduksjon betyr sterkere mikrobiell reduksjon: 5 log tilsvarer 99,999 %, 4 log tilsvarer 99,99 %, og 2,3 log tilsvarer omtrent 99,5 % under de angitte testbetingelsene.';
    const caution = isEn ? 'Values must be assessed with the underlying method, contact time, substrate, application quality and laboratory conditions. The graph is a technical evidence summary, not a universal sterilization or broad virucidal claim.' : 'Verdiene må vurderes sammen med metode, kontakttid, substrat, applikasjonskvalitet og laboratoriebetingelser. Grafen er et teknisk evidenssammendrag, ikke et universelt steriliserings- eller bredt virucidalt claim.';
    const section = document.createElement('section'); section.className = 'section vc-performance-chart-section'; section.innerHTML = `<div class="container panel"><div class="eyebrow">${eyebrow}</div><h2 align="center">${heading}</h2><p align="center" class="vc-chart-explainer">${intro}</p><div class="vc-chart-copy"><div class="vc-chart-slot"></div><div class="callout">${caution}</div></div></div>`;
    section.querySelector('.vc-chart-slot').appendChild(makeChart());
    const old = document.querySelector('.bar-group'); if (old && old.closest('.section')) { old.closest('.section').replaceWith(section); return; }
    if (document.querySelector('.vc-performance-chart-section')) return;
    const main = document.querySelector('main'); const heroSection = main && main.querySelector('.hero'); const after = heroSection ? heroSection.nextElementSibling : null; if (after) after.insertAdjacentElement('afterend', section); else if (main) main.appendChild(section);
  };
  addChart();
});
