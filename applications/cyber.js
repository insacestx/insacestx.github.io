// application-cyber.js
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
  const form = document.getElementById("cyberAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const indicators = Array.from(document.querySelectorAll("#cyberWizardSteps .auto-wizard-step"));
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
    /* BUSINESS */
    fillList("reviewBusiness", [
      { label: "Business Name", value: getVal("business_name") },
      { label: "DBA", value: getVal("dba") },
      { label: "Business Type", value: getVal("business_type") },
      { label: "EIN", value: getVal("ein") },
      { label: "Business Phone", value: getVal("business_phone") },
      { label: "Business Email", value: getVal("business_email") },
      { label: "Business Address", value: getVal("business_address") },
      { label: "City", value: getVal("city") },
      { label: "State", value: getVal("state") },
      { label: "ZIP", value: getVal("zip") },
      { label: "Business Description", value: getVal("business_description") }
    ]);

    /* CYBER CONTROLS */
    fillList("reviewControls", [
      { label: "Stores Personal Data", value: getVal("stores_personal_data") },
      { label: "Credit Card Processing", value: getVal("credit_cards") },
      { label: "MFA Usage", value: getVal("mfa") },
      { label: "Data Backups", value: getVal("data_backups") },
      { label: "Endpoint Protection", value: getVal("endpoint_protection") },
      { label: "Prior Incidents", value: getVal("prior_incidents") },
      { label: "Incident Description", value: getVal("incident_description") }
    ]);

    /* COVERAGES */
    fillList("reviewCoverages", [
      { label: "Cyber Liability Limit", value: getVal("cyber_limit") },
      { label: "Breach Response Limit", value: getVal("breach_limit") },
      { label: "Cyber Crime Limit", value: getVal("cyber_crime_limit") },
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
