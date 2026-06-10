// main.js — Day 4
(function () {
  const STORAGE_KEY = 'tema';
  const DARK_CLASS = 'dark-theme';

  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle(DARK_CLASS, isDark);
    toggle.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }

  // Restore saved preference on load
  applyTheme(localStorage.getItem(STORAGE_KEY) || 'light');

  toggle.addEventListener('click', function () {
    const isDark = document.body.classList.contains(DARK_CLASS);
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}());
