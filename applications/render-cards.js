document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("app-card-container");
  if (!container) return;

  try {
    const path = window.location.pathname;
    const base = path.includes("insacestx.github.io") ? "/insacestx.github.io" : "";

    const response = await fetch(`${base}/applications/manifest.json`);
    if (!response.ok) throw new Error(`Failed to load manifest: ${response.status}`);

    const manifest = await response.json();
    const currentLang = localStorage.getItem("acesLang") || "en";

    const categories = { personal: [], commercial: [], life: [] };

    Object.keys(manifest).forEach(key => {
      const app = manifest[key];
      if (categories[app.category]) {
        categories[app.category].push({ id: key, ...app });
      }
    });

    const getAssetPath = (path) => {
      if (!path) return `${base}/img/icons/default.svg`;
      return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
    };

    for (const [categoryKey, apps] of Object.entries(categories)) {
      if (apps.length === 0) continue;

      const section = document.createElement("section");
      section.className = "services-section fade-in";

      const title = document.createElement("h2");
      title.textContent = getCategoryTitle(categoryKey, currentLang);
      section.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "services-grid";

      apps.forEach(app => {
        const box = document.createElement("div");
        box.className = "service-box";
        box.setAttribute("data-category", app.category);

        const icon = document.createElement("img");
        icon.src = getAssetPath(app.icon);
        icon.alt = currentLang === "es" ? app.name_es : app.name_en;

        const name = document.createElement("h3");
        name.textContent = currentLang === "es" ? app.name_es : app.name_en;

        const desc = document.createElement("p");
        desc.textContent = currentLang === "es" ? app.description_es : app.description_en;

        const btn = document.createElement("a");
        btn.className = "service-btn";
        btn.href = `${base}/wizard.html?app=${encodeURIComponent(app.id)}`;
        btn.textContent = currentLang === "es" ? "Comenzar" : "Start Application";

        box.append(icon, name, desc, btn);
        grid.appendChild(box);
      });

      section.appendChild(grid);
      container.appendChild(section);
    }
  } catch (error) {
    console.error("Error loading applications:", error);
    container.innerHTML = `
      <p style="color:#d32f2f; font-weight:600; padding: 3rem 1rem; text-align:center;">
        Unable to load applications. Please try again later.
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
