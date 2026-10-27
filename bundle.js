/* ============================================================
   ACES Bundle Quote Builder
   - Multi-step wizard
   - Dynamic sections for selected policies
   - Unified Round Robin routing (shared with whole site)
   - FormSubmit POST delivery (no mailto)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bundleForm");
  const checks = document.querySelectorAll(".bundle-check");
  const detailsContainer = document.getElementById("bundleDetailsContainer");
  const coverageContainer = document.getElementById("bundleCoverageContainer");
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".wizard-step");

  const OFFICE_EMAIL = "office@insaces.com";

  function normalizeLang(v) {
    const x = String(v || "").trim().toLowerCase();
    return x === "es" || x === "spanish" ? "es" : "en";
  }

  function getCurrentLang() {
    return normalizeLang(localStorage.getItem("acesLang") || "en");
  }

  function ensureHiddenInput(name, value = "") {
    if (!form) return null;
    let input = form.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
    return input;
  }

  /**
   * Routing mode:
   * - Primary recipient remains OFFICE via form action.
   * - Assigned agent is copied via _cc.
   * - We still store rr metadata fields for audit/tracking.
   */
  function assignRoundRobinForSubmit() {
    if (!form) return { email: OFFICE_EMAIL, lang: getCurrentLang(), assignedIndex: -1 };

    const lang = getCurrentLang();
    let assignment = null;

    if (window.acesRoundRobin?.getNextAssignment) {
      assignment = window.acesRoundRobin.getNextAssignment(lang);
    }

    const agentEmail = String(assignment?.email || "").toLowerCase().trim() || OFFICE_EMAIL;
    const assignedIndex = Number.isInteger(assignment?.assignedIndex) ? assignment.assignedIndex : -1;
    const assignedAt = assignment?.assignedAt || new Date().toISOString();

    // Keep office as primary destination (set in HTML form action)
    // Agent gets CC only if not office.
    ensureHiddenInput("_cc", agentEmail !== OFFICE_EMAIL ? agentEmail : "");

    // Optional safety if your form HTML has/uses _to elsewhere:
    // force _to to office so primary recipient is consistent
    ensureHiddenInput("_to", OFFICE_EMAIL);

    // FormSubmit helpers
    ensureHiddenInput("_captcha", "false");
    ensureHiddenInput("_next", "https://insacestx.github.io/thank-you.html");
    ensureHiddenInput("_subject", "New Bundle Quote Request");

    // Round-robin/audit metadata included in email body table
    ensureHiddenInput("rrEmail", agentEmail);
    ensureHiddenInput("routingLanguage", lang);
    ensureHiddenInput("assignedAgentEmail", agentEmail);
    ensureHiddenInput("roundRobinLang", lang);
    ensureHiddenInput("roundRobinIndex", assignedIndex >= 0 ? String(assignedIndex) : "");
    ensureHiddenInput("roundRobinAssignedAt", assignedAt);
    ensureHiddenInput("roundRobinMode", "office-primary-agent-cc");

    return { email: agentEmail, lang, assignedIndex, assignedAt };
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
      <h3>${titles[type] || type}</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Notes for ${titles[type] || type}</label>
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
      <h3>${titles[type] || type}</h3>
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

    if (detailsContainer) detailsContainer.innerHTML = "";
    if (coverageContainer) coverageContainer.innerHTML = "";

    selected.forEach(type => {
      if (detailsContainer) detailsContainer.appendChild(createDetailsSection(type));
      if (coverageContainer) coverageContainer.appendChild(createCoverageSection(type));
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
      // IMPORTANT: do NOT prevent default; allow normal POST to FormSubmit.
      const assignment = assignRoundRobinForSubmit();

      // Optional: lightweight validation guard
      if (!assignment?.email) {
        e.preventDefault();
        alert("No assigned agent email found. Please try again.");
        return;
      }

      // Helpful debug log (can remove in production)
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
      console.log("Bundle Quote POST (FormSubmit):", entries);
    });
  }

  // Initial render
  renderSections();
});
