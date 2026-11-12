/* ==========================================
   ACES 2026 UNIVERSAL WIZARD ENGINE (BILINGUAL)
   FORM SUBMIT BUILD (NO MAILTO)
========================================== */

let wizardConfig = null;
let currentStep = 0;
let formData = {};
let reviewMode = false;

/* ==========================================
   ROUND ROBIN (SHARED ENGINE)
========================================== */
function normalizeLang(lang) {
  const v = String(lang || "").trim().toLowerCase();
  if (!v) return "en";
  if (v === "es" || v === "spanish" || v === "espanol" || v === "español") return "es";
  if (v === "en" || v === "english" || v === "ingles" || v === "inglés") return "en";
  return "en";
}

function toRoutingLang(value) {
  const v = String(value || "").trim().toLowerCase();
  if (!v) return null;
  if (v === "es" || v === "spanish" || v === "espanol" || v === "español") return "es";
  if (v === "en" || v === "english" || v === "ingles" || v === "inglés") return "en";
  return null;
}

function getRoutingLanguageFromData(data) {
  const candidates = [
    data?.preferredLanguage,
    data?.preferredAgentLanguage,
    data?.language,
    data?.Language,
    data?.idioma,
    data?.lenguaje
  ];

  for (const candidate of candidates) {
    const routed = toRoutingLang(candidate);
    if (routed) return routed;
  }

  return normalizeLang(getCurrentLang());
}

/* Kept for compatibility/debug; submit flow no longer rotates if URL assignment is missing */
function getRoundRobinAssignment(lang) {
  const n = normalizeLang(lang);

  if (window.acesRoundRobin?.getNextAssignment) {
    const assignment = window.acesRoundRobin.getNextAssignment(n);
    if (assignment?.email) return assignment;
  }

  console.warn("acesRoundRobin engine missing; office fallback routing engaged.");
  return {
    email: "office@insaces.com",
    lang: n,
    assignedIndex: -1,
    nextIndex: -1,
    assignedAt: new Date().toISOString()
  };
}

/* Read assignment passed from applications page */
function getAssignmentFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const rrEmail = String(params.get("rrEmail") || "").trim().toLowerCase();
  const rrLang = toRoutingLang(params.get("rrLang"));
  const rrIndexRaw = params.get("rrIndex");
  const rrAssignedAt = String(params.get("rrAssignedAt") || "").trim();

  if (!rrEmail) return null;

  const rrIndex = Number(rrIndexRaw);
  return {
    email: rrEmail,
    lang: rrLang || normalizeLang(getCurrentLang()),
    assignedIndex: Number.isInteger(rrIndex) ? rrIndex : -1,
    assignedAt: rrAssignedAt || new Date().toISOString(),
    source: "url"
  };
}

/* Optional admin helper */
function resetRoundRobin(enIndex = 0, esIndex = 0) {
  if (window.acesRoundRobin?.reset) {
    window.acesRoundRobin.reset(enIndex, esIndex);
    return;
  }
  console.warn("acesRoundRobin.reset unavailable.");
}
window.resetRoundRobin = resetRoundRobin;

/* Language helpers */
function getCurrentLang() {
  return localStorage.getItem("acesLang") || "en";
}

function isSpanish() {
  return getCurrentLang() === "es";
}

/* Button text map (Formal MX/LatAm) */
function getText(key) {
  const es = isSpanish();
  const map = {
    next: es ? "Siguiente" : "Next",
    back: es ? "Regresar" : "Back",
    review: es ? "Revisar" : "Review",
    submit: es ? "Enviar Solicitud" : "Submit Application",
    reviewTitle: es ? "Revise su Información" : "Review Your Information",
    configError: es ? "Error al cargar la configuración de la solicitud." : "Error loading application configuration.",
    noAppType: es ? "No se especificó el tipo de solicitud." : "No application type specified.",
    loading: es ? "Cargando solicitud..." : "Loading application...",
    minSelectPrefix: es ? "Seleccione al menos" : "Select at least"
  };
  return map[key] || key;
}

/* Path helpers for user-site GitHub Pages */
function getBasePath() {
  return "";
}

function appUrl(pathFromRoot) {
  const clean = String(pathFromRoot || "").replace(/^\/+/, "");
  return `${window.location.origin}/${clean}`;
}

/* Safe navigation helper */
function applicationsHomeUrl() {
  return appUrl("applications.html");
}

/* Detect application type */
function getAppType() {
  const params = new URLSearchParams(window.location.search);

  let type =
    params.get("app") ||
    params.get("type") ||
    params.get("application") ||
    "";

  type = (type || "").toLowerCase().trim();
  if (type) return type;

  const path = (window.location.pathname || "").toLowerCase();
  const file = path.split("/").pop() || "";
  const slug = file.replace(".html", "").trim();

  const map = {
    "commercial-auto": "commercialauto",
    "commercial-trucking": "commercialtrucking",
    "commercial-property": "commercialproperty",
    "commercial-umbrella": "commercialumbrella"
  };

  return map[slug] || slug || null;
}

