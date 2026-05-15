// ACES 2026 — global.js

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
  initLanguage();
  initAgentPanel();
  setActiveNav();
  initMobileMenu();
});

/* ------------------------------------------------------------
   HEADER INJECTION
------------------------------------------------------------ */
function loadHeader() {
  const header = document.getElementById('aces-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-container">

      <div class="logo-area">
        <a href="index.html" class="logo-link">
          <img src="image2.png" alt="ACES Insurance Logo" class="aces-logo">
        </a>
      </div>

      <nav class="nav-links">
        <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="services.html" data-en="Services" data-es="Servicios">Services</a>
        <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
        <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="about.html" data-en="Meet Our Team" data-es="Nuestro Equipo">Meet Our Team</a>
        <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn">EN / ES</button>
        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle navigation">☰</button>
      </div>
    </div>

    <div id="mobile-menu" class="mobile-menu">
      <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="services.html" data-en="Services" data-es="Servicios">Services</a>
      <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
      <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="about.html" data-en="Meet Our Team" data-es="Nuestro Equipo">Meet Our Team</a>
      <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </div>
  `;

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = localStorage.getItem('acesLang') || 'en';
      const next = current === 'en' ? 'es' : 'en';
      localStorage.setItem('acesLang', next);
      applyLanguage(next);
    });
  }
}

/* ------------------------------------------------------------
   FOOTER INJECTION (uses footer.html)
------------------------------------------------------------ */
function loadFooter() {
  const footer = document.getElementById('aces-footer');
  if (!footer) return;

  fetch('footer.html')
    .then(r => r.text())
    .then(html => {
      footer.innerHTML = html;
      // re-apply language after footer loads
      const saved = localStorage.getItem('acesLang') || 'en';
      applyLanguage(saved);
    })
    .catch(() => {});
}

/* ------------------------------------------------------------
   LANGUAGE HANDLING
------------------------------------------------------------ */
function initLanguage() {
  const saved = localStorage.getItem('acesLang') || 'en';
  applyLanguage(saved);
}

function applyLanguage(lang) {
  const isEs = lang === 'es';
  document.documentElement.lang = isEs ? 'es' : 'en';

  document.querySelectorAll('[data-en]').forEach(el => {
    const en = el.getAttribute('data-en');
    const es = el.getAttribute('data-es');
    const text = isEs ? (es || en) : en;
    if (text) el.textContent = text;
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = isEs ? 'ES / EN' : 'EN / ES';
  }
}

/* ------------------------------------------------------------
   ACTIVE NAV LINK (desktop + mobile)
------------------------------------------------------------ */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const desktopLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');

  [...desktopLinks, ...mobileLinks].forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    if (file === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ------------------------------------------------------------
   MOBILE MENU
------------------------------------------------------------ */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!menu.classList.contains('open')) return;
    const withinMenu = menu.contains(e.target);
    const withinBtn = btn.contains(e.target);
    if (!withinMenu && !withinBtn) {
      menu.classList.remove('open');
    }
  });
}

/* ------------------------------------------------------------
   AGENT SLIDE-OUT PANEL (kept exactly as a widget)
------------------------------------------------------------ */
function initAgentPanel() {
  const cards = document.querySelectorAll('.agent-card');
  const panel = document.querySelector('.agent-panel');
  if (!cards.length || !panel) return;

  const photo = panel.querySelector('.panel-photo');
  const nameEl = panel.querySelector('h2');
  const titleEl = panel.querySelector('.panel-title');
  const phoneEl = panel.querySelector('.panel-phone');
  const emailEl = panel.querySelector('.panel-email');
  const callBtn = panel.querySelector('.panel-call');
  const closeBtn = panel.querySelector('.close-panel');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name') || '';
      const title = card.getAttribute('data-title') || '';
      const phone = card.getAttribute('data-phone') || '';
      const email = card.getAttribute('data-email') || '';
      const photoSrc = card.getAttribute('data-photo') || '';

      if (photo) photo.src = photoSrc;
      if (nameEl) nameEl.textContent = name;
      if (titleEl) titleEl.textContent = title;
      if (phoneEl) phoneEl.textContent = phone;
      if (emailEl) emailEl.textContent = email;
      if (callBtn) callBtn.href = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

      panel.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
    });
  }

  panel.addEventListener('click', e => {
    if (e.target === panel) {
      panel.classList.remove('open');
    }
  });
}
