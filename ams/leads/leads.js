(() => {
  "use strict";

  if (window.__AMS_LEADS_BOOTSTRAPPED__) return;
  window.__AMS_LEADS_BOOTSTRAPPED__ = true;

  const AGENTS = [
    "George Santibañez",
    "Bryan",
    "Jordan Jones",
    "Lanse Derrick",
    "Robert",
    "Jimmy Rodriguez",
    "Renee Ridling"
  ];

  // Expanded lifecycle for testing application flow
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
    rrIndex: "acesRoundRobinIndex"
  };

  let leads = [];
  let filtered = [];
  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheEls();
    if (!isReady()) return;

    bindEvents();
    loadFromStorageOrSeed();
    ensureLeadFields();
    populateAgentFilter();
    applyFilters();
    ensureLeadModal();
  }

  function isReady() {
    return !!(
      els.rows &&
      els.empty &&
      els.search &&
      els.statusFilter &&
      els.agentFilter &&
      els.addLeadBtn &&
      els.exportBtn
    );
  }

  function cacheEls() {
    els.rows = document.getElementById("leadRows");
    els.empty = document.getElementById("emptyState");
    els.search = document.getElementById("searchInput");
    els.statusFilter = document.getElementById("statusFilter");
    els.agentFilter = document.getElementById("agentFilter");
    els.addLeadBtn = document.getElementById("addLeadBtn");
    els.exportBtn = document.getElementById("exportBtn");
  }

  function bindEvents() {
    els.search.addEventListener("input", applyFilters);
    els.statusFilter.addEventListener("change", applyFilters);
    els.agentFilter.addEventListener("change", applyFilters);
    els.addLeadBtn.addEventListener("click", addLeadPrompt);
    els.exportBtn.addEventListener("click", exportJson);

    // Inline updates from row controls
    els.rows.addEventListener("change", (e) => {
      const target = e.target;
      const id = target.getAttribute("data-id");
      if (!id) return;

      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      if (target.matches(".agent-select")) lead.assigned = target.value;
      if (target.matches(".status-select")) {
        lead.status = target.value;
        handleStatusTransitions(lead);
      }
      if (target.matches(".notes-input")) lead.notes = target.value;

      lead.updatedAt = new Date().toISOString();
      saveToStorage();
      applyFilters();
    });

    els.rows.addEventListener("input", (e) => {
      const target = e.target;
      if (!target.matches(".notes-input")) return;
      const id = target.getAttribute("data-id");
      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      lead.notes = target.value;
      lead.updatedAt = new Date().toISOString();
      saveToStorage();
    });

    // Click row -> detail modal (except form controls)
    els.rows.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest("select, textarea, input, button, a, label")) return;

      const tr = target.closest("tr[data-id]");
      if (!tr) return;

      openLeadModal(tr.getAttribute("data-id"));
    });

    // Modal actions
    document.addEventListener("click", (e) => {
      const closeBtn = e.target.closest("[data-close-lead-modal]");
      if (closeBtn) {
        closeLeadModal();
        return;
      }

      const pushBtn = e.target.closest("[data-push-next]");
      if (pushBtn) {
        const leadId = pushBtn.getAttribute("data-push-next");
        pushToNextAgent(leadId);
        openLeadModal(leadId);
        return;
      }

      const bindBtn = e.target.closest("[data-bind-client]");
      if (bindBtn) {
        const leadId = bindBtn.getAttribute("data-bind-client");
        bindLeadToClient(leadId);
        openLeadModal(leadId);
        applyFilters();
      }

      const saveDetailBtn = e.target.closest("[data-save-lead-detail]");
      if (saveDetailBtn) {
        const leadId = saveDetailBtn.getAttribute("data-save-lead-detail");
        saveLeadDetailFromModal(leadId);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLeadModal();
    });
  }

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
        name: "Maria Lopez",
        phone: "254-555-0192",
        email: "maria@example.com",
        assigned: "George Santibañez",
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
        name: "John Carter",
        phone: "254-555-4421",
        email: "john@example.com",
        assigned: "Jordan Jones",
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
      },
      {
        id: uid(),
        leadNumber: "LD-1003",
        name: "Rosa Martinez",
        phone: "214-555-8821",
        email: "rosa@example.com",
        assigned: "Jimmy Rodriguez",
        status: "quoted",
        notes: "Waiting for bind confirmation.",
        lineOfBusiness: "Home",
        quotedPremium: "1385.50",
        carrier: "Safeco",
        effectiveDate: "",
        policyNumber: "",
        appStartedAt: "",
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

  function ensureLeadFields() {
    let changed = false;
    const now = new Date().toISOString();

    leads.forEach((lead, index) => {
      if (!lead.id) {
        lead.id = uid();
        changed = true;
      }
      if (!lead.leadNumber) {
        lead.leadNumber = `LD-${1001 + index}`;
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

      // New fields for application/bind flow
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
        clientName: ""
      };

      Object.keys(defaults).forEach((k) => {
        if (typeof lead[k] === "undefined") {
          lead[k] = defaults[k];
          changed = true;
        }
      });

      if (!STATUS_VALUES.includes(lead.status)) {
        lead.status = "new";
        changed = true;
      }

      handleStatusTransitions(lead, false);
    });

    if (changed) saveToStorage();
  }

  function populateAgentFilter() {
    const existing = new Set(leads.map(l => l.assigned).filter(Boolean).concat(AGENTS));

    const current = els.agentFilter.value || "all";
    els.agentFilter.innerHTML = `<option value="all">All Agents</option>`;

    [...existing].sort().forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      els.agentFilter.appendChild(opt);
    });

    if ([...els.agentFilter.options].some(o => o.value === current)) {
      els.agentFilter.value = current;
    }
  }

  function applyFilters() {
    const q = (els.search.value || "").trim().toLowerCase();
    const status = els.statusFilter.value;
    const agent = els.agentFilter.value;

    filtered = leads.filter((l) => {
      const hay = [
        l.leadNumber,
        l.name,
        l.phone,
        l.email,
        l.assigned,
        l.status,
        l.notes,
        l.policyNumber,
        l.clientName,
        l.carrier
      ].join(" ").toLowerCase();

      const matchesText = !q || hay.includes(q);
      const matchesStatus = status === "all" || l.status === status;
      const matchesAgent = agent === "all" || l.assigned === agent;
      return matchesText && matchesStatus && matchesAgent;
    });

    renderRows();
  }

  function renderRows() {
    els.rows.innerHTML = "";

    if (!filtered.length) {
      els.empty.style.display = "block";
      return;
    }

    els.empty.style.display = "none";

    filtered
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .forEach((lead) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", lead.id);
        tr.style.cursor = "pointer";
        tr.title = "Click to view lead details";

        tr.innerHTML = `
          <td>
            <strong>${escapeHtml(lead.leadNumber || "—")}</strong><br>
            <small>${escapeHtml(lead.name)}</small>
          </td>
          <td>
            <small>${escapeHtml(lead.phone || "—")}<br>${escapeHtml(lead.email || "—")}</small>
          </td>
          <td>${escapeHtml(lead.lineOfBusiness || "—")}</td>
          <td>
            <select class="action-select agent-select" data-id="${lead.id}">
              ${agentOptions(lead.assigned)}
            </select>
          </td>
          <td>
            <span class="badge status-${escapeHtml(lead.status)}">${labelStatus(lead.status)}</span><br><br>
            <select class="action-select status-select" data-id="${lead.id}">
              ${statusOptions(lead.status)}
            </select>
          </td>
          <td>${lead.quotedPremium ? "$" + escapeHtml(Number(lead.quotedPremium).toFixed(2)) : "—"}</td>
          <td>${escapeHtml(lead.effectiveDate || "—")}</td>
          <td>${escapeHtml(lead.policyNumber || "—")}</td>
          <td>${lead.clientId ? `<a href="../clients/clients.html?clientId=${encodeURIComponent(lead.clientId)}">${escapeHtml(lead.clientName || "View Client")}</a>` : "—"}</td>
          <td>
            <button type="button" class="btn-red small" data-push-next="${lead.id}">Push Next</button>
          </td>
        `;
        els.rows.appendChild(tr);
      });
  }

  function addLeadPrompt() {
    const name = prompt("Lead full name:");
    if (!name) return;

    const phone = prompt("Phone number:") || "";
    const email = prompt("Email address:") || "";
    const lineOfBusiness = prompt("Line of business (Auto/Home/Commercial/Life/Umbrella/Other):", "Auto") || "Other";

    const assigned = getNextRoundRobinAgent();
    if (!AGENTS.includes(assigned)) AGENTS.push(assigned);

    const now = new Date().toISOString();

    leads.unshift({
      id: uid(),
      leadNumber: nextLeadNumber(),
      name,
      phone,
      email,
      assigned,
      status: "new",
      notes: "",
      lineOfBusiness,
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
    });

    saveToStorage();
    populateAgentFilter();
    applyFilters();
  }

  function pushToNextAgent(leadId) {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const pool = getAgentPool();
    if (!pool.length) return;

    const currentIndex = pool.indexOf(lead.assigned);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % pool.length;
    lead.assigned = pool[nextIndex];
    lead.updatedAt = new Date().toISOString();

    saveToStorage();
    populateAgentFilter();
    applyFilters();
  }

  function handleStatusTransitions(lead, persist = true) {
    const now = new Date().toISOString();

    if (lead.status === "application_started" && !lead.appStartedAt) {
      lead.appStartedAt = now;
    }
    if (lead.status === "submitted" && !lead.submittedAt) {
      lead.submittedAt = now;
    }
    if (lead.status === "bound" && !lead.boundAt) {
      lead.boundAt = now;
    }

    if (persist) saveToStorage();
  }

  function bindLeadToClient(leadId) {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    if (!lead.policyNumber || !lead.effectiveDate) {
      alert("Policy Number and Effective Date are required before binding.");
      return;
    }

    lead.status = "bound";
    handleStatusTransitions(lead, false);

    const clients = getClients();
    const existing = clients.find(c => c.linkedLeadId === lead.id || c.email === lead.email);

    if (existing) {
      lead.clientId = existing.id;
      lead.clientName = existing.name;
      lead.updatedAt = new Date().toISOString();
      saveToStorage();
      saveClients(clients);
      alert(`Lead bound and linked to existing client: ${existing.name}`);
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
  }

  function saveLeadDetailFromModal(leadId) {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const get = (id) => document.getElementById(id);

    lead.name = (get("modalLeadName")?.value || lead.name).trim();
    lead.phone = (get("modalLeadPhone")?.value || "").trim();
    lead.email = (get("modalLeadEmail")?.value || "").trim();
    lead.lineOfBusiness = (get("modalLeadLine")?.value || "Other").trim();
    lead.assigned = (get("modalLeadAgent")?.value || lead.assigned).trim();
    lead.status = get("modalLeadStatus")?.value || lead.status;
    lead.quotedPremium = (get("modalLeadQuotedPremium")?.value || "").trim();
    lead.carrier = (get("modalLeadCarrier")?.value || "").trim();
    lead.effectiveDate = (get("modalLeadEffectiveDate")?.value || "").trim();
    lead.policyNumber = (get("modalLeadPolicyNumber")?.value || "").trim();
    lead.notes = (get("modalLeadNotes")?.value || "").trim();

    handleStatusTransitions(lead, false);
    lead.updatedAt = new Date().toISOString();

    saveToStorage();
    populateAgentFilter();
    applyFilters();
    openLeadModal(leadId);
  }

  function ensureLeadModal() {
    if (document.getElementById("leadDetailModal")) return;

    const modal = document.createElement("div");
    modal.id = "leadDetailModal";
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(0,0,0,0.45)";
    modal.style.zIndex = "2000";
    modal.style.padding = "24px";
    modal.style.overflow = "auto";

    modal.innerHTML = `
      <div role="dialog" aria-modal="true" aria-labelledby="leadModalTitle"
           style="max-width:760px;margin:24px auto;background:#fff;border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;">
          <h2 id="leadModalTitle" style="margin:0;font-size:1.25rem;">Lead Details</h2>
          <button type="button" data-close-lead-modal style="border:0;background:#eee;padding:6px 10px;border-radius:8px;cursor:pointer;">Close</button>
        </div>
        <div id="leadModalBody" style="margin-top:14px;"></div>
      </div>
    `;

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeLeadModal();
    });

    document.body.appendChild(modal);
  }

  function openLeadModal(leadId) {
    const lead = leads.find(l => l.id === leadId);
    const modal = document.getElementById("leadDetailModal");
    const body = document.getElementById("leadModalBody");
    if (!lead || !modal || !body) return;

    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div>
          <label>Name</label>
          <input id="modalLeadName" value="${escapeHtml(lead.name || "")}" />
        </div>
        <div>
          <label>Lead Number</label>
          <input value="${escapeHtml(lead.leadNumber || "")}" disabled />
        </div>
        <div>
          <label>Phone</label>
          <input id="modalLeadPhone" value="${escapeHtml(lead.phone || "")}" />
        </div>
        <div>
          <label>Email</label>
          <input id="modalLeadEmail" value="${escapeHtml(lead.email || "")}" />
        </div>
        <div>
          <label>Line of Business</label>
          <input id="modalLeadLine" value="${escapeHtml(lead.lineOfBusiness || "")}" />
        </div>
        <div>
          <label>Assigned Agent</label>
          <select id="modalLeadAgent">${agentOptions(lead.assigned)}</select>
        </div>
        <div>
          <label>Status</label>
          <select id="modalLeadStatus">${statusOptions(lead.status)}</select>
        </div>
        <div>
          <label>Quoted Premium</label>
          <input id="modalLeadQuotedPremium" type="number" step="0.01" min="0" value="${escapeHtml(lead.quotedPremium || "")}" />
        </div>
        <div>
          <label>Carrier</label>
          <input id="modalLeadCarrier" value="${escapeHtml(lead.carrier || "")}" />
        </div>
        <div>
          <label>Effective Date</label>
          <input id="modalLeadEffectiveDate" type="date" value="${escapeHtml(lead.effectiveDate || "")}" />
        </div>
        <div>
          <label>Policy Number</label>
          <input id="modalLeadPolicyNumber" value="${escapeHtml(lead.policyNumber || "")}" />
        </div>
        <div style="grid-column:1/-1;">
          <label>Notes</label>
          <textarea id="modalLeadNotes" rows="4">${escapeHtml(lead.notes || "")}</textarea>
        </div>
      </div>

      <div style="margin-top:12px;font-size:.92rem;">
        <strong>Timeline:</strong>
        Received ${escapeHtml(formatDate(lead.receivedAt))} ·
        App Started ${escapeHtml(formatDate(lead.appStartedAt))} ·
        Submitted ${escapeHtml(formatDate(lead.submittedAt))} ·
        Bound ${escapeHtml(formatDate(lead.boundAt))}
      </div>

      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
        <button type="button" data-save-lead-detail="${lead.id}" style="border:0;background:#0b5fff;color:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
          Save Lead
        </button>
        <button type="button" data-push-next="${lead.id}" style="border:0;background:#444;color:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
          Push to Next Agent
        </button>
        <button type="button" data-bind-client="${lead.id}" style="border:0;background:#0a7d2d;color:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
          Bind & Create/Link Client
        </button>
        ${lead.clientId ? `<a href="../clients/clients.html?clientId=${encodeURIComponent(lead.clientId)}" style="padding:10px 14px;border-radius:8px;border:1px solid #ccc;text-decoration:none;">Open Client</a>` : ""}
        <button type="button" data-close-lead-modal style="border:1px solid #ccc;background:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
          Done
        </button>
      </div>
    `;

    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  }

  function closeLeadModal() {
    const modal = document.getElementById("leadDetailModal");
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aces-leads.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
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

  function getNextRoundRobinAgent() {
    const pool = getAgentPool();
    if (!pool.length) return "Unassigned";

    const rawIndex = Number(localStorage.getItem(STORAGE_KEYS.rrIndex) || 0);
    const index = Number.isFinite(rawIndex) ? rawIndex : 0;
    const next = pool[index % pool.length];

    localStorage.setItem(STORAGE_KEYS.rrIndex, String((index + 1) % pool.length));
    return next;
  }

  function getAgentPool() {
    const set = new Set([...AGENTS, ...leads.map(l => l.assigned).filter(Boolean)]);
    return [...set].sort();
  }

  function nextLeadNumber() {
    const nums = leads
      .map(l => String(l.leadNumber || ""))
      .map(n => Number(n.replace("LD-", "")))
      .filter(n => Number.isFinite(n));
    const max = nums.length ? Math.max(...nums) : 1000;
    return `LD-${max + 1}`;
  }

  function agentOptions(selected) {
    const set = new Set([...AGENTS, ...leads.map(l => l.assigned).filter(Boolean)]);
    return [...set]
      .sort()
      .map((name) =>
        `<option value="${escapeHtml(name)}" ${name === selected ? "selected" : ""}>${escapeHtml(name)}</option>`
      )
      .join("");
  }

  function statusOptions(selected) {
    return STATUS_VALUES
      .map((s) => `<option value="${s}" ${s === selected ? "selected" : ""}>${labelStatus(s)}</option>`)
      .join("");
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

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
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