/* Helpers */
const DROPDOWN_PRESETS = {
  "deductible-standard": [
    { value: "250", label_en: "$250", label_es: "$250" },
    { value: "500", label_en: "$500", label_es: "$500" },
    { value: "1000", label_en: "$1,000", label_es: "$1,000" },
    { value: "2500", label_en: "$2,500", label_es: "$2,500" }
  ],
  "deductible-extended": [
    { value: "250", label_en: "$250", label_es: "$250" },
    { value: "500", label_en: "$500", label_es: "$500" },
    { value: "1000", label_en: "$1,000", label_es: "$1,000" },
    { value: "2500", label_en: "$2,500", label_es: "$2,500" },
    { value: "5000", label_en: "$5,000", label_es: "$5,000" },
    { value: "10000", label_en: "$10,000", label_es: "$10,000" }
  ],
  "liability-split-standard": [
    { value: "30/60/25", label_en: "30/60/25", label_es: "30/60/25" },
    { value: "50/100/50", label_en: "50/100/50", label_es: "50/100/50" },
    { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" },
    { value: "250/500/100", label_en: "250/500/100", label_es: "250/500/100" }
  ],
  "liability-limit-personal": [
    { value: "100000", label_en: "$100,000", label_es: "$100,000" },
    { value: "300000", label_en: "$300,000", label_es: "$300,000" },
    { value: "500000", label_en: "$500,000", label_es: "$500,000" },
    { value: "1000000", label_en: "$1,000,000", label_es: "$1,000,000" }
  ],
  "liability-limit-commercial": [
    { value: "300000", label_en: "$300,000", label_es: "$300,000" },
    { value: "500000", label_en: "$500,000", label_es: "$500,000" },
    { value: "750000", label_en: "$750,000", label_es: "$750,000" },
    { value: "1000000", label_en: "$1,000,000", label_es: "$1,000,000" }
  ],
  "term-length-standard": [
    { value: "10", label_en: "10 Years", label_es: "10 Años" },
    { value: "15", label_en: "15 Years", label_es: "15 Años" },
    { value: "20", label_en: "20 Years", label_es: "20 Años" },
    { value: "25", label_en: "25 Years", label_es: "25 Años" },
    { value: "30", label_en: "30 Years", label_es: "30 Años" }
  ],
  "state-texas-only": [
    { value: "TX", label_en: "Texas", label_es: "Texas" }
  ]
};

const COMMERCIAL_DRIVER_FIELDS = [
  { key: "name", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
  { key: "dob", label_en: "Date of Birth", label_es: "Fecha de Nacimiento", type: "date", required: true },
  { key: "licenseState", label_en: "License State", label_es: "Estado de Licencia", type: "select", optionsPreset: "state-texas-only", required: true },
  {
    key: "cdlClass",
    label_en: "CDL Class",
    label_es: "Clase CDL",
    type: "select",
    required: true,
    options: [
      { value: "", label_en: "Select...", label_es: "Seleccione..." },
      { value: "A", label_en: "Class A", label_es: "Clase A" },
      { value: "B", label_en: "Class B", label_es: "Clase B" },
      { value: "C", label_en: "Class C", label_es: "Clase C" }
    ]
  },
  { key: "yearsExperience", label_en: "Years of Experience", label_es: "Años de Experiencia", type: "number", required: true }
];

function valueToText(v) {
  if (Array.isArray(v)) {
    if (!v.length) return "";
    if (v.every((item) => item == null || ["string", "number", "boolean"].includes(typeof item))) {
      return v.map((item) => String(item ?? "")).join(", ");
    }
    return v
      .map((item, index) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const body = Object.entries(item)
            .filter(([, val]) => String(val ?? "").trim() !== "")
            .map(([key, val]) => `${key}: ${String(val ?? "").trim()}`)
            .join("; ");
          return body ? `${index + 1}) ${body}` : `${index + 1})`;
        }
        return `${index + 1}) ${String(item ?? "")}`;
      })
      .join(" | ");
  }

  if (v && typeof v === "object") {
    return Object.entries(v)
      .map(([key, val]) => `${key}: ${valueToText(val)}`)
      .join("; ");
  }

  return v == null ? "" : String(v);
}

function cloneOptions(options) {
  return options.map((opt) => ({ ...opt }));
}

function hasPlaceholderOption(options) {
  return options.some((opt) => String(opt?.value ?? "") === "");
}

function getPresetKey(field) {
  return (
    field?.optionsPreset ||
    field?.dropdownPreset ||
    (typeof field?.preset === "string" ? field.preset : "")
  );
}

function getResolvedFieldOptions(field) {
  const inlineOptions = Array.isArray(field?.options) ? cloneOptions(field.options) : [];
  const presetKey = getPresetKey(field);
  const presetOptions = presetKey && DROPDOWN_PRESETS[presetKey] ? cloneOptions(DROPDOWN_PRESETS[presetKey]) : null;

  const usePreset = Boolean(presetOptions) && (inlineOptions.length === 0 || field?.presetOverridesOptions);
  const resolved = usePreset ? presetOptions : inlineOptions;

  if (!resolved.length) return [];
  if (field?.includeSelectOption === false || hasPlaceholderOption(resolved)) return resolved;
  return [{ value: "", label_en: "Select...", label_es: "Seleccione..." }, ...resolved];
}

function getTodayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shouldShowTodayButton(field) {
  if (field?.showTodayButton || field?.todayButton) return true;
  const haystack = `${field?.id || ""} ${field?.label_en || ""} ${field?.label_es || ""}`.toLowerCase();
  return haystack.includes("effective") || haystack.includes("efectiva") || haystack.includes("vigencia");
}

function buildTodayButton(inputEl, useEs) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "wizard-btn back";
  btn.textContent = useEs ? "Hoy" : "Today";
  btn.style.padding = "8px 12px";
  btn.style.borderRadius = "8px";
  btn.style.minWidth = "84px";
  btn.addEventListener("click", () => {
    inputEl.value = getTodayISODate();
    inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    inputEl.dispatchEvent(new Event("change", { bubbles: true }));
  });
  return btn;
}

