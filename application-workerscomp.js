document.addEventListener("DOMContentLoaded", function () {
  initRoundRobinEmail();
  initWizardNav();
  initEmployeeClasses();
  initPayrollRows();
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

/* ---------- EMPLOYEE CLASSES ---------- */

let employeeClassCount = 0;

function initEmployeeClasses() {
  const container = document.getElementById("employeeClassesContainer");
  const addBtn = document.getElementById("addEmployeeClassBtn");

  addBtn.addEventListener("click", () => addEmployeeClass(container));
  addEmployeeClass(container);
}

function addEmployeeClass(container) {
  employeeClassCount++;
  const idx = employeeClassCount;

  const card = document.createElement("div");
  card.className = "wc-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="wc-card-header">
      <h3>Class Code #${idx}</h3>
      <button type="button" class="wc-remove-btn" data-remove="class">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Class Code</label>
        <input type="text" name="class_${idx}_code" required>
      </div>
      <div class="form-field">
        <label># of Employees</label>
        <input type="number" name="class_${idx}_employees" required>
      </div>
    </div>
  `;

  container.appendChild(card);

  card.querySelector("[data-remove='class']").addEventListener("click", () => {
    container.removeChild(card);
  });
}

/* ---------- PAYROLL ROWS ---------- */

let payrollCount = 0;

function initPayrollRows() {
  const container = document.getElementById("payrollContainer");
  const addBtn = document.getElementById("addPayrollRowBtn");

  addBtn.addEventListener("click", () => addPayrollRow(container));
  addPayrollRow(container);
}

function addPayrollRow(container) {
  payrollCount++;
  const idx = payrollCount;

  const card = document.createElement("div");
  card.className = "wc-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="wc-card-header">
      <h3>Payroll Row #${idx}</h3>
      <button type="button" class="wc-remove-btn" data-remove="payroll">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Class Code</label>
        <input type="text" name="payroll_${idx}_code" required>
      </div>
      <div class="form-field">
        <label>Annual Payroll</label>
        <input type="number" name="payroll_${idx}_amount" required>
      </div>
    </div>
  `;

  container.appendChild(card);

  card.querySelector("[data-remove='payroll']").addEventListener("click", () => {
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
