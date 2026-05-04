/* ============================================================
   ACES GLOBAL.JS — B2 VERSION
   - Navigation injection (EN/ES)
   - Dropdown menus
   - Mobile menu
   - Global language switch with localStorage
   - Page content switching where bilingual content exists
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");
  const langButtons = document.querySelectorAll(".lang-option");
  const mobileToggle = document.getElementById("mobileNavToggle");

  /* LANGUAGE STATE */
  function getSavedLanguage() {
    const saved = localStorage.getItem("acesLang");
    return saved === "spanish" ? "spanish" : "english";
  }

  function saveLanguage(lang) {
    localStorage.setItem("acesLang", lang);
  }

  /* NAV INJECTION */
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
  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener("click", () => {
      navContainer.classList.toggle("open");
    });
  }

  /* APPLY LANGUAGE TO TEXT ELEMENTS WITH data-en / data-es */
  function applyLanguageToDataAttributes(lang) {
    const elements = document.querySelectorAll("[data-en][data-es]");
    elements.forEach(el => {
      const text = lang === "spanish" ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if (text !== null) el.textContent = text;
    });
  }

  /* PAGE-SPECIFIC SECTIONS (CONTACT, SERVICES, ABOUT, APPLICATIONS) */
  function applyLanguageToSections(lang) {
    const englishSection = document.getElementById("english");
    const spanishSection = document.getElementById("spanish");
    if (englishSection && spanishSection) {
      englishSection.style.display = lang === "english" ? "block" : "none";
      spanishSection.style.display = lang === "spanish" ? "block" : "none";
    }

    const englishServices = document.getElementById("services-en");
    const spanishServices = document.getElementById("services-es");
    if (englishServices && spanishServices) {
      englishServices.style.display = lang === "english" ? "block" : "none";
      spanishServices.style.display = lang === "spanish" ? "block" : "none";
    }

    const englishAbout = document.getElementById("about-en");
    const spanishAbout = document.getElementById("about-es");
    if (englishAbout && spanishAbout) {
      englishAbout.style.display = lang === "english" ? "block" : "none";
      spanishAbout.style.display = lang === "spanish" ? "block" : "none";
    }

    const englishApps = document.getElementById("apps-en");
    const spanishApps = document.getElementById("apps-es");
    if (englishApps && spanishApps) {
      englishApps.style.display = lang === "english" ? "block" : "none";
      spanishApps.style.display = lang === "spanish" ? "block" : "none";
    }
  }

  /* SET LANGUAGE (GLOBAL) */
  function setLanguage(lang) {
    const finalLang = lang === "spanish" ? "spanish" : "english";
    saveLanguage(finalLang);

    langButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.lang-option[data-lang="${finalLang}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    loadNav(finalLang);
    applyLanguageToDataAttributes(finalLang);
    applyLanguageToSections(finalLang);
  }

  /* BIND LANGUAGE BUTTONS */
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* INITIAL LOAD */
  const initialLang = getSavedLanguage();
  setLanguage(initialLang);
});
