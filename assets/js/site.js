document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEn = path.startsWith('/en/');
  document.documentElement.lang = isEn ? 'en' : 'nb-NO';

  const toEn = p => (p === '/' ? '/en/' : `/en${p}`);
  const toNo = p => (p.startsWith('/en/') ? (p.replace(/^\/en/, '') || '/') : p);
  const noPath = toNo(path);
  const enPath = isEn ? path : toEn(path);
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
    maintenance: local('/maintenance-and-reapplication/'),
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
      { flag: '🇳🇴', href: noPath, active: !isEn, code: 'no', label: 'Norsk' },
      { flag: '🇬🇧', href: enPath, active: isEn, code: 'en', label: 'English' }
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

  const nav = isEn ? [
    { label: 'Home', href: routes.home, active: p => p === routes.home },
    { label: 'Applications', href: routes.applications, active: p => p.startsWith(routes.applications) },
    { label: 'Documentation', href: routes.documentation, active: p => p.startsWith(routes.documentation) || p.includes('/benefits/') || p.includes('/proof/') || p.includes('/faq/') || p.includes('/application-process/') || p.includes('/maintenance-and-reapplication/') || p.includes('/legal/') || p.includes('/how-it-works/') },
    { label: 'Technical Support', href: routes.technicalSupport, active: p => p.startsWith(routes.technicalSupport) },
    { label: 'Contact', href: routes.contact, active: p => p.startsWith(routes.contact) }
  ] : [
    { label: 'Hjem', href: routes.home, active: p => p === routes.home },
    { label: 'Bruksområder', href: routes.applications, active: p => p.startsWith(routes.applications) },
    { label: 'Dokumentasjon', href: routes.documentation, active: p => p.startsWith(routes.documentation) || p.startsWith('/benefits/') || p.startsWith('/proof/') || p.startsWith('/faq/') || p.startsWith('/application-process/') || p.startsWith('/maintenance-and-reapplication/') || p.startsWith('/legal/') || p.startsWith('/how-it-works/') },
    { label: 'Teknisk støtte', href: routes.technicalSupport, active: p => p.startsWith(routes.technicalSupport) },
    { label: 'Kontakt', href: routes.contact, active: p => p.startsWith(routes.contact) }
  ];

  const submenus = isEn ? {
    [routes.applications]: [
      ['Healthcare', routes.healthcare],
      ['Food Processing', routes.food],
      ['Public Facilities', routes.publicFacilities],
      ['Education & Offices', routes.education],
      ['Electronics & Touchpoints', routes.electronics],
      ['Application Process', routes.process],
      ['Maintenance & Reapplication', routes.maintenance]
    ],
    [routes.documentation]: [
      ['Documentation Center', routes.documentation],
      ['How it Works', routes.how],
      ['Continuous Protection', routes.continuous],
      ['Easier Cleaning', routes.cleaning],
      ['Surface Compatibility', routes.compatibility],
      ['Testing & Standards', routes.testing],
      ['Durability', routes.durability],
      ['Pathogen Spectrum', routes.pathogens],
      ['Safety & Environment', routes.safety],
      ['FAQ', routes.faq],
      ['Legal Information', routes.legal]
    ]
  } : {
    [routes.applications]: [
      ['Helse', routes.healthcare],
      ['Næringsmiddelindustri', routes.food],
      ['Offentlige miljøer', routes.publicFacilities],
      ['Skole og kontor', routes.education],
      ['Elektronikk og kontaktpunkter', routes.electronics],
      ['Applikasjonsprosess', routes.process],
      ['Vedlikehold og reapplikasjon', routes.maintenance]
    ],
    [routes.documentation]: [
      ['Dokumentasjonssenter', routes.documentation],
      ['Hvordan det fungerer', routes.how],
      ['Vedvarende beskyttelse', routes.continuous],
      ['Enklere rengjøring', routes.cleaning],
      ['Overflatekompatibilitet', routes.compatibility],
      ['Testing og standarder', routes.testing],
      ['Holdbarhet', routes.durability],
      ['Patogenspekter', routes.pathogens],
      ['Sikkerhet og miljø', routes.safety],
      ['FAQ', routes.faq],
      ['Juridisk informasjon', routes.legal]
    ]
  };

  const renderNav = () => {
    const desktop = document.querySelector('.nav');
    if (desktop) {
      desktop.innerHTML = '';
      nav.forEach(item => {
        const submenu = submenus[item.href];
        if (submenu) {
          const dropdown = document.createElement('div');
          dropdown.className = 'nav-dropdown';
          const top = document.createElement('a');
          top.href = item.href;
          top.textContent = item.label;
          if (item.active(path)) top.classList.add('active');
          dropdown.appendChild(top);
          const menu = document.createElement('div');
          menu.className = 'dropdown-menu';
          submenu.forEach(([label, href]) => {
            const a = document.createElement('a');
            a.href = href;
            a.textContent = label;
            if (path === href) a.classList.add('active-sub');
            menu.appendChild(a);
          });
          dropdown.appendChild(menu);
          desktop.appendChild(dropdown);
        } else {
          const a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.label;
          if (item.active(path)) a.classList.add('active');
          desktop.appendChild(a);
        }
      });
    }

    const headerInner = document.querySelector('.header-inner');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobile = document.querySelector('.mobile-nav');
    const mobileContainer = document.querySelector('.mobile-nav .container');

    if (headerInner && !headerInner.querySelector('.language-switcher')) {
      headerInner.insertBefore(makeLanguageSwitch('header-language-switcher'), menuToggle || null);
    }

    if (menuToggle) {
      menuToggle.type = 'button';
      menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">' + (isEn ? 'Menu' : 'Meny') + '</span>';
      menuToggle.setAttribute('aria-label', isEn ? 'Open menu' : 'Åpne meny');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-controls', 'mobile-navigation');
    }
    if (mobile) mobile.id = 'mobile-navigation';

    if (mobileContainer) {
      mobileContainer.innerHTML = '';
      nav.forEach(item => {
        const group = document.createElement('div');
        group.className = 'mobile-nav-group';
        const row = document.createElement('div');
        row.className = 'mobile-nav-row';
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        link.className = 'mobile-main-link';
        if (item.active(path)) link.classList.add('active');
        row.appendChild(link);

        const submenu = submenus[item.href];
        if (submenu) {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'mobile-subnav-toggle';
          button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-label', isEn ? `Show submenu for ${item.label}` : `Vis undermeny for ${item.label}`);
          button.innerHTML = '<span aria-hidden="true">›</span>';
          row.appendChild(button);
          const submenuBox = document.createElement('div');
          submenuBox.className = 'mobile-subnav';
          submenu.forEach(([label, href]) => {
            const a = document.createElement('a');
            a.href = href;
            a.textContent = label;
            a.className = 'mobile-subnav-link';
            if (path === href) a.classList.add('active-sub');
            submenuBox.appendChild(a);
          });
          group.appendChild(row);
          group.appendChild(submenuBox);
          button.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            const open = group.classList.toggle('open');
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
        } else {
          group.appendChild(row);
        }
        mobileContainer.appendChild(group);
      });
      mobileContainer.appendChild(makeLanguageSwitch('mobile-language-switcher'));
    }

    if (menuToggle && mobile) {
      menuToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const open = mobile.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('mobile-menu-open', open);
      });

      document.addEventListener('click', event => {
        if (!mobile.classList.contains('open')) return;
        if (mobile.contains(event.target) || menuToggle.contains(event.target)) return;
        mobile.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('mobile-menu-open');
      });
    }
  };

  const footerColumns = isEn ? [
    {
      title: 'Home',
      links: [
        ['Home', routes.home],
        ['Technical Support', routes.technicalSupport]
      ]
    },
    {
      title: 'Applications',
      links: [
        ['Applications', routes.applications],
        ['Healthcare', routes.healthcare],
        ['Food Processing', routes.food],
        ['Public Facilities', routes.publicFacilities],
        ['Education & Offices', routes.education],
        ['Electronics & Touchpoints', routes.electronics],
        ['Application Process', routes.process],
        ['Maintenance & Reapplication', routes.maintenance]
      ]
    },
    {
      title: 'Documentation',
      links: [
        ['Documentation', routes.documentation],
        ['How it Works', routes.how],
        ['Continuous Protection', routes.continuous],
        ['Easier Cleaning', routes.cleaning],
        ['Surface Compatibility', routes.compatibility],
        ['Testing & Standards', routes.testing],
        ['Durability', routes.durability],
        ['Pathogen Spectrum', routes.pathogens]
      ]
    },
    {
      title: 'Contact',
      links: [
        ['Contact', routes.contact],
        ['Legal Information', routes.legal],
        ['Safety & Environment', routes.safety],
        ['FAQ', routes.faq]
      ]
    }
  ] : [
    {
      title: 'Hjem',
      links: [
        ['Hjem', routes.home],
        ['Teknisk støtte', routes.technicalSupport]
      ]
    },
    {
      title: 'Bruksområder',
      links: [
        ['Bruksområder', routes.applications],
        ['Helse', routes.healthcare],
        ['Næringsmiddelindustri', routes.food],
        ['Offentlige miljøer', routes.publicFacilities],
        ['Skole og kontor', routes.education],
        ['Elektronikk og kontaktpunkter', routes.electronics],
        ['Applikasjonsprosess', routes.process],
        ['Vedlikehold og reapplikasjon', routes.maintenance]
      ]
    },
    {
      title: 'Dokumentasjon',
      links: [
        ['Dokumentasjon', routes.documentation],
        ['Hvordan det fungerer', routes.how],
        ['Vedvarende beskyttelse', routes.continuous],
        ['Enklere rengjøring', routes.cleaning],
        ['Overflatekompatibilitet', routes.compatibility],
        ['Testing og standarder', routes.testing],
        ['Holdbarhet', routes.durability],
        ['Patogenspekter', routes.pathogens]
      ]
    },
    {
      title: 'Kontakt',
      links: [
        ['Kontakt', routes.contact],
        ['Juridisk informasjon', routes.legal],
        ['Sikkerhet og miljø', routes.safety],
        ['FAQ', routes.faq]
      ]
    }
  ];

  const renderFooter = () => {
    const footerCssId = 'vitacoat-footer-normalized-css';
    if (!document.getElementById(footerCssId)) {
      const style = document.createElement('style');
      style.id = footerCssId;
      style.textContent = `
        .site-footer .footer-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:26px!important;padding:38px 130px 86px 34px!important}
        .footer-top-logo{position:absolute!important;right:28px!important;top:28px!important;width:76px!important;height:76px!important;background:url('/assets/img/vitacoat-logo.svg') center/contain no-repeat!important;font-size:0!important;line-height:0!important;color:transparent!important;overflow:hidden!important}
        .footer-top-logo:focus-visible{outline:3px solid #fff!important;outline-offset:4px!important}
        .footer-column h4{margin-bottom:14px!important}.footer-column .footer-links{gap:7px!important}.footer-column .footer-links a{color:#d7dbe5!important}.footer-column .footer-links a:hover{color:#fff!important;text-decoration:underline!important}.site-footer .footer-grid p{display:none!important}
        @media(max-width:1100px){.site-footer .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding-right:120px!important}}
        @media(max-width:860px){.site-footer .footer-grid{grid-template-columns:1fr!important;padding:118px 24px 86px!important}.footer-top-logo{left:24px!important;right:auto!important;top:28px!important;width:68px!important;height:68px!important}}
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.site-footer .footer-grid').forEach(footer => {
      footer.innerHTML = '';
      const logo = document.createElement('a');
      logo.href = routes.home;
      logo.className = 'footer-top-logo';
      logo.setAttribute('aria-label', 'VitaCoat');
      footer.appendChild(logo);

      footerColumns.forEach(column => {
        const col = document.createElement('div');
        col.className = 'footer-column';
        const heading = document.createElement('h4');
        heading.textContent = column.title;
        const list = document.createElement('ul');
        list.className = 'footer-links';
        column.links.forEach(([label, href]) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = href;
          a.textContent = label;
          li.appendChild(a);
          list.appendChild(li);
        });
        col.appendChild(heading);
        col.appendChild(list);
        footer.appendChild(col);
      });

      const box = document.createElement('div');
      box.className = 'footer-language';
      box.appendChild(makeLanguageSwitch('footer-language-switcher'));
      footer.appendChild(box);
    });
  };

  const setHeroImage = () => {
    const heroMap = {
      '/': '/assets/img/vitacoat-antimicrobial-hero.svg',
      '/en/': '/assets/img/vitacoat-antimicrobial-hero.svg',
      '/applications/': '/assets/img/vitacoat-applications-panel.svg',
      '/en/applications/': '/assets/img/vitacoat-applications-panel.svg',
      '/applications/healthcare/': '/assets/img/vitacoat-healthcare-application.svg',
      '/en/applications/healthcare/': '/assets/img/vitacoat-healthcare-application.svg',
      '/applications/food-processing/': '/assets/img/vitacoat-food-processing-application.svg',
      '/en/applications/food-processing/': '/assets/img/vitacoat-food-processing-application.svg',
      '/applications/public-facilities/': '/assets/img/vitacoat-public-facilities-application.svg',
      '/en/applications/public-facilities/': '/assets/img/vitacoat-public-facilities-application.svg',
      '/applications/education-and-offices/': '/assets/img/vitacoat-education-offices-application.svg',
      '/en/applications/education-and-offices/': '/assets/img/vitacoat-education-offices-application.svg',
      '/applications/electronics-and-touchpoints/': '/assets/img/vitacoat-electronics-touchpoints-application.svg',
      '/en/applications/electronics-and-touchpoints/': '/assets/img/vitacoat-electronics-touchpoints-application.svg',
      '/documentation/': '/assets/img/vitacoat-documentation-panel.svg',
      '/en/documentation/': '/assets/img/vitacoat-documentation-panel.svg',
      '/technical-support/': '/assets/img/vitacoat-technical-support-panel.svg',
      '/en/technical-support/': '/assets/img/vitacoat-technical-support-panel.svg',
      '/contact/': '/assets/img/vitacoat-technical-support-panel.svg',
      '/en/contact/': '/assets/img/vitacoat-technical-support-panel.svg'
    };
    const hero = document.querySelector('.hero-media img');
    if (hero && heroMap[path]) hero.src = heroMap[path];
  };

  const animateNumber = el => {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';
    const raw = el.textContent.trim();
    const match = raw.match(/([0-9]+(?:[.,][0-9]+)?)/);
    if (!match) return;
    const target = parseFloat(match[1].replace(',', '.'));
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[1].length);
    const decimals = match[1].includes('.') || match[1].includes(',') ? 1 : 0;
    const duration = 1100;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      const rendered = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString(isEn ? 'en-US' : 'nb-NO');
      el.textContent = `${prefix}${rendered}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };

  const setupAnimations = () => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      const width = bar.style.width || bar.getAttribute('data-width') || '0%';
      bar.setAttribute('data-width', width);
      bar.style.width = '0%';
    });
    const targets = document.querySelectorAll('.bar-fill,.stat-num,.metric-num,.chart-num,[data-animate="number"]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('bar-fill')) el.style.width = el.getAttribute('data-width') || '0%';
        else animateNumber(el);
        observer.unobserve(el);
      });
    }, { threshold: 0.25 });
    targets.forEach(el => observer.observe(el));
  };

  const setupBackToTop = () => {
    const top = document.createElement('button');
    top.type = 'button';
    top.className = 'mobile-top-button';
    top.setAttribute('aria-label', isEn ? 'Back to the top of the page' : 'Til toppen av siden');
    top.innerHTML = isEn ? '<span aria-hidden="true">↑</span><span>Back to top</span>' : '<span aria-hidden="true">↑</span><span>Til toppen</span>';
    document.body.appendChild(top);
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    let lastY = window.scrollY;
    let hideTimer = null;
    const handleTopButton = () => {
      const y = window.scrollY;
      if (window.innerWidth <= 860 && y > 280 && y < lastY - 6) {
        top.classList.add('is-visible');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => top.classList.remove('is-visible'), 2000);
      } else if (window.innerWidth > 860 || y <= 280) {
        top.classList.remove('is-visible');
      }
      lastY = y;
    };
    window.addEventListener('scroll', handleTopButton, { passive: true });
    window.addEventListener('resize', handleTopButton);
    handleTopButton();
  };

  renderNav();
  renderFooter();
  setHeroImage();
  setupAnimations();
  setupBackToTop();
});
