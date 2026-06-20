# Acceptance Checklist · Landing Page v2

## Fase 1

- [x] Horario 6:00–8:30 p. m. — completo en ambas apariciones (Actividades y Ubicación).
- [x] Segundo y cuarto sábado.
- [x] Zona Costa Rica.
- [x] Ubicación consistente.
- [x] WhatsApp correcto — `50687131710` verificado en las 3 apariciones (FAQ, Contacto, `main.js`).
- [x] Instagram correcto.
- [x] Correo eliminado — `mailto:contacto@pastoraljuvenilsmp.cr` quitado del footer.
- [x] Facebook eliminado — enlace y `<li>` quitados del footer.
- [x] Sin `href="#"` — verificado con búsqueda en todo el archivo.
- [x] Sin asesor no confirmado — "acompañados por nuestro asesor espiritual" reemplazado por "con acompañamiento parroquial".
- [x] Testimonios conservados — sin cambios.
- [x] Edad 13–35 — agregada como FAQ nueva.
- [x] Gratuito — cubierto en FAQ nueva de inscripción/experiencia.
- [x] Sin inscripción — cubierto en FAQ nueva.
- [x] Sin experiencia previa — cubierto en FAQ nueva.
- [x] Qué es la PJ explicado.
- [x] Obras sociales explicadas.
- [x] Reuniones explicadas.
- [x] Sin sección nueva — se ampliaron textos existentes y se agregaron 3 preguntas dentro del FAQ ya existente; no se crearon secciones nuevas.
- [x] Ortografía revisada — corregidas "calida"→"cálida" y "jovenes"→"jóvenes".
- [x] Rutas locales funcionan — `/css/styles.css` y `/js/main.js` cambiados a rutas relativas; no se detectaron otras rutas absolutas. Apertura real con `file://` queda pendiente de verificación manual en navegador.
- [x] Favicon — `<link rel="icon" href="img/logo_opt.png" type="image/png">` agregado.
- [x] `theme-color` — `#C29B57` (valor real de `--color-primary` / `--color-accent` en `css/styles.css`).
- [x] Open Graph — `og:title`, `og:description`, `og:type`, `og:image` agregados/completados.
- [x] Twitter/X — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` agregados.
- [x] JSON-LD veraz — bloque `Organization` con nombre y dirección reales de `content-source-of-truth.md`; sin `url` inventada.
- [x] Canonical pendiente si no hay URL — no se agregó `canonical`, consistente con que el sitio no tiene URL pública aún.
- [x] OG basado en logo — `og:image` y `twitter:image` apuntan a `img/logo_opt.png` (ruta relativa).

## Fase 2

### Semántica

- [x] Un H1 — único `<h1>` en `#hero-title`, verificado por inspección directa del HTML.
- [x] Secciones con encabezados — todas las `<section>` mantienen su `<h2>`/`aria-labelledby` previos, sin cambios.
- [x] Landmarks — `header`, `nav` (principal y de pie de página), `main`, `footer` ya presentes; no requirieron cambios estructurales.
- [x] Saltar al contenido — `<a href="#main-content" class="skip-link">` agregado antes del header; `<main>` recibió `id="main-content"`. Oculto vía `top: -3rem` salvo en `:focus-visible`.
- [x] Iframe con title — ya existía de Fase 1 (`title="Mapa de ubicación..."`), preservado sin cambios.
- [x] Alt correctos — preservados de Fase 1, sin cambios.
- [x] Decoraciones ocultas — `.slider`, `.decoration` y los iconos del switch ya usaban `aria-hidden="true"`; sin decoraciones nuevas en esta fase (formas orgánicas/hojas son Fase 3).

### Menú

