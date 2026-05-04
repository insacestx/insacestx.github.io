/* ============================================================
   ACES GLOBAL.JS — B2 VERSION
   - Navigation injection (EN/ES)
   - Dropdown menus
   - Mobile menu
   - Contact page language toggle
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* NAVIGATION INJECTION */
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  function loadNav(lang) {
    if (!navContainer || !navEN || !navES) return;

    navContainer.innerHTML = lang === "spanish"
      ? navES.innerHTML
      : navEN.innerHTML;

    activateDropdowns();
  }

  /* DROPDOWNS */
  function activateDropdowns() {
    const toggles = document.querySelectorAll(".dropdown-toggle");

    toggles.forEach(toggle => {
      toggle.addEventListener("click", e => {
        e.stopPropagation();
        const menu = toggle.nextElementSibling;

        document.querySelectorAll(".dropdown-menu").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });

        if (menu) menu.classList.toggle("show");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));
    });
  }

  /* MOBILE NAV */
  const mobileToggle = document.getElementById("mobileNavToggle");
  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener("click", () => {
      navContainer.classList.toggle("open");
    });
  }

  /* CONTACT PAGE LANGUAGE SWITCH */
  const langButtons = document.querySelectorAll(".lang-option");
  const englishSection = document.getElementById("english");
  const spanishSection = document.getElementById("spanish");

  function setLanguage(lang) {
    // If not on contact page, just load nav and exit
    if (!englishSection || !spanishSection) {
      loadNav("english");
      return;
    }

    langButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    englishSection.style.display = lang === "english" ? "block" : "none";
    spanishSection.style.display = lang === "spanish" ? "block" : "none";

    loadNav(lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* INITIAL LOAD */
  setLanguage("english");
});
