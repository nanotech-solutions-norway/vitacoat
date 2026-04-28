document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEn = path.startsWith('/en/');
  document.documentElement.lang = isEn ? 'en' : 'nb-NO';

  const toEn = p => (p === '/' ? '/en/' : `/en${p}`);
  const toNo = p => (p.startsWith('/en/') ? (p.replace(/^\/en/, '') || '/') : p);
  const local = p => (isEn ? toEn(p) : p);

  try {
    const initialized = localStorage.getItem('vitacoat-language-initialized') === 'true';
    if (!initialized) {
      const langs = (navigator.languages || [navigator.language || '']).map(v => String(v).toLowerCase());
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
      const wantsNo = langs.some(v => v.startsWith('no') || v.startsWith('nb') || v.startsWith('nn')) || tz.includes('oslo');
      localStorage.setItem('vitacoat-language', wantsNo ? 'no' : 'en');
      localStorage.setItem('vitacoat-language-initialized', 'true');
      if (!wantsNo && path === '/') {
        window.location.replace('/en/');
        return;
      }
    }
  } catch (e) {}

  const routes = {
    home: local('/'),
    applications: local('/applications/'),
    documentation: local('/documentation/'),
    technicalSupport: local('/technical-support/'),
    downloads: local('/technical-support/downloads/'),
    contact: local('/contact/'),
    how: local('/how-it-works/'),
    healthcare: local('/applications/healthcare/'),
    food: local('/applications/food-processing/'),
    publicFacilities: local('/applications/public-facilities/'),
    education: local('/applications/education-and-offices/'),
    electronics: local('/applications/electronics-and-touchpoints/'),
    continuous: local('/benefits/continuous-protection/'),
    cleaning: local('/benefits/easier-cleaning/'),
    compatibility: local('/benefits/surface-compatibility/'),
    testing: local('/proof/testing-and-standards/'),
    durability: local('/proof/durability/'),
    safety: local('/proof/safety-and-environment/'),
    pathogens: local('/proof/pathogen-spectrum/'),
    process: local('/application-process/'),
    maintenance: local('/maintenance/'),
    reapplication: local('/reapplication/'),
    faq: local('/faq/'),
    legal: local('/legal/')
  };

  const setLanguage = code => {
    try {
      localStorage.setItem('vitacoat-language', code);
      localStorage.setItem('vitacoat-language-initialized', 'true');
    } catch (e) {}
  };

  const makeLanguageSwitch = (placement = '') => {
    const wrap = document.createElement('div');
    wrap.className = `language-switcher flag-language-switcher${placement ? ` ${placement}` : ''}`;
    [
      { flag: '🇳🇴', href: toNo(path), active: !isEn, code: 'no', label: 'Norsk' },
      { flag: '🇬🇧', href: isEn ? path : toEn(path), active: isEn, code: 'en', label: 'English' }
    ].forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.flag;
      a.className = `language-link flag-language-link${item.active ? ' active-lang' : ''}`;
      a.setAttribute('hreflang', item.code);
      a.setAttribute('aria-label', item.label);
      a.setAttribute('title', item.label);
      a.addEventListener('click', () => setLanguage(item.code));
      wrap.appendChild(a);
    });
    return wrap;
  };

  const footerColumns = isEn ? [
    { title: 'Applications', href: routes.applications, links: [
      ['Applications', routes.applications], ['Healthcare', routes.healthcare], ['Food Processing', routes.food], ['Public Facilities', routes.publicFacilities], ['Education & Offices', routes.education], ['Electronics & Touchpoints', routes.electronics], ['Application Process', routes.process]
    ]},
    { title: 'Technical', href: routes.documentation, links: [
      ['Technical', routes.documentation], ['How it Works', routes.how], ['Continuous Protection', routes.continuous], ['Easier Cleaning', routes.cleaning], ['Surface Compatibility', routes.compatibility], ['Testing & Standards', routes.testing], ['Durability', routes.durability], ['Pathogen Spectrum', routes.pathogens]
    ]},
    { title: 'Technical Support', href: routes.technicalSupport, links: [
      ['Technical Support', routes.technicalSupport], ['Download Center', routes.downloads], ['Maintenance', routes.maintenance], ['Reapplication', routes.reapplication]
    ]},
    { title: 'Contact', href: routes.contact, links: [
      ['Contact', routes.contact], ['Legal Information', routes.legal], ['Safety & Environment', routes.safety], ['FAQ', routes.faq]
    ]}
  ] : [
    { title: 'Bruksområder', href: routes.applications, links: [
      ['Bruksområder', routes.applications], ['Helse', routes.healthcare], ['Næringsmiddelindustri', routes.food], ['Offentlige miljøer', routes.publicFacilities], ['Skole og kontor', routes.education], ['Elektronikk og kontaktpunkter', routes.electronics], ['Applikasjonsprosess', routes.process]
    ]},
    { title: 'Teknisk', href: routes.documentation, links: [
      ['Teknisk', routes.documentation], ['Hvordan det fungerer', routes.how], ['Vedvarende beskyttelse', routes.continuous], ['Enklere rengjøring', routes.cleaning], ['Overflatekompatibilitet', routes.compatibility], ['Testing og standarder', routes.testing], ['Holdbarhet', routes.durability], ['Patogenspekter', routes.pathogens]
    ]},
    { title: 'Teknisk støtte', href: routes.technicalSupport, links: [
      ['Teknisk støtte', routes.technicalSupport], ['Nedlastingssenter', routes.downloads], ['Vedlikehold', routes.maintenance], ['Reapplikasjon', routes.reapplication]
    ]},
    { title: 'Kontakt', href: routes.contact, links: [
      ['Kontakt', routes.contact], ['Juridisk informasjon', routes.legal], ['Sikkerhet og miljø', routes.safety], ['FAQ', routes.faq]
    ]}
  ];

  const nav = footerColumns.map(col => ({ label: col.title, href: col.href, links: col.links, active: p => p.startsWith(col.href) || col.links.some(([, href]) => p === href || (href !== '/' && p.startsWith(href))) }));

  const injectGlobalOverrides = () => {
    const style = document.createElement('style');
    style.id = 'vitacoat-global-js-overrides';
    style.textContent = `
      .brand:before,.footer-brand,.footer-top-logo{background-image:url('/assets/img/vitacoat-logo.png')!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}
      .nav-dropdown .dropdown-menu{display:flex!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .22s ease .95s,visibility 0s linear 1.15s!important}
      .nav-dropdown:hover .dropdown-menu,.nav-dropdown:focus-within .dropdown-menu{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transition-delay:0s!important}
      .site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}
      .footer-top-logo{position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;font-size:0!important;line-height:0!important;color:transparent!important;overflow:hidden!important}
      .footer-column h4{margin-bottom:14px!important}.footer-column .footer-links{gap:7px!important}.site-footer .footer-grid p{display:none!important}
      @media(max-width:1100px){.site-footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding-right:120px!important}}
      @media(max-width:860px){.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}}
    `;
    const old = document.getElementById(style.id);
    if (old) old.remove();
    document.head.appendChild(style);
  };

  const renderNav = () => {
    const desktop = document.querySelector('.nav');
    if (desktop) {
      desktop.innerHTML = '';
      nav.forEach(item => {
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';
        const top = document.createElement('a');
        top.href = item.href;
        top.textContent = item.label;
        if (item.active(path)) top.classList.add('active');
        dropdown.appendChild(top);
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        item.links.forEach(([label, href]) => {
          const a = document.createElement('a');
          a.href = href;
          a.textContent = label;
          if (path === href) a.classList.add('active-sub');
          menu.appendChild(a);
        });
        dropdown.appendChild(menu);
        desktop.appendChild(dropdown);
      });
    }

    const headerInner = document.querySelector('.header-inner');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobile = document.querySelector('.mobile-nav');
    const mobileContainer = document.querySelector('.mobile-nav .container');

    if (headerInner && !headerInner.querySelector('.language-switcher')) headerInner.insertBefore(makeLanguageSwitch('header-language-switcher'), menuToggle || null);
    if (menuToggle) {
      menuToggle.type = 'button';
      menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">' + (isEn ? 'Menu' : 'Meny') + '</span>';
      menuToggle.setAttribute('aria-label', isEn ? 'Open menu' : 'Åpne meny');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (mobile) mobile.id = 'mobile-navigation';
    if (mobileContainer) {
      mobileContainer.innerHTML = '';
      nav.forEach(item => {
        const group = document.createElement('div'); group.className = 'mobile-nav-group';
        const row = document.createElement('div'); row.className = 'mobile-nav-row';
        const link = document.createElement('a'); link.href = item.href; link.textContent = item.label; link.className = 'mobile-main-link';
        if (item.active(path)) link.classList.add('active');
        row.appendChild(link);
        const button = document.createElement('button'); button.type = 'button'; button.className = 'mobile-subnav-toggle'; button.setAttribute('aria-expanded', 'false'); button.innerHTML = '<span aria-hidden="true">›</span>';
        row.appendChild(button); group.appendChild(row);
        const submenuBox = document.createElement('div'); submenuBox.className = 'mobile-subnav';
        item.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; a.className = 'mobile-subnav-link'; if (path === href) a.classList.add('active-sub'); submenuBox.appendChild(a); });
        group.appendChild(submenuBox);
        button.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); const open = group.classList.toggle('open'); button.setAttribute('aria-expanded', open ? 'true' : 'false'); });
        mobileContainer.appendChild(group);
      });
      mobileContainer.appendChild(makeLanguageSwitch('mobile-language-switcher'));
    }
    if (menuToggle && mobile) menuToggle.addEventListener('click', e => { e.preventDefault(); const open = mobile.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  };

  const renderFooter = () => {
    document.querySelectorAll('.site-footer .footer-grid').forEach(footer => {
      footer.innerHTML = '';
      const logo = document.createElement('a'); logo.href = routes.home; logo.className = 'footer-top-logo'; logo.setAttribute('aria-label', 'VitaCoat'); footer.appendChild(logo);
      footerColumns.forEach(column => {
        const col = document.createElement('div'); col.className = 'footer-column';
        const heading = document.createElement('h4'); const headLink = document.createElement('a'); headLink.href = column.href; headLink.textContent = column.title; heading.appendChild(headLink);
        const list = document.createElement('ul'); list.className = 'footer-links';
        column.links.slice(1).forEach(([label, href]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = href; a.textContent = label; li.appendChild(a); list.appendChild(li); });
        col.appendChild(heading); col.appendChild(list); footer.appendChild(col);
      });
      const box = document.createElement('div'); box.className = 'footer-language'; box.appendChild(makeLanguageSwitch('footer-language-switcher')); footer.appendChild(box);
    });
  };

  const setHeroImage = () => {
    const heroMap = {
      '/': '/assets/img/frontpage-hero.jpeg', '/en/': '/assets/img/frontpage-hero.jpeg',
      '/applications/': '/assets/img/applications-graph-01.jpeg', '/en/applications/': '/assets/img/applications-graph-01.jpeg',
      '/applications/healthcare/': '/assets/img/vitacoat-healthcare-application.jpeg', '/en/applications/healthcare/': '/assets/img/vitacoat-healthcare-application.jpeg',
      '/applications/food-processing/': '/assets/img/vitacoat-food-processing-application.jpeg', '/en/applications/food-processing/': '/assets/img/vitacoat-food-processing-application.jpeg',
      '/applications/public-facilities/': '/assets/img/vitacoat-public-facilities-application.jpeg', '/en/applications/public-facilities/': '/assets/img/vitacoat-public-facilities-application.jpeg',
      '/applications/education-and-offices/': '/assets/img/vitacoat-education-offices-application.jpeg', '/en/applications/education-and-offices/': '/assets/img/vitacoat-education-offices-application.jpeg',
      '/applications/electronics-and-touchpoints/': '/assets/img/vitacoat-electronics-touchpoints-application.jpeg', '/en/applications/electronics-and-touchpoints/': '/assets/img/vitacoat-electronics-touchpoints-application.jpeg',
      '/documentation/': '/assets/img/vitacoat-documentation-panel.jpeg', '/en/documentation/': '/assets/img/vitacoat-documentation-panel.jpeg',
      '/technical-support/': '/assets/img/technical-support-hero-01.jpeg', '/en/technical-support/': '/assets/img/technical-support-hero-01.jpeg',
      '/contact/': '/assets/img/vitacoat-contact-panel.jpeg', '/en/contact/': '/assets/img/vitacoat-contact-panel.jpeg'
    };
    const hero = document.querySelector('.hero-media img');
    if (hero && heroMap[path]) hero.src = heroMap[path];
    document.querySelectorAll('img[src^="/assets/img/"]').forEach(img => {
      if (/logo|favicon/i.test(img.src)) img.src = img.src.replace(/\.svg(\?.*)?$/i, '.png');
      else img.src = img.src.replace(/\.svg(\?.*)?$/i, '.jpeg');
    });
  };

  const injectGammaSections = () => {
    if (document.querySelector('[data-gamma-section="true"]')) return;
    const main = document.querySelector('main'); if (!main) return;
    const afterHero = document.querySelector('main .hero');
    const insertAfter = node => afterHero ? afterHero.insertAdjacentElement('afterend', node) : main.prepend(node);
    if (path === '/' || path === '/en/') {
      const title = isEn ? 'Gamma draft customer evidence blocks' : 'Kundedata og illustrasjoner fra Gamma-utkast';
      const intro = isEn ? 'The following Gamma-derived sections should be supplied as JPEG replacements from the approved frontpage package.' : 'Følgende Gamma-baserte seksjoner skal leveres som JPEG-er fra godkjent frontpage-pakke.';
      const imgs = [
        ['frontpage-five-reasons-facilities-trust-vitacoat.jpeg','Five Reasons Facilities Trust VitaCoat'],
        ['frontpage-three-mechanisms-one-continuous-barrier.jpeg','Three Mechanisms, One Continuous Barrier'],
        ['frontpage-routine-disinfection-vs-vitacoat-protection-model.jpeg','Routine Disinfection vs VitaCoat Protection Model'],
        ['frontpage-en-backed-performance-data.jpeg','EN-Backed Performance Data'],
        ['frontpage-coating-integrity-real-world-conditions.jpeg','Coating Integrity Under Real-World Conditions'],
        ['frontpage-surface-environment-fit-assessment.jpeg','Surface Environment Fit Assessment']
      ];
      const section = document.createElement('section'); section.className = 'section'; section.dataset.gammaSection = 'true';
      section.innerHTML = `<div class="container panel soft"><div class="eyebrow">Gamma alignment</div><h2>${title}</h2><p>${intro}</p><div class="grid-3">${imgs.map(([src,alt])=>`<article class="card"><img src="/assets/img/${src}" alt="${alt}"><h3>${alt}</h3></article>`).join('')}</div></div>`;
      insertAfter(section);
    }
    if (path.endsWith('/applications/') || path.endsWith('/en/applications/')) {
      const section = document.createElement('section'); section.className = 'section'; section.dataset.gammaSection = 'true';
      section.innerHTML = `<div class="container panel"><div class="eyebrow">Gamma alignment</div><h2>${isEn ? 'Applications decision map' : 'Beslutningskart for bruksområder'}</h2><p>${isEn ? 'Approved customer-facing application graph from the Gamma draft.' : 'Godkjent kundeorientert applikasjonsgraf fra Gamma-utkastet.'}</p><img src="/assets/img/applications-graph-01.jpeg" alt="Applications graph"></div>`;
      insertAfter(section);
    }
  };

  const normalizeContactLinks = () => {
    const topicFromPath = () => {
      if (path.includes('/documentation/') || path.includes('/proof/') || path.includes('/benefits/')) return 'Documentation';
      if (path.includes('/technical-support/')) return 'Technical review';
      if (path.includes('/application-process/')) return 'Application process';
      if (path.includes('/maintenance')) return 'Maintenance';
      if (path.includes('/reapplication')) return 'Reapplication';
      if (path.includes('/applications/')) return 'Pilot project';
      return 'General inquiry';
    };
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      const inContact = path.endsWith('/contact/') || path.endsWith('/en/contact/');
      if (inContact && a.classList.contains('btn')) { a.remove(); return; }
      a.href = `${routes.contact}?topic=${encodeURIComponent(topicFromPath())}`;
      if (/@vitacoat\.no/i.test(a.textContent || '')) a.textContent = isEn ? 'Contact VitaCoat' : 'Kontakt VitaCoat';
    });
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    const select = document.querySelector('form.contact-form select[name="topic"]');
    if (topic && select) {
      const target = [...select.options].find(o => o.textContent.toLowerCase().includes(topic.toLowerCase().split(' ')[0])) || [...select.options].find(o => /other|annet/i.test(o.textContent));
      if (target) select.value = target.value;
    }
  };

  const setupAnimations = () => {
    const animateNumber = el => {
      if (el.dataset.animated === 'true') return; el.dataset.animated = 'true';
      const raw = el.textContent.trim(); const match = raw.match(/([0-9]+(?:[.,][0-9]+)?)/); if (!match) return;
      const target = parseFloat(match[1].replace(',', '.')); const prefix = raw.slice(0, match.index); const suffix = raw.slice(match.index + match[1].length); const decimals = match[1].includes('.') || match[1].includes(',') ? 1 : 0; const start = performance.now();
      const step = now => { const progress = Math.min((now - start) / 1100, 1); const eased = 1 - Math.pow(1 - progress, 3); const value = target * eased; const rendered = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString(isEn ? 'en-US' : 'nb-NO'); el.textContent = `${prefix}${rendered}${suffix}`; if (progress < 1) requestAnimationFrame(step); else el.textContent = raw; };
      requestAnimationFrame(step);
    };
    document.querySelectorAll('.bar-fill').forEach(bar => { const width = bar.style.width || bar.getAttribute('data-width') || '0%'; bar.setAttribute('data-width', width); bar.style.width = '0%'; });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target; if (el.classList.contains('bar-fill')) el.style.width = el.getAttribute('data-width') || '0%'; else animateNumber(el); observer.unobserve(el); }), { threshold: 0.25 });
    document.querySelectorAll('.bar-fill,.stat-num,.metric-num,.chart-num,[data-animate="number"]').forEach(el => observer.observe(el));
  };

  const setupBackToTop = () => {
    const top = document.createElement('button'); top.type = 'button'; top.className = 'mobile-top-button'; top.setAttribute('aria-label', isEn ? 'Back to the top of the page' : 'Til toppen av siden'); top.innerHTML = isEn ? '<span aria-hidden="true">↑</span><span>Back to top</span>' : '<span aria-hidden="true">↑</span><span>Til toppen</span>'; document.body.appendChild(top);
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    let lastY = window.scrollY; let hideTimer = null;
    const handler = () => { const y = window.scrollY; if (window.innerWidth <= 860 && y > 280 && y < lastY - 6) { top.classList.add('is-visible'); clearTimeout(hideTimer); hideTimer = setTimeout(() => top.classList.remove('is-visible'), 2000); } else if (window.innerWidth > 860 || y <= 280) top.classList.remove('is-visible'); lastY = y; };
    window.addEventListener('scroll', handler, { passive: true }); window.addEventListener('resize', handler); handler();
  };

  injectGlobalOverrides();
  renderNav();
  renderFooter();
  setHeroImage();
  injectGammaSections();
  normalizeContactLinks();
  setupAnimations();
  setupBackToTop();
});
