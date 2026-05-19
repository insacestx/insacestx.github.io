// application-workerscomp.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wcAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const wizardSteps = Array.from(document.querySelectorAll("#wcWizardSteps .auto-wizard-step"));

  const hasLossesToggle = document.getElementById("hasLossesToggle");
  const lossDetails = document.getElementById("lossDetails");
  const consentCheckbox = document.getElementById("consentCheckbox");

  let currentStep = 0;

  /* -----------------------------
     STEP NAVIGATION
  ----------------------------- */
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    wizardSteps.forEach((ws, i) => {
      ws.classList.toggle("active", i === index);
      ws.classList.toggle("completed", i < index);
    });

    currentStep = index;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
      if (currentStep === 3) buildReview();
    }
  }

  function goPrev() {
    if (currentStep > 0) showStep(currentStep - 1);
  }

  document.querySelectorAll("[data-next-step]").forEach(btn => {
    btn.addEventListener("click", goNext);
  });

  document.querySelectorAll("[data-prev-step]").forEach(btn => {
    btn.addEventListener("click", goPrev);
  });

  wizardSteps.forEach((ws, index) => {
    ws.addEventListener("click", () => {
      if (index <= currentStep) showStep(index);
    });
  });

  /* -----------------------------
     LOSS HISTORY TOGGLE
  ----------------------------- */
  if (hasLossesToggle && lossDetails) {
    const updateLossState = () => {
      if (hasLossesToggle.checked) {
        lossDetails.removeAttribute("disabled");
      } else {
        lossDetails.value = "";
        lossDetails.setAttribute("disabled", "disabled");
      }
    };
    hasLossesToggle.addEventListener("change", updateLossState);
    updateLossState();
  }

  /* -----------------------------
     REVIEW BUILDER
  ----------------------------- */
  function buildReview() {
    const getVal = name => (form.elements[name] ? form.elements[name].value.trim() : "");

    const fillList = (id, items) => {
      const ul = document.getElementById(id);
      if (!ul) return;
      ul.innerHTML = "";
      items.forEach(item => {
        if (item.value) {
          const li = document.createElement("li");
          li.textContent = `${item.label}: ${item.value}`;
          ul.appendChild(li);
        }
      });
    };

    /* BUSINESS */
    fillList("reviewBusiness", [
      { label: "Business Name", value: getVal("business_name") },
      { label: "DBA", value: getVal("dba") },
      { label: "Business Type", value: getVal("business_type") },
      { label: "EIN", value: getVal("ein") },
      { label: "Business Phone", value: getVal("business_phone") },
      { label: "Business Email", value: getVal("business_email") },
      { label: "Address", value: getVal("business_address") },
      { label: "City", value: getVal("city") },
      { label: "State", value: getVal("state") },
      { label: "ZIP", value: getVal("zip") },
      { label: "Business Description", value: getVal("business_description") }
    ]);

    /* PAYROLL */
    fillList("reviewPayroll", [
      { label: "Total Payroll", value: getVal("total_payroll") },
      { label: "Employee Count", value: getVal("employee_count") },
      { label: "Job Duties", value: getVal("job_duties") },
      { label: "Subcontractors", value: getVal("subcontractors") },
      { label: "Payroll Notes", value: getVal("payroll_notes") }
    ]);

    /* LOSSES */
    fillList("reviewLosses", [
      { label: "Losses to Report", value: hasLossesToggle.checked ? "Yes" : "No" },
      { label: "Loss Details", value: getVal("loss_details") }
    ]);
  }

  /* -----------------------------
     SUBMIT VALIDATION
  ----------------------------- */
  form.addEventListener("submit", e => {
    if (!consentCheckbox.checked) {
      e.preventDefault();
      alert("Please confirm that the information provided is accurate before submitting.");
      return;
    }
    buildReview();
  });

  /* -----------------------------
     INIT
  ----------------------------- */
  showStep(0);
});
