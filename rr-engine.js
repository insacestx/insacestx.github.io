/* ============================================================
   ACES ROUND ROBIN ENGINE (SINGLE SOURCE OF TRUTH)
   Only call getNextAssignment() at the moment of a real form
   submission, never on page load.
============================================================ */
(function () {
  const POOLS = {
    en: [
      "bryan@insaces.com",
      "jordan@insaces.com",
      "lanse@insaces.com",
      "robert@insaces.com",
      "george@insaces.com",
      "jimmy@insaces.com",
      "office@insaces.com"
    ],
    es: ["george@insaces.com", "jimmy@insaces.com"]
  };

  const STATE_KEY = "aces_rr_state_v2";

  function normalizeLang(lang) {
    const v = String(lang || "").trim().toLowerCase();
    return v === "es" || v === "spanish" ? "es" : "en";
  }

  function getPool(lang) {
    return POOLS[normalizeLang(lang)];
  }

  function safeIndex(n) {
    return Number.isInteger(n) && n >= 0 ? n : 0;
  }

  function readState() {
    try {
      const s = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
      return {
        enIndex: safeIndex(s.enIndex),
        esIndex: safeIndex(s.esIndex),
        lastAssignedEmail: s.lastAssignedEmail || "",
        lastAssignedLang: normalizeLang(s.lastAssignedLang),
        lastAssignedAt: s.lastAssignedAt || ""
      };
    } catch (_) {
      return { enIndex: 0, esIndex: 0, lastAssignedEmail: "", lastAssignedLang: "en", lastAssignedAt: "" };
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function getNextAssignment(lang) {
    const n = normalizeLang(lang);
    const pool = getPool(n);
    if (!pool.length) return null;

    const state = readState();
    const key = n === "es" ? "esIndex" : "enIndex";
    const assignedIndex = state[key] % pool.length;
    const email = pool[assignedIndex];
    const nextIndex = (assignedIndex + 1) % pool.length;

    state[key] = nextIndex;
    state.lastAssignedEmail = email;
    state.lastAssignedLang = n;
    state.lastAssignedAt = new Date().toISOString();
    writeState(state);

    return { email, lang: n, assignedIndex, nextIndex };
  }

  function previewNext(lang) {
    const n = normalizeLang(lang);
    const pool = getPool(n);
    if (!pool.length) return "";
    const state = readState();
    return pool[state[n === "es" ? "esIndex" : "enIndex"] % pool.length];
  }

  function reset(enIndex, esIndex) {
    const state = readState();
    state.enIndex = safeIndex(enIndex) % POOLS.en.length;
    state.esIndex = safeIndex(esIndex) % POOLS.es.length;
    state.lastAssignedEmail = "";
    state.lastAssignedAt = "";
    writeState(state);
    return { enIndex: state.enIndex, esIndex: state.esIndex };
  }

  function getLastAssigned() {
    return readState().lastAssignedEmail;
  }

  window.acesRoundRobin = { getNextAssignment, previewNext, reset, getPool, getLastAssigned };
})();
