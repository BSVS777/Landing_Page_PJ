# Design Spec · Pastoral Juvenil SMP · Landing Page

## Visual Identity

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FDFBF7` | Main background (warm cream — avoids pure white) |
| `--color-text` | `#1A1A1A` | Primary text (charcoal — high contrast for readability) |
| `--color-accent` | `#C29B57` | Accent: buttons, hover states, visual details. Use sparingly. |
| `--color-surface` | `#EBE3D5` | Secondary backgrounds, soft section dividers, card fills |
| `--color-bg-dark` | `#1A1A1A` | Background in dark theme |
| `--color-text-dark` | `#FDFBF7` | Text in dark theme |
| `--color-surface-dark` | `#2A2A2A` | Card/surface fill in dark theme |

**Contrast note:** `#1A1A1A` on `#FDFBF7` achieves >7:1 (WCAG AAA). Verify gold (`#C29B57`) against any text it is paired with in CTA buttons — use a dark text fallback if contrast is insufficient.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display / Headings | Lora (serif) | Load via Google Fonts with `display=swap`. Used for `<h1>`, `<h2>`. |
| Body / UI | Inter (sans-serif) | Load via Google Fonts with `display=swap`. Used for body text, labels, nav. |
| Fallback | `Arial, sans-serif` | Applied in font-stack for both roles. |

**Type scale (suggested):**

| Level | Size | Weight | Usage |
|---|---|---|---|
| `<h1>` | `2.5rem–3rem` | 700 | Hero title only |
| `<h2>` | `1.75rem–2rem` | 600 | Section titles |
| `<h3>` | `1.25rem` | 600 | Card titles |
| Body | `1rem` | 400 | Paragraphs, form labels |
| Small / Caption | `0.875rem` | 400 | `<figcaption>`, footer meta |

Line height: `1.6` for body text. Heading line height: `1.2`.

---

## Layout

### CSS Variables (define in `:root`)

```css
:root {
  --color-bg: #FDFBF7;
  --color-text: #1A1A1A;
  --color-accent: #C29B57;
  --color-surface: #EBE3D5;
  --font-display: 'Lora', Arial, serif;
  --font-body: 'Inter', Arial, sans-serif;
  --container-max: 1100px;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --radius: 8px;
}

body.dark-theme {
  --color-bg: #1A1A1A;
  --color-text: #FDFBF7;
  --color-surface: #2A2A2A;
}
```

### Flexbox Usage

Apply Flexbox to:
- `<header>` — align logo/nav and theme button in a row.
- `<nav>` — distribute links horizontally (desktop) / vertically (mobile).
- Hero CTA button group — center or left-align button(s).
- Footer links row.

**Defense rationale:** Flexbox distributes elements along a single axis (row or column).

### CSS Grid Usage

Apply Grid to:
- `.activities-grid` — 3 cards on desktop, 2 on tablet, 1 on mobile.
- `.testimonials-grid` — same responsive columns as activities.
- `.first-step-grid` — 3 cards on desktop, 1 on mobile.

**Grid pattern:**

```css
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}
```

**Defense rationale:** Grid creates multi-column, multi-row layouts that adapt automatically to screen width.

### Responsive Breakpoints

Mobile-first approach — base styles target `< 640px`.

```css
/* Tablet */
@media (min-width: 640px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

---

## Section-by-Section Layout Notes

### Header

```
[ Logo / Name ]  [ nav links ]  [ Cambiar tema ]
```
- Sticky or fixed header optional.
- On mobile: nav items stack vertically below the logo row.

### Hero

```
Desktop:                    Mobile:
[ Heading       | Image ]   [ Heading ]
[ Subtitle      |       ]   [ Subtitle ]
[ CTA button    |       ]   [ CTA button ]
```

Use CSS Grid (2-col) on desktop; single column on mobile.

### Cards (Primer Paso, Actividades, Testimonios)

```
[ Card 1 ] [ Card 2 ] [ Card 3 ]   ← desktop (3-col grid)
[ Card 1 ] [ Card 2 ]              ← tablet (2-col grid)
[ Card 1 ]                         ← mobile (1-col)
```

### Contact Section

Form aligned center or left. WhatsApp button visually distinct (green accent or outlined).

### Footer

```
[ Logo / Name ]
[ Parish · Ciudad Quesada ]
[ Social links ]
[ <address> contact data ]
```

---

## Dark Theme

Class `.dark-theme` applied to `<body>`. Swap CSS custom properties only — do not duplicate selectors. All color usage must go through `var(--color-*)` so the theme switch works automatically.

---

## Image Guidelines

- Format: WebP preferred.
- Hero image: 1 (can be omitted if no suitable image is available — text-only hero is valid).
- Testimonial/gallery images: max 3.
- All images must have meaningful `alt` text. Decorative images use `alt=""`.
- Do not include oversized source files — optimize before including in repo.
