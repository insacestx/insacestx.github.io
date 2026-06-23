/* ==========================================
   ACES 2026 UNIVERSAL WIZARD ENGINE
   Filename-Based App Detection + Config Loader
========================================== */

let wizardConfig = null;
let currentStep = 0;

/* Detect application type from URL parameter */
function getAppType() {
    const params = new URLSearchParams(window.location.search);
    return params.get("app"); // e.g., "auto"
}

/* Load the correct config file dynamically */
async function loadConfig(appType) {
    try {
        const module = await import(`/applications/config/${appType}-config.js`);
        wizardConfig = module.default;
        console.log("Loaded config:", wizardConfig);
    } catch (err) {
        console.error("Config load error:", err);
        document.getElementById("wizard-container").innerHTML =
            `<p style="color:red;">Error loading application configuration.</p>`;
    }
}

/* Initialize Wizard */
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
/* Build centered step tabs based on config */
function buildTabs() {
    const tabsContainer = document.getElementById("wizard-tabs");
    tabsContainer.innerHTML = "";

    wizardConfig.steps.forEach((step, index) => {
        const tab = document.createElement("div");
        tab.className = "wizard-tab";
        tab.textContent = step.title;
        tab.addEventListener("click", () => goToStep(index));
        tabsContainer.appendChild(tab);
    });

    setActiveTab(0);
}

/* Set active tab styling */
function setActiveTab(index) {
    const tabs = document.querySelectorAll(".wizard-tab");
    tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });
}

/* Build a specific step */
function buildStep(index) {
    currentStep = index;
    const container = document.getElementById("wizard-container");
    container.innerHTML = "";

    const step = wizardConfig.steps[index];

    const card = document.createElement("div");
    card.className = "wizard-step-card";

    const title = document.createElement("div");
    title.className = "wizard-step-title";
    title.textContent = step.title;
    card.appendChild(title);

    // Fields
    step.fields.forEach(field => {
        const fieldWrapper = document.createElement("div");
        fieldWrapper.className = "wizard-field";

        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label + (field.required ? " *" : "");
        fieldWrapper.appendChild(label);

        let input;
        if (field.type === "select") {
            input = document.createElement("select");
            field.options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.label;
                input.appendChild(option);
            });
        } else {
            input = document.createElement("input");
            input.type = field.type || "text";
        }

        input.id = field.id;
        input.name = field.id;
        fieldWrapper.appendChild(input);

        card.appendChild(fieldWrapper);
    });

    // Buttons
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "wizard-buttons";

    const backBtn = document.createElement("button");
    backBtn.className = "wizard-btn back";
    backBtn.textContent = "Back";
    backBtn.disabled = index === 0;
    backBtn.addEventListener("click", goBack);

    const nextBtn = document.createElement("button");
    nextBtn.className = "wizard-btn next";
    nextBtn.textContent = index === wizardConfig.steps.length - 1 ? "Review" : "Next";
    nextBtn.addEventListener("click", goNext);

    btnWrapper.appendChild(backBtn);
    btnWrapper.appendChild(nextBtn);

    card.appendChild(btnWrapper);
    container.appendChild(card);

    setActiveTab(index);
    updateProgress();
}

/* Navigation helpers */
function goToStep(index) {
    if (index < 0 || index >= wizardConfig.steps.length) return;
    buildStep(index);
}

function goBack() {
    if (currentStep > 0) {
        buildStep(currentStep - 1);
    }
}

function goNext() {
    if (!validateStep()) return;

    if (currentStep === wizardConfig.steps.length - 1) {
        buildReview();
    } else {
        buildStep(currentStep + 1);
    }
}

/* Progress bar update */
function updateProgress() {
    const progressEl = document.getElementById("wizard-progress");
    const total = wizardConfig.steps.length + 1; // +1 for review
    const currentIndex = currentStep;
    const percent = Math.round(((currentIndex) / total) * 100);
    progressEl.style.width = percent + "%";
}
/* ================================
   BUILD REVIEW STEP
================================ */

function buildReview() {
    const container = document.getElementById("wizard-container");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "wizard-step-card";

    const title = document.createElement("div");
    title.className = "wizard-step-title";
    title.textContent = "Review Your Information";
    card.appendChild(title);

    wizardConfig.steps.forEach(step => {
        const section = document.createElement("div");
        section.className = "review-section";

        const header = document.createElement("h3");
        header.textContent = step.title;
        section.appendChild(header);

        step.fields.forEach(field => {
            const value = document.getElementById(field.id)?.value || "";

            const row = document.createElement("p");
            row.innerHTML = `<strong>${field.label}:</strong> ${value}`;
            section.appendChild(row);
        });

        card.appendChild(section);
    });

    // Buttons
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "wizard-buttons";

    const backBtn = document.createElement("button");
    backBtn.className = "wizard-btn back";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", () => buildStep(currentStep));

    const submitBtn = document.createElement("button");
    submitBtn.className = "wizard-btn next";
    submitBtn.textContent = "Submit Application";
    submitBtn.addEventListener("click", submitApplication);

    btnWrapper.appendChild(backBtn);
    btnWrapper.appendChild(submitBtn);

    card.appendChild(btnWrapper);
    container.appendChild(card);

    // Progress bar full
    document.getElementById("wizard-progress").style.width = "100%";
}

/* ================================
   VALIDATION
================================ */

function validateStep() {
    const step = wizardConfig.steps[currentStep];
    let valid = true;

    step.fields.forEach(field => {
        if (field.required) {
            const el = document.getElementById(field.id);
            if (!el || el.value.trim() === "") {
                el.style.border = "2px solid red";
                valid = false;
            } else {
                el.style.border = "1px solid #bbb";
            }
        }
    });

    return valid;
}

/* ================================
   SUBMIT APPLICATION
================================ */

function submitApplication() {
    const formData = {};

    wizardConfig.steps.forEach(step => {
        step.fields.forEach(field => {
            const el = document.getElementById(field.id);
            formData[field.id] = el ? el.value : "";
        });
    });

    console.log("Submitting application:", formData);

    // Replace this with your FormSubmit or API endpoint
    alert("Your application has been submitted successfully!");

    // Redirect or reset
    window.location.href = "/applications.html";
}
