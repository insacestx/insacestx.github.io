// ACES AMS — OAuth Callback
(() => {
  "use strict";

  const LOGIN_PATH = "/ams/login/login.html";
  const DASHBOARD_PATH = "/ams/dashboard/dashboard.html";
  const ALLOWED_DOMAIN = "@insaces.com";

  function redirect(path) {
    window.location.replace(path);
  }

  function setStatus(message) {
    const el = document.getElementById("statusText");
    if (el) el.textContent = message;
  }

  function getHashParams() {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;

    return Object.fromEntries(new URLSearchParams(hash));
  }

  async function run() {
    setStatus("Completing login...");

    const params = getHashParams();
    const accessToken = params.access_token;
    const oauthError = params.error;

    if (oauthError) {
      alert("Login was canceled or denied.");
      redirect(LOGIN_PATH);
      return;
    }

    if (!accessToken) {
      alert("Login failed: missing access token.");
      redirect(LOGIN_PATH);
      return;
    }

    let profile;
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        throw new Error(`userinfo failed (${res.status})`);
      }

      profile = await res.json();
    } catch (_) {
      alert("Login error while fetching account profile.");
      redirect(LOGIN_PATH);
      return;
    }

    const email = String(profile?.email || "").trim().toLowerCase();
    const verified = Boolean(profile?.email_verified);

    if (!email || !verified) {
      alert("Login failed: email not available or not verified.");
      redirect(LOGIN_PATH);
      return;
    }

    // Restrict to ACES domain
    if (!email.endsWith(ALLOWED_DOMAIN)) {
      alert("Access restricted to ACES employees.");
      redirect(LOGIN_PATH);
      return;
    }

    // Optional role assignment (keeps your dashboard guard happy)
    const role = email === "george@insaces.com" ? "owner" : "agent";

    // Save minimal session payload (avoid storing raw OAuth profile/token)
    const sessionUser = {
      email,
      name: profile?.name || "",
      picture: profile?.picture || "",
      role,
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem("acesUser", JSON.stringify(sessionUser));

    // Clean token from URL fragment before leaving page
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }

    setStatus("Login successful. Redirecting...");
    redirect(DASHBOARD_PATH);
  }

  run();
})();
