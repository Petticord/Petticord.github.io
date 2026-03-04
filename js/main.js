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
    const href = link.getAttribute('href').replace('.html', '').replace('./', '').replace('index', '');
    const page = currentPage === 'index' ? '' : currentPage;
    if (href === page || (href === '' && page === '')) {
      // Don't highlight home on inner pages
    }
    // Highlight matching page
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ─── HERO TEXT ROTATION (homepage only) ─── */
  const heroPrefix = document.getElementById('hero-prefix');
  const heroHighlight = document.getElementById('hero-highlight');
  const heroIndicators = document.querySelectorAll('.hero-indicator');

  if (heroPrefix && heroHighlight) {
    const GEM_COLORS = ['#B5332E', '#2E6B6B', '#C67D3B', '#4A7C3F'];
    const lines = [
      { prefix: 'Uncovering the hidden dynamics of', highlight: 'plant–soil–microbe interactions.' },
      { prefix: 'Engineering solutions for', highlight: 'phosphorus pollution & phytoremediation.' },
      { prefix: 'Tracing nutrients through', highlight: 'forests, pastures, and soils.' },
      { prefix: 'Bridging biogeochemistry and', highlight: 'ecosystem conservation.' },
    ];

    let current = 0;

    function rotateLine() {
      // Fade out
      heroPrefix.style.opacity = '0';
      heroHighlight.style.opacity = '0';
      heroHighlight.style.transform = 'translateY(14px)';

      setTimeout(() => {
        current = (current + 1) % lines.length;
        heroPrefix.textContent = lines[current].prefix;
        heroHighlight.textContent = lines[current].highlight;
        heroHighlight.style.color = GEM_COLORS[current % GEM_COLORS.length];

        // Update indicators
        heroIndicators.forEach((ind, i) => {
          ind.style.width = i === current ? '36px' : '12px';
          ind.style.background = i === current ? GEM_COLORS[i % GEM_COLORS.length] : '#E8E4DD';
        });

        // Fade in
        heroPrefix.style.opacity = '1';
        heroHighlight.style.opacity = '1';
        heroHighlight.style.transform = 'translateY(0)';
      }, 550);
    }

    setInterval(rotateLine, 4200);
  }

  /* ─── MOBILE NAV (placeholder for future) ─── */
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

});
