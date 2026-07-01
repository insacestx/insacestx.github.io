// ACES AMS — Google OAuth Login

const CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";

document.getElementById("googleLoginBtn").addEventListener("click", () => {
  const redirect = encodeURIComponent("https://insacestx.github.io/ams/login/callback.html");

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + redirect +
    "&response_type=token" +
    "&scope=email%20profile" +
    "&include_granted_scopes=true";

  window.location.href = url;
});
