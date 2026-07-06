// TEMPORARY LOGIN SYSTEM — Replace with OAuth later
(() => {
  const agents = [
    { email: "george@insaces.com", role: "owner" },
    { email: "bryan@insaces.com", role: "owner" },
    { email: "jordan@insaces.com", role: "owner" },
    { email: "lanse@insaces.com", role: "owner" },
    { email: "robert@insaces.com", role: "owner" },
    { email: "jimmy@insaces.com", role: "agent" },
    { email: "office@insaces.com", role: "agent" }
  ];

  const TEMP_PASSWORD = "aces2026";

  function getRedirectPath(role) {
    // login.js is in /ams/login/
    return role === "owner" ? "../admin/admin.html" : "../dashboard/dashboard.html";
  }

  function redirectForUser(user) {
    window.location.href = getRedirectPath(user.role);
  }

  function handleLogin() {
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");

    if (!emailEl || !passwordEl) return;

    const email = emailEl.value.trim().toLowerCase();
    const password = passwordEl.value.trim();

    if (!email) {
      alert("Please enter your email.");
      emailEl.focus();
      return;
    }

    if (password !== TEMP_PASSWORD) {
      alert("Invalid password.");
      passwordEl.focus();
      return;
    }

    const user = agents.find(a => a.email === email);

    if (!user) {
      alert("Email not recognized.");
      emailEl.focus();
      return;
    }

    // Save session
    localStorage.setItem("acesUser", JSON.stringify(user));

    // Redirect based on role
    redirectForUser(user);
  }

  function init() {
    // If already logged in, skip login page
    const existing = localStorage.getItem("acesUser");
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed && parsed.email && parsed.role) {
          redirectForUser(parsed);
          return;
        }
      } catch (_) {
        localStorage.removeItem("acesUser");
      }
    }

    const loginBtn = document.getElementById("loginBtn");
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");

    if (loginBtn) {
      loginBtn.addEventListener("click", handleLogin);
    }

    // Press Enter to login from either field
    [emailEl, passwordEl].forEach(el => {
      if (!el) return;
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleLogin();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
