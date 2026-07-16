// ACES 2026 — global.js (Stable Build, Folder‑Safe, Repo‑Prefixed)

document.addEventListener("DOMContentLoaded", () => {
  /* CORE */
  loadHeader();
  loadFooter();

  /* Header is injected synchronously, so init immediately */
  initLanguage();
  setActiveNav();
  initMobileMenu();
  initAgentPanel();
  initQuotePanel();
  initLoginPanel();

  initRoundRobinEmail();
  initWizardNav();
});

/* ============================================================
   PATH HELPERS
============================================================ */
function getRootPath() {
  // Handles user/org site and project site
  const parts = window.location.pathname.split("/").filter(Boolean);
  // If hosted at /insacestx.github.io/... keep repo prefix
  if (parts[0] === "insacestx.github.io") return "/insacestx.github.io/";
  return "/";
}

function getRelativeRoot() {
  // Calculate depth based on current path to use correct relative paths
  const path = window.location.pathname;
  // Count directory levels (ignore trailing filename)
  const depth = (path.match(/\//g) || []).length - 1;
  
  // If we're at root level, no prefix needed
  if (depth === 0) return "";
  
  // Otherwise, use ../ for each level deep
  return "../".repeat(depth);
}

/* ============================================================
   HEADER INJECTION — GITHUB PAGES SAFE (NO ROOT LOGIC)
============================================================ */
function loadHeader() {
  const header = document.getElementById("aces-header");
  if (!header) return;

  // Use relative paths based on current depth
  const root = getRelativeRoot();

  header.innerHTML = `
    <div class="header-container">

      <!-- LOGO -->
      <div class="logo-area">
        <a href="${root}index.html" class="logo-link" aria-label="ACES Home">
          <img src="${root}Icons/image2.png" alt="ACES Insurance Logo" class="aces-logo">
        </a>
      </div>

      <!-- DESKTOP NAV -->
      <nav class="nav-links">
        <a href="${root}index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="${root}services.html" data-en="Services" data-es="Servicios">Services</a>
        <a href="${root}applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
        <a href="${root}coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="${root}claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="${root}testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
        <a href="${root}contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <!-- CONTROLS -->
      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn" type="button">EN / ES</button>

        <button
          id="agent-login-btn"
          class="agent-login-btn"
          type="button"
          data-en="Agent Login"
          data-es="Acceso de Agente">
          Agent Login
        </button>

        <button id="mobile-menu-btn" class="mobile-menu-btn" type="button">☰</button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <nav id="mobile-menu" class="mobile-menu">
      <a href="${root}index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="${root}services.html" data-en="Services" data-es="Servicios">Services</a>
      <a href="${root}applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
      <a href="${root}coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="${root}claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="${root}testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
      <a href="${root}contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </nav>

    <!-- LOGIN PANEL -->
    <aside id="loginPanel" class="login-panel" aria-hidden="true">
      <button id="loginCloseBtn" class="close-panel" type="button" aria-label="Close">×</button>

      <h2 data-en="Agent Login" data-es="Acceso de Agente">Agent Login</h2>

      <label for="loginAgentSelect" data-en="Agent" data-es="Agente">Agent</label>
      <select id="loginAgentSelect" class="login-agent-select" required>
        <option value="" disabled selected data-en="Select your name" data-es="Seleccione su nombre">Select your name</option>
      </select>

      <label for="loginPassword" data-en="Password" data-es="Contraseña">Password</label>
      <input
        type="password"
        id="loginPassword"
        placeholder="Password"
        autocomplete="current-password" />

      <button id="loginSubmitBtn" class="login-submit-btn" type="button" data-en="Login" data-es="Iniciar Sesión">
        Login
      </button>
    </aside>
  `;
}

/* ============================================================
   LOGIN PANEL
============================================================ */
function initLoginPanel() {
  const loginBtn = document.getElementById("agent-login-btn");
  const panel = document.getElementById("loginPanel");
  const closeBtn = document.getElementById("loginCloseBtn");
  const submitBtn = document.getElementById("loginSubmitBtn");
  const agentSelect = document.getElementById("loginAgentSelect");
  const passwordInput = document.getElementById("loginPassword");

  if (!loginBtn || !panel || !closeBtn || !submitBtn || !agentSelect || !passwordInput) return;

  const fallbackAgents = [
    { name: "George Santibañez", email: "george@insaces.com", role: "owner" },
    { name: "Bryan", email: "bryan@insaces.com", role: "owner" },
    { name: "Jordan Jones", email: "jordan@insaces.com", role: "owner" },
    { name: "Lanse Derrick", email: "lanse@insaces.com", role: "owner" },
    { name: "Robert", email: "robert@insaces.com", role: "owner" },
    { name: "Jimmy Rodriguez", email: "jimmy@insaces.com", role: "agent" },
    { name: "Renee Ridling", email: "office@insaces.com", role: "agent" }
  ];

  let agents = fallbackAgents;
  try {
    const raw = localStorage.getItem("aces_agents_login");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        agents = parsed;
      }
    }
  } catch (e) {
    console.warn("Unable to parse aces_agents_login:", e);
  }

  // Populate dropdown once
  if (!agentSelect.dataset.loaded) {
    const ph = agentSelect.querySelector('option[value=""]');
    agentSelect.innerHTML = "";
    if (ph) {
      agentSelect.appendChild(ph);
    } else {
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.disabled = true;
      placeholder.selected = true;
      placeholder.setAttribute("data-en", "Select your name");
      placeholder.setAttribute("data-es", "Seleccione su nombre");
      placeholder.textContent = "Select your name";
      agentSelect.appendChild(placeholder);
    }

    agents.forEach(a => {
      const email = (a.email || "").toLowerCase().trim();
      if (!email) return;
      const opt = document.createElement("option");
      opt.value = email;
      opt.textContent = a.name || email;
      agentSelect.appendChild(opt);
    });

    agentSelect.dataset.loaded = "true";
  }

  loginBtn.addEventListener("click", () => {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });

  submitBtn.addEventListener("click", () => {
    const selectedEmail = (agentSelect.value || "").trim().toLowerCase();
    const password = (passwordInput.value || "").trim();

    if (!selectedEmail) {
      alert("Please select your name.");
      return;
    }

    if (password !== "aces2026") {
      alert("Invalid password.");
      return;
    }

    const user = agents.find(a => (a.email || "").toLowerCase().trim() === selectedEmail);

    if (!user) {
      alert("Agent not recognized.");
      return;
    }

    localStorage.setItem("acesUser", JSON.stringify(user));
    // Use absolute path for AMS dashboard to avoid relative path issues
    window.location.href = "/ams/dashboard/dashboard.html";
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    }
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
   FOOTER INJECTION
============================================================ */
function loadFooter() {
  const footer = document.getElementById("aces-footer");
  if (!footer) return;

  const root = getRelativeRoot();

  fetch(`${root}footer.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Footer load failed: ${res.status}`);
      return res.text();
    })
    .then(html => {
      footer.innerHTML = html;
      const currentLang = localStorage.getItem("acesLang") || "en";
      applyLanguage(currentLang);
    })
    .catch(err => {
      console.error("Footer load error:", err);
      footer.innerHTML = '<div class="aces-footer"><p style="text-align:center;padding:20px;color:#999;">© 2026 ACES Insurance Services</p></div>';
    });
}

