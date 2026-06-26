(function () {
  'use strict';
  const THEME_STORAGE_KEY = 'tema';
  const A11Y_STORAGE_KEY = 'accesibilidad';
  const DESKTOP_BREAKPOINT = 768;
  const WHATSAPP_NUMBER = '50687131710';
  const DARK_CLASS = 'dark-theme';
  const COSTA_RICA_TIME_ZONE = 'America/Costa_Rica';
  const MEETING_START_MINUTES = 18 * 60;
  const MEETING_END_MINUTES = (20 * 60) + 30;
  const MEETING_LOCATION = 'Aulas de Catecismo de la Parroquia San Martín, Ciudad Quesada, San Carlos, Costa Rica';
  const MAPS_URL = 'https://maps.app.goo.gl/7fA8QDrGfb1qNYX98';
  const NAV_SECTION_IDS = [
    'nosotros',
    'primer-paso',
    'actividades',
    'testimonios',
    'ubicacion',
    'faq',
    'contacto'
  ];
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
  function isVisible(el) {
    if (getComputedStyle(el).display === 'none') return false;
    return !!el.offsetParent || el.getClientRects().length > 0;
  }
  function getFocusableElements(container) {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector)).filter(isVisible);
  }
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
  function initTheme() {
    const themeSwitch = document.getElementById('switch');
    function applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.classList.toggle(DARK_CLASS, isDark);
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
    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      closePanel(false);
    });
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
      const focusable = getFocusableElements(mainNav);
      if (focusable.length) focusable[0].focus();
    }
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
    const desktopMQ = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    desktopMQ.addEventListener('change', function () {
      clearActive();
      createObserver();
    });
  }
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
      field.input.classList.toggle('is-valid', !message && !!field.input.value.trim());
      const group = field.input.closest('.form-group');
      if (group) group.classList.toggle('is-valid-group', !message && !!field.input.value.trim());
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
      let popup = null;
      try {
        popup = window.open(url, '_blank', 'noopener,noreferrer');
      } catch (err) {
        showBlockedPopupFeedback(url);
        return;
      }
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
    fields.forEach(function (field) {
      field.input.addEventListener('input', function () {
        if (field.input.getAttribute('aria-invalid') === 'true' || field.input.classList.contains('is-valid')) {
          setFieldError(field, field.validate(field.input.value));
        }
      });
      field.input.addEventListener('change', function () {
        setFieldError(field, field.validate(field.input.value));
      });
      field.input.addEventListener('blur', function () {
        setFieldError(field, field.validate(field.input.value));
      });
    });
  }
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.body.classList.contains('a11y-reduce-motion');
  }
  function getCostaRicaParts(date) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: COSTA_RICA_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    });
    return formatter.formatToParts(date).reduce(function (parts, item) {
      if (item.type !== 'literal') {
        parts[item.type] = Number(item.value);
      }
      return parts;
    }, {});
  }
  function getMeetingDays(year, month) {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const saturdays = [];
    for (let day = 1; day <= daysInMonth; day += 1) {
      if (new Date(Date.UTC(year, month - 1, day)).getUTCDay() === 6) {
        saturdays.push(day);
      }
    }
    return [saturdays[1], saturdays[3]].filter(Boolean);
  }
  function findNextMeeting(referenceDate) {
    const now = getCostaRicaParts(referenceDate || new Date());
    const nowMinutes = (now.hour * 60) + now.minute;
    for (let offset = 0; offset < 14; offset += 1) {
      const monthIndex = (now.month - 1) + offset;
      const year = now.year + Math.floor(monthIndex / 12);
      const month = (monthIndex % 12) + 1;
      const days = getMeetingDays(year, month);
      for (let i = 0; i < days.length; i += 1) {
        const day = days[i];
        const isCurrentMonth = offset === 0;
        const isToday = isCurrentMonth && day === now.day;
        if (isCurrentMonth && day < now.day) continue;
        if (isToday && nowMinutes > MEETING_END_MINUTES) continue;
        return { year: year, month: month, day: day };
      }
    }
    return null;
  }
  function pad2(value) {
    return String(value).padStart(2, '0');
  }
  function formatMeetingDate(meeting) {
    const date = new Date(Date.UTC(meeting.year, meeting.month - 1, meeting.day, 12));
    const formatted = date.toLocaleDateString('es-CR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: COSTA_RICA_TIME_ZONE
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  function formatIcsDate(meeting, hour, minute) {
    return String(meeting.year) +
      pad2(meeting.month) +
      pad2(meeting.day) +
      'T' +
      pad2(hour) +
      pad2(minute) +
      '00';
  }
  function escapeIcsText(value) {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;')
      .replace(/\n/g, '\\n');
  }
  function downloadCalendarFile(meeting) {
    const dateStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `pj-san-martin-${meeting.year}${pad2(meeting.month)}${pad2(meeting.day)}@local`;
    const description = 'Reunión de la Pastoral Juvenil San Martín de Porres. ' + MAPS_URL + ' WhatsApp: +' + WHATSAPP_NUMBER;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Pastoral Juvenil San Martin de Porres//Landing Page//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + dateStamp,
      'DTSTART;TZID=' + COSTA_RICA_TIME_ZONE + ':' + formatIcsDate(meeting, 18, 0),
      'DTEND;TZID=' + COSTA_RICA_TIME_ZONE + ':' + formatIcsDate(meeting, 20, 30),
      'SUMMARY:' + escapeIcsText('Reunión Pastoral Juvenil San Martín de Porres'),
      'LOCATION:' + escapeIcsText(MEETING_LOCATION),
      'DESCRIPTION:' + escapeIcsText(description),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reunion-pastoral-juvenil-san-martin.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
  function initMeetingCard() {
    const dateEl = document.querySelector('[data-meeting-date]');
    const button = document.querySelector('[data-calendar-button]');
    if (!dateEl) return;
    const meeting = findNextMeeting(new Date());
    if (!meeting) {
      if (button) button.hidden = true;
      return;
    }
    dateEl.textContent = formatMeetingDate(meeting);
    if (button) {
      button.addEventListener('click', function () {
        downloadCalendarFile(meeting);
      });
    }
  }
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
  function initScrollReveal() {
    const revealItems = document.querySelectorAll('main section, .feature-card');
    if (!revealItems.length) return;
    if (prefersReducedMotion()) {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
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
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealItems.forEach(function (item) {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add('is-visible');
        return;
      }
      observer.observe(item);
    });
  }
  function init() {
    const menuFocusMemory = createFocusMemory();
    const panelFocusMemory = createFocusMemory();
    initTheme();
    initAccessibilityPanel(panelFocusMemory);
    initMobileMenu(menuFocusMemory);
    initActiveNavigation();
    initFaqAccordion();
    initContactForm();
    initMeetingCard();
    initSmoothAnchorScroll();
    initScrollReveal();
    initFloatingControls();
  }
  init();
}());