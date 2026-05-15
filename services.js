/* ============================================================
   ACES 2026 — SERVICES PAGE LOGIC
   (Category switching + subcategory routing)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initServiceCategories();
  initSubcategoryRouting();
});

/* ------------------------------------------------------------
   CATEGORY SWITCHING (Scale + Fade)
------------------------------------------------------------ */
function initServiceCategories() {
  const cards = document.querySelectorAll(".service-category-card");
  const groups = {
    personal: document.getElementById("group-personal"),
    commercial: document.getElementById("group-commercial"),
    life: document.getElementById("group-life")
  };

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const selected = card.getAttribute("data-category");

      // Activate selected card
      cards.forEach(c => {
        if (c === card) {
          c.classList.add("active");
          c.classList.remove("inactive");
        } else {
          c.classList.remove("active");
          c.classList.add("inactive");
        }
      });

      // Show correct subcategory group
      Object.keys(groups).forEach(key => {
        if (key === selected) {
          groups[key].classList.add("active");
        } else {
          groups[key].classList.remove("active");
        }
      });

      // Smooth scroll to subcategories
      document.querySelector(".subcategory-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* ------------------------------------------------------------
   SUBCATEGORY CLICK → APPLICATIONS PAGE
------------------------------------------------------------ */
function initSubcategoryRouting() {
  const subCards = document.querySelectorAll(".subcategory-card");
  if (!subCards.length) return;

  subCards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");
      if (!type) return;

      window.location.href = `applications.html?type=${encodeURIComponent(type)}`;
    });
  });
}
