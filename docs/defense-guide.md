# Guía breve para la defensa oral

## HTML semántico

`header`, `nav`, `main`, `section`, `article`, `figure`, `address` y `footer` comunican la estructura al navegador y a tecnologías de asistencia.

## Flexbox

Alinea elementos en un eje:

- header;
- botones;
- controles;
- footer;
- interiores de cards.

## Grid

Organiza filas y columnas:

- Hero;
- Sobre nosotros;
- cards;
- ubicación;
- contacto.

## Mobile-first

Los estilos base son móviles y luego se amplían con `min-width`. Reduce sobrescrituras y prioriza contenido.

## Variables CSS

Centralizan colores, espacios, fuentes y estados. Permiten claro, oscuro y contraste sin duplicar selectores.

## localStorage

Tema y accesibilidad deben persistir. No se usa para datos personales.

## Focus trap

Mientras un panel está abierto, Tab y Shift+Tab permanecen dentro. Evita navegar por controles ocultos.

## inert

Desactiva interacción y foco de una región, útil para sidebar cerrado.

## IntersectionObserver

Detecta la sección visible sin lógica pesada en cada evento de scroll.

## Reuniones

1. Fecha de Costa Rica.
2. Sábados del mes.
3. Segundo y cuarto.
4. Descartar reuniones terminadas.
5. Si no quedan, siguiente mes.

## Timezone

La reunión pertenece a Costa Rica aunque el visitante esté en otro país.

## ICS

Formato estándar de calendario generado en el navegador.

## Blob

Representa datos en memoria como archivo descargable, sin servidor.

## picture y srcset

El navegador elige tamaño y formato adecuado con fallback.

## Formulario

Valida, construye texto, usa `encodeURIComponent` y abre `wa.me`. No envía ni guarda datos.

## Sin backend

WhatsApp resuelve contacto y las fechas se calculan localmente.

## Sin frameworks

El alcance no los necesita y la restricción académica exige tecnologías nativas.

## Refactorización

Se elimina duplicación, no claridad.

## Accesibilidad

- semántica;
- teclado;
- foco;
- contraste;
- labels;
- errores;
- reduced motion;
- texto ampliable;
- mejora progresiva.

El panel complementa, no sustituye, la accesibilidad base.
