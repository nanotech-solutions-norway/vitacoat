document.addEventListener('DOMContentLoaded',()=>{
  const currentPath=window.location.pathname;
  const navConfig=[
    {href:'/',label:'Home',active:(p)=>p==='/'},
    {href:'/applications/',label:'Applications',active:(p)=>p.startsWith('/applications/')},
    {href:'/documentation/',label:'Documentation',active:(p)=>p.startsWith('/documentation/')||p.startsWith('/benefits/')||p.startsWith('/proof/')||p.startsWith('/application-process/')||p.startsWith('/maintenance-and-reapplication/')||p.startsWith('/faq/')},
    {href:'/technical-support/',label:'Technical Support',active:(p)=>p.startsWith('/technical-support/')},
    {href:'/contact/',label:'Contact',active:(p)=>p.startsWith('/contact/')}
  ];

  const submenus={
    '/applications/':[
      {href:'/applications/healthcare/',label:'Healthcare'},
      {href:'/applications/food-processing/',label:'Food Processing'},
      {href:'/applications/public-facilities/',label:'Public Facilities'},
      {href:'/applications/education-and-offices/',label:'Education & Offices'},
      {href:'/applications/electronics-and-touchpoints/',label:'Electronics & Touchpoints'}
    ],
    '/documentation/':[
      {href:'/documentation/',label:'Documentation Hub'},
      {href:'/benefits/continuous-protection/',label:'Continuous Protection'},
      {href:'/benefits/easier-cleaning/',label:'Easier Cleaning'},
      {href:'/benefits/surface-compatibility/',label:'Surface Compatibility'},
      {href:'/proof/testing-and-standards/',label:'Testing & Standards'},
      {href:'/proof/durability/',label:'Durability'},
      {href:'/proof/safety-and-environment/',label:'Safety & Environment'},
      {href:'/proof/pathogen-spectrum/',label:'Pathogen Spectrum'},
      {href:'/application-process/',label:'Application Process'},
      {href:'/maintenance-and-reapplication/',label:'Maintenance & Reapplication'},
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
        toggle.setAttribute('aria-label',`Toggle ${item.label} submenu`);
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
    menuToggle.innerHTML='<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">Menu</span>';
    menuToggle.setAttribute('aria-label','Open menu');
  }
  if(menuToggle&&mobileNav){
    menuToggle.addEventListener('click',()=>mobileNav.classList.toggle('open'));
  }
  document.querySelectorAll('.nav a,.mobile-nav a').forEach(a=>{
    a.addEventListener('click',()=>mobileNav&&mobileNav.classList.remove('open'));
  });

  const heroImageMap={
    '/documentation/':'/assets/img/vitacoat-documentation-panel.svg',
    '/technical-support/':'/assets/img/vitacoat-technical-support-panel.svg',
    '/contact/':'/assets/img/vitacoat-contact-panel.svg'
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
    if(prefersReducedMotion){
      el.textContent=raw;
      el.dataset.animated='true';
      return;
    }
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
      if(prefersReducedMotion){
        el.style.width=target;
      }else{
        el.style.width='0%';
        requestAnimationFrame(()=>{el.style.width=target;});
      }
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
  topButton.setAttribute('aria-label','Back to the top of the page');
  topButton.innerHTML='<span aria-hidden="true">↑</span><span>Back to top</span>';
  document.body.appendChild(topButton);
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:prefersReducedMotion?'auto':'smooth'}));

  let lastY=window.scrollY;
  let ticking=false;
  let hideTimeoutId=null;
  const showTopButton=()=>{
    if(hideTimeoutId){
      clearTimeout(hideTimeoutId);
      hideTimeoutId=null;
    }
    topButton.classList.add('is-visible');
  };
  const hideTopButtonNow=()=>{
    if(hideTimeoutId){
      clearTimeout(hideTimeoutId);
      hideTimeoutId=null;
    }
    topButton.classList.remove('is-visible');
  };
  const scheduleHideTopButton=()=>{
    if(hideTimeoutId) clearTimeout(hideTimeoutId);
    hideTimeoutId=window.setTimeout(()=>{
      topButton.classList.remove('is-visible');
      hideTimeoutId=null;
    },2000);
  };
  const updateTopButton=()=>{
    const currentY=window.scrollY;
    const isMobile=window.innerWidth<=860;
    const scrollingUp=currentY<lastY-6;
    const farEnough=currentY>280;
    if(isMobile&&farEnough&&scrollingUp){
      showTopButton();
    }else if(!isMobile||!farEnough){
      hideTopButtonNow();
    }else{
      scheduleHideTopButton();
    }
    lastY=currentY;
    ticking=false;
  };
  window.addEventListener('scroll',()=>{
    if(!ticking){
      window.requestAnimationFrame(updateTopButton);
      ticking=true;
    }
  },{passive:true});
  window.addEventListener('resize',updateTopButton);
  updateTopButton();

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){
    icon=document.createElement('link');
    icon.rel='icon';
    icon.type='image/svg+xml';
    document.head.appendChild(icon);
  }
  icon.href='/assets/img/vitacoat-favicon.svg';
});