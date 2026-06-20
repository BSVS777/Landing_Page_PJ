# Requirements · Pastoral Juvenil San Martín de Porres · Landing Page v2

## 1. Visión del proyecto

Landing page estática para la **Pastoral Juvenil San Martín de Porres**, ubicada en Ciudad Quesada, San Carlos, Costa Rica.

El sitio debe informar, reducir la incertidumbre de quienes desean asistir por primera vez, facilitar el contacto por WhatsApp y comunicar la próxima reunión. La experiencia debe ser cálida, juvenil, sobria, accesible y fácil de defender oralmente.

## 2. Objetivos

1. Presentar con claridad qué es la Pastoral Juvenil.
2. Explicar cómo se desarrollan las reuniones y obras sociales.
3. Indicar quién puede asistir y cuáles son los requisitos.
4. Mostrar la ubicación y el horario oficial.
5. Facilitar el contacto mediante WhatsApp.
6. Calcular automáticamente la próxima reunión.
7. Permitir agregar la próxima reunión al calendario.
8. Alcanzar WCAG 2.1 AA en los criterios aplicables.
9. Modernizar la apariencia sin abandonar la identidad visual actual.
10. Reducir duplicación y mejorar mantenimiento sin volver el código difícil de explicar.

## 3. Restricciones obligatorias

- HTML5 semántico.
- CSS3 nativo.
- JavaScript ES6 nativo.
- Un único archivo de estilos: `css/styles.css`.
- Un único archivo de scripts: `js/main.js`.
- Sin frameworks ni librerías externas.
- Sin backend, base de datos, API propia o servicios de persistencia.
- Sin build tools, bundlers, TypeScript ni `package.json`.
- Persistencia local limitada a preferencias visuales y de accesibilidad.
- No almacenar datos del formulario.
- El sitio debe funcionar abriendo `index.html` directamente.
- Debe poder desplegarse en GitHub Pages o Vercel.
- Las rutas locales deben ser relativas.

## 4. Datos oficiales

La fuente completa es `content-source-of-truth.md`.

- Reuniones: segundo y cuarto sábado de cada mes.
- Horario: 6:00 p. m. a 8:30 p. m.
- Zona horaria: `America/Costa_Rica`.
- Todo el año.
- Lugar: Aulas de Catecismo de la Parroquia San Martín, Ciudad Quesada, San Carlos, Costa Rica.
- WhatsApp: `+506 8713-1710`.
- No existe correo oficial.
- No existe Facebook oficial.
- Instagram: usar el enlace oficial confirmado.
- Público: 13 a 35 años; la mayoría no supera los 20.
- Participación gratuita, sin inscripción previa y sin experiencia religiosa previa.

# 5. Requisitos funcionales

## FR-01 · Estructura

Conservar este orden:

1. Header y navegación.
2. Hero.
3. Sobre nosotros.
4. Tu primer paso.
5. Actividades.
6. Testimonios.
7. Ubicación.
8. Preguntas frecuentes.
9. Contacto.
10. Footer.

No agregar una sección independiente de “Próximas actividades”.

## FR-02 · Navegación

### Escritorio desde 768 px

Mostrar:

- Sobre nosotros.
- Actividades.
- Testimonios.
- Contacto.

### Sidebar por debajo de 768 px

Mostrar:

- Sobre nosotros.
- Tu primer paso.
- Actividades.
- Testimonios.
- Ubicación.
- FAQ.
- Contacto.

### Comportamiento

- Header sticky.
- Logo enlaza a `#hero`.
- Sidebar lateral.
- `aria-expanded` actualizado.
- Cierre por enlace, Escape, overlay y cambio a escritorio.
- Focus trap.
- Restauración de foco.
- Bloqueo del scroll de fondo.
- Sección activa marcada visualmente y con `aria-current="location"`.

## FR-03 · Hero

Incluir:

- `Pastoral Juvenil · San Martín`.
- H1 con el nombre completo.
- Subtítulo actual.
- CTA `Quiero participar`.
- CTA `Ver ubicación`.
- Imagen actual.
- Decoración orgánica detrás de la imagen.
- Tarjeta dinámica de próxima reunión.
- Botón `Agregar al calendario`.

La próxima reunión solo se mostrará en el Hero.

## FR-04 · Sobre nosotros

Responder sin redundancia:

- qué es la Pastoral Juvenil;
- qué ofrece;
- cómo favorece crecimiento espiritual y social;
- cómo contribuye a la comunidad;
- quién organiza las actividades, usando texto neutral validable.

No mostrar nombres de asesores sin confirmación.

## FR-05 · Tu primer paso

Exactamente tres tarjetas:

1. ¿Dónde llegar?
2. ¿Qué pasa al entrar?
3. ¿Qué necesito llevar?

Cada una tendrá número `01`, `02` o `03`, icono, título y texto breve.

## FR-06 · Actividades

Mantener:

1. Reuniones regulares.
2. Servicio social.
3. Espacios de compartir.

Las reuniones describirán:

- bienvenida;
- oración inicial;
- dinámica;
- reflexión;
- cierre.

Servicio social puede mencionar:

- Pastoral Social;
- apoyo a familias;
- organizaciones que soliciten ayuda;
- visitas a hogares de personas adultas mayores;
- recolección de regalos en Navidad;
- iniciativas propuestas por jóvenes.

Espacios de compartir puede mencionar:

- Día Nacional de la Juventud;
- convivencias;
- actividades recreativas.

Las ilustraciones actuales serán reemplazadas por otras coherentes con el mockup.

## FR-07 · Testimonios

- Mantener los tres actuales.
- Tratar su contenido como semi-real.
- Mostrar inicial o avatar textual.
- Conservar `figure`, `blockquote` y `figcaption`.
- Sin carrusel automático.

