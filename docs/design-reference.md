# Maison Parfum — Design Reference

Source of truth for UI implementation. Synthesized from brand direction, `.cursor/rules/design-system.mdc`, `.cursor/rules/component-patterns.mdc`, design tokens in `app/globals.css`, and current component implementations.

---

## Brand Direction

Maison Parfum is a **luxury fragrance house** with an **editorial aesthetic** and **premium minimalism**.

### Reference Houses

| Brand | What to borrow |
|---|---|
| **Byredo** | Clean grids, generous whitespace, product-first layouts |
| **Le Labo** | Typographic confidence, utilitarian elegance, restrained color |
| **Diptyque** | Editorial storytelling, serif authority, artisanal warmth |
| **Maison Francis Kurkdjian** | Refined luxury, high contrast, understated opulence |

### Principles

1. **Restraint over decoration** — imagery and typography lead
2. **Whitespace is a feature** — never fill space for its own sake
3. **Quiet confidence** — no loud badges, gradients, or marketplace density
4. **Curated, not crowded** — every section should feel intentional

---

## Layout Patterns

### Page Shell

Every page follows:

```
Navbar
<main>
  … page content …
</main>
Footer
```

- `Navbar` — fixed height (`h-20`), bordered bottom, ivory background
- `Footer` — dark (`--secondary`) three-column grid on desktop
- Inner pages use `<main>` with one or more `<section>` elements

### Container

All horizontal layout flows through `Container`:

| Property | Value |
|---|---|
| Max width | `max-w-7xl` (1280px) |
| Padding | `px-4` → `sm:px-6` → `lg:px-8` |
| Alignment | `mx-auto w-full` |

Never duplicate this wrapper.

### Common Layout Grids

| Pattern | Classes | Usage |
|---|---|---|
| **Card grid** | `grid gap-8 md:grid-cols-2 lg:grid-cols-3` | Products, collections, testimonials |
| **Editorial split** | `grid items-center gap-12 lg:grid-cols-2` | Hero, brand story, product detail |
| **Sidebar layout** | `grid gap-8 lg:grid-cols-[1fr_320px]` or `[1fr_360px]` | Cart, checkout |
| **Filter + grid** | `grid gap-8 lg:grid-cols-[240px_1fr]` | Collections catalog |
| **Centered empty state** | `mx-auto max-w-lg` inside `Container` | Empty cart, wishlist |

### Page Header Band

Used on catalog and utility pages (collections, cart, checkout, wishlist):

```
section.border-b.border-[var(--border)].bg-[var(--muted)].py-12.md:py-16
  Container
    eyebrow (subtitle)
    h1 (page title)
```

Distinct from homepage marketing sections which use larger padding.

---

## Typography System

### Font Families

| Role | Token | Family | Usage |
|---|---|---|---|
| Headings | `--font-heading` | Playfair Display (serif) | Titles, logo, editorial copy |
| Body | `--font-body` | Inter (sans-serif) | Paragraphs, UI labels, forms |

Apply heading font via:

```html
className="font-[family-name:var(--font-heading)]"
```

Body font should be applied on `<body>` (token is loaded; apply `font-[family-name:var(--font-body)]` globally as a future improvement).

### Type Scale

| Level | Element | Classes | Context |
|---|---|---|---|
| **Display** | `h1` | `text-5xl lg:text-7xl font-semibold leading-tight` | Hero only |
| **Page title** | `h1` | `text-3xl md:text-5xl font-semibold` | Page headers |
| **Section title** | `h2` | `text-3xl md:text-5xl font-semibold` | `SectionTitle` |
| **Sub-section** | `h2` | `text-2xl md:text-3xl font-semibold` | In-page sections |
| **Card title** | `h3` | `text-lg` to `text-2xl font-medium/semibold` | Product, collection cards |
| **Panel title** | `h2` | `text-xl font-semibold` | Summary panels, forms |
| **Body** | `p` | `text-lg leading-relaxed text-gray-600` | Descriptions |
| **UI body** | `p` | `text-sm` | Metadata, labels |
| **Price** | `p` | `text-xl` to `text-3xl font-semibold` | Product pricing |

### Eyebrow Labels

Small uppercase labels above titles:

| Variant | Classes | Used in |
|---|---|---|
| Standard | `text-sm uppercase tracking-widest text-gray-500` | SectionTitle, page headers, product info |
| Editorial | `text-sm uppercase tracking-[0.3em] text-gray-500` | Hero, brand story |

**Target:** consolidate to `tracking-widest` everywhere.

### Hierarchy Order

```
Eyebrow (subtitle)
  → Primary title (h1 or h2)
    → Supporting text (body)
      → Metadata (brand, rating, caption)
        → Price / CTA
```

One primary focal point per section. Avoid competing large headings on the same viewport.

---

## Spacing System

### Philosophy

Prefer **whitespace over density**. Luxury layouts breathe.

