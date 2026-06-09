# Tasks · Pastoral Juvenil SMP · Landing Page

Implementation plan derived from the 6-day schedule in the project plan. Tasks are ordered sequentially — each day's work builds on the previous.

---

## Day 1 · Semantic HTML structure

Goal: `index.html` valid, semantic, with correct ARIA from the start.

- [ ] Create `index.html` with `<!DOCTYPE html>`, `lang="es"`, `<meta charset>`, `<meta name="viewport">`, `<title>`, `<meta name="description">`.
- [ ] Add Open Graph meta tags: `og:title`, `og:description`, `og:image`.
- [ ] Link `/css/styles.css` and `/js/main.js` (files can be empty at this stage).
- [ ] Build `<header>` with `<nav aria-label="Navegación principal">` and theme-toggle `<button>`.
- [ ] Build `<main>` containing all sections in order:
  - `<section aria-labelledby="hero-titulo">` with `<h2 id="hero-titulo">` (or `<h1>` directly in hero — see note).
  - `<section aria-labelledby="nosotros-titulo">` with `<h2 id="nosotros-titulo">`.
  - `<section aria-labelledby="primer-paso-titulo">` with `<h2 id="primer-paso-titulo">`.
  - `<section aria-labelledby="actividades-titulo">` with `<h2 id="actividades-titulo">`.
  - `<section aria-labelledby="testimonios-titulo">` with `<h2 id="testimonios-titulo">`.
  - `<section aria-labelledby="contacto-titulo">` with `<h2 id="contacto-titulo">`.
- [ ] Build `<footer>` with `<address>` for contact/location data.
- [ ] Add activity cards as `<article>` elements inside the activities section.
- [ ] Add testimonial cards using `<figure>`, `<blockquote>`, `<figcaption>`.
- [ ] Build contact `<form>` with 3 fields: `nombre`, `telefono`, `como-nos-conociste`. Each field must have a `<label for="...">` matching the input `id`.
- [ ] Add WhatsApp link button in the contact section.
- [ ] Validate at validator.w3.org — fix all errors before moving to Day 2.

> **ARIA rule:** Every `<section>` that is a primary landmark must have `aria-labelledby` pointing to its heading `id`. If there are two `<nav>` elements (header + footer), each needs a distinct `aria-label`.

---

## Day 2 · Mobile-first base styles

Goal: clean, readable design on mobile (< 640px).

- [ ] Define all CSS custom properties in `:root` (colors, fonts, spacing, radius, max-width).
- [ ] Define `body.dark-theme` property overrides.
- [ ] Set `box-sizing: border-box` globally.
- [ ] Apply base typography: `font-family`, `font-size`, `line-height` on `body`.
- [ ] Style the `<header>`: Flexbox, background, padding.
- [ ] Style `<nav>`: stacked vertical layout for mobile, spacing between links.
- [ ] Style the theme-toggle button: visible and keyboard-focusable.
- [ ] Style the Hero section: single-column layout, heading size, subtitle, CTA button.
- [ ] Style the CTA button with accent color and hover state.
- [ ] Style section base: `padding`, `max-width` container, `margin: 0 auto`.
- [ ] Style the contact form: full-width inputs, labels above fields, submit button.
- [ ] Style the footer: padding, text alignment, `<address>` normalization.
- [ ] Apply `:focus-visible` outline on all interactive elements. Never use `outline: none` without a replacement.

---

## Day 3 · Grid, Flexbox, and responsive breakpoints

Goal: layout works correctly at tablet (>= 640px) and desktop (>= 1024px).

- [ ] Apply CSS Grid to `.activities-grid`: `repeat(auto-fit, minmax(280px, 1fr))`.
- [ ] Apply CSS Grid to `.testimonials-grid`: same pattern.
- [ ] Apply CSS Grid to `.first-step-grid`: same pattern.
- [ ] Apply Flexbox to the hero (2-column layout on desktop if an image is used).
- [ ] Write `@media (min-width: 640px)` overrides for 2-column grids.
- [ ] Write `@media (min-width: 1024px)` overrides for 3-column grids and 2-column hero.
- [ ] Test nav layout on mobile: verify it does not overlap the hero or appear broken.
- [ ] Verify container max-width is respected on wide screens.
- [ ] Verify all images are responsive (`max-width: 100%`, `height: auto`).

---

## Day 4 · localStorage theme toggle

Goal: Web Storage functional and explainable.

- [ ] In `main.js`, select the theme-toggle button with `document.querySelector`.
- [ ] On script load: read `localStorage.getItem('tema')`. If value is `"dark"`, add class `dark-theme` to `document.body`.
- [ ] Add a `click` event listener to the button.
- [ ] On click: toggle class `dark-theme` on `document.body`.
- [ ] On click: check if body has class `dark-theme` and save `localStorage.setItem('tema', 'dark')` or `localStorage.setItem('tema', 'light')` accordingly.
- [ ] Reload the page and confirm the theme persists.
- [ ] Open DevTools → Application → Local Storage and verify the key `tema` exists with the correct value.
- [ ] Confirm no other JavaScript is added unless strictly necessary.

> **Pseudocode (for defense reference):**
> 1. Find the toggle button.
> 2. Check `localStorage` for a saved theme.
> 3. If `"dark"`, apply `.dark-theme` to body.
> 4. On button click: toggle `.dark-theme`.
> 5. Save current state (`"dark"` or `"light"`) to `localStorage`.

---

## Day 5 · Accessibility, real content, and contrast review

Goal: page ready for final testing.

- [ ] Replace all placeholder text with final or near-final content.
- [ ] Confirm there is exactly one `<h1>` on the page (in the hero).
- [ ] Confirm all other sections use `<h2>` titles and cards use `<h3>`.
- [ ] Verify every `<img>` has a meaningful `alt` attribute (or `alt=""` for decorative images).
- [ ] Verify every form field has a `<label>` — no placeholder-only fields.
- [ ] Run a keyboard navigation test: Tab through the entire page. Every link, button, and input must be reachable and activatable with Enter.
- [ ] Check color contrast for gold (`#C29B57`) on any background it is used with — adjust if WCAG AA is not met.
- [ ] Review dark theme for contrast issues on all text/background combinations.
- [ ] Confirm `aria-label="Navegación principal"` is present on the header `<nav>`.
- [ ] If a footer `<nav>` exists, confirm it has `aria-label="Navegación de pie de página"`.
- [ ] Confirm each `<section>` has `aria-labelledby` pointing to its heading `id`.
- [ ] If a hamburger menu was implemented, confirm `aria-expanded` is toggled via JavaScript.

---

## Day 6 · Validation, testing, and GitHub delivery

Goal: final delivery without visible errors.

- [ ] Validate HTML at validator.w3.org — zero errors.
- [ ] Test responsive layout manually: mobile (< 640px), tablet (640–1023px), desktop (>= 1024px).
- [ ] Test theme toggle: switch to dark, reload page — dark theme must persist.
- [ ] Test theme toggle: switch to light, reload page — light theme must persist.
- [ ] Open browser console — confirm zero JavaScript errors.
- [ ] Confirm no `<link>` or `<script>` tags import any external framework or CSS library.
- [ ] Confirm images are optimized (WebP, no oversized files).
- [ ] Commit all files and push to the correct GitHub repository before the deadline.

### Pre-delivery checklist

- [ ] `index.html` — validated, no errors.
- [ ] `css/styles.css` — single external file, no `@import` of frameworks.
- [ ] `js/main.js` — single external file, no library imports.
- [ ] `img/` — only optimized images used in the page.
- [ ] Repository URL shared with the professor.
