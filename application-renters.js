// application-renters.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rentersAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const wizardSteps = Array.from(document.querySelectorAll("#rentersWizardSteps .auto-wizard-step"));
  const hasClaimsToggle = document.getElementById("hasClaimsToggle");
  const claimDetails = document.getElementById("claimDetails");
  const consentCheckbox = document.getElementById("consentCheckbox");

  let currentStep = 0;

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
      if (currentStep === 5) {
        buildReview();
      }
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  }

  // Next / Back buttons
  document.querySelectorAll("[data-next-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      goNext();
    });
  });

  document.querySelectorAll("[data-prev-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      goPrev();
    });
  });

  // Clickable wizard steps (only allow going back or to completed)
  wizardSteps.forEach((ws, index) => {
    ws.addEventListener("click", () => {
      if (index <= currentStep) {
        showStep(index);
      }
    });
  });

  // Claims toggle behavior
  if (hasClaimsToggle && claimDetails) {
    const updateClaimsState = () => {
      if (hasClaimsToggle.checked) {
        claimDetails.removeAttribute("disabled");
      } else {
        claimDetails.value = "";
        claimDetails.setAttribute("disabled", "disabled");
      }
    };
    hasClaimsToggle.addEventListener("change", updateClaimsState);
    updateClaimsState();
  }

  // Build review content for Step 6
  function buildReview() {
    const getVal = name => (form.elements[name] ? form.elements[name].value.trim() : "");

    const sections = {
      applicant: [
        { label: "First Name", value: getVal("first_name") },
        { label: "Last Name", value: getVal("last_name") },
        { label: "Date of Birth", value: getVal("dob") },
        { label: "Email", value: getVal("email") },
        { label: "Phone", value: getVal("phone") },
        { label: "Preferred Contact", value: getVal("contact_method") },
        { label: "Street Address", value: getVal("address") },
        { label: "City", value: getVal("city") },
        { label: "State", value: getVal("state") },
        { label: "ZIP Code", value: getVal("zip") }
      ],
      property: [
        { label: "Residence Type", value: getVal("residence_type") },
        { label: "Year Built (approx.)", value: getVal("year_built") },
        { label: "Floor Level", value: getVal("floor_level") },
        { label: "Security Features", value: getVal("security") },
        { label: "Pets", value: getVal("pets") }
      ],
      personalProperty: [
        { label: "Estimated Value of Personal Property", value: getVal("property_value") },
        { label: "High-Value Items", value: getVal("high_value_items") },
        { label: "High-Value Item List", value: getVal("high_value_list") },
        { label: "Storage Unit Coverage", value: getVal("storage_unit") },
        { label: "Coverage Type", value: getVal("coverage_type") }
      ],
      liability: [
        { label: "Personal Liability Limit", value: getVal("liability_limit") },
        { label: "Medical Payments", value: getVal("medical_payments") },
        { label: "Loss of Use Coverage", value: getVal("loss_of_use") },
        { label: "Water Backup Coverage", value: getVal("water_backup") },
        { label: "Identity Theft Protection", value: getVal("identity_theft") },
        { label: "Additional Insured (Landlord)", value: getVal("additional_insured") }
      ],
      claims: [
        { label: "Claims to Report", value: hasClaimsToggle && hasClaimsToggle.checked ? "Yes" : "No" },
        { label: "Claim Details", value: getVal("claim_details") }
      ]
    };

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

    fillList("reviewApplicant", sections.applicant);
    fillList("reviewProperty", sections.property);
    fillList("reviewPersonalProperty", sections.personalProperty);
    fillList("reviewLiability", sections.liability);
    fillList("reviewClaims", sections.claims);
  }

  // Basic submit guard (HTML required + consent already handle most)
  if (form) {
    form.addEventListener("submit", e => {
      if (consentCheckbox && !consentCheckbox.checked) {
        e.preventDefault();
        alert("Please confirm that the information provided is accurate before submitting.");
        return;
      }
      // Ensure review is up to date on submit
      buildReview();
    });
  }

  // Initialize first step
  showStep(0);
});