function getCheckboxValues(groupEl) {
  if (!groupEl) return [];
  return [...groupEl.querySelectorAll("input[type='checkbox']:checked")].map((cb) => cb.value);
}

function getFieldValue(field) {
  if (!field?.id) return "";
  if (field.type === "checkbox-group") {
    const saved = formData[field.id];
    return Array.isArray(saved) ? saved : [];
  }
  const el = document.getElementById(field.id);
  if (!el) return formData[field.id] ?? "";
  return el.value ?? "";
}

function isCommercialTruckingDriverStep(step) {
  return getAppType() === "commercialtrucking" && step?.id === "drivers";
}

function buildDriverDetailFieldId(index, key) {
  return `driverDetail_${index}_${key}`;
}

function getCommercialDriverCount() {
  const raw = formData?.numDrivers ?? "";
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, 25);
}

function normalizeCommercialDriverDetails(count) {
  const current = Array.isArray(formData.driverDetails) ? formData.driverDetails : [];
  const next = [];

  for (let i = 0; i < count; i += 1) {
    const row = current[i];
    next.push(row && typeof row === "object" ? { ...row } : {});
  }

  formData.driverDetails = next;
  return next;
}

function syncCommercialDriverDetailsFromInputs() {
  const count = getCommercialDriverCount();
  if (!formData.driverDetailsEnabled || count === 0) return;

  const details = normalizeCommercialDriverDetails(count);

  details.forEach((item, index) => {
    COMMERCIAL_DRIVER_FIELDS.forEach((field) => {
      const el = document.getElementById(buildDriverDetailFieldId(index, field.key));
      if (el) item[field.key] = el.value;
    });
  });

  formData.driverDetails = details;
}

function renderCommercialDriverRepeater(root, useEs) {
  if (!root) return;
  root.innerHTML = "";

  if (formData.driverDetailsEnabled == null) {
    formData.driverDetailsEnabled = true;
  }

  const enabled = Boolean(formData.driverDetailsEnabled);
  const count = getCommercialDriverCount();

  const toggleWrap = document.createElement("label");
  toggleWrap.style.display = "flex";
  toggleWrap.style.alignItems = "center";
  toggleWrap.style.gap = "8px";
  toggleWrap.style.marginBottom = "8px";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = enabled;
  toggle.addEventListener("change", () => {
    formData.driverDetailsEnabled = toggle.checked;
    renderCommercialDriverRepeater(root, useEs);
  });

  const toggleText = document.createElement("span");
  toggleText.textContent = useEs
    ? "Agregar detalle individual de conductores"
    : "Add detailed driver records";

  toggleWrap.appendChild(toggle);
  toggleWrap.appendChild(toggleText);
  root.appendChild(toggleWrap);

  const hint = document.createElement("small");
  hint.className = "wizard-help";
  hint.style.color = "#6b7280";
  hint.textContent = useEs
    ? "Use el número de conductores para generar bloques de detalle."
    : "Use the number of drivers to generate driver detail blocks.";
  root.appendChild(hint);

  if (!enabled || count === 0) return;

  const details = normalizeCommercialDriverDetails(count);

  const groups = document.createElement("div");
  groups.style.display = "grid";
  groups.style.gap = "12px";
  groups.style.marginTop = "10px";

  details.forEach((item, index) => {
    const group = document.createElement("div");
    group.style.border = "1px solid rgba(212, 0, 0, 0.14)";
    group.style.borderRadius = "10px";
    group.style.padding = "12px";
    group.style.background = "#fff";

    const heading = document.createElement("div");
    heading.style.fontWeight = "700";
    heading.style.marginBottom = "10px";
    heading.style.color = "#1f2937";
    heading.textContent = `${useEs ? "Conductor" : "Driver"} ${index + 1}`;
    group.appendChild(heading);

    COMMERCIAL_DRIVER_FIELDS.forEach((field) => {
      const row = document.createElement("div");
      row.className = "wizard-field";
      row.style.marginBottom = "12px";

      const label = document.createElement("label");
      const fieldLabel = useEs ? (field.label_es || field.label_en || field.key) : (field.label_en || field.key);
      label.textContent = field.required ? `${fieldLabel} *` : fieldLabel;
      row.appendChild(label);

      let inputEl;
      if (field.type === "select") {
        inputEl = document.createElement("select");
        getResolvedFieldOptions(field).forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = useEs
            ? (opt.label_es || opt.label_en || opt.label || opt.value)
            : (opt.label_en || opt.label || opt.value);
          inputEl.appendChild(option);
        });
      } else {
        inputEl = document.createElement("input");
        inputEl.type = field.type || "text";
      }

      inputEl.id = buildDriverDetailFieldId(index, field.key);
      inputEl.value = item[field.key] ?? "";

      inputEl.addEventListener("input", () => {
        item[field.key] = inputEl.value;
        formData.driverDetails[index] = { ...item };
      });

      inputEl.addEventListener("change", () => {
        item[field.key] = inputEl.value;
        formData.driverDetails[index] = { ...item };
      });

      row.appendChild(inputEl);
      group.appendChild(row);
    });

    groups.appendChild(group);
  });

  root.appendChild(groups);
}

function buildCommercialDriverRepeater(card, useEs) {
  const countInput = document.getElementById("numDrivers");
  if (!countInput) return;

  const wrap = document.createElement("div");
  wrap.className = "wizard-field";

  const root = document.createElement("div");
  root.id = "commercial-driver-repeater-root";
  wrap.appendChild(root);
  card.appendChild(wrap);

  if (!countInput.dataset.driverRepeaterBound) {
    countInput.addEventListener("input", () => {
      formData.numDrivers = countInput.value;
      renderCommercialDriverRepeater(root, useEs);
    });
    countInput.addEventListener("change", () => {
      formData.numDrivers = countInput.value;
      renderCommercialDriverRepeater(root, useEs);
    });
    countInput.dataset.driverRepeaterBound = "1";
  }

  renderCommercialDriverRepeater(root, useEs);
}

