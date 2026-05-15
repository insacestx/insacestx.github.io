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
