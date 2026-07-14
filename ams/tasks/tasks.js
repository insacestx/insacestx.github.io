let tasks = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadTasks();
  renderTasks();
});

async function loadTasks() {
  // Try likely paths in order
  const paths = [
    "/data/tasks.json",       // repo root /data
    "../data/tasks.json",     // relative from /ams/
    "/ams/data/tasks.json"    // if data is inside /ams/data
  ];

  for (const p of paths) {
    try {
      const res = await fetch(p, { cache: "no-store" });
      if (!res.ok) continue;

      const data = await res.json();
      if (Array.isArray(data)) {
        tasks = data;
        return;
      }
    } catch (_) {
      // try next path
    }
  }

  // Fallback so UI still works even if JSON fails
  tasks = [];
}

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  if (!tasks.length) {
    const empty = document.createElement("div");
    empty.className = "task-item";
    empty.textContent = "No tasks found yet. Click 'Add Task' to create one.";
    list.appendChild(empty);
    return;
  }

  tasks.forEach((t) => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
      <strong>${escapeHtml(t.title || "Untitled Task")}</strong><br>
      Assigned: ${escapeHtml(t.assigned || "Unassigned")}<br>
      Due: ${escapeHtml(t.due || "N/A")}<br>
      Status: ${escapeHtml(t.status || "open")}
    `;

    list.appendChild(div);
  });
}

function addTask() {
  const title = prompt("Task title:");
  if (!title) return;

  const assigned = prompt("Assign to:") || "Unassigned";
  const due = prompt("Due date:") || "N/A";

  tasks.push({
    title,
    assigned,
    due,
    status: "open"
  });

  renderTasks();
}

// Basic sanitizer for safe HTML rendering
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
