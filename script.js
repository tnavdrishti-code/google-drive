const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');
const ctaForm = document.querySelector('.cta-form');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!nav.contains(target) && !menuToggle.contains(target)) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (ctaForm) {
  ctaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = ctaForm.querySelector('button');
    if (button) {
      button.textContent = 'Thanks! We\'ll contact you soon.';
      button.setAttribute('disabled', 'true');
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((section) => observer.observe(section));
} else {
  revealElements.forEach((section) => section.classList.add('is-visible'));
}
