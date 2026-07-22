/* ==========================================
   ACES 2026 UNIVERSAL WIZARD ENGINE (BILINGUAL)
========================================== */

let wizardConfig = null;
let currentStep = 0;
let formData = {};
let reviewMode = false;

/* Language helpers */
function getCurrentLang() {
  // Unified key with global.js
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
    noAppType: es ? "No se especificó el tipo de solicitud." : "No application type specified."
  };
  return map[key] || key;
}

/* Detect application type */
function getAppType() {
  const params = new URLSearchParams(window.location.search);
  return params.get("app");
}

/* Save current visible step values */
function persistCurrentStepData() {
  if (!wizardConfig || !wizardConfig.steps || reviewMode) return;
  const step = wizardConfig.steps[currentStep];
  if (!step || !step.fields) return;

  step.fields.forEach(field => {
    const el = document.getElementById(field.id);
    if (el) formData[field.id] = el.value;
  });
}

/* Load config — MANIFEST‑DRIVEN */
async function loadConfig(appType) {
  try {
    if (typeof window.applicationConfig !== "undefined") {
      wizardConfig = window.applicationConfig;
      return;
    }

    const base = window.location.pathname.includes("insacestx.github.io")
      ? "/insacestx.github.io"
      : "";

    // Load manifest.json
    const manifestRes = await fetch(`${base}/applications/manifest.json`);
    const manifest = await manifestRes.json();

    if (!manifest[appType]) {
      throw new Error(`Application '${appType}' not found in manifest.`);
    }

    // Load config file from manifest.json
    const configPath = manifest[appType].config;
    const module = await import(`${base}${configPath}`);

    wizardConfig = module.default;
  } catch (err) {
    const container = document.getElementById("wizard-container");
    if (container) {
      container.innerHTML = `<p style="color:red;">${getText("configError")}</p>`;
    }
    console.error("Error loading config for app:", appType, err);
  }
}

/* Init */
async function initWizard() {
  // Prefer embedded config when page defines it inline
  if (typeof window.applicationConfig !== "undefined") {
    wizardConfig = window.applicationConfig;
    console.log("Using embedded applicationConfig");
    buildTabs();
    buildStep(0);
    updateProgress();
    return;
  }

  const appType = getAppType();
  if (!appType) {
    const container = document.getElementById("wizard-container");
    if (container) {
      container.innerHTML = `<p style="color:red;">${getText("noAppType")}</p>`;
    }
    return;
  }

  await loadConfig(appType);
  if (!wizardConfig) return;

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

  if (reviewMode) {
    buildReview();
  } else {
    buildStep(currentStep);
  }
});

/* Also respond to same-tab language changes dispatched by global.js (optional custom event) */
window.addEventListener("aces:language-changed", () => {
  if (!wizardConfig) return;

  persistCurrentStepData();
  buildTabs();

  if (reviewMode) {
    buildReview();
  } else {
    buildStep(currentStep);
  }
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

  step.fields.forEach(field => {
    const wrap = document.createElement("div");
    wrap.className = "wizard-field";

    const label = document.createElement("label");
    const labelText = useEs ? (field.label_es || field.label_en) : field.label_en;
    const finalLabel = labelText || field.label || field.id || "";

    label.textContent = finalLabel + (field.required ? " *" : "");
    label.setAttribute("for", field.id);
    wrap.appendChild(label);

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      input.id = field.id;

      (field.options || []).forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        const optLabel = useEs
          ? (opt.label_es || opt.label_en || opt.label)
          : (opt.label_en || opt.label);
        o.textContent = optLabel || opt.value;
        input.appendChild(o);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
      input.id = field.id;
      if (field.placeholder_en || field.placeholder_es) {
        input.placeholder = useEs
          ? (field.placeholder_es || field.placeholder_en || "")
          : (field.placeholder_en || "");
      }
    }

    // restore saved value
    if (formData[field.id] != null) {
      input.value = formData[field.id];
    }

    // live save
    input.addEventListener("input", () => {
      formData[field.id] = input.value;
    });
    input.addEventListener("change", () => {
      formData[field.id] = input.value;
    });

    wrap.appendChild(input);
    card.appendChild(wrap);
  });

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

  const total = wizardConfig.steps.length + 1; // +1 for review
  const current = reviewMode ? wizardConfig.steps.length : currentStep;
  const percent = Math.round((current / total) * 100);
  bar.style.width = percent + "%";
}

/* Validation */
function validateStep() {
  const step = wizardConfig.steps[currentStep];
  let valid = true;

  step.fields.forEach(field => {
    const el = document.getElementById(field.id);
    if (field.required && (!el || String(el.value).trim() === "")) {
      if (el) el.style.border = "2px solid red";
      valid = false;
    } else if (el) {
      el.style.border = "1px solid #bbb";
    }
  });

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

  wizardConfig.steps.forEach(step => {
    const section = document.createElement("div");
    section.className = "review-section";

    const h = document.createElement("h3");
    const stepTitle = useEs ? (step.title_es || step.title_en) : step.title_en;
    h.textContent = stepTitle || step.title || "";
    section.appendChild(h);

    step.fields.forEach(field => {
      const val = formData[field.id] || "";
      const row = document.createElement("p");

      const labelText = useEs ? (field.label_es || field.label_en) : field.label_en;
      const finalLabel = labelText || field.label || field.id || "";

      row.innerHTML = `<strong>${finalLabel}:</strong> ${val}`;
      section.appendChild(row);
    });

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

/* Submit */
function submitApplication() {
  const data = {};

  wizardConfig.steps.forEach(step => {
    step.fields.forEach(field => {
      data[field.id] = formData[field.id] || "";
    });
  });

  alert(
    isSpanish()
      ? "¡Su solicitud ha sido enviada con éxito!"
      : "Your application has been submitted successfully!"
  );

  window.location.href = "/applications.html";
}
