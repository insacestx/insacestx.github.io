// ACES 2026 — global.js (Stable Build, Folder‑Safe, Repo‑Prefixed)

document.addEventListener("DOMContentLoaded", () => {

  /* CORE */
  loadHeader();
  loadFooter();

  /* WAIT FOR HEADER INJECTION */
  setTimeout(() => {
    initLanguage();
    setActiveNav();
    initMobileMenu();
    initAgentPanel();
    initQuotePanel();
  }, 0);

});

/* ============================================================
   HEADER INJECTION
============================================================ */
function loadHeader() {
  const header = document.getElementById("aces-header");
  if (!header) return;

  header.innerHTML = `
    <div class="header-container">

      <!-- LOGO -->
      <div class="logo-area">
        <a href="/index.html" class="logo-link">
          <img src="/image2.png" alt="ACES Insurance Logo" class="aces-logo">
        </a>
      </div>

      <!-- DESKTOP NAV -->
      <nav class="nav-links">
        <a href="/index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="/services.html" data-en="Services" data-es="Servicios">Services</a>
        <a href="/applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
        <a href="/coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="/claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="/testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
        <a href="/contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <!-- CONTROLS -->
      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn">EN / ES</button>
        <button id="mobile-menu-btn" class="mobile-menu-btn">☰</button>
      </div>

    </div>

    <!-- MOBILE MENU -->
    <nav id="mobile-menu" class="mobile-menu">
      <a href="/index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="/services.html" data-en="Services" data-es="Servicios">Services</a>
      <a href="/applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
      <a href="/coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="/claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="/testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
      <a href="/contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </nav>
  `;

  setTimeout(() => {
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) langToggle.addEventListener("click", toggleLanguage);
  }, 0);
}

/* ============================================================
   FOOTER INJECTION
============================================================ */
function loadFooter() {
  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  fetch("/footer.html")
    .then(res => res.text())
    .then(html => {
      footer.innerHTML = html;
      applyLanguage(localStorage.getItem("acesLang") || "en");
    })
    .catch(err => console.warn("Footer load error:", err));
}

/* ============================================================
   LANGUAGE SYSTEM
============================================================ */
function initLanguage() {
  applyLanguage(localStorage.getItem("acesLang") || "en");
}

function toggleLanguage() {
  const current = localStorage.getItem("acesLang") || "en";
  const newLang = current === "en" ? "es" : "en";
  localStorage.setItem("acesLang", newLang);
  applyLanguage(newLang);
}

function applyLanguage(lang) {
  const isEs = lang === "es";

  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    el.textContent = isEs ? (es || en) : en;
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = isEs ? "ES / EN" : "EN / ES";
}

/* ============================================================
   ACTIVE NAV
============================================================ */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-links a, #mobile-menu a").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
}

/* ============================================================
   MOBILE MENU
============================================================ */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

  document.addEventListener("click", e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

/* ============================================================
   AGENT PANEL
============================================================ */
function initAgentPanel() {
  const cards = document.querySelectorAll(".agent-card");
  const panel = document.querySelector(".agent-panel");

  if (!cards.length || !panel) return;

  const photo = panel.querySelector(".panel-photo");
  const nameEl = panel.querySelector("h2");
  const titleEl = panel.querySelector(".panel-title");
  const phoneEl = panel.querySelector(".panel-phone");
  const emailEl = panel.queryquerySelector(".panel-email");
  const callBtn = panel.querySelector(".panel-call");
  const closeBtn = panel.querySelector(".close-panel");

  if (!photo || !nameEl || !titleEl || !phoneEl || !emailEl || !callBtn || !closeBtn) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      photo.src = card.dataset.photo || "";
      nameEl.textContent = card.dataset.name || "";
      titleEl.textContent = card.dataset.title || "";
      phoneEl.textContent = card.dataset.phone || "";
      emailEl.textContent = card.dataset.email || "";
      callBtn.href = `tel:${(card.dataset.phone || "").replace(/\D/g, "")}`;
      panel.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  panel.addEventListener("click", e => {
    if (e.target === panel) panel.classList.remove("open");
  });
}

/* ============================================================
   HEADER SHADOW ON SCROLL
============================================================ */
window.addEventListener("scroll", () => {
  const header = document.getElementById("aces-header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Apply language from global.js
  if (typeof applyLanguage === "function") {
    applyLanguage(currentLanguage);
  }
});
