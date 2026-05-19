document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rentersAppForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    console.log("Renters Application Submitted:", entries);

    alert("Your application has been submitted! An ACES agent will contact you shortly.");

    form.reset();
  });
});
