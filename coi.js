document.addEventListener("DOMContentLoaded", function () {
  initWizardNav();
});

/* ---------- WIZARD NAVIGATION ---------- */

function initWizardNav() {
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".wizard-step");

  function showStep(stepNumber) {
    steps.forEach(step => {
      step.classList.toggle("active", step.dataset.step === String(stepNumber));
    });
    indicators.forEach(ind => {
      ind.classList.toggle("active", ind.dataset.step === String(stepNumber));
    });
  }

  document.querySelectorAll(".next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-next");
      if (next) showStep(next);
    });
  });

  document.querySelectorAll(".prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      const prev = btn.getAttribute("data-prev");
      if (prev) showStep(prev);
    });
  });
}
