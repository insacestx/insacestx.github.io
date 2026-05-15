/* ============================================================
   ACES 2026 — APPLICATIONS PAGE LOGIC
   (Search, category filters, URL-based filtering)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initApplicationFilters();
  initSearchFilter();
  applyURLFilter();
});

/* ------------------------------------------------------------
   CATEGORY FILTER BUTTONS
------------------------------------------------------------ */
function initApplicationFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".app-item");

  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Update active button
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Apply filter
      items.forEach(item => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

/* ------------------------------------------------------------
   SEARCH BAR FILTERING
------------------------------------------------------------ */
function initSearchFilter() {
  const searchInput = document.getElementById("appSearch");
  const items = document.querySelectorAll(".app-item");

  if (!searchInput || !items.length) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    items.forEach(item => {
      const text = item.innerText.toLowerCase();

      if (text.includes(query)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
}

/* ------------------------------------------------------------
   URL FILTERING (from Services Page)
   Example: applications.html?type=general-liability
------------------------------------------------------------ */
function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (!type) return;

  const items = document.querySelectorAll(".app-item");
  const buttons = document.querySelectorAll(".filter-btn");

  let matchedCategory = null;

  items.forEach(item => {
    const itemType = item.getAttribute("data-type");

    if (itemType === type) {
      matchedCategory = item.getAttribute("data-category");
    }
  });

  // If no match, do nothing
  if (!matchedCategory) return;

  // Activate correct category button
  buttons.forEach(btn => {
    if (btn.getAttribute("data-filter") === matchedCategory) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Show only matching category
  items.forEach(item => {
    if (item.getAttribute("data-category") === matchedCategory) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  // Scroll to applications list
  const list = document.getElementById("applicationsList");
  if (list) {
    list.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
