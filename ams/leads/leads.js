(() => {
  "use strict";

  // Prevent double init if script is accidentally loaded twice
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

  const STATUS_VALUES = ["new", "contacted", "quoted", "closed"];

  let leads = [];
  let filtered = [];

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheEls();

    // Fail-safe: only run on leads page when required DOM exists
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

    // Row-level updates (existing behavior)
    els.rows.addEventListener("change", (e) => {
      const target = e.target;
      const id = target.getAttribute("data-id");
      if (!id) return;

      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      if (target.matches(".agent-select")) lead.assigned = target.value;
      if (target.matches(".status-select")) lead.status = target.value;
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

    // Clickable row -> open modal details
    els.rows.addEventListener("click", (e) => {
      const target = e.target;

      // Do not open modal when interacting with form controls
      if (target.closest("select, textarea, input, button, a, label")) return;

      const tr = target.closest("tr[data-id]");
      if (!tr) return;

      openLeadModal(tr.getAttribute("data-id"));
    });

    // Modal actions (event delegation)
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
        openLeadModal(leadId); // refresh modal content
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLeadModal();
    });
  }

  function loadFromStorageOrSeed() {
    const saved = localStorage.getItem("acesLeads");
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
        name: "Maria Lopez",
        phone: "254-555-0192",
        email: "maria@example.com",
        assigned: "George Santibañez",
        status: "new",
        notes: "",
        receivedAt: now,
        updatedAt: now
      },
      {
        id: uid(),
        name: "John Carter",
        phone: "254-555-4421",
        email: "john@example.com",
        assigned: "Jordan Jones",
        status: "contacted",
        notes: "Requested GL + Auto quote.",
        receivedAt: now,
        updatedAt: now
      },
      {
        id: uid(),
        name: "Rosa Martinez",
        phone: "214-555-8821",
        email: "rosa@example.com",
        assigned: "Jimmy Rodriguez",
        status: "quoted",
        notes: "Waiting for bind confirmation.",
        receivedAt: now,
        updatedAt: now
      }
    ];
    saveToStorage();
  }

  // Backfill fields for existing stored leads
  function ensureLeadFields() {
    let changed = false;
    const now = new Date().toISOString();

    leads.forEach((lead) => {
      if (!lead.receivedAt) {
        lead.receivedAt = lead.updatedAt || now;
        changed = true;
      }
      if (!lead.updatedAt) {
        lead.updatedAt = lead.receivedAt || now;
        changed = true;
      }
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

    filtered = leads.filter(l => {
      const matchesText =
        !q || `${l.name} ${l.phone} ${l.email} ${l.assigned} ${l.notes}`.toLowerCase().includes(q);
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
      .forEach(lead => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", lead.id);
        tr.style.cursor = "pointer";
        tr.title = "Click to view lead details";

        tr.innerHTML = `
          <td>
            <strong>${escapeHtml(lead.name)}</strong><br>
            <small>${escapeHtml(lead.phone)} · ${escapeHtml(lead.email)}</small>
          </td>
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
          <td>
            <textarea class="notes notes-input" data-id="${lead.id}" placeholder="Add notes...">${escapeHtml(lead.notes || "")}</textarea>
          </td>
          <td><small>${formatDate(lead.updatedAt)}</small></td>
        `;
        els.rows.appendChild(tr);
      });
  }

  function addLeadPrompt() {
    const name = prompt("Lead full name:");
    if (!name) return;

    const phone = prompt("Phone number:") || "";
    const email = prompt("Email address:") || "";
    const assigned = prompt("Assign to agent (name):", AGENTS[0]) || AGENTS[0];

    if (!AGENTS.includes(assigned)) AGENTS.push(assigned);

    const now = new Date().toISOString();

    leads.unshift({
      id: uid(),
      name,
      phone,
      email,
      assigned,
      status: "new",
      notes: "",
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

  function getAgentPool() {
    const set = new Set([...AGENTS, ...leads.map(l => l.assigned).filter(Boolean)]);
    return [...set].sort();
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
           style="max-width:640px;margin:40px auto;background:#fff;border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;">
          <h2 id="leadModalTitle" style="margin:0;font-size:1.25rem;">Lead Details</h2>
          <button type="button" data-close-lead-modal
                  style="border:0;background:#eee;padding:6px 10px;border-radius:8px;cursor:pointer;">Close</button>
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
      <div style="display:grid;grid-template-columns:160px 1fr;gap:8px 12px;">
        <strong>Name:</strong><span>${escapeHtml(lead.name || "—")}</span>
        <strong>Phone:</strong><span>${escapeHtml(lead.phone || "—")}</span>
        <strong>Email:</strong><span>${escapeHtml(lead.email || "—")}</span>
        <strong>Status:</strong><span>${escapeHtml(labelStatus(lead.status || "new"))}</span>
        <strong>Assigned Agent:</strong><span>${escapeHtml(lead.assigned || "Unassigned")}</span>
        <strong>Received At:</strong><span>${escapeHtml(formatDate(lead.receivedAt))}</span>
        <strong>Last Updated:</strong><span>${escapeHtml(formatDate(lead.updatedAt))}</span>
      </div>

      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
        <button type="button" data-push-next="${lead.id}"
                style="border:0;background:#0b5fff;color:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
          Push to Next Agent
        </button>
        <button type="button" data-close-lead-modal
                style="border:1px solid #ccc;background:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;">
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
    localStorage.setItem("acesLeads", JSON.stringify(leads));
  }

  function agentOptions(selected) {
    const set = new Set([...AGENTS, ...leads.map(l => l.assigned).filter(Boolean)]);
    return [...set]
      .sort()
      .map(
        name =>
          `<option value="${escapeHtml(name)}" ${name === selected ? "selected" : ""}>${escapeHtml(name)}</option>`
      )
      .join("");
  }

  function statusOptions(selected) {
    return STATUS_VALUES.map(
      s => `<option value="${s}" ${s === selected ? "selected" : ""}>${labelStatus(s)}</option>`
    ).join("");
  }

  function labelStatus(s) {
    if (s === "new") return "New";
    if (s === "contacted") return "Contacted";
    if (s === "quoted") return "Quoted";
    if (s === "closed") return "Closed";
    return s;
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
