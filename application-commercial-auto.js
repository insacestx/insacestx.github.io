document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commercialAutoForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    console.log("Commercial Auto Application Submitted:", entries);

    alert("Your commercial auto application has been submitted! An ACES agent will contact you shortly.");

    form.reset();
  });
});
