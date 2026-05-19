// application-commercial-auto.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("caAppForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const wizardSteps = Array.from(document.querySelectorAll("#caWizardSteps .auto-wizard-step"));

  const hasLossesToggle = document.getElementById("hasLossesToggle");
  const lossDetails = document.getElementById("lossDetails");
  const consentCheckbox = document.getElementById("consentCheckbox");

  const vehicleList = document.getElementById("vehicleList");
  const addVehicleBtn = document.getElementById("addVehicleBtn");

  const driverList = document.getElementById("driverList");
  const addDriverBtn = document.getElementById("addDriverBtn");

  let currentStep = 0;
  let vehicleCount = 0;
  let driverCount = 0;

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
      if (currentStep === 6) buildReview();
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
     DYNAMIC VEHICLES
  ----------------------------- */
  function addVehicle() {
    vehicleCount++;
    const id = vehicleCount;

    const wrapper = document.createElement("div");
    wrapper.className = "auto-card";
    wrapper.dataset.vehicleId = id;

    wrapper.innerHTML = `
      <h3>Vehicle ${id}</h3>
      <div class="auto-grid-2">
        <div class="auto-field">
          <label>Year</label>
          <input name="vehicle_${id}_year" required />
        </div>
        <div class="auto-field">
          <label>Make</label>
          <input name="vehicle_${id}_make" required />
        </div>
        <div class="auto-field">
          <label>Model</label>
          <input name="vehicle_${id}_model" required />
        </div>
        <div class="auto-field">
          <label>VIN</label>
          <input name="vehicle_${id}_vin" required />
        </div>
        <div class="auto-field">
          <label>GVWR</label>
          <input name="vehicle_${id}_gvwr" placeholder="lbs" />
        </div>
        <div class="auto-field">
          <label>Use</label>
          <select name="vehicle_${id}_use">
            <option>Service</option>
            <option>Delivery</option>
            <option>Construction</option>
            <option>Passenger Transport</option>
            <option>Owner Operator</option>
          </select>
        </div>
      </div>

      <button type="button" class="btn-secondary auto-remove-btn" data-remove-vehicle="${id}">
        Remove Vehicle
      </button>
    `;

    vehicleList.appendChild(wrapper);

    wrapper.querySelector("[data-remove-vehicle]").addEventListener("click", () => {
      wrapper.remove();
    });
  }

  addVehicleBtn.addEventListener("click", addVehicle);

  /* -----------------------------
     DYNAMIC DRIVERS
  ----------------------------- */
  function addDriver() {
    driverCount++;
    const id = driverCount;

    const wrapper = document.createElement("div");
    wrapper.className = "auto-card";
    wrapper.dataset.driverId = id;

    wrapper.innerHTML = `
      <h3>Driver ${id}</h3>
      <div class="auto-grid-2">
        <div class="auto-field">
          <label>First Name</label>
          <input name="driver_${id}_first" required />
        </div>
        <div class="auto-field">
          <label>Last Name</label>
          <input name="driver_${id}_last" required />
        </div>
        <div class="auto-field">
          <label>Date of Birth</label>
          <input type="date" name="driver_${id}_dob" required />
        </div>
        <div class="auto-field">
          <label>License Number</label>
          <input name="driver_${id}_license" required />
        </div>
        <div class="auto-field">
          <label>State</label>
          <input name="driver_${id}_state" value="TX" required />
        </div>
        <div class="auto-field">
          <label>Years Experience</label>
          <input name="driver_${id}_experience" placeholder="Years" />
        </div>
      </div>

      <button type="button" class="btn-secondary auto-remove-btn" data-remove-driver="${id}">
        Remove Driver
      </button>
    `;

    driverList.appendChild(wrapper);

    wrapper.querySelector("[data-remove-driver]").addEventListener("click", () => {
      wrapper.remove();
    });
  }

  addDriverBtn.addEventListener("click", addDriver);

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
      { label: "USDOT", value: getVal("usdot") },
      { label: "MC Number", value: getVal("mc_number") },
      { label: "Business Phone", value: getVal("business_phone") },
      { label: "Business Email", value: getVal("business_email") },
      { label: "Address", value: getVal("business_address") },
      { label: "City", value: getVal("city") },
      { label: "State", value: getVal("state") },
      { label: "ZIP", value: getVal("zip") },
      { label: "Business Description", value: getVal("business_description") }
    ]);

    /* OPERATIONS */
    fillList("reviewOperations", [
      { label: "Radius", value: getVal("radius") },
      { label: "Operating States", value: getVal("operating_states") },
      { label: "Cargo Type", value: getVal("cargo_type") },
      { label: "Tow Trailers", value: getVal("tow_trailers") },
      { label: "Notes", value: getVal("operations_notes") }
    ]);

    /* VEHICLES */
    const vehicleItems = [];
    for (let i = 1; i <= vehicleCount; i++) {
      if (!form.elements[`vehicle_${i}_year`]) continue;
      vehicleItems.push({
        label: `Vehicle ${i}`,
        value: `${getVal(`vehicle_${i}_year`)} ${getVal(`vehicle_${i}_make`)} ${getVal(`vehicle_${i}_model`)} — VIN: ${getVal(`vehicle_${i}_vin`)}`
      });
    }
    fillList("reviewVehicles", vehicleItems);

    /* DRIVERS */
    const driverItems = [];
    for (let i = 1; i <= driverCount; i++) {
      if (!form.elements[`driver_${i}_first`]) continue;
      driverItems.push({
        label: `Driver ${i}`,
        value: `${getVal(`driver_${i}_first`)} ${getVal(`driver_${i}_last`)} — DOB: ${getVal(`driver_${i}_dob`)}`
      });
    }
    fillList("reviewDrivers", driverItems);

    /* COVERAGE */
    fillList("reviewCoverage", [
      { label: "Liability Limit", value: getVal("liability_limit") },
      { label: "UM/UIM", value: getVal("um_uim") },
      { label: "Medical Payments", value: getVal("med_pay") },
      { label: "Hired & Non-Owned", value: getVal("hnoa") },
      { label: "Comp/Collision", value: getVal("comp_collision") },
      { label: "Trailer Interchange", value: getVal("trailer_interchange") },
      { label: "Coverage Notes", value: getVal("coverage_notes") }
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
  addVehicle();
  addDriver();
  showStep(0);
});
