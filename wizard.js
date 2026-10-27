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
  return v === "es" || v === "spanish" ? "es" : "en";
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
  const rrLang = normalizeLang(params.get("rrLang") || "");
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

/* Path helper for GitHub Pages project/user site compatibility */
function getBasePath() {
  const path = window.location.pathname || "";
  return path.includes("insacestx.github.io") ? "/insacestx.github.io" : "";
}

/* Safe navigation helper */
function applicationsHomeUrl() {
  return `${getBasePath()}/applications.html`;
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
function valueToText(v) {
  if (Array.isArray(v)) return v.join(", ");
  return v == null ? "" : String(v);
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
    const base = getBasePath();

    const manifestUrl = `${base}/applications/manifest.json`;
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

    let importUrl = configPath;
    if (!importUrl.startsWith("/") && !importUrl.startsWith("./")) {
      importUrl = "./" + importUrl;
    }

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

    if (field.type === "select") {
      input = document.createElement("select");
      input.id = field.id;

      (field.options || []).forEach((opt) => {
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
    }

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
function buildApplicationEmailBody(data, appType, assignment) {
  const lines = [];
  lines.push(`Application Type: ${appType || "Unknown"}`);
  lines.push(`Language: ${normalizeLang(getCurrentLang()).toUpperCase()}`);
  lines.push(`Submitted At: ${new Date().toLocaleString()}`);
  lines.push(`Assigned Agent: ${assignment?.email || "office@insaces.com"}`);
  lines.push(`Assigned Lang Pool: ${assignment?.lang || normalizeLang(getCurrentLang())}`);
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
  });

  const OFFICE_EMAIL = "office@insaces.com";
  const lang = normalizeLang(getCurrentLang());

  // STRICT SINGLE-ASSIGNMENT: use assignment passed from applications page.
  // If missing, do NOT rotate RR here; route to office fallback.
  const urlAssignment = getAssignmentFromUrl();
  const assignment = urlAssignment || {
    email: OFFICE_EMAIL,
    lang,
    assignedIndex: -1,
    assignedAt: new Date().toISOString(),
    source: "fallback-office"
  };

  const agentEmail = String(assignment?.email || "").trim().toLowerCase() || OFFICE_EMAIL;
  const appType = getAppType() || "application";

  const customerName =
    data.fullName || data.name || data.firstName || data.contactName || "Customer";
  const subject = `New ${appType} application - ${customerName}`;
  const body = buildApplicationEmailBody(data, appType, assignment);

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
  postForm.action = `https://formsubmit.co/${encodeURIComponent(OFFICE_EMAIL)}`;
  postForm.style.display = "none";

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
  addField("_next", "https://insacestx.github.io/thank-you.html");
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
    const val = Array.isArray(v) ? v.join(", ") : (v ?? "");
    addField(k, val);
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
