document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".apps-filter-btn");
  const searchInput = document.getElementById("appSearch");
  const cardContainer = document.getElementById("app-card-container");
  const cards = () => Array.from(document.querySelectorAll(".app-card"));

  const OFFICE_EMAIL = "office@insaces.com";

  function normalizeLang(v) {
    const x = String(v || "").trim().toLowerCase();
    return x === "es" || x === "spanish" ? "es" : "en";
  }

  const getLang = () => normalizeLang(localStorage.getItem("acesLang") || "en");

  function getAssignment(lang) {
    const nLang = normalizeLang(lang);

    if (window.acesRoundRobin?.getNextAssignment) {
      const a = window.acesRoundRobin.getNextAssignment(nLang) || {};
      return {
        email: String(a.email || OFFICE_EMAIL).toLowerCase().trim(),
        lang: normalizeLang(a.lang || nLang),
        assignedIndex: Number.isInteger(a.assignedIndex) ? a.assignedIndex : -1,
        assignedAt: new Date().toISOString()
      };
    }

    return {
      email: OFFICE_EMAIL,
      lang: nLang,
      assignedIndex: -1,
      assignedAt: new Date().toISOString()
    };
  }

  function withRoutingParams(href, assignment) {
    try {
      const url = new URL(href, window.location.origin);
      url.searchParams.set("rrEmail", assignment.email);
      url.searchParams.set("rrLang", assignment.lang);
      url.searchParams.set("rrAssignedAt", assignment.assignedAt);
      url.searchParams.set("rrIndex", String(assignment.assignedIndex));
      return url.toString();
    } catch {
      return href;
    }
  }

  // Only assign Round Robin for wizard flow destinations
  function isApplicationFlowHref(href) {
    if (!href) return false;

    const cleanHref = String(href).trim().toLowerCase();

    // Ignore non-navigation links
    if (
      cleanHref.startsWith("#") ||
      cleanHref.startsWith("javascript:") ||
      cleanHref.startsWith("mailto:") ||
      cleanHref.startsWith("tel:")
    ) {
      return false;
    }

    // Resolve relative/absolute safely
    let path = "";
    try {
      const u = new URL(cleanHref, window.location.origin);
      path = (u.pathname || "").toLowerCase();
    } catch {
      path = cleanHref;
    }

    // Strict wizard route match
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
    searchInput.addEventListener("input", () => {
      applyFilters();
    });
  }

  // Delegated routing handler (works for dynamically rendered cards)
  if (cardContainer) {
    cardContainer.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link || !cardContainer.contains(link)) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Do NOT consume RR turn for non-wizard links
      if (!isApplicationFlowHref(href)) return;

      e.preventDefault();

      const assignment = getAssignment(getLang());
      const routedUrl = withRoutingParams(href, assignment);
      window.location.href = routedUrl;
    });
  }

  // Ensure first render pass applies filters after cards load
  setTimeout(applyFilters, 200);

  // Optional: keep filters synced if language changes in same tab
  window.addEventListener("aces:language-changed", applyFilters);
  window.addEventListener("storage", (e) => {
    if (e.key === "acesLang") applyFilters();
  });
});
