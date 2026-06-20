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

- [ ] Un H1.
- [ ] Secciones con encabezados.
- [ ] Landmarks.
- [ ] Saltar al contenido.
- [ ] Iframe con title.
- [ ] Alt correctos.
- [ ] Decoraciones ocultas.

### Menú

- [ ] Header sticky.
- [ ] Logo al Hero.
- [ ] Cuatro enlaces escritorio.
- [ ] Siete sidebar.
- [ ] Breakpoint 768.
- [ ] aria-expanded.
- [ ] Escape.
- [ ] Overlay.
- [ ] Link.
- [ ] Resize.
- [ ] Focus trap.
- [ ] Foco restaurado.
- [ ] Scroll lock.
- [ ] Nav activa.
- [ ] aria-current.

### Tema y panel

- [ ] Claro.
- [ ] Oscuro.
- [ ] Persistencia.
- [ ] Sin destello.
- [ ] Storage bloqueado no rompe.
- [ ] Botón accesibilidad izquierdo.
- [ ] Alto contraste.
- [ ] Texto 100.
- [ ] Texto 115.
- [ ] Texto 130.
- [ ] Reducir animaciones.
- [ ] Subrayar enlaces.
- [ ] Restablecer.
- [ ] Persistencia.
- [ ] Foco.
- [ ] Escape.
- [ ] Cierre exterior.
- [ ] Compatible con temas.

### FAQ

- [ ] Details/summary.
- [ ] Solo una abierta.
- [ ] Teclado.
- [ ] Base sin JS.

### Formulario

- [ ] Tres campos.
- [ ] Todos requeridos.
- [ ] Labels.
- [ ] Errores por campo.
- [ ] aria-invalid.
- [ ] aria-describedby.
- [ ] aria-live.
- [ ] Primer error recibe foco.
- [ ] No abre con datos inválidos.
- [ ] Detecta popup bloqueado.
- [ ] Enlace manual.
- [ ] No almacena.
- [ ] No éxito falso.

### WCAG

- [ ] Contraste AA.
- [ ] Foco visible.
- [ ] Teclado.
- [ ] Áreas táctiles.
- [ ] Zoom 200 %.
- [ ] Reduced motion.
- [ ] No depender del color.

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
