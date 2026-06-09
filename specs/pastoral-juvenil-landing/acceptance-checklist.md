# Acceptance Checklist · Pastoral Juvenil SMP · Landing Page

Each item maps directly to a lab requirement or rubric point. All items must pass before the project is considered complete.

---

## HTML5 Semántico

- [ ] The page has exactly one `<h1>`, located in the hero section.
- [ ] Section titles use `<h2>`; card titles use `<h3>`.
- [ ] The following semantic elements are present: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`, `<figure>`, `<blockquote>`, `<figcaption>`, `<form>`.
- [ ] The `<nav>` in the header has `aria-label="Navegación principal"`.
- [ ] If a second `<nav>` exists in the footer, it has `aria-label="Navegación de pie de página"`.
- [ ] Every primary `<section>` has `aria-labelledby` pointing to the `id` of its `<h2>`.
- [ ] HTML passes W3C Validator (validator.w3.org) with zero errors.

---

## CSS Externo

- [ ] All styles live in a single external file: `/css/styles.css`.
- [ ] No inline styles are used for layout or visual design.
- [ ] No CSS framework is imported (no Bootstrap, Tailwind, Bulma, or similar).
- [ ] CSS custom properties (`--variables`) are defined in `:root` for colors, fonts, and spacing.
- [ ] Dark theme overrides are applied via `body.dark-theme` using the same custom properties.

---

## Flexbox

- [ ] Flexbox is applied to the `<header>` for horizontal alignment of logo, nav, and button.
- [ ] Flexbox is applied to `<nav>` link distribution.
- [ ] Flexbox is applied to at least one other element (e.g., hero CTA group, footer links).
- [ ] Can explain: "Flexbox aligns elements along a single axis — row or column."

---

## CSS Grid

- [ ] CSS Grid is applied to the activities cards container.
- [ ] CSS Grid is applied to the testimonials cards container.
- [ ] CSS Grid is applied to the primer paso cards container.
- [ ] Cards display 1 column on mobile, 2 on tablet, 3 on desktop.
- [ ] Can explain: "Grid creates rows and columns that adapt automatically to screen width."

---

## Media Queries

- [ ] Base styles target mobile (< 640px) — mobile-first approach.
- [ ] Breakpoint at `min-width: 640px` adjusts layout for tablet.
- [ ] Breakpoint at `min-width: 1024px` adjusts layout for desktop.
- [ ] Maximum container width is set (1100px or 1200px) with `margin: 0 auto`.
- [ ] All layout units use `rem`, `%`, or `fr` — no fixed `px` widths on fluid containers.

---

## Accesibilidad

- [ ] Every `<img>` has an `alt` attribute — meaningful for informational images, empty (`alt=""`) for decorative ones.
- [ ] Every form field has an associated `<label>` using `for`/`id`. No placeholder-only fields.
- [ ] `:focus-visible` is styled with a visible outline. `outline: none` is never used without a replacement.
- [ ] All links, buttons, and form fields are reachable by pressing Tab.
- [ ] All links and buttons can be activated with Enter key.
- [ ] Color contrast meets at least WCAG AA on all text/background combinations.
- [ ] If a hamburger menu is used, `aria-expanded` is updated via JavaScript on toggle.

---

## Web Storage (JavaScript — localStorage)

- [ ] A theme-toggle button is visible in the header.
- [ ] Clicking the button toggles the `.dark-theme` class on `<body>`.
- [ ] The current theme preference is saved to `localStorage` with key `tema`.
- [ ] On page load, the saved theme is read from `localStorage` and applied before first render.
- [ ] Reloading the page preserves the selected theme.
- [ ] `sessionStorage` is NOT used for this feature.
- [ ] Can explain the difference: "localStorage persists after closing the browser; sessionStorage is lost when the tab closes."

---

## JavaScript Nativo

- [ ] All JavaScript lives in a single external file: `/js/main.js`.
- [ ] No JavaScript libraries or CDN scripts are imported.
- [ ] The browser console shows zero errors on page load.
- [ ] JavaScript is limited to what is strictly necessary (theme toggle + optional hamburger menu).

---

## Responsive (manual test)

- [ ] On mobile (< 640px): single column, stacked nav, wide buttons, readable text.
- [ ] On tablet (640–1023px): 2-column grid for cards where appropriate.
- [ ] On desktop (>= 1024px): 3-column cards, 2-column hero (if image present).
- [ ] No horizontal scroll appears at any tested viewport width.
- [ ] The nav on mobile does not overlap or visually break the hero section.

---

## Content

- [ ] Hero `<h1>` reads: "Pastoral Juvenil San Martín de Porres".
- [ ] Hero subtitle is present and describes the group's identity.
- [ ] CTA button "Quiero participar" links to the contact section.
- [ ] Primer paso section contains exactly 3 cards addressing first-timer concerns.
- [ ] Actividades section contains exactly 3 activity cards.
- [ ] Testimonios section contains 1–3 testimonials using semantic markup.
- [ ] Contact form has at most 3 fields, all labeled.
- [ ] WhatsApp direct link is present in the contact section.
- [ ] Footer includes parish name, city, and contact data inside `<address>`.

---

## Performance & Delivery

- [ ] Images are in WebP format (or well-compressed JPG/PNG) — no oversized source files.
- [ ] Google Fonts are loaded with `display=swap`.
- [ ] No more than 2 font families are loaded.
- [ ] No animations are present, OR all animations respect `prefers-reduced-motion`.
- [ ] `<title>`, `<meta name="description">`, and `<meta name="viewport">` are set.
- [ ] `<html lang="es">` is set.
- [ ] All files are committed and pushed to the correct GitHub repository.

---

## Defense Readiness

- [ ] Can explain why Flexbox was used (single-axis alignment).
- [ ] Can explain why Grid was used (multi-column adaptive layout).
- [ ] Can explain what `viewport` does (adapts page width to the device screen).
- [ ] Can explain what `localStorage` saves (theme preference: `"light"` or `"dark"`).
- [ ] Can explain why `localStorage` and not `sessionStorage` (persistence after close/reload).
- [ ] Can explain the accessibility decisions: semantic HTML, labels, alt text, focus, contrast.
- [ ] Can explain why `aria-label` is on `<nav>` (screen readers need to identify navigation purpose).
- [ ] Can explain why `aria-labelledby` is on sections (associates sections with their headings programmatically).
- [ ] Can explain why no frameworks were used (lab requires native CSS; demonstrates real layout mastery).
