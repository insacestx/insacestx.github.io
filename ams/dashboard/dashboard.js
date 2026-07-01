const user = JSON.parse(localStorage.getItem("acesUser") || "{}");

if (!user.email) {
  window.location.href = "/ams/login/login.html";
}
