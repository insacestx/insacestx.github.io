// render-cards.js
// Dynamically generates all application cards using manifest.json

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("app-card-container");
  if (!container) return;

  try {
    const response = await fetch("/applications/manifest.json");
    const manifest = await response.json();

    const currentLang = localStorage.getItem("aces_lang") || "en";

    // Group apps by category
    const categories = {
      personal: [],
      commercial: [],
      life: []
    };

    for (const key in manifest) {
      const app = manifest[key];
      categories[app.category].push({ id: key, ...app });
    }

    // Render each category section
    for (const category in categories) {
      if (categories[category].length === 0) continue;

      const section = document.createElement("section");
      section.className = "app-category-section fade-in";

      const title = document.createElement("h2");
      title.className = "app-category-title";

      title.textContent =
        category === "personal"
          ? currentLang === "es" ? "Seguros Personales" : "Personal Insurance"
          : category === "commercial"
          ? currentLang === "es" ? "Seguros Comerciales" : "Commercial Insurance"
          : currentLang === "es" ? "Vida y Familia" : "Life & Family";

      section.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "app-card-grid";

      // Build cards
      categories[category].forEach(app => {
        const card = document.createElement("div");
        card.className = "app-card";

        // Icon
        const icon = document.createElement("img");
        icon.className = "app-card-icon";
        icon.src = app.icon || "/img/icons/default.svg";
        icon.alt = app.name_en;
        card.appendChild(icon);

        // Title
        const title = document.createElement("h3");
        title.className = "app-card-title";
        title.textContent = currentLang === "es" ? app.name_es : app.name_en;
        card.appendChild(title);

        // Description
        const desc = document.createElement("p");
        desc.className = "app-card-desc";
        desc.textContent =
          currentLang === "es" ? app.description_es : app.description_en;
        card.appendChild(desc);

        // CTA
        const link = document.createElement("a");
        link.className = "app-card-btn";
        link.href = app.page;
        link.textContent =
          currentLang === "es" ? "Comenzar" : "Start Application";
        card.appendChild(link);

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    }
  } catch (error) {
    console.error("Error loading manifest.json:", error);
    container.innerHTML = `
      <p style="color:#d32f2f; font-weight:600;">
        Unable to load applications. Please try again later.
      </p>`;
  }
});
