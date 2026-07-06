/* ============================================================
   ACES AMS — Unified Stable Build
   - Single source for mock data
   - Page-safe loaders
   - Publishes agent login list for public-site global.js
============================================================ */

/* ============================================================
   DATA
============================================================ */

const clients = [
  { name: "Maria Lopez", phone: "254-555-0192", email: "maria@example.com", policies: 2, agent: "George Santibañez" },
  { name: "John Carter", phone: "254-555-4421", email: "john@example.com", policies: 1, agent: "Jordan Jones" },
  { name: "Rosa Martinez", phone: "214-555-8821", email: "rosa@example.com", policies: 3, agent: "Jimmy Rodriguez" }
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
    name: "Office",
    title: "Agent",
    phone: "254-227-6560",
    email: "office@insaces.com",
    photo: "/images/agents/office.jpg"
  }
];

/* ============================================================
   SHARED HELPERS
============================================================ */

function getPath() {
  return window.location.pathname.toLowerCase();
}

function hasEl(id) {
  return !!document.getElementById(id);
}

function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/* publishes agent login list for public-site global.js */
function getAgentLoginList() {
  return agents.map(a => ({
    name: a.name,
    email: (a.email || "").toLowerCase(),
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

function statusClass(value) {
  return `status-${String(value || "").toLowerCase()}`;
}

/* ============================================================
   DASHBOARD
============================================================ */

function loadDashboard() {
  if (hasEl("leadCount")) document.getElementById("leadCount").innerText = "3";
  if (hasEl("coiCount")) document.getElementById("coiCount").innerText = "5";
  if (hasEl("claimCount")) document.getElementById("claimCount").innerText = "1";
  if (hasEl("taskCount")) document.getElementById("taskCount").innerText = "4";

  const feed = document.getElementById("activityFeed");
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
    li.innerText = item;
    feed.appendChild(li);
  });
}

/* ============================================================
   CLIENTS
============================================================ */

function loadClients() {
  const tbody = document.getElementById("clientRows");
  if (!tbody) return;

  tbody.innerHTML = "";
  clients.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${c.policies}</td>
      <td>${c.agent}</td>
    `;
    tr.onclick = () => (window.location.href = `client-profile.html?name=${encodeURIComponent(c.name)}`);
    tbody.appendChild(tr);
  });
}

function filterClients() {
  const input = document.getElementById("clientSearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll("#clientRows tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function openAddClient() {
  alert("Add Client modal coming soon");
}

function loadClientProfile() {
  const name = getParam("name");
  const c = clients.find(x => x.name === name);
  if (!c) {
    alert("Client not found");
    return;
  }

  if (hasEl("clientName")) document.getElementById("clientName").innerText = c.name;
  if (hasEl("clientPhone")) document.getElementById("clientPhone").innerText = c.phone;
  if (hasEl("clientEmail")) document.getElementById("clientEmail").innerText = c.email;
  if (hasEl("clientAgent")) document.getElementById("clientAgent").innerText = c.agent;

  if (hasEl("policyList")) document.getElementById("policyList").innerHTML = "<li>No policies yet</li>";
  if (hasEl("coiList")) document.getElementById("coiList").innerHTML = "<li>No COIs yet</li>";
  if (hasEl("claimList")) document.getElementById("claimList").innerHTML = "<li>No claims yet</li>";
  if (hasEl("docList")) document.getElementById("docList").innerHTML = "<li>No documents uploaded</li>";
}

function editClient() { alert("Edit client coming soon"); }
function saveNotes() { alert("Notes saved"); }
function uploadDocs() { alert("Documents uploaded"); }

/* ============================================================
   POLICIES
============================================================ */

function loadPolicies() {
  const tbody = document.getElementById("policyRows");
  if (!tbody) return;

  tbody.innerHTML = "";
  policies.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.number}</td>
      <td>${p.client}</td>
      <td>${p.carrier}</td>
      <td>${p.line}</td>
      <td>${p.effective}</td>
      <td>${p.renewal}</td>
      <td class="${statusClass(p.status)}">${p.status}</td>
    `;
    tr.onclick = () => (window.location.href = `policy-details.html?number=${encodeURIComponent(p.number)}`);
    tbody.appendChild(tr);
  });
}

