document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.menu-toggle');
  const m=document.querySelector('.mobile-nav');
  if(t&&m){t.addEventListener('click',()=>m.classList.toggle('open'));}
  document.querySelectorAll('.nav a,.mobile-nav a').forEach(a=>{a.addEventListener('click',()=>m&&m.classList.remove('open'));});

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
  if(desktopNav){
    Object.entries(submenus).forEach(([href,items])=>{
      const link=desktopNav.querySelector(`a[href="${href}"]`);
      if(!link||link.closest('.nav-dropdown')) return;
      const dropdown=document.createElement('div');
      dropdown.className='nav-dropdown';
      const parent=link.parentNode;
      parent.insertBefore(dropdown,link);
      dropdown.appendChild(link);
      const menu=document.createElement('div');
      menu.className='dropdown-menu';
      items.forEach(item=>{
        const a=document.createElement('a');
        a.href=item.href;
        a.textContent=item.label;
        if(window.location.pathname===item.href) a.classList.add('active-sub');
        menu.appendChild(a);
      });
      dropdown.appendChild(menu);
    });
  }

  if(m){
    Object.entries(submenus).forEach(([href,items])=>{
      const link=m.querySelector(`a[href="${href}"]`);
      if(!link||link.dataset.submenuBound==='true') return;
      link.dataset.submenuBound='true';
      items.slice(1).forEach(item=>{
        const a=document.createElement('a');
        a.href=item.href;
        a.textContent='— '+item.label;
        a.className='mobile-subnav-link';
        if(window.location.pathname===item.href) a.classList.add('active-sub');
        link.insertAdjacentElement('afterend',a);
      });
    });
  }

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){
    icon=document.createElement('link');
    icon.rel='icon';
    icon.type='image/svg+xml';
    document.head.appendChild(icon);
  }
  icon.href='/assets/img/vitacoat-favicon.svg';
});