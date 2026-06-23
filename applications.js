/* ==========================================
   ACES 2026 APPLICATIONS PAGE ENGINE
   Filtering • Search • Wizard Routing
========================================== */

/* FILTER BUTTONS */
const filterButtons = document.querySelectorAll(".filter-btn");
const appCards = document.querySelectorAll(".app-card");
const searchInput = document.getElementById("appSearch");

/* Apply filter */
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Show/hide cards
        appCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        // Reset search when switching filters
        searchInput.value = "";
    });
});

/* SEARCH FUNCTION */
searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    appCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const desc = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(term) || desc.includes(term)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

/* ROUTE TO WIZARD */
appCards.forEach(card => {
    card.addEventListener("click", () => {
        const file = card.getAttribute("data-file");

        if (!file) return;

        // Extract app name from filename (auto.html → auto)
        const appName = file.replace(".html", "");

        // Redirect to universal wizard
        window.location.href = `/wizard.html?app=${appName}`;
    });
});
