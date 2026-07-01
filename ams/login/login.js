// TEMPORARY LOGIN SYSTEM — Replace with OAuth later

const agents = [
  { email: "george@insaces.com", role: "owner" },
  { email: "bryan@insaces.com", role: "owner" },
  { email: "jordan@insaces.com", role: "owner" },
  { email: "lanse@insaces.com", role: "owner" },
  { email: "robert@insaces.com", role: "owner" },
  { email: "jimmy@insaces.com", role: "agent" },
  { email: "office@insaces.com", role: "agent" }
];

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  // TEMPORARY PASSWORD
  if (password !== "aces2026") {
    alert("Invalid password.");
    return;
  }

  const user = agents.find(a => a.email === email);

  if (!user) {
    alert("Email not recognized.");
    return;
  }

  // Save session
  localStorage.setItem("acesUser", JSON.stringify(user));

  // Redirect based on role
  if (user.role === "owner") {
    window.location.href = "/ams/admin/admin.html";
  } else {
    window.location.href = "/ams/dashboard/dashboard.html";
  }
});
