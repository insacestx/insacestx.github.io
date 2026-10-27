document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".apps-filter-btn");
  const searchInput = document.getElementById("appSearch");
  const cardContainer = document.getElementById("app-card-container");
  const cards = () => Array.from(document.querySelectorAll(".app-card"));

  function normalizeLang(v) {
    const x = String(v || "").trim().toLowerCase();
    return x === "es" || x === "spanish" ? "es" : "en";
  }

  const getLang = () => normalizeLang(localStorage.getItem("acesLang") || "en");

  // Only detect wizard flow links; RR assignment is deferred to submit-time in wizard.js
  function isApplicationFlowHref(href) {
    if (!href) return false;

    const cleanHref = String(href).trim().toLowerCase();

    if (
      cleanHref.startsWith("#") ||
      cleanHref.startsWith("javascript:") ||
      cleanHref.startsWith("mailto:") ||
      cleanHref.startsWith("tel:")
    ) {
      return false;
    }

    let path = "";
    try {
      const u = new URL(cleanHref, window.location.origin);
      path = (u.pathname || "").toLowerCase();
    } catch {
      path = cleanHref;
    }

    return path.endsWith("/wizard.html") || cleanHref.includes("wizard.html");
  }

  function applyFilters() {
    const activeBtn = document.querySelector(".apps-filter-btn.active");
    const filter = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    const term = (searchInput?.value || "").toLowerCase().trim();
    const lang = getLang();
    const isEs = lang === "es";

    cards().forEach((card) => {
      const cat = card.getAttribute("data-category") || "";
      const name = (isEs ? card.getAttribute("data-name-es") : card.getAttribute("data-name-en")) || "";
      const desc = (isEs ? card.getAttribute("data-desc-es") : card.getAttribute("data-desc-en")) || "";

      const matchesCategory = filter === "all" || cat === filter;
      const matchesSearch =
        !term ||
        name.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term);

      card.style.display = matchesCategory && matchesSearch ? "flex" : "none";
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (cardContainer) {
    cardContainer.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link || !cardContainer.contains(link)) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Only intercept wizard routes, but do not consume RR here
      if (!isApplicationFlowHref(href)) return;

      e.preventDefault();
      window.location.href = href;
    });
  }

  setTimeout(applyFilters, 200);

  window.addEventListener("aces:language-changed", applyFilters);
  window.addEventListener("storage", (e) => {
    if (e.key === "acesLang") applyFilters();
  });
});
