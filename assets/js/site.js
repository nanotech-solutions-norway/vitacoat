document.addEventListener('DOMContentLoaded',()=>{
  const currentPath=window.location.pathname;

  const detectPreferredLanguage=()=>{
    try{
      const saved=window.localStorage.getItem('vitacoat-language');
      if(saved==='no' || saved==='en') return saved;
    }catch(e){}
    const langs=(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']).map(v=>(v||'').toLowerCase());
    const timezone=(Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const norwegianMatch=langs.some(v=>v.startsWith('no') || v.startsWith('nb') || v.startsWith('nn')) || timezone.includes('oslo');
    return norwegianMatch ? 'no' : 'en';
  };

  const preferredLanguage=detectPreferredLanguage();
  const isEnglishRoute=currentPath.startsWith('/en/');
  document.documentElement.lang=isEnglishRoute ? 'en' : 'no';
  document.documentElement.dataset.sitePrimaryLanguage='no';
  document.documentElement.dataset.preferredLanguage=preferredLanguage;

  try{
    const hasVisited=window.localStorage.getItem('vitacoat-language-initialized')==='true';
    window.localStorage.setItem('vitacoat-language', preferredLanguage);
    if(!hasVisited){
      window.localStorage.setItem('vitacoat-language-initialized','true');
      if(preferredLanguage==='en' && currentPath==='/'){
        window.location.replace('/en/');
        return;
      }
    }
  }catch(e){}

  const route = isEnglishRoute ? {
    home:'/en/',
    applications:'/en/applications/',
    documentation:'/en/documentation/',
    technicalSupport:'/en/technical-support/',
    contact:'/en/contact/',
    howItWorks:'/en/how-it-works/',
    benefitsContinuous:'/en/benefits/continuous-protection/',
    benefitsCleaning:'/en/benefits/easier-cleaning/',
    benefitsCompatibility:'/en/benefits/surface-compatibility/',
    proofTesting:'/en/proof/testing-and-standards/',
    proofDurability:'/en/proof/durability/',
    proofSafety:'/en/proof/safety-and-environment/',
    proofPathogens:'/en/proof/pathogen-spectrum/',
    applicationProcess:'/en/application-process/',
    maintenance:'/en/maintenance-and-reapplication/',
    healthcare:'/en/applications/healthcare/',
    food:'/en/applications/food-processing/',
    publicFacilities:'/en/applications/public-facilities/',
    education:'/en/applications/education-and-offices/',
    electronics:'/en/applications/electronics-and-touchpoints/'
  } : {
    home:'/',
    applications:'/applications/',
    documentation:'/documentation/',
    technicalSupport:'/technical-support/',
    contact:'/contact/',
    howItWorks:'/how-it-works/',
    benefitsContinuous:'/benefits/continuous-protection/',
    benefitsCleaning:'/benefits/easier-cleaning/',
    benefitsCompatibility:'/benefits/surface-compatibility/',
    proofTesting:'/proof/testing-and-standards/',
    proofDurability:'/proof/durability/',
    proofSafety:'/proof/safety-and-environment/',
    proofPathogens:'/proof/pathogen-spectrum/',
    applicationProcess:'/application-process/',
    maintenance:'/maintenance-and-reapplication/',
    healthcare:'/applications/healthcare/',
    food:'/applications/food-processing/',
    publicFacilities:'/applications/public-facilities/',
    education:'/applications/education-and-offices/',
    electronics:'/applications/electronics-and-touchpoints/'
  };

  const navConfig=isEnglishRoute ? [
    {href:route.home,label:'Home',active:(p)=>p===route.home},
    {href:route.applications,label:'Applications',active:(p)=>p.startsWith(route.applications)},
    {href:route.documentation,label:'Documentation',active:(p)=>p.startsWith(route.documentation)||p.startsWith('/en/benefits/')||p.startsWith('/en/proof/')||p.startsWith(route.applicationProcess)||p.startsWith(route.maintenance)||p.startsWith('/en/faq/')},
    {href:route.technicalSupport,label:'Technical Support',active:(p)=>p.startsWith(route.technicalSupport)},
    {href:route.contact,label:'Contact',active:(p)=>p.startsWith(route.contact)}
  ] : [
    {href:route.home,label:'Hjem',active:(p)=>p===route.home},
    {href:route.applications,label:'Bruksområder',active:(p)=>p.startsWith(route.applications)},
    {href:route.documentation,label:'Dokumentasjon',active:(p)=>p.startsWith(route.documentation)||p.startsWith('/benefits/')||p.startsWith('/proof/')||p.startsWith(route.applicationProcess)||p.startsWith(route.maintenance)||p.startsWith('/faq/')},
    {href:route.technicalSupport,label:'Teknisk støtte',active:(p)=>p.startsWith(route.technicalSupport)},
    {href:route.contact,label:'Kontakt',active:(p)=>p.startsWith(route.contact)}
  ];

  const submenus=isEnglishRoute ? {
    [route.applications]:[
      {href:route.healthcare,label:'Healthcare'},
      {href:route.food,label:'Food Processing'},
      {href:route.publicFacilities,label:'Public Facilities'},
      {href:route.education,label:'Education & Offices'},
      {href:route.electronics,label:'Electronics & Touchpoints'}
    ],
    [route.documentation]:[
      {href:route.documentation,label:'Documentation Center'},
      {href:route.benefitsContinuous,label:'Continuous Protection'},
      {href:route.benefitsCleaning,label:'Easier Cleaning'},
      {href:route.benefitsCompatibility,label:'Surface Compatibility'},
      {href:route.proofTesting,label:'Testing & Standards'},
      {href:route.proofDurability,label:'Durability'},
      {href:route.proofSafety,label:'Safety & Environment'},
      {href:route.proofPathogens,label:'Pathogen Spectrum'},
      {href:route.applicationProcess,label:'Application Process'},
      {href:route.maintenance,label:'Maintenance & Reapplication'}
    ]
  } : {
    [route.applications]:[
      {href:route.healthcare,label:'Helse'},
      {href:route.food,label:'Næringsmiddelindustri'},
      {href:route.publicFacilities,label:'Offentlige miljøer'},
      {href:route.education,label:'Skole og kontor'},
      {href:route.electronics,label:'Elektronikk og kontaktpunkter'}
    ],
    [route.documentation]:[
      {href:route.documentation,label:'Dokumentasjonssenter'},
      {href:route.benefitsContinuous,label:'Vedvarende beskyttelse'},
      {href:route.benefitsCleaning,label:'Enklere rengjøring'},
      {href:route.benefitsCompatibility,label:'Overflatekompatibilitet'},
      {href:route.proofTesting,label:'Testing og standarder'},
      {href:route.proofDurability,label:'Holdbarhet'},
      {href:route.proofSafety,label:'Sikkerhet og miljø'},
      {href:route.proofPathogens,label:'Patogenspekter'},
      {href:route.applicationProcess,label:'Applikasjonsprosess'},
      {href:route.maintenance,label:'Vedlikehold og reapplikasjon'},
      {href:'/faq/',label:'FAQ'}
    ]
  };

  const desktopNav=document.querySelector('.nav');
  const mobileNav=document.querySelector('.mobile-nav');
  const mobileNavContainer=document.querySelector('.mobile-nav .container');
  const menuToggle=document.querySelector('.menu-toggle');

  const buildDesktopNav=()=>{
    if(!desktopNav) return;
    desktopNav.innerHTML='';
    navConfig.forEach(item=>{
      if(submenus[item.href]){
        const dropdown=document.createElement('div');
        dropdown.className='nav-dropdown';
        const topLink=document.createElement('a');
        topLink.href=item.href;
        topLink.textContent=item.label;
        if(item.active(currentPath)) topLink.classList.add('active');
        dropdown.appendChild(topLink);
        const menu=document.createElement('div');
        menu.className='dropdown-menu';
        submenus[item.href].forEach(subitem=>{
          const a=document.createElement('a');
          a.href=subitem.href;
          a.textContent=subitem.label;
          if(currentPath===subitem.href) a.classList.add('active-sub');
          menu.appendChild(a);
        });
        dropdown.appendChild(menu);
        desktopNav.appendChild(dropdown);
      }else{
        const a=document.createElement('a');
        a.href=item.href;
        a.textContent=item.label;
        if(item.active(currentPath)) a.classList.add('active');
        desktopNav.appendChild(a);
      }
    });
  };

  const buildMobileNav=()=>{
    if(!mobileNavContainer) return;
    mobileNavContainer.innerHTML='';
    navConfig.forEach(item=>{
      const group=document.createElement('div');
      group.className='mobile-nav-group';
      const row=document.createElement('div');
      row.className='mobile-nav-row';
      const link=document.createElement('a');
      link.href=item.href;
      link.textContent=item.label;
      link.className='mobile-main-link';
      if(item.active(currentPath)) link.classList.add('active');
      row.appendChild(link);
      if(submenus[item.href]){
        const toggle=document.createElement('button');
        toggle.type='button';
        toggle.className='mobile-subnav-toggle';
        toggle.setAttribute('aria-expanded','false');
        toggle.setAttribute('aria-label', isEnglishRoute ? `Show submenu for ${item.label}` : `Vis undermeny for ${item.label}`);
        toggle.innerHTML='<span aria-hidden="true">›</span>';
        row.appendChild(toggle);
        const submenu=document.createElement('div');
        submenu.className='mobile-subnav';
        submenus[item.href].forEach(subitem=>{
          const sub=document.createElement('a');
          sub.href=subitem.href;
          sub.textContent=subitem.label;
          sub.className='mobile-subnav-link';
          if(currentPath===subitem.href) sub.classList.add('active-sub');
          submenu.appendChild(sub);
        });
        group.appendChild(row);
        group.appendChild(submenu);
        if(submenus[item.href].some(subitem=>subitem.href===currentPath)){
          group.classList.add('open');
          toggle.setAttribute('aria-expanded','true');
        }
        toggle.addEventListener('click',e=>{
          e.preventDefault();
          group.classList.toggle('open');
          toggle.setAttribute('aria-expanded',group.classList.contains('open')?'true':'false');
        });
      }else{
        group.appendChild(row);
      }
      mobileNavContainer.appendChild(group);
    });
  };

  buildDesktopNav();
  buildMobileNav();

  if(menuToggle){
    menuToggle.innerHTML=isEnglishRoute ? '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">Menu</span>' : '<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">Meny</span>';
    menuToggle.setAttribute('aria-label', isEnglishRoute ? 'Open menu' : 'Åpne meny');
  }
  if(menuToggle&&mobileNav){
    menuToggle.addEventListener('click',()=>mobileNav.classList.toggle('open'));
  }
  document.querySelectorAll('.nav a,.mobile-nav a').forEach(a=>{
    a.addEventListener('click',()=>mobileNav&&mobileNav.classList.remove('open'));
  });

  const heroImageMap={
    [route.documentation]:'/assets/img/vitacoat-documentation-panel.svg',
    [route.technicalSupport]:'/assets/img/vitacoat-technical-support-panel.svg',
    [route.contact]:'/assets/img/vitacoat-contact-panel.svg'
  };
  const heroImg=document.querySelector('.hero-media img');
  if(heroImg&&heroImageMap[currentPath]) heroImg.src=heroImageMap[currentPath];

  const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOutCubic=t=>1-Math.pow(1-t,3);

  const animateCounter=(el)=>{
    if(el.dataset.animated==='true') return;
    const raw=el.dataset.finalValue||el.textContent.trim();
    const match=raw.match(/([\d,.]+)/);
    if(!match){el.dataset.animated='true';return;}
    const numeric=parseFloat(match[1].replace(/,/g,''));
    if(Number.isNaN(numeric)){el.dataset.animated='true';return;}
    const prefix=raw.slice(0,match.index||0);
    const suffix=raw.slice((match.index||0)+match[1].length);
    const decimals=match[1].includes('.')?match[1].split('.')[1].length:0;
    const duration=1400;
    const start=performance.now();
    el.dataset.finalValue=raw;
    const render=(value)=>{
      const formatted=(decimals>0?value.toFixed(decimals):Math.round(value).toString()).replace(/\B(?=(\d{3})+(?!\d))/g,',');
      el.textContent=`${prefix}${formatted}${suffix}`;
    };
    if(prefersReducedMotion){el.textContent=raw;el.dataset.animated='true';return;}
    render(0);
    const step=(now)=>{
      const progress=Math.min((now-start)/duration,1);
      render(numeric*easeOutCubic(progress));
      if(progress<1){requestAnimationFrame(step);}else{el.textContent=raw;el.dataset.animated='true';}
    };
    requestAnimationFrame(step);
  };

  const animateBarGroup=(group)=>{
    if(group.dataset.animated==='true') return;
    group.querySelectorAll('.bar-fill').forEach(el=>{
      const target=el.dataset.targetWidth||el.style.width||'0%';
      el.dataset.targetWidth=target;
      if(prefersReducedMotion){el.style.width=target;}else{el.style.width='0%';requestAnimationFrame(()=>{el.style.width=target;});}
      el.dataset.animated='true';
    });
    group.dataset.animated='true';
  };

  const revealTargets=[...document.querySelectorAll('.panel,.cta-band,.table-wrap,.callout,.timeline,.faq-item')];
  const seen=new Set();
  revealTargets.forEach(el=>{
    if(el.closest('.panel')&&el.classList.contains('callout')) return;
    if(el.closest('.panel')&&el.classList.contains('table-wrap')) return;
    if(seen.has(el)) return;
    seen.add(el);
    el.classList.add('animate-on-scroll');
  });

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el=entry.target;
      el.classList.add('is-visible');
      observer.unobserve(el);
    });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.animate-on-scroll').forEach(el=>observer.observe(el));

  const counterObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },{threshold:0.35});
  document.querySelectorAll('.stat-num').forEach(el=>counterObserver.observe(el));

  const barObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      animateBarGroup(entry.target);
      barObserver.unobserve(entry.target);
    });
  },{threshold:0.25});
  document.querySelectorAll('.bar-group').forEach(el=>barObserver.observe(el));

  const topButton=document.createElement('button');
  topButton.type='button';
  topButton.className='mobile-top-button';
  topButton.setAttribute('aria-label', isEnglishRoute ? 'Back to the top of the page' : 'Til toppen av siden');
  topButton.innerHTML=isEnglishRoute ? '<span aria-hidden="true">↑</span><span>Back to top</span>' : '<span aria-hidden="true">↑</span><span>Til toppen</span>';
  document.body.appendChild(topButton);
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:prefersReducedMotion?'auto':'smooth'}));

  let lastY=window.scrollY;
  let ticking=false;
  let hideTimeoutId=null;
  const showTopButton=()=>{if(hideTimeoutId){clearTimeout(hideTimeoutId);hideTimeoutId=null;}topButton.classList.add('is-visible');};
  const hideTopButtonNow=()=>{if(hideTimeoutId){clearTimeout(hideTimeoutId);hideTimeoutId=null;}topButton.classList.remove('is-visible');};
  const scheduleHideTopButton=()=>{if(hideTimeoutId) clearTimeout(hideTimeoutId);hideTimeoutId=window.setTimeout(()=>{topButton.classList.remove('is-visible');hideTimeoutId=null;},2000);};
  const updateTopButton=()=>{
    const currentY=window.scrollY;
    const isMobile=window.innerWidth<=860;
    const scrollingUp=currentY<lastY-6;
    const farEnough=currentY>280;
    if(isMobile&&farEnough&&scrollingUp){showTopButton();}
    else if(!isMobile||!farEnough){hideTopButtonNow();}
    else{scheduleHideTopButton();}
    lastY=currentY;
    ticking=false;
  };
  window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(updateTopButton);ticking=true;}},{passive:true});
  window.addEventListener('resize',updateTopButton);
  updateTopButton();

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){icon=document.createElement('link');icon.rel='icon';icon.type='image/svg+xml';document.head.appendChild(icon);} 
  icon.href='/assets/img/vitacoat-favicon.svg';
});