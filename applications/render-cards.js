let __appsManifestCache = null;

function isProjectSite() {
  const segs = window.location.pathname.split("/").filter(Boolean);
  return window.location.hostname.endsWith(".github.io") && segs.length > 0 && segs[0] !== "index.html";
}

function getBasePath() {
  if (!window.location.hostname.endsWith(".github.io")) return "";
  if (!isProjectSite()) return "";
  const segs = window.location.pathname.split("/").filter(Boolean);
  return `/${segs[0]}`;
}

function appUrl(pathFromRoot) {
  const clean = String(pathFromRoot || "").replace(/^\/+/, "");
  return `${window.location.origin}${getBasePath()}/${clean}`;
}

function getCurrentLang() {
  return localStorage.getItem("acesLang") || "en";
}

function getCategoryLabel(cat, isEs) {
  const map = {
    personal: { en: "Personal", es: "Personal" },
    commercial: { en: "Commercial", es: "Comercial" },
    life: { en: "Life & Family", es: "Vida y Familia" }
  };
  return (map[cat] && (isEs ? map[cat].es : map[cat].en)) || cat || "";
}

function getAssetPath(p) {
  if (!p) return appUrl("img/icons/default.svg");
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (p.startsWith("/")) return `${getBasePath()}${p}`;
  return appUrl(p);
}

/**
 * Normalize all app links to wizard route when needed:
 * - If manifest page already includes app=..., preserve it
 * - If it points to wizard.html without app param, add ?app=<appId>
 * - If it points to legacy per-app html, convert to wizard.html?app=<appId>
 */
function buildAppHref(appId, page) {
  const fallback = `wizard.html?app=${encodeURIComponent(appId)}`;

  if (!page || typeof page !== "string" || !page.trim()) {
    return appUrl(fallback);
  }

  const clean = page.trim();

  let u;
  try {
    u = new URL(clean, window.location.href);
  } catch {
    return appUrl(fallback);
  }

  const pathname = (u.pathname || "").toLowerCase();
  const file = pathname.split("/").pop() || "";

  const isWizard = file === "wizard.html";
  const hasAppParam = u.searchParams.has("app") && String(u.searchParams.get("app") || "").trim() !== "";

  if (isWizard) {
    if (!hasAppParam) u.searchParams.set("app", appId);
    return u.toString();
  }

  // Any non-wizard app page gets normalized to wizard route
  return appUrl(`wizard.html?app=${encodeURIComponent(appId)}`);
}

function buildCards(container, manifest) {
  const currentLang = getCurrentLang();
  const isEs = currentLang === "es";

  const apps = Object.keys(manifest).map((id) => ({ id, ...manifest[id] }));

  if (!apps.length) {
    container.innerHTML = `<div class="apps-empty">
      ${isEs ? "No hay solicitudes disponibles en este momento." : "No applications are available at this time."}
    </div>`;
    return;
  }

  container.innerHTML = "";

  apps.forEach((app) => {
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
    icon.alt = isEs ? (app.name_es || app.name_en || "") : (app.name_en || app.name_es || "");
    icon.onerror = function () {
      if (!this.dataset.errorHandled) {
        this.dataset.errorHandled = "true";
        this.src = appUrl("img/icons/default.svg");
      }
    };
    iconWrap.appendChild(icon);

    const headerText = document.createElement("div");

    const title = document.createElement("h3");
    title.className = "app-card-title";
    title.textContent = isEs ? (app.name_es || app.name_en || "") : (app.name_en || app.name_es || "");

    const cat = document.createElement("div");
    cat.className = "app-card-category";
    cat.textContent = getCategoryLabel(app.category, isEs);

    headerText.appendChild(title);
    headerText.appendChild(cat);

    header.appendChild(iconWrap);
    header.appendChild(headerText);

    const body = document.createElement("p");
    body.className = "app-card-body";
    body.textContent = isEs
      ? (app.description_es || app.description_en || "")
      : (app.description_en || app.description_es || "");

    const footer = document.createElement("div");
    footer.className = "app-card-footer";

    const chip = document.createElement("span");
    chip.className = "app-chip";
    chip.textContent = isEs ? "Solicitud en línea" : "Online application";

    const btn = document.createElement("a");
    btn.className = "app-card-btn";
    btn.href = buildAppHref(app.id, app.page);

    btn.textContent = isEs ? "Comenzar solicitud" : "Start application";
    btn.setAttribute(
      "aria-label",
      isEs
        ? `Comenzar solicitud: ${app.name_es || app.name_en || "Aplicación"}`
        : `Start application: ${app.name_en || app.name_es || "Application"}`
    );

    footer.appendChild(chip);
    footer.appendChild(btn);

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);

    container.appendChild(card);
  });

  if (typeof window.refreshApplicationsFilters === "function") {
    window.refreshApplicationsFilters();
  }
}

async function renderCards() {
  const container = document.getElementById("app-card-container");
  if (!container) return;

  try {
    if (!__appsManifestCache) {
      const response = await fetch(appUrl("applications/manifest.json"), { cache: "no-store" });
      if (!response.ok) throw new Error(`Failed to load manifest: ${response.status}`);
      __appsManifestCache = await response.json();
    }

    buildCards(container, __appsManifestCache);
  } catch (err) {
    console.error("Error loading applications:", err);
    const isEs = getCurrentLang() === "es";
    container.innerHTML = `<div class="apps-empty">
      ${isEs
        ? "No se pudieron cargar las solicitudes. Intente de nuevo más tarde."
        : "Unable to load applications. Please try again later."}
    </div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

window.addEventListener("aces:language-changed", () => {
  renderCards();
});

window.addEventListener("storage", (e) => {
  if (e.key === "acesLang") renderCards();
});
