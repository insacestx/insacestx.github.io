document.addEventListener("DOMContentLoaded", function () {
  initRoundRobinEmail();
  initWizardNav();
  initUnderlyingPolicies();
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

/* ---------- UNDERLYING POLICIES ---------- */

let underlyingCount = 0;

function initUnderlyingPolicies() {
  const container = document.getElementById("underlyingContainer");
  const addBtn = document.getElementById("addUnderlyingBtn");

  addBtn.addEventListener("click", () => addUnderlyingPolicy(container));
  addUnderlyingPolicy(container);
}

function addUnderlyingPolicy(container) {
  underlyingCount++;
  const idx = underlyingCount;

  const card = document.createElement("div");
  card.className = "umbrella-card fade-in";
  card.dataset.index = idx;

  card.innerHTML = `
    <div class="umbrella-card-header">
      <h3>Policy #${idx}</h3>
      <button type="button" class="umbrella-remove-btn" data-remove="policy">×</button>
    </div>
    <div class="form-grid">
      <div class="form-field">
        <label>Policy Type</label>
        <select name="policy_${idx}_type" required>
          <option value="">Select...</option>
          <option value="Auto">Auto</option>
          <option value="Homeowners">Homeowners</option>
          <option value="Renters">Renters</option>
          <option value="Condo">Condo</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-field">
        <label>Carrier</label>
        <input type="text" name="policy_${idx}_carrier" required>
      </div>
      <div class="form-field">
        <label>Liability Limit</label>
        <input type="text" name="policy_${idx}_limit" required>
      </div>
    </div>
  `;

  container.appendChild(card);

  card.querySelector("[data-remove='policy']").addEventListener("click", () => {
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
