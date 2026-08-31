(() => {
  "use strict";

  if (window.__AMS_LEADS_BOOTSTRAPPED__) return;
  window.__AMS_LEADS_BOOTSTRAPPED__ = true;

  // =========================
  // CONFIG (EMAIL ROUND ROBIN)
  // =========================
  // Update these to your real team distribution emails.
  const EMAIL_POOLS = {
    en: [
      "en1@acesinsure.com",
      "en2@acesinsure.com",
      "en3@acesinsure.com"
    ],
    es: [
      "es1@acesinsure.com",
      "es2@acesinsure.com"
    ]
  };

  const STATUS_VALUES = [
    "new",
    "contacted",
    "quoted",
    "application_started",
    "submitted",
    "bound",
    "lost"
  ];

  const STORAGE_KEYS = {
    leads: "acesLeads",
    clients: "acesClients",
    rrIndexEn: "acesRoundRobinIndexEn",
    rrIndexEs: "acesRoundRobinIndexEs"
  };

  let leads = [];
  let filtered = [];

  const els = {
    rows: null,
    search: null,
    filterStage: null,
    filterAgent: null,
    filterBind: null,
    rrLastAssigned: null,
    rrNextUp: null,
    rrQueue: null,
    leadEditorModal: null
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheEls();
    if (!isReady()) return;

    bindEvents();
    loadFromStorageOrSeed();
    migrateAndNormalizeLeads();
    populateAssignedFilter();
    applyFilters();
    renderRoundRobinStatus();
    wireGlobalButtons();
  }

  function cacheEls() {
    els.rows = document.getElementById("leadsRows");
    els.search = document.getElementById("leadSearch");
    els.filterStage = document.getElementById("filterStage");
    els.filterAgent = document.getElementById("filterAgent");
    els.filterBind = document.getElementById("filterBind");
    els.rrLastAssigned = document.getElementById("rrLastAssigned");
    els.rrNextUp = document.getElementById("rrNextUp");
    els.rrQueue = document.getElementById("rrQueue");
    els.leadEditorModal = document.getElementById("leadEditorModal");
  }

  function isReady() {
    return !!(
      els.rows &&
      els.search &&
      els.filterStage &&
      els.filterAgent &&
      els.filterBind
    );
  }

  function bindEvents() {
    els.search.addEventListener("input", applyFilters);
    els.filterStage.addEventListener("change", applyFilters);
    els.filterAgent.addEventListener("change", applyFilters);
    els.filterBind.addEventListener("change", applyFilters);

    // Table delegated events
    els.rows.addEventListener("change", (e) => {
      const t = e.target;
      const id = t.getAttribute("data-id");
      if (!id) return;
      const lead = leads.find((l) => l.id === id);
      if (!lead) return;

      if (t.matches(".status-select")) {
        lead.status = t.value;
        handleStatusTransitions(lead, false);
      }

      if (t.matches(".assigned-select")) {
        lead.assignedEmail = t.value;
      }

      if (t.matches(".language-select")) {
        lead.language = normalizeLanguage(t.value);
      }

      lead.updatedAt = new Date().toISOString();
      saveToStorage();
      populateAssignedFilter();
      applyFilters();
      renderRoundRobinStatus();
    });

    els.rows.addEventListener("click", (e) => {
      const pushBtn = e.target.closest("[data-push-next]");
      if (pushBtn) {
        const leadId = pushBtn.getAttribute("data-push-next");
        pushToNextEmail(leadId);
        return;
      }

      const emailBtn = e.target.closest("[data-email-owner]");
      if (emailBtn) {
        const leadId = emailBtn.getAttribute("data-email-owner");
        emailLeadOwner(leadId);
        return;
      }

      const tr = e.target.closest("tr[data-id]");
      if (!tr) return;
      if (e.target.closest("button,select,a,input,textarea,label")) return;
      openLeadEditor(tr.getAttribute("data-id"));
    });

    // Modal buttons
    document.addEventListener("click", (e) => {
      const btnSave = e.target.closest("[data-save-lead]");
      if (btnSave) saveLead();

      const btnClose = e.target.closest("[data-close-lead]");
      if (btnClose) closeLeadEditor();

      const btnBind = e.target.closest("[data-bind-client]");
      if (btnBind) {
        const id = btnBind.getAttribute("data-bind-client");
        bindLeadToClient(id);
      }

      const btnPush = e.target.closest("[data-modal-push-next]");
      if (btnPush) {
        const id = btnPush.getAttribute("data-modal-push-next");
        pushToNextEmail(id);
        openLeadEditor(id);
      }

      const btnEmail = e.target.closest("[data-modal-email-owner]");
      if (btnEmail) {
        const id = btnEmail.getAttribute("data-modal-email-owner");
        emailLeadOwner(id);
      }
    });
  }

  function wireGlobalButtons() {
    // These are referenced by inline onclick in your HTML.
    window.openLeadEditor = openLeadEditor;
    window.closeLeadEditor = closeLeadEditor;
    window.saveLead = saveLead;
    window.runRoundRobinAssign = runRoundRobinAssign;
  }

  // =========================
  // DATA
  // =========================
  function loadFromStorageOrSeed() {
    const saved = localStorage.getItem(STORAGE_KEYS.leads);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          leads = parsed;
          return;
        }
      } catch (_) {}
    }

    const now = new Date().toISOString();
    leads = [
      {
        id: uid(),
        leadNumber: "LD-1001",
        firstName: "Maria",
        lastName: "Lopez",
        name: "Maria Lopez",
        phone: "254-555-0192",
        email: "maria@example.com",
        language: "es",
        assignedEmail: nextRoundRobinEmail("es"),
        status: "new",
        notes: "",
        lineOfBusiness: "Auto",
        quotedPremium: "",
        carrier: "",
        effectiveDate: "",
        policyNumber: "",
        appStartedAt: "",
        submittedAt: "",
        boundAt: "",
        clientId: "",
        clientName: "",
        receivedAt: now,
        updatedAt: now
      },
      {
        id: uid(),
        leadNumber: "LD-1002",
        firstName: "John",
        lastName: "Carter",
        name: "John Carter",
        phone: "254-555-4421",
        email: "john@example.com",
        language: "en",
        assignedEmail: nextRoundRobinEmail("en"),
        status: "application_started",
        notes: "Requested GL + Auto quote.",
        lineOfBusiness: "Commercial",
        quotedPremium: "2250.00",
        carrier: "Travelers",
        effectiveDate: "",
        policyNumber: "",
        appStartedAt: now,
        submittedAt: "",
        boundAt: "",
        clientId: "",
        clientName: "",
        receivedAt: now,
        updatedAt: now
      }
    ];

    saveToStorage();
  }

  function migrateAndNormalizeLeads() {
    let changed = false;
    const now = new Date().toISOString();

    leads.forEach((lead, i) => {
      if (!lead.id) {
        lead.id = uid();
        changed = true;
      }
      if (!lead.leadNumber) {
        lead.leadNumber = `LD-${1001 + i}`;
        changed = true;
      }
      if (!lead.receivedAt) {
        lead.receivedAt = lead.updatedAt || now;
        changed = true;
      }
      if (!lead.updatedAt) {
        lead.updatedAt = lead.receivedAt || now;
        changed = true;
      }

      // Name normalization
      if (!lead.firstName && lead.name) {
        const parts = String(lead.name).trim().split(/\s+/);
        lead.firstName = parts.shift() || "";
        lead.lastName = parts.join(" ");
        changed = true;
      }
      if (!lead.name) {
        lead.name = [lead.firstName || "", lead.lastName || ""].join(" ").trim();
        changed = true;
      }

      // Old `assigned` -> new `assignedEmail`
      if (!lead.assignedEmail) {
        if (lead.assigned && String(lead.assigned).includes("@")) {
          lead.assignedEmail = lead.assigned;
        } else {
          lead.assignedEmail = "";
        }
        changed = true;
      }

      if (!lead.language) {
        lead.language = inferLanguage(lead) || "en";
        changed = true;
      } else {
        const normalized = normalizeLanguage(lead.language);
        if (normalized !== lead.language) {
          lead.language = normalized;
          changed = true;
        }
      }

      if (!STATUS_VALUES.includes(lead.status)) {
        lead.status = "new";
        changed = true;
      }

      const defaults = {
        lineOfBusiness: "Other",
        quotedPremium: "",
        carrier: "",
        effectiveDate: "",
        policyNumber: "",
        appStartedAt: "",
        submittedAt: "",
        boundAt: "",
        clientId: "",
        clientName: "",
        notes: ""
      };

      for (const [k, v] of Object.entries(defaults)) {
        if (typeof lead[k] === "undefined") {
          lead[k] = v;
          changed = true;
        }
      }

      handleStatusTransitions(lead, false);
    });

    if (changed) saveToStorage();
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
  }

  // =========================
  // ROUND ROBIN (LANG AWARE)
  // =========================
  function normalizeLanguage(value) {
    const v = String(value || "").trim().toLowerCase();
    if (v === "es" || v === "spanish") return "es";
    return "en";
  }

  function inferLanguage(lead) {
    const text = `${lead.name || ""} ${lead.notes || ""}`.toLowerCase();
    const spanishSignals = ["garcia", "rodriguez", "martinez", "español", "spanish"];
    if (spanishSignals.some((s) => text.includes(s))) return "es";
    return "en";
  }

  function getPool(lang) {
    return normalizeLanguage(lang) === "es" ? EMAIL_POOLS.es : EMAIL_POOLS.en;
  }

  function getIndexKey(lang) {
    return normalizeLanguage(lang) === "es"
      ? STORAGE_KEYS.rrIndexEs
      : STORAGE_KEYS.rrIndexEn;
  }

  function nextRoundRobinEmail(language) {
    const lang = normalizeLanguage(language);
    const pool = getPool(lang);
    if (!pool.length) return "";

    const key = getIndexKey(lang);
    const raw = Number(localStorage.getItem(key) || 0);
    const idx = Number.isFinite(raw) ? raw : 0;

    const selected = pool[idx % pool.length];
    localStorage.setItem(key, String((idx + 1) % pool.length));
    localStorage.setItem("acesRrLastAssigned", selected);
    return selected;
  }

  function pushToNextEmail(leadId) {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    lead.assignedEmail = nextRoundRobinEmail(lead.language);
    lead.updatedAt = new Date().toISOString();
    saveToStorage();
    populateAssignedFilter();
    applyFilters();
    renderRoundRobinStatus();
  }

  function runRoundRobinAssign() {
    let count = 0;
    const now = new Date().toISOString();

    leads.forEach((lead) => {
      const shouldAssign =
        !lead.assignedEmail || lead.status === "new" || lead.status === "contacted";
      if (!shouldAssign) return;

      lead.assignedEmail = nextRoundRobinEmail(lead.language);
      lead.updatedAt = now;
      count++;
    });

    saveToStorage();
    populateAssignedFilter();
    applyFilters();
    renderRoundRobinStatus();

    alert(`Round Robin complete: ${count} lead(s) assigned/rotated.`);
  }

  // =========================
  // UI RENDER
  // =========================
  function populateAssignedFilter() {
    const existing = new Set(
      leads
        .map((l) => l.assignedEmail)
        .filter(Boolean)
        .concat(EMAIL_POOLS.en)
        .concat(EMAIL_POOLS.es)
    );

    const current = els.filterAgent.value || "";
    els.filterAgent.innerHTML = `<option value="">All</option>`;

    [...existing].sort().forEach((email) => {
      const opt = document.createElement("option");
      opt.value = email;
      opt.textContent = email;
      els.filterAgent.appendChild(opt);
    });

    if ([...els.filterAgent.options].some((o) => o.value === current)) {
      els.filterAgent.value = current;
    }
  }

  function applyFilters() {
    const q = (els.search.value || "").trim().toLowerCase();
    const stage = (els.filterStage.value || "").trim().toLowerCase();
    const assigned = (els.filterAgent.value || "").trim().toLowerCase();
    const bind = (els.filterBind.value || "").trim().toLowerCase();

    filtered = leads.filter((l) => {
      const hay = [
        l.leadNumber,
        l.name,
        l.firstName,
        l.lastName,
        l.phone,
        l.email,
        l.assignedEmail,
        l.status,
        l.notes,
        l.lineOfBusiness,
        l.policyNumber,
        l.clientName,
        l.language
      ]
        .join(" ")
        .toLowerCase();

      const matchesQ = !q || hay.includes(q);
      const matchesStage = !stage || l.status === stage;
      const matchesAssigned = !assigned || (l.assignedEmail || "").toLowerCase() === assigned;

      let matchesBind = true;
      if (bind === "bound") matchesBind = l.status === "bound";
      if (bind === "not-bound") matchesBind = l.status !== "bound";

      return matchesQ && matchesStage && matchesAssigned && matchesBind;
    });

    renderRows();
  }

  function renderRows() {
    els.rows.innerHTML = "";

    filtered
      .slice()
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .forEach((lead) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", lead.id);
        tr.style.cursor = "pointer";
        tr.title = "Click to edit lead";

        tr.innerHTML = `
          <td>${escapeHtml(lead.leadNumber || "—")}</td>
          <td>${escapeHtml(lead.name || "—")}</td>
          <td>
            <div>${escapeHtml(lead.phone || "—")}</div>
            <div><small>${escapeHtml(lead.email || "—")}</small></div>
            <div><small>Lang: ${escapeHtml((lead.language || "en").toUpperCase())}</small></div>
          </td>
          <td>${escapeHtml(lead.lineOfBusiness || "—")}</td>
          <td>
            <select class="assigned-select" data-id="${lead.id}">
              ${assignedEmailOptions(lead.assignedEmail)}
            </select>
          </td>
          <td>
            <select class="status-select" data-id="${lead.id}">
              ${statusOptions(lead.status)}
            </select>
          </td>
          <td>${lead.quotedPremium ? "$" + Number(lead.quotedPremium).toFixed(2) : "—"}</td>
          <td>${escapeHtml(lead.effectiveDate || "—")}</td>
          <td>${escapeHtml(lead.policyNumber || "—")}</td>
          <td>
            ${
              lead.clientId
                ? `<a href="../clients/clients.html?clientId=${encodeURIComponent(
                    lead.clientId
                  )}">${escapeHtml(lead.clientName || "View Client")}</a>`
                : "—"
            }
          </td>
          <td style="display:flex;gap:.35rem;flex-wrap:wrap;">
            <button type="button" class="btn-red small" data-push-next="${lead.id}">Push Next</button>
            <button type="button" class="btn-red small" data-email-owner="${lead.id}">Email</button>
          </td>
        `;
        els.rows.appendChild(tr);
      });
  }

  function renderRoundRobinStatus() {
    const enPool = EMAIL_POOLS.en.join(" → ") || "—";
    const esPool = EMAIL_POOLS.es.join(" → ") || "—";

    const enNext = previewNext("en");
    const esNext = previewNext("es");
    const last = localStorage.getItem("acesRrLastAssigned") || "—";

    if (els.rrLastAssigned) els.rrLastAssigned.textContent = last;
    if (els.rrNextUp) els.rrNextUp.textContent = `EN: ${enNext} | ES: ${esNext}`;
    if (els.rrQueue) els.rrQueue.textContent = `EN [${enPool}] | ES [${esPool}]`;
  }

  function previewNext(lang) {
    const pool = getPool(lang);
    if (!pool.length) return "—";
    const key = getIndexKey(lang);
    const idx = Number(localStorage.getItem(key) || 0);
    return pool[(Number.isFinite(idx) ? idx : 0) % pool.length];
  }

  // =========================
  // EDITOR MODAL
  // =========================
  function openLeadEditor(leadId = "") {
    const modal = els.leadEditorModal;
    if (!modal) return;

    const lead = leadId ? leads.find((l) => l.id === leadId) : null;

    setVal("leadId", lead?.id || "");
    setVal("leadFirstName", lead?.firstName || "");
    setVal("leadLastName", lead?.lastName || "");
    setVal("leadEmail", lead?.email || "");
    setVal("leadPhone", lead?.phone || "");
    setVal("leadLine", lead?.lineOfBusiness || "Auto");
    setVal("leadStage", lead?.status ? labelStatus(lead.status) : "New");
    setVal("leadQuotedPremium", lead?.quotedPremium || "");
    setVal("leadCarrier", lead?.carrier || "");
    setVal("leadEffectiveDate", lead?.effectiveDate || "");
    setVal("leadPolicyNumber", lead?.policyNumber || "");
    setVal("leadAppStartedDate", lead?.appStartedAt ? isoDateOnly(lead.appStartedAt) : "");
    setVal("leadSubmittedDate", lead?.submittedAt ? isoDateOnly(lead.submittedAt) : "");
    setVal("leadNotes", lead?.notes || "");

    populateAssignedEmailSelect(lead?.assignedEmail || "");
    ensureLanguageField(lead?.language || "en");

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "open");
    }
  }

  function closeLeadEditor() {
    const modal = els.leadEditorModal;
    if (!modal) return;
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  }

  function saveLead() {
    const id = getVal("leadId");
    const firstName = getVal("leadFirstName").trim();
    const lastName = getVal("leadLastName").trim();
    const email = getVal("leadEmail").trim();
    const phone = getVal("leadPhone").trim();
    const lineOfBusiness = getVal("leadLine").trim() || "Other";
    const stageLabel = getVal("leadStage").trim() || "New";
    const status = statusFromLabel(stageLabel);
    const quotedPremium = getVal("leadQuotedPremium").trim();
    const carrier = getVal("leadCarrier").trim();
    const effectiveDate = getVal("leadEffectiveDate").trim();
    const policyNumber = getVal("leadPolicyNumber").trim();
    const appStartedDate = getVal("leadAppStartedDate").trim();
    const submittedDate = getVal("leadSubmittedDate").trim();
    const notes = getVal("leadNotes").trim();
    const assignedEmail = getVal("leadAssignedAgent").trim();
    const language = normalizeLanguage(getVal("leadLanguage"));

    if (!firstName || !lastName) {
      alert("First Name and Last Name are required.");
      return;
    }

    const now = new Date().toISOString();

    if (!id) {
      const lead = {
        id: uid(),
        leadNumber: nextLeadNumber(),
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        language,
        assignedEmail: assignedEmail || nextRoundRobinEmail(language),
        status,
        notes,
        lineOfBusiness,
        quotedPremium,
        carrier,
        effectiveDate,
        policyNumber,
        appStartedAt: appStartedDate ? new Date(appStartedDate).toISOString() : "",
        submittedAt: submittedDate ? new Date(submittedDate).toISOString() : "",
        boundAt: "",
        clientId: "",
        clientName: "",
        receivedAt: now,
        updatedAt: now
      };

      handleStatusTransitions(lead, false);
      leads.unshift(lead);
    } else {
      const lead = leads.find((l) => l.id === id);
      if (!lead) return;

      lead.firstName = firstName;
      lead.lastName = lastName;
      lead.name = `${firstName} ${lastName}`.trim();
      lead.email = email;
      lead.phone = phone;
      lead.language = language;
      lead.assignedEmail = assignedEmail || lead.assignedEmail || nextRoundRobinEmail(language);
      lead.status = status;
      lead.notes = notes;
      lead.lineOfBusiness = lineOfBusiness;
      lead.quotedPremium = quotedPremium;
      lead.carrier = carrier;
      lead.effectiveDate = effectiveDate;
      lead.policyNumber = policyNumber;
      lead.appStartedAt = appStartedDate ? new Date(appStartedDate).toISOString() : lead.appStartedAt;
      lead.submittedAt = submittedDate ? new Date(submittedDate).toISOString() : lead.submittedAt;
      handleStatusTransitions(lead, false);
      lead.updatedAt = now;
    }

    saveToStorage();
    populateAssignedFilter();
    applyFilters();
    renderRoundRobinStatus();
    closeLeadEditor();
  }

  function ensureLanguageField(selected = "en") {
    let field = document.getElementById("leadLanguage");
    if (field) {
      field.value = normalizeLanguage(selected);
      return;
    }

    const assignedWrap = document.getElementById("leadAssignedAgent")?.closest("div");
    if (!assignedWrap || !assignedWrap.parentElement) return;

    const holder = document.createElement("div");
    holder.innerHTML = `
      <label for="leadLanguage">Language</label>
      <select id="leadLanguage">
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    `;
    assignedWrap.parentElement.insertBefore(holder, assignedWrap.nextSibling);

    field = document.getElementById("leadLanguage");
    if (field) field.value = normalizeLanguage(selected);
  }

  function populateAssignedEmailSelect(selected = "") {
    const select = document.getElementById("leadAssignedAgent");
    if (!select) return;

    const all = [...new Set([...EMAIL_POOLS.en, ...EMAIL_POOLS.es, ...leads.map((l) => l.assignedEmail).filter(Boolean)])];
    select.innerHTML = `<option value="">Auto-assign (Round Robin)</option>`;

    all.sort().forEach((email) => {
      const opt = document.createElement("option");
      opt.value = email;
      opt.textContent = email;
      if (email === selected) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // =========================
  // EMAIL ACTION
  // =========================
  function emailLeadOwner(leadId) {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    if (!lead.assignedEmail) {
      alert("No assigned email on this lead. Run round robin first.");
      return;
    }

    const subject = encodeURIComponent(`Lead Follow-up: ${lead.leadNumber} - ${lead.name}`);
    const body = encodeURIComponent(
      [
        `Lead ID: ${lead.leadNumber}`,
        `Name: ${lead.name}`,
        `Language: ${(lead.language || "en").toUpperCase()}`,
        `Phone: ${lead.phone || "N/A"}`,
        `Email: ${lead.email || "N/A"}`,
        `Line: ${lead.lineOfBusiness || "N/A"}`,
        `Stage: ${labelStatus(lead.status)}`,
        `Notes: ${lead.notes || "N/A"}`
      ].join("\n")
    );

    const mailto = `mailto:${encodeURIComponent(lead.assignedEmail)}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  }

  // =========================
  // BIND CLIENT
  // =========================
  function bindLeadToClient(leadId) {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    if (!lead.policyNumber || !lead.effectiveDate) {
      alert("Policy Number and Effective Date are required before binding.");
      return;
    }

    lead.status = "bound";
    handleStatusTransitions(lead, false);

    const clients = getClients();
    const existing = clients.find(
      (c) => c.linkedLeadId === lead.id || (lead.email && c.email === lead.email)
    );

    if (existing) {
      lead.clientId = existing.id;
      lead.clientName = existing.name;
      lead.updatedAt = new Date().toISOString();
      saveToStorage();
      saveClients(clients);
      alert(`Lead bound and linked to existing client: ${existing.name}`);
      applyFilters();
      closeLeadEditor();
      return;
    }

    const newClient = {
      id: `CL-${Date.now()}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: "Active",
      linkedLeadId: lead.id,
      policyNumber: lead.policyNumber,
      carrier: lead.carrier || "",
      effectiveDate: lead.effectiveDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: lead.notes || ""
    };

    clients.push(newClient);
    saveClients(clients);

    lead.clientId = newClient.id;
    lead.clientName = newClient.name;
    lead.updatedAt = new Date().toISOString();
    saveToStorage();

    alert(`Lead bound and created client: ${newClient.name}`);
    applyFilters();
    closeLeadEditor();
  }

  function getClients() {
    const raw = localStorage.getItem(STORAGE_KEYS.clients);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveClients(clients) {
    localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients));
  }

  // =========================
  // HELPERS
  // =========================
  function assignedEmailOptions(selected) {
    const all = [...new Set([...EMAIL_POOLS.en, ...EMAIL_POOLS.es, ...leads.map((l) => l.assignedEmail).filter(Boolean)])];
    return all
      .sort()
      .map(
        (email) =>
          `<option value="${escapeHtml(email)}" ${
            email === selected ? "selected" : ""
          }>${escapeHtml(email)}</option>`
      )
      .join("");
  }

  function statusOptions(selected) {
    return STATUS_VALUES.map(
      (s) => `<option value="${s}" ${s === selected ? "selected" : ""}>${labelStatus(s)}</option>`
    ).join("");
  }

  function labelStatus(s) {
    const map = {
      new: "New",
      contacted: "Contacted",
      quoted: "Quoted",
      application_started: "Application Started",
      submitted: "Submitted",
      bound: "Bound",
      lost: "Lost"
    };
    return map[s] || s;
  }

  function statusFromLabel(label) {
    const normalized = String(label || "").trim().toLowerCase();
    const map = {
      new: "new",
      contacted: "contacted",
      quoted: "quoted",
      "application started": "application_started",
      submitted: "submitted",
      bound: "bound",
      lost: "lost"
    };
    return map[normalized] || "new";
  }

  function handleStatusTransitions(lead, persist = true) {
    const now = new Date().toISOString();
    if (lead.status === "application_started" && !lead.appStartedAt) lead.appStartedAt = now;
    if (lead.status === "submitted" && !lead.submittedAt) lead.submittedAt = now;
    if (lead.status === "bound" && !lead.boundAt) lead.boundAt = now;
    if (persist) saveToStorage();
  }

  function nextLeadNumber() {
    const nums = leads
      .map((l) => String(l.leadNumber || ""))
      .map((n) => Number(n.replace("LD-", "")))
      .filter((n) => Number.isFinite(n));
    const max = nums.length ? Math.max(...nums) : 1000;
    return `LD-${max + 1}`;
  }

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value ?? "";
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? String(el.value ?? "") : "";
  }

  function isoDateOnly(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
