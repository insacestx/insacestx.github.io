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
