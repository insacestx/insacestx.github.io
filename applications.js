/* ============================================================
   ACES APPLICATIONS.JS — CLEAN + OPTIMIZED (2026)
============================================================ */

/* DOM ELEMENTS */
const searchInput = document.getElementById("appSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const appItems = document.querySelectorAll(".app-item");

/* ============================================================
   FILTERING LOGIC
============================================================ */

/* Apply filters (category + search) */
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";

  appItems.forEach(item => {
    const category = item.dataset.category;
    const text = item.innerText.toLowerCase();

    const matchesCategory = activeFilter === "all" || category === activeFilter;
    const matchesSearch = text.includes(searchValue);

    item.classList.toggle("hidden", !(matchesCategory && matchesSearch));
  });
}

/* ============================================================
   CATEGORY FILTER BUTTONS
============================================================ */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
    scrollToGrid();
  });
});

/* ============================================================
   SEARCH BAR
============================================================ */

searchInput.addEventListener("input", () => {
  applyFilters();
});

/* ============================================================
   CLEAR FILTERS
============================================================ */

clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterButtons.forEach(b => b.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  applyFilters();
  scrollToGrid();
});

/* ============================================================
   URL-BASED FILTERING (?filter=Commercial)
============================================================ */

function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");

  if (!filter) return;

  const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  if (targetBtn) {
    filterButtons.forEach(b => b.classList.remove("active"));
    targetBtn.classList.add("active");
    applyFilters();
    scrollToGrid();
  }
}

/* ============================================================
   HIGHLIGHTING (for deep links)
============================================================ */

function highlightCard(type) {
  if (!type) return;

  const target = document.querySelector(`.app-item[data-type="${type}"]`);
  if (!target) return;

  target.classList.add("highlight");

  setTimeout(() => {
    target.classList.remove("highlight");
  }, 2500);

  target.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ============================================================
   SCROLL TO GRID — FIXED FOR MULTIPLE GRIDS
============================================================ */

function scrollToGrid() {
  const visibleGrid = [...document.querySelectorAll(".application-grid")]
    .find(grid => grid.offsetParent !== null);

  if (visibleGrid) {
    visibleGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ============================================================
   INIT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyURLFilter();

  const params = new URLSearchParams(window.location.search);
  highlightCard(params.get("type"));
});
