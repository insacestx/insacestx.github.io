/* ============================================================
   ACES Bundle Quote Builder
   - Multi-step wizard
   - Dynamic sections for selected policies
   - Unified Round Robin routing (shared with whole site)
   - No Cloudflare
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bundleForm");
  const checks = document.querySelectorAll(".bundle-check");
  const detailsContainer = document.getElementById("bundleDetailsContainer");
  const coverageContainer = document.getElementById("bundleCoverageContainer");
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".wizard-step");

  function normalizeLang(v) {
    const x = String(v || "").trim().toLowerCase();
    return x === "es" || x === "spanish" ? "es" : "en";
  }

  function getCurrentLang() {
    return normalizeLang(localStorage.getItem("acesLang") || "en");
  }

  function assignRoundRobinEmail() {
    if (!form) return "";

    const lang = getCurrentLang();
    let target = "";

    if (window.acesRoundRobin?.getNextAssignment) {
      const next = window.acesRoundRobin.getNextAssignment(lang);
      target = next?.email || "";
    }

    // Fallback (only if shared engine missing)
    if (!target) {
      const fallback = [
        "george@insaces.com",
        "jordan@insaces.com",
        "lanse@insaces.com",
        "robert@insaces.com",
        "bryan@insaces.com",
        "jimmy@insaces.com",
        "office@insaces.com"
      ];
      const key = lang === "es" ? "acesRoundRobinIndexEs" : "acesRoundRobinIndexEn";
      const idxRaw = Number(localStorage.getItem(key));
      const idx = Number.isFinite(idxRaw) && idxRaw >= 0 ? idxRaw : 0;
      target = fallback[idx % fallback.length];
      localStorage.setItem(key, String((idx + 1) % fallback.length));
      localStorage.setItem("acesRrLastAssigned", target);
    }

    let hidden = form.querySelector("input[name='_to']");
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "_to";
      form.appendChild(hidden);
    }
    hidden.value = target;

    return target;
  }

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
    const selected = Array.from(checks).filter(c => c.checked).map(c => c.value);
    if (detailsContainer) detailsContainer.innerHTML = "";
    if (coverageContainer) coverageContainer.innerHTML = "";

    selected.forEach(type => {
      if (detailsContainer) detailsContainer.appendChild(createDetailsSection(type));
      if (coverageContainer) coverageContainer.appendChild(createCoverageSection(type));
    });
  }

  checks.forEach(c => c.addEventListener("change", renderSections));

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

  function buildBundleEmailBody(entries, assignedEmail) {
    const lines = [
      "New Bundle Quote Request",
      `Assigned Agent: ${assignedEmail || "—"}`,
      `Language: ${getCurrentLang().toUpperCase()}`,
      `Submitted At: ${new Date().toLocaleString()}`,
      "",
      "----- Form Data -----"
    ];

    Object.entries(entries).forEach(([k, v]) => {
      lines.push(`${k}: ${v}`);
    });

    return lines.join("\n");
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const assignedEmail = assignRoundRobinEmail();

      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());

      const subject = `New Bundle Quote - ${entries.fullName || entries.name || entries.email || "Customer"}`;
      const body = buildBundleEmailBody(entries, assignedEmail);

      if (assignedEmail) {
        const mailto = `mailto:${encodeURIComponent(assignedEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }

      console.log("Bundle Quote Submitted:", entries);

      alert("Your bundle quote request has been submitted! An ACES agent will contact you shortly.");

      form.reset();
      if (detailsContainer) detailsContainer.innerHTML = "";
      if (coverageContainer) coverageContainer.innerHTML = "";
      checks.forEach(c => (c.checked = false));
      showStep(1);
    });
  }

  renderSections();
});