function filterPolicies() {
  const input = document.getElementById("policySearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll("#policyRows tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function addPolicy() {
  alert("Add Policy modal coming soon");
}

function loadPolicyDetails() {
  const number = getParam("number");
  const p = policies.find(x => x.number === number);
  if (!p) {
    alert("Policy not found");
    return;
  }

  if (hasEl("policyNumber")) document.getElementById("policyNumber").innerText = p.number;
  if (hasEl("policyClient")) document.getElementById("policyClient").innerText = p.client;
  if (hasEl("policyCarrier")) document.getElementById("policyCarrier").innerText = p.carrier;
  if (hasEl("policyLine")) document.getElementById("policyLine").innerText = p.line;
  if (hasEl("policyEffective")) document.getElementById("policyEffective").innerText = p.effective;
  if (hasEl("policyRenewal")) document.getElementById("policyRenewal").innerText = p.renewal;

  if (hasEl("policyStatus")) {
    const statusEl = document.getElementById("policyStatus");
    statusEl.innerText = p.status;
    statusEl.classList.add(String(p.status).toLowerCase());
  }

  if (hasEl("policyCOIs")) document.getElementById("policyCOIs").innerHTML = "<li>No COIs yet</li>";
  if (hasEl("policyClaims")) document.getElementById("policyClaims").innerHTML = "<li>No claims yet</li>";
  if (hasEl("endorsementList")) document.getElementById("endorsementList").innerHTML = "<li>No endorsements yet</li>";
  if (hasEl("policyDocs")) document.getElementById("policyDocs").innerHTML = "<li>No documents uploaded</li>";
}

function editPolicy() { alert("Edit policy coming soon"); }
function addEndorsement() { alert("Add endorsement coming soon"); }
function savePolicyNotes() { alert("Notes saved"); }
function uploadPolicyDocs() { alert("Documents uploaded"); }

/* ============================================================
   COIs
============================================================ */

function loadCOIs() {
  const tbody = document.getElementById("coiRows");
  if (!tbody) return;

  tbody.innerHTML = "";
  cois.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.client}</td>
      <td>${c.holder}</td>
      <td>${c.policy}</td>
      <td>${c.requested}</td>
      <td>${c.completed}</td>
      <td class="${statusClass(c.status)}">${c.status}</td>
    `;
    tr.onclick = () => (window.location.href = `coi-details.html?id=${encodeURIComponent(c.id)}`);
    tbody.appendChild(tr);
  });
}

function filterCOIs() {
  const input = document.getElementById("coiSearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll("#coiRows tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function addCOI() {
  alert("Add COI modal coming soon");
}

function loadCOIDetails() {
  const id = getParam("id");
  const c = cois.find(x => x.id === id);
  if (!c) {
    alert("COI not found");
    return;
  }

  if (hasEl("coiId")) document.getElementById("coiId").innerText = c.id;
  if (hasEl("coiClient")) document.getElementById("coiClient").innerText = c.client;
  if (hasEl("coiHolder")) document.getElementById("coiHolder").innerText = c.holder;
  if (hasEl("coiPolicy")) document.getElementById("coiPolicy").innerText = c.policy;
  if (hasEl("coiRequested")) document.getElementById("coiRequested").innerText = c.requested;
  if (hasEl("coiCompleted")) document.getElementById("coiCompleted").innerText = c.completed;

  if (hasEl("coiStatus")) {
    const statusEl = document.getElementById("coiStatus");
    statusEl.innerText = c.status;
    statusEl.classList.add(String(c.status).toLowerCase());
  }

  if (hasEl("coiDocs")) document.getElementById("coiDocs").innerHTML = "<li>No documents uploaded</li>";
}

function markCOICompleted() { alert("COI marked as completed"); }
function saveCOINotes() { alert("Notes saved"); }
function uploadCOIDocs() { alert("Documents uploaded"); }

/* ============================================================
   CLAIMS
============================================================ */

function loadClaims() {
  const tbody = document.getElementById("claimRows");
  if (!tbody) return;

  tbody.innerHTML = "";
  claims.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.client}</td>
      <td>${c.loss}</td>
      <td>${c.type}</td>
      <td>${c.carrier}</td>
      <td class="${statusClass(c.status)}">${c.status}</td>
    `;
    tr.onclick = () => (window.location.href = `claim-details.html?id=${encodeURIComponent(c.id)}`);
    tbody.appendChild(tr);
  });
}

