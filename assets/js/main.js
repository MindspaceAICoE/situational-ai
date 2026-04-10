// ============================================
// Situational AI — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // --- YouTube video loader ---
  const loadVideoBtn = document.getElementById('loadVideoBtn');
  const youtubeUrlInput = document.getElementById('youtubeUrl');
  const videoFrame = document.getElementById('videoFrame');
  const videoPlaceholder = document.getElementById('videoPlaceholder');

  function extractVideoId(url) {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  function loadVideo(url) {
    const videoId = extractVideoId(url);
    if (videoId && videoFrame && videoPlaceholder) {
      videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      videoFrame.classList.remove('hidden');
      videoPlaceholder.style.display = 'none';
    }
  }

  if (loadVideoBtn && youtubeUrlInput) {
    loadVideoBtn.addEventListener('click', () => {
      loadVideo(youtubeUrlInput.value.trim());
    });
    youtubeUrlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loadVideo(youtubeUrlInput.value.trim());
    });
  }

  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
      if (youtubeUrlInput && youtubeUrlInput.value.trim()) {
        loadVideo(youtubeUrlInput.value.trim());
      }
    });
  }

  // --- Scroll-triggered fade-in animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in to section elements
  document.querySelectorAll('.about-card, .feature-card, .blog-card, .blog-list-card').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
