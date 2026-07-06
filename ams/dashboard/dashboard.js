// ACES AMS — Dashboard Logic + Login Protection
(() => {
  "use strict";

  const LOGIN_PATH = "../login/login.html";

  function redirectToLogin() {
    window.location.replace(LOGIN_PATH);
  }

  function clearSession() {
    localStorage.removeItem("acesUser");
  }

  function getSessionUser() {
    const raw = localStorage.getItem("acesUser");
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.email === "string" && typeof parsed.role === "string") {
        return parsed;
      }
    } catch (_) {
      // no-op
    }
    return null;
  }

  const user = getSessionUser();
  if (!user) {
    clearSession();
    redirectToLogin();
    return;
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

  function formatStatus(status) {
    return {
      new: "New",
      review: "In Review",
      completed: "Completed"
    }[status] || status;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderTable(list) {
    const body = document.getElementById("submissionsBody");
    if (!body) return;

    body.innerHTML = "";

    list.forEach((sub) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(sub.applicant)}</td>
        <td>${escapeHtml(sub.type)}</td>
        <td>${escapeHtml(sub.date)}</td>
        <td>${escapeHtml(sub.agent)}</td>
        <td>
          <span class="status-badge status-${escapeHtml(sub.status)}">
            ${escapeHtml(formatStatus(sub.status))}
          </span>
        </td>
        <td>
          <button class="action-btn" type="button">View</button>
        </td>
      `;
      body.appendChild(tr);
    });
  }

  function applyFilters() {
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");

    const term = (searchInput?.value || "").trim().toLowerCase();
    const status = statusFilter?.value || "all";

    const filtered = submissions.filter((s) => {
      const matchesSearch =
        !term ||
        s.applicant.toLowerCase().includes(term) ||
        s.type.toLowerCase().includes(term) ||
        s.agent.toLowerCase().includes(term);

      const matchesStatus = status === "all" || s.status === status;

      return matchesSearch && matchesStatus;
    });

    renderTable(filtered);
  }

  function updateTopCards() {
    const leadCount = document.getElementById("leadCount");
    const coiCount = document.getElementById("coiCount");
    const claimCount = document.getElementById("claimCount");
    const taskCount = document.getElementById("taskCount");
    const activityFeed = document.getElementById("activityFeed");

    if (leadCount) {
      leadCount.textContent = String(
        submissions.filter((s) => s.status === "new").length
      );
    }

    if (coiCount) {
      leadCount;
      coiCount.textContent = String(
        submissions.filter((s) => s.type.toLowerCase().includes("coi")).length
      );
    }

    if (claimCount) claimCount.textContent = "0";
    if (taskCount) taskCount.textContent = "0";

    if (activityFeed) {
      activityFeed.innerHTML = `
        <li>Loaded ${submissions.length} recent submissions.</li>
        <li>Logged in as ${escapeHtml(user.email)} (${escapeHtml(user.role)}).</li>
      `;
    }
  }

  function bindLogout() {
    const logout = document.getElementById("logoutLink");
    if (!logout) return;

    logout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectToLogin();
    });
  }

  function init() {
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (statusFilter) statusFilter.addEventListener("change", applyFilters);

    bindLogout();
    updateTopCards();
    renderTable(submissions);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
