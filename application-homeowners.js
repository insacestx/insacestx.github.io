/* ============================================================
   ACES 2026 — HOMEOWNERS APPLICATION LOGIC
   Multi-step wizard, dynamic claims, co-applicant toggle,
   pool fenced toggle, validation, auto-scroll
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initHOWizard();
  initHOPoolToggle();
  initHOCoApplicant();
  initHOClaims();
});

/* ------------------------------------------------------------
   MULTI-STEP WIZARD
------------------------------------------------------------ */
function initHOWizard() {
  const panels = document.querySelectorAll(".ho-step-panel");
  const steps = document.querySelectorAll(".ho-step");
  const nextBtn = document.getElementById("hoNextBtn");
  const prevBtn = document.getElementById("hoPrevBtn");
  const form = document.getElementById("hoAppForm");

  if (!panels.length || !steps.length || !nextBtn || !prevBtn || !form) return;

  let currentStep = 1;
  const maxStep = panels.length;

  function showStep(step) {
    panels.forEach(panel => {
      const s = Number(panel.getAttribute("data-step"));
      panel.style.display = s === step ? "block" : "none";
    });

    steps.forEach(stepEl => {
      const s = Number(stepEl.getAttribute("data-step"));
      stepEl.classList.toggle("active", s === step);
      stepEl.classList.toggle("completed", s < step);
    });

    prevBtn.style.visibility = step === 1 ? "hidden" : "visible";
    nextBtn.style.display = step === maxStep ? "none" : "inline-flex";
  }

  function validateStep(step) {
    const panel = document.querySelector(`.ho-step-panel[data-step="${step}"]`);
    if (!panel) return true;

    const requiredFields = panel.querySelectorAll("input[required], select[required], textarea[required]");
    for (const field of requiredFields) {
      if (!field.value || (field.type === "checkbox" && !field.checked)) {
        field.focus();
        field.classList.add("ho-field-error");
        setTimeout(() => field.classList.remove("ho-field-error"), 1200);
        return false;
      }
    }
    return true;
  }

  nextBtn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < maxStep) {
      currentStep++;
      showStep(currentStep);
      scrollToTopHO();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      scrollToTopHO();
    }
  });

  form.addEventListener("submit", () => {
    const status = document.getElementById("hoFormStatus");
    if (status) status.textContent = "";
  });

  showStep(currentStep);
}

function scrollToTopHO() {
  const wrapper = document.querySelector(".ho-app-wrapper");
  if (!wrapper) return;
  wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------
   POOL FENCED TOGGLE
------------------------------------------------------------ */
function initHOPoolToggle() {
  const poolSelect = document.getElementById("hasPool");
  const poolExtras = document.querySelectorAll(".ho-pool-extra");

  if (!poolSelect || !poolExtras.length) return;

  function updatePoolVisibility() {
    const val = poolSelect.value;
    poolExtras.forEach(f => {
      f.style.display = val === "Yes" ? "block" : "none";
    });
  }

  poolSelect.addEventListener("change", updatePoolVisibility);
  updatePoolVisibility();
}

/* ------------------------------------------------------------
   CO-APPLICANT TOGGLE
------------------------------------------------------------ */
function initHOCoApplicant() {
  const select = document.getElementById("hasCoApplicant");
  const section = document.getElementById("coApplicantSection");

  if (!select || !section) return;

  function updateVisibility() {
    section.style.display = select.value === "Yes" ? "block" : "none";
  }

  select.addEventListener("change", updateVisibility);
  updateVisibility();
}

/* ------------------------------------------------------------
   DYNAMIC CLAIMS
------------------------------------------------------------ */
function initHOClaims() {
  const anyClaimsSelect = document.getElementById("anyClaimsHO");
  const container = document.getElementById("claimsContainerHO");
  const addBtn = document.getElementById("addClaimBtnHO");

  if (!anyClaimsSelect || !container || !addBtn) return;

  let claimCount = 1;

  function updateClaimsVisibility() {
    const val = anyClaimsSelect.value;
    container.style.display = val === "Yes" ? "flex" : "none";
    addBtn.style.display = val === "Yes" ? "inline-flex" : "none";
  }

  anyClaimsSelect.addEventListener("change", updateClaimsVisibility);
  updateClaimsVisibility();

  addBtn.addEventListener("click", () => {
    claimCount++;
    const template = container.querySelector(".claim-card");
    if (!template) return;

    const clone = template.cloneNode(true);

    clone.querySelectorAll("input, textarea, select").forEach(input => {
      const oldName = input.getAttribute("name") || "";
      const newName = oldName.replace("Claim 1", `Claim ${claimCount}`);
      input.setAttribute("name", newName);
      if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
        input.value = "";
      }
    });

    const title = clone.querySelector("h3");
    if (title) {
      title.textContent = `Claim ${claimCount}`;
      title.setAttribute("data-en", `Claim ${claimCount}`);
      title.setAttribute("data-es", `Reclamo ${claimCount}`);
    }

    container.appendChild(clone);
  });
}
