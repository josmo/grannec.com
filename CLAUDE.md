# grannec.com

Personal brand / portfolio site for Joachim Hill-Grannec. Static HTML deployed to S3 via GitHub Actions.

## Architecture

- **Static site** -- no build step, no SSG, just HTML/CSS/JS served from S3
- **Template base**: Mamba v4.3.0 (BootstrapMade) -- must keep attribution in footer per free license
- **Deployment**: Push to `main` triggers `.github/workflows/main.yml` which syncs to S3 bucket `grannec.com`
- **Design**: Story-driven scroll layout with full-bleed photography integrated into narrative

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main story page (hero, 4 narrative beats, proof strip, connect) |
| `faq.html` | Recruiter FAQ (separate page) |
| `assets/css/redesign.css` | All styles, uses CSS custom properties |
| `assets/js/redesign.js` | Nav scroll, mobile toggle, AOS init |
| `assets/img/portfolio/` | Photography (1-18.webp), used in story beats and photo breaks |
| `assets/img/slide/` | Hero and story beat background images |
| `assets/img/team/` | Profile photo (also used in Beat 1 "Roots") |
| `.github/workflows/main.yml` | S3 deploy on push to main |
| `index-old.html` | Archived previous template-based layout |
| `assets/css/style-old.css` | Archived previous stylesheet |
| `assets/js/main-old.js` | Archived previous JS |

## Color System (CSS Custom Properties)

All colors are defined as custom properties in `:root` in `redesign.css`:

```css
--color-primary: #428bca;      /* Main blue */
--color-primary-dark: #1c5c93; /* Darker blue for hover/emphasis */
--color-primary-light: #9eccf4;/* Light blue accents */
--color-text: #1f2d3d;         /* Body text */
--color-text-light: #636e72;   /* Secondary text */
--color-bg: #ffffff;           /* Main background */
--color-bg-alt: #f5f9fc;       /* Alternating section background */
--color-secondary: #5c768d;    /* Nav, footer */
```

To change the color scheme, update these properties -- all styles reference them.

## Page Structure

### index.html
Hero -> Story (4 beats with photo breaks: Roots, Range, Scale, Now) -> Proof Strip -> Connect -> Footer

### faq.html
Nav (scrolled) -> FAQ content -> Footer

## Common Updates

### Change a story beat photo
Update the `background-image` URL in the `.story-beat-image` div for that beat in `index.html`.

### Change a photo break image
Update the `background-image` URL in the `.photo-break` div in `index.html`.

### Update social links
Social links appear in two places: Connect section in `index.html` and nav links. Update both.

### Update FAQ content
Edit `faq.html` directly -- each question is a `.faq-item` div with h3 and p.

## Vendor Libraries (kept)

- Bootstrap 5 (CSS + JS)
- Bootstrap Icons
- Boxicons
- AOS (animate on scroll)
- GLightbox (kept in vendor but not actively used after redesign)

## Conventions

- Use `rel="noopener noreferrer"` on external links with `target="_blank"`
- Twitter/X links point to `x.com`
- No physical mailing address (privacy)
- Photo breaks use `role="img"` and `aria-label` for accessibility
- Story beats alternate layout using `.reverse` class
