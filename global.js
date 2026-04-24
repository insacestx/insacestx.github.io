function loadNav(language) {
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  if (language === "en") {
    navContainer.innerHTML = navEN.innerHTML;
  } else {
    navContainer.innerHTML = navES.innerHTML;
  }
}

function toggleLanguage() {
  const en = document.getElementById("english");
  const es = document.getElementById("spanish");
  const toggle = document.getElementById("langToggle");

  if (toggle.checked) {
    loadNav("es");
    en.style.opacity = 0;
    setTimeout(() => {
      en.style.display = "none";
      es.style.display = "block";
      setTimeout(() => { es.style.opacity = 1; }, 50);
    }, 300);
  } else {
    loadNav("en");
    es.style.opacity = 0;
    setTimeout(() => {
      es.style.display = "none";
      en.style.display = "block";
      setTimeout(() => { en.style.opacity = 1; }, 50);
    }, 300);
  }
}

// Load English nav on page load
loadNav("en");

// Mobile nav toggle
document.getElementById("mobileNavToggle").addEventListener("click", () => {
  let mobileMenu = document.getElementById("mobileNavMenu");
  const toggle = document.getElementById("langToggle");
  const currentLang = toggle.checked ? "es" : "en";
  const sourceNav = currentLang === "en" ? document.getElementById("navEN") : document.getElementById("navES");

  if (!mobileMenu) {
    mobileMenu = document.createElement("nav");
    mobileMenu.id = "mobileNavMenu";
    mobileMenu.className = "nav-menu mobile-open";
    document.querySelector(".aces-header").appendChild(mobileMenu);
  }

  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.innerHTML = sourceNav.innerHTML;
    mobileMenu.style.display = "flex";
  }
});
