// ACES 2026 — global.js (Stable Build, Folder‑Safe, Repo‑Prefixed)

document.addEventListener("DOMContentLoaded", () => {

  /* CORE */
  loadHeader();
  loadFooter();

  /* WAIT FOR HEADER AND FOOTER INJECTION */
 setTimeout(() => {
  initLanguage();
  setActiveNav();
  initMobileMenu();
  initAgentPanel();
  initQuotePanel();
  initLoginPanel();   // ⭐ ADD THIS
}, 100);


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
}

function initLoginPanel() {

  const loginBtn = document.getElementById("agent-login-btn");
  const panel = document.getElementById("loginPanel");
  const closeBtn = document.getElementById("loginCloseBtn");
  const submitBtn = document.getElementById("loginSubmitBtn");

  if (!loginBtn || !panel || !closeBtn || !submitBtn) return;

  // Open panel
  loginBtn.addEventListener("click", () => {
    panel.classList.add("open");
  });

  // Close panel
  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
  });

  // Temporary login system
  submitBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    if (password !== "aces2026") {
      alert("Invalid password.");
      return;
    }

    const agents = [
      { email: "george@insaces.com", role: "owner" },
      { email: "bryan@insaces.com", role: "owner" },
      { email: "jordan@insaces.com", role: "owner" },
      { email: "lanse@insaces.com", role: "owner" },
      { email: "robert@insaces.com", role: "owner" },
      { email: "jimmy@insaces.com", role: "agent" },
      { email: "office@insaces.com", role: "agent" }
    ];

    const user = agents.find(a => a.email === email);

    if (!user) {
      alert("Email not recognized.");
      return;
    }

    localStorage.setItem("acesUser", JSON.stringify(user));
    window.location.href = "/ams/dashboard/dashboard.html";
  });
}


/* ---------------------------------------------------------
   GLOBAL ROUND ROBIN EMAIL ENGINE
--------------------------------------------------------- */

function getRoundRobinList() {
  return [
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "george@insaces.com",
    "jimmy@insaces.com",
    "office@insaces.com"
  ];
}

function getNextRoundRobinEmail() {
  const key = "aces_rr_index";
  const list = getRoundRobinList();
  let index = parseInt(localStorage.getItem(key) || "0", 10);
  if (isNaN(index) || index < 0 || index >= list.length) index = 0;
  const email = list[index];
  localStorage.setItem(key, (index + 1) % list.length);
  return email;
}

function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (rrField) rrField.value = getNextRoundRobinEmail();
}

/* ============================================================
   FOOTER INJECTION (IMPROVED WITH ERROR HANDLING)
============================================================ */
function loadFooter() {
  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  fetch("/footer.html")
    .then(res => {
      if (!res.ok) throw new Error(`Footer load failed: ${res.status}`);
      return res.text();
    })
    .then(html => {
      footer.innerHTML = html;
      // Apply current language to footer immediately
      const currentLang = localStorage.getItem("acesLang") || "en";
      applyLanguage(currentLang);
    })
    .catch(err => {
      console.error("Footer load error:", err);
      // Fallback footer
      footer.innerHTML = '<div class="aces-footer"><p style="text-align:center;padding:20px;color:#999;">© 2026 ACES Insurance Services</p></div>';
    });
}

/* ============================================================
   LANGUAGE SYSTEM (IMPROVED)
============================================================ */
function initLanguage() {
  const savedLang = localStorage.getItem("acesLang") || "en";
  applyLanguage(savedLang);
}

function toggleLanguage() {
  const current = localStorage.getItem("acesLang") || "en";
  const newLang = current === "en" ? "es" : "en";
  localStorage.setItem("acesLang", newLang);
  applyLanguage(newLang);
}

function applyLanguage(lang) {
  const isEs = lang === "es";

  // Apply to all data-en/data-es elements
  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    el.textContent = isEs ? (es || en) : en;
  });

  // Update language button
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = isEs ? "ES / EN" : "EN / ES";

  // Store language preference
  localStorage.setItem("acesLang", lang);
}

/* ============================================================
   ACTIVE NAV
============================================================ */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-links a, #mobile-menu a").forEach(link => {
    const href = link.getAttribute("href");
    // Match both exact paths and index pages
    const isActive = path === href || (href === "/index.html" && (path === "/" || path === "/insacestx.github.io/"));
    link.classList.toggle("active", isActive);
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
      emailEl.href = `mailto:${card.dataset.email || ""}`;
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
   QUOTE PANEL (PLACEHOLDER)
============================================================ */
function initQuotePanel() {
  // Initialize quote panel if it exists on the page
  const quotePanel = document.querySelector(".quote-panel");
  if (quotePanel) {
    // Quote panel logic here if needed
  }
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

/* ============================================================
   UNIVERSAL APPLICATION WIZARD ENGINE
============================================================ */

function initWizardNav() {
  const form = document.querySelector("form[data-wizard]");
  if (!form) return; // Not an application page

  const steps = [...document.querySelectorAll(".form-step")];
  const indicators = [...document.querySelectorAll(".auto-wizard-step")];
  const consent = document.getElementById("consentCheckbox");

  let current = 0;

  function show(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    indicators.forEach((ind, idx) => {
      ind.classList.toggle("active", idx === i);
      ind.classList.toggle("completed", idx < i);
    });
    current = i;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (current < steps.length - 1) {
      show(current + 1);
      if (current === steps.length - 2 && typeof buildReview === "function") {
        buildReview();
      }
    }
  }

  function prev() {
    if (current > 0) show(current - 1);
  }

  document.querySelectorAll("[data-next-step]").forEach(b => b.addEventListener("click", next));
  document.querySelectorAll("[data-prev-step]").forEach(b => b.addEventListener("click", prev));

  indicators.forEach((ind, idx) => ind.addEventListener("click", () => {
    if (idx <= current) show(idx);
  }));

  form.addEventListener("submit", e => {
    if (consent && !consent.checked) {
      e.preventDefault();
      alert("Please confirm the information is accurate.");
      return;
    }
    if (typeof buildReview === "function") buildReview();
  });

  show(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
});
