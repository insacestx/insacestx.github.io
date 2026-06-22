/* ============================================================
   ACES UNIVERSAL WIZARD ENGINE
============================================================ */

const ACESWizard = {

  currentStep: 0,
  steps: [],
  indicators: [],
  form: null,

  init() {

    this.form = document.querySelector(".aces-form");

    if (!this.form) return;

    this.steps = [
      ...document.querySelectorAll(".form-step")
    ];

    this.indicators = [
      ...document.querySelectorAll(".aces-wizard-step")
    ];

    this.attachEvents();

    this.showStep(0);

    console.log("ACES Wizard Loaded");
  },

  /* ============================================================
     STEP DISPLAY
  ============================================================ */

  showStep(index) {

    this.currentStep = index;

    this.steps.forEach((step,i)=>{
      step.classList.toggle("active", i===index);
    });

    this.indicators.forEach((step,i)=>{
      step.classList.toggle("active", i===index);
    });

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  },

  /* ============================================================
     NEXT
  ============================================================ */

  next() {

    if(!this.validateStep()) return;

    if(this.currentStep < this.steps.length-1){

      this.showStep(this.currentStep+1);

      if(this.currentStep===this.steps.length-1){
        this.buildReview();
      }
    }
  },

  /* ============================================================
     BACK
  ============================================================ */

  back() {

    if(this.currentStep>0){
      this.showStep(this.currentStep-1);
    }
  },

  /* ============================================================
     VALIDATION
  ============================================================ */

  validateStep() {

    const current = this.steps[this.currentStep];

    let valid = true;

    current.querySelectorAll("[required]")
      .forEach(field=>{

      field.classList.remove("field-error");

      if(!field.value.trim()){

        field.classList.add("field-error");

        valid = false;
      }

    });

    return valid;
  },

  /* ============================================================
     REVIEW BUILDER
  ============================================================ */

  buildReview() {

    const review = document.getElementById("reviewContainer");

    if(!review) return;

    review.innerHTML = "";

    const fields = this.form.querySelectorAll(
      "input,select,textarea"
    );

    fields.forEach(field=>{

      if(
        !field.name ||
        field.type==="hidden" ||
        !field.value
      ) return;

      const row = document.createElement("div");

      row.className = "review-row";

      row.innerHTML = `
        <strong>
          ${field.name.replaceAll("_"," ")}
        </strong>
        <span>${field.value}</span>
      `;

      review.appendChild(row);

    });

  },

  /* ============================================================
     REPEATERS
  ============================================================ */

  addRepeater(templateId, containerId) {

    const template =
      document.getElementById(templateId);

    const container =
      document.getElementById(containerId);

    if(!template || !container) return;

    const clone =
      template.content.cloneNode(true);

    container.appendChild(clone);

    this.attachRemoveButtons();
  },

  attachRemoveButtons() {

    document
      .querySelectorAll(".remove-repeater")
      .forEach(btn=>{

      btn.onclick=()=>{

        btn.closest(".repeater-card")
          ?.remove();

      };

    });
  },

  /* ============================================================
     EVENTS
  ============================================================ */

  attachEvents() {

    document.addEventListener("click",(e)=>{

      if(e.target.closest(".wizard-next")){

        e.preventDefault();

        this.next();
      }

      if(e.target.closest(".wizard-back")){

        e.preventDefault();

        this.back();
      }

      if(e.target.closest("[data-add-repeater]")){

        e.preventDefault();

        this.addRepeater(
          e.target.dataset.template,
          e.target.dataset.container
        );
      }

    });

  }

};

/* ============================================================
   START
============================================================ */

document.addEventListener(
  "DOMContentLoaded",
  ()=>ACESWizard.init()
);
