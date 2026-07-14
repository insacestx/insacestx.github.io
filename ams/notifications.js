document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("notifList");
  if (!list) return;

  // Fallback notifications (used when no JSON exists)
  const fallbackNotifs = [
    {
      title: "New COI Request",
      message: "A new COI request was submitted for Maria Lopez.",
      time: "Today, 9:12 AM"
    },
    {
      title: "Claim Updated",
      message: "Claim CLM-001 status changed to Open.",
      time: "Today, 8:41 AM"
    },
    {
      title: "Task Due",
      message: "Task 'Send COI to ABC Construction' is due today.",
      time: "Yesterday, 4:35 PM"
    }
  ];

  async function getNotifications() {
    try {
      // Optional source if you add it later
      const res = await fetch("/data/notifications.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid payload");
      return data;
    } catch {
      // No JSON file? Use fallback
      return fallbackNotifs;
    }
  }

  function render(notifs) {
    list.innerHTML = "";

    if (!notifs.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "No notifications available.";
      list.appendChild(empty);
      return;
    }

    notifs.forEach((n) => {
      const card = document.createElement("article");
      card.className = "client-section";
      card.style.marginBottom = "12px";

      const title = document.createElement("strong");
      title.textContent = n.title || "Notification";

      const message = document.createElement("p");
      message.textContent = n.message || "";

      const time = document.createElement("small");
      time.textContent = n.time || "";

      card.append(title, document.createElement("br"), message, time);
      list.appendChild(card);
    });
  }

  const notifications = await getNotifications();
  render(notifications);
});
