/* ============================================================
   ACES GLOBAL.JS — RESTORED B2 VERSION
   Supports:
   - Navigation injection
   - Dropdown menus
   - Mobile menu
   - Contact page language toggle
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     NAVIGATION INJECTION
  ============================================================ */
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  function loadNav(lang) {
    if (!navContainer) return;

    // Inject correct nav template
    navContainer.innerHTML = lang === "spanish"
      ? navES.innerHTML
      : navEN.innerHTML;

    activateDropdowns();
  }

  /* ============================================================
     DROPDOWN MENUS
  ============================================================ */
  function activateDropdowns() {
    const toggles = document.querySelectorAll(".dropdown-toggle");

    toggles.forEach(toggle => {
      toggle.addEventListener("click", e => {
        e.stopPropagation();

        const menu = toggle.nextElementSibling;

        // Close all other dropdowns
        document.querySelectorAll(".dropdown-menu").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });

        // Toggle this dropdown
        menu.classList.toggle("show");
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));
    });
  }

  /* ============================================================
     MOBILE NAV MENU
  ============================================================ */
  const mobileToggle = document.getElementById("mobileNavToggle");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navContainer.classList.toggle("open");
    });
  }

  /* ============================================================
     CONTACT PAGE LANGUAGE SWITCH
  ============================================================ */
  const langButtons = document.querySelectorAll(".lang-option");
  const englishSection = document.getElementById("english");
  const spanishSection = document.getElementById("spanish");

  function setLanguage(lang) {
    // Only run on contact page
    if (!englishSection || !spanishSection) {
      loadNav("english");
      return;
    }

    // Update active button
    langButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    // Show correct language section
    englishSection.style.display = lang === "english" ? "block" : "none";
    spanishSection.style.display = lang === "spanish" ? "block" : "none";

    // Load correct nav language
    loadNav(lang);
  }

  // Bind language buttons
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* ============================================================
     INITIAL LOAD
  ============================================================ */
  setLanguage("english"); // Loads nav + correct page content
});
