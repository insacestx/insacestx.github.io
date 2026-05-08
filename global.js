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
function setLanguage(lang) {
  document.getElementById("english").style.display = lang === "english" ? "block" : "none";
  document.getElementById("spanish").style.display = lang === "spanish" ? "block" : "none";
  localStorage.setItem("aces-lang", lang);
}

document.querySelectorAll(".lang-option").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

const savedLang = localStorage.getItem("aces-lang") || "english";
setLanguage(savedLang);

/* ============================================================
   NAVIGATION INJECTION
============================================================ */
function loadNav() {
  const lang = localStorage.getItem("aces-lang") || "english";
  const navHTML = document.getElementById(lang === "english" ? "navEN" : "navES").innerHTML;
  document.getElementById("navContainer").innerHTML = navHTML;
}
loadNav();

/* ============================================================
   MOBILE NAV
============================================================ */
document.getElementById("mobileNavToggle").addEventListener("click", () => {
  document.getElementById("navContainer").classList.toggle("open");
});

/* ============================================================
   DROPDOWN MENUS
============================================================ */
document.addEventListener("click", e => {
  if (e.target.classList.contains("dropdown-toggle")) {
    const menu = e.target.nextElementSibling;
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  } else {
    document.querySelectorAll(".dropdown-menu").forEach(menu => menu.style.display = "none");
  }
});

/* ============================================================
   AGENT PANEL + GRID SHIFT
============================================================ */
const panel = document.querySelector(".agent-panel");
const grid = document.querySelector(".team-grid");

document.querySelectorAll(".agent-card").forEach(card => {
  card.addEventListener("click", () => {

    // Fill panel
    panel.querySelector(".panel-photo").src = card.dataset.photo;
    panel.querySelector("h2").textContent = card.dataset.name;
    panel.querySelector(".panel-title").textContent = card.dataset.title;
    panel.querySelector(".panel-phone").textContent = card.dataset.phone;
    panel.querySelector(".panel-email").textContent = card.dataset.email;

    // Open panel
    panel.classList.add("open");

    // Shift grid left
    grid.classList.add("shift-left");
  });
});

// Close panel
document.querySelector(".close-panel").addEventListener("click", () => {
  panel.classList.remove("open");
  grid.classList.remove("shift-left");
});