function validateCommercialDriverRepeater(step) {
  if (!isCommercialTruckingDriverStep(step)) return true;
  if (!formData.driverDetailsEnabled) return true;

  const count = getCommercialDriverCount();
  if (count === 0) return true;

  syncCommercialDriverDetailsFromInputs();

  let valid = true;
  const details = Array.isArray(formData.driverDetails) ? formData.driverDetails : [];

  for (let i = 0; i < count; i += 1) {
    const row = details[i] || {};

    COMMERCIAL_DRIVER_FIELDS.forEach((field) => {
      if (!field.required) return;

      const value = String(row[field.key] ?? "").trim();
      const el = document.getElementById(buildDriverDetailFieldId(i, field.key));

      if (!value) {
        valid = false;
        if (el) el.style.border = "2px solid red";
      } else if (el) {
        el.style.border = "";
      }
    });
  }

  return valid;
}

function getCommercialDriverDetailsReviewText(useEs) {
  if (!formData.driverDetailsEnabled) return "";
  const details = Array.isArray(formData.driverDetails) ? formData.driverDetails : [];
  if (!details.length) return "";

  return details
    .map((driver, idx) => {
      const parts = COMMERCIAL_DRIVER_FIELDS
        .map((field) => {
          const val = String(driver[field.key] ?? "").trim();
          if (!val) return "";
          const label = useEs ? (field.label_es || field.label_en || field.key) : (field.label_en || field.key);
          return `${label}: ${val}`;
        })
        .filter(Boolean);
      return `${useEs ? "Conductor" : "Driver"} ${idx + 1} (${parts.join(", ")})`;
    })
    .join(" | ");
}

/* Save current visible step values */
function persistCurrentStepData() {
  if (!wizardConfig || !wizardConfig.steps || reviewMode) return;
  const step = wizardConfig.steps[currentStep];
  if (!step || !step.fields) return;

  step.fields.forEach((field) => {
    if (field.type === "checkbox-group") {
      const group = document.getElementById(field.id);
      formData[field.id] = getCheckboxValues(group);
      return;
    }
    const el = document.getElementById(field.id);
    if (el) formData[field.id] = el.value;
  });

  if (isCommercialTruckingDriverStep(step)) {
    syncCommercialDriverDetailsFromInputs();
  }
}

/* Show loading state */
function showLoading() {
  const container = document.getElementById("wizard-container");
  if (container) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#666;">
        <p style="font-size:1.1rem; margin-bottom:10px;">${getText("loading")}</p>
        <div style="width:40px; height:40px; border:4px solid #f3f3f3; border-top:4px solid #d40000; border-radius:50%; margin:20px auto; animation:spin 1s linear infinite;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }
}

/* Show error state */
function showError(appType, errorMessage) {
  const container = document.getElementById("wizard-container");
  if (container) {
    container.innerHTML = `
      <div style="background:#fff; border:1px solid #fdd; border-radius:12px; padding:30px; max-width:600px; margin:0 auto;">
        <p style="color:#d40000; font-size:1.2rem; font-weight:600; margin-bottom:15px;">
          ${getText("configError")}
        </p>
        <p style="color:#666; font-size:0.95rem; margin-bottom:10px;">
          ${isSpanish() ? "Tipo de solicitud:" : "Application type:"} <strong>${appType || "(none)"}</strong>
        </p>
        <details style="margin-top:20px; padding:15px; background:#f9f9f9; border-radius:8px;">
          <summary style="cursor:pointer; font-weight:600; color:#555;">
            ${isSpanish() ? "Detalles técnicos" : "Technical Details"}
          </summary>
          <pre style="margin-top:10px; font-size:0.85rem; color:#666; overflow-x:auto;">${errorMessage}</pre>
        </details>
        <button onclick="window.location.href='${applicationsHomeUrl()}'" style="margin-top:20px; padding:10px 20px; background:#d40000; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
          ${isSpanish() ? "← Volver a Solicitudes" : "← Back to Applications"}
        </button>
      </div>
    `;
  }
}

/* Load config — MANIFEST‑DRIVEN */
async function loadConfig(appType) {
  try {
    const manifestUrl = appUrl("applications/manifest.json");
    const manifestRes = await fetch(manifestUrl, { cache: "no-store" });
    if (!manifestRes.ok) {
      throw new Error(`Manifest fetch failed: ${manifestRes.status} ${manifestRes.statusText} (${manifestUrl})`);
    }

    const manifest = await manifestRes.json();

    if (!manifest[appType]) {
      throw new Error(`Application '${appType}' not found in manifest. Available apps: ${Object.keys(manifest).join(", ")}`);
    }

    const configPath = manifest[appType].config;
    if (!configPath || typeof configPath !== "string") {
      throw new Error(`Missing/invalid config path for app '${appType}'.`);
    }

    const importUrl = new URL(configPath, window.location.href).href;
    const module = await import(importUrl);

    if (!module || !module.default) {
      throw new Error(`Config module has no default export: ${importUrl}`);
    }

    wizardConfig = module.default;

    if (!wizardConfig.steps || !Array.isArray(wizardConfig.steps)) {
      throw new Error(`Invalid wizard config format (steps missing/invalid): ${importUrl}`);
    }

    return true;
  } catch (err) {
    console.error("❌ Error loading config:", err);
    wizardConfig = null;
    showError(appType, err.message || String(err));
    return false;
  }
}

