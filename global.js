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

/* ---------------------------------------------------------
   UNIVERSAL APPLICATION WIZARD ENGINE
--------------------------------------------------------- */

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

/* ---------------------------------------------------------
   GLOBAL INITIALIZER
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
});

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

if (currentLang === "es") {
  document.getElementById("heroImage").src = "Icons/hero-services-commercialproperty-es.png";
} else {
  document.getElementById("heroImage").src = "Icons/hero-services-commercialproperty-en.png";
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
  console.log("Agent panel initialized");

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

    console.log("Clicked:", card.dataset.name);

    photo.src = card.dataset.photo || "";
    nameEl.textContent = card.dataset.name || "";
    titleEl.textContent = card.dataset.title || "";
    phoneEl.textContent = card.dataset.phone || "";
    emailEl.textContent = card.dataset.email || "";

    callBtn.href =
      `tel:${(card.dataset.phone || "").replace(/\D/g, "")}`;

    panel.classList.add("open");

    console.log("Panel opened");
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

// APPLICATION PAGE LANGUAGE HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const isApplicationPage = window.location.pathname.includes("applications");

  if (isApplicationPage && typeof applyLanguage === "function") {
    applyLanguage(currentLanguage);
  }
});

/* -----------------------------------
   UNIVERSAL APPLICATION WIZARD ENGINE
----------------------------------- */

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
      if (current === steps.length - 2) buildReview();
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

  function val(n) {
    return form.elements[n] ? form.elements[n].value.trim() : "";
  }

  function fill(id, items) {
    const ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = "";
    items.forEach(i => {
      if (i.value) {
        const li = document.createElement("li");
        li.textContent = `${i.label}: ${i.value}`;
        ul.appendChild(li);
      }
    });
  }

  // Each application page defines its own buildReview() in HTML or JS
  if (typeof buildReview === "function") {
    form.addEventListener("submit", e => {
      if (!consent.checked) {
        e.preventDefault();
        alert("Please confirm the information is accurate.");
        return;
      }
      buildReview();
    });
  }

  show(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
});
