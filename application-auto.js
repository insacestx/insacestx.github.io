document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("autoAppForm");
  const steps = [...document.querySelectorAll(".form-step")];
  const wizardSteps = [...document.querySelectorAll(".auto-wizard-step")];
  let currentStep = 1;

  const vehicleList = document.getElementById("vehicleList");
  const driverList = document.getElementById("driverList");

  const reviewApplicant = document.getElementById("reviewApplicant");
  const reviewVehicles = document.getElementById("reviewVehicles");
  const reviewDrivers = document.getElementById("reviewDrivers");
  const reviewCoverage = document.getElementById("reviewCoverage");

  const hasIncidentsToggle = document.getElementById("hasIncidentsToggle");
  const incidentDetails = document.getElementById("incidentDetails");

  function showStep(step) {
    currentStep = step;
    steps.forEach(s => s.classList.toggle("active", Number(s.dataset.step) === step));
    wizardSteps.forEach(ws => ws.classList.toggle("active", Number(ws.dataset.step) === step));
    if (step === 6) buildReview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-next-step]").forEach(btn => btn.addEventListener("click", () => showStep(currentStep + 1)));
  document.querySelectorAll("[data-prev-step]").forEach(btn => btn.addEventListener("click", () => showStep(currentStep - 1)));

  wizardSteps.forEach(ws => ws.addEventListener("click", () => showStep(Number(ws.dataset.step))));

  // VEHICLES
  let vehicleCount = 0;
  function addVehicle() {
    vehicleCount++;
    const idx = vehicleCount;

    const card = document.createElement("div");
    card.className = "entity-card";
    card.dataset.index = idx;

    card.innerHTML = `
      <div class="entity-card-header">
        <div class="entity-card-title"><span class="icon">🚗</span>Vehicle ${idx}</div>
        <button type="button" class="entity-remove-btn">Remove</button>
      </div>
      <div class="entity-card-body">
        <div class="auto-field"><label>Year</label><input name="vehicle_${idx}_year" type="number"></div>
        <div class="auto-field"><label>Make</label><input name="vehicle_${idx}_make"></div>
        <div class="auto-field"><label>Model</label><input name="vehicle_${idx}_model"></div>
        <div class="auto-field"><label>VIN</label><input name="vehicle_${idx}_vin"></div>
        <div class="auto-field"><label>Use</label>
          <select name="vehicle_${idx}_use">
            <option value="">Select</option>
            <option value="commute">Commute</option>
            <option value="pleasure">Pleasure</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div class="auto-field"><label>Miles/yr</label><input name="vehicle_${idx}_miles" type="number"></div>
      </div>
    `;

    card.querySelector(".entity-remove-btn").addEventListener("click", () => card.remove());
    vehicleList.appendChild(card);
  }

  // DRIVERS
  let driverCount = 0;
  function addDriver() {
    driverCount++;
    const idx = driverCount;

    const card = document.createElement("div");
    card.className = "entity-card";
    card.dataset.index = idx;

    card.innerHTML = `
      <div class="entity-card-header">
        <div class="entity-card-title"><span class="icon">🧍</span>Driver ${idx}</div>
        <button type="button" class="entity-remove-btn">Remove</button>
      </div>
      <div class="entity-card-body">
        <div class="auto-field"><label>Full Name</label><input name="driver_${idx}_name"></div>
        <div class="auto-field"><label>Date of Birth</label><input type="date" name="driver_${idx}_dob"></div>
        <div class="auto-field"><label>Relationship</label><input name="driver_${idx}_relationship"></div>
        <div class="auto-field"><label>License State</label><input name="driver_${idx}_license_state" value="TX"></div>
        <div class="auto-field"><label>License Number</label><input name="driver_${idx}_license_number"></div>
        <div class="auto-field"><label>Years Licensed</label><input type="number" name="driver_${idx}_years_licensed"></div>
      </div>
    `;

    card.querySelector(".entity-remove-btn").addEventListener("click", () => card.remove());
    driverList.appendChild(card);
  }

  document.getElementById("addVehicleBtn").addEventListener("click", addVehicle);
  document.getElementById("addDriverBtn").addEventListener("click", addDriver);

  addVehicle();
  addDriver();

  // INCIDENTS
  hasIncidentsToggle.addEventListener("change", () => {
    incidentDetails.disabled = !hasIncidentsToggle.checked;
    if (!hasIncidentsToggle.checked) incidentDetails.value = "";
  });

  // REVIEW
  function buildReview() {
    reviewApplicant.innerHTML = "";
    reviewVehicles.innerHTML = "";
    reviewDrivers.innerHTML = "";
    reviewCoverage.innerHTML = "";

    const applicantFields = [
      ["first_name", "First Name"],
      ["last_name", "Last Name"],
      ["dob", "DOB"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["address", "Address"],
      ["city", "City"],
      ["state", "State"],
      ["zip", "ZIP"],
      ["contact_method", "Preferred Contact"]
    ];

    applicantFields.forEach(([name, label]) => {
      const value = form.elements[name]?.value;
      if (value) {
        const li = document.createElement("li");
        li.textContent = `${label}: ${value}`;
        reviewApplicant.appendChild(li);
      }
    });

    vehicleList.querySelectorAll(".entity-card
