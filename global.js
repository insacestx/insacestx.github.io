/* ------------------------------------------------------------
   1. HEADER INJECTION — Optimized ACES 2026 Header
------------------------------------------------------------ */
function loadHeader() {
  const header = document.getElementById("aces-header");
  if (!header) return;

  header.innerHTML = `
    <div class="header-container">

      <!-- LOGO -->
      <div class="logo-area">
        <a href="index.html" class="logo-link">
          <img src="image2.png" alt="ACES Insurance Logo" class="aces-logo">
        </a>
      </div>

      <!-- DESKTOP NAV -->
      <nav class="nav-links">
        <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="services.html" data-en="Services" data-es="Servicios">Services</a>
        <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
        <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="about.html" data-en="Meet Our Team" data-es="Nuestro Equipo">Meet Our Team</a>
        <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <!-- CONTROLS -->
      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn">ES</button>
        <button id="theme-toggle" class="theme-btn">☀</button>
        <button id="mobile-menu-btn" class="mobile-menu-btn">☰</button>
      </div>
    </div>

    <!-- MOBILE MENU -->
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
}

/* ------------------------------------------------------------
   2. FOOTER INJECTION — Optimized ACES 2026 Footer
------------------------------------------------------------ */
function loadFooter() {
  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-container">

      <!-- LEFT -->
      <div class="footer-left">
        <img src="image2.png" alt="ACES Insurance Logo" class="footer-logo">
        <p>404 Sapphire Blvd, Hewitt, TX 76643</p>
        <p>(254) 227‑6560</p>
      </div>

      <!-- CENTER -->
      <div class="footer-center">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="applications.html">Applications</a>
        <a href="claims.html">Claims</a>
        <a href="contact.html">Contact</a>
      </div>

      <!-- RIGHT -->
      <div class="footer-right">
        <h4>Follow Us</h4>
        <a href="https://facebook.com/acesinsuranceservices" target="_blank">Facebook</a>
        <a href="https://instagram.com/acesinsuranceservices" target="_blank">Instagram</a>
      </div>
    </div>

    <div class="footer-bottom">
    /* ------------------------------------------------------------
   3. LANGUAGE TOGGLE (EN / ES)
------------------------------------------------------------ */
function setupLanguageToggle() {
  const langBtn = document.getElementById("lang-toggle");

  langBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("lang");

    if (current === "en") {
      document.documentElement.setAttribute("lang", "es");
      langBtn.textContent = "EN";
      translatePage("es");
    } else {
      document.documentElement.setAttribute("lang", "en");
      langBtn.textContent = "ES";
      translatePage("en");
    }
  });
}

function translatePage(lang) {
  const elements = document.querySelectorAll("[data-en]");

  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

/* ------------------------------------------------------------
   4. DARK / LIGHT MODE TOGGLE
------------------------------------------------------------ */
function setupThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      themeBtn.textContent = "🌙";
    } else {
      themeBtn.textContent = "☀";
    }
  });
}

/* ------------------------------------------------------------
   5. MOBILE MENU
------------------------------------------------------------ */
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

/* ------------------------------------------------------------
   6. SCROLL FADE-IN ANIMATIONS
------------------------------------------------------------ */
function setupFadeInAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------
   7. APPLICATION CATEGORY SWITCHING (?type=)
------------------------------------------------------------ */
function setupApplicationSections() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (!type) return;

  const section = document.getElementById(type);

  if (section) {
    section.style.display = "block";
    window.scrollTo(0, section.offsetTop - 80);
  }
}

/* ------------------------------------------------------------
   8. INITIALIZE EVERYTHING
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  setupLanguageToggle();
  setupThemeToggle();
  setupMobileMenu();
  setupFadeInAnimations();
  setupApplicationSections();
});
      <p>© 2026 ACES Insurance Services. All Rights Reserved.</p>
    </div>
  `;
}
