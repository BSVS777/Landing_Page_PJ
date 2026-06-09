# Requirements · Pastoral Juvenil SMP · Landing Page

## Project Overview

Landing page for Pastoral Juvenil San Martín de Porres (Ciudad Quesada, San Carlos, Costa Rica). The goal is to invite young people to participate in the group, providing clear contact information and reducing the friction of arriving for the first time.

**Constraints:** HTML5 + CSS3 nativo + JavaScript mínimo. No external frameworks (no Bootstrap, Tailwind, Bulma). No backend. Single-page, no internal routes.

---

## Functional Requirements

### FR-01 · Page Sections

The page must include the following sections in this order:

| ID | Section | HTML element |
|---|---|---|
| FR-01-A | Header / Navigation | `<header>` + `<nav>` |
| FR-01-B | Hero | `<section>` |
| FR-01-C | Sobre nosotros | `<section>` |
| FR-01-D | Primer paso | `<section>` |
| FR-01-E | Actividades | `<section>` + `<article>` cards |
| FR-01-F | Testimonios | `<section>` + `<figure>` |
| FR-01-G | Contacto | `<section>` + `<form>` |
| FR-01-H | Footer | `<footer>` + `<address>` |
| FR-01-I | Galería | Optional — only if time allows, max 3 images |

### FR-02 · Navigation

- The `<nav>` must contain links that allow jumping to each main section via anchor.
- Must include a visible theme-toggle button ("Cambiar tema").
- On mobile, the nav items stack vertically using CSS only (no JS hamburger menu unless fully understood).
- If a hamburger menu is implemented, it must use `aria-expanded` updated via JavaScript.

### FR-03 · Hero Section

- `<h1>`: "Pastoral Juvenil San Martín de Porres"
- Subtitle: "Somos jóvenes de San Carlos que encontramos en la fe y el servicio un lugar para crecer juntos."
- Primary CTA button: "Quiero participar" — links to the contact section.

### FR-04 · Sobre Nosotros

- Brief text about San Martín de Porres, humility, service, and community.
- Include parish name and spiritual advisor name when data is confirmed.

### FR-05 · Primer Paso (3 cards)

Each card addresses a common fear of first-time attendees:

1. **¿Dónde llegar?** — physical location / meeting place.
2. **¿Qué pasa al entrar?** — brief description of what happens at arrival.
3. **¿Qué necesito llevar?** — answer: nothing special; no prior experience required.

### FR-06 · Actividades (3 cards)

1. **Reuniones semanales** — day, time, and location (add when confirmed).
2. **Servicio social** — brief description.
3. **Retiros espirituales** — brief description.

Cards must be laid out using CSS Grid.

### FR-07 · Testimonios (3 max)

- Use `<figure>`, `<blockquote>`, and `<figcaption>` for each.
- Maximum 3 testimonials — real or clearly marked as placeholder.
- Cards laid out with CSS Grid.

### FR-08 · Contact Form

- Fields: `nombre`, `teléfono/WhatsApp`, `cómo nos conociste`.
- Maximum 3 fields — no more.
- Every `<input>` and `<select>` must have an associated `<label>` using `for`/`id`.
- Include a direct WhatsApp link button as an alternative contact method.
- The form does not need to submit to a backend (static behavior is acceptable for the lab).

### FR-09 · Footer

- Group/org name and logo (or text).
- Parish name and city: Ciudad Quesada.
- Social media links.
- Contact information using `<address>`.

### FR-10 · Theme Toggle (Web Storage)

- A button in the header toggles between `light` and `dark` themes.
- Theme is applied by adding/removing class `.dark-theme` on `<body>`.
- Preference is saved to `localStorage` with key `tema` and value `"dark"` or `"light"`.
- On page load, the saved preference is read and applied before first render.
- `sessionStorage` must NOT be used for this feature.

---

## Non-Functional Requirements

### NFR-01 · Technology stack

- HTML5 semantic markup only.
- CSS3 in a single external file: `/css/styles.css`.
- JavaScript in a single external file: `/js/main.js`. No libraries or CDN scripts.
- No CSS frameworks of any kind.

### NFR-02 · Responsive (Mobile-first)

| Breakpoint | Behavior |
|---|---|
| Base `< 640px` | Single column. Wide buttons. Stacked cards. Vertical nav. |
| Tablet `>= 640px` | 2-column grid for activities and testimonials where space allows. |
| Desktop `>= 1024px` | Hero in 2 columns; cards in 3 columns. |

- Maximum container width: `1100px` or `1200px`, centered with `margin: 0 auto`.
- Use `rem` for typography and spacing; `%` / `fr` units for grid columns.

### NFR-03 · Performance

- Images: WebP format preferred. Max 1 hero image + 3 for testimonials/gallery.
- Fonts: maximum 2 families (Lora + Inter), loaded with `display=swap`.
- Animations: not required. If used, apply hover-only and respect `prefers-reduced-motion`.

### NFR-04 · SEO baseline

- `<title>` set.
- `<meta name="description">` set.
- `<meta name="viewport">` set.
- `lang="es"` on `<html>`.
- Basic Open Graph tags (`og:title`, `og:description`, `og:image`).
- Schema.org and web manifest are optional (out of base scope).

### NFR-05 · Validation

- HTML must pass W3C Validator (validator.w3.org) with no errors.
- No JavaScript errors in the browser console.
- No external framework imports present.
