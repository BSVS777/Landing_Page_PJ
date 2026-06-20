# Design Specification · Landing Page v2

## 1. Principio de diseño

La nueva versión debe sentirse como una evolución clara de la página actual, no como una identidad distinta.

Palabras clave:

- cálida;
- juvenil;
- sobria;
- cercana;
- clara;
- profesional;
- espiritual sin excesos visuales;
- defendible académicamente.

Evitar:

- glassmorphism;
- neón;
- animaciones pesadas;
- introducciones separadas;
- video de fondo;
- scroll controlado artificialmente;
- apariencia de plantilla corporativa genérica.

## 2. Paleta obligatoria

```css
:root {
  --color-bg: #FDFBF7;
  --color-text: #1A1A1A;
  --color-accent: #C29B57;
  --color-surface: #EBE3D5;
}
```

La paleta no se modifica. Se permiten variantes derivadas para bordes, hover y transparencias, documentadas mediante variables.

## 3. Tipografía

Conservar:

- Lora para títulos.
- Inter para cuerpo e interfaz.
- `display=swap`.
- Máximo dos familias.

Escala sugerida:

```css
--text-display: clamp(2.25rem, 5vw, 4.5rem);
--text-h2: clamp(1.75rem, 3vw, 2.5rem);
--text-h3: clamp(1.125rem, 1.5vw, 1.375rem);
--text-body: 1rem;
--text-small: 0.875rem;
```

La ampliación del panel debe aplicarse con una variable raíz.

## 4. Temas

### Claro

- Crema.
- Carbón.
- Beige.
- Dorado.

### Oscuro

Debe rediseñarse, no solo invertir colores.

Ejemplo:

```css
body.dark-theme {
  --color-bg: #171614;
  --color-text: #F7F1E7;
  --color-surface: #24211D;
  --color-card: #201E1B;
  --color-border: #443C31;
}
```

### Alto contraste

Clase independiente:

```css
body.a11y-high-contrast { ... }
```

Debe:

- elevar contraste;
- reforzar bordes;
- eliminar transparencias de texto;
- hacer más evidente el foco;
- convivir con claro y oscuro.

## 5. Estructura visual

### Header

- Sticky.
- Logo a la izquierda.
- Navegación desde 768 px.
- Switch de tema.
- Sidebar por debajo de 768 px.
- Sección activa marcada con más de un recurso visual.

### Hero

Dos columnas en escritorio.

Texto:

- eyebrow;
- título;
- subtítulo;
- dos CTA;
- próxima reunión;
- calendario.

Visual:

- foto actual;
- marco redondeado;
- forma orgánica CSS;
- SVG de hojas;
- puntos decorativos.

Las decoraciones son `aria-hidden="true"`.

### Sobre nosotros

- Dos columnas.
- Texto de máximo aproximado de 65 caracteres por línea.
- Foto actual.
- Decoración más discreta que Hero.

### Tu primer paso

- Tres tarjetas.
- Números 01–03.
- Icono pequeño.
- Alturas por contenido, sin rigidez excesiva.

### Actividades

- Tres tarjetas.
- Ilustración arriba.
- Texto abajo.
- Sin `min-height: 520px`.
- Proporciones uniformes.

### Testimonios

- Tarjetas ligeras.
- Comillas.
- Iniciales.
- Sin carrusel automático.

### Ubicación

- Información y mapa en dos columnas.
- Iframe real.
- CTA único.

### FAQ

- Lista vertical.
- Solo una abierta.
- Estado abierto distinguible sin depender solo del color.

### Contacto

- Texto y WhatsApp a la izquierda.
- Formulario a la derecha.
- Error debajo de cada campo.
- Feedback honesto.

### Footer

- Columnas simples.
- Nombre, ubicación e Instagram.
- Sin correo ni Facebook.

## 6. Decoraciones

### Formas orgánicas

Crear con:

- pseudo-elementos;
- `border-radius` asimétrico;
- colores derivados;
- `z-index`;
- `isolation: isolate`.

### Hojas

SVG local optimizado:

- uno o dos recursos;
- baja opacidad;
- sin dependencia externa;
- `aria-hidden="true"`.

### Puntos

Preferir `radial-gradient` o pseudo-elementos.

## 7. Movimiento

Permitido:

- hover y foco;
- entradas sutiles;
- pequeños desplazamientos;
- `opacity` y `transform`;
- menú y panel;
- opacidad de controles flotantes.

No permitido:

- scroll bloqueado;
- parallax intenso;
- video;
- secuencias de frames;
- animaciones llamativas infinitas.

Reglas:

