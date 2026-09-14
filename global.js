// ACES 2026 — global.js (Unified Round Robin + Shared Helpers)

/* ============================================================
   FEATURE FLAGS
============================================================ */
const FEATURES = {
  agentLogin: true // true = show Agent Login, false = hide/disable
};

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

  // Backward compatible: still sets #rrEmail if present
  initRoundRobinEmail();
  initWizardNav();
});

/* ============================================================
   PATH HELPERS
============================================================ */
function getRootPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts[0] === "insacestx.github.io") return "/insacestx.github.io/";
  return "/";
}

function getRelativeRoot() {
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  if (depth === 0) return "";
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

        ${FEATURES.agentLogin ? `
        <button
          id="agent-login-btn"
          class="agent-login-btn"
          type="button"
          data-en="Agent Login"
          data-es="Acceso de Agente">
          Agent Login
        </button>
        ` : ``}

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

    ${FEATURES.agentLogin ? `
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
    ` : ``}
  `;
}

/* ============================================================
   LOGIN PANEL
============================================================ */
function initLoginPanel() {
  if (!FEATURES.agentLogin) return;

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

function getRoundRobinState() {
  const key = "aces_rr_state";
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { index: 0 };
    const parsed = JSON.parse(raw);
    if (!Number.isInteger(parsed?.index) || parsed.index < 0) return { index: 0 };
    return parsed;
  } catch {
    return { index: 0 };
  }
}

function setRoundRobinState(state) {
  localStorage.setItem("aces_rr_state", JSON.stringify(state));
}

function getNextRoundRobinAssignment() {
  const list = getRoundRobinList();
  if (!list.length) return null;

  let { index = 0 } = getRoundRobinState();
  if (!Number.isInteger(index) || index < 0 || index >= list.length) index = 0;

  const email = list[index];
  const nextIndex = (index + 1) % list.length;

  setRoundRobinState({
    index: nextIndex,
    lastAssignedEmail: email,
    lastAssignedAt: new Date().toISOString()
  });

  return { email, assignedIndex: index, nextIndex };
}

function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (!rrField) return;

  const assignment = getNextRoundRobinAssignment();
  rrField.value = assignment?.email || "";
}

// optional test helper
function resetRoundRobin(startIndex = 0) {
  const list = getRoundRobinList();
  const safe = Number.isInteger(startIndex) && startIndex >= 0 && startIndex < list.length ? startIndex : 0;
  setRoundRobinState({ index: safe });
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

      // Fix relative asset + link paths inside injected footer for nested pages
      const root = getRelativeRoot();

      // Images in footer
      footer.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        // only rewrite relative (not absolute/protocol/data)
        if (
          src &&
          !src.startsWith("/") &&
          !src.startsWith("http://") &&
          !src.startsWith("https://") &&
          !src.startsWith("data:")
        ) {
          img.setAttribute("src", `${root}${src}`);
        }
      });

      // Internal links in footer
      footer.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href") || "";
        const isExternal =
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("#") ||
          href.startsWith("javascript:");

        if (href && !isExternal && !href.startsWith("/")) {
          a.setAttribute("href", `${root}${href}`);
        }
      });

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

/* ============================================================
   SHARED ROUND ROBIN ENGINE (SINGLE SOURCE OF TRUTH)
============================================================ */
const RR = {
  pools: {
    en: [
      "bryan@insaces.com",
      "jordan@insaces.com",
      "lanse@insaces.com",
      "robert@insaces.com",
      "george@insaces.com",
      "jimmy@insaces.com",
      "office@insaces.com"
    ],
    es: [
      "bryan@insaces.com",
      "jordan@insaces.com",
      "lanse@insaces.com",
      "robert@insaces.com",
      "george@insaces.com",
      "jimmy@insaces.com",
      "office@insaces.com"
    ]
  },
  keys: {
    state: "aces_rr_unified_state",
    legacySingle: "aces_rr_state",
    legacyEn: "acesRoundRobinIndexEn",
    legacyEs: "acesRoundRobinIndexEs"
  }
};

function rrNormalizeLang(lang) {
  const x = String(lang || "").trim().toLowerCase();
  return x === "es" || x === "spanish" ? "es" : "en";
}

function rrGetPool(lang = "en") {
  return rrNormalizeLang(lang) === "es" ? RR.pools.es : RR.pools.en;
}

function rrDefaultState() {
  return {
    enIndex: 0,
    esIndex: 0,
    lastAssignedEmail: "",
    lastAssignedLang: "en",
    lastAssignedAt: ""
  };
}

function rrReadState() {
  // New state first
  try {
    const raw = localStorage.getItem(RR.keys.state);
    if (raw) {
      const s = JSON.parse(raw);
      return {
        enIndex: Number.isInteger(s?.enIndex) && s.enIndex >= 0 ? s.enIndex : 0,
        esIndex: Number.isInteger(s?.esIndex) && s.esIndex >= 0 ? s.esIndex : 0,
        lastAssignedEmail: s?.lastAssignedEmail || "",
        lastAssignedLang: rrNormalizeLang(s?.lastAssignedLang || "en"),
        lastAssignedAt: s?.lastAssignedAt || ""
      };
    }
  } catch (_) {}

  // Legacy migration fallback
  let enIndex = 0;
  let esIndex = 0;

  try {
    const oldUnified = JSON.parse(localStorage.getItem(RR.keys.legacySingle) || "{}");
    if (Number.isInteger(oldUnified.index) && oldUnified.index >= 0) {
      enIndex = oldUnified.index;
    }
  } catch (_) {}

  const oldEn = Number(localStorage.getItem(RR.keys.legacyEn));
  const oldEs = Number(localStorage.getItem(RR.keys.legacyEs));
  if (Number.isFinite(oldEn) && oldEn >= 0) enIndex = oldEn;
  if (Number.isFinite(oldEs) && oldEs >= 0) esIndex = oldEs;

  return { ...rrDefaultState(), enIndex, esIndex };
}

function rrWriteState(state) {
  const safe = {
    enIndex: Number.isInteger(state?.enIndex) && state.enIndex >= 0 ? state.enIndex : 0,
    esIndex: Number.isInteger(state?.esIndex) && state.esIndex >= 0 ? state.esIndex : 0,
    lastAssignedEmail: state?.lastAssignedEmail || "",
    lastAssignedLang: rrNormalizeLang(state?.lastAssignedLang || "en"),
    lastAssignedAt: state?.lastAssignedAt || ""
  };
  localStorage.setItem(RR.keys.state, JSON.stringify(safe));

  // Keep legacy keys in sync for compatibility
  localStorage.setItem(RR.keys.legacyEn, String(safe.enIndex));
  localStorage.setItem(RR.keys.legacyEs, String(safe.esIndex));
  localStorage.setItem("acesRrLastAssigned", safe.lastAssignedEmail || "");
  localStorage.setItem(
    RR.keys.legacySingle,
    JSON.stringify({
      index: safe.enIndex,
      lastAssignedEmail: safe.lastAssignedEmail,
      lastAssignedAt: safe.lastAssignedAt
    })
  );
}

function rrGetNextAssignment(lang = "en") {
  const state = rrReadState();
  const nLang = rrNormalizeLang(lang);
  const pool = rrGetPool(nLang);
  if (!pool.length) return null;

  const idxKey = nLang === "es" ? "esIndex" : "enIndex";
  const currentRaw = state[idxKey];
  const current = Number.isInteger(currentRaw) && currentRaw >= 0 ? currentRaw : 0;

  const assignedIndex = current % pool.length;
  const email = pool[assignedIndex];
  const next = (assignedIndex + 1) % pool.length;

  state[idxKey] = next;
  state.lastAssignedEmail = email;
  state.lastAssignedLang = nLang;
  state.lastAssignedAt = new Date().toISOString();
  rrWriteState(state);

  return { email, lang: nLang, assignedIndex, nextIndex: next };
}

function rrPreviewNext(lang = "en") {
  const state = rrReadState();
  const nLang = rrNormalizeLang(lang);
  const pool = rrGetPool(nLang);
  if (!pool.length) return "—";

  const idx = (nLang === "es" ? state.esIndex : state.enIndex) % pool.length;
  return pool[idx];
}

function rrReset(enIndex = 0, esIndex = 0) {
  const enPool = rrGetPool("en");
  const esPool = rrGetPool("es");

  const safeEn = Number.isInteger(enIndex) && enIndex >= 0 ? enIndex % enPool.length : 0;
  const safeEs = Number.isInteger(esIndex) && esIndex >= 0 ? esIndex % esPool.length : 0;

  rrWriteState({
    enIndex: safeEn,
    esIndex: safeEs,
    lastAssignedEmail: "",
    lastAssignedLang: "en",
    lastAssignedAt: ""
  });

  return { enIndex: safeEn, esIndex: safeEs };
}

function rrPushForLead(lead) {
  const lang = rrNormalizeLang(lead?.language || "en");
  const assignment = rrGetNextAssignment(lang);
  return assignment?.email || "";
}

/* Expose global helpers so AMS/wizard can use one system */
window.acesRoundRobin = {
  getPool: rrGetPool,
  getNextAssignment: rrGetNextAssignment,
  previewNext: rrPreviewNext,
  reset: rrReset,
  pushForLead: rrPushForLead
};

/* Backward-compatible wrappers */
function getRoundRobinList() {
  return rrGetPool("en");
}
function getRoundRobinState() {
  const s = rrReadState();
  return { index: s.enIndex, ...s };
}
function setRoundRobinState(state) {
  const s = rrReadState();
  rrWriteState({
    ...s,
    enIndex: Number.isInteger(state?.index) ? state.index : s.enIndex
  });
}
function getNextRoundRobinAssignment(lang = "en") {
  return rrGetNextAssignment(lang);
}
function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (!rrField) return;
  const assignment = rrGetNextAssignment("en");
  rrField.value = assignment?.email || "";
}
function resetRoundRobin(startIndex = 0) {
  rrReset(startIndex, startIndex);
}

/* ============================================================
   HEADER INJECTION — GITHUB PAGES SAFE
============================================================ */
function loadHeader() {
  const header = document.getElementById("aces-header");
  if (!header) return;

  const root = getRelativeRoot();

  header.innerHTML = `
    <div class="header-container">
      <div class="logo-area">
        <a href="${root}index.html" class="logo-link" aria-label="ACES Home">
          <img src="${root}Icons/image2.png" alt="ACES Insurance Logo" class="aces-logo">
        </a>
      </div>

      <nav class="nav-links">
        <a href="${root}index.html" data-en="Home" data-es="Inicio">Home</a>
        <a href="${root}services.html" data-en="Services" data-es="Servicios">Services</a>
        <a href="${root}applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
        <a href="${root}coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
        <a href="${root}claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
        <a href="${root}testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
        <a href="${root}contact.html" data-en="Contact" data-es="Contacto">Contact</a>
      </nav>

      <div class="header-controls">
        <button id="lang-toggle" class="lang-btn" type="button">EN / ES</button>
        ${FEATURES.agentLogin ? `
        <button id="agent-login-btn" class="agent-login-btn" type="button" data-en="Agent Login" data-es="Acceso de Agente">Agent Login</button>
        ` : ``}
        <button id="mobile-menu-btn" class="mobile-menu-btn" type="button">☰</button>
      </div>
    </div>

    <nav id="mobile-menu" class="mobile-menu">
      <a href="${root}index.html" data-en="Home" data-es="Inicio">Home</a>
      <a href="${root}services.html" data-en="Services" data-es="Servicios">Services</a>
      <a href="${root}applications.html" data-en="Applications" data-es="Solicitudes">Applications</a>
      <a href="${root}coi.html" data-en="COI Request" data-es="Solicitud de COI">COI Request</a>
      <a href="${root}claims.html" data-en="Claims" data-es="Reclamos">Claims</a>
      <a href="${root}testimonials.html" data-en="Testimonials" data-es="Testimonios">Testimonials</a>
      <a href="${root}contact.html" data-en="Contact" data-es="Contacto">Contact</a>
    </nav>

    ${FEATURES.agentLogin ? `
    <aside id="loginPanel" class="login-panel" aria-hidden="true">
      <button id="loginCloseBtn" class="close-panel" type="button" aria-label="Close">×</button>
      <h2 data-en="Agent Login" data-es="Acceso de Agente">Agent Login</h2>
      <label for="loginAgentSelect" data-en="Agent" data-es="Agente">Agent</label>
      <select id="loginAgentSelect" class="login-agent-select" required>
        <option value="" disabled selected data-en="Select your name" data-es="Seleccione su nombre">Select your name</option>
      </select>
      <label for="loginPassword" data-en="Password" data-es="Contraseña">Password</label>
      <input type="password" id="loginPassword" placeholder="Password" autocomplete="current-password" />
      <button id="loginSubmitBtn" class="login-submit-btn" type="button" data-en="Login" data-es="Iniciar Sesión">Login</button>
    </aside>
    ` : ``}
  `;
}

/* (rest of your existing global.js functions stay the same) */
