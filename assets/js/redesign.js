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
