// ACES 2026 — global.js (Stable Build, No Modal)

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
    initQuotePanel();   // ⭐ SLIDE‑OUT QUOTE PANEL
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
        <a href="testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
        <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <!-- HEADER CONTROLS -->
      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn">EN / ES</button>
        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Open Menu">☰</button>
      </div>

    </div>

    <!-- MOBILE MENU -->
    <nav id="mobile-menu" class="mobile-menu">
      <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="services.html" data-en="Services" data-es="Servicios">Services</a>
      <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
      <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
      <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </nav>
  `;
}

/* ============================================================
   FOOTER INJECTION
============================================================ */
function loadFooter() {

  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  fetch("footer.html")
    .then(res => {
      if (!res.ok) throw new Error(`Footer failed: ${res.status}`);
      return res.text();
    })
    .then(html => {
      footer.innerHTML = html;
      applyLanguage(localStorage.getItem("acesLang") || "en");
    })
    .catch(err => {
      console.warn("Footer failed to load:", err);
    });

}

/* ============================================================
   LANGUAGE SYSTEM
============================================================ */
function initLanguage() {
  applyLanguage(localStorage.getItem("acesLang") || "en");
}

function applyLanguage(lang) {

  const isEs = lang === "es";
  document.documentElement.lang = isEs ? "es" : "en";

  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    el.textContent = isEs ? (es || en) : en;
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = isEs ? "ES / EN" : "EN / ES";

}

/* ============================================================
   ACTIVE NAV LINK
============================================================ */
function setActiveNav() {

  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a, #mobile-menu a");

  links.forEach(link => {
    const file = link.getAttribute("href").split("/").pop();
    link.classList.toggle("active", file === path || (path === "" && file === "index.html"));
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
    if (menu.classList.contains("open") && !menu.contains(e.target) && !btn.contains(e.target)) {
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
  const emailEl = panel.querySelector(".panel-email");
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
   SLIDE‑OUT QUOTE PANEL — OPEN/CLOSE + AUTO LANGUAGE APPLY
============================================================ */
function initQuotePanel() {

  const openBtns = document.querySelectorAll("#openQuotePanel");
  const closeBtn = document.getElementById("closeQuotePanel");
  const savedLang = localStorage.getItem("acesLang") || "en";

  if (openBtns.length) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.body.classList.add("quote-panel-open");

        if (typeof applyLanguage === "function") {
          applyLanguage(savedLang);
        }
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.body.classList.remove("quote-panel-open");
    });
  }
}

/* ============================================================
   HEADER SHADOW
============================================================ */
window.addEventListener("scroll", () => {

  const header = document.getElementById("aces-header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 20);

});
