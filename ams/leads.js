(() => {
  const AGENTS = [
    "George Santibañez",
    "Bryan",
    "Jordan Jones",
    "Lanse",
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
    bindEvents();
    loadFromStorageOrSeed();
    populateAgentFilter();
    applyFilters();
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

    els.rows.addEventListener("change", (e) => {
      const target = e.target;
      const id = target.getAttribute("data-id");
      if (!id) return;

      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      if (target.matches(".agent-select")) {
        lead.assigned = target.value;
      }

      if (target.matches(".status-select")) {
        lead.status = target.value;
      }

      if (target.matches(".notes-input")) {
        lead.notes = target.value;
      }

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

    leads = [
      {
        id: uid(),
        name: "Maria Lopez",
        phone: "254-555-0192",
        email: "maria@example.com",
        assigned: "George Santibañez",
        status: "new",
        notes: "",
        updatedAt: new Date().toISOString()
      },
      {
        id: uid(),
        name: "John Carter",
        phone: "254-555-4421",
        email: "john@example.com",
        assigned: "Jordan Jones",
        status: "contacted",
        notes: "Requested GL + Auto quote.",
        updatedAt: new Date().toISOString()
      },
      {
        id: uid(),
        name: "Rosa Martinez",
        phone: "214-555-8821",
        email: "rosa@example.com",
        assigned: "Jimmy Rodriguez",
        status: "quoted",
        notes: "Waiting for bind confirmation.",
        updatedAt: new Date().toISOString()
      }
    ];
    saveToStorage();
  }

  function populateAgentFilter() {
    const existing = new Set(
      leads.map(l => l.assigned).filter(Boolean).concat(AGENTS)
    );

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
        !q ||
        `${l.name} ${l.phone} ${l.email} ${l.assigned} ${l.notes}`.toLowerCase().includes(q);

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

    leads.unshift({
      id: uid(),
      name,
      phone,
      email,
      assigned,
      status: "new",
      notes: "",
      updatedAt: new Date().toISOString()
    });

    saveToStorage();
    populateAgentFilter();
    applyFilters();
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
    return [...set].sort().map(name =>
      `<option value="${escapeHtml(name)}" ${name === selected ? "selected" : ""}>${escapeHtml(name)}</option>`
    ).join("");
  }

  function statusOptions(selected) {
    return STATUS_VALUES.map(s =>
      `<option value="${s}" ${s === selected ? "selected" : ""}>${labelStatus(s)}</option>`
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
