// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { hamburger?.classList.remove('open'); navLinks?.classList.remove('open'); });
});

// Back to top
const btt = document.getElementById('backTop');
window.addEventListener('scroll', () => { btt?.classList.toggle('show', window.scrollY > 400); }, { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Donate amount buttons
document.querySelectorAll('.amt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById('donateAmount');
    if (el) el.value = btn.dataset.amount;
  });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight);
  });
}, { passive: true });

// Scroll-reveal animations (auto-applied — no HTML changes needed)
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements that should animate on their own
  const soloSelectors = [
    '.section-tag', '.section-title', '.section-sub',
    '.two-col > *', '.info-photo', '.info-block .container > *',
    '.prabhupada-photo', '.prabhupada-text',
    '.ratha-badge', '.ratha-detail',
    '.involved-photo', '.involved-overlay', '.inv-icon-item',
    '.schedule-subhead', '.meet-link-box',
    '.contact-info', '.map-box', '.qr-panel', '.donate-form-box',
    '.footer-col'
  ];
  // Containers whose direct children animate in a staggered sequence
  const staggerContainers = [
    '.gather-grid', '.host-grid', '.poster-grid', '.deities-grid',
    '.events-grid', '.gallery-grid', '.schedule-grid', '.features-row',
    '.ratha-details', '.involved-icons'
  ];

  const toReveal = new Set();

  document.querySelectorAll(soloSelectors.join(',')).forEach(el => {
    el.classList.add('reveal');
    toReveal.add(el);
  });

  staggerContainers.forEach(sel => {
    document.querySelectorAll(sel).forEach(container => {
      Array.from(container.children).forEach((child, i) => {
        child.classList.add('reveal');
        child.style.setProperty('--i', i % 6); // cap delay so long lists don't lag
        toReveal.add(child);
      });
    });
  });

  if (reduce || !('IntersectionObserver' in window)) {
    toReveal.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  toReveal.forEach(el => observer.observe(el));
})();