/* Init */
async function initWizard() {
  const appType = getAppType();

  if (!appType) {
    const container = document.getElementById("wizard-container");
    if (container) {
      container.innerHTML = `
        <div style="background:#fff; border:1px solid #fdd; border-radius:12px; padding:30px; max-width:600px; margin:0 auto; text-align:center;">
          <p style="color:#d40000; font-size:1.2rem; font-weight:600;">${getText("noAppType")}</p>
          <button onclick="window.location.href='${applicationsHomeUrl()}'" style="margin-top:20px; padding:10px 20px; background:#d40000; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
            ${isSpanish() ? "← Volver a Solicitudes" : "← Back to Applications"}
          </button>
        </div>
      `;
    }
    return;
  }

  showLoading();

  const success = await loadConfig(appType);
  if (!success || !wizardConfig) return;

  buildTabs();
  buildStep(0);
  updateProgress();
}

document.addEventListener("DOMContentLoaded", initWizard);

/* Re-render when language changes in another script/tab */
window.addEventListener("storage", (e) => {
  if (e.key !== "acesLang" || !wizardConfig) return;

  persistCurrentStepData();
  buildTabs();

  if (reviewMode) buildReview();
  else buildStep(currentStep);
});

/* Also respond to same-tab language changes dispatched by global.js */
window.addEventListener("aces:language-changed", () => {
  if (!wizardConfig) return;

  persistCurrentStepData();
  buildTabs();

  if (reviewMode) buildReview();
  else buildStep(currentStep);
});

