document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("notifList");
  if (!list) return;

  try {
    const res = await fetch("/data/notifications.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load notifications: ${res.status}`);

    const notifs = await res.json();
    if (!Array.isArray(notifs)) throw new Error("Invalid notifications payload.");

    list.innerHTML = "";

    if (!notifs.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "No notifications available.";
      list.appendChild(empty);
      return;
    }

    notifs.forEach((n) => {
      const item = document.createElement("article");
      item.className = "client-section";
      item.style.marginBottom = "12px";

      const title = document.createElement("strong");
      title.textContent = n?.title ?? "Notification";

      const msg = document.createElement("p");
      msg.textContent = n?.message ?? "";

      const time = document.createElement("small");
      time.textContent = n?.time ?? "";

      item.append(title, document.createElement("br"), msg, time);
      list.appendChild(item);
    });
  } catch (err) {
    list.innerHTML = "";
    const error = document.createElement("p");
    error.className = "empty";
    error.textContent = "Unable to load notifications right now.";
    list.appendChild(error);
    console.error(err);
  }
});
