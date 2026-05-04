/* ============================================================
   ACES GLOBAL.JS — FINAL CORRECTED VERSION
   - Global language switch (EN/ES)
   - Language memory via localStorage
   - Navigation injection (EN/ES)
   - Dropdown menus (desktop + mobile)
   - Services deep-linking (?type=auto)
   - Page bilingual section switching
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     ELEMENT REFERENCES
  --------------------------------*/
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");
  const langButtons = document.querySelectorAll(".lang-option");
  const mobileToggle = document.getElementById("mobileNavToggle");

  /* -------------------------------
     LANGUAGE MEMORY
  --------------------------------*/
  function getSavedLanguage() {
    const saved = localStorage.getItem("acesLang");
    return saved === "spanish" ? "spanish" : "english";
  }

  function saveLanguage(lang) {
    localStorage.setItem("acesLang", lang);
  }

  /* -------------------------------
     NAVIGATION INJECTION
  --------------------------------*/
  function loadNav(lang) {
    if (!navContainer || !navEN || !navES) return;

    navContainer.innerHTML = lang === "spanish"
      ? navES.innerHTML
      : navEN.innerHTML;

    activateDropdowns();
  }

  /* -------------------------------
     DROPDOWN MENUS
  --------------------------------*/
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

  /* -------------------------------
     MOBILE NAV
  --------------------------------*/
  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener("click", () => {
      navContainer.classList.toggle("open");
    });
  }

  /* -------------------------------
     APPLY LANGUAGE TO TEXT ELEMENTS
  --------------------------------*/
  function applyLanguageToDataAttributes(lang) {
    const elements = document.querySelectorAll("[data-en][data-es]");
    elements.forEach(el => {
      const text = lang === "spanish" ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if (text !== null) el.textContent = text;
    });
  }

  /* -------------------------------
     PAGE-SPECIFIC BILINGUAL SECTIONS
  --------------------------------*/
  function applyLanguageToSections(lang) {
    const pairs = [
      ["english", "spanish"],
      ["services-en", "services-es"],
      ["about-en", "about-es"],
      ["apps-en", "apps-es"]
    ];

    pairs.forEach(([enID, esID]) => {
      const en = document.getElementById(enID);
      const es = document.getElementById(esID);
      if (en && es) {
        en.style.display = lang === "english" ? "block" : "none";
        es.style.display = lang === "spanish" ? "block" : "none";
      }
    });
  }

  /* -------------------------------
     SERVICES DEEP-LINKING
     Example: services.html?type=auto
  --------------------------------*/
  function scrollToServiceFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (!type) return;

    const target = document.getElementById(type);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

  /* -------------------------------
     SET LANGUAGE (GLOBAL)
  --------------------------------*/
  function setLanguage(lang) {
    const finalLang = lang === "spanish" ? "spanish" : "english";
    saveLanguage(finalLang);

    langButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.lang-option[data-lang="${finalLang}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    loadNav(finalLang);
    applyLanguageToDataAttributes(finalLang);
    applyLanguageToSections(finalLang);
    scrollToServiceFromQuery();
  }

  /* -------------------------------
     LANGUAGE SWITCH BUTTONS
  --------------------------------*/
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* -------------------------------
     INITIAL LOAD
  --------------------------------*/
  const initialLang = getSavedLanguage();
  setLanguage(initialLang);
});
