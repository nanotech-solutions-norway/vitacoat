document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  const closeMobileMenu = () => {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('mobile-menu-open', open);
    });

    mobileNav.querySelectorAll('.mobile-subnav-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('.mobile-nav-group');
        if (!group) return;
        const open = !group.classList.contains('open');
        mobileNav.querySelectorAll('.mobile-nav-group.open').forEach(other => {
          if (other !== group) {
            other.classList.remove('open');
            other.querySelector('.mobile-subnav-toggle')?.setAttribute('aria-expanded', 'false');
          }
        });
        group.classList.toggle('open', open);
        button.setAttribute('aria-expanded', String(open));
      });
    });

    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMobileMenu(); });
  }

  const closeTimers = new WeakMap();
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const open = () => {
      clearTimeout(closeTimers.get(dropdown));
      dropdown.classList.add('is-open');
    };
    const close = () => {
      clearTimeout(closeTimers.get(dropdown));
      closeTimers.set(dropdown, setTimeout(() => dropdown.classList.remove('is-open'), 180));
    };
    dropdown.addEventListener('pointerenter', open);
    dropdown.addEventListener('pointerleave', close);
    dropdown.addEventListener('focusin', open);
    dropdown.addEventListener('focusout', event => {
      if (!dropdown.contains(event.relatedTarget)) close();
    });
  });

  const revealTargets = [...document.querySelectorAll('main > .section, .bar-group')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach(el => el.classList.add('reveal-ready'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('.bar-group').forEach(group => {
    if (!group.classList.contains('is-visible') && !('IntersectionObserver' in window)) group.classList.add('is-visible');
  });
});