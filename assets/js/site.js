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

  const animateCounters=()=>{
    document.querySelectorAll('.stat-num').forEach(el=>{
      if(el.dataset.animated==='true') return;
      const raw=el.textContent.trim();
      const match=raw.match(/([\d,.]+)/);
      if(!match) return;
      const numeric=parseFloat(match[1].replace(/,/g,''));
      if(Number.isNaN(numeric)) return;
      const prefix=raw.slice(0,match.index);
      const suffix=raw.slice((match.index||0)+match[1].length);
      const duration=1200;
      const start=performance.now();
      const decimals=Number.isInteger(numeric)?0:1;
      const step=now=>{
        const progress=Math.min((now-start)/duration,1);
        const value=numeric*progress;
        const formatted=(decimals?value.toFixed(decimals):Math.round(value).toString()).replace(/\B(?=(\d{3})+(?!\d))/g,',');
        el.textContent=`${prefix}${formatted}${suffix}`;
        if(progress<1){requestAnimationFrame(step);}else{el.textContent=raw;el.dataset.animated='true';}
      };
      el.textContent=`${prefix}0${suffix}`;
      requestAnimationFrame(step);
    });
  };

  const animateBars=()=>{
    document.querySelectorAll('.bar-fill').forEach(el=>{
      if(el.dataset.animated==='true') return;
      const target=el.style.width||window.getComputedStyle(el).width;
      el.dataset.targetWidth=target;
      el.style.width='0%';
      requestAnimationFrame(()=>{el.style.width=el.dataset.targetWidth;});
      el.dataset.animated='true';
    });
  };

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el=entry.target;
      el.classList.add('is-visible');
      if(el.classList.contains('bar-group')) animateBars();
      if(el.querySelector('.stat-num')) animateCounters();
      observer.unobserve(el);
    });
  },{threshold:.18});

  document.querySelectorAll('.card,.panel,.cta-band,.table-wrap,.callout,.bar-group,.timeline').forEach(el=>{
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){
    icon=document.createElement('link');
    icon.rel='icon';
    icon.type='image/svg+xml';
    document.head.appendChild(icon);
  }
  icon.href='/assets/img/vitacoat-favicon.svg';
});