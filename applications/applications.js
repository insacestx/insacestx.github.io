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

  function isApplicationFlowHref(href) {
    if (!href) return false;

    const cleanHref = String(href).trim();
    const lower = cleanHref.toLowerCase();

    if (
      lower.startsWith("#") ||
      lower.startsWith("javascript:") ||
      lower.startsWith("mailto:") ||
      lower.startsWith("tel:")
    ) {
      return false;
    }

    try {
      const u = new URL(cleanHref, window.location.href);
      const path = (u.pathname || "").toLowerCase();
      return path.endsWith("/wizard.html") || path.endsWith("wizard.html");
    } catch {
      return lower.includes("wizard.html");
    }
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

  // Keep routing simple: no RR assignment here.
  // Wizard handles assignment exactly once at submit-time.
  if (cardContainer) {
    cardContainer.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link || !cardContainer.contains(link)) return;

      const href = link.getAttribute("href");
      if (!href) return;
      if (!isApplicationFlowHref(href)) return;

      e.preventDefault();
      const target = new URL(href, window.location.href);
      window.location.href = target.toString();
    });
  }

  // Optional hook for render-cards.js to trigger re-filter after rebuild
  window.refreshApplicationsFilters = applyFilters;

  setTimeout(applyFilters, 200);

  window.addEventListener("aces:language-changed", applyFilters);
  window.addEventListener("storage", (e) => {
    if (e.key === "acesLang") applyFilters();
  });
});