function filterClaims() {
  const input = document.getElementById("claimSearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll("#claimRows tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function addClaim() {
  alert("Add Claim modal coming soon");
}

function loadClaimDetails() {
  const id = getParam("id");
  const c = claims.find(x => x.id === id);
  if (!c) {
    alert("Claim not found");
    return;
  }

  if (hasEl("claimId")) document.getElementById("claimId").innerText = c.id;
  if (hasEl("claimClient")) document.getElementById("claimClient").innerText = c.client;
  if (hasEl("claimLoss")) document.getElementById("claimLoss").innerText = c.loss;
  if (hasEl("claimType")) document.getElementById("claimType").innerText = c.type;
  if (hasEl("claimCarrier")) document.getElementById("claimCarrier").innerText = c.carrier;

  if (hasEl("claimStatus")) {
    const statusEl = document.getElementById("claimStatus");
    statusEl.innerText = c.status;
    statusEl.classList.add(String(c.status).toLowerCase());
  }

  if (hasEl("claimDocs")) document.getElementById("claimDocs").innerHTML = "<li>No documents uploaded</li>";
}

function closeClaim() { alert("Claim marked as closed"); }
function editAdjuster() { alert("Adjuster edit coming soon"); }
function saveClaimNotes() { alert("Notes saved"); }
function uploadClaimDocs() { alert("Documents uploaded"); }

/* ============================================================
   TASKS
============================================================ */

function loadTasks() {
  const tbody = document.getElementById("taskRows");
  if (!tbody) return;

  tbody.innerHTML = "";
  tasks.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.task}</td>
      <td>${t.client}</td>
      <td>${t.due}</td>
      <td>${t.assigned}</td>
      <td class="${statusClass(t.status)}">${t.status}</td>
    `;
    tr.onclick = () => alert("Task details page coming soon");
    tbody.appendChild(tr);
  });
}

function filterTasks() {
  const input = document.getElementById("taskSearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll("#taskRows tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function addTask() {
  alert("Add Task modal coming soon");
}

/* ============================================================
   AGENTS
============================================================ */

function loadAgents() {
  const grid = document.getElementById("agentGrid");
  if (!grid) return;

  grid.innerHTML = "";
  agents.forEach(a => {
    const card = document.createElement("div");
    card.className = "agent-card";
    card.innerHTML = `
      <img src="${a.photo}" alt="${a.name}">
      <h3>${a.name}</h3>
      <p>${a.title}</p>
      <p>${a.phone}</p>
      <p>${a.email}</p>
    `;
    card.onclick = () => (window.location.href = `agent-profile.html?name=${encodeURIComponent(a.name)}`);
    grid.appendChild(card);
  });
}

function filterAgents() {
  const input = document.getElementById("agentSearch");
  if (!input) return;
  const q = input.value.toLowerCase();

  document.querySelectorAll(".agent-card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function addAgent() {
  alert("Add Agent modal coming soon");
}

function loadAgentProfile() {
  const name = getParam("name");
  const a = agents.find(x => x.name === name);
  if (!a) {
    alert("Agent not found");
    return;
  }

  if (hasEl("agentName")) document.getElementById("agentName").innerText = a.name;
  if (hasEl("agentTitle")) document.getElementById("agentTitle").innerText = a.title;
  if (hasEl("agentPhone")) document.getElementById("agentPhone").innerText = a.phone;
  if (hasEl("agentEmail")) document.getElementById("agentEmail").innerText = a.email;
  if (hasEl("agentPhoto")) document.getElementById("agentPhoto").src = a.photo;

  const clientList = document.getElementById("agentClients");
  if (clientList) {
    clientList.innerHTML = "";
    clients.filter(c => c.agent === a.name).forEach(c => {
      const li = document.createElement("li");
      li.innerText = c.name;
      li.onclick = () => (window.location.href = `client-profile.html?name=${encodeURIComponent(c.name)}`);
      clientList.appendChild(li);
    });
    if (!clientList.innerHTML) clientList.innerHTML = "<li>No clients assigned</li>";
  }

  const taskList = document.getElementById("agentTasks");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.filter(t => t.assigned === a.name).forEach(t => {
      const li = document.createElement("li");
      li.innerText = `${t.task} (Due: ${t.due})`;
      taskList.appendChild(li);
    });
    if (!taskList.innerHTML) taskList.innerHTML = "<li>No tasks assigned</li>";
  }
}

function editAgent() { alert("Edit agent coming soon"); }
function saveAgentNotes() { alert("Notes saved"); }

/* ============================================================
   SETTINGS
============================================================ */

function saveAgencySettings() { alert("Agency settings saved"); }
function uploadLogo() { alert("Logo uploaded"); }
function saveNotifications() { alert("Notification settings saved"); }
function exportData() { alert("Data export coming soon"); }
function importData() { alert("Data import coming soon"); }

/* ============================================================
   BOOTSTRAP
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  publishAgentLoginList();

  const path = getPath();

  if (path.includes("dashboard.html")) loadDashboard();

  if (path.includes("clients.html")) loadClients();
  if (path.includes("client-profile.html")) loadClientProfile();

  if (path.includes("policies.html")) loadPolicies();
  if (path.includes("policy-details.html")) loadPolicyDetails();

  if (path.includes("cois.html")) loadCOIs();
  if (path.includes("coi-details.html")) loadCOIDetails();

  if (path.includes("claims.html")) loadClaims();
  if (path.includes("claim-details.html")) loadClaimDetails();

  if (path.includes("tasks.html")) loadTasks();

  if (path.includes("agents.html")) loadAgents();
  if (path.includes("agent-profile.html")) loadAgentProfile();

  if (path.includes("settings.html")) {
    console.log("Settings page loaded");
  }
});
