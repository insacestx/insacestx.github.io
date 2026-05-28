// ACES 2026 — global.js (Optimized, Patched, Semi‑Minified)

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

      <!-- DESKTOP NAV -->
      <nav class="nav-links">
        <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="services.html" data-en="Services" data-es="Servicios">Services</a>

        <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>

        <div class="dropdown">
          <span class="dropdown-toggle" data-en="Insurance Types" data-es="Tipos de Seguro">Insurance Types</span>
          <div class="dropdown-menu">
            <a href="services.html?type=commercial">Commercial</a>
            <a href="services.html?type=personal">Personal</a>
            <a href="services.html?type=life">Life</a>
          </div>
        </div>

        <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="about.html" data-en="Meet Our Team" data-es="Nuestro Equipo">Meet Our Team</a>
        <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <!-- CONTROLS -->
      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn">EN / ES</button>
        <button id="mobile-menu-btn" class="mobile-menu-btn">☰</button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <nav id="mobile-menu" class="mobile-menu">

      <a href="index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="services.html" data-en="Services" data-es="Servicios">Services</a>

      <a href="applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>

      <div class="mobile-dropdown">
        <span class="mobile-dropdown-toggle" data-en="Insurance Types" data-es="Tipos de Seguro">Insurance Types</span>
        <div class="mobile-dropdown-menu">
          <a href="services.html?type=commercial">Commercial</a>
          <a href="services.html?type=personal">Personal</a>
          <a href="services.html?type=life">Life</a>
        </div>
      </div>

      <a href="coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="about.html" data-en="Meet Our Team" data-es="Nuestro Equipo">Meet Our Team</a>
      <a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a>

    </nav>
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
    .then(res => res.ok ? res.text() : Promise.reject(res.status))
    .then(html => {
      footer.innerHTML = html;
      applyLanguage(localStorage.getItem("acesLang") || "en");
    })
    .catch(err => console.warn("Footer failed to load:", err));
}

/* ------------------------------------------------------------
   LANGUAGE SYSTEM
------------------------------------------------------------ */
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

/* ------------------------------------------------------------
   ACTIVE NAV LINK
------------------------------------------------------------ */
function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a, #mobile-menu a");

  links.forEach(link => {
    const file = link.getAttribute("href").split("/").pop();
    link.classList.toggle("active", file === path || (path === "" && file === "index.html"));
  });
}

/* ------------------------------------------------------------
   MOBILE MENU (UPGRADED)
------------------------------------------------------------ */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => menu.classList.toggle("open"));

  document.addEventListener("click", e => {
    if (!menu.classList.contains("open")) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.remove("open");
  });

  document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.parentElement.classList.toggle("open");
    });
  });
}

/* ------------------------------------------------------------
   AGENT PANEL
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

  if (!photo || !nameEl || !titleEl || !phoneEl || !emailEl || !callBtn || !closeBtn) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      photo.src = card.dataset.photo;
      nameEl.textContent = card.dataset.name;
      titleEl.textContent = card.dataset.title;
      phoneEl.textContent = card.dataset.phone;
      emailEl.textContent = card.dataset.email;
      callBtn.href = `tel:${card.dataset.phone.replace(/\D/g, "")}`;
      panel.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  panel.addEventListener("click", e => { if (e.target === panel) panel.classList.remove("open"); });
}

/* Header scroll shadow */
window.addEventListener("scroll", () => {
  const header = document.getElementById("aces-header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
});

/* ------------------------------------------------------------
   TEXT POLICY MODAL (Enhanced: Scroll Lock + Bilingual + Footer Close)
------------------------------------------------------------ */
function attachTextPolicyModal() {
  const modal = document.getElementById("textPolicyModal");
  const openBtn = document.getElementById("openTextPolicy");
  const closeBtn = document.querySelector("#textPolicyModal .close");
  const bottomClose = document.getElementById("modalCloseBtn");

  if (!modal || !openBtn || !closeBtn) {
    return setTimeout(attachTextPolicyModal, 200);
  }

  /* OPEN MODAL */
  openBtn.addEventListener("click", e => {
    e.preventDefault();
    modal.style.display = "block";

    // Lock background scroll
    document.body.style.overflow = "hidden";

    // Fade-in animation
    setTimeout(() => modal.classList.add("show"), 10);

    // Apply bilingual text inside modal
    applyLanguage(localStorage.getItem("acesLang") || "en");
  });

  /* CLOSE MODAL (X BUTTON) */
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");

    // Unlock scroll
    document.body.style.overflow = "";

    setTimeout(() => modal.style.display = "none", 300);
  });

  /* CLOSE MODAL (BOTTOM BUTTON) */
  if (bottomClose) {
    bottomClose.addEventListener("click", () => {
      modal.classList.remove("show");

      // Unlock scroll
      document.body.style.overflow = "";

      setTimeout(() => modal.style.display = "none", 300);
    });
  }

  /* CLOSE MODAL (CLICK OUTSIDE) */
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("show");

      // Unlock scroll
      document.body.style.overflow = "";

      setTimeout(() => modal.style.display = "none", 300);
    }
  });
}
