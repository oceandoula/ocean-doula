// ── Language toggle ──
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder')
        || el.getAttribute('data-en-placeholder')
        || el.placeholder;
    } else {
      el.innerHTML = text;
    }
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute('data-' + lang + '-placeholder')
      || el.getAttribute('data-en-placeholder');
  });

  // update toggle active state
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  document.getElementById('langZH').classList.toggle('active', lang === 'zh');
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'zh' : 'en');
});

// ── Sticky nav shadow ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(44,62,53,.10)'
    : 'none';
});

// ── Smooth active nav link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--deep)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = currentLang === 'zh' ? '发送中…' : 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    btn.style.display = 'none';
    document.getElementById('formSuccess').classList.remove('hidden');
    const msg = document.querySelector('#formSuccess p');
    msg.innerHTML = currentLang === 'zh'
      ? '✨ 留言已发送！我将在24小时内与您联系。'
      : '✨ Message sent! I\'ll be in touch within 24 hours.';
  }, 1200);
}

// ── Scroll-in animation ──
const fadeEls = document.querySelectorAll('.card, .pillar, .testimonial, .faq-item');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
