/* ============================================================
   ACES INSURANCE — GLOBAL JAVASCRIPT
   Handles:
   - Language switching
   - Navigation injection
   - Dropdown menus
   - Mobile nav toggle
   - Agent slide-out panel (contact page)
============================================================ */

/* ============================================================
   LANGUAGE SWITCHING
============================================================ */
const englishDiv = document.getElementById("english");
const spanishDiv = document.getElementById("spanish");
const langButtons = document.querySelectorAll(".lang-option");

function setLanguage(lang) {
  if (!englishDiv || !spanishDiv) return;

  if (lang === "spanish") {
    englishDiv.style.display = "none";
    spanishDiv.style.display = "block";
    localStorage.setItem("aces-lang", "spanish");
    injectNav("spanish");
  } else {
    englishDiv.style.display = "block";
    spanishDiv.style.display = "none";
    localStorage.setItem("aces-lang", "english");
    injectNav("english");
  }
}

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

// Load saved language
const savedLang = localStorage.getItem("aces-lang") || "english";
setLanguage(savedLang);

/* ============================================================
   NAVIGATION INJECTION
============================================================ */
function injectNav(lang) {
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  if (!navContainer || !navEN || !navES) return;

  navContainer.innerHTML = (lang === "spanish")
    ? navES.innerHTML
    : navEN.innerHTML;

  enableDropdowns();
}

/* ============================================================
   DROPDOWN MENUS
============================================================ */
function enableDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const toggle = drop.querySelector(".dropdown-toggle");
    const menu = drop.querySelector(".dropdown-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.style.display === "block";
      document.querySelectorAll(".dropdown-menu").forEach(m => m.style.display = "none");
      menu.style.display = isOpen ? "none" : "block";
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach(m => m.style.display = "none");
    }
  });
}

/* ============================================================
   MOBILE NAV TOGGLE
============================================================ */
const mobileToggle = document.getElementById("mobileNavToggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* ============================================================
   CONTACT PAGE — AGENT PANEL LOGIC
============================================================ */
const agentCards = document.querySelectorAll(".agent-card");
const agentPanel = document.querySelector(".agent-panel");
const closePanelBtn = document.querySelector(".close-panel");

if (agentCards && agentPanel) {
  agentCards.forEach(card => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      const title = card.dataset.title;
      const phone = card.dataset.phone;
      const email = card.dataset.email;
      const photo = card.dataset.photo;

      agentPanel.querySelector("h2").textContent = name;
      agentPanel.querySelector(".panel-photo").src = photo;
      agentPanel.querySelector(".panel-title").textContent = title;
      agentPanel.querySelector(".panel-phone").textContent = phone;
      agentPanel.querySelector(".panel-email").textContent = email;

      agentPanel.classList.add("open");
    });
  });
}

if (closePanelBtn) {
  closePanelBtn.addEventListener("click", () => {
    agentPanel.classList.remove("open");
  });
}
