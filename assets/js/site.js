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
  const mobileNavContainer=document.querySelector('.mobile-nav .container');

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
      const a=document.createElement('a');
      a.href=item.href;
      a.textContent=item.label;
      if(item.active(currentPath)) a.classList.add('active');
      mobileNavContainer.appendChild(a);
      if(submenus[item.href]){
        submenus[item.href].forEach(subitem=>{
          const sub=document.createElement('a');
          sub.href=subitem.href;
          sub.textContent='— '+subitem.label;
          sub.className='mobile-subnav-link';
          if(currentPath===subitem.href) sub.classList.add('active-sub');
          mobileNavContainer.appendChild(sub);
        });
      }
    });
  };

  buildDesktopNav();
  buildMobileNav();

  const t=document.querySelector('.menu-toggle');
  const m=document.querySelector('.mobile-nav');
  if(t&&m){t.addEventListener('click',()=>m.classList.toggle('open'));}
  document.querySelectorAll('.nav a,.mobile-nav a').forEach(a=>{a.addEventListener('click',()=>m&&m.classList.remove('open'));});

  const heroImageMap={
    '/documentation/':'/assets/img/vitacoat-documentation-panel.svg',
    '/technical-support/':'/assets/img/vitacoat-technical-support-panel.svg',
    '/contact/':'/assets/img/vitacoat-contact-panel.svg'
  };
  const heroImg=document.querySelector('.hero-media img');
  if(heroImg&&heroImageMap[currentPath]) heroImg.src=heroImageMap[currentPath];

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){
    icon=document.createElement('link');
    icon.rel='icon';
    icon.type='image/svg+xml';
    document.head.appendChild(icon);
  }
  icon.href='/assets/img/vitacoat-favicon.svg';
});