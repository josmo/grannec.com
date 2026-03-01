# grannec.com

Personal brand / portfolio site for Joachim Hill-Grannec. Static HTML deployed to S3 via GitHub Actions.

## Architecture

- **Static site** -- no build step, no SSG, just HTML/CSS/JS served from S3
- **Template base**: Mamba v4.3.0 (BootstrapMade) -- must keep attribution in footer per free license
- **Deployment**: Push to `main` triggers `.github/workflows/main.yml` which syncs to S3 bucket `grannec.com`

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page site with all sections |
| `assets/css/style.css` | All custom styles, uses CSS custom properties |
| `assets/js/main.js` | Scroll handling, portfolio filter, lightbox init |
| `assets/img/portfolio/` | Gallery images (1-18.jpg), resized to 1200px max |
| `assets/img/slide/` | Hero background image |
| `assets/img/team/` | Profile photo |
| `.github/workflows/main.yml` | S3 deploy on push to main |

## Color System (CSS Custom Properties)

All colors are defined as custom properties in `:root` in `style.css`:

```css
--color-primary: #428bca;      /* Main blue */
--color-primary-dark: #1c5c93; /* Darker blue for hover/emphasis */
--color-primary-light: #9eccf4;/* Light blue accents */
--color-text: #2d3436;         /* Body text */
--color-text-light: #636e72;   /* Secondary text */
--color-bg: #ffffff;           /* Main background */
--color-bg-alt: #f5f9fc;       /* Alternating section background */
--color-secondary: #5c768d;    /* Nav, footer, section titles */
```

To change the color scheme, update these properties -- all styles reference them.

## Common Updates

### Add a portfolio image
1. Add image to `assets/img/portfolio/` (name it N+1.jpg)
2. Resize: `sips --resampleWidth 1200 assets/img/portfolio/NEW.jpg`
3. Add a `<div class="portfolio-card">` block in `index.html` inside `.portfolio-grid`
4. Set `data-category` to one of: `lifestyle`, `projects`, `travel`

### Update social links
Social links appear in three places: top bar, Connect section, and footer. Update all three.

### Sections order in index.html
Hero -> About -> About Lists -> Interests -> Portfolio/Gallery -> Connect -> Profile -> FAQ -> Contact -> Footer

## Vendor Libraries (kept)

- Bootstrap 5 (CSS + JS)
- Bootstrap Icons
- Boxicons
- AOS (animate on scroll)
- GLightbox (portfolio image lightbox)

## Conventions

- Use `loading="lazy"` on all images below the fold
- Use `rel="noopener noreferrer"` on external links with `target="_blank"`
- Twitter links point to `x.com`
- No physical mailing address (privacy)
