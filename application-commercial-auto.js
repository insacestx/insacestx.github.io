// application-commercial-auto.js
document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
  initVehicleRepeater();
  initDriverRepeater();
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

  if (isNaN(index) || index < 0 || index >= list.length) index = 0;

  const email = list[index];
  const nextIndex = (index + 1) % list.length;
  localStorage.setItem(key, nextIndex.toString());

  return email;
}

function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (rrField) rrField.value = getNextRoundRobinEmail();
}

/* -----------------------------------
   VEHICLE REPEATER
----------------------------------- */

function initVehicleRepeater() {
  const addBtn = document.getElementById("addVehicleBtn");
  const list = document.getElementById("vehicleList");
  const template = document.getElementById("vehicleTemplate");

  if (!addBtn || !list || !template) return;

  addBtn.addEventListener("click", () => {
    const clone = template.content.cloneNode(true);
    const block = clone.querySelector(".vehicle-block");

    block.querySelector(".removeVehicleBtn").addEventListener("click", () => {
      block.remove();
    });

    list.appendChild(clone);
  });
}

/* -----------------------------------
   DRIVER REPEATER
----------------------------------- */

function initDriverRepeater() {
  const addBtn = document.getElementById("addDriverBtn");
  const list = document.getElementById("driverList");
  const template = document.getElementById("driverTemplate");

  if (!addBtn || !list || !template) return;

  addBtn.addEventListener("click", () => {
    const clone = template.content.cloneNode(true);
    const block = clone.querySelector(".driver-block");

    block.querySelector(".removeDriverBtn").addEventListener("click", () => {
      block.remove();
    });

    list.appendChild(clone);
  });
}

/* -----------------------------------
   ACES 2026 WIZARD NAVIGATION ENGINE
----------------------------------- */

function initWizardNav() {
  const form = document.getElementById("caAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const indicators = Array.from(document.querySelectorAll("#caWizardSteps .auto-wizard-step"));
  const consentCheckbox = document.getElementById("consentCheckbox");

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
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
      if (currentStep === 6) buildReview();
    }
  }

  function goPrev() {
    if (currentStep > 0) showStep(currentStep - 1);
  }

  document.querySelectorAll("[data-next-step]").forEach(btn => btn.addEventListener("click", goNext));
  document.querySelectorAll("[data-prev-step]").forEach(btn => btn.addEventListener("click", goPrev));

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

  function getList(name) {
    return Array.from(form.querySelectorAll(`[name="${name}[]"]`)).map(i => i.value.trim());
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
      { label: "Address", value: getVal("business_address") },
      { label: "City", value: getVal("business_city") },
      { label: "State", value: getVal("business_state") },
      { label: "ZIP", value: getVal("business_zip") },
      { label: "FEIN", value: getVal("fein") },
      { label: "Years in Business", value: getVal("years_in_business") },
      { label: "Contact Name", value: getVal("contact_name") },
      { label: "Contact Phone", value: getVal("contact_phone") },
      { label: "Contact Email", value: getVal("contact_email") },
      { label: "Business Description", value: getVal("business_description") }
    ]);

    /* OPERATIONS */
    fillList("reviewOperations", [
      { label: "Radius", value: getVal("radius") },
      { label: "States Traveled", value: getVal("states_traveled") },
      { label: "DOT Number", value: getVal("dot_number") },
      { label: "MC Number", value: getVal("mc_number") },
      { label: "Cargo", value: getVal("cargo") },
      { label: "Towing", value: getVal("towing") },
      { label: "Deliveries", value: getVal("deliveries") },
      { label: "Hotshot", value: getVal("hotshot") },
      { label: "Operations Description", value: getVal("operations_description") }
    ]);

    /* VEHICLES */
    const vehicleYears = getList("vehicle_year");
    const vehicleMakes = getList("vehicle_make");
    const vehicleModels = getList("vehicle_model");
    const vehicleVINs = getList("vehicle_vin");
    const vehicleGVWR = getList("vehicle_gvwr");
    const vehicleOwnership = getList("vehicle_ownership");
    const vehicleGarage = getList("vehicle_garage");
    const vehicleUse = getList("vehicle_use");
    const vehicleTrailer = getList("vehicle_trailer");

    const vehicleUl = document.getElementById("reviewVehicles");
    vehicleUl.innerHTML = "";

    for (let i = 0; i < vehicleYears.length; i++) {
      const li = document.createElement("li");
      li.textContent =
        `${vehicleYears[i]} ${vehicleMakes[i]} ${vehicleModels[i]} — VIN: ${vehicleVINs[i]}, ` +
        `GVWR: ${vehicleGVWR[i]}, Ownership: ${vehicleOwnership[i]}, ` +
        `Garage: ${vehicleGarage[i]}, Use: ${vehicleUse[i]}, Trailer: ${vehicleTrailer[i]}`;
      vehicleUl.appendChild(li);
    }

    /* DRIVERS */
    const driverNames = getList("driver_name");
    const driverDOB = getList("driver_dob");
    const driverLic = getList("driver_license");
    const driverState = getList("driver_state");
    const driverExp = getList("driver_experience");
    const driverViol = getList("driver_violations");

    const driverUl = document.getElementById("reviewDrivers");
    driverUl.innerHTML = "";

    for (let i = 0; i < driverNames.length; i++) {
      const li = document.createElement("li");
      li.textContent =
        `${driverNames[i]} — DOB: ${driverDOB[i]}, License: ${driverLic[i]} (${driverState[i]}), ` +
        `Experience: ${driverExp[i]} yrs, Violations: ${driverViol[i] || "None"}`;
      driverUl.appendChild(li);
    }

    /* COVERAGE */
    fillList("reviewCoverage", [
      { label: "Liability Coverage", value: getVal("liability_coverage") },
      { label: "UM/UIM", value: getVal("um_uim") },
      { label: "Medical Payments", value: getVal("medical_payments") },
      { label: "Coverage Notes", value: getVal("coverage_notes") }
    ]);

    /* LOSSES */
    fillList("reviewLosses", [
      { label: "Losses in 5 Years", value: getVal("losses") },
      { label: "Loss Details", value: getVal("loss_details") }
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
