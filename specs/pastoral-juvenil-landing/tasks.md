# Tasks · Implementación por fases

## Convención

- Prioridad: P0 crítica, P1 alta, P2 media.
- Riesgo: bajo, medio, alto.
- Ninguna tarea permite implementar antes de diagnóstico y confirmación.
- Cada fase termina con pruebas y commit sugerido.

# Fase 1 · Contenido, datos e inconsistencias

## Objetivo

Alinear el sitio con los datos oficiales sin introducir todavía el rediseño completo.

## P1-T01 · Auditoría de línea base

**Prioridad:** P0  
**Riesgo:** bajo  
**Archivos:** repositorio completo, sin modificar.

### Acciones

- Comparar código con `baseline.md`.
- Confirmar iframe.
- Identificar datos duplicados.
- Localizar rutas raíz-absolutas.
- Detectar estilos y selectores posiblemente sin uso.
- Registrar comportamiento actual.

### Criterios

- Informe previo.
- Sin cambios.
- Archivos y riesgos identificados.
- Confirmación recibida.

### Pruebas

- Tema.
- Menú.
- Formulario.
- Mapa.
- Responsive.

### Defensa

Explicar por qué se establece línea base antes de refactorizar.

## P1-T02 · Normalizar datos y contenido

**Prioridad:** P0  
**Riesgo:** medio  
**Archivos:** `index.html`; JS solo si es indispensable.

### Acciones

- Aplicar horario 6:00–8:30 p. m.
- Corregir ortografía.
- Ampliar contenido con la fuente de verdad.
- Añadir FAQ de edad, requisitos y organización.
- Eliminar correo.
- Eliminar Facebook.
- Mantener Instagram.
- Mantener testimonios.
- No agregar nueva sección.
- No mostrar asesor.

### Criterios

- Sin datos contradictorios.
- Sin enlaces vacíos.
- Sin invenciones.
- Contenido ampliado sin redundancia.

### Pruebas

- Revisión textual.
- Links.
- WhatsApp.
- Maps.

## P1-T03 · SEO básico y rutas

**Prioridad:** P1  
**Riesgo:** medio  
**Archivos:** `index.html` y assets.

### Acciones

- Rutas relativas.
- Favicon.
- `theme-color`.
- Open Graph y Twitter/X.
- `og-logo.png`.
- JSON-LD veraz.
- Canonical pendiente hasta URL pública.
- Sin URL absoluta ficticia para OG.

### Criterios

- Abre localmente.
- Sin recursos rotos.
- Metadatos veraces.

### Pruebas

- Abrir archivo.
- Servidor local.
- Revisar HTML.

### Commit

```text
content: align official pastoral information and metadata
```

# Fase 2 · Base técnica y accesibilidad

## Objetivo

Preparar arquitectura clara e implementar accesibilidad antes del rediseño.

## Dependencia

Fase 1 aprobada.

## P2-T01 · Refactorización estructural controlada

**Prioridad:** P0  
**Riesgo:** alto  
**Archivos:** HTML, CSS y JS.

### Acciones

- Mantener un CSS y JS.
- Reorganizar por bloques.
- Centralizar configuración.
- Crear clases compartidas justificadas.
- Eliminar código muerto confirmado.
- Evitar cambio visual grande.
- Preservar comportamiento.

### Criterios

- Tema, menú, formulario y mapa siguen.
- Código más claro.
- Sin abstracción excesiva.

### Pruebas

- Antes/después.
- Consola.
- Responsive.
- Teclado.

## P2-T02 · Tema sin destello

**Prioridad:** P1  
**Riesgo:** medio

### Acciones

- Aplicar preferencia antes del render visible.
- Mantener clave `tema`.
- Preparar variables del tema oscuro.
- Mantener switch accesible.

### Criterios

- Sin destello perceptible.
- Persistencia.
- Fallo de storage no rompe.

## P2-T03 · Menú móvil accesible

**Prioridad:** P0  
**Riesgo:** alto

### Acciones

- Breakpoint 768 px.
- Escritorio con cuatro enlaces.
- Sidebar con siete.
- Focus trap.
- Restauración de foco.
- Escape.
- Overlay.
- Scroll lock.
- Cierre al cambiar breakpoint.
- `inert` o fallback.

### Pruebas

- Tab y Shift+Tab.
- Escape.
- Resize.
- Touch.

## P2-T04 · Accesibilidad global

**Prioridad:** P0  
**Riesgo:** medio

### Acciones

- Saltar al contenido.
- Landmarks.
- Foco.
- Áreas táctiles.
- Contraste.
- Reduced motion.
- Alt.
- Título de iframe.
- No depender del color.

### Pruebas

- 200 % zoom.
- 320 px.
- Teclado.
- Reduced motion.
- Contraste.

## P2-T05 · Panel de accesibilidad

**Prioridad:** P1  
**Riesgo:** alto

### Acciones

- Botón flotante izquierdo.
- Alto contraste.
- 100/115/130 %.
- Reducir animaciones.
- Subrayar enlaces.
- Restablecer.
- Persistencia.
- Foco.
- Escape.
- Cierre exterior.

### Pruebas

- Combinaciones.
- Recarga.
- Teclado.
- Temas.

## P2-T06 · FAQ y navegación activa

**Prioridad:** P1  
**Riesgo:** medio

### Acciones

- Solo una FAQ abierta.
- Conservar details.
- `IntersectionObserver`.
- Estado activo.
- `aria-current="location"`.

### Criterios

- FAQ base sin JS.
- Estado no depende solo del color.

## P2-T07 · Formulario accesible

**Prioridad:** P0  
**Riesgo:** alto

