/* ============================================================
   ACES 2026 — APPLICATIONS PAGE LOGIC
   (Search, category filters, URL-based filtering, highlight, clear)
============================================================ */

// Prevent running on pages without application cards
if (!document.querySelector(".app-item")) {
  console.log("Applications.js: No application cards found. Skipping filter logic.");
  return;
}


document.addEventListener("DOMContentLoaded", () => {
  initApplicationFilters();
  initSearchFilter();
  initClearFilters();
  applyURLFilter();
});

/* ============================================================
   CATEGORY FILTER BUTTONS
============================================================ */
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

      // Show/hide items
      items.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      // Remove highlight when manually filtering
      items.forEach(item => item.classList.remove("highlight"));
    });
  });
}

/* ============================================================
   SEARCH BAR FILTERING
============================================================ */
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

    // Remove highlight when searching
    items.forEach(item => item.classList.remove("highlight"));
  });
}

/* ============================================================
   CLEAR FILTERS BUTTON
============================================================ */
function initClearFilters() {
  const clearBtn = document.getElementById("clearFiltersBtn");
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".app-item");
  const searchInput = document.getElementById("appSearch");

  if (!clearBtn || !buttons.length || !items.length) return;

  clearBtn.addEventListener("click", () => {
    // Reset search
    if (searchInput) searchInput.value = "";

    // Reset active button to "All"
    buttons.forEach(btn => {
      if (btn.getAttribute("data-filter") === "all") {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Show all items
    items.forEach(item => {
      item.classList.remove("hidden", "highlight");
    });

    // Remove ?type= from URL
    if (window.history && window.history.replaceState) {
      const url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, url);
    }
  });
}

/* ============================================================
   URL FILTERING (from Services Page) + HIGHLIGHT
============================================================ */
function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (!type) return;

  const items = document.querySelectorAll(".app-item");
  const buttons = document.querySelectorAll(".filter-btn");

  let matchedCategory = null;
  let matchedItem = null;

  // Find matching item
  items.forEach(item => {
    const itemType = item.getAttribute("data-type");
    if (itemType === type) {
      matchedCategory = item.getAttribute("data-category");
      matchedItem = item;
    }
  });

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

  // Highlight the exact item
  if (matchedItem) {
    matchedItem.classList.add("highlight");
    matchedItem.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
