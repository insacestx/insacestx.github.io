document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("app-card-container");
  if (!container) return;

  try {
    // Better base path detection
    const path = window.location.pathname;
    const base = path.includes("/insacestx.github.io") 
      ? "/insacestx.github.io" 
      : "";

    const response = await fetch(`${base}/applications/manifest.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const manifest = await response.json();
    const currentLang = localStorage.getItem("aces_lang") || "en";

    const categories = { personal: [], commercial: [], life: [] };

    Object.keys(manifest).forEach(key => {
      const app = manifest[key];
      if (categories[app.category]) {
        categories[app.category].push({ id: key, ...app });
      }
    });

    // Helper
    const getAssetPath = (p) => p?.startsWith('/') ? `${base}${p}` : `${base}/${p || ''}`;

    for (const [category, apps] of Object.entries(categories)) {
      if (apps.length === 0) continue;

      const section = document.createElement("section");
      section.className = "app-category-section fade-in";

      const title = document.createElement("h2");
      title.className = "app-category-title";
      title.textContent = getCategoryTitle(category, currentLang);
      section.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "app-card-grid";

      apps.forEach(app => {
        const card = document.createElement("div");
        card.className = "app-card";
        card.setAttribute("data-category", app.category);

        // Icon with fallback
        const icon = document.createElement("img");
        icon.className = "app-card-icon";
        icon.src = getAssetPath(app.icon);
        icon.alt = currentLang === "es" ? app.name_es : app.name_en;
        icon.onerror = () => { icon.src = `${base}/img/icons/default.svg`; };

        const cardTitle = document.createElement("h3");
        cardTitle.className = "app-card-title";
        cardTitle.textContent = currentLang === "es" ? app.name_es : app.name_en;

        const desc = document.createElement("p");
        desc.className = "app-card-desc";
        desc.textContent = currentLang === "es" 
          ? (app.description_es || app.description_en) 
          : (app.description_en || app.description_es);

        const link = document.createElement("a");
        link.className = "app-card-btn";
        link.href = `${base}/wizard.html?app=${encodeURIComponent(app.id)}`;
        link.textContent = currentLang === "es" ? "Comenzar" : "Start Application";

        card.append(icon, cardTitle, desc, link);
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    }
  } catch (error) {
    console.error("Error loading manifest.json:", error);
    container.innerHTML = `
      <p style="color:#d32f2f; font-weight:600; padding: 2rem; text-align:center;">
        Unable to load applications. Please try again later.<br>
        <small>${error.message}</small>
      </p>`;
  }
});

function getCategoryTitle(cat, lang) {
  const titles = {
    personal: { en: "Personal Insurance", es: "Seguros Personales" },
    commercial: { en: "Commercial Insurance", es: "Seguros Comerciales" },
    life: { en: "Life & Family", es: "Vida y Familia" }
  };
  return titles[cat]?.[lang] || titles[cat]?.en || cat;
}
