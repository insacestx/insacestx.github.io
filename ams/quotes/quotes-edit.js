// quotes-edit.js
// Saves quote updates (status, agent, notes) back to quotes.json via API

async function saveQuoteChanges() {
  const id = new URLSearchParams(window.location.search).get("id");

  const payload = {
    id,
    status: document.querySelector(".status-select").value,
    assignedAgent: document.querySelector(".agent-select").value,
    notes: document.querySelector(".notes-box").value
  };

  const res = await fetch("/api/updateQuote", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (result.success) {
    alert("Quote updated successfully");
  } else {
    alert("Error updating quote");
  }
}