### Section Padding

| Tier | Classes | Context |
|---|---|---|
| **Marketing** | `py-20` or `py-20 lg:py-32` | Homepage sections (hero, featured, newsletter) |
| **Catalog** | `py-12 md:py-16` | Collections, product, cart, checkout, wishlist |
| **Related / footer bands** | `py-16 md:py-20` | Related products, transitional sections |

### Internal Spacing

| Token | Value | Usage |
|---|---|---|
| Section title margin | `mb-8` | Below `SectionTitle` |
| Eyebrow to title | `mb-2` or `mb-4` | Page/section headers |
| Title to body | `mb-6` or `mb-8` | Hero, story blocks |
| Card content gaps | `mt-1`, `mt-2`, `mt-4` | Inside cards |
| Grid gap | `gap-8` (default), `gap-12` (editorial splits) | All grids |
| Form field gap | `gap-4` | Form rows |
| Section stack | `space-y-8` | Checkout form sections |

### Content Width

| Type | Max width | Usage |
|---|---|---|
| Prose | `max-w-xl` | Hero supporting copy |
| Long-form | `max-w-3xl` | Product descriptions |
| Empty states | `max-w-lg` | Centered messages |
| Page | `max-w-7xl` via Container | All page content |

---

## Color Usage

### Design Tokens (`app/globals.css`)

| Token | Hex | Role |
|---|---|---|
| `--background` | `#f8f5f0` | Page background — warm ivory |
| `--foreground` | `#111111` | Primary text (target; apply globally) |
| `--primary` | `#c9a45c` | Gold accent — CTAs, focus rings, stars |
| `--primary-foreground` | `#ffffff` | Text on primary buttons |
| `--secondary` | `#1a1a1a` | Footer, dark surfaces |
| `--secondary-foreground` | `#ffffff` | Text on dark surfaces |
| `--muted` | `#e9e4dc` | Alternating section backgrounds |
| `--border` | `#d9d3ca` | Card borders, dividers, inputs |

### Usage Rules

| Role | Token / class | Notes |
|---|---|---|
| Page background | `bg-[var(--background)]` | Default surface |
| Section alternate | `bg-[var(--muted)]` | Featured collections, testimonials, related products |
| Card surface | `bg-white` | Cards, form panels, inputs on white |
| Primary CTA | `bg-[var(--primary)]` | Buttons, selected size chips |
| Dividers | `border-[var(--border)]` | Cards, sections, form fields |
| Muted text | `text-gray-500` / `text-gray-600` | Secondary info (migrate to tokens over time) |
| Footer | `bg-[var(--secondary)]` | Inverted dark band |
| Accent sparingly | `text-[var(--primary)]` | Icons, stars, hover on dark footer |

### Do Not

- Use bright saturated colors
- Use decorative gradients or glows
- Use drop shadows for depth (use borders + spacing instead)
- Overuse gold — it is an accent, not a fill

---

## Card Design

### Shared Card Shell

All product-style cards share:

```
rounded-3xl
border border-[var(--border)]
bg-white
overflow-hidden (when image bleeds to edge)
```

No box shadows.

### Card Variants

| Component | Image | Padding | Title | Notes |
|---|---|---|---|---|
| `ProductCard` | `h-80`, hover `scale-105` 300ms | `p-5` | `text-lg font-medium` | Brand, rating, price below |
| `CollectionCard` | `h-96`, hover `scale-105` 500ms | `p-6` | `text-2xl font-semibold` serif | Description below |
| `TestimonialCard` | none | `p-6` | serif name in footer | Quote + star rating |
| **Panel** (summary, form) | none | `p-6 md:p-8` | `text-xl` serif | Sticky on desktop where applicable |

### Card Content Order

**Product card:**
1. Image (full bleed top)
2. Brand (`text-sm text-gray-500`)
3. Name (`text-lg font-medium`)
4. Rating + review count
5. Price (`text-xl font-semibold`)

### Hover Behavior

- **Images:** subtle scale (`scale-105`), 300–500ms
- **Linked cards:** wrapper `hover:opacity-90` on `Link`
- **No** shadow, bounce, or lift effects

---

## Section Structure

### Standard Marketing Section

```tsx
<section className="py-20">
  <Container>
    <SectionTitle subtitle="..." title="..." />
    {/* content grid or stack */}
  </Container>
</section>
```

### Muted Background Section

Add `bg-[var(--muted)]` to alternate visual rhythm on homepage.

### Editorial Split Section (Hero / Brand Story)

```tsx
<section className="py-20 lg:py-32">
  <Container>
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* text column */}
      {/* image column in rounded-3xl frame */}
    </div>
  </Container>
</section>
```

Brand story reverses column order on mobile with `order-1` / `order-2`.

### Page Header Section