- [x] Header sticky — sin cambios, ya era `position: sticky`.
- [x] Logo al Hero — sin cambios, ya enlazaba a `#hero`.
- [x] Cuatro enlaces escritorio — desde 768px, `.nav-mobile-only` (Tu primer paso, Ubicación, FAQ) se oculta con `display: none`, quedan visibles Sobre nosotros, Actividades, Testimonios, Contacto.
- [x] Siete sidebar — el HTML del nav ahora incluye los 7 enlaces (se agregó "Tu primer paso" y "Testimonios", que faltaban respecto a la decisión del usuario); bajo 768px todos son visibles.
- [x] Breakpoint 768 — cambiado de 1024px a 768px en el mismo paso en CSS (`@media (min-width: 768px)`) y JS (`DESKTOP_BREAKPOINT = 768` usado en `matchMedia`).
- [x] aria-expanded — sin cambios de comportamiento, preservado.
- [x] Escape — preservado; cierra el menú vía `closeMenu()` unificado.
- [x] Overlay — preservado; ahora pasa por `closeMenu()` unificado (antes llamaba la función directamente como handler, lo cual funcionaba pero pasaba el evento como argumento por accidente; se corrigió para llamar explícitamente sin argumentos).
- [x] Link — clic en un link del nav cierra el menú vía `closeMenu(false)`, que deja el foco seguir el comportamiento nativo del navegador hacia el ancla, sin forzar restauración al botón.
- [x] Resize — al cruzar a desktop con el menú abierto, se fuerza `closeMenu()` (con restauración de foco) vía el listener de `matchMedia`.
- [x] Focus trap — implementado con `getFocusableElements()` filtrando por visibilidad real (`getComputedStyle().display !== 'none'`, no solo `offsetParent`, ver nota técnica en el resumen).
- [x] Foco restaurado — vía `createFocusMemory()`, helper compartido con el panel de accesibilidad.
- [x] Scroll lock — agregado: `document.body.style.overflow = 'hidden'` al abrir, `''` al cerrar (no existía en el código previo).
- [x] Nav activa — `IntersectionObserver` sobre las 7 secciones reales del nav.
- [x] aria-current — solo se aplica si el enlace correspondiente está visible en el breakpoint actual; se recalcula al cruzar 768px.

### Tema y panel

- [x] Claro — sin cambios visuales.
- [x] Oscuro — sin cambios de paleta (inversión simple intacta); solo se reorganizó el bloque CSS bajo el comentario "TEMAS" y se agregó el selector `html.dark-theme body` para el anti-FOUC.
- [x] Persistencia — clave `tema` sin cambios, valores `light`/`dark`.
- [x] Sin destello — script inline en `<head>`, antes del `<link rel="stylesheet">`, aplica `dark-theme` sobre `<html>` de forma sincrónica; `initTheme()` migra la clase a `<body>` y limpia `<html>` al cargar `main.js`.
- [x] Storage bloqueado no rompe — try/catch tanto en el script inline del `<head>` como en el wrapper `storage` de `main.js`.
- [x] Botón accesibilidad izquierdo — `#a11y-panel-toggle`, `position: fixed`, `bottom`/`left`, mínimo 44×44px.
- [x] Alto contraste — `body.a11y-high-contrast` redefine las variables del tema (igual patrón que `dark-theme`), con variante combinada `body.dark-theme.a11y-high-contrast`.
- [x] Texto 100 — estado por defecto, sin clase adicional.
- [x] Texto 115 — `body.a11y-text-115 { font-size: 115%; }`.
- [x] Texto 130 — `body.a11y-text-130 { font-size: 130%; }`.
- [x] Reducir animaciones — `body.a11y-reduce-motion` fuerza `--transition-duration: 0s` (mismo mecanismo que `prefers-reduced-motion`, ver bloque REDUCED MOTION).
- [x] Subrayar enlaces — `body.a11y-underline-links a:not(.btn-primary):not(.btn-whatsapp):not(.site-logo)`.
- [x] Restablecer — botón `#a11y-reset` limpia la clave `accesibilidad` de `localStorage` y quita todas las clases aplicadas.
- [x] Persistencia — clave `accesibilidad`, objeto JSON `{contraste, escalaTexto, reducirAnimacion, subrayarEnlaces}`, leído/escrito con try/catch.
- [x] Foco — abrir el panel mueve el foco al primer control focusable; cerrar restaura al botón flotante vía `createFocusMemory()`.
- [x] Escape — cierra el panel.
- [x] Cierre exterior — listener en `document` que cierra si el clic no fue dentro del panel ni del botón toggle.
- [x] Compatible con temas — variables CSS, no hay conflicto con `dark-theme` (selector compuesto verificado).

