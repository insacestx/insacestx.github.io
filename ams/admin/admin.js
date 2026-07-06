// ACES AMS — Admin Access Control + Page Behavior
(() => {
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

  function clearSession() {
    // Keep this explicit so existing app behavior doesn't break.
    localStorage.removeItem("acesUser");

    // Optional: uncomment if your app stores auth in other keys too.
    // localStorage.removeItem("acesToken");
    // sessionStorage.removeItem("acesUser");
    // sessionStorage.removeItem("acesToken");
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
    clearSession();
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
    // Logout handler
    const logout = document.getElementById("logoutLink");
    if (logout) {
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        clearSession();
        redirectTo(LOGIN_PATH);
      });
    }

    // Temporary demo counts
    const setMetric = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setMetric("totalAgents", 7);
    setMetric("openTasks", 3);
    setMetric("pendingReviews", 2);
    setMetric("systemAlerts", 0);
  });
})();
