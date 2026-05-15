document.addEventListener("DOMContentLoaded",()=>{

  // Placeholder counts (later replaced with real data)
  document.getElementById("leadCount").innerText = 3;
  document.getElementById("coiCount").innerText = 5;
  document.getElementById("claimCount").innerText = 1;
  document.getElementById("taskCount").innerText = 4;

  const activity = [
    "New COI request submitted",
    "Claim uploaded by client",
    "New lead from website",
    "Policy renewal approaching"
  ];

  const feed = document.getElementById("activityFeed");
  activity.forEach(item=>{
    const li=document.createElement("li");
    li.innerText=item;
    feed.appendChild(li);
  });

});
const clients = [
  {name:"Maria Lopez", phone:"254-555-0192", email:"maria@example.com", policies:2, agent:"George"},
  {name:"John Carter", phone:"254-555-4421", email:"john@example.com", policies:1, agent:"Jordan"},
  {name:"Rosa Martinez", phone:"214-555-8821", email:"rosa@example.com", policies:3, agent:"Jimmy"}
];

function loadClients(){
  const tbody=document.getElementById("clientRows");
  tbody.innerHTML="";
  clients.forEach(c=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${c.policies}</td>
      <td>${c.agent}</td>
    `;
    tr.onclick=()=>window.location.href=`client-profile.html?name=${encodeURIComponent(c.name)}`;
    tbody.appendChild(tr);
  });
}

function filterClients(){
  const q=document.getElementById("clientSearch").value.toLowerCase();
  const rows=document.querySelectorAll("#clientRows tr");
  rows.forEach(r=>{
    r.style.display=r.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function openAddClient(){
  alert("Add Client modal coming soon");
}

document.addEventListener("DOMContentLoaded",loadClients);
function getClientFromURL(){
  const params=new URLSearchParams(window.location.search);
  const name=params.get("name");
  return clients.find(c=>c.name===name);
}

function loadClientProfile(){
  const c=getClientFromURL();
  if(!c){alert("Client not found");return;}

  document.getElementById("clientName").innerText=c.name;
  document.getElementById("clientPhone").innerText=c.phone;
  document.getElementById("clientEmail").innerText=c.email;
  document.getElementById("clientAgent").innerText=c.agent;

  // Placeholder lists
  document.getElementById("policyList").innerHTML="<li>No policies yet</li>";
  document.getElementById("coiList").innerHTML="<li>No COIs yet</li>";
  document.getElementById("claimList").innerHTML="<li>No claims yet</li>";
  document.getElementById("docList").innerHTML="<li>No documents uploaded</li>";
}

function editClient(){alert("Edit client coming soon")}
function addPolicy(){alert("Add policy coming soon")}
function addCOI(){alert("Add COI coming soon")}
function addClaim(){alert("Add claim coming soon")}
function saveNotes(){alert("Notes saved")}
function uploadDocs(){alert("Documents uploaded")}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("client-profile.html")){
    loadClientProfile();
  }
});
const policies = [
  {
    number:"GL-10293",
    client:"Maria Lopez",
    carrier:"Travelers",
    line:"General Liability",
    effective:"2024-06-01",
    renewal:"2025-06-01",
    status:"Active"
  },
  {
    number:"CA-55210",
    client:"John Carter",
    carrier:"Progressive",
    line:"Commercial Auto",
    effective:"2024-02-15",
    renewal:"2025-02-15",
    status:"Active"
  },
  {
    number:"WC-88321",
    client:"Rosa Martinez",
    carrier:"Texas Mutual",
    line:"Workers Comp",
    effective:"2023-11-01",
    renewal:"2024-11-01",
    status:"Expired"
  }
];

function loadPolicies(){
  const tbody=document.getElementById("policyRows");
  tbody.innerHTML="";

  policies.forEach(p=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${p.number}</td>
      <td>${p.client}</td>
      <td>${p.carrier}</td>
      <td>${p.line}</td>
      <td>${p.effective}</td>
      <td>${p.renewal}</td>
      <td class="status-${p.status.toLowerCase()}">${p.status}</td>
    `;
    tr.onclick=()=>window.location.href=`policy-details.html?number=${encodeURIComponent(p.number)}`;
    tbody.appendChild(tr);
  });
}

