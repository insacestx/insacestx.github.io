document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".apps-filter-btn");
  const searchInput = document.getElementById("appSearch");
  const cards = () => Array.from(document.querySelectorAll(".app-card"));

  const getLang = () => localStorage.getItem("acesLang") || "en";

  function applyFilters() {
    const activeBtn = document.querySelector(".apps-filter-btn.active");
    const filter = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    const term = (searchInput.value || "").toLowerCase().trim();
    const lang = getLang();
    const isEs = lang === "es";

    cards().forEach(card => {
      const cat = card.getAttribute("data-category") || "";
      const name = (isEs ? card.getAttribute("data-name-es") : card.getAttribute("data-name-en")) || "";
      const desc = (isEs ? card.getAttribute("data-desc-es") : card.getAttribute("data-desc-en")) || "";

      const matchesCategory = filter === "all" || cat === filter;
      const matchesSearch =
        !term ||
        name.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term);

      card.style.display = matchesCategory && matchesSearch ? "flex" : "none";
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyFilters();
    });
  }

  // Small delay to ensure cards are rendered before first filter
  setTimeout(applyFilters, 200);
});