```tsx
<section className="border-b border-[var(--border)] bg-[var(--muted)] py-12 md:py-16">
  <Container>
    <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">{eyebrow}</p>
    <h1 className="text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">{title}</h1>
  </Container>
</section>
```

### Required Primitives

| Primitive | When |
|---|---|
| `Container` | Every section |
| `SectionTitle` | Section headings on marketing blocks (renders `h2`) |
| Inline `h1` | Page-level titles only |

---

## Visual Hierarchy

### Homepage Flow

```
Hero (largest type, single CTA)
  → Collections (muted band, card grid)
    → Products (card grid)
      → Testimonials (muted band)
        → Brand Story (editorial split)
          → Newsletter (centered card)
            → Footer (dark, inverted)
```

### Focal Point Rules

1. **One hero moment per page** — largest typography lives here
2. **Section titles center-aligned** via `SectionTitle` — establishes rhythm
3. **Product imagery** competes only with titles, not with UI chrome
4. **CTAs are singular** — one primary button per content block
5. **Price is prominent** but secondary to product name

### Contrast Layers

| Layer | Treatment |
|---|---|
| Background | Ivory (`--background`) |
| Section band | Muted (`--muted`) |
| Elevated surface | White cards on ivory/muted |
| Inverted footer | Dark (`--secondary`) |
| Accent | Gold (`--primary`) on interactive elements only |

---

## Mobile Behavior

### Navigation

| Viewport | Behavior |
|---|---|
| `< md` | Logo + icon actions + hamburger; nav links in slide-down panel |
| `≥ md` | Horizontal nav links centered between logo and actions |

Mobile menu: `max-h` transition, closes on link tap or Escape.

### Grids

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Card grids | 1 column | 2 columns (`md`) | 3 columns (`lg`) |
| Hero / story | Stacked (text above image) | Stacked | 2 columns (`lg`) |
| Cart / checkout | Stacked (summary below items) | Stacked | Sidebar right (`lg`) |
| Collections filter | Stacked above grid | Stacked | Sidebar left (`lg`) |

### Forms

- Single column on mobile
- `sm:flex-row` for inline fields (newsletter, checkout actions)
- Full-width buttons on mobile (`w-full sm:w-auto` or `sm:flex-1`)

### Typography Scaling

Headings scale down on mobile (e.g. `text-5xl` → `lg:text-7xl`). Never use desktop-only sizes without a mobile base.

### Touch Targets

- Buttons: `px-6 py-3` minimum
- Icon buttons: `size={20}` with focus ring
- Size selector chips: `px-4 py-3`

### Interactions on Mobile

- No hover-dependent-only functionality
- Slide-down nav must be keyboard accessible
- Sticky summary panels only on `lg+` (not on mobile)

---

## Components Quick Reference

| Component | Role |
|---|---|
| `Container` | Page width constraint |
| `SectionTitle` | Centered section heading |
| `Button` | Primary (`--primary`) and secondary (outline) |
| `ProductCard` | Product in grids |
| `CollectionCard` | Collection in grids |
| `TestimonialCard` | Social proof |
| `Navbar` / `Footer` | Global chrome |

---

## Interactions & Motion

| Property | Standard |
|---|---|
| Transition | `transition-all` or `transition`, 200–300ms |
| Button hover | `opacity-90` (primary) or color invert (secondary) |
| Image hover | `scale-105` max |
| Focus | `focus-visible:ring-2 focus-visible:ring-[var(--primary)]` |
| Reduced motion | Respect `prefers-reduced-motion` (target) |

No bounce, shake, parallax, or aggressive animation.

---

## Implementation Checklist

When building new UI, verify:

- [ ] Uses `Container` and `SectionTitle` where applicable
- [ ] Follows card shell pattern for card-based content
- [ ] Uses design tokens from `globals.css`
- [ ] Mobile-first responsive classes
- [ ] Serif headings, sans body text
- [ ] Generous section padding appropriate to page type
- [ ] No inline styles, no decorative shadows
- [ ] Accessible labels, focus states, semantic HTML
- [ ] Composes existing primitives — no duplicated layout

---

## Known Gaps (Target State)

Items to align in future refactors:

| Gap | Target |
|---|---|
| `gray-*` hardcoded in components | Map to `--foreground` / muted token variants |
| `--font-body` not applied on `<body>` | Apply Inter globally |
| Inline `fontFamily` styles in some components | Use `font-[family-name:var(--font-heading)]` |
| Two eyebrow tracking values | Standardize on `tracking-widest` |
| Two section padding tiers undocumented in code | Use marketing vs catalog tiers consistently |
| `--radius` token unused | Align `rounded-xl` with `--radius` (12px) |

---

## Related Documents

- `.cursor/rules/design-system.mdc` — visual language rules
- `.cursor/rules/component-patterns.mdc` — component composition rules
- `.cursor/rules/frontend.mdc` — architecture and code standards
- `app/globals.css` — design tokens
- `docs/project-context.md` — project goals and stack
