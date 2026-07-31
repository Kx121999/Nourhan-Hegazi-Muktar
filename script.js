const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navAnchors.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const setActiveNav = () => {
  const y = window.scrollY + 170;
  let current = 'home';
  sections.forEach(section => {
    if (section.offsetTop <= y) current = section.id;
  });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActiveNav, { passive:true });
setActiveNav();

// Animate KPI counters once, while preserving the exact final values.
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    const duration = 900;
    const start = performance.now();
    const frame = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => counterObserver.observe(c));

document.getElementById('year').textContent = new Date().getFullYear();

// Campaign proof lightbox
const proofModal = document.getElementById('proofModal');
const proofModalImage = document.getElementById('proofModalImage');
const proofModalTitle = document.getElementById('proofModalTitle');
const proofCards = document.querySelectorAll('.proof-card');
const proofCloseButtons = document.querySelectorAll('[data-close-proof]');
let lastProofTrigger = null;

const closeProofModal = () => {
  if (!proofModal) return;
  proofModal.classList.remove('open');
  proofModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('proof-open');
  if (proofModalImage) proofModalImage.src = '';
  lastProofTrigger?.focus();
};

proofCards.forEach(card => {
  card.addEventListener('click', () => {
    if (!proofModal || !proofModalImage) return;
    lastProofTrigger = card;
    proofModalImage.src = card.dataset.proof;
    proofModalImage.alt = `${card.dataset.title || 'Campaign'} original result screenshot`;
    if (proofModalTitle) proofModalTitle.textContent = card.dataset.title || 'Campaign Result';
    proofModal.classList.add('open');
    proofModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('proof-open');
    proofModal.querySelector('.proof-modal-close')?.focus();
  });
});

proofCloseButtons.forEach(button => button.addEventListener('click', closeProofModal));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && proofModal?.classList.contains('open')) closeProofModal();
});
