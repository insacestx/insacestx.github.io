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
