document.addEventListener("DOMContentLoaded", () => {
  initRoundRobinEmail();
  initWizardNav();
});

/* ROUND ROBIN */
function getRoundRobinList() {
  return [
    "bryan@insaces.com",
    "jordan@insaces.com",
    "lanse@insaces.com",
    "robert@insaces.com",
    "george@insaces.com",
    "jimmy@insaces.com",
    "office@insaces.com"
  ];
}

function getNextRoundRobinEmail() {
  const key = "aces_rr_index";
  const list = getRoundRobinList();
  let index = parseInt(localStorage.getItem(key) || "0", 10);
  if (isNaN(index) || index < 0 || index >= list.length) index = 0;
  const email = list[index];
  localStorage.setItem(key, (index + 1) % list.length);
  return email;
}

function initRoundRobinEmail() {
  const rrField = document.getElementById("rrEmail");
  if (rrField) rrField.value = getNextRoundRobinEmail();
}

/* WIZARD */
function initWizardNav() {
  const form = document.getElementById("bopAppForm");
  const steps = [...document.querySelectorAll(".form-step")];
  const indicators = [...document.querySelectorAll("#bopWizardSteps .auto-wizard-step")];
  const consent = document.getElementById("consentCheckbox");

  let current = 0;

  function show(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    indicators.forEach((ind, idx) => {
      ind.classList.toggle("active", idx === i);
      ind.classList.toggle("completed", idx < i);
    });
    current = i;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (current < steps.length - 1) {
      show(current + 1);
      if (current === 4) buildReview();
    }
  }

  function prev() {
    if (current > 0) show(current - 1);
  }

  document.querySelectorAll("[data-next-step]").forEach(b => b.addEventListener("click", next));
  document.querySelectorAll("[data-prev-step]").forEach(b => b.addEventListener("click", prev));

  indicators.forEach((ind, idx) => ind.addEventListener("click", () => {
    if (idx <= current) show(idx);
  }));

  function val(n) {
    return form.elements[n] ? form.elements[n].value.trim() : "";
  }

  function fill(id, items) {
    const ul = document.getElementById(id);
    ul.innerHTML = "";
    items.forEach(i => {
      if (i.value) {
        const li = document.createElement("li");
        li.textContent = `${i.label}: ${i.value}`;
        ul.appendChild(li);
      }
    });
  }

  function buildReview() {
    fill("reviewBusiness", [
      { label: "Business Name", value: val("business_name") },
      { label: "DBA", value: val("dba") },
      { label: "Business Type", value: val("business_type") },
      { label: "EIN", value: val("ein") },
      { label: "Phone", value: val("business_phone") },
      { label: "Email", value: val("business_email") },
      { label: "Address", value: val("business_address") },
      { label: "City", value: val("city") },
      { label: "State", value: val("state") },
      { label: "ZIP", value: val("zip") },
      { label: "Description", value: val("business_description") }
    ]);

    fill("reviewProperty", [
      { label: "Building Value", value: val("building_value") },
      { label: "Contents Value", value: val("contents_value") },
      { label: "Construction Type", value: val("construction_type") },
      { label: "Property Notes", value: val("property_notes") }
    ]);

    fill("reviewLiability", [
      { label: "GL Limit", value: val("gl_limit") },
      { label: "Liability Notes", value: val("liability_notes") }
    ]);

    fill("reviewOperations", [
      { label: "Operations Description", value: val("operations_description") },
      { label: "Operations Notes", value: val("operations_notes") }
    ]);
  }

  form.addEventListener("submit", e => {
    if (!consent.checked) {
      e.preventDefault();
      alert("Please confirm the information is accurate.");
      return;
    }
    buildReview();
  });

  show(0);
}
