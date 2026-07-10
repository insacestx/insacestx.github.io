/* ============================================================
   ACES — SERVICES PAGE (DATA-DRIVEN)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initServicesPage();
});

const SERVICES_DATA = [
  // PERSONAL
  {
    category: "personal",
    icon: "Icons/icon-bundle-aces.png",
    enTitle: "Bundle & Save",
    esTitle: "Paquete y Ahorre",
    enDesc: "Combine policies for maximum savings.",
    esDesc: "Combine pólizas para obtener el máximo ahorro.",
    href: "services/bundle.html"
  },
  {
    category: "personal",
    icon: "Icons/icon-auto-aces.png",
    enTitle: "Auto Insurance",
    esTitle: "Seguro de Auto",
    enDesc: "Protect your vehicle with reliable coverage.",
    esDesc: "Proteja su vehículo con cobertura confiable.",
    href: "services/auto.html"
  },
  {
    category: "personal",
    icon: "Icons/icon-property-aces.png",
    enTitle: "Homeowners Insurance",
    esTitle: "Seguro de Casa",
    enDesc: "Coverage for your home and belongings.",
    esDesc: "Cobertura para su hogar y pertenencias.",
    href: "services/homeowners.html"
  },

  // COMMERCIAL
  {
    category: "commercial",
    icon: "Icons/icon-gl-aces.png",
    enTitle: "General Liability",
    esTitle: "Responsabilidad General",
    enDesc: "Protection from common business risks.",
    esDesc: "Protección contra riesgos comunes de negocios.",
    href: "services/gl.html"
  },
  {
    category: "commercial",
    icon: "Icons/icon-trucking-aces.png",
    enTitle: "Commercial Trucking",
    esTitle: "Transporte Comercial",
    enDesc: "Coverage for trucks, fleets, and commercial transport operations.",
    esDesc: "Cobertura para camiones, flotas y operaciones de transporte comercial.",
    href: "services/trucking.html"
  },

  // LIFE
  {
    category: "life",
    icon: "Icons/icon-life-aces.png",
    enTitle: "Life Insurance",
    esTitle: "Seguro de Vida",
    enDesc: "Flexible protection for your loved ones.",
    esDesc: "Protección flexible para sus seres queridos.",
    href: "services/life.html"
  },
  {
    category: "life",
    icon: "Icons/icon-term-life-aces.png",
    enTitle: "Term Life",
    esTitle: "Vida a Término",
    enDesc: "Affordable coverage for a set period.",
    esDesc: "Cobertura asequible por un período definido.",
    href: "services/life.html"
  }
];

const SECTION_LABELS = {
  personal: { en: "Personal Insurance", es: "Seguros Personales" },
  commercial: { en: "Commercial Insurance", es: "Seguros Comerciales" },
  life: { en: "Life Insurance Products", es: "Productos de Seguro de Vida" }
};

function initServicesPage() {
  const root = document.getElementById("servicesRoot");
  const buttons = Array.from(document.querySelectorAll(".filter-btn"));
  const searchInput = document.getElementById("serviceSearch");

  if (!root || !buttons.length) return;

  let activeFilter = "all";
  let search = "";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter || "all";
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(root, activeFilter, search);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      search = (e.target.value || "").trim().toLowerCase();
      render(root, activeFilter, search);
    });
  }

  render(root, activeFilter, search);
}

function render(root, activeFilter, search) {
  const filtered = SERVICES_DATA.filter((item) => {
    const categoryMatch = activeFilter === "all" || item.category === activeFilter;
    const text = `${item.enTitle} ${item.esTitle} ${item.enDesc} ${item.esDesc}`.toLowerCase();
    const searchMatch = !search || text.includes(search);
    return categoryMatch && searchMatch;
  });

  const groups = {
    personal: [],
    commercial: [],
    life: []
  };

  filtered.forEach((item) => groups[item.category].push(item));

  root.innerHTML = ["personal", "commercial", "life"]
    .map((category) => {
      const items = groups[category];
      if (!items.length) return "";

      const labels = SECTION_LABELS[category];
      return `
        <section class="services-section" data-section="${category}">
          <h2 data-en="${escapeHtml(labels.en)}" data-es="${escapeHtml(labels.es)}">${escapeHtml(labels.en)}</h2>
          <div class="services-grid">
            ${items.map(serviceCardHtml).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  if (!root.innerHTML.trim()) {
    root.innerHTML = `
      <section class="services-empty-state">
        <p data-en="No services match your search."
           data-es="No hay servicios que coincidan con su búsqueda.">
          No services match your search.
        </p>
      </section>
    `;
  }
}

function serviceCardHtml(item) {
  return `
    <article class="service-box" data-category="${escapeHtml(item.category)}">
      <img src="${escapeHtml(item.icon)}" alt="${escapeHtml(item.enTitle)}" />
      <h3 data-en="${escapeHtml(item.enTitle)}" data-es="${escapeHtml(item.esTitle)}">${escapeHtml(item.enTitle)}</h3>
      <p data-en="${escapeHtml(item.enDesc)}" data-es="${escapeHtml(item.esDesc)}">${escapeHtml(item.enDesc)}</p>
      <a href="${escapeHtml(item.href)}" class="service-btn" data-en="Learn More" data-es="Aprender Más">Learn More</a>
    </article>
  `;
}

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
