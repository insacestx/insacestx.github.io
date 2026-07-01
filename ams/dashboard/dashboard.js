const user = JSON.parse(localStorage.getItem("acesUser") || "{}");

if (!user.email || !user.email.endsWith("@insaces.com")) {
  window.location.href = "/ams/login/login.html";
}