/* Build Tabs */
function buildTabs() {
  const tabsContainer = document.getElementById("wizard-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";
  const useEs = isSpanish();

  wizardConfig.steps.forEach((step, index) => {
    const tab = document.createElement("div");
    tab.className = "wizard-tab";

    const title = useEs ? (step.title_es || step.title_en) : step.title_en;
    tab.textContent = title || step.title || `Step ${index + 1}`;

    tab.addEventListener("click", () => goToStep(index));
    tabsContainer.appendChild(tab);
  });

  setActiveTab(currentStep);
}

function setActiveTab(index) {
  document.querySelectorAll(".wizard-tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
}

/* Build Step */
function buildStep(index) {
  reviewMode = false;
  currentStep = index;

  const container = document.getElementById("wizard-container");
  if (!container) return;
  container.innerHTML = "";

  const step = wizardConfig.steps[index];
  const useEs = isSpanish();

  const card = document.createElement("div");
  card.className = "wizard-step-card";

  const title = document.createElement("div");
  title.className = "wizard-step-title";

  const stepTitle = useEs ? (step.title_es || step.title_en) : step.title_en;
  title.textContent = stepTitle || step.title || "";
  card.appendChild(title);

  step.fields.forEach((field) => {
    const wrap = document.createElement("div");
    wrap.className = "wizard-field";

    const label = document.createElement("label");
    const labelText = useEs ? (field.label_es || field.label_en) : field.label_en;
    const finalLabel = labelText || field.label || field.id || "";

    label.textContent = finalLabel + (field.required ? " *" : "");
    label.setAttribute("for", field.id);
    wrap.appendChild(label);

    let input;
    let appendedCustomInput = false;

    if (field.type === "select") {
      input = document.createElement("select");
      input.id = field.id;

      const options = getResolvedFieldOptions(field);
      options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt.value;
        const optLabel = useEs
          ? (opt.label_es || opt.label_en || opt.label)
          : (opt.label_en || opt.label);
        o.textContent = optLabel || opt.value;
        input.appendChild(o);
      });

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });
    } else if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.id = field.id;
      if (field.placeholder_en || field.placeholder_es) {
        input.placeholder = useEs
          ? (field.placeholder_es || field.placeholder_en || "")
          : (field.placeholder_en || "");
      }

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });
    } else if (field.type === "checkbox-group") {
      input = document.createElement("div");
      input.id = field.id;
      input.className = "wizard-checkbox-group";

      const selectedValues = Array.isArray(formData[field.id]) ? formData[field.id] : [];

      (field.options || []).forEach((opt, idx) => {
        const optId = `${field.id}_${idx}`;

        const item = document.createElement("label");
        item.className = "wizard-checkbox-item";
        item.setAttribute("for", optId);

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = optId;
        cb.value = opt.value;

        if (selectedValues.includes(opt.value)) cb.checked = true;

        cb.addEventListener("change", () => {
          const checked = getCheckboxValues(input);
          formData[field.id] = checked;

          if (input.classList.contains("invalid")) {
            const min = Number(field.minSelected || (field.required ? 1 : 0));
            if (checked.length >= min) input.classList.remove("invalid");
          }
        });

        const txt = document.createElement("span");
        txt.textContent = useEs
          ? (opt.label_es || opt.label_en || opt.label || opt.value)
          : (opt.label_en || opt.label || opt.value);

        item.appendChild(cb);
        item.appendChild(txt);
        input.appendChild(item);
      });

      if (!Array.isArray(formData[field.id])) formData[field.id] = selectedValues;

      if ((field.required || field.minSelected) && !wrap.querySelector(".wizard-help")) {
        const min = Number(field.minSelected || (field.required ? 1 : 0));
        if (min > 0) {
          const help = document.createElement("small");
          help.className = "wizard-help";
          help.style.color = "#6b7280";
          help.textContent = isSpanish()
            ? `Seleccione al menos ${min}.`
            : `Select at least ${min}.`;
          wrap.appendChild(help);
        }
      }
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
      input.id = field.id;

      if (field.placeholder_en || field.placeholder_es) {
        input.placeholder = useEs
          ? (field.placeholder_es || field.placeholder_en || "")
          : (field.placeholder_en || "");
      }

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });

      if (input.type === "date" && shouldShowTodayButton(field)) {
        const dateWrap = document.createElement("div");
        dateWrap.style.display = "flex";
        dateWrap.style.gap = "8px";
        dateWrap.style.alignItems = "center";
        dateWrap.appendChild(input);
        dateWrap.appendChild(buildTodayButton(input, useEs));
        wrap.appendChild(dateWrap);
        appendedCustomInput = true;
      }
    }

    if (!appendedCustomInput) {
      wrap.appendChild(input);
    }
    card.appendChild(wrap);
  });

  if (isCommercialTruckingDriverStep(step)) {
    buildCommercialDriverRepeater(card, useEs);
  }

  const btns = document.createElement("div");
  btns.className = "wizard-buttons";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "wizard-btn back";
  back.textContent = getText("back");
  back.disabled = index === 0;
  back.addEventListener("click", goBack);

  const next = document.createElement("button");
  next.type = "button";
  next.className = "wizard-btn next";
  const isLastStep = index === wizardConfig.steps.length - 1;
  next.textContent = isLastStep ? getText("review") : getText("next");
  next.addEventListener("click", goNext);

  btns.appendChild(back);
  btns.appendChild(next);
  card.appendChild(btns);

  container.appendChild(card);

  setActiveTab(index);
  updateProgress();
}
/* Build Step */
function buildStep(index) {
  reviewMode = false;
  currentStep = index;

  const container = document.getElementById("wizard-container");
  if (!container) return;
  container.innerHTML = "";

  const step = wizardConfig.steps[index];
  const useEs = isSpanish();

  const card = document.createElement("div");
  card.className = "wizard-step-card";

  const title = document.createElement("div");
  title.className = "wizard-step-title";

  const stepTitle = useEs ? (step.title_es || step.title_en) : step.title_en;
  title.textContent = stepTitle || step.title || "";
  card.appendChild(title);

  step.fields.forEach((field) => {
    const wrap = document.createElement("div");
    wrap.className = "wizard-field";

    const label = document.createElement("label");
    const labelText = useEs ? (field.label_es || field.label_en) : field.label_en;
    const finalLabel = labelText || field.label || field.id || "";

    label.textContent = finalLabel + (field.required ? " *" : "");
    label.setAttribute("for", field.id);
    wrap.appendChild(label);

    let input;
    let appendedCustomInput = false;

    if (field.type === "select") {
      input = document.createElement("select");
      input.id = field.id;

      const options = getResolvedFieldOptions(field);
      options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt.value;
        const optLabel = useEs
          ? (opt.label_es || opt.label_en || opt.label)
          : (opt.label_en || opt.label);
        o.textContent = optLabel || opt.value;
        input.appendChild(o);
      });

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });
    } else if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.id = field.id;
      if (field.placeholder_en || field.placeholder_es) {
        input.placeholder = useEs
          ? (field.placeholder_es || field.placeholder_en || "")
          : (field.placeholder_en || "");
      }

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });
    } else if (field.type === "checkbox-group") {
      input = document.createElement("div");
      input.id = field.id;
      input.className = "wizard-checkbox-group";

      const selectedValues = Array.isArray(formData[field.id]) ? formData[field.id] : [];

      (field.options || []).forEach((opt, idx) => {
        const optId = `${field.id}_${idx}`;

        const item = document.createElement("label");
        item.className = "wizard-checkbox-item";
        item.setAttribute("for", optId);

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = optId;
        cb.value = opt.value;

        if (selectedValues.includes(opt.value)) cb.checked = true;

        cb.addEventListener("change", () => {
          const checked = getCheckboxValues(input);
          formData[field.id] = checked;

          if (input.classList.contains("invalid")) {
            const min = Number(field.minSelected || (field.required ? 1 : 0));
            if (checked.length >= min) input.classList.remove("invalid");
          }
        });

        const txt = document.createElement("span");
        txt.textContent = useEs
          ? (opt.label_es || opt.label_en || opt.label || opt.value)
          : (opt.label_en || opt.label || opt.value);

        item.appendChild(cb);
        item.appendChild(txt);
        input.appendChild(item);
      });

      if (!Array.isArray(formData[field.id])) formData[field.id] = selectedValues;

      if ((field.required || field.minSelected) && !wrap.querySelector(".wizard-help")) {
        const min = Number(field.minSelected || (field.required ? 1 : 0));
        if (min > 0) {
          const help = document.createElement("small");
          help.className = "wizard-help";
          help.style.color = "#6b7280";
          help.textContent = isSpanish()
            ? `Seleccione al menos ${min}.`
            : `Select at least ${min}.`;
          wrap.appendChild(help);
        }
      }
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
      input.id = field.id;
      if (field.placeholder_en || field.placeholder_es) {
        input.placeholder = useEs
          ? (field.placeholder_es || field.placeholder_en || "")
          : (field.placeholder_en || "");
      }

      if (formData[field.id] != null) input.value = formData[field.id];

      input.addEventListener("input", () => {
        formData[field.id] = input.value;
      });
      input.addEventListener("change", () => {
        formData[field.id] = input.value;
      });

      if (input.type === "date" && shouldShowTodayButton(field)) {
        const dateWrap = document.createElement("div");
        dateWrap.style.display = "flex";
        dateWrap.style.gap = "8px";
        dateWrap.style.alignItems = "center";
        dateWrap.appendChild(input);
        dateWrap.appendChild(buildTodayButton(input, useEs));
        wrap.appendChild(dateWrap);
        appendedCustomInput = true;
      }
    }

    if (!appendedCustomInput) {
      wrap.appendChild(input);
    }

    card.appendChild(wrap);
  });

  if (isCommercialTruckingDriverStep(step)) {
    buildCommercialDriverRepeater(card, useEs);
  }

  const btns = document.createElement("div");
  btns.className = "wizard-buttons";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "wizard-btn back";
  back.textContent = getText("back");
  back.disabled = index === 0;
  back.addEventListener("click", goBack);

  const next = document.createElement("button");
  next.type = "button";
  next.className = "wizard-btn next";
  const isLastStep = index === wizardConfig.steps.length - 1;
  next.textContent = isLastStep ? getText("review") : getText("next");
  next.addEventListener("click", goNext);

  btns.appendChild(back);
  btns.appendChild(next);
  card.appendChild(btns);

  container.appendChild(card);

  setActiveTab(index);
  updateProgress();
}

