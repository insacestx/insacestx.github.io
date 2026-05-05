/* ============================================================
   ACES INSURANCE — GLOBAL.JS (FINAL 2026 BUILD)
   Handles:
   - Language switching
   - Navigation injection
   - Agent filtering
   - Services filtering
   - Mobile nav toggle
   - Dropdown tap support
   - Slide‑out agent panel
============================================================ */

/* --------------------------------------------------
   LANGUAGE SWITCHING
-------------------------------------------------- */
function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);

  // Swap bilingual text
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

  injectNavigation(lang);
  filterAgentsByLanguage(lang);
}

/* --------------------------------------------------
   NAVIGATION INJECTION
-------------------------------------------------- */
function injectNavigation(lang) {
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");
  const navContainer = document.getElementById("navContainer");

  if (!navContainer || !navEN || !navES) return;

  navContainer.innerHTML = lang === "english"
    ? navEN.innerHTML
    : navES.innerHTML;

  enableDropdownTap();
}

/* --------------------------------------------------
   MOBILE DROPDOWN TAP SUPPORT
-------------------------------------------------- */
function enableDropdownTap() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const toggle = drop.querySelector(".dropdown-toggle");
    const menu = drop.querySelector(".dropdown-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        menu.classList.toggle("show");
      }
    });
  });
}

/* --------------------------------------------------
   CONTACT PAGE — FILTER AGENTS BY LANGUAGE
-------------------------------------------------- */
function filterAgentsByLanguage(lang) {
  const cards = document.querySelectorAll(".agent-card");
  if (!cards.length) return;

  cards.forEach(card => {
    const speaksSpanish = card.getAttribute("data-spanish") === "true";
    card.style.display = (lang === "spanish" && !speaksSpanish)
      ? "none"
      : "block";
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
   CONTACT PAGE — SLIDE-OUT AGENT PANEL
-------------------------------------------------- */
function initAgentPanel() {
  const panel = document.getElementById("agentPanel");
  if (!panel) return; // Only runs on contact page

  const closePanel = document.getElementById("closePanel");
  const panelPhoto = document.getElementById("panelPhoto");
  const panelName = document.getElementById("panelName");
  const panelTitle = document.getElementById("panelTitle");
  const panelEmail = document.getElementById("panelEmail");
  const panelPhone = document.getElementById("panelPhone");

  const agentData = {
    george: {
      photo: "george.jpg",
      name: "George J. Santibañez",
      title: "Commercial & Personal Lines Agent",
      email: "george@insaces.com",
      phone: "(000) 000-0000"
    },
    jimmy: {
      photo: "jimmy.jpg",
      name: "Jimmy Rodriguez",
      title: "Commercial & Personal Lines Agent",
      email: "jimmy@insaces.com",
      phone: "(214) 498-6928"
    },
    jordan: {
      photo: "jordan.jpg",
      name: "Jordan Jones",
      title: "Agency Co‑Owner",
      email: "jordan@insaces.com",
      phone: "(254) 289-2423"
    },
    lanse: {
      photo: "lanse.jpg",
      name: "Lanse Derrick",
      title: "Agency Co‑Owner",
      email: "lanse@insaces.com",
      phone: "(214) 770-1488"
    },
    robert: {
      photo: "robert.jpg",
      name: "Robert Hyde",
      title: "Agency Co‑Owner",
      email: "robert@insaces.com",
      phone: "(254) 292-0961"
    },
    bryan: {
      photo: "bryan.jpg",
      name: "Bryan Carter",
      title: "Agency Co‑Owner",
      email: "bryan@insaces.com",
      phone: "(254) 744-6600"
    },
    renee: {
      photo: "renee.jpg",
      name: "Renee Ridling",
      title: "Commercial & Personal Lines Agent",
      email: "office@insaces.com",
      phone: "(254) 227-6560"
    }
  };

  document.querySelectorAll(".agent-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-agent");
      const data = agentData[id];
      if (!data) return;

      panelPhoto.src = data.photo;
      panelName.textContent = data.name;
      panelTitle.textContent = data.title;
      panelEmail.textContent = "Email: " + data.email;
      panelPhone.textContent = "Phone: " + data.phone;

      panel.classList.add("open");
    });
  });

  if (closePanel) {
    closePanel.addEventListener("click", () => {
      panel.classList.remove("open");
    });
  }
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

  // Services filtering
  handleServiceQuery();

  // Language buttons
  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Contact page slide-out panel
  initAgentPanel();
});
