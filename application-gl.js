/* ============================================================
   ACES 2026 — GENERAL LIABILITY APPLICATION LOGIC
   Multi-step wizard, dynamic claims, subcontractor toggles
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initGLWizard();
  initGLClaims();
  initGLSubcontractors();
});

function initGLWizard() {
  const panels = document.querySelectorAll(".gl-step-panel");
  const steps = document.querySelectorAll(".gl-step");
  const nextBtn = document.getElementById("glNextBtn");
  const prevBtn = document.getElementById("glPrevBtn");
  const form = document.getElementById("glAppForm");

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
    const panel = document.querySelector(`.gl-step-panel[data-step="${step}"]`);
    if (!panel) return true;

    const requiredFields = panel.querySelectorAll("input[required], select[required], textarea[required]");
    for (const field of requiredFields) {
      if (!field.value || (field.type === "checkbox" && !field.checked)) {
        field.focus();
        field.classList.add("gl-field-error");
        setTimeout(() => field.classList.remove("gl-field-error"), 1200);
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
      scrollToTopOfGLForm();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      scrollToTopOfGLForm();
    }
  });

  form.addEventListener("submit", () => {
    const status = document.getElementById("glFormStatus");
    if (status) status.textContent = "";
  });

  showStep(currentStep);
}

function scrollToTopOfGLForm() {
  const wrapper = document.querySelector(".gl-app-wrapper");
  if (!wrapper) return;
  wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------
   SUBCONTRACTOR TOGGLE
------------------------------------------------------------ */
function initGLSubcontractors() {
  const select = document.getElementById("usesSubcontractors");
  const extraFields = document.querySelectorAll(".gl-subcontractor-extra");
  if (!select || !extraFields.length) return;

  function updateVisibility() {
    const val = select.value;
    extraFields.forEach(f => {
      f.style.display = val === "Yes" ? "block" : "none";
    });
  }

  select.addEventListener("change", updateVisibility);
  updateVisibility();
}

/* ------------------------------------------------------------
   DYNAMIC CLAIMS
------------------------------------------------------------ */
function initGLClaims() {
  const anyClaimsSelect = document.getElementById("anyClaims");
  const container = document.getElementById("claimsContainer");
  const addBtn = document.getElementById("addClaimBtn");

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
