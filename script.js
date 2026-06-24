// ════════════════════════════════════════════
// PORTFOLIO — script.js
// Andrés Camilo Moya
// ════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────
  // 1. NAVBAR: scroll state + toggle móvil
  // ──────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    highlightActiveSection();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un link (móvil)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ──────────────────────────────────────────
  // 2. HIGHLIGHT SECCIÓN ACTIVA EN NAV
  // ──────────────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const allLinks  = document.querySelectorAll('.nav-link');

  function highlightActiveSection() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    allLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }

  // ──────────────────────────────────────────
  // 3. TYPING ANIMATION (hero)
  // ──────────────────────────────────────────
  const typingEl = document.getElementById('typingText');

  const phrases = [
    'Python Backend Developer',
    'Automatización de procesos',
    'Integración de APIs REST',
    'Soluciones con IA'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingTimer = null;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // pausa al terminar
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    typingTimer = setTimeout(typeEffect, delay);
  }

  typeEffect();

  // ──────────────────────────────────────────
  // 4. REVEAL ON SCROLL (IntersectionObserver)
  // ──────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Aplica un stagger basado en la posición en el DOM
          const delay = getStaggerDelay(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // Calcula delay de stagger para elementos hermanos
  function getStaggerDelay(el) {
    const siblings = el.parentElement
      ? Array.from(el.parentElement.querySelectorAll(':scope > .reveal'))
      : [];
    const idx = siblings.indexOf(el);
    // Stagger máximo de 200ms, por si hay muchos elementos
    return idx !== -1 ? Math.min(idx * 80, 200) : 0;
  }

  // ──────────────────────────────────────────
  // 5. PROTECCIÓN DE IMÁGENES DE PROYECTO
  //    (sin enlaces, sin context menu)
  // ──────────────────────────────────────────
  document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart',   e => e.preventDefault());
    img.addEventListener('mousedown',   e => { if (e.button === 1) e.preventDefault(); });
  });

  // ──────────────────────────────────────────
  // 6. SMOOTH SCROLL con offset para el navbar
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ──────────────────────────────────────────
  // 7. INICIALIZAR ESTADO DEL SCROLL
  // ──────────────────────────────────────────
  handleScroll();

});
