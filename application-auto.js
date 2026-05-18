// AUTO APPLICATION JS

document.addEventListener("DOMContentLoaded", function () {
  initRoundRobinEmail();
  initCoApplicantToggle();
  initVehiclesSection();
  initDriversSection();
  initIncidentsSection();
  initWizardNav();
});

/* ---------- ROUND ROBIN ---------- */

function getRoundRobinList() {
  return [
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "george@insaces.com",
    "jimmy@insaces.com",
    "office@insaces.com" // Renee
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

/* ---------- CO-APPLICANT TOGGLE ---------- */

function initCoApplicantToggle() {
  const toggle = document.getElementById("hasCoApplicant");
  const section = document.getElementById("coApplicantSection");
  if (!toggle || !section) return;

  toggle.addEventListener("change", () => {
    section.style.display = toggle.checked ? "block" : "none";
  });
}

/* ---------- VEHICLES SECTION ---------- */

let vehicleCount = 0;

function initVehiclesSection() {
  const container = document.getElementById("vehiclesContainer");
  const addBtn = document.getElementById("addVehicleBtn");
  if (!container || !addBtn) return;

  addBtn.addEventListener("click", () => addVehicleCard(container));
  // Start with one vehicle by default
  addVehicleCard(container);
}

function addVehicleCard(container) {
  vehicleCount++;
  const idx = vehicleCount;

  const card = document.createElement("div");
  card.className = "auto-card auto-vehicle-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="auto-card-header">
      <h3>Vehicle #${idx}</h3>
      <button type="button" class="auto-remove-btn" data-remove="vehicle">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Year</label>
        <input type="text" name="vehicle_${idx}_year" required>
      </div>
      <div class="form-field">
        <label>Make</label>
        <input type="text" name="vehicle_${idx}_make" required>
      </div>
      <div class="form-field">
        <label>Model</label>
        <input type="text" name="vehicle_${idx}_model" required>
      </div>
      <div class="form-field">
        <label>VIN</label>
        <input type="text" name="vehicle_${idx}_vin">
      </div>
      <div class="form-field">
        <label>Primary Use</label>
        <select name="vehicle_${idx}_use">
          <option value="">Select...</option>
          <option value="Commute">Commute</option>
          <option value="Pleasure">Pleasure</option>
          <option value="Business">Business</option>
          <option value="Rideshare">Rideshare</option>
        </select>
      </div>
      <div class="form-field">
        <label>Annual Mileage</label>
        <input type="number" name="vehicle_${idx}_mileage">
      </div>
      <div class="form-field">
        <label>Ownership</label>
        <select name="vehicle_${idx}_ownership">
          <option value="">Select...</option>
          <option value="Owned">Owned</option>
          <option value="Financed">Financed</option>
          <option value="Leased">Leased</option>
        </select>
      </div>
      <div class="form-field">
        <label>Garaging ZIP</label>
        <input type="text" name="vehicle_${idx}_garaging_zip">
      </div>
    </div>
  `;

  container.appendChild(card);

  const removeBtn = card.querySelector("[data-remove='vehicle']");
  removeBtn.addEventListener("click", () => {
    container.removeChild(card);
  });
}

/* ---------- DRIVERS SECTION ---------- */

let driverCount = 0;

function initDriversSection() {
  const container = document.getElementById("driversContainer");
  const addBtn = document.getElementById("addDriverBtn");
  if (!container || !addBtn) return;

  addBtn.addEventListener("click", () => addDriverCard(container));
  // Start with one driver by default
  addDriverCard(container);
}

function addDriverCard(container) {
  driverCount++;
  const idx = driverCount;

  const card = document.createElement("div");
  card.className = "auto-card auto-driver-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="auto-card-header">
      <h3>Driver #${idx}</h3>
      <button type="button" class="auto-remove-btn" data-remove="driver">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>First Name</label>
        <input type="text" name="driver_${idx}_first_name" required>
      </div>
      <div class="form-field">
        <label>Last Name</label>
        <input type="text" name="driver_${idx}_last_name" required>
      </div>
      <div class="form-field">
        <label>Date of Birth</label>
        <input type="date" name="driver_${idx}_dob" required>
      </div>
      <div class="form-field">
        <label>License Number</label>
        <input type="text" name="driver_${idx}_license_number">
      </div>
      <div class="form-field">
        <label>License State</label>
        <input type="text" name="driver_${idx}_license_state">
      </div>
      <div class="form-field">
        <label>Marital Status</label>
        <select name="driver_${idx}_marital_status">
          <option value="">Select...</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>
      <div class="form-field">
        <label>Relationship to Applicant</label>
        <input type="text" name="driver_${idx}_relationship">
      </div>
      <div class="form-field">
        <label>SR-22 Required?</label>
        <select name="driver_${idx}_sr22">
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Unsure">Unsure</option>
        </select>
      </div>
    </div>
  `;

  container.appendChild(card);

  const removeBtn = card.querySelector("[data-remove='driver']");
  removeBtn.addEventListener("click", () => {
    container.removeChild(card);
  });
}

/* ---------- INCIDENTS SECTION ---------- */

let incidentCount = 0;

function initIncidentsSection() {
  const toggle = document.getElementById("hasIncidents");
  const section = document.getElementById("incidentsSection");
  const container = document.getElementById("incidentsContainer");
  const addBtn = document.getElementById("addIncidentBtn");

  if (!toggle || !section || !container || !addBtn) return;

  toggle.addEventListener("change", () => {
    section.style.display = toggle.checked ? "block" : "none";
  });

  addBtn.addEventListener("click", () => addIncidentCard(container));
}

function addIncidentCard(container) {
  incidentCount++;
  const idx = incidentCount;

  const card = document.createElement("div");
  card.className = "auto-card auto-incident-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="auto-card-header">
      <h3>Incident #${idx}</h3>
      <button type="button" class="auto-remove-btn" data-remove="incident">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Type</label>
        <select name="incident_${idx}_type">
          <option value="">Select...</option>
          <option value="Accident">Accident</option>
          <option value="Ticket">Ticket</option>
          <option value="Claim">Claim</option>
          <option value="DUI">DUI</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-field">
        <label>Date</label>
        <input type="date" name="incident_${idx}_date">
      </div>
      <div class="form-field">
        <label>At Fault?</label>
        <select name="incident_${idx}_fault">
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div class="form-field">
        <label>Paid Amount (if known)</label>
        <input type="text" name="incident_${idx}_paid">
      </div>
      <div class="form-field">
        <label>Notes</label>
        <textarea name="incident_${idx}_notes" rows="2"></textarea>
      </div>
    </div>
  `;

  container.appendChild(card);

  const removeBtn = card.querySelector("[data-remove='incident']");
  removeBtn.addEventListener("click", () => {
    container.removeChild(card);
  });
}

/* ---------- WIZARD NAV ---------- */

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
