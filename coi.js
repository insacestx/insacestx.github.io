document.addEventListener("DOMContentLoaded", function () {
  initWizardNav();
  initCoiSubmitBridge();
});

/* ---------- WIZARD NAVIGATION ---------- */
function initWizardNav() {
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".wizard-step");
  const form = document.getElementById("coiForm");

  function showStep(stepNumber) {
    steps.forEach(step => {
      step.classList.toggle("active", step.dataset.step === String(stepNumber));
    });

    indicators.forEach(ind => {
      ind.classList.toggle("active", ind.dataset.step === String(stepNumber));
    });
  }

  function validateCurrentStep(currentStep) {
    const stepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!stepEl) return true;

    const requiredFields = stepEl.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  }

  document.querySelectorAll(".next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentStepEl = btn.closest(".form-step");
      const currentStep = currentStepEl ? currentStepEl.dataset.step : null;
      const next = btn.getAttribute("data-next");

      if (!next) return;
      if (currentStep && !validateCurrentStep(currentStep)) return;

      showStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      const prev = btn.getAttribute("data-prev");
      if (!prev) return;
      showStep(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Keep native submit behavior; just guard and improve UX.
  if (form) {
    form.addEventListener("submit", function (e) {
      const finalStepVisible = document.querySelector('.form-step[data-step="4"]')?.classList.contains("active");

      if (!finalStepVisible) {
        e.preventDefault();
        showStep(4);
        return;
      }

      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  }
}

/* ---------- SUBMIT BRIDGE ---------- */
function initCoiSubmitBridge() {
  const form = document.getElementById("coiForm");
  if (!form) return;

  const smsCheckbox = document.getElementById("texting_opt_in");
  const smsHidden = document.getElementById("texting_request_field");

  form.addEventListener("submit", function () {
    if (smsHidden) {
      smsHidden.value = smsCheckbox && smsCheckbox.checked ? "Yes" : "No";
    }
    // No preventDefault here — allow FormSubmit POST to continue.
  });
}
