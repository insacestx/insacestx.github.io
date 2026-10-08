/* ============================================================
   ACES 2026 — roundrobin.js
   Single source of truth for lead routing
============================================================ */
(function () {
  "use strict";

  const OFFICE_EMAIL = "office@insaces.com";

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
      // Spanish-speaking routing pool
      es: ["george@insaces.com", "jimmy@insaces.com"]
    },
    keys: {
      state: "aces_rr_v1_state"
    }
  };

  function normalizeLang(lang) {
    const v = String(lang || "").trim().toLowerCase();
    return v === "es" || v === "spanish" ? "es" : "en";
  }

  function getPool(lang = "en") {
    return normalizeLang(lang) === "es" ? RR.pools.es.slice() : RR.pools.en.slice();
  }

  function defaultState() {
    return {
      enIndex: 0,
      esIndex: 0,
      lastAssignedEmail: "",
      lastAssignedLang: "en",
      lastAssignedAt: "",
      lastAction: "" // assigned | skipped | reset | setState
    };
  }

  function sanitizeIndex(n, poolLength) {
    if (!Number.isInteger(n) || n < 0) return 0;
    if (!poolLength) return 0;
    return n % poolLength;
  }

  function sanitizeState(input) {
    const base = defaultState();

    const enLen = RR.pools.en.length || 1;
    const esLen = RR.pools.es.length || 1;

    const next = Object.assign({}, base, input || {});
    next.enIndex = sanitizeIndex(Number(next.enIndex), enLen);
    next.esIndex = sanitizeIndex(Number(next.esIndex), esLen);
    next.lastAssignedEmail = String(next.lastAssignedEmail || "").trim().toLowerCase();
    next.lastAssignedLang = normalizeLang(next.lastAssignedLang || "en");
    next.lastAssignedAt = String(next.lastAssignedAt || "");
    next.lastAction = String(next.lastAction || "");

    return next;
  }

  function readState() {
    try {
      const raw = localStorage.getItem(RR.keys.state);
      if (!raw) return defaultState();
      return sanitizeState(JSON.parse(raw));
    } catch (err) {
      console.warn("roundrobin.js: failed to read state, using default.", err);
      return defaultState();
    }
  }

  function writeState(state) {
    const safe = sanitizeState(state);
    localStorage.setItem(RR.keys.state, JSON.stringify(safe));
    return safe;
  }

  function getState() {
    return readState();
  }

  function setState(nextState) {
    const merged = Object.assign({}, readState(), nextState || {});
    merged.lastAction = "setState";
    return writeState(merged);
  }

  function previewNext(lang = "en") {
    const nLang = normalizeLang(lang);
    const state = readState();
    const pool = getPool(nLang);
    if (!pool.length) return "—";

    const idx = nLang === "es" ? state.esIndex : state.enIndex;
    return pool[idx % pool.length];
  }

  function getNextAssignment(lang = "en") {
    const nLang = normalizeLang(lang);
    const state = readState();
    const pool = getPool(nLang);

    if (!pool.length) {
      return {
        email: OFFICE_EMAIL,
        lang: nLang,
        assignedIndex: -1,
        nextIndex: -1
      };
    }

    const idxKey = nLang === "es" ? "esIndex" : "enIndex";
    const current = sanitizeIndex(state[idxKey], pool.length);

    const assignedIndex = current;
    const email = String(pool[assignedIndex] || OFFICE_EMAIL).toLowerCase();
    const nextIndex = (assignedIndex + 1) % pool.length;

    state[idxKey] = nextIndex;
    state.lastAssignedEmail = email;
    state.lastAssignedLang = nLang;
    state.lastAssignedAt = new Date().toISOString();
    state.lastAction = "assigned";
    writeState(state);

    return { email, lang: nLang, assignedIndex, nextIndex };
  }

  function skipNext(lang = "en") {
    const nLang = normalizeLang(lang);
    const state = readState();
    const pool = getPool(nLang);

    if (!pool.length) {
      return {
        skippedEmail: OFFICE_EMAIL,
        lang: nLang,
        skippedIndex: -1,
        nextIndex: -1,
        nextEmail: OFFICE_EMAIL
      };
    }

    const idxKey = nLang === "es" ? "esIndex" : "enIndex";
    const current = sanitizeIndex(state[idxKey], pool.length);

    const skippedIndex = current;
    const skippedEmail = String(pool[skippedIndex] || OFFICE_EMAIL).toLowerCase();
    const nextIndex = (skippedIndex + 1) % pool.length;

    state[idxKey] = nextIndex;
    state.lastAssignedEmail = skippedEmail;
    state.lastAssignedLang = nLang;
    state.lastAssignedAt = new Date().toISOString();
    state.lastAction = "skipped";
    writeState(state);

    return {
      skippedEmail,
      lang: nLang,
      skippedIndex,
      nextIndex,
      nextEmail: pool[nextIndex] || OFFICE_EMAIL
    };
  }

  function reset(enIndex = 0, esIndex = 0) {
    const enLen = RR.pools.en.length || 1;
    const esLen = RR.pools.es.length || 1;

    const state = defaultState();
    state.enIndex = sanitizeIndex(Number(enIndex), enLen);
    state.esIndex = sanitizeIndex(Number(esIndex), esLen);
    state.lastAssignedEmail = "";
    state.lastAssignedLang = "en";
    state.lastAssignedAt = "";
    state.lastAction = "reset";

    writeState(state);
    return { enIndex: state.enIndex, esIndex: state.esIndex };
  }

  function pushForLead(lead) {
    const lang = normalizeLang(lead?.language || "en");
    const assignment = getNextAssignment(lang);
    return assignment?.email || OFFICE_EMAIL;
  }

  // Public API
  window.acesRoundRobin = {
    officeEmail: OFFICE_EMAIL,
    getPool,
    getState,
    setState,         // optional admin/compat helper
    previewNext,
    getNextAssignment,
    skipNext,
    reset,
    pushForLead
  };
})();