/* Navigation */
function goToStep(i) {
  persistCurrentStepData();
  if (i >= 0 && i < wizardConfig.steps.length) buildStep(i);
}

function goBack() {
  persistCurrentStepData();
  if (currentStep > 0) buildStep(currentStep - 1);
}

function goNext() {
  persistCurrentStepData();
  if (!validateStep()) return;

  if (currentStep === wizardConfig.steps.length - 1) {
    buildReview();
  } else {
    buildStep(currentStep + 1);
  }
}

/* Progress */
function updateProgress() {
  const bar = document.getElementById("wizard-progress");
  if (!bar || !wizardConfig) return;

  const total = wizardConfig.steps.length + 1;
  const current = reviewMode ? wizardConfig.steps.length : currentStep;
  const percent = Math.round((current / total) * 100);
  bar.style.width = percent + "%";
}

/* Validation */
function validateStep() {
  const step = wizardConfig.steps[currentStep];
  let valid = true;

  step.fields.forEach((field) => {
    if (field.type === "checkbox-group") {
      const selected = Array.isArray(formData[field.id]) ? formData[field.id] : [];
      const min = Number(field.minSelected || (field.required ? 1 : 0));
      const groupEl = document.getElementById(field.id);

      if (selected.length < min) {
        valid = false;
        if (groupEl) groupEl.classList.add("invalid");
      } else if (groupEl) {
        groupEl.classList.remove("invalid");
      }
      return;
    }

    const el = document.getElementById(field.id);
    if (field.required && (!el || String(el.value).trim() === "")) {
      if (el) el.style.border = "2px solid red";
      valid = false;
    } else if (el) {
      el.style.border = "";
    }
  });

  if (!validateCommercialDriverRepeater(step)) {
    valid = false;
  }

  return valid;
}

/* Review */
function buildReview() {
  reviewMode = true;
  persistCurrentStepData();

  const container = document.getElementById("wizard-container");
  if (!container) return;
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "wizard-step-card";

  const title = document.createElement("div");
  title.className = "wizard-step-title";
  title.textContent = getText("reviewTitle");
  card.appendChild(title);

  const useEs = isSpanish();

  wizardConfig.steps.forEach((step) => {
    const section = document.createElement("div");
    section.className = "review-section";

    const h = document.createElement("h3");
    const stepTitle = useEs ? (step.title_es || step.title_en) : step.title_en;
    h.textContent = stepTitle || step.title || "";
    section.appendChild(h);

    step.fields.forEach((field) => {
      const rawVal = formData[field.id];
      const val = valueToText(rawVal);
      const row = document.createElement("p");

      const labelText = useEs ? (field.label_es || field.label_en) : field.label_en;
      const finalLabel = labelText || field.label || field.id || "";

      row.innerHTML = `<strong>${finalLabel}:</strong> ${val}`;
      section.appendChild(row);
    });

    if (isCommercialTruckingDriverStep(step) && formData.driverDetailsEnabled) {
      const detailsText = getCommercialDriverDetailsReviewText(useEs);
      if (detailsText) {
        const row = document.createElement("p");
        row.innerHTML = `<strong>${useEs ? "Detalle de Conductores" : "Driver Details"}:</strong> ${detailsText}`;
        section.appendChild(row);
      }
    }

    card.appendChild(section);
  });

  const btns = document.createElement("div");
  btns.className = "wizard-buttons";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "wizard-btn back";
  back.textContent = getText("back");
  back.addEventListener("click", () => {
    reviewMode = false;
    buildStep(currentStep);
  });

  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "wizard-btn next";
  submit.textContent = getText("submit");
  submit.addEventListener("click", submitApplication);

  btns.appendChild(back);
  btns.appendChild(submit);
  card.appendChild(btns);

  container.appendChild(card);

  const progress = document.getElementById("wizard-progress");
  if (progress) progress.style.width = "100%";
}

