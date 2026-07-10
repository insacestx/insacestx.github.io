/* ============================================================
   ACES 2026 — SERVICES PAGE FILTER + SEARCH SYSTEM
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initServiceWizard();
});

function initServiceWizard() {
  const buttons = document.querySelectorAll(".filter-btn");
  const sections = document.querySelectorAll(".services-section");
  const searchInput = document.getElementById("serviceSearch");
  const emptyState = document.getElementById("servicesEmptyState");

  if (!buttons.length || !sections.length) return;

  let activeFilter = "all";
  let searchTerm = "";

  // Filter button logic
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "all";

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilters();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Search logic
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = (e.target.value || "").trim().toLowerCase();
      applyFilters();
    });
  }

  function applyFilters() {
    let totalVisibleCards = 0;

    sections.forEach((section) => {
      const sectionType = section.getAttribute("data-section");
      const sectionMatchesFilter = activeFilter === "all" || sectionType === activeFilter;

      const boxes = section.querySelectorAll(".service-box");
      let visibleInSection = 0;

      boxes.forEach((box) => {
        const category = box.getAttribute("data-category") || "";
        const categoryMatches = activeFilter === "all" || category === activeFilter;

        const titleEl = box.querySelector("h3");
        const descEl = box.querySelector("p");

        const enTitle = (titleEl?.getAttribute("data-en") || titleEl?.textContent || "").toLowerCase();
        const esTitle = (titleEl?.getAttribute("data-es") || "").toLowerCase();
        const enDesc = (descEl?.getAttribute("data-en") || descEl?.textContent || "").toLowerCase();
        const esDesc = (descEl?.getAttribute("data-es") || "").toLowerCase();

        const searchableText = `${enTitle} ${esTitle} ${enDesc} ${esDesc}`;
        const matchesSearch = !searchTerm || searchableText.includes(searchTerm);

        const shouldShow = sectionMatchesFilter && categoryMatches && matchesSearch;
        box.style.display = shouldShow ? "flex" : "none";

        if (shouldShow) {
          visibleInSection += 1;
          totalVisibleCards += 1;
        }
      });

      section.style.display = sectionMatchesFilter && visibleInSection > 0 ? "block" : "none";
      section.classList.toggle("active", section.style.display === "block");
    });

    if (emptyState) {
      emptyState.style.display = totalVisibleCards === 0 ? "block" : "none";
    }
  }

  // Initial paint
  applyFilters();
}
