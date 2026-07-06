// ACES AMS — Admin Access Control
(() => {
  const owners = [
    "george@insaces.com",
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com"
  ];

  const raw = localStorage.getItem("acesUser");
  if (!raw) {
    window.location.href = "../login/login.html";
    return;
  }

  let user = null;
  try {
    user = JSON.parse(raw);
  } catch (_) {
    localStorage.removeItem("acesUser");
    window.location.href = "../login/login.html";
    return;
  }

  if (!user?.email) {
    localStorage.removeItem("acesUser");
    window.location.href = "../login/login.html";
    return;
  }

  if (!owners.includes(user.email.toLowerCase())) {
    window.location.href = "../dashboard/dashboard.html";
  }
})();
