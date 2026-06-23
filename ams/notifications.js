document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/data/notifications.json");
  const notifs = await res.json();

  const list = document.getElementById("notifList");

  notifs.forEach(n => {
    const div = document.createElement("div");
    div.className = "notif-item";

    div.innerHTML = `
      <strong>${n.title}</strong><br>
      ${n.message}<br>
      <small>${n.time}</small>
    `;

    list.appendChild(div);
  });
});
