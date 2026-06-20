// main.js — v2
(function () {
  const STORAGE_KEY = 'tema';
  const DARK_CLASS = 'dark-theme';

  // --- Theme switch ---
  const themeSwitch = document.getElementById('switch');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle(DARK_CLASS, isDark);
    if (themeSwitch) themeSwitch.checked = isDark;
  }

  applyTheme(localStorage.getItem(STORAGE_KEY) || 'light');

  if (themeSwitch) {
    themeSwitch.addEventListener('change', function () {
      const isDark = themeSwitch.checked;
      document.body.classList.toggle(DARK_CLASS, isDark);
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    });
  }

  // --- Sidebar menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const overlay = document.querySelector('.nav-overlay');

  if (!menuToggle || !mainNav) return;

  const desktopMQ = window.matchMedia('(min-width: 1024px)');

  function openMenu() {
    mainNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    if (overlay) overlay.removeAttribute('hidden');
    mainNav.inert = false;
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    if (overlay) overlay.setAttribute('hidden', '');
    if (!desktopMQ.matches) mainNav.inert = true;
  }

  menuToggle.addEventListener('click', function () {
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  mainNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Initialize inert state: sidebar links must not be reachable while closed on mobile
  if (!desktopMQ.matches) mainNav.inert = true;

  desktopMQ.addEventListener('change', function () {
    if (desktopMQ.matches) {
      mainNav.inert = false;
    } else if (menuToggle.getAttribute('aria-expanded') !== 'true') {
      mainNav.inert = true;
    }
  });
}());

// --- Contact form → WhatsApp ---
(function () {
  const WHATSAPP_NUMBER = '50687131710';

  const contactForm = document.querySelector('#contacto form');
  if (!contactForm) return;

  const formFeedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = (contactForm.querySelector('#nombre').value || '').trim();
    const telefono = (contactForm.querySelector('#telefono').value || '').trim();
    const origen = contactForm.querySelector('#como-nos-conociste').value;

    const origenLabels = {
      'redes-sociales': 'redes sociales',
      'amigo': 'un amigo o familiar',
      'parroquia': 'la parroquia',
      'otro': 'otro medio'
    };
    const origenTexto = origen
      ? (origenLabels[origen] || 'otro medio')
      : 'un medio no especificado';
    const telefonoTexto = telefono ? ` Mi teléfono es ${telefono}.` : '';

    const mensaje =
      `Hola, soy ${nombre}. Me gustaría participar en la Pastoral Juvenil San Martín de Porres.` +
      `${telefonoTexto} Los conocí por ${origenTexto}.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    contactForm.reset();

    if (formFeedback) {
      formFeedback.textContent = '¡Listo! Si WhatsApp no se abrió automáticamente, escribinos directamente.';
      formFeedback.focus();
    }
  });
}());