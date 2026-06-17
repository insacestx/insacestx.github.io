/* ============================================================
   ACES 2026 — UNIVERSAL WIZARD ENGINE (wizard.js)
   Fully Isolated Namespace: acesWizard
============================================================ */

const acesWizard = {
  currentStep: 0,
  steps: [],
  progressFill: null,
  desktopTabs: [],
  mobileSteps: [],
  repeaters: {},

  init() {
    this.steps = Array.from(document.querySelectorAll(".aces-wizard-card"));
    this.desktopTabs = Array.from(document.querySelectorAll(".aces-wizard-tab"));
    this.mobileSteps = Array.from(document.querySelectorAll(".aces-wizard-mobile-step"));
    this.progressFill = document.querySelector(".aces-wizard-progress-fill");

    this.showStep(0);
    this.attachEvents();
  },

  /* ============================================================
     STEP NAVIGATION
  ============================================================ */

  showStep(index) {
    this.currentStep = index;

    // Show correct card
    this.steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    // Update desktop tabs
    this.desktopTabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
    });

    // Update mobile steps
    this.mobileSteps.forEach((mStep, i) => {
      mStep.classList.toggle("active", i === index);
    });

    // Update progress bar
    const progressPercent = ((index) / (this.steps.length - 1)) * 100;
    if (this.progressFill) {
      this.progressFill.style.width = progressPercent + "%";
    }
  },

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  },

  /* ============================================================
     EVENT ATTACHMENT
  ============================================================ */

  attachEvents() {
    // Desktop tab clicks
    this.desktopTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.showStep(index));
    });

    // Mobile step clicks
    this.mobileSteps.forEach((mStep, index) => {
      mStep.addEventListener("click", () => this.showStep(index));
    });

    // Navigation buttons
    document.querySelectorAll(".aces-wizard-btn.next").forEach(btn => {
      btn.addEventListener("click", () => this.nextStep());
    });

    document.querySelectorAll(".aces-wizard-btn.back").forEach(btn => {
      btn.addEventListener("click", () => this.prevStep());
    });
  },

  /* ============================================================
     REPEATERS (Drivers, Vehicles, Claims, etc.)
  ============================================================ */

  addRepeater(groupName, templateId, containerId) {
    if (!this.repeaters[groupName]) this.repeaters[groupName] = 0;

    const template = document.getElementById(templateId);
    const container = document.getElementById(containerId);

    if (!template || !container) return;

    const clone = template.content.cloneNode(true);
    const repeaterIndex = ++this.repeaters[groupName];

    // Auto-numbering
    clone.querySelectorAll("[data-repeater-number]").forEach(el => {
      el.textContent = repeaterIndex;
    });

    // Remove button
    clone.querySelectorAll(".aces-wizard-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".aces-wizard-repeater").remove();
      });
    });

    container.appendChild(clone);
  },

  /* ============================================================
     VALIDATION (Simple Required Field Check)
  ============================================================ */

  validateStep(stepIndex) {
    const step = this.steps[stepIndex];
    if (!step) return true;

    const requiredFields = step.querySelectorAll("[data-required]");
    let valid = true;

    requiredFields.forEach(field => {
      if (!field.value || field.value.trim() === "") {
        valid = false;
        field.style.borderColor = "#d40000";
        field.style.boxShadow = "0 0 0 3px rgba(212,0,0,0.15)";
      } else {
        field.style.borderColor = "#d8d8d8";
        field.style.boxShadow = "none";
      }
    });

    return valid;
  },

  /* ============================================================
     REVIEW BUILDER (Auto-Generate Summary)
  ============================================================ */

  buildReview(reviewContainerId) {
    const container = document.getElementById(reviewContainerId);
    if (!container) return;

    container.innerHTML = "";

    this.steps.forEach(step => {
      const fields = step.querySelectorAll("input, select, textarea");

      fields.forEach(field => {
        if (field.name && field.value.trim() !== "") {
          const row = document.createElement("div");
          row.className = "review-row";
          row.innerHTML = `
            <strong>${field.name.replace(/_/g, " ")}:</strong>
            <span>${field.value}</span>
          `;
          container.appendChild(row);
        }
      });
    });
  }
};

/* Initialize wizard when DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".aces-wizard")) {
    acesWizard.init();
  }
});
