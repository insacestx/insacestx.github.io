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
    const isEs = currentLang === "es";

    const apps = Object.keys(manifest).map(id => ({ id, ...manifest[id] }));

    if (!apps.length) {
      container.innerHTML = `<div class="apps-empty">
        ${isEs ? "No hay solicitudes disponibles en este momento." : "No applications are available at this time."}
      </div>`;
      return;
    }

    const getAssetPath = (p) => {
      if (!p) return `${base}/img/icons/default.svg`;
      return p.startsWith("/") ? `${base}${p}` : `${base}/${p}`;
    };

    const getCategoryLabel = (cat) => {
      const map = {
        personal: { en: "Personal", es: "Personal" },
        commercial: { en: "Commercial", es: "Comercial" },
        life: { en: "Life & Family", es: "Vida y Familia" }
      };
      return (map[cat] && (isEs ? map[cat].es : map[cat].en)) || cat;
    };

    container.innerHTML = "";

    apps.forEach(app => {
      const card = document.createElement("article");
      card.className = "app-card";
      card.setAttribute("data-category", app.category || "");
      card.setAttribute("data-name-en", app.name_en || "");
      card.setAttribute("data-name-es", app.name_es || "");
      card.setAttribute("data-desc-en", app.description_en || "");
      card.setAttribute("data-desc-es", app.description_es || "");

      const header = document.createElement("div");
      header.className = "app-card-header";

      const iconWrap = document.createElement("div");
      iconWrap.className = "app-card-icon-wrap";

      const icon = document.createElement("img");
      icon.className = "app-card-icon";
      icon.src = getAssetPath(app.icon);
      icon.alt = isEs ? (app.name_es || app.name_en) : (app.name_en || "");
      icon.onerror = () => {
        icon.src = `${base}/img/icons/default.svg`;
      };

      iconWrap.appendChild(icon);

      const headerText = document.createElement("div");

      const title = document.createElement("h3");
      title.className = "app-card-title";
      title.textContent = isEs ? (app.name_es || app.name_en) : (app.name_en || app.name_es);

      const cat = document.createElement("div");
      cat.className = "app-card-category";
      cat.textContent = getCategoryLabel(app.category);

      headerText.appendChild(title);
      headerText.appendChild(cat);

      header.appendChild(iconWrap);
      header.appendChild(headerText);

      const body = document.createElement("p");
      body.className = "app-card-body";
      body.textContent = isEs
        ? (app.description_es || app.description_en)
        : (app.description_en || app.description_es);

      const footer = document.createElement("div");
      footer.className = "app-card-footer";

      const chip = document.createElement("span");
      chip.className = "app-chip";
      chip.textContent = isEs ? "Solicitud en línea" : "Online application";

      const btn = document.createElement("a");
      btn.className = "app-card-btn";
      btn.href = `${base}/wizard.html?app=${encodeURIComponent(app.id)}`;
      btn.textContent = isEs ? "Comenzar solicitud" : "Start application";

      footer.appendChild(chip);
      footer.appendChild(btn);

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(footer);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading applications:", err);
    const isEs = (localStorage.getItem("acesLang") || "en") === "es";
    container.innerHTML = `<div class="apps-empty">
      ${isEs
        ? "No se pudieron cargar las solicitudes. Intente de nuevo más tarde."
        : "Unable to load applications. Please try again later."}
    </div>`;
  }
});
