# grannec.com Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild grannec.com as a storytelling-driven personal site with full-bleed photography integrated into a four-beat narrative arc, replacing the current Mamba template layout.

**Architecture:** Static HTML/CSS/JS served from S3. Two pages: `index.html` (main story) and `faq.html` (recruiter FAQ). No build step. Keep existing vendor libraries (Bootstrap 5, AOS, GLightbox, Bootstrap Icons, Boxicons). New CSS from scratch using custom properties.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Bootstrap 5 grid, AOS animations, GLightbox, vanilla JS.

**Design doc:** `docs/plans/2026-03-01-site-redesign-design.md`

---

### Task 1: Write New CSS Foundation

**Files:**
- Create: `assets/css/redesign.css`

This is the new stylesheet. Write it from scratch -- do NOT modify `style.css` yet (we'll swap it in Task 5).

**Step 1: Write CSS custom properties and base styles**

```css
/**
 * grannec.com -- Redesign 2026
 * Based on Mamba v4.3.0 (BootstrapMade) -- attribution required
 */

:root {
  --color-primary: #428bca;
  --color-primary-dark: #1c5c93;
  --color-primary-light: #9eccf4;
  --color-text: #1f2d3d;
  --color-text-light: #636e72;
  --color-bg: #ffffff;
  --color-bg-alt: #f5f9fc;
  --color-secondary: #5c768d;
  --font-body: 'Inter', 'Open Sans', sans-serif;
  --font-heading: 'Raleway', sans-serif;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --radius: 12px;
  --max-width: 1200px;
  --content-width: 720px;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-text);
  margin: 0;
  padding: 0;
  line-height: 1.7;
}

a { color: var(--color-primary); text-decoration: none; }
a:hover { color: var(--color-primary-dark); }

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: 1.2;
}

img { max-width: 100%; height: auto; }
```

**Step 2: Write nav styles**

```css
/*--------------------------------------------------------------
# Navigation
--------------------------------------------------------------*/
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.site-nav.scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: var(--shadow-sm);
}

.site-nav .nav-logo {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.site-nav.scrolled .nav-logo {
  color: var(--color-primary-dark);
}

.site-nav .nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav .nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  transition: color 0.3s ease;
  letter-spacing: 0.5px;
}

.site-nav.scrolled .nav-links a {
  color: var(--color-secondary);
}

.site-nav .nav-links a:hover {
  color: #fff;
}

.site-nav.scrolled .nav-links a:hover {
  color: var(--color-primary);
}

.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.site-nav.scrolled .mobile-nav-toggle {
  color: var(--color-text);
}

@media (max-width: 768px) {
  .mobile-nav-toggle { display: block; }
  .site-nav .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(255,255,255,0.98);
    padding: 1rem 2rem;
    gap: 0;
    box-shadow: var(--shadow-md);
  }
  .site-nav .nav-links.open { display: flex; }
  .site-nav .nav-links a {
    color: var(--color-text);
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
  }
  .site-nav .nav-links a:hover { color: var(--color-primary); }
}
```

**Step 3: Write hero styles**

```css
/*--------------------------------------------------------------
# Hero
--------------------------------------------------------------*/
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(28, 92, 147, 0.65) 0%,
    rgba(13, 30, 45, 0.45) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #fff;
  padding: 0 2rem;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin: 0 0 1rem;
  letter-spacing: 2px;
}

.hero-tagline {
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  max-width: 600px;
  margin: 0 0 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.6);
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}
```

**Step 4: Write story beat styles**

```css
/*--------------------------------------------------------------
# Story Section
--------------------------------------------------------------*/
.story { padding: 0; }

.story-beat {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 70vh;
  align-items: center;
}

.story-beat.reverse { direction: rtl; }
.story-beat.reverse > * { direction: ltr; }

.story-beat-image {
  height: 100%;
  min-height: 400px;
  background-size: cover;
  background-position: center;
}

.story-beat-content {
  padding: 4rem;
  max-width: 560px;
}

.story-beat.reverse .story-beat-content {
  margin-left: auto;
}

.story-beat-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.story-beat-content h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1.5rem;
}

.story-beat-content p {
  font-size: 1.05rem;
  color: var(--color-text-light);
  line-height: 1.8;
  margin: 0;
}

/* Full-bleed photo break between beats */
.photo-break {
  width: 100%;
  height: 50vh;
  min-height: 300px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Disable parallax on mobile (performance) */
@media (max-width: 768px) {
  .photo-break { background-attachment: scroll; }
}

@media (max-width: 768px) {
  .story-beat {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .story-beat.reverse { direction: ltr; }
  .story-beat-image { min-height: 300px; }
  .story-beat-content {
    padding: 2.5rem 1.5rem;
    max-width: none;
  }
  .story-beat.reverse .story-beat-content { margin-left: 0; }
}
```

**Step 5: Write proof strip styles**

```css
/*--------------------------------------------------------------
# Proof Strip
--------------------------------------------------------------*/
.proof-strip {
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.proof-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 1.5rem;
}

.proof-logos span {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #b0b8c1;
}

.proof-meta {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.proof-meta a {
  color: var(--color-primary);
}
```

**Step 6: Write connect section styles**

```css
/*--------------------------------------------------------------
# Connect
--------------------------------------------------------------*/
.connect-section {
  padding: 5rem 2rem;
  background: var(--color-bg-alt);
}

.connect-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: var(--max-width);
  margin: 0 auto;
  align-items: start;
}

.connect-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  color: var(--color-text);
}

.connect-text p {
  font-size: 1rem;
  color: var(--color-text-light);
  margin: 0 0 1rem;
  line-height: 1.7;
}

.connect-text .locations {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

.connect-cta {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 2px;
  transition: color 0.3s, border-color 0.3s;
}

.connect-cta:hover {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.connect-social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius);
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.3s, box-shadow 0.3s;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
  text-decoration: none;
}

.social-link i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.social-link span {
  font-weight: 500;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .connect-grid { grid-template-columns: 1fr; }
  .connect-social { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .connect-social { grid-template-columns: 1fr; }
}
```

**Step 7: Write footer styles**

```css
/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
.site-footer {
  background: var(--color-secondary);
  color: rgba(255,255,255,0.7);
  padding: 2rem;
  text-align: center;
  font-size: 0.85rem;
}

.site-footer a {
  color: var(--color-primary-light);
}

.site-footer a:hover {
  color: #fff;
}

.footer-links {
  margin-top: 0.5rem;
}

.footer-links a {
  margin: 0 0.75rem;
}

/*--------------------------------------------------------------
# Back to top
--------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 999;
  background: var(--color-primary);
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.back-to-top i { font-size: 24px; color: #fff; line-height: 0; }
.back-to-top:hover { background: var(--color-primary-dark); color: #fff; }
.back-to-top.active { visibility: visible; opacity: 1; }

/*--------------------------------------------------------------
# AOS disable delay on mobile
--------------------------------------------------------------*/
@media screen and (max-width: 768px) {
  [data-aos-delay] { transition-delay: 0 !important; }
}
```

**Step 8: Verify the file is syntactically correct**

Run: `cat assets/css/redesign.css | head -5`
Expected: The first few lines of CSS custom properties.

**Step 9: Commit**

```bash
git add assets/css/redesign.css
git commit -m "feat: add redesign stylesheet with story-based layout"
```

---

### Task 2: Write New index.html

**Files:**
- Create: `index-redesign.html` (in project root, next to `index.html`)

We write the new page alongside the old one first, then swap in Task 5.

**Step 1: Write the full HTML**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Joachim Hill-Grannec</title>
  <meta content="Joachim Hill-Grannec - Technical leader, team builder, and surf enthusiast. Building teams and solving hard problems around the globe." name="description">
  <meta content="Joachim Hill-Grannec, CTO, technical leadership, consulting, cloud, kubernetes, teams" name="keywords">
  <meta property="og:title" content="Joachim Hill-Grannec">
  <meta property="og:image" content="https://www.grannec.com/assets/img/team/team-1.webp">
  <meta property="og:description" content="From dance floors to trading floors. Building teams from wherever the waves are.">
  <meta property="og:url" content="https://www.grannec.com/">

  <!-- Favicons -->
  <link href="assets/img/team/team-1.webp" rel="icon">
  <link href="assets/img/team/team-1.webp" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Raleway:wght@300;400;600;700;900&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">

  <!-- Main CSS -->
  <link href="assets/css/redesign.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Mamba - v4.3.0
  * Template URL: https://bootstrapmade.com/mamba-one-page-bootstrap-template-free/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Navigation ======= -->
  <nav class="site-nav" id="site-nav">
    <a href="index.html" class="nav-logo">Joachim Hill-Grannec</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="#story" class="scrollto">Story</a></li>
      <li><a href="#connect" class="scrollto">Connect</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
    <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>
  </nav>

  <!-- ======= Hero ======= -->
  <section class="hero" id="hero">
    <div class="hero-bg" style="background-image: url('assets/img/slide/slide-1.webp');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 data-aos="fade-up">Joachim Hill-Grannec</h1>
      <p class="hero-tagline" data-aos="fade-up" data-aos-delay="100">From dance floors to trading floors. Building teams from wherever the waves are.</p>
    </div>
    <div class="scroll-indicator">
      <i class="bi bi-chevron-down"></i>
    </div>
  </section>

  <main id="main">

    <!-- ======= Story ======= -->
    <section class="story" id="story">

      <!-- Beat 1: Roots -->
      <div class="story-beat" data-aos="fade-up">
        <div class="story-beat-image" style="background-image: url('assets/img/team/team-1.webp');"></div>
        <div class="story-beat-content">
          <span class="story-beat-label">Roots</span>
          <h2>Grew up in France. Traveled the world teaching dance.</h2>
          <p>Bilingual from the start, I spent years crossing continents teaching lindy hop and blues -- learning that the best way to connect with people is to meet them where they are. That instinct shaped everything that came after.</p>
        </div>
      </div>

      <!-- Photo break -->
      <div class="photo-break" style="background-image: url('assets/img/portfolio/6.webp');" role="img" aria-label="Mountain landscape"></div>

      <!-- Beat 2: Range -->
      <div class="story-beat reverse" data-aos="fade-up">
        <div class="story-beat-image" style="background-image: url('assets/img/portfolio/5.webp');"></div>
        <div class="story-beat-content">
          <span class="story-beat-label">Range</span>
          <h2>Welding shops to trading floors.</h2>
          <p>PBX systems. Embedded firmware. Mobile apps. Aerospace, energy, manufacturing, finance, pharma -- every domain has its own language, and I've learned enough of them to know that the problem-solving never changes. Only the vocabulary does.</p>
        </div>
      </div>

      <!-- Photo break -->
      <div class="photo-break" style="background-image: url('assets/img/portfolio/3.webp');" role="img" aria-label="Ocean waves"></div>

      <!-- Beat 3: Scale -->
      <div class="story-beat" data-aos="fade-up">
        <div class="story-beat-image" style="background-image: url('assets/img/slide/slide-3.webp');"></div>
        <div class="story-beat-content">
          <span class="story-beat-label">Scale</span>
          <h2>Building teams behind the platforms.</h2>
          <p>Led hundred-million-dollar initiatives. Built the engineering culture at Warby Parker, AWS, Smartsheet. The technology matters, but the teams matter more -- getting the right people aligned on the right problem is the actual hard part.</p>
        </div>
      </div>

      <!-- Photo break -->
      <div class="photo-break" style="background-image: url('assets/img/portfolio/14.webp');" role="img" aria-label="Surfers with boards at sunset"></div>

      <!-- Beat 4: Now -->
      <div class="story-beat reverse" data-aos="fade-up">
        <div class="story-beat-image" style="background-image: url('assets/img/portfolio/11.webp');"></div>
        <div class="story-beat-content">
          <span class="story-beat-label">Now</span>
          <h2>Still solving hard problems. Better views.</h2>
          <p>CTO and partner, splitting time between Seattle, NYC, and El Salvador. Contributing to open source -- Harness, Drone CI, Homebrew, Terraform, and more. Building teams from wherever the waves are.</p>
        </div>
      </div>

    </section>

    <!-- ======= Proof Strip ======= -->
    <div class="proof-strip">
      <div class="proof-logos" data-aos="fade-up">
        <span>Warby Parker</span>
        <span>AWS</span>
        <span>Smartsheet</span>
        <span>GameStop</span>
        <span>T-Mobile</span>
        <span>Starbucks</span>
      </div>
      <p class="proof-meta" data-aos="fade-up" data-aos-delay="100">
        AWS Solutions Architect Pro &middot; Security+ &middot;
        <a href="https://www.github.com/josmo" target="_blank" rel="noopener noreferrer">Open source on GitHub</a>
      </p>
    </div>

    <!-- ======= Connect ======= -->
    <section class="connect-section" id="connect">
      <div class="connect-grid">
        <div class="connect-text" data-aos="fade-up">
          <h2>I'm probably near the water.</h2>
          <p>
            <a href="mailto:joachim.hill@gmail.com">joachim.hill@gmail.com</a><br>
            <a href="mailto:joachim@pelo.tech">joachim@pelo.tech</a>
          </p>
          <p class="locations">Seattle &middot; NYC &middot; El Salvador</p>
          <a href="mailto:joachim.hill@gmail.com" class="connect-cta">Working on something interesting? Let's talk.</a>
        </div>
        <div class="connect-social" data-aos="fade-up" data-aos-delay="100">
          <a href="https://www.github.com/josmo" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-github"></i>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/joachimehillgrannec/" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/josmo99/" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="https://x.com/lindyblues" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-twitter-x"></i>
            <span>X</span>
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- ======= Footer ======= -->
  <footer class="site-footer">
    <p>&copy; Joachim Hill-Grannec. All Rights Reserved.</p>
    <div class="footer-links">
      <a href="faq.html">Recruiter FAQ</a>
    </div>
    <p style="margin-top: 0.5rem; font-size: 0.75rem;">Template base by <a href="https://bootstrapmade.com/">BootstrapMade</a></p>
  </footer>

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>

  <!-- Main JS File -->
  <script src="assets/js/redesign.js"></script>

</body>

</html>
```

**Step 2: Verify the file renders valid HTML**

Run: `grep -c '</html>' index-redesign.html`
Expected: `1`

**Step 3: Commit**

```bash
git add index-redesign.html
git commit -m "feat: add redesigned index page with story-based layout"
```

---

### Task 3: Write New JavaScript

**Files:**
- Create: `assets/js/redesign.js`

Simplified JS -- no portfolio filtering or lightbox (no gallery section anymore).

**Step 1: Write the JS**

```javascript
(function() {
  "use strict";

  // --- Nav scroll behavior ---
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
  }

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = toggle.querySelector('i');
      icon.classList.toggle('bi-list');
      icon.classList.toggle('bi-x');
    });
  }

  // --- Smooth scroll for .scrollto links ---
  document.querySelectorAll('.scrollto').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          const icon = toggle.querySelector('i');
          icon.classList.add('bi-list');
          icon.classList.remove('bi-x');
        }
      }
    });
  });

  // --- Back to top ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    window.addEventListener('load', toggleBackToTop);
  }

  // --- AOS init ---
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  // --- Scroll with hash on page load ---
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 0;
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

})();
```

**Step 2: Commit**

```bash
git add assets/js/redesign.js
git commit -m "feat: add redesign JS with simplified nav and scroll handling"
```

---

### Task 4: Create faq.html

**Files:**
- Create: `faq.html`

**Step 1: Write the FAQ page**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>FAQ - Joachim Hill-Grannec</title>
  <meta content="Frequently asked questions about working with Joachim Hill-Grannec" name="description">

  <!-- Favicons -->
  <link href="assets/img/team/team-1.webp" rel="icon">
  <link href="assets/img/team/team-1.webp" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Raleway:wght@300;400;600;700;900&display=swap" rel="stylesheet">

  <!-- Vendor CSS -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">

  <!-- Main CSS -->
  <link href="assets/css/redesign.css" rel="stylesheet">

  <!-- FAQ-specific inline styles -->
  <style>
    .faq-page {
      max-width: var(--content-width);
      margin: 0 auto;
      padding: 8rem 2rem 4rem;
    }
    .faq-page h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .faq-page .faq-intro {
      color: var(--color-text-light);
      margin-bottom: 3rem;
      font-size: 1.05rem;
    }
    .faq-item {
      margin-bottom: 2.5rem;
    }
    .faq-item h3 {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--color-text);
    }
    .faq-item p {
      color: var(--color-text-light);
      line-height: 1.7;
      margin: 0;
    }
  </style>

  <!-- Mamba attribution -->
  <!-- Template Name: Mamba - v4.3.0 | BootstrapMade.com | License: https://bootstrapmade.com/license/ -->
</head>

<body>

  <!-- Navigation -->
  <nav class="site-nav scrolled" id="site-nav">
    <a href="index.html" class="nav-logo">Joachim Hill-Grannec</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html#story">Story</a></li>
      <li><a href="index.html#connect">Connect</a></li>
      <li><a href="faq.html" style="color: var(--color-primary);">FAQ</a></li>
    </ul>
    <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>
  </nav>

  <main class="faq-page">
    <h1>Frequently Asked Questions</h1>
    <p class="faq-intro">Things recruiters and potential collaborators usually want to know.</p>

    <div class="faq-item">
      <h3>What info should be included when contacting you?</h3>
      <p>Rate or comp range, group values and culture, goals, and whether the team is distributed or on-site. I won't respond without this context.</p>
    </div>

    <div class="faq-item">
      <h3>Can you bring a team to solve a problem?</h3>
      <p>Yes. I'm part of a consulting team that can help around most tech problems and initiatives, or intro you to a group that can.</p>
    </div>

    <div class="faq-item">
      <h3>Do you give intros?</h3>
      <p>Absolutely. Browse my LinkedIn, tell me who and why it's a good fit, and I'll make the introduction.</p>
    </div>

    <div class="faq-item">
      <h3>Can you work legally in the US and EU?</h3>
      <p>Yes, both.</p>
    </div>

    <div class="faq-item">
      <h3>What kind of opportunities excite you?</h3>
      <p>Hard problems at the intersection of teams and technology. The domain matters less than the challenge.</p>
    </div>

    <div class="faq-item">
      <h3>Do you have a resume?</h3>
      <p>No traditional resume. Grab the PDF export from my <a href="https://www.linkedin.com/in/joachimehillgrannec/" target="_blank" rel="noopener noreferrer">LinkedIn profile</a> (More &rarr; Save to PDF).</p>
    </div>
  </main>

  <footer class="site-footer">
    <p>&copy; Joachim Hill-Grannec. All Rights Reserved.</p>
    <p style="margin-top: 0.5rem; font-size: 0.75rem;">Template base by <a href="https://bootstrapmade.com/">BootstrapMade</a></p>
  </footer>

  <!-- Minimal JS for mobile nav -->
  <script>
    const toggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      });
    }
  </script>

</body>

</html>
```

