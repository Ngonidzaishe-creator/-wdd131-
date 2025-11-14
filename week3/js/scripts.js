/* ---------- Interactivity: dark mode, modal gallery, wind chill, nav ---------- */

const STATIC_TEMP_C = 8;
const STATIC_WIND_KMH = 20;

function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}
function formatWC(value) {
  return `${Math.round(value * 10) / 10} °C`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Footer info
  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.getElementById('last-modified').textContent = document.lastModified || '—';

  // Weather demo values
  document.getElementById('temp').textContent = `${STATIC_TEMP_C} °C`;
  document.getElementById('wind').textContent = `${STATIC_WIND_KMH} km/h`;

  const wcElem = document.getElementById('wind-chill');
  if (STATIC_TEMP_C <= 10 && STATIC_WIND_KMH > 4.8) {
    wcElem.textContent = formatWC(calculateWindChill(STATIC_TEMP_C, STATIC_WIND_KMH));
  } else {
    wcElem.textContent = 'N/A';
  }

  // Dark mode - use localStorage to remember
  const root = document.documentElement;
  const darkToggle = document.getElementById('dark-toggle');
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (current === 'dark') root.setAttribute('data-theme', 'dark');

  darkToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkToggle.setAttribute('aria-pressed', 'false');
      darkToggle.textContent = '🌙';
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkToggle.setAttribute('aria-pressed', 'true');
      darkToggle.textContent = '☀️';
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-full');
      modalImg.src = src;
      modalImg.alt = btn.querySelector('img').alt || '';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.top-nav a').forEach(a => {
    a.addEventListener('click', (evt) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        evt.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

});
