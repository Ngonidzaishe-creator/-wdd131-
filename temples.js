// temples.js
// Handles hamburger toggle and dynamic footer date/lastModified

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  // Toggle function
  function toggleNav() {
    const isOpen = nav.classList.toggle('open');
    // Update aria attributes and hamburger label/icon
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    hamburger.textContent = isOpen ? '✕' : '☰';
  }

  // Only attach if hamburger exists (defensive)
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });

    // Keyboard escape closes nav
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
        hamburger.focus();
      }
    });
  }

  // Footer dynamic year and last modified
  const yearEl = document.getElementById('year');
  const lastModifiedEl = document.getElementById('lastModified');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (lastModifiedEl) {
    const lm = document.lastModified;
    // If document.lastModified is empty or not set, fall back to "Unknown"
    lastModifiedEl.textContent = lm ? lm : 'Unknown';
    // Add machine-readable datetime if possible
    try {
      const dt = lm ? new Date(lm) : null;
      if (dt && !isNaN(dt)) {
        lastModifiedEl.setAttribute('datetime', dt.toISOString());
      }
    } catch (err) {
      // ignore
    }
  }
});
