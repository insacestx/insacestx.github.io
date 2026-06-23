document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("/data/quotes.json");
  const quotes = await res.json();

  const quote = quotes.find(q => q.id === id);

  const list = document.getElementById("docList");

  if (!quote || !quote.documents) {
    list.innerHTML = "<p>No documents uploaded.</p>";
    return;
  }

  quote.documents.forEach(doc => {
    const div = document.createElement("div");
    div.className = "doc-item";

    div.innerHTML = `
      <span>${doc.name}</span>
      <a href="${doc.url}" download>Download</a>
    `;

    list.appendChild(div);
  });
});
