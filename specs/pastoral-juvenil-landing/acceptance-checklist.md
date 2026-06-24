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
- [x] Texto 115 — corregido: `html.a11y-text-115 { font-size: 115%; --a11y-text-scale: 1.15; }`. La implementación original aplicaba la clase sobre `body`, pero `rem` siempre se resuelve contra el font-size del elemento raíz (`html`), no contra `body` — esa es la causa raíz por la que casi ningún texto cambiaba de tamaño. Verificado con Playwright en 13 elementos reales (header, hero, cards, testimonios, ubicación, FAQ, formulario, footer, botones, panel): los 13 escalan exactamente ×1.15 en desktop (1280px) y mobile (375px).
- [x] Texto 130 — corregido: `html.a11y-text-130 { font-size: 130%; --a11y-text-scale: 1.3; }`. Mismos 13 elementos escalan exactamente ×1.30 en ambos viewports. Se corrigió además la dilución por `clamp()` con `vw` en `--text-h1`/`--text-h2` (el componente `vw` no es root-relative, así que no se beneficiaba del cambio de font-size raíz): ahora se multiplica explícitamente por `var(--a11y-text-scale)`. Sin scroll horizontal verificado en 320px/375px/1280px, con y sin el menú móvil abierto. El icono decorativo del switch de tema (`font-size: 17px` fijo, usado solo para dimensionar en `em`) no escala, como corresponde. Persistencia confirmada tras reload en mobile (clase `a11y-text-130` permanece en `<html>`).
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

