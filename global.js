// ACES 2026 — global.js (Optimized & Verified)

document.addEventListener("DOMContentLoaded", () => {
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
  const header = document.getElementById("aces-header");
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
        <button id="mobile-menu-btn" class="mobile-menu-btn">☰</button>
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

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = localStorage.getItem("acesLang") || "en";
      const next = current === "en" ? "es" : "en";
      localStorage.setItem("acesLang", next);
      applyLanguage(next);
    });
  }
}

/* ------------------------------------------------------------
   FOOTER INJECTION
------------------------------------------------------------ */
function loadFooter() {
  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  fetch("footer.html")
    .then((res) => {
      if (!res.ok) throw new Error(`Footer fetch failed: ${res.status}`);
      return res.text();
    })
    .then((html) => {
      footer.innerHTML = html;
      applyLanguage(localStorage.getItem("acesLang") || "en");
    })
    .catch((err) => {
      console.warn("Footer failed to load:", err);
    });
}

/* ------------------------------------------------------------
   LANGUAGE SYSTEM
------------------------------------------------------------ */
function initLanguage() {
  const saved = localStorage.getItem("acesLang") || "en";
  applyLanguage(saved);
}

function applyLanguage(lang) {
  const isEs = lang === "es";
  document.documentElement.lang = isEs ? "es" : "en";

  document.querySelectorAll("[data-en]").forEach((el) => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    el.textContent = isEs ? es || en : en;
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = isEs ? "ES / EN" : "EN / ES";
}

/* ------------------------------------------------------------
   ACTIVE NAV LINK
------------------------------------------------------------ */
function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a, #mobile-menu a");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const file = href.split("/").pop();
    
    // Match exact filename or root (index.html matches "/")
    if (file === path || (path === "" && file === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ------------------------------------------------------------
   MOBILE MENU
------------------------------------------------------------ */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

/* ------------------------------------------------------------
   AGENT PANEL (kept exactly as your widget)
------------------------------------------------------------ */
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

  // Verify all elements exist before attaching events
  if (!photo || !nameEl || !titleEl || !phoneEl || !emailEl || !callBtn || !closeBtn) {
    console.warn("Agent panel: Missing required elements");
    return;
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      photo.src = card.getAttribute("data-photo");
      nameEl.textContent = card.getAttribute("data-name");
      titleEl.textContent = card.getAttribute("data-title");
      phoneEl.textContent = card.getAttribute("data-phone");
      emailEl.textContent = card.getAttribute("data-email");
      callBtn.href = `tel:${card.getAttribute("data-phone").replace(/\D/g, "")}`;
      panel.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  panel.addEventListener("click", (e) => {
    if (e.target === panel) panel.classList.remove("open");
  });
}

/* Header scroll shadow */
window.addEventListener("scroll", () => {
  const header = document.getElementById("aces-header");
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