## FR-08 · Ubicación

- Mantener iframe real de Google Maps.
- Centrar la Parroquia San Martín.
- Mantener enlace al pin exacto.
- `loading="lazy"`.
- `title` descriptivo.
- Sin copiar dirección.
- Sin segundo botón “Cómo llegar”.

## FR-09 · FAQ

Incluir preguntas sobre:

- aviso previo;
- conocer a alguien;
- qué llevar;
- qué ocurre en una reunión;
- contacto;
- rango de edad;
- quién organiza;
- inscripción y experiencia religiosa.

Solo una respuesta abierta a la vez. Conservar `details` y `summary`.

## FR-10 · Formulario

Campos:

1. Nombre.
2. Teléfono / WhatsApp.
3. ¿Cómo nos conociste?

Reglas:

- todos obligatorios;
- validar antes de abrir WhatsApp;
- errores visibles y accesibles;
- `aria-invalid`, `aria-describedby`, `aria-live`;
- no almacenar datos;
- no agregar mensaje;
- detectar popup bloqueado y mostrar enlace manual;
- no mostrar un éxito falso.

## FR-11 · Tema

- Tema claro.
- Tema oscuro rediseñado.
- Evitar destello inicial.
- Persistencia en `localStorage` con clave `tema`.
- Valores `light` y `dark`.

## FR-12 · Panel flotante de accesibilidad

Opciones:

- alto contraste;
- texto 100 %, 115 % y 130 %;
- reducir animaciones;
- subrayar enlaces;
- restablecer.

Reglas:

- persistencia en `localStorage`;
- accesibilidad base independiente del panel;
- navegación por teclado;
- gestión de foco;
- nombre accesible;
- compatibilidad con claro y oscuro.

## FR-13 · Controles flotantes

- WhatsApp inferior derecho.
- Accesibilidad inferior izquierdo.
- Móvil y escritorio.
- Tras detener el scroll: ligeramente translúcidos.
- Recuperan opacidad con hover, foco, toque o nuevo scroll.
- Nunca invisibles.
- Respetan safe areas.
- No cubren contenido.

## FR-14 · Próxima reunión

Calcular:

- segundo o cuarto sábado;
- 6:00 p. m.;
- duración 2 h 30 min;
- Costa Rica;
- todo el año;
- sin excepciones.

Si hoy es reunión, se considera vigente hasta las 8:30 p. m. Después se calcula la siguiente. Debe existir fallback HTML.

## FR-15 · Calendario

Generar `.ics` en navegador con:

- nombre;
- inicio y fin;
- `TZID=America/Costa_Rica`;
- ubicación;
- Maps;
- WhatsApp.

Sin correo inventado.

## FR-16 · SEO

Incluir:

- title;
- descripción;
- viewport;
- `lang="es"`;
- favicon;
- `theme-color`;
- Open Graph;
- Twitter/X;
- JSON-LD veraz;
- canonical cuando exista URL.

`og:image` será una composición social basada en el logo. No inventar URL absoluta durante desarrollo.

## FR-17 · Footer

Mostrar:

- nombre;
- parroquia y ciudad;
- dirección;
- Instagram.

Eliminar:

- correo;
- Facebook;
- `href="#"`.

## FR-18 · Imágenes

- Conservar `Hero.jpeg` y `Sobre_nosotros.png`.
- Crear WebP.
- Usar `picture`, `srcset` y `sizes`.
- Conservar originales.
- Definir width y height.
- Hero con prioridad alta.
- Lazy loading inferior.
- SVG locales optimizados.
- Sin imágenes remotas.

# 6. Requisitos no funcionales

## NFR-01 · Accesibilidad

Objetivo: WCAG 2.1 AA aplicable, sin afirmar certificación.

- Saltar al contenido.
- Semántica.
- Un H1.
- Foco visible.
- Teclado.
- Contraste AA.
- Áreas táctiles de 44 × 44 CSS px cuando sea viable.
- Reduced motion.
- Texto ampliable.
- Errores accesibles.
- Gestión de foco.
- No depender solo del color.

## NFR-02 · Responsive

- Base móvil.
- 640 px: grids intermedios.
- 768 px: navegación de escritorio.
- 1024 px: composiciones amplias.

Sin scroll horizontal desde 320 px.

## NFR-03 · Rendimiento

- Sin librerías.
- Máximo Lora e Inter.
- `display=swap`.
- WebP y `srcset`.
- Lazy loading.
- SVG optimizados.
- Animar `transform` y `opacity`.
- Evitar listeners de scroll sin control.
- No minificar el código de defensa.

## NFR-04 · Mantenibilidad

- Un CSS y JS.
- Variables CSS.
- Clases reutilizables sin exceso.
- Comentarios solo para decisiones clave.
- Evitar `:has()` salvo justificación.
- No duplicar configuración.
- Legibilidad sobre compactación.

## NFR-05 · Compatibilidad

Versiones actuales de:

- Chrome;
- Vivaldi;
- Edge;
- Firefox;
- Safari;
- navegadores móviles modernos.

## NFR-06 · Privacidad

- No guardar formulario.
- No enviar al servidor.
- No afirmar envío.
- `localStorage` solo para tema y accesibilidad.

## NFR-07 · Calidad

Al cerrar cada fase:

- consola sin errores;
- teclado;
- responsive;
- semántica;
- regresión;
- checklist.

## NFR-08 · Defensa

Debe poder explicarse:

- Flexbox;
- Grid;
- variables;
- mobile-first;
- localStorage;
- focus trap;
- IntersectionObserver;
- fechas;
- ICS;
- validación;
- `picture` y `srcset`;
- mejora progresiva;
- ausencia de frameworks.
