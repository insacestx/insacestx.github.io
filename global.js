// ===============================================
// ACES 2026 GLOBAL.JS
// Header/Footer Injection + Language System
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // LOAD HEADER
  // -------------------------------
  const header = document.getElementById("global-header");

  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        initNavigation();
        initLanguageToggle();
        initMobileMenu();
        applyLanguage(); // ensure translation after injection
      })
      .catch(err => console.error("Header load error:", err));
  }

  // -------------------------------
  // LOAD FOOTER
  // -------------------------------
  const footer = document.getElementById("global-footer");

  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;
      })
      .catch(err => console.error("Footer load error:", err));
  }
  // ===============================================
  // NAVIGATION HIGHLIGHTING
  // ===============================================
  function initNavigation() {
    const current = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  // ===============================================
  // MOBILE MENU
  // ===============================================
  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
      btn.classList.toggle("open");
    });
  }

  // ===============================================
  // LANGUAGE TOGGLE
  // ===============================================
  function initLanguageToggle() {
    const langBtn = document.getElementById("lang-toggle");
    if (!langBtn) return;

    langBtn.addEventListener("click", () => {
      const current = localStorage.getItem("lang") || "en";
      const next = current === "en" ? "es" : "en";
      localStorage.setItem("lang", next);
      applyLanguage();
    });
  }

  // ===============================================
  // APPLY LANGUAGE TO ALL ELEMENTS
  // ===============================================
  function applyLanguage() {
    const lang = localStorage.getItem("lang") || "en";
    const elements = document.querySelectorAll("[data-en], [data-es]");

    elements.forEach(el => {
      if (lang === "es" && el.dataset.es) {
        el.textContent = el.dataset.es;
      } else if (lang === "en" && el.dataset.en) {
        el.textContent = el.dataset.en;
      }
    });

    // Update toggle button label
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = lang === "en" ? "ES" : "EN";
    }
  }
  // ===============================================
  // SMOOTH SCROLL (for future buttons/anchors)
  // ===============================================
  function smoothScrollTo(target) {
    const el = document.querySelector(target);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth"
    });
  }

  // ===============================================
  // FUTURE WIDGET HOOKS (placeholders)
  // ===============================================
  function initWidgets() {
    // Reserved for future ACES widgets:
    // - Quote calculators
    // - Policy lookup
    // - Client portal integrations
    // - Chat modules
  }

  // ===============================================
  // SAFETY: RUN WIDGETS ONLY IF PRESENT
  // ===============================================
  try {
    initWidgets();
  } catch (err) {
    console.warn("Widget init skipped:", err);
  }

}); // END DOMContentLoaded WRAPPER
