/* ============================================================
   ACES 2026 — SERVICES PAGE FILTER SYSTEM
   (Filter bar + grouped sections + smooth transitions)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initServiceFilters();
});

/* -----------------------------------
   FILTER BAR LOGIC
----------------------------------- */

function initServiceFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const sections = document.querySelectorAll(".services-section");
  const boxes = document.querySelectorAll(".service-box");

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Update active button
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/hide sections
      sections.forEach(section => {
        const sectionType = section.getAttribute("data-section");

        if (filter === "all" || filter === sectionType) {
          section.style.display = "block";
          section.classList.add("active");
        } else {
          section.style.display = "none";
          section.classList.remove("active");
        }
      });

      // Show/hide individual boxes (extra safety)
      boxes.forEach(box => {
        const category = box.getAttribute("data-category");

        if (filter === "all" || filter === category) {
          box.style.display = "flex";
        } else {
          box.style.display = "none";
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
