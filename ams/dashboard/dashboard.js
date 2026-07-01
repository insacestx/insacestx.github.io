// ACES AMS — Dashboard Access Control

const user = JSON.parse(localStorage.getItem("acesUser") || "{}");

// If no session → redirect to login
if (!user.email) {
  window.location.href = "/ams/login/login.html";
}

// Display user email in dashboard if needed
console.log("Logged in as:", user.email);
