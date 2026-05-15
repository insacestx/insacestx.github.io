/* ============================================================
   ACES 2026 — GLOBAL JAVASCRIPT
   (Header/Footer Injection, i18n, Mobile Menu)
============================================================ */

// Language state
let currentLang = localStorage.getItem('acesLang') || 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  setupLanguageSwitcher();
  setupMobileMenu();
  applyLanguage(currentLang);
  setActiveNavLink();
});

/* ============================================================
   HEADER INJECTION
============================================================ */
function injectHeader() {
  const headerEl = document.getElementById('aces-header');
  if (!headerEl) return;

  const headerHTML = `
    <div class="header-container">
      <div class="logo-area">
        <a href="index.html" style="display:flex;align-items:center;">
          <div class="aces-logo" style="font-weight:bold;font-size:1.2rem;color:#ff4d4d;">
            ACES
          </div>
        </a>
      </div>

      <nav class="nav-links">
        <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="products.html" data-en="Products" data-es="Productos">Products</a>
        <a href="about.html" data-en="About" data-es="Acerca de">About</a>
        <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <div class="header-controls">
        <button class="lang-btn" id="lang-toggle" data-en="ES" data-es="EN">
          ES
        </button>
        <button class="mobile-menu-btn" id="mobile-menu-toggle">
          ☰
        </button>
      </div>
    </div>

    <nav class="mobile-menu" id="mobile-menu">
      <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="products.html" data-en="Products" data-es="Productos">Products</a>
      <a href="about.html" data-en="About" data-es="Acerca de">About</a>
      <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </nav>
  `;

  headerEl.innerHTML = headerHTML;
}

/* ============================================================
   FOOTER INJECTION
============================================================ */
function injectFooter() {
  const footerEl = document.getElementById('aces-footer');
  if (!footerEl) return;

  const footerHTML = `
    <div class="footer-grid">
      <div>
        <h3 style="margin-bottom:12px;color:#ff4d4d;" data-en="Company" data-es="Empresa">Company</h3>
        <a href="about.html" class="footer-link" data-en="About Us" data-es="Sobre Nosotros">About Us</a><br>
        <a href="contact.html" class="footer-link" data-en="Contact" data-es="Contacto">Contact</a><br>
        <a href="index.html" class="footer-link" data-en="Home" data-es="Inicio">Home</a>
      </div>

      <div>
        <h3 style="margin-bottom:12px;color:#ff4d4d;" data-en="Services" data-es="Servicios">Services</h3>
        <a href="products.html" class="footer-link" data-en="Products" data-es="Productos">Products</a><br>
        <a href="#" class="footer-link" data-en="Insurance Plans" data-es="Planes de Seguro">Insurance Plans</a><br>
        <a href="#" class="footer-link" data-en="Get a Quote" data-es="Obtener Cotización">Get a Quote</a>
      </div>

      <div>
        <h3 style="margin-bottom:12px;color:#ff4d4d;" data-en="Connect" data-es="Conectar">Connect</h3>
        <div class="footer-social">
          <a href="https://facebook.com" class="social-icon" title="Facebook">f</a>
          <a href="https://twitter.com" class="social-icon" title="Twitter">𝕏</a>
          <a href="https://linkedin.com" class="social-icon" title="LinkedIn">in</a>
        </div>
      </div>
    </div>

    <div class="footer-legal">
      <p data-en="© 2026 ACES Insurance Services. All rights reserved."
         data-es="© 2026 ACES Insurance Services. Todos los derechos reservados.">
        © 2026 ACES Insurance Services. All rights reserved.
      </p>
    </div>

    <button class="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"
            data-en="↑ Back to Top" data-es="↑ Volver Arriba">
      ↑ Back to Top
    </button>
  `;

  footerEl.classList.add('aces-footer');
  footerEl.innerHTML = footerHTML;
}

/* ============================================================
   LANGUAGE SWITCHER
============================================================ */
function setupLanguageSwitcher() {
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('acesLang', currentLang);
    applyLanguage(currentLang);
    updateLangButton();
  });

  updateLangButton();
}

function updateLangButton() {
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;
  langBtn.textContent = currentLang === 'en' ? 'ES' : 'EN';
}

/* ============================================================
   APPLY LANGUAGE (i18n)
============================================================ */
function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-en][data-es]');
  elements.forEach(el => {
    if (lang === 'es') {
      el.textContent = el.getAttribute('data-es');
    } else {
      el.textContent = el.getAttribute('data-en');
    }
  });
}

/* ============================================================
   MOBILE MENU
============================================================ */
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu when link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ============================================================
   SET ACTIVE NAV LINK
============================================================ */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
