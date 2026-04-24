document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname;
  const isEn=path.startsWith('/en/');
  const noPath=isEn ? (path.replace(/^\/en/,'')||'/') : path;
  const enPath='/en/';
  document.documentElement.lang=isEn?'en':'nb-NO';

  const r=isEn?{
    home:'/en/',applications:'/applications/',documentation:'/documentation/',technicalSupport:'/technical-support/',contact:'/contact/',how:'/how-it-works/',healthcare:'/applications/healthcare/',food:'/applications/food-processing/',publicFacilities:'/applications/public-facilities/',education:'/applications/education-and-offices/',electronics:'/applications/electronics-and-touchpoints/'
  }:{
    home:'/',applications:'/applications/',documentation:'/documentation/',technicalSupport:'/technical-support/',contact:'/contact/',how:'/how-it-works/',healthcare:'/applications/healthcare/',food:'/applications/food-processing/',publicFacilities:'/applications/public-facilities/',education:'/applications/education-and-offices/',electronics:'/applications/electronics-and-touchpoints/'
  };

  const nav=isEn?[
    ['Home',r.home,p=>p===r.home],['Applications',r.applications,p=>p.startsWith('/applications/')],['Documentation',r.documentation,p=>p.startsWith('/documentation/')||p.includes('/benefits/')||p.includes('/proof/')||p.includes('/faq/')],['Technical Support',r.technicalSupport,p=>p.startsWith(r.technicalSupport)],['Contact',r.contact,p=>p.startsWith(r.contact)]
  ]:[
    ['Hjem',r.home,p=>p===r.home],['Bruksområder',r.applications,p=>p.startsWith('/applications/')],['Dokumentasjon',r.documentation,p=>p.startsWith('/documentation/')||p.startsWith('/benefits/')||p.startsWith('/proof/')||p.startsWith('/faq/')||p.startsWith('/application-process/')||p.startsWith('/maintenance-and-reapplication/')],['Teknisk støtte',r.technicalSupport,p=>p.startsWith(r.technicalSupport)],['Kontakt',r.contact,p=>p.startsWith(r.contact)]
  ];

  const sub=isEn?{
    [r.applications]:[['Healthcare',r.healthcare],['Food Processing',r.food],['Public Facilities',r.publicFacilities],['Education & Offices',r.education],['Electronics & Touchpoints',r.electronics]],
    [r.documentation]:[['Documentation Center',r.documentation],['How it Works',r.how],['FAQ','/faq/']]
  }:{
    [r.applications]:[['Helse',r.healthcare],['Næringsmiddelindustri',r.food],['Offentlige miljøer',r.publicFacilities],['Skole og kontor',r.education],['Elektronikk og kontaktpunkter',r.electronics]],
    [r.documentation]:[['Dokumentasjonssenter',r.documentation],['Hvordan det fungerer',r.how],['Vedvarende beskyttelse','/benefits/continuous-protection/'],['Enklere rengjøring','/benefits/easier-cleaning/'],['Overflatekompatibilitet','/benefits/surface-compatibility/'],['Testing og standarder','/proof/testing-and-standards/'],['Holdbarhet','/proof/durability/'],['Sikkerhet og miljø','/proof/safety-and-environment/'],['Patogenspekter','/proof/pathogen-spectrum/'],['Applikasjonsprosess','/application-process/'],['Vedlikehold og reapplikasjon','/maintenance-and-reapplication/'],['FAQ','/faq/']]
  }};

  const langSwitch=()=>{
    const w=document.createElement('div');w.className='language-switcher';
    const lab=document.createElement('span');lab.className='language-switcher-label';lab.textContent=isEn?'Language':'Språk';w.appendChild(lab);
    [['NO',noPath,!isEn,'no'],['EN',enPath,isEn,'en']].forEach(([txt,href,active,code])=>{const a=document.createElement('a');a.href=href;a.textContent=txt;a.className='language-link'+(active?' active-lang':'');a.setAttribute('hreflang',code);a.addEventListener('click',()=>{try{localStorage.setItem('vitacoat-language',code==='no'?'no':'en');localStorage.setItem('vitacoat-language-initialized','true')}catch(e){}});w.appendChild(a)});
    return w;
  };

  const desktop=document.querySelector('.nav');
  if(desktop){desktop.innerHTML='';nav.forEach(([label,href,active])=>{if(sub[href]){const dd=document.createElement('div');dd.className='nav-dropdown';const top=document.createElement('a');top.href=href;top.textContent=label;if(active(path))top.classList.add('active');dd.appendChild(top);const menu=document.createElement('div');menu.className='dropdown-menu';sub[href].forEach(([sl,sh])=>{const a=document.createElement('a');a.href=sh;a.textContent=sl;if(path===sh)a.classList.add('active-sub');menu.appendChild(a)});dd.appendChild(menu);desktop.appendChild(dd)}else{const a=document.createElement('a');a.href=href;a.textContent=label;if(active(path))a.classList.add('active');desktop.appendChild(a)}})}

  const headerInner=document.querySelector('.header-inner');
  const menuToggle=document.querySelector('.menu-toggle');
  if(headerInner&&!headerInner.querySelector('.language-switcher')) headerInner.insertBefore(langSwitch(),menuToggle||null);
  if(menuToggle){menuToggle.innerHTML=`<span class="hamburger-icon" aria-hidden="true">☰</span><span class="sr-only">${isEn?'Menu':'Meny'}</span>`;menuToggle.setAttribute('aria-label',isEn?'Open menu':'Åpne meny')}

  const mobile=document.querySelector('.mobile-nav');const mobc=document.querySelector('.mobile-nav .container');
  if(mobc){mobc.innerHTML='';const ml=langSwitch();ml.classList.add('mobile-language-switcher');mobc.appendChild(ml);nav.forEach(([label,href,active])=>{const g=document.createElement('div');g.className='mobile-nav-group';const row=document.createElement('div');row.className='mobile-nav-row';const a=document.createElement('a');a.href=href;a.textContent=label;a.className='mobile-main-link';if(active(path))a.classList.add('active');row.appendChild(a);if(sub[href]){const b=document.createElement('button');b.type='button';b.className='mobile-subnav-toggle';b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',isEn?`Show submenu for ${label}`:`Vis undermeny for ${label}`);b.innerHTML='<span aria-hidden="true">›</span>';row.appendChild(b);const sm=document.createElement('div');sm.className='mobile-subnav';sub[href].forEach(([sl,sh])=>{const s=document.createElement('a');s.href=sh;s.textContent=sl;s.className='mobile-subnav-link';if(path===sh)s.classList.add('active-sub');sm.appendChild(s)});g.appendChild(row);g.appendChild(sm);b.addEventListener('click',e=>{e.preventDefault();g.classList.toggle('open');b.setAttribute('aria-expanded',g.classList.contains('open')?'true':'false')})}else g.appendChild(row);mobc.appendChild(g)})}
  if(menuToggle&&mobile)menuToggle.addEventListener('click',()=>mobile.classList.toggle('open'));
  document.querySelectorAll('.nav a,.mobile-nav a').forEach(a=>a.addEventListener('click',()=>mobile&&mobile.classList.remove('open')));

  const heroMap={
    '/':'/assets/img/vitacoat-antimicrobial-hero.svg','/en/':'/assets/img/vitacoat-antimicrobial-hero.svg','/applications/':'/assets/img/vitacoat-applications-panel.svg','/applications/healthcare/':'/assets/img/vitacoat-healthcare-application.svg','/applications/food-processing/':'/assets/img/vitacoat-food-processing-application.svg','/applications/public-facilities/':'/assets/img/vitacoat-public-facilities-application.svg','/applications/education-and-offices/':'/assets/img/vitacoat-education-offices-application.svg','/applications/electronics-and-touchpoints/':'/assets/img/vitacoat-electronics-touchpoints-application.svg','/documentation/':'/assets/img/vitacoat-documentation-panel.svg','/technical-support/':'/assets/img/vitacoat-technical-support-panel.svg','/faq/':'/assets/img/vitacoat-home-panel.svg','/application-process/':'/assets/img/vitacoat-documentation-panel.svg','/maintenance-and-reapplication/':'/assets/img/vitacoat-documentation-panel.svg','/how-it-works/':'/assets/img/vitacoat-home-panel.svg','/benefits/continuous-protection/':'/assets/img/vitacoat-home-panel.svg','/benefits/easier-cleaning/':'/assets/img/vitacoat-home-panel.svg','/proof/testing-and-standards/':'/assets/img/vitacoat-documentation-panel.svg','/proof/durability/':'/assets/img/vitacoat-documentation-panel.svg','/proof/safety-and-environment/':'/assets/img/vitacoat-documentation-panel.svg','/proof/pathogen-spectrum/':'/assets/img/vitacoat-documentation-panel.svg','/contact/':'/assets/img/vitacoat-technical-support-panel.svg'
  };
  const h=document.querySelector('.hero-media img');if(h&&heroMap[path])h.src=heroMap[path];
  const cardMap={'Healthcare':'/assets/img/vitacoat-healthcare-application.svg','Helse':'/assets/img/vitacoat-healthcare-application.svg','Food processing':'/assets/img/vitacoat-food-processing-application.svg','Næringsmiddelindustri':'/assets/img/vitacoat-food-processing-application.svg','Public facilities':'/assets/img/vitacoat-public-facilities-application.svg','Offentlige miljøer':'/assets/img/vitacoat-public-facilities-application.svg','Education & offices':'/assets/img/vitacoat-education-offices-application.svg','Education & Offices':'/assets/img/vitacoat-education-offices-application.svg','Skole og kontor':'/assets/img/vitacoat-education-offices-application.svg','Electronics & Touchpoints':'/assets/img/vitacoat-electronics-touchpoints-application.svg','Elektronikk og kontaktpunkter':'/assets/img/vitacoat-electronics-touchpoints-application.svg'};
  document.querySelectorAll('.apps .card').forEach(card=>{const title=(card.querySelector('h3')||{}).textContent||'';const img=card.querySelector('img');if(img&&cardMap[title.trim()])img.src=cardMap[title.trim()]});

  document.querySelectorAll('.site-footer .footer-grid').forEach(f=>{if(f.querySelector('.footer-language'))return;const box=document.createElement('div');box.className='footer-language';box.appendChild(langSwitch());f.firstElementChild?f.firstElementChild.appendChild(box):f.appendChild(box)});

  const top=document.createElement('button');top.type='button';top.className='mobile-top-button';top.setAttribute('aria-label',isEn?'Back to the top of the page':'Til toppen av siden');top.innerHTML=isEn?'<span aria-hidden="true">↑</span><span>Back to top</span>':'<span aria-hidden="true">↑</span><span>Til toppen</span>';document.body.appendChild(top);top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));let last=scrollY,timer=null;const update=()=>{const y=scrollY;if(innerWidth<=860&&y>280&&y<last-6){top.classList.add('is-visible');clearTimeout(timer);timer=setTimeout(()=>top.classList.remove('is-visible'),2000)}else if(innerWidth>860||y<=280)top.classList.remove('is-visible');last=y};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
});