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
