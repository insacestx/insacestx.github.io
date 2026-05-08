/* ============================================================
   ACES INSURANCE — GLOBAL JAVASCRIPT (2026 UPGRADE)
   Handles:
   - Language switching + nav translation
   - Navigation injection
   - Dropdown menus
   - Mobile nav toggle
   - Services page filtering
   - Applications multi-vehicle logic
   - Agent slide-out panel + Call Now
   - Floating mobile Call ACES button
============================================================ */

/* ============================================================
   LANGUAGE SWITCHING (Instant + Nav Reload)
============================================================ */
function setLanguage(lang) {
  document.getElementById("english").style.display = lang === "english" ? "block" : "none";
  document.getElementById("spanish").style.display = lang === "spanish" ? "block" : "none";

  localStorage.setItem("aces-lang", lang);
  loadNav(); // FIX: instantly reload nav in correct language
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
   SERVICES PAGE — SHOW TYPE BASED ON ?type=
============================================================ */
function showServiceFromQuery() {
  if (!location.pathname.includes("services.html")) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "life";

  document.querySelectorAll(".service-type").forEach(sec => sec.style.display = "none");

  const active = document.getElementById("service-" + type);
  if (active) active.style.display = "block";
}
showServiceFromQuery();

/* ============================================================
   APPLICATIONS PAGE — MULTI-VEHICLE LOGIC
============================================================ */
function initApplications() {
  if (!location.pathname.includes("applications.html")) return;

  const addBtn = document.getElementById("addVehicle");
  const container = document.getElementById("vehicleContainer");

  if (addBtn && container) {
    addBtn.addEventListener("click", () => {
      const clone = container.firstElementChild.cloneNode(true);
      container.appendChild(clone);
    });
  }
}
initApplications();

/* ============================================================
   AGENT PANEL + GRID SHIFT + CALL NOW BUTTON
============================================================ */
const panel = document.querySelector(".agent-panel");
const grid = document.querySelector(".team-grid");

if (panel && grid) {
  document.querySelectorAll(".agent-card").forEach(card => {
    card.addEventListener("click", () => {

      // Fill panel
      panel.querySelector(".panel-photo").src = card.dataset.photo;
      panel.querySelector("h2").textContent = card.dataset.name;
      panel.querySelector(".panel-title").textContent = card.dataset.title;
      panel.querySelector(".panel-phone").textContent = card.dataset.phone;
      panel.querySelector(".panel-email").textContent = card.dataset.email;

      // Set Call Now button
      const cleanPhone = card.dataset.phone.replace(/[^0-9]/g, "");
      panel.querySelector(".panel-call").href = "tel:" + cleanPhone;

      // Open panel
      panel.classList.add("open");
      grid.classList.add("shift-left");
    });
  });

  // Close panel
  document.querySelector(".close-panel").addEventListener("click", () => {
    panel.classList.remove("open");
    grid.classList.remove("shift-left");
  });
}

/* ============================================================
   FLOATING MOBILE "CALL ACES" BUTTON
============================================================ */
function createMobileCallButton() {
  if (window.innerWidth > 900) return; // mobile only

  const btn = document.createElement("a");
  btn.href = "tel:2542276560";
  btn.className = "mobile-call-btn";
  btn.innerHTML = "📞 Call ACES";

  document.body.appendChild(btn);
}
createMobileCallButton();
