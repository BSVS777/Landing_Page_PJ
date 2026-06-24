// main.js — v3
// Organización: una sola IIFE con funciones nombradas, sin módulos externos.
// Orden: configuración -> utilidades -> init* por feature -> init() final.
(function () {
  'use strict';

  /* =============================================
     CONFIGURACIÓN
     ============================================= */

  const THEME_STORAGE_KEY = 'tema';
  const A11Y_STORAGE_KEY = 'accesibilidad';
  const DESKTOP_BREAKPOINT = 768;
  const WHATSAPP_NUMBER = '50687131710';
  const DARK_CLASS = 'dark-theme';

  const NAV_SECTION_IDS = [
    'nosotros',
    'primer-paso',
    'actividades',
    'testimonios',
    'ubicacion',
    'faq',
    'contacto'
  ];

  /* =============================================
     UTILIDADES
     ============================================= */

  // Wrapper de localStorage: nunca debe romper el script si el storage
  // está bloqueado (modo privado, permisos del navegador, cuota, etc.).
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  // Un elemento cuenta como "visible" si no está oculto vía display:none.
  // offsetParent es null tanto para display:none como para elementos con
  // position:fixed (p. ej. .main-nav en mobile), así que no alcanza solo
  // con eso: se confirma con getComputedStyle().display !== 'none', que es
  // el chequeo explícitamente pedido para no depender de un detalle de
  // layout que varía con position. Se usa tanto por el focus trap del menú
  // y del panel como por el cálculo de aria-current, para que ninguno de
  // los dos actúe sobre enlaces ocultos por CSS en el breakpoint actual.
  function isVisible(el) {
    if (getComputedStyle(el).display === 'none') return false;
    return !!el.offsetParent || el.getClientRects().length > 0;
  }

  function getFocusableElements(container) {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector)).filter(isVisible);
  }

  // Helper de foco reutilizado por el menú móvil y el panel de accesibilidad:
  // guarda el elemento con foco antes de abrir un overlay, y lo restaura al
  // cerrarlo (salvo que el llamador decida explícitamente no hacerlo, p. ej.
  // cuando el cierre del menú es por click en un link de navegación).
  function createFocusMemory() {
    let savedElement = null;
    return {
      save() {
        savedElement = document.activeElement;
      },
      restore() {
        if (savedElement && typeof savedElement.focus === 'function') {
          savedElement.focus();
        }
        savedElement = null;
      }
    };
  }

  /* =============================================
     TEMA
     ============================================= */

  function initTheme() {
    const themeSwitch = document.getElementById('switch');

    function applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.classList.toggle(DARK_CLASS, isDark);
      // El anti-FOUC inline del <head> aplicó la clase sobre <html> antes de
      // pintar; una vez que el body existe, la mecánica en tiempo de
      // ejecución vive solo en <body> y se limpia la marca temporal de <html>.
      document.documentElement.classList.remove(DARK_CLASS);
      if (themeSwitch) themeSwitch.checked = isDark;
    }

    applyTheme(storage.get(THEME_STORAGE_KEY) || 'light');

    if (themeSwitch) {
      themeSwitch.addEventListener('change', function () {
        const isDark = themeSwitch.checked;
        document.body.classList.toggle(DARK_CLASS, isDark);
        storage.set(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
      });
    }
  }

  /* =============================================
     PANEL DE ACCESIBILIDAD
     ============================================= */

  function initAccessibilityPanel(focusMemory) {
    const toggle = document.getElementById('a11y-panel-toggle');
    const panel = document.getElementById('a11y-panel');
    if (!toggle || !panel) return;

    const closeBtn = document.getElementById('a11y-panel-close');
    const contrastInput = document.getElementById('a11y-contrast');
    const reduceMotionInput = document.getElementById('a11y-reduce-motion');
    const underlineInput = document.getElementById('a11y-underline-links');
    const scaleButtons = Array.from(panel.querySelectorAll('.a11y-scale-btn'));
    const resetBtn = document.getElementById('a11y-reset');

    const TEXT_SCALE_CLASSES = {
      '100': '',
      '115': 'a11y-text-115',
      '130': 'a11y-text-130'
    };

    function defaultPrefs() {
      return {
        contraste: false,
        escalaTexto: '100',
        reducirAnimacion: false,
        subrayarEnlaces: false
      };
    }

    function readPrefs() {
      const raw = storage.get(A11Y_STORAGE_KEY);
      if (!raw) return defaultPrefs();
      try {
        const parsed = JSON.parse(raw);
        return Object.assign(defaultPrefs(), parsed);
      } catch (e) {
        return defaultPrefs();
      }
    }

    function writePrefs(prefs) {
      storage.set(A11Y_STORAGE_KEY, JSON.stringify(prefs));
    }

    function applyPrefs(prefs) {
      document.body.classList.toggle('a11y-high-contrast', !!prefs.contraste);
      document.body.classList.toggle('a11y-reduce-motion', !!prefs.reducirAnimacion);
      document.body.classList.toggle('a11y-underline-links', !!prefs.subrayarEnlaces);

      // Las clases de escala van en <html>, no en <body>: "rem" siempre se
      // resuelve contra el font-size del elemento raíz (ver css/styles.css,
      // bloque ACCESIBILIDAD/UTILIDADES) — aplicarlas en body no escalaba
      // nada porque casi toda la tipografía del sitio usa rem.
      Object.keys(TEXT_SCALE_CLASSES).forEach(function (scale) {
        const cls = TEXT_SCALE_CLASSES[scale];
        if (cls) document.documentElement.classList.remove(cls);
      });
      const activeScaleClass = TEXT_SCALE_CLASSES[prefs.escalaTexto];
      if (activeScaleClass) document.documentElement.classList.add(activeScaleClass);

      if (contrastInput) contrastInput.checked = !!prefs.contraste;
      if (reduceMotionInput) reduceMotionInput.checked = !!prefs.reducirAnimacion;
      if (underlineInput) underlineInput.checked = !!prefs.subrayarEnlaces;
      scaleButtons.forEach(function (btn) {
        const isActive = btn.dataset.scale === prefs.escalaTexto;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    let prefs = readPrefs();
    applyPrefs(prefs);

    function updatePrefs(partial) {
      prefs = Object.assign({}, prefs, partial);
      writePrefs(prefs);
      applyPrefs(prefs);
    }

    function openPanel() {
      focusMemory.save();
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar panel de accesibilidad');
      const focusable = getFocusableElements(panel);
      if (focusable.length) focusable[0].focus();
    }

    // restoreFocus=false se usa al cerrar por click fuera del panel: ese
    // click puede caer sobre otro control interactivo de la página (p. ej.
    // un link del menú móvil si ambos overlays están abiertos a la vez), y
    // no se debe robarle el foco a lo que el usuario acaba de tocar.
    function closePanel(restoreFocus) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir panel de accesibilidad');
      if (restoreFocus !== false) {
        focusMemory.restore();
      }
    }

    toggle.addEventListener('click', function () {
      if (panel.hidden) {
        openPanel();
      } else {
        closePanel();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        closePanel();
      }
    });

    // Cierre al hacer click fuera del panel (y fuera del botón que lo abre).
    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      closePanel(false);
    });

    // Focus trap dentro del panel mientras está abierto.
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || panel.hidden) return;
      const focusable = getFocusableElements(panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    if (contrastInput) {
      contrastInput.addEventListener('change', function () {
        updatePrefs({ contraste: contrastInput.checked });
      });
    }

    if (reduceMotionInput) {
      reduceMotionInput.addEventListener('change', function () {
        updatePrefs({ reducirAnimacion: reduceMotionInput.checked });
      });
    }

    if (underlineInput) {
      underlineInput.addEventListener('change', function () {
        updatePrefs({ subrayarEnlaces: underlineInput.checked });
      });
    }

    scaleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        updatePrefs({ escalaTexto: btn.dataset.scale });
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        storage.remove(A11Y_STORAGE_KEY);
        prefs = defaultPrefs();
        applyPrefs(prefs);
      });
    }
  }

  /* =============================================
     MENÚ MÓVIL
     ============================================= */

  function initMobileMenu(focusMemory) {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.nav-overlay');

    if (!menuToggle || !mainNav) return;

    const desktopMQ = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    function openMenu() {
      focusMemory.save();
      mainNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      if (overlay) overlay.removeAttribute('hidden');
      mainNav.inert = false;
      document.body.style.overflow = 'hidden';
    }

    // restoreFocus=false se usa cuando el cierre viene de un click en un
    // link del nav: ahí el foco debe seguir el comportamiento natural del
    // navegador hacia el ancla de destino, no volver al botón de toggle.
    function closeMenu(restoreFocus) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      if (overlay) overlay.setAttribute('hidden', '');
      if (!desktopMQ.matches) mainNav.inert = true;
      document.body.style.overflow = '';
      if (restoreFocus !== false) {
        focusMemory.restore();
      }
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
      }
    });

    // Focus trap dentro del nav cuando el menú está abierto.
    mainNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mainNav.classList.contains('is-open')) return;
      const focusable = getFocusableElements(mainNav);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    mainNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(false);
      });
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMenu();
      });
    }

    // Initialize inert state: sidebar links must not be reachable while closed on mobile
    if (!desktopMQ.matches) mainNav.inert = true;

    desktopMQ.addEventListener('change', function () {
      if (desktopMQ.matches) {
        mainNav.inert = false;
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu();
        }
      } else if (menuToggle.getAttribute('aria-expanded') !== 'true') {
        mainNav.inert = true;
      }
    });
  }

  /* =============================================
     NAVEGACIÓN ACTIVA
     ============================================= */

  function initActiveNavigation() {
    const mainNav = document.getElementById('main-nav');
    if (!mainNav) return;

    const links = NAV_SECTION_IDS
      .map(function (id) {
        const section = document.getElementById(id);
        const link = mainNav.querySelector('a[href="#' + id + '"]');
        return section && link ? { section: section, link: link } : null;
      })
      .filter(Boolean);

    if (!links.length) return;

    function clearActive() {
      links.forEach(function (entry) {
        entry.link.removeAttribute('aria-current');
      });
    }

    function setActive(sectionId) {
      clearActive();
      const entry = links.find(function (e) { return e.section.id === sectionId; });
      // Si el enlace correspondiente está oculto por CSS en el breakpoint
      // actual (p. ej. "Ubicación" en escritorio), no se le aplica
      // aria-current — no hay enlace activo visible que marcar.
      if (entry && isVisible(entry.link)) {
        entry.link.setAttribute('aria-current', 'location');
      }
    }

    let observer = null;

    function createObserver() {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(function (entries) {
        const visibleEntry = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visibleEntry) {
          setActive(visibleEntry.target.id);
        }
      }, { rootMargin: '-40% 0px -50% 0px' });

      links.forEach(function (entry) {
        observer.observe(entry.section);
      });
    }

    createObserver();

    // Recalcular qué enlace puede recibir aria-current al cambiar de
    // breakpoint, porque la visibilidad de "Tu primer paso", "Ubicación"
    // y "FAQ" depende del CSS en ese punto.
    const desktopMQ = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    desktopMQ.addEventListener('change', function () {
      clearActive();
      createObserver();
    });
  }

  /* =============================================
     FAQ
     ============================================= */

  function initFaqAccordion() {
    const faqList = document.querySelector('.faq-list');
    if (!faqList) return;

    faqList.addEventListener('toggle', function (e) {
      const target = e.target;
      if (!target.matches('.faq-item')) return;
      if (!target.open) return;

      faqList.querySelectorAll('.faq-item[open]').forEach(function (item) {
        if (item !== target) item.open = false;
      });
    }, true);
  }

  /* =============================================
     FORMULARIO DE CONTACTO
     ============================================= */

  function initContactForm() {
    const contactForm = document.querySelector('#contacto form');
    if (!contactForm) return;

    const formFeedback = document.getElementById('form-feedback');
    const nombreInput = contactForm.querySelector('#nombre');
    const telefonoInput = contactForm.querySelector('#telefono');
    const origenSelect = contactForm.querySelector('#como-nos-conociste');

    const fields = [
      {
        input: nombreInput,
        errorEl: document.getElementById('nombre-error'),
        validate: function (value) {
          if (!value.trim()) return 'Ingresá tu nombre.';
          if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
          return '';
        }
      },
      {
        input: telefonoInput,
        errorEl: document.getElementById('telefono-error'),
        validate: function (value) {
          const digits = value.replace(/\D/g, '');
          if (!value.trim()) return 'Ingresá tu teléfono.';
          if (digits.length < 8 || digits.length > 12) return 'Ingresá un teléfono válido (8 dígitos para Costa Rica).';
          return '';
        }
      },
      {
        input: origenSelect,
        errorEl: document.getElementById('como-nos-conociste-error'),
        validate: function (value) {
          if (!value) return 'Seleccioná una opción.';
          return '';
        }
      }
    ];

    function setFieldError(field, message) {
      field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (field.errorEl) field.errorEl.textContent = message;
    }

    function validateAll() {
      let firstInvalid = null;
      fields.forEach(function (field) {
        const message = field.validate(field.input.value);
        setFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field.input;
      });
      return firstInvalid;
    }

    const origenLabels = {
      'redes-sociales': 'redes sociales',
      'amigo': 'un amigo o familiar',
      'parroquia': 'la parroquia',
      'otro': 'otro medio'
    };

    function buildWhatsappUrl() {
      const nombre = nombreInput.value.trim();
      const telefono = telefonoInput.value.trim();
      const origen = origenSelect.value;
      const origenTexto = origenLabels[origen] || 'otro medio';
      const telefonoTexto = telefono ? ` Mi teléfono es ${telefono}.` : '';

      const mensaje =
        `Hola, soy ${nombre}. Me gustaría participar en la Pastoral Juvenil San Martín de Porres.` +
        `${telefonoTexto} Los conocí por ${origenTexto}.`;

      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    }

    function showBlockedPopupFeedback(url) {
      if (!formFeedback) return;
      formFeedback.innerHTML = '';
      formFeedback.append('Tu navegador bloqueó la ventana de WhatsApp. ');
      const manualLink = document.createElement('a');
      manualLink.href = url;
      manualLink.target = '_blank';
      manualLink.rel = 'noopener noreferrer';
      manualLink.className = 'form-feedback-manual-link';
      manualLink.textContent = 'Abrir WhatsApp manualmente';
      formFeedback.append(manualLink);
      formFeedback.focus();
    }

    function showSuccessFeedback() {
      if (!formFeedback) return;
      formFeedback.textContent = '¡Listo! Si WhatsApp no se abrió automáticamente, escribinos directamente.';
      formFeedback.focus();
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstInvalid = validateAll();
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const url = buildWhatsappUrl();

      // window.open puede lanzar en vez de devolver null (algunas
      // extensiones/políticas corporativas interceptan la llamada) — se
      // trata igual que un popup bloqueado en vez de dejar el formulario
      // sin ninguna respuesta visible.
      let popup = null;
      try {
        popup = window.open(url, '_blank', 'noopener,noreferrer');
      } catch (err) {
        showBlockedPopupFeedback(url);
        return;
      }

      // Verificación en dos pasos: null inmediato cubre el bloqueo más
      // común; el chequeo de popup.closed tras un pequeño delay cubre
      // navegadores que abren la ventana y la cierran solos al bloquearla.
      if (!popup) {
        showBlockedPopupFeedback(url);
        return;
      }

      setTimeout(function () {
        let isClosed = true;
        try {
          isClosed = popup.closed;
        } catch (err) {
          isClosed = true;
        }

        if (isClosed) {
          showBlockedPopupFeedback(url);
        } else {
          contactForm.reset();
          fields.forEach(function (field) { setFieldError(field, ''); });
          showSuccessFeedback();
        }
      }, 300);
    });
  }

  /* =============================================
     CONTROLES FLOTANTES — idle/opacidad + scroll suave del CTA
     ============================================= */

  // Helper compartido: true si el usuario pide menos movimiento, ya sea por
  // preferencia del sistema o por el switch manual del panel de accesibilidad.
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.body.classList.contains('a11y-reduce-motion');
  }

  // Atenúa los controles flotantes (.a11y-toggle, .btn-fab) tras ~3s sin
  // scroll, y los devuelve a opacidad plena ante scroll/foco/touch. Nunca
  // llega a 0 (mínimo 0.6) ni toca pointer-events — el control siempre es
  // clickeable. Un solo listener de scroll en window, throttled con
  // requestAnimationFrame; un solo setTimeout reutilizado.
  function initFloatingControls() {
    const controls = document.querySelectorAll('.floating-control');
    if (!controls.length) return;

    let idleTimeout = null;
    let ticking = false;

    function setIdle(isIdle) {
      controls.forEach(function (control) {
        control.classList.toggle('is-idle', isIdle);
      });
    }

    function scheduleIdle() {
      setIdle(false);
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(function () {
        setIdle(true);
      }, 3000);
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          scheduleIdle();
          ticking = false;
        });
      }
    }, { passive: true });

    controls.forEach(function (control) {
      control.addEventListener('focus', scheduleIdle, true);
      control.addEventListener('mouseenter', scheduleIdle);
      control.addEventListener('touchstart', scheduleIdle, { passive: true });
    });

    scheduleIdle();
  }

  // Scroll programático para el CTA "Ver ubicación": evita depender de
  // scroll-behavior global en CSS (que no puede condicionarse a
  // body.a11y-reduce-motion sin :has(), evitado en este proyecto). El href
  // nativo sigue funcionando como fallback si este script no corre.
  function initSmoothAnchorScroll() {
    const link = document.querySelector('a[href="#ubicacion"].btn-secondary');
    if (!link) return;

    link.addEventListener('click', function (e) {
      const target = document.getElementById('ubicacion');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }

  // Animación de entrada de .feature-card vía IntersectionObserver, una sola
  // vez por card. Con reduced motion activo (sistema o panel), se omite el
  // observer y se revela todo de inmediato para no depender de un disparo
  // que nunca llega.
  function initScrollReveal() {
    const cards = document.querySelectorAll('.feature-card');
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      cards.forEach(function (card) {
        card.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* =============================================
     INICIALIZACIÓN
     ============================================= */

  function init() {
    // Dos instancias separadas: el menú móvil y el panel de accesibilidad
    // pueden abrirse de forma independiente, cada uno necesita recordar
    // su propio elemento de origen para restaurar el foco correctamente.
    const menuFocusMemory = createFocusMemory();
    const panelFocusMemory = createFocusMemory();

    initTheme();
    initAccessibilityPanel(panelFocusMemory);
    initMobileMenu(menuFocusMemory);
    initActiveNavigation();
    initFaqAccordion();
    initContactForm();
    initSmoothAnchorScroll();
    initScrollReveal();
    initFloatingControls();
  }

  init();
}());