- 150–300 ms para controles.
- Máximo aproximado 500 ms para entradas.
- `prefers-reduced-motion` elimina movimiento no esencial.
- La preferencia manual tendrá prioridad.

## 8. Controles flotantes

### Accesibilidad

- Inferior izquierda.
- Mínimo 44 × 44 CSS px.
- Panel encima.
- Cierre con Escape, exterior y botón.
- Foco vuelve al botón.

### WhatsApp

- Inferior derecha.
- Mismo lenguaje visual.
- Verde permitido.

### Estado translúcido

- Durante scroll: opacidad 1.
- Tras detenerse: 0.55–0.7.
- Hover, focus o toque: opacidad 1.
- Nunca ocultar.

## 9. Panel de accesibilidad

```text
Accesibilidad
├── Alto contraste
├── Tamaño [100 % | 115 % | 130 %]
├── Reducir animaciones
├── Subrayar enlaces
└── Restablecer
```

Persistencia sugerida:

```js
{
  contrast: false,
  textScale: "100",
  reduceMotion: false,
  underlineLinks: false
}
```

Clave: `preferenciasAccesibilidad`.

## 10. Arquitectura CSS

Orden:

1. Variables.
2. Temas.
3. Reset.
4. Base.
5. Accesibilidad.
6. Layout.
7. Componentes.
8. Header.
9. Hero.
10. Secciones.
11. Formularios.
12. Paneles y flotantes.
13. Estados.
14. Media queries.
15. Reduced motion.

Clases aceptadas:

```css
.container
.section-heading
.card
.button
.button--primary
.button--secondary
.media-frame
.floating-control
```

## 11. Arquitectura JavaScript

Un solo archivo con funciones pequeñas.

Orden:

```text
Configuración
Utilidades
Tema
Accesibilidad
Menú
Navegación activa
FAQ
Formulario
Próxima reunión
ICS
Controles flotantes
Inicialización
```

Forma sugerida:

```js
(function () {
  'use strict';

  const CONFIG = { ... };

  function initTheme() {}
  function initAccessibilityPanel() {}
  function initMobileMenu() {}
  function initActiveNavigation() {}
  function initFaqAccordion() {}
  function initContactForm() {}
  function initNextMeeting() {}
  function initFloatingControls() {}

  function init() {}

  init();
}());
```

## 12. Próxima reunión

### Regla

- Segundo y cuarto sábado.
- 18:00–20:30.
- `America/Costa_Rica`.

### Algoritmo

1. Obtener fecha y hora en Costa Rica con `Intl.DateTimeFormat`.
2. Calcular sábados del mes.
3. Elegir segundo y cuarto.
4. Crear candidatos a las 18:00.
5. Si hoy es candidato, mantenerlo hasta 20:30.
6. Elegir primer candidato válido.
7. Si no existe, repetir en el mes siguiente.
8. Formatear en español.
9. Mantener fallback HTML.

No usar API externa.

## 13. ICS

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pastoral Juvenil San Martín de Porres//Reuniones//ES
BEGIN:VEVENT
UID:<valor-unico>
DTSTAMP:<fecha>
DTSTART;TZID=America/Costa_Rica:<inicio>
DTEND;TZID=America/Costa_Rica:<fin>
SUMMARY:Reunión de la Pastoral Juvenil San Martín de Porres
LOCATION:<dirección>
DESCRIPTION:<mapa y WhatsApp escapados>
END:VEVENT
END:VCALENDAR
```

Generar `Blob`, URL temporal y descarga. Revocar la URL.

## 14. Navegación activa

Preferir `IntersectionObserver`.

- Observar secciones.
- Actualizar clase.
- Añadir `aria-current="location"`.
- Retirar el atributo anterior.
- No calcular por cada píxel de scroll.

## 15. Formulario

- Nombre: mínimo 2 caracteres.
- Teléfono: formato razonable y normalizado.
- Origen requerido.
- Mantener `required`.
- Errores específicos.
- No almacenar.
- Mostrar enlace manual si `window.open` devuelve `null`.

## 16. Imágenes responsive

Usar `picture`, `srcset`, `sizes`, fallback, width y height.

Ejemplo:

```html
<picture>
  <source
    type="image/webp"
    srcset="img/hero-480.webp 480w,
            img/hero-800.webp 800w,
            img/hero-1200.webp 1200w">
  <img
    src="img/Hero.jpeg"
    sizes="(min-width: 1024px) 50vw, 100vw"
    alt="..."
    width="800"
    height="600">
</picture>
```

## 17. Open Graph

Crear `img/og-logo.png`:

- 1200 × 630;
- fondo crema;
- logo;
- nombre;
- sin datos inventados.

La etiqueta final requiere URL absoluta al publicar.