**Step 2: Commit**

```bash
git add faq.html
git commit -m "feat: add separate FAQ page for recruiter questions"
```

---

### Task 5: Swap Files and Go Live

**Files:**
- Rename: `index.html` -> `index-old.html` (backup)
- Rename: `index-redesign.html` -> `index.html`
- Rename: `assets/css/style.css` -> `assets/css/style-old.css` (backup)
- Rename: `assets/js/main.js` -> `assets/js/main-old.js` (backup)

**Step 1: Back up old files**

```bash
mv index.html index-old.html
mv assets/css/style.css assets/css/style-old.css
mv assets/js/main.js assets/js/main-old.js
```

**Step 2: Activate new files**

```bash
mv index-redesign.html index.html
```

**Step 3: Verify the new index.html references the correct CSS and JS**

Run: `grep 'redesign' index.html`
Expected: Lines referencing `assets/css/redesign.css` and `assets/js/redesign.js`

**Step 4: Commit**

```bash
git add index.html index-old.html assets/css/style-old.css assets/js/main-old.js index-redesign.html
git commit -m "feat: activate redesigned site, archive old template files"
```

---

### Task 6: Visual QA and Polish

**Files:**
- Modify: `assets/css/redesign.css` (as needed)
- Modify: `index.html` (as needed)

