// application-rv.js
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
  const form = document.getElementById("rvAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const indicators = Array.from(document.querySelectorAll("#rvWizardSteps .auto-wizard-step"));
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
      if (currentStep === 2) buildReview();
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
    // PERSONAL
    fillList("reviewPersonal", [
      { label: "First Name", value: getVal("first_name") },
      { label: "Last Name", value: getVal("last_name") },
      { label: "Phone", value: getVal("phone") },
      { label: "Email", value: getVal("email") },
      { label: "Address", value: getVal("address") },
      { label: "City", value: getVal("city") },
      { label: "State", value: getVal("state") },
      { label: "ZIP", value: getVal("zip") }
    ]);

    // RV
    fillList("reviewRV", [
      { label: "RV Type", value: getVal("rv_type") },
      { label: "Year", value: getVal("rv_year") },
      { label: "Make", value: getVal("rv_make") },
      { label: "Model", value: getVal("rv_model") },
      { label: "Length (ft)", value: getVal("rv_length") },
      { label: "Primary Use", value: getVal("rv_use") },
      { label: "VIN", value: getVal("rv_vin") }
    ]);

    // COVERAGE
    fillList("reviewCoverage", [
      { label: "Liability Coverage", value: getVal("liability_coverage") },
      { label: "Property Damage Coverage", value: getVal("property_damage") },
      { label: "Collision Coverage", value: getVal("collision") },
      { label: "Comprehensive Coverage", value: getVal("comprehensive") },
      { label: "Uninsured/Underinsured Motorist", value: getVal("um_uim") },
      { label: "Medical Payments", value: getVal("medical_payments") },
      { label: "Personal Belongings Coverage", value: getVal("personal_belongings") },
      { label: "Coverage Notes", value: getVal("coverage_notes") }
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
