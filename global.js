/* ============================================================
   ACES INSURANCE — GLOBAL JAVASCRIPT (2026 CLEAN VERSION)
   - Bilingual text swap (formal Spanish)
   - Dropdown menus
   - Mobile nav toggle
   - Services page filtering
   - Applications multi-vehicle logic
   - Agent slide-out panel
   - Floating mobile Call ACES button
============================================================ */

/* ============================================================
   LANGUAGE SWITCHING — TEXT SWAP ONLY
============================================================ */
function setLanguage(lang) {
  localStorage.setItem("aces-lang", lang);

  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = lang === "es" ? el.dataset.es : el.dataset.en;
  });
}

const savedLang = localStorage.getItem("aces-lang") || "en";
setLanguage(savedLang);

/* Language buttons */
document.querySelectorAll(".lang-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});

/* ============================================================
   MOBILE NAV
============================================================ */
const mobileToggle = document.getElementById("mobileNavToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* ============================================================
   DROPDOWN MENUS
============================================================ */
document.addEventListener("click", e => {
  if (e.target.classList.contains("dropdown-toggle")) {
    const menu = e.target.nextElementSibling;
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  } else {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.style.display = "none";
    });
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
   AGENT PANEL + GRID SHIFT
============================================================ */
const panel = document.querySelector(".agent-panel");
const grid = document.querySelector(".team-grid");

if (panel && grid) {
  document.querySelectorAll(".agent-card").forEach(card => {
    card.addEventListener("click", () => {

      panel.querySelector(".panel-photo").src = card.dataset.photo;
      panel.querySelector("h2").innerText = card.dataset.name;
      panel.querySelector(".panel-title").innerText = card.dataset.title;
      panel.querySelector(".panel-phone").innerText = card.dataset.phone;
      panel.querySelector(".panel-email").innerText = card.dataset.email;

      const cleanPhone = card.dataset.phone.replace(/[^0-9]/g, "");
      panel.querySelector(".panel-call").href = "tel:" + cleanPhone;

      panel.classList.add("open");
      grid.classList.add("shift-left");
    });
  });

  document.querySelector(".close-panel").addEventListener("click", () => {
    panel.classList.remove("open");
    grid.classList.remove("shift-left");
  });
}

/* ============================================================
   FLOATING MOBILE "CALL ACES" BUTTON
============================================================ */
function createMobileCallButton() {
  if (window.innerWidth > 900) return;

  const btn = document.createElement("a");
  btn.href = "tel:2542276560";
  btn.className = "mobile-call-btn";
  btn.innerText = "📞 Call ACES";

  document.body.appendChild(btn);
}
createMobileCallButton();