**Step 1: Open in browser and check**

Run: `open index.html` (macOS) to preview locally.

Check:
- Hero loads with correct background image and overlay
- Nav is transparent on hero, turns white on scroll
- All 4 story beats render with alternating layout
- Photo breaks show between beats with parallax effect
- Proof strip logos display in a centered row
- Connect section shows two columns
- Social links all open in new tabs
- Footer renders with attribution
- FAQ link navigates to faq.html
- Mobile: hamburger menu works, story beats stack, photos go full-width

**Step 2: Fix any issues found**

Adjust CSS or HTML as needed based on browser testing.

**Step 3: Check faq.html**

Run: `open faq.html`

Verify: nav links back to index.html#story and index.html#connect work. FAQ content displays cleanly.

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: visual QA polish for redesigned site"
```

---

### Task 7: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update key files table and section order**

Update the CLAUDE.md to reflect the new file structure:
- `index.html` is now the story-based layout
- `faq.html` is the new recruiter FAQ page
- `assets/css/redesign.css` is the active stylesheet
- `assets/js/redesign.js` is the active JS
- Old files archived as `*-old.*`
- Section order: Hero -> Story (4 beats with photo breaks) -> Proof Strip -> Connect -> Footer
- Gallery section removed (photos integrated into narrative)

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for redesigned site structure"
```

---

## Image Mapping Reference

For the implementing engineer -- here's which existing images go where:

| Location | Image | Why |
|----------|-------|-----|
| Hero background | `assets/img/slide/slide-1.webp` | Aerial surf break -- sets the tone |
| Beat 1 "Roots" | `assets/img/team/team-1.webp` | Eiffel Tower selfie -- France origins |
| Photo break 1 | `assets/img/portfolio/6.webp` | Snowy mountains -- visual variety |
| Beat 2 "Range" | `assets/img/portfolio/5.webp` | Laptop + wine at cafe -- work anywhere |
| Photo break 2 | `assets/img/portfolio/3.webp` | Waves through foliage -- ocean atmosphere |
| Beat 3 "Scale" | `assets/img/slide/slide-3.webp` | Two people working with ocean view -- teams |
| Photo break 3 | `assets/img/portfolio/14.webp` | Surfers with boards silhouette -- transition to Now |
| Beat 4 "Now" | `assets/img/portfolio/11.webp` | Sunset beach with palm trees -- El Salvador |
