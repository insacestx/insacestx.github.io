document.addEventListener("DOMContentLoaded", async () => {
  const table = document.getElementById("quotesTable");
  const searchInput = document.getElementById("quoteSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!table) return;

  let quotes = [];
  let activeFilter = "all";
  let searchTerm = "";

  function getBasePath() {
    const path = window.location.pathname || "";
    return path.includes("insacestx.github.io") ? "/insacestx.github.io" : "";
  }
  function normalizeLang(v) {
    const x = String(v || "").trim().toLowerCase();
    return x === "es" || x === "spanish" ? "es" : "en";
  }

  async function loadQuotes() {
    const res = await fetch(`${getBasePath()}/data/quotes.json`, { cache: "no-store" });
    quotes = (await res.json()) || [];
    if (!Array.isArray(quotes)) quotes = [];
    quotes.forEach(q => {
      if (!q.assignedAgent && window.acesRoundRobin?.getNextAssignment) {
        const lang = normalizeLang(q.language || q.client?.language || "en");
        q.assignedAgent = window.acesRoundRobin.getNextAssignment(lang)?.email || "—";
      }
    });
    applyAll();
  }

  function renderTable(list) {
    table.innerHTML = "";
    list.forEach(q => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${q.id || "—"}</td>
        <td>${q.client?.name || "—"}<br><small>${q.client?.email || "—"}</small></td>
        <td>${q.applicationType || "—"}</td>
        <td>${q.status || "—"}</td>
        <td>${q.assignedAgent || "—"}</td>
        <td>${q.submittedAt || "—"}</td>
        <td>
          <button type="button" class="action-btn" data-push="${q.id || ""}">Push Next</button>
          <a href="../quote-review.html?id=${encodeURIComponent(q.id || "")}" class="action-btn">Review</a>
        </td>
      `;
      table.appendChild(row);
    });
  }

  function applyAll() {
    let list = [...quotes];
    if (activeFilter !== "all") list = list.filter(q => String(q.status || "").toLowerCase() === activeFilter);
    if (searchTerm) {
      list = list.filter(q =>
        String(q.id || "").toLowerCase().includes(searchTerm) ||
        String(q.client?.name || "").toLowerCase().includes(searchTerm) ||
        String(q.client?.email || "").toLowerCase().includes(searchTerm) ||
        String(q.client?.phone || "").toLowerCase().includes(searchTerm)
      );
    }
    renderTable(list);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = String(btn.getAttribute("data-filter") || "all").toLowerCase();
      searchTerm = "";
      if (searchInput) searchInput.value = "";
      applyAll();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = String(searchInput.value || "").trim().toLowerCase();
      applyAll();
    });
  }

  table.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-push]");
    if (!btn) return;
    const id = btn.getAttribute("data-push");
    const quote = quotes.find(q => String(q.id) === String(id));
    if (!quote) return;

    const lang = normalizeLang(quote.language || quote.client?.language || "en");
    if (window.acesRoundRobin?.getNextAssignment) {
      quote.assignedAgent = window.acesRoundRobin.getNextAssignment(lang)?.email || quote.assignedAgent || "—";
      applyAll();
    }
  });

  window.resetQuoteRoundRobin = (enIndex = 0, esIndex = 0) => {
    if (window.acesRoundRobin?.reset) {
      window.acesRoundRobin.reset(enIndex, esIndex);
      alert(`Quote Round Robin reset. EN=${enIndex}, ES=${esIndex}`);
    }
  };

  loadQuotes();
});
