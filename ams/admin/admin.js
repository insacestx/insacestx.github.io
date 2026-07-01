// ACES AMS — Admin Access Control

const user = JSON.parse(localStorage.getItem("acesUser") || "{}");

const owners = [
  "george@insaces.com",
  "bryan@insaces.com",
  "jordan@insaces.com",
  "lanse@insaces.com",
  "robert@insaces.com"
];

if (!owners.includes(user.email)) {
  window.location.href = "/ams/dashboard/dashboard.html";
}
