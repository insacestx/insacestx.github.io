let tasks = [];

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/data/tasks.json");
  tasks = await res.json();
  renderTasks();
});

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
      <strong>${t.title}</strong><br>
      Assigned: ${t.assigned}<br>
      Due: ${t.due}<br>
      Status: ${t.status}
    `;

    list.appendChild(div);
  });
}

function addTask() {
  const title = prompt("Task title:");
  const assigned = prompt("Assign to:");
  const due = prompt("Due date:");

  tasks.push({
    title,
    assigned,
    due,
    status: "open"
  });

  renderTasks();
}