### FAQ

- [x] Details/summary — estructura intacta, sin cambios de markup.
- [x] Solo una abierta — listener delegado del evento `toggle` (no `click`) sobre `.faq-list`, cierra los demás `.faq-item[open]` al abrir uno nuevo.
- [x] Teclado — comportamiento nativo de `<details>`/`<summary>` preservado, sin interferencia del JS.
- [x] Base sin JS — cada `<details>` sigue abriendo/cerrando individualmente sin JS; solo se pierde la exclusividad, como se especificó.

### Formulario

- [x] Tres campos — Nombre, Teléfono, Cómo nos conociste.
- [x] Todos requeridos — se agregó `required` a teléfono y al select (antes solo nombre lo tenía).
- [x] Labels — preservados, sin cambios.
- [x] Errores por campo — `<span id="*-error" class="field-error">` junto a cada campo, llenado dinámicamente por `setFieldError()`.
- [x] aria-invalid — seteado a `"true"`/`"false"` en cada input/select según validación.
- [x] aria-describedby — cada campo apunta a su nodo de error correspondiente.
- [x] aria-live — `#form-feedback` ya tenía `aria-live="polite"`, preservado.
- [x] Primer error recibe foco — `validateAll()` devuelve el primer input inválido en orden de aparición; el submit hace `.focus()` sobre él y no continúa.
- [x] No abre con datos inválidos — `window.open` solo se llama si `validateAll()` no devuelve ningún campo inválido.
- [x] Detecta popup bloqueado — verifica `popup === null` inmediato y `popup.closed === true` tras 300ms.
- [x] Enlace manual — si se detecta bloqueo, se muestra en `#form-feedback` un `<a target="_blank" rel="noopener noreferrer">` con la misma URL de WhatsApp.
- [x] No almacena — verificado explícitamente: no hay ninguna llamada a `localStorage`/`sessionStorage`/`document.cookie` con datos del formulario en todo `main.js`; los únicos usos de storage son `tema` y `accesibilidad`.
- [x] No éxito falso — el mensaje de éxito y el `reset()` del formulario solo ocurren en la rama donde se confirma que el popup se abrió (no bloqueado).

### WCAG

- [x] Contraste AA — preservado de Fase 1; alto contraste agregado como refuerzo opcional vía panel.
- [x] Foco visible — `:focus-visible` ya existente, extendido implícitamente a todos los controles nuevos (botón panel, controles del panel, campos de error) por heredar el selector global.
- [x] Teclado — focus trap en menú y panel, FAQ nativo, formulario navegable; pendiente de verificación manual end-to-end en navegador real.
- [x] Áreas táctiles — botón de accesibilidad y controles del panel con mínimo 44×44px (`.floating-control`, `.a11y-checkbox-row`, `.a11y-scale-btn`, `.a11y-reset-btn`, `.a11y-panel-close`).
- [ ] Zoom 200 % — requiere verificación manual en navegador, no se pudo comprobar sin entorno visual.
- [x] Reduced motion — bloque centralizado al final del CSS; `prefers-reduced-motion: reduce` y `body.a11y-reduce-motion` comparten el mecanismo vía `--transition-duration`.
- [x] No depender del color — `aria-current="location"` ya combina con negrita y subrayado en `.main-nav a[aria-current="location"]`; estado abierto de FAQ usa el icono `+`/rotación además del color de borde.

**Pendiente de verificación visual en navegador real:** zoom 200%, comportamiento exacto de scroll lock en iOS Safari, contraste real con herramienta de medición, y prueba táctil en dispositivo físico.

## Fase 3

