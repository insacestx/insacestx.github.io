// ACES AMS — OAuth Callback

function getHashParams() {
  const hash = window.location.hash.substring(1);
  return Object.fromEntries(new URLSearchParams(hash));
}

const params = getHashParams();
const accessToken = params.access_token;

if (!accessToken) {
  alert("Login failed.");
  window.location.href = "/ams/login/login.html";
}

// Fetch Google profile
fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
  headers: { Authorization: "Bearer " + accessToken }
})
  .then(res => res.json())
  .then(profile => {
    const email = profile.email;

    // Restrict to ACES domain
    if (!email.endsWith("@insaces.com")) {
      alert("Access restricted to ACES employees.");
      window.location.href = "/ams/login/login.html";
      return;
    }

    // Save session
    localStorage.setItem("acesUser", JSON.stringify(profile));

    // Redirect to dashboard
    window.location.href = "/ams/dashboard/dashboard.html";
  })
  .catch(() => {
    alert("Login error.");
    window.location.href = "/ams/login/login.html";
  });
