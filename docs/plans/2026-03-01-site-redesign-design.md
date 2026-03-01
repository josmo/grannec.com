# grannec.com Redesign -- Design Document

**Date:** 2026-03-01
**Status:** Approved

## Intent

Redesign grannec.com from a Bootstrap template site into a storytelling-driven personal site that communicates professional credibility through genuine personality. The audience is recruiters, potential clients, and interesting people -- they should leave understanding who Joachim is, not just what he does.

## Design Principles

- **Confident and calm.** Understated authority. No need to prove anything.
- **Surf vibe stays.** Ocean blues, full-bleed surf/travel photography. Authentic, not decorative.
- **Story over sections.** The page tells a narrative arc, not a resume with headers.
- **Breathing room.** Large imagery, generous whitespace, tight copy that lands hard.

## Architecture

Still static HTML/CSS/JS served from S3. No build step. Two pages:

- `index.html` -- Main storytelling page
- `faq.html` -- Recruiter FAQ (moved from main page)

### Vendor Libraries (kept)

- Bootstrap 5 (CSS + JS)
- Bootstrap Icons
- Boxicons
- AOS (animate on scroll)
- GLightbox (photo lightbox)

### Fonts (kept)

- Inter (body)
- Raleway (headings)

## Page Structure: index.html

### 1. Navigation

Slim sticky nav. Transparent over hero, solid white on scroll.
- Left: "Joachim Hill-Grannec" (text logo)
- Right: Story / Work / Connect / FAQ (links to sections + faq.html)
- Mobile: hamburger collapse

### 2. Hero (full viewport)

- Full-bleed surf/ocean background image
- Gradient overlay (deep navy to transparent)
- Name: large Raleway 900
- Tagline: *"From dance floors to trading floors. Building teams from wherever the waves are."*
- No CTA button. Subtle scroll indicator (animated down arrow)

### 3. The Story (4 beats, alternating layout)

Each beat: photo on one side, text card on the other. Alternates left/right. Full-bleed atmospheric photo breaks between beats.

**Beat 1: "Roots"**
- Photo: France or dance
- Copy: Grew up in France, bilingual. Traveled the world teaching lindy hop and blues. Learns by doing, goes where the interesting thing is.

**Beat 2: "Range"**
- Photo: Industrial or diverse setting
- Copy: Welding shops to trading floors. PBX systems, embedded firmware, mobile apps. Aerospace, energy, finance, pharma. The domain changes, the problem-solving doesn't.

**Beat 3: "Scale"**
- Photo: Team or tech
- Copy: Led hundred-million-dollar initiatives. Built engineering culture at Warby Parker, AWS, Smartsheet. Architected global-scale platforms and the teams behind them.

**Beat 4: "Now"**
- Photo: Surf / van / Central America
- Copy: CTO and partner. Building teams from wherever the waves are. Open source contributor. Seattle, NYC, El Salvador. Still solving hard problems -- better views.

### 4. Proof Strip

Horizontal, low visual weight. No section heading.
- Company logos in a row, muted/grayscale: Warby Parker, AWS, Smartsheet, GameStop, T-Mobile, Starbucks
- Below: certifications (AWS SA Pro, Security+) + GitHub link
- No hover effects or cards. Quiet credibility.

### 5. Connect

Two columns (stacked on mobile):
- Left: closing line + email addresses + locations
- Right: social icons (GitHub, LinkedIn, Instagram, X) -- icon + label, no description
- CTA line: *"Working on something interesting? Let's talk."*

### 6. Footer

Minimal: name, copyright, BootstrapMade attribution (license requirement), link to /faq.

## Page Structure: faq.html

Same nav and footer as index.html. Simple Q&A layout with the existing recruiter FAQ content. Accordion or flat list.

## Color System

Refine current ocean blues:

```
--color-primary: #428bca       (keep or shift slightly warmer)
--color-primary-dark: #1c5c93  (deep navy, used for text overlays)
--color-primary-light: #9eccf4 (light accents)
--color-text: #2d3436          (body text)
--color-text-light: #636e72    (secondary text)
--color-bg: #ffffff            (main background)
--color-bg-alt: #f5f9fc        (alternating section background)
--color-secondary: #5c768d     (nav, footer)
```

## CSS Approach

Write new CSS from scratch. Do not inherit Mamba template structure. Use CSS custom properties, CSS grid, and flexbox. Keep Bootstrap grid for responsive layout but override all visual styling.

## Mobile

- Story beats stack vertically (photo on top, text below)
- Full-bleed photos become full-width
- Nav collapses to hamburger
- Proof strip logos wrap to 2 rows

## Content to Write

- Hero tagline (drafted above)
- 4 story beat paragraphs (drafted above, will refine)
- Closing connect line
- FAQ page intro text

## What Gets Cut

- About section (icon boxes) -- absorbed into story beats
- About Lists / Timeline section -- absorbed into story beats
- Interests section (6 cards) -- absorbed into story beats
- Profile section (team card) -- redundant with the whole page being about you
- Separate Gallery section -- photos integrated into narrative
- Connect section cards -- simplified to icons + labels
- Contact section info boxes -- folded into connect

## What Gets Added

- faq.html (separate page)
- Full-bleed photo breaks between story beats
- Proof strip with company logos
- Scroll indicator on hero

## References

- [sive.rs](https://sive.rs/) -- tone model
- [world.hey.com/jason](https://world.hey.com/jason) -- voice register
- [awwwards.com/websites/storytelling/](https://www.awwwards.com/websites/storytelling/) -- scroll storytelling patterns
- [siteinspire.com/websites/category/editorial](https://www.siteinspire.com/websites/category/editorial) -- editorial layout
- [muffingroup.com/blog/surfing-websites/](https://muffingroup.com/blog/surfing-websites/) -- surf visual language