- [ ] Paleta exacta.
- [ ] Lora e Inter.
- [ ] Oscuro rediseñado.
- [ ] Alto contraste coherente.
- [ ] Hero fiel.
- [ ] Eyebrow.
- [ ] Dos CTA.
- [ ] Forma CSS.
- [ ] Hojas SVG.
- [ ] Puntos.
- [ ] Sobre nosotros mejorado.
- [ ] Tarjetas 01–03.
- [ ] Nuevas ilustraciones.
- [ ] Sin altura 520 px.
- [ ] Testimonios con iniciales.
- [ ] Iframe integrado.
- [ ] FAQ refinada.
- [ ] Contacto refinado.
- [ ] Footer en columnas.
- [ ] WhatsApp derecho.
- [ ] Accesibilidad izquierdo.
- [ ] Translúcidos al detener scroll.
- [ ] Opacos con interacción.
- [ ] Nunca invisibles.
- [ ] No cubren contenido.
- [ ] Safe areas.
- [ ] Animación sobria.
- [ ] Reduced motion.
- [ ] WebP.
- [ ] srcset.
- [ ] Originales.
- [ ] Dimensiones.
- [ ] Sin imágenes rotas.
- [ ] Sin scroll horizontal.

## Fase 4

- [ ] Configuración centralizada.
- [ ] Segundo sábado.
- [ ] Cuarto sábado.
- [ ] 18:00–20:30.
- [ ] Costa Rica.
- [ ] Todo el año.
- [ ] Hoy antes.
- [ ] Hoy durante.
- [ ] Hoy después.
- [ ] Cruce de mes.
- [ ] Cruce de año.
- [ ] Español.
- [ ] Solo Hero.
- [ ] Fallback.
- [ ] Sin API.
- [ ] Botón calendario.
- [ ] ICS.
- [ ] Inicio.
- [ ] Fin.
- [ ] Ubicación.
- [ ] Maps.
- [ ] WhatsApp.
- [ ] Sin correo.
- [ ] Blob revocado.
- [ ] Fallo aislado.

## Fase 5

### Código

- [ ] Un CSS.
- [ ] Un JS.
- [ ] Sin frameworks.
- [ ] Sin librerías.
- [ ] Sin backend.
- [ ] Sin package.json.
- [ ] Sin código muerto confirmado.
- [ ] Sin duplicación relevante.
- [ ] Comentarios necesarios.
- [ ] Nombres claros.
- [ ] Sin minificación.
- [ ] Sin has innecesario.
- [ ] Sin datos personales en storage o consola.

### Compatibilidad

- [ ] Chrome.
- [ ] Vivaldi.
- [ ] Edge.
- [ ] Firefox.
- [ ] Safari.
- [ ] Móvil moderno.

### Viewports

- [ ] 320.
- [ ] 375.
- [ ] 640.
- [ ] 768.
- [ ] 1024.
- [ ] 1440.
- [ ] Sin scroll horizontal.
- [ ] Sin solapamiento.

### Estados

- [ ] Claro.
- [ ] Oscuro.
- [ ] Contraste.
- [ ] Texto 115.
- [ ] Texto 130.
- [ ] Reduced motion.
- [ ] Popup bloqueado.
- [ ] Storage bloqueado.
- [ ] JS deshabilitado comprensible.

### Entrega

- [ ] Consola sin errores.
- [ ] HTML validado.
- [ ] Enlaces.
- [ ] Assets justificados.
- [ ] Specs coinciden.
- [ ] Checklist.
- [ ] URL pública anotada.
- [ ] Canonical actualizado.
- [ ] OG absoluto.
- [ ] Guía de defensa revisada.

## Defensa oral

- [ ] HTML semántico.
- [ ] Flexbox.
- [ ] Grid.
- [ ] Mobile-first.
- [ ] Variables.
- [ ] Temas.
- [ ] localStorage.
- [ ] Focus trap.
- [ ] inert.
- [ ] IntersectionObserver.
- [ ] Formulario.
- [ ] Fechas.
- [ ] Timezone.
- [ ] ICS.
- [ ] Blob.
- [ ] picture/srcset.
- [ ] Sin frameworks.
- [ ] Refactorización.
