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

  if (!buttons.length || !sections.length) return;

  let activeFilter = "all";
  let searchTerm = "";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "all";

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilters();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = (e.target.value || "").trim().toLowerCase();
      applyFilters();
    });
  }

  function applyFilters() {
    sections.forEach((section) => {
      const sectionType = section.getAttribute("data-section");
      const sectionMatchesFilter =
        activeFilter === "all" || activeFilter === sectionType;

      const boxes = section.querySelectorAll(".service-box");
      let visibleCount = 0;

      boxes.forEach((box) => {
        const category = box.getAttribute("data-category") || "";
        const categoryMatches =
          activeFilter === "all" || category === activeFilter;

        const h3 = box.querySelector("h3");
        const p = box.querySelector("p");

        const enTitle = (h3?.getAttribute("data-en") || h3?.textContent || "").toLowerCase();
        const esTitle = (h3?.getAttribute("data-es") || "").toLowerCase();
        const enDesc = (p?.getAttribute("data-en") || p?.textContent || "").toLowerCase();
        const esDesc = (p?.getAttribute("data-es") || "").toLowerCase();

        const textBlob = `${enTitle} ${esTitle} ${enDesc} ${esDesc}`;
        const matchesSearch = !searchTerm || textBlob.includes(searchTerm);

        const shouldShow = sectionMatchesFilter && categoryMatches && matchesSearch;
        box.style.display = shouldShow ? "flex" : "none";

        if (shouldShow) visibleCount++;
      });

      section.style.display =
        sectionMatchesFilter && visibleCount > 0 ? "block" : "none";
      section.classList.toggle("active", section.style.display === "block");
    });
  }

  applyFilters();
}
