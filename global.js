/* ------------------------------
   LANGUAGE SWITCHING
------------------------------ */
function setLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = lang === "english" ? el.getAttribute("data-en") : el.getAttribute("data-es");
  });

  // Page wrappers
  const enPage = document.getElementById("english") || document.getElementById("services-en") || document.getElementById("apps-en") || document.getElementById("about-en");
  const esPage = document.getElementById("spanish") || document.getElementById("services-es") || document.getElementById("apps-es") || document.getElementById("about-es");

  if (enPage && esPage) {
    enPage.style.display = lang === "english" ? "block" : "none";
    esPage.style.display = lang === "spanish" ? "block" : "none";
  }

  // Navigation
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");
  const navContainer = document.getElementById("navContainer");

  if (lang === "english") {
    navContainer.innerHTML = navEN.innerHTML;
  } else {
    navContainer.innerHTML = navES.innerHTML;
  }

  // Filter agents based on language
  filterAgentsByLanguage(lang);
}

/* ------------------------------
   FILTER AGENTS (CONTACT PAGE)
------------------------------ */
function filterAgentsByLanguage(lang) {
  const cards = document.querySelectorAll(".agent-card");
  if (!cards.length) return;

  cards.forEach(card => {
    const speaksSpanish = card.getAttribute("data-spanish") === "true";

    if (lang === "spanish") {
      card.style.display = speaksSpanish ? "block" : "none";
    } else {
      card.style.display = "block";
    }
  });
}

/* ------------------------------
   FILTER SERVICES (S3 SYSTEM)
------------------------------ */
function filterServices(type) {
  const cards = document.querySelectorAll(".service-card");
  if (!cards.length) return;

  cards.forEach(card => card.style.display = "none");

  const target = document.getElementById(type);
  if (target) target.style.display = "block";
}

function scrollToServiceFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (!type) return;

  filterServices(type);

  setTimeout(() => {
    const target = document.getElementById(type);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 300);
}

/* ------------------------------
   MOBILE NAV TOGGLE
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("navContainer");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Default language
  setLanguage("english");

  // Service filtering
  scrollToServiceFromQuery();

  // Language switch buttons
  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });
});
