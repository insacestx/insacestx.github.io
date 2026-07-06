// TEMPORARY LOGIN SYSTEM — Replace with OAuth later
(() => {
  "use strict";

  const AGENTS = [
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
    window.location.replace(getRedirectPath(user.role));
  }

  function setError(message) {
    const errorEl = document.getElementById("loginError");
    if (!errorEl) return;
    if (!message) {
      errorEl.hidden = true;
      errorEl.textContent = "";
      return;
    }
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function normalizeSessionUser(user) {
    return {
      email: String(user.email).toLowerCase(),
      role: user.role,
      name: "",
      picture: "",
      loginAt: new Date().toISOString()
    };
  }

  function readExistingSession() {
    const raw = localStorage.getItem("acesUser");
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed.email === "string" &&
        typeof parsed.role === "string" &&
        ["owner", "agent"].includes(parsed.role)
      ) {
        return {
          email: parsed.email.toLowerCase(),
          role: parsed.role
        };
      }
    } catch (_) {
      // no-op
    }
    return null;
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    setError("");

    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");

    if (!emailEl || !passwordEl) return;

    const email = emailEl.value.trim().toLowerCase();
    const password = passwordEl.value;

    if (!email) {
      setError("Please enter your email.");
      emailEl.focus();
      return;
    }

    if (!email.endsWith("@insaces.com")) {
      setError("Use your ACES company email.");
      emailEl.focus();
      return;
    }

    if (password !== TEMP_PASSWORD) {
      setError("Invalid password.");
      passwordEl.focus();
      return;
    }

    const user = AGENTS.find((a) => a.email === email);
    if (!user) {
      setError("Email not recognized.");
      emailEl.focus();
      return;
    }

    localStorage.setItem("acesUser", JSON.stringify(normalizeSessionUser(user)));
    redirectForUser(user);
  }

  function init() {
    // If already logged in, skip login page
    const existing = readExistingSession();
    if (existing) {
      redirectForUser(existing);
      return;
    }

    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", handleLoginSubmit);
    }

    // Clear error as user types
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    [emailEl, passwordEl].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", () => setError(""));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
