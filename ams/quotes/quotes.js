document.addEventListener("DOMContentLoaded", async () => {
  const table = document.getElementById("quotesTable");
  const searchInput = document.getElementById("quoteSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let quotes = [];

  async function loadQuotes() {
    const res = await fetch("/data/quotes.json");
    quotes = await res.json();
    renderTable(quotes);
  }

  function renderTable(list) {
    table.innerHTML = "";

    list.forEach(q => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${q.id}</td>
        <td>${q.client.name}<br><small>${q.client.email}</small></td>
        <td>${q.applicationType}</td>
        <td>${q.status}</td>
        <td>${q.assignedAgent || "—"}</td>
        <td>${q.submittedAt}</td>
        <td>
          <a href="/quote-review.html?id=${q.id}" class="action-btn">Review</a>
        </td>
      `;

      table.appendChild(row);
    });
  }

  // FILTERING
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      if (filter === "all") {
        renderTable(quotes);
      } else {
        renderTable(quotes.filter(q => q.status === filter));
      }

      searchInput.value = "";
    });
  });

  // SEARCH
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    const filtered = quotes.filter(q =>
      q.id.toLowerCase().includes(term) ||
      q.client.name.toLowerCase().includes(term) ||
      q.client.email.toLowerCase().includes(term) ||
      q.client.phone.toLowerCase().includes(term)
    );

    renderTable(filtered);
  });

  loadQuotes();
});
