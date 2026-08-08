document.addEventListener('DOMContentLoaded', () => {

  /* theme toggle */
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  // Dark is the default, so "no attribute" means dark and light is explicit.
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* mobile nav */
  const burger = document.querySelector('.nav-burger');
  if (burger) burger.addEventListener('click', () =>
    document.querySelector('.nav-links').classList.toggle('open'));

  /* reveal on scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.rise').forEach(el => io.observe(el));

  /* hero rotation — forests always green, farms always gold, in both lines */
  const a = document.getElementById('hero-a');
  const b = document.getElementById('hero-b');
  const img = document.getElementById('hero-img');
  const cap = document.getElementById('hero-cap');
  const ticks = document.querySelectorAll('.tick');
  if (!a || !b) return;

  const G = 'var(--forest)', F = 'var(--farm)';
  const lines = [
    { a: `Studying <span style="color:${G}">forests</span>`,
      b: `to understand <span style="color:${F}">farms.</span>`,
      tick: F, img: 'images/Climbing.jpg', cap: 'Canopy access — Panama' },
    { a: `Studying <span style="color:${F}">farms</span>`,
      b: `to understand <span style="color:${G}">forests.</span>`,
      tick: G, img: 'images/DanPushingGPR.jpeg', cap: 'Ground-penetrating radar — Florida' },
    { a: 'Studying how communities',
      b: 'assemble from the ground up.',
      tick: 'var(--ink)', img: 'images/DC_digging.jpg', cap: 'Soil excavation' },
  ];
  // The photo is hidden below 1100px, so don't spend mobile data preloading
  // several megabytes of images that will never be shown.
  const showPhoto = window.matchMedia('(min-width: 1101px)').matches;
  if (showPhoto) lines.forEach(l => { const i = new Image(); i.src = l.img; });

  let n = 0;
  const paint = () => {
    const l = lines[n];
    a.innerHTML = l.a;
    b.innerHTML = l.b;
    if (img && showPhoto) img.src = l.img;
    if (cap) cap.textContent = l.cap;
    ticks.forEach((t, i) => t.style.background = i === n ? l.tick : 'var(--rule)');
  };
  paint();

  setInterval(() => {
    [a, b, img].forEach(el => el && (el.style.opacity = '0'));
    setTimeout(() => {
      n = (n + 1) % lines.length;
      paint();
      [a, b, img].forEach(el => el && (el.style.opacity = '1'));
    }, 400);
  }, 4600);
});
