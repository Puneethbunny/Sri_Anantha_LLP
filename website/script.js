const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const navOverlay = document.querySelector('.nav__overlay');

const closeNav = () => {
  navLinks?.classList.remove('show');
  navOverlay?.classList.remove('show');
};

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navOverlay?.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });
}

navOverlay?.addEventListener('click', closeNav);

// Smooth scroll for internal links
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', evt => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add subtle shadow when scrolling
const nav = document.querySelector('.nav');
const toggleShadow = () => {
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
  } else {
    nav.style.boxShadow = 'none';
  }
};

window.addEventListener('scroll', toggleShadow);
toggleShadow();

// Hero slider
const slides = Array.from(document.querySelectorAll('.slider .slide'));
const dots = Array.from(document.querySelectorAll('.slider__dot'));
let currentSlide = 0;
let slideTimer;

const setSlide = index => {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
};

const startSlideShow = () => {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => setSlide(currentSlide + 1), 5000);
};

if (slides.length) {
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const i = Number(dot.dataset.index || 0);
      setSlide(i);
      startSlideShow();
    });
  });
  startSlideShow();
}
