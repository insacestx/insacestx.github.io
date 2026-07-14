// ACES AMS — Admin Access Control + Page Behavior
(() => {
  "use strict";

  // Prevent double init
  if (window.__AMS_ADMIN_BOOTSTRAPPED__) return;
  window.__AMS_ADMIN_BOOTSTRAPPED__ = true;

  const OWNER_EMAILS = new Set([
    "george@insaces.com",
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com"
  ]);

  const LOGIN_PATH = "../login/login.html";
  const DASHBOARD_PATH = "../dashboard/dashboard.html";

  function redirectTo(path) {
    window.location.replace(path);
  }

  function getCurrentUser() {
    const raw = localStorage.getItem("acesUser");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.email !== "string") return null;
      return parsed;
    } catch {
      return null;
    }
  }

  // Access gate first (runs before DOM work)
  const user = getCurrentUser();
  if (!user) {
    redirectTo(LOGIN_PATH);
    return;
  }

  const email = user.email.trim().toLowerCase();
  if (!OWNER_EMAILS.has(email)) {
    redirectTo(DASHBOARD_PATH);
    return;
  }

  // Page behavior
  document.addEventListener("DOMContentLoaded", () => {
    const setMetric = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    // Temporary demo counts
    setMetric("totalAgents", 7);
    setMetric("openTasks", 3);
    setMetric("pendingReviews", 2);
    setMetric("systemAlerts", 0);
  });
})();