/* Build email body */
function buildApplicationEmailBody(data, appType, assignment, routingLang) {
  const submissionLang = normalizeLang(routingLang || getCurrentLang());
  const lines = [];
  lines.push(`Application Type: ${appType || "Unknown"}`);
  lines.push(`Language: ${submissionLang.toUpperCase()}`);
  lines.push(`Submitted At: ${new Date().toLocaleString()}`);
  lines.push(`Assigned Agent: ${assignment?.email || "office@insaces.com"}`);
  lines.push(`Assigned Lang Pool: ${assignment?.lang || submissionLang}`);
  lines.push(
    `Assigned Index: ${
      Number.isInteger(assignment?.assignedIndex) ? assignment.assignedIndex : "n/a"
    }`
  );
  lines.push("");

  wizardConfig.steps.forEach((step) => {
    const stepTitle = isSpanish()
      ? (step.title_es || step.title_en || step.title || "Step")
      : (step.title_en || step.title || "Step");
    lines.push(`=== ${stepTitle} ===`);

    step.fields.forEach((field) => {
      const label = isSpanish()
        ? (field.label_es || field.label_en || field.label || field.id)
        : (field.label_en || field.label || field.id);

      const rawVal = data[field.id];
      const val = valueToText(rawVal);
      lines.push(`${label}: ${val}`);
    });

    if (isCommercialTruckingDriverStep(step) && formData.driverDetailsEnabled) {
      const detailsText = getCommercialDriverDetailsReviewText(isSpanish());
      if (detailsText) {
        lines.push(`${isSpanish() ? "Detalle de Conductores" : "Driver Details"}: ${detailsText}`);
      }
    }

    lines.push("");
  });

  return lines.join("\n");
}

/* Submit via FormSubmit (NO mailto) */
function submitApplication() {
  const data = {};

  wizardConfig.steps.forEach((step) => {
    step.fields.forEach((field) => {
      data[field.id] = getFieldValue(field);
    });

    if (isCommercialTruckingDriverStep(step) && formData.driverDetailsEnabled) {
      syncCommercialDriverDetailsFromInputs();
      data.driverDetails = Array.isArray(formData.driverDetails) ? formData.driverDetails : [];
    }
  });

  const OFFICE_EMAIL = "office@insaces.com";
  const lang = getRoutingLanguageFromData(data);

  // SINGLE-ASSIGNMENT STRATEGY:
  // 1) Prefer URL assignment if present (compat with older entry flow)
  // 2) Else assign once at submit-time from RR engine
  // 3) Else fallback to office
  const urlAssignment = getAssignmentFromUrl();
  let assignment = null;

  if (urlAssignment) {
    assignment = { ...urlAssignment, source: "url" };
  } else if (window.acesRoundRobin?.getNextAssignment) {
    const rr = window.acesRoundRobin.getNextAssignment(lang) || {};
    assignment = {
      email: String(rr.email || OFFICE_EMAIL).trim().toLowerCase(),
      lang: normalizeLang(rr.lang || lang),
      assignedIndex: Number.isInteger(rr.assignedIndex) ? rr.assignedIndex : -1,
      assignedAt: rr.assignedAt || new Date().toISOString(),
      source: "submit-rr"
    };
  } else {
    assignment = {
      email: OFFICE_EMAIL,
      lang,
      assignedIndex: -1,
      assignedAt: new Date().toISOString(),
      source: "fallback-office"
    };
  }

  const agentEmail = String(assignment?.email || "").trim().toLowerCase() || OFFICE_EMAIL;
  const appType = getAppType() || "application";

  const customerName =
    data.fullName || data.name || data.firstName || data.contactName || "Customer";
  const subject = `New ${appType} application - ${customerName}`;
  const body = buildApplicationEmailBody(data, appType, assignment, lang);

  const container = document.getElementById("wizard-container");
  if (container) {
    container.innerHTML = `
      <div style="background:#fff; border:1px solid #fee2e2; border-radius:12px; padding:28px; max-width:680px; margin:0 auto; text-align:center;">
        <h3 style="margin:0 0 10px; color:#111827;">
          ${isSpanish() ? "Enviando su solicitud..." : "Submitting your application..."}
        </h3>
        <p style="margin:0; color:#6b7280;">
          ${isSpanish() ? "Por favor espere un momento." : "Please wait a moment."}
        </p>
      </div>
    `;
  }

  const postForm = document.createElement("form");
  postForm.method = "POST";
  postForm.action = `https://formsubmit.co/${OFFICE_EMAIL}`; // IMPORTANT: do not encode @
  postForm.style.display = "none";
  postForm.acceptCharset = "UTF-8";
  postForm.noValidate = true;

  function addField(name, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value == null ? "" : String(value);
    postForm.appendChild(input);
  }

  // FormSubmit control fields
  addField("_subject", subject);
  addField("_captcha", "false");
  addField("_next", appUrl("thank-you.html"));
  addField("_template", "table");

  // Recipient strategy: office primary, agent cc
  addField("_to", OFFICE_EMAIL);
  addField("_cc", agentEmail !== OFFICE_EMAIL ? agentEmail : "");

  // Optional reply-to if present
  const replyEmail =
    data.email ||
    data.Email ||
    data.contactEmail ||
    data.clientEmail ||
    "";
  if (replyEmail) addField("_replyto", replyEmail);

  // Top metadata
  addField("Application Type", appType);
  addField("Submission Language", lang.toUpperCase());
  addField("Submitted At", new Date().toISOString());

  // Round robin metadata
  addField("RR Assigned Agent Email", agentEmail);
  addField("RR Lang Pool", assignment?.lang || lang);
  addField(
    "RR Assigned Index",
    Number.isInteger(assignment?.assignedIndex) ? assignment.assignedIndex : ""
  );
  addField("RR Assigned At", assignment?.assignedAt || new Date().toISOString());
  addField("RR Source", assignment?.source || "unknown");
  addField("RR Mode", "office-primary-agent-cc");

  // Flattened field payload
  Object.entries(data).forEach(([k, v]) => {
    addField(k, valueToText(v));
  });

  // Human-readable summary
  addField("Application Summary", body);

  document.body.appendChild(postForm);
  postForm.submit();
}

/* Go back to applications page */
function goBackToApplications() {
  window.location.href = applicationsHomeUrl();
}

window.goBackToApplications = goBackToApplications;