/* ============================================================
   LANGUAGE SYSTEM
============================================================ */
function initLanguage() {
  const savedLang = localStorage.getItem("acesLang") || "en";
  applyLanguage(savedLang);

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn && !langBtn.dataset.bound) {
    langBtn.addEventListener("click", toggleLanguage);
    langBtn.dataset.bound = "true";
  }
}

function toggleLanguage() {
  const current = localStorage.getItem("acesLang") || "en";
  const newLang = current === "en" ? "es" : "en";
  localStorage.setItem("acesLang", newLang);
  applyLanguage(newLang);

  // notify dynamic pages to re-render
  window.dispatchEvent(new Event("aces:language-changed"));
}

function applyLanguage(lang) {
  const isEs = lang === "es";

  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    const translated = isEs ? (es || en || "") : (en || "");

    if (el.tagName && el.tagName.toLowerCase() === "title") {
      document.title = translated || document.title;
      return;
    }

    // placeholders
    if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.hasAttribute("placeholder")) {
      el.setAttribute("placeholder", translated);
    }

    // options
    if (el.tagName === "OPTION") {
      el.textContent = translated;
      return;
    }

    // default text
    if (!((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.hasAttribute("placeholder"))) {
      el.textContent = translated;
    }
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = isEs ? "ES / EN" : "EN / ES";

  localStorage.setItem("acesLang", lang);
}

/* ============================================================
   ACTIVE NAV
============================================================ */
function setActiveNav() {
  const path = window.location.pathname;
  const root = getRelativeRoot();

  document.querySelectorAll(".nav-links a, #mobile-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const isHome = href === `${root}index.html` || href === "index.html";
    const isActive =
      path === href ||
      path.endsWith(href) ||
      (isHome && (path === "/" || path.endsWith("/index.html")));

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

  function openFromCard(card) {
    if (!card) return;

    photo.src = card.dataset.photo || "";
    nameEl.textContent = card.dataset.name || "";
    titleEl.textContent = card.dataset.title || "";
    phoneEl.textContent = card.dataset.phone || "";
    emailEl.textContent = card.dataset.email || "";
    emailEl.href = `mailto:${card.dataset.email || ""}`;
    callBtn.href = `tel:${(card.dataset.phone || "").replace(/\D/g, "")}`;
    panel.classList.add("open");
  }

  cards.forEach(card => {
    // whole card click
    card.addEventListener("click", e => {
      // if they click a link/button inside card, still allow default behavior
      const interactive = e.target.closest("a, button, input, select, textarea, label");
      if (interactive && !interactive.classList.contains("agent-info-btn")) return;
      openFromCard(card);
    });

    // keyboard accessibility
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    if (!card.hasAttribute("role")) card.setAttribute("role", "button");

    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFromCard(card);
      }
    });
  });

  // keep support for existing "More Info" button if present
  document.querySelectorAll(".agent-info-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = btn.closest(".agent-card");
      openFromCard(card);
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
  if (!form) return;

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

  indicators.forEach((ind, idx) =>
    ind.addEventListener("click", () => {
      if (idx <= current) show(idx);
    })
  );

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

/* ============================================================
   NAVIGATION HELPER: BACK TO APPLICATIONS
============================================================ */
function goBackToApplications() {
  const root = getRelativeRoot();
  window.location.href = `${root}applications.html`;
}
