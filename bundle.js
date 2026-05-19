/* ============================================================
   ACES Bundle Quote Builder
   - Multi-step wizard
   - Dynamic sections for selected policies
   - Round Robin routing (sales)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bundleForm");
  const checks = document.querySelectorAll(".bundle-check");
  const detailsContainer = document.getElementById("bundleDetailsContainer");
  const coverageContainer = document.getElementById("bundleCoverageContainer");
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".wizard-step");

  // Round Robin agents (SALES)
  const rrAgents = [
    "george@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "bryan@insaces.com",
    "jimmy@insaces.com",
    "office@insaces.com"
  ];

  function assignRoundRobinEmail() {
    if (!form) return;

    let index = parseInt(localStorage.getItem("rrIndex") || "0", 10);
    const target = rrAgents[index];
    localStorage.setItem("rrIndex", (index + 1) % rrAgents.length);

    let hidden = form.querySelector("input[name='_to']");
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "_to";
      form.appendChild(hidden);
    }
    hidden.value = target;
  }

  /* ---------- Dynamic Sections ---------- */

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

  /* ---------- Wizard Navigation ---------- */

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

  /* ---------- Form Submit ---------- */

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Assign Round Robin target for this SALES bundle form
      assignRoundRobinEmail();

      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
      console.log("Bundle Quote Submitted:", entries);

      alert("Your bundle quote request has been submitted! An ACES agent will contact you shortly.");

      form.reset();
      detailsContainer.innerHTML = "";
      coverageContainer.innerHTML = "";
      checks.forEach(c => (c.checked = false));
      showStep(1);
    });
  }

  // Initial render (in case nothing is selected yet)
  renderSections();
});
