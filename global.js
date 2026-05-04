/* ============================================================
   ACES GLOBAL.JS — RESTORED + CLEAN
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* NAVIGATION INJECTION */
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  function loadNav(lang){
    if(!navContainer) return;
    navContainer.innerHTML = lang === "spanish" ? navES.innerHTML : navEN.innerHTML;
    activateDropdowns();
  }

  /* DROPDOWNS */
  function activateDropdowns(){
    document.querySelectorAll(".dropdown-toggle").forEach(toggle=>{
      toggle.addEventListener("click",e=>{
        e.stopPropagation();
        const menu = toggle.nextElementSibling;
        document.querySelectorAll(".dropdown-menu").forEach(m=>{
          if(m!==menu) m.classList.remove("show");
        });
        menu.classList.toggle("show");
      });
    });

    document.addEventListener("click",()=>{
      document.querySelectorAll(".dropdown-menu").forEach(m=>m.classList.remove("show"));
    });
  }

  /* MOBILE NAV */
  const mobileToggle = document.getElementById("mobileNavToggle");
  if(mobileToggle){
    mobileToggle.addEventListener("click",()=>{
      navContainer.classList.toggle("open");
    });
  }

  /* LANGUAGE SWITCH (CONTACT PAGE ONLY) */
  const langButtons = document.querySelectorAll(".lang-option");
  const englishSection = document.getElementById("english");
  const spanishSection = document.getElementById("spanish");

  function setLanguage(lang){
    if(!englishSection || !spanishSection) return;

    langButtons.forEach(btn=>btn.classList.remove("active"));
    document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

    englishSection.style.display = lang === "english" ? "block" : "none";
    spanishSection.style.display = lang === "spanish" ? "block" : "none";

    loadNav(lang);
  }

  langButtons.forEach(btn=>{
    btn.addEventListener("click",()=>setLanguage(btn.dataset.lang));
  });

  /* INITIAL LOAD */
  loadNav("english");
  setLanguage("english");

});
