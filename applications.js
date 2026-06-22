/* ============================================================
   ACES APPLICATIONS.JS — FIXED 2026
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("appSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const appItems = document.querySelectorAll(".app-item");

  if (!searchInput || !clearFiltersBtn || !filterButtons.length) {
    console.warn("Applications filter elements not found.");
    return;
  }

  /* ============================================================
     FILTERING
  ============================================================ */

  function applyFilters() {

    const searchValue = searchInput.value.toLowerCase();

    const activeFilter =
      document.querySelector(".filter-btn.active")?.dataset.filter || "all";

    appItems.forEach(item => {

      const category = item.dataset.category || "";

      const text = item.textContent.toLowerCase();

      const matchesCategory =
        activeFilter === "all" ||
        category === activeFilter;

      const matchesSearch =
        text.includes(searchValue);

      item.classList.toggle(
        "hidden",
        !(matchesCategory && matchesSearch)
      );
    });
  }

  /* ============================================================
     FILTER BUTTONS
  ============================================================ */

  filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      filterButtons.forEach(b =>
        b.classList.remove("active")
      );

      btn.classList.add("active");

      applyFilters();
    });

  });

  /* ============================================================
     SEARCH
  ============================================================ */

  searchInput.addEventListener("input", applyFilters);

  /* ============================================================
     CLEAR
  ============================================================ */

  clearFiltersBtn.addEventListener("click", () => {

    searchInput.value = "";

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    document
      .querySelector('[data-filter="all"]')
      ?.classList.add("active");

    applyFilters();
  });

  /* ============================================================
     URL FILTER
     /applications.html?filter=Commercial
  ============================================================ */

  const params = new URLSearchParams(window.location.search);

  const filter = params.get("filter");

  if (filter) {

    const btn = document.querySelector(
      `.filter-btn[data-filter="${filter}"]`
    );

    if (btn) {

      filterButtons.forEach(b =>
        b.classList.remove("active")
      );

      btn.classList.add("active");

      applyFilters();
    }
  }

  /* Initial Run */

  applyFilters();

});
