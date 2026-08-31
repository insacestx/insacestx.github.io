/* ============================================================
   ACES AMS — Unified Stable Build (Hardened)
   - Single source for mock data
   - Page-safe loaders
   - Session guard + logout
   - Safer DOM rendering (reduced innerHTML risk)
============================================================ */

(() => {
  "use strict";

  // Prevent double-initialization if script is included more than once
  if (window.__AMS_BOOTSTRAPPED__) return;
  window.__AMS_BOOTSTRAPPED__ = true;

  /* ============================================================
     DATA
  ============================================================ */

  const clients = [
    { name: "Maria Lopez", phone: "254-555-0192", email: "maria@example.com", policies: 2, agent: "George Santibañez" },
    { name: "John Carter", phone: "254-555-4421", email: "john@example.com", policies: 1, agent: "Jordan Jones" },
    { name: "Rosa Martinez", phone: "214-555-8821", email: "rosa@example.com", policies: 3, agent: "Jimmy Rodriguez" }
  ];

  const leads = [
    { name: "Acme Roofing LLC", contact: "Sarah Nguyen", phone: "469-555-1120", email: "sarah@acmeroofing.com", status: "New", source: "Website" },
    { name: "BlueLine Logistics", contact: "David Kim", phone: "214-555-7781", email: "david@bluelinelogistics.com", status: "Quoted", source: "Referral" },
    { name: "Rivera Electric Co.", contact: "Miguel Rivera", phone: "817-555-3344", email: "miguel@riveraelectric.com", status: "Follow-up", source: "Phone" }
  ];

  const policies = [
    {
      number: "GL-10293",
      client: "Maria Lopez",
      carrier: "Travelers",
      line: "General Liability",
      effective: "2024-06-01",
      renewal: "2025-06-01",
      status: "Active"
    },
    {
      number: "CA-55210",
      client: "John Carter",
      carrier: "Progressive",
      line: "Commercial Auto",
      effective: "2024-02-15",
      renewal: "2025-02-15",
      status: "Active"
    },
    {
      number: "WC-88321",
      client: "Rosa Martinez",
      carrier: "Texas Mutual",
      line: "Workers Comp",
      effective: "2023-11-01",
      renewal: "2024-11-01",
      status: "Expired"
    }
  ];

  const cois = [
    {
      id: "COI-001",
      client: "Maria Lopez",
      holder: "ABC Construction",
      policy: "GL-10293",
      requested: "2024-05-10",
      completed: "—",
      status: "Pending"
    },
    {
      id: "COI-002",
      client: "John Carter",
      holder: "City of Waco",
      policy: "CA-55210",
      requested: "2024-05-08",
      completed: "2024-05-09",
      status: "Completed"
    },
    {
      id: "COI-003",
      client: "Rosa Martinez",
      holder: "Blue Star Electric",
      policy: "WC-88321",
      requested: "2024-04-28",
      completed: "—",
      status: "Delayed"
    }
  ];

  const claims = [
    {
      id: "CLM-001",
      client: "Maria Lopez",
      loss: "2024-05-01",
      type: "Auto",
      carrier: "Progressive",
      status: "Open"
    },
    {
      id: "CLM-002",
      client: "John Carter",
      loss: "2024-04-18",
      type: "Liability",
      carrier: "Travelers",
      status: "Closed"
    },
    {
      id: "CLM-003",
      client: "Rosa Martinez",
      loss: "2024-03-22",
      type: "Workers Comp",
      carrier: "Texas Mutual",
      status: "Pending"
    }
  ];

  const tasks = [
    {
      task: "Send COI to ABC Construction",
      client: "Maria Lopez",
      due: "2024-05-12",
      assigned: "George Santibañez",
      status: "Open"
    },
    {
      task: "Follow up on claim CLM-002",
      client: "John Carter",
      due: "2024-05-10",
      assigned: "Jordan Jones",
      status: "Done"
    },
    {
      task: "Request loss runs",
      client: "Rosa Martinez",
      due: "2024-05-05",
      assigned: "Jimmy Rodriguez",
      status: "Overdue"
    }
  ];

  const agents = [
    {
      name: "George Santibañez",
      title: "Independent Agent",
      phone: "254-289-2423",
      email: "george@insaces.com",
      photo: "/images/agents/george.jpg"
    },
    {
      name: "Bryan",
      title: "Co-Owner",
      phone: "254-289-2423",
      email: "bryan@insaces.com",
      photo: "/images/agents/bryan.jpg"
    },
    {
      name: "Jordan Jones",
      title: "Co-Owner",
      phone: "254-289-2423",
      email: "jordan@insaces.com",
      photo: "/images/agents/jordan.jpg"
    },
    {
      name: "Lanse Derrick",
      title: "Co-Owner",
      phone: "214-770-1488",
      email: "lanse@insaces.com",
      photo: "/images/agents/lanse.jpg"
    },
    {
      name: "Robert",
      title: "Co-Owner",
      phone: "254-555-7711",
      email: "robert@insaces.com",
      photo: "/images/agents/robert.jpg"
    },
    {
      name: "Jimmy Rodriguez",
      title: "Agent",
      phone: "214-498-6928",
      email: "jimmy@insaces.com",
      photo: "/images/agents/jimmy.jpg"
    },
    {
      name: "Renee Ridling",
      title: "Agent",
      phone: "254-227-6560",
      email: "office@insaces.com",
      photo: "/images/agents/office.jpg"
    }
  ];

  /* ============================================================
     SHARED HELPERS
  ============================================================ */

  const LOGIN_PATH = "/ams/login/login.html";

  function getPath() {
    return window.location.pathname.toLowerCase();
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function getParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }

  function setText(id, value) {
    const el = byId(id);
    if (el) el.textContent = String(value ?? "");
  }

  function statusClass(value) {
    return `status-${String(value || "").toLowerCase().replace(/\s+/g, "-")}`;
  }

  function createCell(text) {
    const td = document.createElement("td");
    td.textContent = String(text ?? "");
    return td;
  }

  function appendEmptyListItem(ul, message) {
    const li = document.createElement("li");
    li.textContent = message;
    ul.appendChild(li);
  }

  /* publishes agent login list for public-site global.js */
  function getAgentLoginList() {
    return agents.map(a => ({
      name: a.name,
      email: String(a.email || "").toLowerCase(),
      role: /owner/i.test(a.title || "") ? "owner" : "agent"
    }));
  }

  function publishAgentLoginList() {
    try {
      localStorage.setItem("aces_agents_login", JSON.stringify(getAgentLoginList()));
    } catch (e) {
      console.warn("Could not persist aces_agents_login:", e);
    }
  }

  /* ============================================================
     SESSION + LOGOUT
  ============================================================ */

  function getSessionUser() {
    const raw = localStorage.getItem("acesUser");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.email === "string" && typeof parsed.role === "string") {
        return parsed;
      }
    } catch (_) {}
    return null;
  }

  function clearSession() {
    localStorage.removeItem("acesUser");
  }

  function requireSessionForAMS() {
    const path = getPath();

    if (path.includes("/ams/login/login.html") || path.includes("/ams/login/callback.html")) {
      return true;
    }

    if (!path.includes("/ams/")) return true;

    const user = getSessionUser();
    if (!user) {
      clearSession();
      window.location.replace(LOGIN_PATH);
      return false;
    }
    return true;
  }

  function bindLogout() {
    const logout = byId("logoutLink");
    if (!logout) return;
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      window.location.replace(LOGIN_PATH);
    });
  }

  /* ============================================================
     DASHBOARD
  ============================================================ */

  function loadDashboard() {
    setText("leadCount", "3");
    setText("coiCount", "5");
    setText("claimCount", "1");
    setText("taskCount", "4");

    const feed = byId("activityFeed");
    if (!feed) return;
    feed.innerHTML = "";

    const activity = [
      "New COI request submitted",
      "Claim uploaded by client",
      "New lead from website",
      "Policy renewal approaching"
    ];

    activity.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      feed.appendChild(li);
    });
  }

  /* ============================================================
     LEADS
  ============================================================ */

  function loadLeads() {
    const container = byId("leadsContainer");
    if (!container) return;
    container.innerHTML = "";

    leads.forEach(l => {
      const card = document.createElement("article");
      card.className = "agent-card";

      const h3 = document.createElement("h3");
      h3.textContent = l.name;

      const pContact = document.createElement("p");
      pContact.textContent = `Contact: ${l.contact}`;

      const pPhone = document.createElement("p");
      pPhone.textContent = `Phone: ${l.phone}`;

      const pEmail = document.createElement("p");
      pEmail.textContent = `Email: ${l.email}`;

      const pSource = document.createElement("p");
      pSource.textContent = `Source: ${l.source}`;

      const pStatus = document.createElement("p");
      pStatus.textContent = l.status;
      pStatus.className = statusClass(l.status);

      card.append(h3, pContact, pPhone, pEmail, pSource, pStatus);
      container.appendChild(card);
    });
  }

  function filterLeads() {
    const input = byId("leadSearch");
    if (!input) return;
    const q = input.value.toLowerCase();

    document.querySelectorAll("#leadsContainer .agent-card").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  }

  /* ============================================================
     CLIENTS
  ============================================================ */
  function loadClients() { /* unchanged */ const tbody = byId("clientRows"); if (!tbody) return; tbody.innerHTML = ""; clients.forEach(c => { const tr = document.createElement("tr"); tr.appendChild(createCell(c.name)); tr.appendChild(createCell(c.phone)); tr.appendChild(createCell(c.email)); tr.appendChild(createCell(c.policies)); tr.appendChild(createCell(c.agent)); tr.addEventListener("click", () => { window.location.href = `client-profile.html?name=${encodeURIComponent(c.name)}`; }); tbody.appendChild(tr); }); }
  function filterClients() { const input = byId("clientSearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll("#clientRows tr").forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function openAddClient() { alert("Add Client modal coming soon"); }
  function loadClientProfile() { const name = getParam("name"); const c = clients.find(x => x.name === name); if (!c) { alert("Client not found"); return; } setText("clientName", c.name); setText("clientPhone", c.phone); setText("clientEmail", c.email); setText("clientAgent", c.agent); const policyList = byId("policyList"); if (policyList) { policyList.innerHTML = ""; appendEmptyListItem(policyList, "No policies yet"); } const coiList = byId("coiList"); if (coiList) { coiList.innerHTML = ""; appendEmptyListItem(coiList, "No COIs yet"); } const claimList = byId("claimList"); if (claimList) { claimList.innerHTML = ""; appendEmptyListItem(claimList, "No claims yet"); } const docList = byId("docList"); if (docList) { docList.innerHTML = ""; appendEmptyListItem(docList, "No documents uploaded"); } }
  function editClient() { alert("Edit client coming soon"); }
  function saveNotes() { alert("Notes saved"); }
  function uploadDocs() { alert("Documents uploaded"); }

  /* ============================================================
     POLICIES / COIs / CLAIMS / TASKS / AGENTS / SETTINGS
     (kept same as your current file)
  ============================================================ */
  // ... keep your existing functions exactly as they were ...

  function loadPolicies() { const tbody = byId("policyRows"); if (!tbody) return; tbody.innerHTML = ""; policies.forEach(p => { const tr = document.createElement("tr"); tr.appendChild(createCell(p.number)); tr.appendChild(createCell(p.client)); tr.appendChild(createCell(p.carrier)); tr.appendChild(createCell(p.line)); tr.appendChild(createCell(p.effective)); tr.appendChild(createCell(p.renewal)); const statusTd = createCell(p.status); statusTd.className = statusClass(p.status); tr.appendChild(statusTd); tr.addEventListener("click", () => { window.location.href = `policy-details.html?number=${encodeURIComponent(p.number)}`; }); tbody.appendChild(tr); }); }
  function filterPolicies() { const input = byId("policySearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll("#policyRows tr").forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function addPolicy() { alert("Add Policy modal coming soon"); }

  function loadCOIs() { const tbody = byId("coiRows"); if (!tbody) return; tbody.innerHTML = ""; cois.forEach(c => { const tr = document.createElement("tr"); tr.appendChild(createCell(c.id)); tr.appendChild(createCell(c.client)); tr.appendChild(createCell(c.holder)); tr.appendChild(createCell(c.policy)); tr.appendChild(createCell(c.requested)); tr.appendChild(createCell(c.completed)); const statusTd = createCell(c.status); statusTd.className = statusClass(c.status); tr.appendChild(statusTd); tbody.appendChild(tr); }); }
  function filterCOIs() { const input = byId("coiSearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll("#coiRows tr").forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function addCOI() { alert("Add COI modal coming soon"); }

  function loadClaims() { const tbody = byId("claimRows"); if (!tbody) return; tbody.innerHTML = ""; claims.forEach(c => { const tr = document.createElement("tr"); tr.appendChild(createCell(c.id)); tr.appendChild(createCell(c.client)); tr.appendChild(createCell(c.loss)); tr.appendChild(createCell(c.type)); tr.appendChild(createCell(c.carrier)); const statusTd = createCell(c.status); statusTd.className = statusClass(c.status); tr.appendChild(statusTd); tbody.appendChild(tr); }); }
  function filterClaims() { const input = byId("claimSearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll("#claimRows tr").forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function addClaim() { alert("Add Claim modal coming soon"); }

  function loadTasks() { const tbody = byId("taskRows"); if (!tbody) return; tbody.innerHTML = ""; tasks.forEach(t => { const tr = document.createElement("tr"); tr.appendChild(createCell(t.task)); tr.appendChild(createCell(t.client)); tr.appendChild(createCell(t.due)); tr.appendChild(createCell(t.assigned)); const statusTd = createCell(t.status); statusTd.className = statusClass(t.status); tr.appendChild(statusTd); tbody.appendChild(tr); }); }
  function filterTasks() { const input = byId("taskSearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll("#taskRows tr").forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function addTask() { alert("Add Task modal coming soon"); }

  function loadAgents() {
    const grid = byId("agentGrid");
    if (!grid) return;
    grid.innerHTML = "";

    agents.forEach(a => {
      const card = document.createElement("div");
      card.className = "agent-card";

      const img = document.createElement("img");
      img.src = a.photo;
      img.alt = a.name;

      const h3 = document.createElement("h3");
      h3.textContent = a.name;

      const pTitle = document.createElement("p");
      pTitle.textContent = a.title;

      const pPhone = document.createElement("p");
      pPhone.textContent = a.phone;

      const pEmail = document.createElement("p");
      pEmail.textContent = a.email;

      card.append(img, h3, pTitle, pPhone, pEmail);
      grid.appendChild(card);
    });
  }
  function filterAgents() { const input = byId("agentSearch"); if (!input) return; const q = input.value.toLowerCase(); document.querySelectorAll(".agent-card").forEach(c => { c.style.display = c.textContent.toLowerCase().includes(q) ? "" : "none"; }); }
  function addAgent() { alert("Add Agent modal coming soon"); }
  function editAgent() { alert("Edit agent coming soon"); }
  function saveAgentNotes() { alert("Notes saved"); }

  function saveAgencySettings() { alert("Agency settings saved"); }
  function uploadLogo() { alert("Logo uploaded"); }
  function saveNotifications() { alert("Notification settings saved"); }
  function exportData() { alert("Data export coming soon"); }
  function importData() { alert("Data import coming soon"); }

  /* ============================================================
     BINDINGS
  ============================================================ */

  function bindSearchInputs() {
    const leadSearch = byId("leadSearch");
    if (leadSearch) leadSearch.addEventListener("input", filterLeads);

    const clientSearch = byId("clientSearch");
    if (clientSearch) clientSearch.addEventListener("input", filterClients);

    const policySearch = byId("policySearch");
    if (policySearch) policySearch.addEventListener("input", filterPolicies);

    const coiSearch = byId("coiSearch");
    if (coiSearch) coiSearch.addEventListener("input", filterCOIs);

    const claimSearch = byId("claimSearch");
    if (claimSearch) claimSearch.addEventListener("input", filterClaims);

    const taskSearch = byId("taskSearch");
    if (taskSearch) taskSearch.addEventListener("input", filterTasks);

    const agentSearch = byId("agentSearch");
    if (agentSearch) agentSearch.addEventListener("input", filterAgents);
  }

  function bindButtons() {
    const addAgentBtn = byId("addAgentBtn");
    if (addAgentBtn) addAgentBtn.addEventListener("click", addAgent);
  }

  /* ============================================================
     BOOTSTRAP
  ============================================================ */

  document.addEventListener("DOMContentLoaded", () => {
    if (!requireSessionForAMS()) return;

    publishAgentLoginList();
    bindLogout();
    bindSearchInputs();
    bindButtons();

    const path = getPath();

    if (path.includes("dashboard.html")) loadDashboard();
    if (path.includes("leads.html")) loadLeads();

    if (path.includes("clients.html")) loadClients();
    if (path.includes("client-profile.html")) loadClientProfile();

    if (path.includes("policies.html")) loadPolicies();
    if (path.includes("cois.html") || path.includes("coi.html")) loadCOIs();

    if (path.includes("claims.html")) loadClaims();
    if (path.includes("tasks.html")) loadTasks();

    if (path.includes("agents.html")) loadAgents();
  });

  window.openAddClient = openAddClient;
  window.editClient = editClient;
  window.saveNotes = saveNotes;
  window.uploadDocs = uploadDocs;

  window.addPolicy = addPolicy;
  window.addCOI = addCOI;
  window.addClaim = addClaim;
  window.addTask = addTask;
  window.addAgent = addAgent;

  window.saveAgencySettings = saveAgencySettings;
  window.uploadLogo = uploadLogo;
  window.saveNotifications = saveNotifications;
  window.exportData = exportData;
  window.importData = importData;
})();
