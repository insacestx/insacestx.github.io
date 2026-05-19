// application-condo.js
document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
});

/* -----------------------------------
   ROUND ROBIN EMAIL ROUTING
----------------------------------- */

function getRoundRobinList() {
  return [
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "george@insaces.com",
    "jimmy@insaces.com",
    "office@insaces.com"
  ];
}

function getNextRoundRobinEmail() {
  const key = "aces_rr_index";
  const list = getRoundRobinList();
  let index = parseInt(localStorage.getItem(key) || "0", 10);

  if (isNaN(index) || index < 0 || index >= list.length) {
    index = 0;
  }

  const email = list[index];
  const nextIndex = (index + 1) % list.length;
  localStorage.setItem(key, nextIndex.toString());

  return email;
}

function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (rrField) {
    rrField.value = getNextRoundRobinEmail();
  }
}

/* -----------------------------------
   ACES 2026 WIZARD NAVIGATION ENGINE
----------------------------------- */

function initWizardNav() {
  const form = document.getElementById("condoAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const indicators = Array.from(document.querySelectorAll("#condoWizardSteps .auto-wizard-step"));
  const consentCheckbox = document.getElementById("consentCheckbox");

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === index);
      ind.classList.toggle("completed", i < index);
    });

    currentStep = index;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
      if (currentStep === 4) buildReview();
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

  indicators.forEach((ind, index) => {
    ind.addEventListener("click", () => {
      if (index <= currentStep) showStep(index);
    });
  });

  /* -----------------------------------
     REVIEW BUILDER
  ----------------------------------- */

  function getVal(name) {
    return form.elements[name] ? form.elements[name].value.trim() : "";
  }

  function fillList(id, items) {
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
  }

  function buildReview() {
    /* APPLICANT */
    fillList("reviewApplicant", [
      { label: "Full Name", value: getVal("full_name") },
      { label: "Date of Birth", value: getVal("dob") },
      { label: "Phone", value: getVal("phone") },
      { label: "Email", value: getVal("email") },
      { label: "Current Address", value: getVal("current_address") },
      { label: "City", value: getVal("current_city") },
      { label: "State", value: getVal("current_state") },
      { label: "ZIP", value: getVal("current_zip") },
      { label: "Contact Method", value: getVal("contact_method") }
    ]);

    /* PROPERTY */
    fillList("reviewProperty", [
      { label: "Condo Address", value: getVal("condo_address") },
      { label: "City", value: getVal("condo_city") },
      { label: "State", value: getVal("condo_state") },
      { label: "ZIP", value: getVal("condo_zip") },
      { label: "Year Built", value: getVal("year_built") },
      { label: "Square Feet", value: getVal("square_feet") },
      { label: "Primary Residence", value: getVal("primary_residence") },
      { label: "Floor Level", value: getVal("floor_level") },
      { label: "Property Notes", value: getVal("property_notes") }
    ]);

    /* COVERAGES */
    fillList("reviewCoverages", [
      { label: "Dwelling Limit", value: getVal("dwelling_limit") },
      { label: "Personal Property Limit", value: getVal("personal_property_limit") },
      { label: "Loss of Use", value: getVal("loss_of_use") },
      { label: "Liability Limit", value: getVal("liability_limit") },
      { label: "Medical Payments", value: getVal("medical_payments") },
      { label: "Deductible", value: getVal("deductible") },
      { label: "Coverage Notes", value: getVal("coverage_notes") }
    ]);

    /* FEATURES */
    fillList("reviewFeatures", [
      { label: "Flooring Type", value: getVal("flooring_type") },
      { label: "Kitchen Updated", value: getVal("kitchen_updated") },
      { label: "Bathroom Updated", value: getVal("bath_updated") },
      { label: "Security Features", value: getVal("security_features") },
      { label: "Feature Notes", value: getVal("feature_notes") }
    ]);
  }

  /* -----------------------------------
     SUBMIT VALIDATION
  ----------------------------------- */

  form.addEventListener("submit", e => {
    if (!consentCheckbox.checked) {
      e.preventDefault();
      alert("Please confirm that the information provided is accurate before submitting.");
      return;
    }
    buildReview();
  });

  /* INIT */
  showStep(0);
}
