// scripts.js
// Vanilla JS: windchill, toggles, gallery modal, footer metadata

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle: persist in localStorage
  const themeToggle = document.getElementById('dark-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('site-theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
      localStorage.setItem('site-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
      localStorage.setItem('site-theme', 'dark');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Gallery modal (simple)
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const full = btn.dataset.full;
      modalImg.src = full;
      modalImg.alt = btn.querySelector('img').alt || '';
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      modalClose.focus();
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    modalImg.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Footer metadata
  document.getElementById('current-year').textContent = new Date().getFullYear();
  // lastModified from DOM (document.lastModified)
  document.getElementById('last-modified').textContent = document.lastModified || 'Unknown';

  // Windchill: static demo values (change these values if you update markup)
  // These should match the values shown in the weather card
  const tempEl = document.getElementById('temp');
  const windEl = document.getElementById('wind');
  const windChillEl = document.getElementById('wind-chill');

  // static demo inputs (Celsius and km/h)
  const T = 10;     // degrees Celsius (static demo)
  const V = 20;     // km/h (static demo)

  tempEl.textContent = `${T} °C`;
  windEl.textContent = `${V} km/h`;

  // calculateWindChill must be one line returning the formula (Celsius version)
  // Formula: 13.12 + 0.6215*T - 11.37*(V*0.16) + 0.3965*T(V**0.16)
  function calculateWindChill(tempC, windKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
  }

  // Viable Wind Chill check (metric):
  // Temperature <= 10 °C and Wind speed > 4.8 km/h
  if (T <= 10 && V > 4.8) {
    const wc = calculateWindChill(T, V);
    // round reasonably to 1 decimal
    windChillEl.textContent = `${Math.round(wc * 10) / 10} °C`;
  } else {
    windChillEl.textContent = 'N/A';
  }
});