### Acciones

- Teléfono y origen obligatorios.
- Validación.
- Errores por campo.
- ARIA.
- Popup bloqueado.
- Enlace manual.
- No almacenar.
- No éxito falso.

### Pruebas

- Vacíos.
- Teléfono inválido.
- Popup bloqueado.
- Teclado.

### Commit

```text
feat(a11y): strengthen navigation forms and accessibility controls
```

# Fase 3 · Rediseño visual

## Objetivo

Aplicar el mockup aprobado conservando identidad y comportamiento.

## Dependencia

Fase 2 aprobada.

## P3-T01 · Sistema visual compartido

**Prioridad:** P0  
**Riesgo:** medio

### Acciones

- Variables.
- Botones.
- Cards.
- Encabezados.
- Marcos.
- Espaciado.
- Sombras.
- Estados.

### Criterios

- Paleta exacta.
- Claro, oscuro y contraste.

## P3-T02 · Hero mejorado

**Prioridad:** P0  
**Riesgo:** medio

### Acciones

- Eyebrow.
- Segundo CTA.
- Área de reunión.
- Forma orgánica.
- Hojas.
- Puntos.
- Jerarquía.
- Imagen responsive.

### Pruebas

- 320, 640, 768, 1024.
- Temas.
- Reduced motion.

## P3-T03 · Sobre nosotros y primer paso

**Prioridad:** P1  
**Riesgo:** bajo

### Acciones

- Mejor composición.
- Decoración discreta.
- Tarjetas 01–03.
- Sin alturas rígidas.

## P3-T04 · Actividades e ilustraciones

**Prioridad:** P0  
**Riesgo:** medio

### Acciones

- Sustituir ilustraciones.
- Eliminar `min-height: 520px`.
- Uniformar proporción.
- Integrar contenido.

### Pruebas

- Assets.
- Responsive.
- Zoom.
- Tema oscuro.

## P3-T05 · Resto de secciones

**Prioridad:** P1  
**Riesgo:** medio

### Acciones

- Testimonios ligeros.
- Marco del mapa.
- FAQ.
- Contacto.
- Footer.
- Sin correo/Facebook.

## P3-T06 · Flotantes y movimiento

**Prioridad:** P1  
**Riesgo:** medio

### Acciones

- WhatsApp derecho.
- Accesibilidad izquierdo.
- Safe areas.
- Opacidad idle.
- Hover/focus/touch.
- Movimiento sobrio.

### Criterios

- Nunca invisibles.
- No cubren contenido.
- Reduced motion.

## P3-T07 · Imágenes y metadatos visuales

**Prioridad:** P1  
**Riesgo:** medio

### Acciones

- WebP.
- `picture`.
- `srcset`.
- `sizes`.
- Fallback.
- Favicon.
- OG logo.

### Commit

```text
feat(ui): apply the refined pastoral visual system
```

# Fase 4 · Funcionalidades dinámicas

## Objetivo

Añadir próxima reunión y calendario sin backend.

## P4-T01 · Configuración centralizada

**Prioridad:** P0  
**Riesgo:** medio

Centralizar:

- WhatsApp.
- recurrencia;
- hora;
- duración;
- timezone;
- ubicación;
- Maps.

## P4-T02 · Calcular próxima reunión

**Prioridad:** P0  
**Riesgo:** alto

### Acciones

- Fecha de Costa Rica.
- Segundo y cuarto sábado.
- Mantener reunión de hoy hasta 20:30.
- Formatear en español.
- Renderizar Hero.

### Casos de prueba

- antes del segundo;
- entre segundo y cuarto;
- después del cuarto;
- día antes de 18:00;
- durante;
- después de 20:30;
- diciembre a enero.

## P4-T03 · Calendario ICS

**Prioridad:** P1  
**Riesgo:** alto

### Acciones

- Inicio y fin.
- TZID.
- Ubicación.
- Maps.
- WhatsApp.
- Blob.
- Descarga.
- Revocar URL.

## P4-T04 · Fallbacks

**Prioridad:** P1  
**Riesgo:** medio

- Mantener recurrencia estática.
- Error discreto.
- Desactivar calendario si no hay fecha válida.
- No romper otras funciones.

### Commit

```text
feat(schedule): calculate meetings and export calendar events
```

# Fase 5 · Refactorización final y auditoría

## P5-T01 · CSS

**Prioridad:** P1  
**Riesgo:** alto

- Duplicación.
- Código muerto.
- Especificidad.
- Media queries.
- Legibilidad.
- Sin cifra arbitraria.

## P5-T02 · JavaScript

**Prioridad:** P1  
**Riesgo:** alto

- Duplicación.
- Listeners.
- Blob URLs.
- Aislamiento de fallos.
- Nombres.
- Privacidad.

## P5-T03 · HTML, SEO y assets

**Prioridad:** P1  
**Riesgo:** medio

- Semántica.
- IDs.
- Labels.
- ARIA.
- Enlaces.
- Metadatos.
- Assets.
- Canonical al publicar.
- OG absoluto al publicar.

## P5-T04 · Auditoría final

**Prioridad:** P0  
**Riesgo:** medio

- 320, 375, 640, 768, 1024, 1440.
- Zoom 200 %.
- Texto 130 %.
- Temas.
- Reduced motion.
- Teclado.
- Scroll horizontal.
- Imágenes.

## P5-T05 · Documentación

**Prioridad:** P0  
**Riesgo:** bajo

- Checklist.
- Baseline.
- Pendientes.
- Resumen.
- Defensa.

### Commit

```text
refactor: consolidate landing page code and complete final audit
```