function filterPolicies(){
  const q=document.getElementById("policySearch").value.toLowerCase();
  const rows=document.querySelectorAll("#policyRows tr");
  rows.forEach(r=>{
    r.style.display=r.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function addPolicy(){
  alert("Add Policy modal coming soon");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("policies.html")){
    loadPolicies();
  }
});
function getPolicyFromURL(){
  const params=new URLSearchParams(window.location.search);
  const number=params.get("number");
  return policies.find(p=>p.number===number);
}

function loadPolicyDetails(){
  const p=getPolicyFromURL();
  if(!p){alert("Policy not found");return;}

  document.getElementById("policyNumber").innerText=p.number;
  document.getElementById("policyClient").innerText=p.client;
  document.getElementById("policyCarrier").innerText=p.carrier;
  document.getElementById("policyLine").innerText=p.line;
  document.getElementById("policyEffective").innerText=p.effective;
  document.getElementById("policyRenewal").innerText=p.renewal;
  document.getElementById("policyStatus").innerText=p.status;
  document.getElementById("policyStatus").classList.add(p.status.toLowerCase());

  // Placeholder lists
  document.getElementById("policyCOIs").innerHTML="<li>No COIs yet</li>";
  document.getElementById("policyClaims").innerHTML="<li>No claims yet</li>";
  document.getElementById("endorsementList").innerHTML="<li>No endorsements yet</li>";
  document.getElementById("policyDocs").innerHTML="<li>No documents uploaded</li>";
}

function editPolicy(){alert("Edit policy coming soon")}
function addEndorsement(){alert("Add endorsement coming soon")}
function savePolicyNotes(){alert("Notes saved")}
function uploadPolicyDocs(){alert("Documents uploaded")}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("policy-details.html")){
    loadPolicyDetails();
  }
});
const cois = [
  {
    id:"COI-001",
    client:"Maria Lopez",
    holder:"ABC Construction",
    policy:"GL-10293",
    requested:"2024-05-10",
    completed:"—",
    status:"Pending"
  },
  {
    id:"COI-002",
    client:"John Carter",
    holder:"City of Waco",
    policy:"CA-55210",
    requested:"2024-05-08",
    completed:"2024-05-09",
    status:"Completed"
  },
  {
    id:"COI-003",
    client:"Rosa Martinez",
    holder:"Blue Star Electric",
    policy:"WC-88321",
    requested:"2024-04-28",
    completed:"—",
    status:"Delayed"
  }
];

