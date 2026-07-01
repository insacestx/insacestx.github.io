/* ==========================================
   ACES 2026 UNIVERSAL WIZARD ENGINE (BILINGUAL)
========================================== */

let wizardConfig = null;
let currentStep = 0;

/* Language helpers */
function getCurrentLang() {
    return localStorage.getItem("aces_lang") || "en";
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
        reviewTitle: es ? "Revise su Información" : "Review Your Information"
    };
    return map[key] || key;
}

/* Detect application type */
function getAppType() {
    const params = new URLSearchParams(window.location.search);
    return params.get("app");
}

/* Load config — NOW MANIFEST‑DRIVEN */
async function loadConfig(appType) {
    try {
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
        document.getElementById("wizard-container").innerHTML =
            `<p style="color:red;">Error loading application configuration.</p>`;
        console.error("Error loading config for app:", appType, err);
    }
}

/* Init */
async function initWizard() {
    const appType = getAppType();
    if (!appType) {
        document.getElementById("wizard-container").innerHTML =
            `<p style="color:red;">No application type specified.</p>`;
        return;
    }

    await loadConfig(appType);
    if (!wizardConfig) return;

    buildTabs();
    buildStep(0);
    updateProgress();
}

document.addEventListener("DOMContentLoaded", initWizard);

/* Build Tabs */
function buildTabs() {
    const tabsContainer = document.getElementById("wizard-tabs");
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

    setActiveTab(0);
}

function setActiveTab(index) {
    document.querySelectorAll(".wizard-tab").forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });
}

/* Build Step */
function buildStep(index) {
    currentStep = index;
    const container = document.getElementById("wizard-container");
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
        wrap.appendChild(label);

        let input;
        if (field.type === "select") {
            input = document.createElement("select");
            (field.options || []).forEach(opt => {
                const o = document.createElement("option");
                o.value = opt.value;
                const optLabel = useEs ? (opt.label_es || opt.label_en || opt.label) : (opt.label_en || opt.label);
                o.textContent = optLabel || opt.value;
                input.appendChild(o);
            });
        } else {
            input = document.createElement("input");
            input.type = field.type || "text";
        }

        input.id = field.id;
        wrap.appendChild(input);
        card.appendChild(wrap);
    });

    const btns = document.createElement("div");
    btns.className = "wizard-buttons";

    const back = document.createElement("button");
    back.className = "wizard-btn back";
    back.textContent = getText("back");
    back.disabled = index === 0;
    back.addEventListener("click", goBack);

    const next = document.createElement("button");
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
    if (i >= 0 && i < wizardConfig.steps.length) buildStep(i);
}

function goBack() {
    if (currentStep > 0) buildStep(currentStep - 1);
}

function goNext() {
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
    const total = wizardConfig.steps.length + 1;
    const percent = Math.round((currentStep / total) * 100);
    bar.style.width = percent + "%";
}

/* Validation */
function validateStep() {
    const step = wizardConfig.steps[currentStep];
    let valid = true;

    step.fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (field.required && (!el || el.value.trim() === "")) {
            el.style.border = "2px solid red";
            valid = false;
        } else if (el) {
            el.style.border = "1px solid #bbb";
        }
    });

    return valid;
}

/* Review */
function buildReview() {
    const container = document.getElementById("wizard-container");
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
            const val = document.getElementById(field.id)?.value || "";
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
    back.className = "wizard-btn back";
    back.textContent = getText("back");
    back.addEventListener("click", () => buildStep(currentStep));

    const submit = document.createElement("button");
    submit.className = "wizard-btn next";
    submit.textContent = getText("submit");
    submit.addEventListener("click", submitApplication);

    btns.appendChild(back);
    btns.appendChild(submit);
    card.appendChild(btns);

    container.appendChild(card);

    document.getElementById("wizard-progress").style.width = "100%";
}

/* Submit */
function submitApplication() {
    const data = {};

    wizardConfig.steps.forEach(step => {
        step.fields.forEach(field => {
            const el = document.getElementById(field.id);
            data[field.id] = el ? el.value : "";
        });
    });

    alert(isSpanish()
        ? "¡Su solicitud ha sido enviada con éxito!"
        : "Your application has been submitted successfully!"
    );

    window.location.href = "/applications.html";
}