- [x] Paleta exacta — `:root` usa `#FDFBF7`/`#1A1A1A`/`#C29B57`/`#EBE3D5` sin desviación; variables nuevas (`--radius-organic`, `--color-accent-soft` vía `color-mix` con fallback `rgba`, `--space-section`, `--z-decoration`/`--z-content`/`--z-fab`) agregadas sin renombrar las existentes.
- [x] Lora e Inter — cargadas en `index.html` (`<link>` a Google Fonts) y consumidas por `--font-display`/`--font-body` en todos los encabezados, cuerpo y componentes nuevos (botones, eyebrow, feature-card, etc.).
- [x] Oscuro rediseñado — `body.dark-theme` redefine `--color-bg/#14110D`, `--color-text/#F3EDE3`, `--color-accent/#D9AE6B`, `--color-surface/#211C16`, `--color-border/#3A322A`, `--shadow-sm/md` y `--color-card`, valores exactos verificados contra el spec.
- [x] Alto contraste coherente — `body.a11y-high-contrast` con `#FFFFFF/#000000/#6B4A12`, `:focus-visible` en negro puro 3px, bordes 2px negros en `.btn-primary`/`.btn-secondary`/`.feature-card`; `body.dark-theme.a11y-high-contrast` combinado sin conflicto de selector (Playwright confirmó `a11y-high-contrast` se aplica correctamente vía toggle).
- [x] Hero fiel — estructura de dos columnas en desktop, contenido y CTA primario sin cambios de copy.
- [x] Eyebrow — `<p class="eyebrow">Pastoral Juvenil · San Martín</p>` antes del H1; Playwright confirmó visible y precede al `<h1>` en el DOM.
- [x] Dos CTA — `btn-primary` ("Quiero participar") + `btn-secondary` ("Ver ubicación") en `.hero-actions`; el segundo hace scroll suave a `#ubicacion` sin `target="_blank"` (confirmado con Playwright: no se abre ninguna pestaña nueva).
- [x] Forma CSS — decoraciones `.decor--blob`/`.decor--dot` con gradientes y `border-radius` asimétrico, sin SVG, dentro de `.hero-grid` (`position: relative`), `z-index: var(--z-decoration)`, `aria-hidden="true"`.
- [x] Hojas SVG — `img/decoracion-hojas.svg` reutilizado como `.decor--leaf` en "Sobre nosotros" y agregado también al Hero (`.decor--leaf-hero`) para cubrir el requisito de la sección Hero en `design.md`; mismo asset, sin duplicar archivos.
- [x] Puntos — `.decor--dot-1`/`.decor--dot-2`, círculos vía `border-radius: 50%` y `background: var(--color-accent)`, opacidad 0.35.
- [x] Sobre nosotros mejorado — `.media-frame` con `--radius-organic`, texto limitado a `max-width: 65ch`; se agregó una decoración adicional discreta (`.decor--blob-soft`, 140px, opacidad 0.6) porque el leaf solo no cubría el pedido explícito de "forma orgánica + decoración" del design.md; contenido de Fase 1 sin cambios.
- [x] Tarjetas 01–03 — numeración vía `counter-reset: step` en `.first-step-grid` + `counter-increment`/`content: counter(step, decimal-leading-zero)` en `::before` de cada `article`, sin tocar el HTML ni hardcodear texto.
- [x] Nuevas ilustraciones — `img/actividad-retiro.svg`, `actividad-servicio.svg`, `actividad-encuentro.svg` verificados: `viewBox="0 0 64 64"`, trazos simples con `stroke="currentColor"`, sin texto embebido.
- [x] Sin altura 520 px — búsqueda en todo `css/styles.css` confirma que no existe ningún `min-height: 520px`; `.feature-card` usa `min-height: auto`.
- [x] Testimonios con iniciales — preservado de Fase 1 (nombre + inicial de apellido); se agregó comilla decorativa vía `::before` en `blockquote` con `--color-accent-soft`, sin alterar la estructura `figure`/`blockquote`/`figcaption`.
- [x] Iframe integrado — `.media-frame.media-frame--map` envuelve el iframe con esquina orgánica asimétrica; `src`, `title` y atributos del iframe verificados idénticos a Fase 1/2 (Playwright confirmó `src` apunta al mismo embed de Google Maps).
- [x] FAQ refinada — bordes, sombra y `summary::after` con `+`/rotación 45° al abrir; lógica de "una sola abierta" en `main.js` sin tocar (Playwright confirmó exclusividad).
- [x] Contacto refinado — espaciado y jerarquía visual ajustados vía CSS existente; lógica de validación/envío por WhatsApp intacta (Playwright confirmó validación de campo vacío con `aria-invalid` y mensaje de error).
- [x] Footer en columnas — reestructurado en 3 columnas reales (nombre/marca, ubicación, Instagram) vía `display: grid; grid-template-columns: repeat(3, 1fr)` desde 1024px; se separó el `<address>` de `.footer-brand` a su propia columna `.footer-location` en el HTML (solo reestructuración visual, sin cambiar el texto). Se agregó franja decorativa de hojas en `footer::before` con `background-image` de `decoracion-hojas.svg`, opacidad 0.18.
- [x] WhatsApp derecho — `.btn-fab` con `right`/`bottom` usando `env(safe-area-inset-*)`; Playwright confirmó posición en la mitad derecha del viewport.
- [x] Accesibilidad izquierdo — `.a11y-toggle` sin reubicar, `left`/`bottom` con `env(safe-area-inset-*)`; Playwright confirmó posición en la mitad izquierda.
- [x] Translúcidos al detener scroll — `initFloatingControls()` en `main.js`, función nueva y aislada, agrega `.is-idle` (opacidad 0.6) tras 3s sin scroll vía `setTimeout` reiniciado en cada evento; throttle de scroll con `requestAnimationFrame`, no `setInterval`/debounce. Playwright confirmó opacidad 0.6 tras 3.2s de inactividad.
- [x] Opacos con interacción — `scroll`, `mouseenter`/`focus` (vía listeners) y `touchstart` restauran opacidad 1; Playwright confirmó opacidad vuelve a 1 con `hover`.
- [x] Nunca invisibles — `.floating-control.is-idle { opacity: 0.6 }`, nunca 0; verificado en CSS y en Playwright (idle=0.6, no 0).
- [x] No cubren contenido — controles flotantes en posición fija de esquina, sin overlap con el contenido principal en ningún viewport probado (320/375/1280px).
- [x] Safe areas — `max(var(--space-sm), env(safe-area-inset-*))` en ambos flotantes.
- [x] Animación sobria — hover `scale(1.03)` en botones/FAB, entrada de `.feature-card` vía `IntersectionObserver` (`initScrollReveal()`, función nueva y aislada, separada de `initFloatingControls()`), `opacity 0→1` + `translateY(12px→0)` en 0.4s ease-out; sin parallax, video ni animación infinita (confirmado: cero `@keyframes` en todo el CSS).
- [x] Reduced motion — `initScrollReveal()` revela todas las cards de inmediato si `prefers-reduced-motion` o `body.a11y-reduce-motion` están activos (evita el observer en vez de dejar `opacity: 0` permanente); transición de opacidad de flotantes usa `var(--transition-duration)`, que el bloque REDUCED MOTION pone en `0s` bajo ambos disparadores, sin lógica duplicada en JS.
- [x] WebP — `Hero-480/768/1200/1600.webp` y `Sobre_nosotros-480/640/960.webp` verificados existentes y no vacíos.
- [x] srcset — `<picture><source type="image/webp" srcset=... sizes=...>` con fallback `<img>` en Hero y Sobre nosotros.
- [x] Originales — `img/Hero.jpeg` (1600×1200) y `img/Sobre_nosotros.png` (1448×1086) conservados como fallback, sin eliminar.
- [x] Dimensiones — `width`/`height` declarados (800×600, ratio 4:3) coinciden con la relación de aspecto real de los archivos verificada con Pillow.
- [x] Sin imágenes rotas — verificado con Playwright (consola sin errores de red) tras corregir una ruta rota encontrada en auditoría: `footer::before` apuntaba a `img/decoracion-hojas.svg` en vez de `../img/decoracion-hojas.svg` (las rutas en CSS son relativas al archivo CSS, no a la raíz del sitio); corregido.
- [x] Sin scroll horizontal — Playwright confirmó `scrollWidth <= clientWidth` en 320px y 375px, con todas las decoraciones nuevas activas.

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
