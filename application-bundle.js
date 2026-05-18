document.addEventListener("DOMContentLoaded", function () {
  initRoundRobinEmail();
  initWizardNav();
  initBundleLogic();
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

/* ---------- BUNDLE LOGIC ---------- */

function initBundleLogic() {
  const checks = document.querySelectorAll(".bundle-check");
  const detailsContainer = document.getElementById("bundleDetailsContainer");
  const coverageContainer = document.getElementById("bundleCoverageContainer");

  function renderSections() {
    const selected = Array.from(checks)
      .filter(c => c.checked)
      .map(c => c.value);

    detailsContainer.innerHTML = "";
    coverageContainer.innerHTML = "";

    selected.forEach(type => {
      detailsContainer.appendChild(createDetailsSection(type));
      coverageContainer.appendChild(createCoverageSection(type));
    });
  }

  checks.forEach(c => c.addEventListener("change", renderSections));
}

/* ---------- DETAILS SECTIONS ---------- */

function createDetailsSection(type) {
  const div = document.createElement("div");
  div.className = "bundle-card fade-in";

  const titles = {
    auto: "Auto Details",
    home: "Homeowners Details",
    renters: "Renters Details",
    condo: "Condo Details",
    umbrella: "Umbrella Details",
    flood: "Flood Details"
  };

  div.innerHTML = `
    <h3>${titles[type]}</h3>
    <div class="form-grid">
      <div class="form-field">
        <label>Notes for ${titles[type]}</label>
        <textarea name="${type}_details" rows="3"></textarea>
      </div>
    </div>
  `;

  return div;
}

/* ---------- COVERAGE SECTIONS ---------- */

function createCoverageSection(type) {
  const div = document.createElement("div");
  div.className = "bundle-card fade-in";

  const titles = {
    auto: "Auto Coverage",
    home: "Homeowners Coverage",
    renters: "Renters Coverage",
    condo: "Condo Coverage",
    umbrella: "Umbrella Coverage",
    flood: "Flood Coverage"
  };

  div.innerHTML = `
    <h3>${titles[type]}</h3>
    <div class="form-grid">
      <div class="form-field">
        <label>Coverage Notes</label>
        <textarea name="${type}_coverage" rows="3"></textarea>
      </div>
    </div>
  `;

  return div;
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
