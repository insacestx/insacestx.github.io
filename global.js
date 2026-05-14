/* ------------------------------------------------------------
   ACES 2026 — GLOBAL.JS (Optimized Final Version)
   Header, Footer, Language, Mobile Menu, Animations,
   Agent Panel, Round Robin, Application Switching
------------------------------------------------------------ */

/* ------------------------------------------------------------
   1. HEADER INJECTION
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
   2. FOOTER INJECTION
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
      <p>© 2026 ACES Insurance Services. All Rights Reserved.</p>
    </div>
  `;
}

/* ------------------------------------------------------------
   3. LANGUAGE TOGGLE (EN / ES)
------------------------------------------------------------ */
function setupLanguageToggle() {
  const langBtn = document.getElementById("lang-toggle");
  if (!langBtn) return;

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
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

/* ------------------------------------------------------------
   4. MOBILE MENU
------------------------------------------------------------ */
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

/* ------------------------------------------------------------
   5. SCROLL FADE-IN ANIMATIONS
------------------------------------------------------------ */
function setupFadeInAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------
   6. APPLICATION CATEGORY SWITCHING (?type=)
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
   7. AGENT PANEL (Slide-Out)
------------------------------------------------------------ */
function setupAgentPanel() {
  const panel = document.querySelector(".agent-panel");
  const closeBtn = document.querySelector(".close-panel");
  const cards = document.querySelectorAll(".agent-card");

  if (!panel || !closeBtn || cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      panel.querySelector(".panel-photo").src = card.dataset.photo;
      panel.querySelector("h2").textContent = card.dataset.name;
      panel.querySelector(".panel-title").textContent = card.dataset.title;
      panel.querySelector(".panel-phone").textContent = card.dataset.phone;
      panel.querySelector(".panel-email").textContent = card.dataset.email;
      panel.querySelector(".panel-call").href = `tel:${card.dataset.phone}`;
      panel.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
  });
}

/* ------------------------------------------------------------
   8. ROUND ROBIN EMAIL ROUTING
------------------------------------------------------------ */
function setupRoundRobin() {
  const forms = document.querySelectorAll("form[action*='formsubmit']");
  if (forms.length === 0) return;

  const agents = [
    "office@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "bryan@insaces.com",
    "jimmy@insaces.com"
  ];

  let index = Math.floor(Math.random() * agents.length);

  forms.forEach(form => {
    const toField = form.querySelector("input[name='_to']");
    if (toField) toField.value = agents[index];
    index = (index + 1) % agents.length;
  });
}

/* ------------------------------------------------------------
   9. INITIALIZE EVERYTHING
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  setupLanguageToggle();
  setupMobileMenu();
  setupFadeInAnimations();
  setupApplicationSections();
  setupAgentPanel();
  setupRoundRobin();
});
