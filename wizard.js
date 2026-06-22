/* ============================================================
ACES 2026 — UNIVERSAL WIZARD ENGINE
============================================================ */

const acesWizard = {

currentStep: 0,
steps: [],
progressFill: null,
desktopTabs: [],
mobileSteps: [],
repeaters: {},

init() {

```
this.steps =
  Array.from(document.querySelectorAll(".aces-wizard-card"));

this.desktopTabs =
  Array.from(document.querySelectorAll(".aces-wizard-tab"));

this.mobileSteps =
  Array.from(document.querySelectorAll(".aces-wizard-mobile-step"));

this.progressFill =
  document.querySelector(".aces-wizard-progress-fill");

this.attachEvents();
this.showStep(0);
```

},

showStep(index) {

```
this.currentStep = index;

this.steps.forEach((step, i) => {
  step.classList.toggle("active", i === index);
});

this.desktopTabs.forEach((tab, i) => {
  tab.classList.toggle("active", i === index);
});

this.mobileSteps.forEach((step, i) => {
  step.classList.toggle("active", i === index);
});

if (this.progressFill) {

  const percent =
    (index / (this.steps.length - 1)) * 100;

  this.progressFill.style.width = percent + "%";
}
```

},

nextStep() {

```
if (!this.validateStep(this.currentStep)) {
  return;
}

if (this.currentStep < this.steps.length - 1) {
  this.showStep(this.currentStep + 1);
}
```

},

prevStep() {

```
if (this.currentStep > 0) {
  this.showStep(this.currentStep - 1);
}
```

},

attachEvents() {

```
this.desktopTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    this.showStep(index);
  });
});

this.mobileSteps.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    this.showStep(index);
  });
});

document
  .querySelectorAll(".aces-wizard-btn.next")
  .forEach(btn => {

    btn.addEventListener("click", e => {

      if (
        btn.classList.contains("add-vehicle") ||
        btn.classList.contains("add-driver") ||
        btn.classList.contains("add-claim") ||
        btn.classList.contains("submit-app")
      ) {
        return;
      }

      this.nextStep();
    });

  });

document
  .querySelectorAll(".aces-wizard-btn.back")
  .forEach(btn => {

    btn.addEventListener("click", () => {
      this.prevStep();
    });

  });
```

},

validateStep(stepIndex) {

```
const step = this.steps[stepIndex];

if (!step) return true;

const requiredFields =
  step.querySelectorAll("[data-required]");

let valid = true;

requiredFields.forEach(field => {

  if (!field.value.trim()) {

    valid = false;

    field.style.borderColor = "#d40000";
    field.style.boxShadow =
      "0 0 0 3px rgba(212,0,0,.15)";

  } else {

    field.style.borderColor = "#d8d8d8";
    field.style.boxShadow = "none";
  }
});

return valid;
```

},

addRepeater(groupName, templateId, containerId) {

```
if (!this.repeaters[groupName]) {
  this.repeaters[groupName] = 0;
}

const template =
  document.getElementById(templateId);

const container =
  document.getElementById(containerId);

if (!template || !container) return;

const clone =
  template.content.cloneNode(true);

const index =
  ++this.repeaters[groupName];

clone.querySelectorAll(
  "[data-repeater-number]"
).forEach(el => {

  el.textContent = index;
});

clone.querySelectorAll(
  ".aces-wizard-remove-btn"
).forEach(btn => {

  btn.addEventListener("click", () => {

    btn.closest(
      ".aces-wizard-repeater"
    ).remove();

  });

});

container.appendChild(clone);
```

},

buildReview(containerId) {

```
const container =
  document.getElementById(containerId);

if (!container) return;

container.innerHTML = "";

document
  .querySelectorAll(
    ".aces-wizard input, .aces-wizard select, .aces-wizard textarea"
  )
  .forEach(field => {

    if (!field.name || !field.value) return;

    const row =
      document.createElement("div");

    row.className = "review-row";

    row.innerHTML = `
      <strong>${field.name.replace(/_/g,' ')}</strong>
      <span>${field.value}</span>
    `;

    container.appendChild(row);
  });
```

}

};

document.addEventListener("DOMContentLoaded", () => {

if (
document.querySelector(".aces-wizard")
) {
acesWizard.init();
}

});
