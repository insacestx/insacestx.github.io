/* ============================
   ACES GLOBAL.JS — 2026 BUILD
============================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     NAVIGATION INJECTION
  ============================= */
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  function loadNav(lang) {
    if (!navContainer) return;
    navContainer.innerHTML = lang === "spanish" ? navES.innerHTML : navEN.innerHTML;
    activateDropdowns();
  }

  /* ============================
     DROPDOWN MENUS
  ============================= */
  function activateDropdowns() {
    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
      toggle.addEventListener("click", e => {
        e.stopPropagation();
        const menu = toggle.nextElementSibling;
        document.querySelectorAll(".dropdown-menu").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });
        menu.classList.toggle("show");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));
    });
  }

  /* ============================
     MOBILE NAV
  ============================= */
  const mobileToggle = document.getElementById("mobileNavToggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navContainer.classList.toggle("open");
    });
  }

  /* ============================
     LANGUAGE SWITCHING
  ============================= */
  const langButtons = document.querySelectorAll(".lang-option");
  const englishSection = document.getElementById("english");
  const spanishSection = document.getElementById("spanish");

  function setLanguage(lang) {
    langButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

    if (lang === "spanish") {
      englishSection.style.display = "none";
      spanishSection.style.display = "block";
    } else {
      englishSection.style.display = "block";
      spanishSection.style.display = "none";
    }

    loadNav(lang);
    filterAgents(lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  /* ============================
     CONTACT PAGE — FILTERING
  ============================= */
  function filterAgents(lang) {
    document.querySelectorAll(".agent-card").forEach(card => {
      const langs = card.getAttribute("data-lang").split(" ");
      card.style.display = langs.includes(lang === "spanish" ? "es" : "en") ? "block" : "none";
    });
  }

  /* ============================
     SELECTED AGENT PANEL
  ============================= */
  window.selectAgent = function(card) {
    const name = card.querySelector("h3").innerText;
    const title = card.querySelector(".title").innerText;
    const email = card.querySelector(".email").innerText;
    const phone = card.querySelector(".phone").innerText;
    const photo = card.querySelector("img").src;

    // English panel
    if (document.getElementById("sa-name")) {
      document.getElementById("sa-name").innerText = name;
      document.getElementById("sa-title").innerText = title;
      document.getElementById("sa-email").innerText = email;
      document.getElementById("sa-phone").innerText = phone;
      document.getElementById("sa-photo").src = photo;
      document.getElementById("sa-email-btn").href = "mailto:" + email;
    }

    // Spanish panel
    if (document.getElementById("sa-name-es")) {
      document.getElementById("sa-name-es").innerText = name;
      document.getElementById("sa-title-es").innerText = title;
      document.getElementById("sa-email-es").innerText = email;
      document.getElementById("sa-phone-es").innerText = phone;
      document.getElementById("sa-photo-es").src = photo;
      document.getElementById("sa-email-btn-es").href = "mailto:" + email;
    }
  };

  /* ============================
     INITIAL LOAD
  ============================= */
  setLanguage("english");
});