function loadCOIs(){
  const tbody=document.getElementById("coiRows");
  tbody.innerHTML="";

  cois.forEach(c=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${c.id}</td>
      <td>${c.client}</td>
      <td>${c.holder}</td>
      <td>${c.policy}</td>
      <td>${c.requested}</td>
      <td>${c.completed}</td>
      <td class="status-${c.status.toLowerCase()}">${c.status}</td>
    `;
    tr.onclick=()=>window.location.href=`coi-details.html?id=${encodeURIComponent(c.id)}`;
    tbody.appendChild(tr);
  });
}

function filterCOIs(){
  const q=document.getElementById("coiSearch").value.toLowerCase();
  const rows=document.querySelectorAll("#coiRows tr");
  rows.forEach(r=>{
    r.style.display=r.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function addCOI(){
  alert("Add COI modal coming soon");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("cois.html")){
    loadCOIs();
  }
});
function getCOIFromURL(){
  const params=new URLSearchParams(window.location.search);
  const id=params.get("id");
  return cois.find(c=>c.id===id);
}

function loadCOIDetails(){
  const c=getCOIFromURL();
  if(!c){alert("COI not found");return;}

  document.getElementById("coiId").innerText=c.id;
  document.getElementById("coiClient").innerText=c.client;
  document.getElementById("coiHolder").innerText=c.holder;
  document.getElementById("coiPolicy").innerText=c.policy;
  document.getElementById("coiRequested").innerText=c.requested;
  document.getElementById("coiCompleted").innerText=c.completed;
  document.getElementById("coiStatus").innerText=c.status;
  document.getElementById("coiStatus").classList.add(c.status.toLowerCase());

  // Placeholder docs
  document.getElementById("coiDocs").innerHTML="<li>No documents uploaded</li>";
}

function markCOICompleted(){
  alert("COI marked as completed");
}

function saveCOINotes(){
  alert("Notes saved");
}

function uploadCOIDocs(){
  alert("Documents uploaded");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("coi-details.html")){
    loadCOIDetails();
  }
});
const claims = [
  {
    id:"CLM-001",
    client:"Maria Lopez",
    loss:"2024-05-01",
    type:"Auto",
    carrier:"Progressive",
    status:"Open"
  },
  {
    id:"CLM-002",
    client:"John Carter",
    loss:"2024-04-18",
    type:"Liability",
    carrier:"Travelers",
    status:"Closed"
  },
  {
    id:"CLM-003",
    client:"Rosa Martinez",
    loss:"2024-03-22",
    type:"Workers Comp",
    carrier:"Texas Mutual",
    status:"Pending"
  }
];

function loadClaims(){
  const tbody=document.getElementById("claimRows");
  tbody.innerHTML="";

  claims.forEach(c=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${c.id}</td>
      <td>${c.client}</td>
      <td>${c.loss}</td>
      <td>${c.type}</td>
      <td>${c.carrier}</td>
      <td class="status-${c.status.toLowerCase()}">${c.status}</td>
    `;
    tr.onclick=()=>window.location.href=`claim-details.html?id=${encodeURIComponent(c.id)}`;
    tbody.appendChild(tr);
  });
}

function filterClaims(){
  const q=document.getElementById("claimSearch").value.toLowerCase();
  const rows=document.querySelectorAll("#claimRows tr");
  rows.forEach(r=>{
    r.style.display=r.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function addClaim(){
  alert("Add Claim modal coming soon");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("claims.html")){
    loadClaims();
  }
});
function getClaimFromURL(){
  const params=new URLSearchParams(window.location.search);
  const id=params.get("id");
  return claims.find(c=>c.id===id);
}

function loadClaimDetails(){
  const c=getClaimFromURL();
  if(!c){alert("Claim not found");return;}

  document.getElementById("claimId").innerText=c.id;
  document.getElementById("claimClient").innerText=c.client;
  document.getElementById("claimLoss").innerText=c.loss;
  document.getElementById("claimType").innerText=c.type;
  document.getElementById("claimCarrier").innerText=c.carrier;
  document.getElementById("claimStatus").innerText=c.status;
  document.getElementById("claimStatus").classList.add(c.status.toLowerCase());

  // Placeholder docs
  document.getElementById("claimDocs").innerHTML="<li>No documents uploaded</li>";
}

function closeClaim(){
  alert("Claim marked as closed");
}

function editAdjuster(){
  alert("Adjuster edit coming soon");
}

function saveClaimNotes(){
  alert("Notes saved");
}

function uploadClaimDocs(){
  alert("Documents uploaded");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("claim-details.html")){
    loadClaimDetails();
  }
});
const tasks = [
  {
    task:"Send COI to ABC Construction",
    client:"Maria Lopez",
    due:"2024-05-12",
    assigned:"George",
    status:"Open"
  },
  {
    task:"Follow up on claim CLM-002",
    client:"John Carter",
    due:"2024-05-10",
    assigned:"Jordan",
    status:"Done"
  },
  {
    task:"Request loss runs",
    client:"Rosa Martinez",
    due:"2024-05-05",
    assigned:"Jimmy",
    status:"Overdue"
  }
];

