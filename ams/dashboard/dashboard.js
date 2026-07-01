// ACES AMS — Dashboard Logic + Login Protection

/* LOGIN PROTECTION */
const user = JSON.parse(localStorage.getItem("acesUser") || "{}");
if (!user.email) {
  window.location.href = "/ams/login/login.html";
}

/* TEMPORARY SAMPLE DATA (replace with backend later) */
const submissions = [
  {
    applicant: "Maria Lopez",
    type: "Auto",
    date: "2026-06-30",
    agent: "jimmy@insaces.com",
    status: "new"
  },
  {
    applicant: "John Carter",
    type: "Homeowners",
    date: "2026-06-29",
    agent: "george@insaces.com",
    status: "review"
  },
  {
    applicant: "Sarah Nguyen",
    type: "Commercial Auto",
    date: "2026-06-28",
    agent: "lanse@insaces.com",
    status: "completed"
  }
];

/* RENDER TABLE */
function renderTable(list) {
  const body = document.getElementById("submissionsBody");
  body.innerHTML = "";

  list.forEach(sub => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${sub.applicant}</td>
      <td>${sub.type}</td>
      <td>${sub.date}</td>
      <td>${sub.agent}</td>
      <td>
        <span class="status-badge status-${sub.status}">
          ${formatStatus(sub.status)}
        </span>
      </td>
      <td>
        <button class="action-btn">View</button>
      </td>
    `;

    body.appendChild(tr);
  });
}

/* STATUS LABELS */
function formatStatus(s) {
  return {
    new: "New",
    review: "In Review",
    completed: "Completed"
  }[s] || s;
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = submissions.filter(s =>
    s.applicant.toLowerCase().includes(term) ||
    s.type.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

/* FILTER */
document.getElementById("statusFilter").addEventListener("change", e => {
  const val = e.target.value;
  const filtered = val === "all"
    ? submissions
    : submissions.filter(s => s.status === val);
  renderTable(filtered);
});

/* INITIAL LOAD */
renderTable(submissions);
