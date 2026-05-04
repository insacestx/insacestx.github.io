/* --------------------------------------------------
   LANGUAGE SWITCHING
-------------------------------------------------- */
function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);

  // Swap text for elements with data-en / data-es
  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.getAttribute("data-en");
    const es = el.getAttribute("data-es");
    el.textContent = lang === "english" ? en : es;
  });

  // Page wrapper pairs
  const pairs = [
    ["english", "spanish"],
    ["services-en", "services-es"],
    ["apps-en", "apps-es"],
    ["about-en", "about-es"]
  ];

  pairs.forEach(([enId, esId]) => {
    const en = document.getElementById(enId);
    const es = document.getElementById(esId);
    if (en && es) {
      en.style.display = lang === "english" ? "block" : "none";
      es.style.display = lang === "spanish" ? "block" : "none";
    }
  });

  // Inject navigation
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");
  const navContainer = document.getElementById("navContainer");

  if (navContainer && navEN && navES) {
    navContainer.innerHTML = lang === "english" ? navEN.innerHTML : navES.innerHTML;
  }

  // Filter agents
  filterAgentsByLanguage(lang);
}

/* --------------------------------------------------
   CONTACT PAGE — FILTER AGENTS
-------------------------------------------------- */
function filterAgentsByLanguage(lang) {
  const cards = document.querySelectorAll(".agent-card");
  if (!cards.length) return;

  cards.forEach(card => {
    const speaksSpanish = card.getAttribute("data-spanish") === "true";
    card.style.display = (lang === "spanish" && !speaksSpanish) ? "none" : "block";
  });
}

/* --------------------------------------------------
   SERVICES PAGE — FILTER BY ?type=
-------------------------------------------------- */
function filterServices(type) {
  const cards = document.querySelectorAll(".service-card");
  if (!cards.length) return;

  cards.forEach(card => card.style.display = "none");

  const target = document.getElementById(type);
  if (target) target.style.display = "block";
}

function handleServiceQuery() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (!type) return;

  filterServices(type);

  setTimeout(() => {
    const target = document.getElementById(type);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, 300);
}

/* --------------------------------------------------
   DOM READY
-------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("navContainer");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Default language
  setLanguage("english");

  // Service filtering
  handleServiceQuery();

  // Language buttons
  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });
});
