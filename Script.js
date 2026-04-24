console.log("JavaScript is connected!"); 
/* ============================================================
   Script.js  —  Mental Health for Students
   Handles: Navigation menu (hamburger) + Dark / Light mode
   ============================================================ */

/* ── 1. DOM references ────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');      // hamburger button
const navMenu     = document.getElementById('nav-menu');       // <ul> nav list
const themeToggle = document.getElementById('theme-toggle');   // moon/sun button
const body        = document.body;

/* ── 2. Hamburger / mobile menu ───────────────────────────── */
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close menu when a nav link is clicked (mobile UX)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '☰';
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '☰';
    }
  });
}

/* ── 3. Active nav link highlight ────────────────────────── */
(function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
})();

/* ── 4. Dark / Light mode ─────────────────────────────────── */
const THEME_KEY = 'mh-theme';   // localStorage key

function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.textContent      = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Load saved preference; default to light
const savedTheme = localStorage.getItem(THEME_KEY) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}

/* ── 5. Smooth-scroll for anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 6. Scroll-spy: highlight nav link for visible section ── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('#nav-menu a').forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();