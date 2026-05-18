document.addEventListener("DOMContentLoaded", function () {
  initRoundRobinEmail();
  initWizardNav();
  initVehicles();
  initDrivers();
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

/* ---------- VEHICLES ---------- */

let vehicleCount = 0;

function initVehicles() {
  const container = document.getElementById("vehicleContainer");
  const addBtn = document.getElementById("addVehicleBtn");

  addBtn.addEventListener("click", () => addVehicle(container));
  addVehicle(container);
}

function addVehicle(container) {
  vehicleCount++;
  const idx = vehicleCount;

  const card = document.createElement("div");
  card.className = "ca-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="ca-card-header">
      <h3>Vehicle #${idx}</h3>
      <button type="button" class="ca-remove-btn" data-remove="vehicle">×</button>
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
    </div>
  `;

  container.appendChild(card);

  card.querySelector("[data-remove='vehicle']").addEventListener("click", () => {
    container.removeChild(card);
  });
}

/* ---------- DRIVERS ---------- */

let driverCount = 0;

function initDrivers() {
  const container = document.getElementById("driverContainer");
  const addBtn = document.getElementById("addDriverBtn");

  addBtn.addEventListener("click", () => addDriver(container));
  addDriver(container);
}

function addDriver(container) {
  driverCount++;
  const idx = driverCount;

  const card = document.createElement("div");
  card.className = "ca-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="ca-card-header">
      <h3>Driver #${idx}</h3>
      <button type="button" class="ca-remove-btn" data-remove="driver">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Full Name</label>
        <input type="text" name="driver_${idx}_name" required>
      </div>
      <div class="form-field">
        <label>Date of Birth</label>
        <input type="date" name="driver_${idx}_dob" required>
      </div>
      <div class="form-field">
        <label>License Number</label>
        <input type="text" name="driver_${idx}_license">
      </div>
    </div>
  `;

  container.appendChild(card);

  card.querySelector("[data-remove='driver']").addEventListener("click", () => {
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
