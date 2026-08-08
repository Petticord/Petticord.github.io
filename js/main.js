/* ═══════════════════════════════════════════════════════════════════
   DAN PETTICORD — SHARED JS
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV SCROLL ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ─── SCROLL FADE-IN ─── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── ACTIVE NAV LINK ─── */
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ─── HERO ROTATION (homepage only) ─── */
  const heroPrefix = document.getElementById('hero-prefix');
  const heroHighlight = document.getElementById('hero-highlight');
  const heroIndicators = document.querySelectorAll('.hero-indicator');
  const heroImg = document.getElementById('hero-photo');

  if (heroPrefix && heroHighlight) {
    // farms = golden, forests = green, wherever either word appears.
    // The photo shows the system being studied (the first noun); the headline
    // colour follows the word being explained (the second noun).
    const GOLD = '#C67D3B', GREEN = '#4A7C3F', TEAL = '#2E6B6B';
    const lines = [
      {
        prefix: `Studying <span style="color:${GREEN};">forests</span> to understand`,
        highlight: 'farms.', color: GOLD, image: 'images/Climbing.jpg',
      },
      {
        prefix: `Studying <span style="color:${GOLD};">farms</span> to understand`,
        highlight: 'forests.', color: GREEN, image: 'images/DanPushingGPR.jpeg',
      },
      {
        prefix: 'Studying how communities assemble',
        highlight: 'from the ground up.', color: TEAL, image: 'images/DC_digging.jpg',
      },
    ];

    // Preload all hero images for smooth transitions
    lines.forEach(l => { const img = new Image(); img.src = l.image; });

    let current = 0;
    const FADE_MS = 500;

    function rotateLine() {
      // Fade out
      heroPrefix.style.opacity = '0';
      heroHighlight.style.opacity = '0';
      heroHighlight.style.transform = 'translateY(10px)';
      if (heroImg) heroImg.style.opacity = '0';

      setTimeout(() => {
        current = (current + 1) % lines.length;
        const line = lines[current];

        heroPrefix.innerHTML = line.prefix;
        heroHighlight.textContent = line.highlight;
        heroHighlight.style.color = line.color;

        if (heroImg) {
          heroImg.src = line.image;
          // Force a reflow before fading in to avoid flicker
          heroImg.offsetHeight;
          heroImg.style.opacity = '1';
        }

        heroIndicators.forEach((ind, i) => {
          ind.style.width = i === current ? '36px' : '12px';
          ind.style.background = i === current ? lines[i].color : 'var(--grid)';
        });

        // Fade in
        heroPrefix.style.opacity = '1';
        heroHighlight.style.opacity = '1';
        heroHighlight.style.transform = 'translateY(0)';
      }, FADE_MS);
    }

    setInterval(rotateLine, 4200);
  }

  /* ─── ABOUT PAGE PHOTO ROTATION ─── */
  const aboutPhoto = document.getElementById('about-photo');
  if (aboutPhoto) {
    const aboutImages = [
      'images/boa_headshot.jpg',
      'images/DJ.jpg',
      'images/Sudan.jpg',
      'images/turt.jpg',
      'images/esa_gopher_headshot.jpg',
      'images/dan-huacachina.jpg',
      'images/Guinness.jpg',
      'images/Ireland.jpg',
    ];

    // Preload about images
    aboutImages.forEach(src => { const img = new Image(); img.src = src; });

    let aboutIdx = 0;
    const ABOUT_FADE_MS = 500;

    setInterval(() => {
      aboutPhoto.style.opacity = '0';
      setTimeout(() => {
        aboutIdx = (aboutIdx + 1) % aboutImages.length;
        aboutPhoto.src = aboutImages[aboutIdx];
        aboutPhoto.offsetHeight;
        aboutPhoto.style.opacity = '1';
      }, ABOUT_FADE_MS);
    }, 4200);
  }

  /* ─── THEME TOGGLE ─── */
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  /* ─── MOBILE NAV ─── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
      hamburger.classList.toggle('active', isOpen);
      navLinks.classList.toggle('open', isOpen);
      nav.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    hamburger.addEventListener('click', () => toggleMenu());
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

});