function loadTasks(){
  const tbody=document.getElementById("taskRows");
  tbody.innerHTML="";

  tasks.forEach(t=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${t.task}</td>
      <td>${t.client}</td>
      <td>${t.due}</td>
      <td>${t.assigned}</td>
      <td class="status-${t.status.toLowerCase()}">${t.status}</td>
    `;
    tr.onclick=()=>alert("Task details page coming soon");
    tbody.appendChild(tr);
  });
}

function filterTasks(){
  const q=document.getElementById("taskSearch").value.toLowerCase();
  const rows=document.querySelectorAll("#taskRows tr");
  rows.forEach(r=>{
    r.style.display=r.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function addTask(){
  alert("Add Task modal coming soon");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("tasks.html")){
    loadTasks();
  }
});
const agents = [
  {
    name:"George Santibañez",
    title:"Independent Agent",
    phone:"254-289-2423",
    email:"george@insaces.com",
    photo:"/images/agents/george.jpg"
  },
  {
    name:"Jordan Jones",
    title:"Co-Owner",
    phone:"254-289-2423",
    email:"jordan@insaces.com",
    photo:"/images/agents/jordan.jpg"
  },
  {
    name:"Lanse Derrick",
    title:"Co-Owner",
    phone:"214-770-1488",
    email:"lanse@insaces.com",
    photo:"/images/agents/lanse.jpg"
  },
  {
    name:"Jimmy Rodriguez",
    title:"Agent",
    phone:"214-498-6928",
    email:"jimmy@insaces.com",
    photo:"/images/agents/jimmy.jpg"
  }
];

function loadAgents(){
  const grid=document.getElementById("agentGrid");
  grid.innerHTML="";

  agents.forEach(a=>{
    const card=document.createElement("div");
    card.className="agent-card";
    card.innerHTML=`
      <img src="${a.photo}">
      <h3>${a.name}</h3>
      <p>${a.title}</p>
      <p>${a.phone}</p>
      <p>${a.email}</p>
    `;
    card.onclick=()=>window.location.href=`agent-profile.html?name=${encodeURIComponent(a.name)}`;
    grid.appendChild(card);
  });
}

function filterAgents(){
  const q=document.getElementById("agentSearch").value.toLowerCase();
  const cards=document.querySelectorAll(".agent-card");
  cards.forEach(c=>{
    c.style.display=c.innerText.toLowerCase().includes(q)?"":"none";
  });
}

function addAgent(){
  alert("Add Agent modal coming soon");
}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("agents.html")){
    loadAgents();
  }
});
function getAgentFromURL(){
  const params=new URLSearchParams(window.location.search);
  const name=params.get("name");
  return agents.find(a=>a.name===name);
}

function loadAgentProfile(){
  const a=getAgentFromURL();
  if(!a){alert("Agent not found");return;}

  document.getElementById("agentName").innerText=a.name;
  document.getElementById("agentTitle").innerText=a.title;
  document.getElementById("agentPhone").innerText=a.phone;
  document.getElementById("agentEmail").innerText=a.email;
  document.getElementById("agentPhoto").src=a.photo;

  // Assigned clients
  const clientList=document.getElementById("agentClients");
  clientList.innerHTML="";
  clients.filter(c=>c.agent===a.name).forEach(c=>{
    const li=document.createElement("li");
    li.innerText=c.name;
    li.onclick=()=>window.location.href=`client-profile.html?name=${encodeURIComponent(c.name)}`;
    clientList.appendChild(li);
  });
  if(clientList.innerHTML==="") clientList.innerHTML="<li>No clients assigned</li>";

  // Assigned tasks
  const taskList=document.getElementById("agentTasks");
  taskList.innerHTML="";
  tasks.filter(t=>t.assigned===a.name).forEach(t=>{
    const li=document.createElement("li");
    li.innerText=`${t.task} (Due: ${t.due})`;
    taskList.appendChild(li);
  });
  if(taskList.innerHTML==="") taskList.innerHTML="<li>No tasks assigned</li>";
}

function editAgent(){alert("Edit agent coming soon")}
function saveAgentNotes(){alert("Notes saved")}

document.addEventListener("DOMContentLoaded",()=>{
  if(window.location.pathname.includes("agent-profile.html")){
    loadAgentProfile();
  }
});
