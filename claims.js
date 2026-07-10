/* ============================================================
   ACES — CLAIMS PAGE DIRECTORY (DATA-DRIVEN)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initClaimsDirectory();
  initCallAgentButton();
});

const CLAIM_CARRIERS = [
  {
    key: "allstate",
    name: "Allstate",
    phoneDisplay: "1-800-255-7828",
    phoneHref: "+18002557828",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.allstate.com/claims",
    logo: "Icons/carriers/allstate.png",
    brandColor: "#003da5"
  },
  {
    key: "natgen",
    name: "National General",
    phoneDisplay: "1-800-468-3466",
    phoneHref: "+18004683466",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.nationalgeneral.com/claims",
    logo: "Icons/carriers/national-general.png",
    brandColor: "#f47a20"
  },
  {
    key: "wellington",
    name: "Wellington",
    phoneDisplay: "1-800-447-6465",
    phoneHref: "+18004476465",
    hoursEn: "Business Hours",
    hoursEs: "Horario Laboral",
    website: "https://www.wellingtoninsgroup.com",
    logo: "Icons/carriers/wellington.png",
    brandColor: "#2b4c7e"
  },
  {
    key: "safeco",
    name: "Safeco",
    phoneDisplay: "1-800-332-3226",
    phoneHref: "+18003323226",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.safeco.com/claims",
    logo: "Icons/carriers/safeco.png",
    brandColor: "#005bbb"
  },
  {
    key: "foremost",
    name: "Foremost",
    phoneDisplay: "1-800-527-3907",
    phoneHref: "+18005273907",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.foremost.com/claims",
    logo: "Icons/carriers/foremost.png",
    brandColor: "#1d4e89"
  },
  {
    key: "rhp",
    name: "RHP",
    phoneDisplay: "1-888-472-5246",
    phoneHref: "+18884725246",
    hoursEn: "Business Hours",
    hoursEs: "Horario Laboral",
    website: "https://www.rhpis.com",
    logo: "Icons/carriers/rhp.png",
    brandColor: "#7a1f1f"
  },
  {
    key: "conifer",
    name: "Conifer (Arbor)",
    phoneDisplay: "1-877-263-6468",
    phoneHref: "+18772636468",
    hoursEn: "Business Hours",
    hoursEs: "Horario Laboral",
    website: "https://www.cnfrh.com",
    logo: "Icons/carriers/conifer.png",
    brandColor: "#2f7a3f"
  },
  {
    key: "progressive",
    name: "Progressive",
    phoneDisplay: "1-800-776-4737",
    phoneHref: "+18007764737",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.progressive.com/claims",
    logo: "Icons/carriers/progressive.png",
    brandColor: "#1d4f91"
  },
  {
    key: "bristolwest",
    name: "Bristol West",
    phoneDisplay: "1-800-274-7865",
    phoneHref: "+18002747865",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.bristolwest.com/claims",
    logo: "Icons/carriers/bristol-west.png",
    brandColor: "#111827"
  },
  {
    key: "gainsco",
    name: "Gainsco",
    phoneDisplay: "1-866-424-6726",
    phoneHref: "+18664246726",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.gainsco.com/claims",
    logo: "Icons/carriers/gainsco.png",
    brandColor: "#0f766e"
  },
  {
    key: "geico",
    name: "GEICO",
    phoneDisplay: "1-800-841-3000",
    phoneHref: "+18008413000",
    hoursEn: "24/7",
    hoursEs: "24/7",
    website: "https://www.geico.com/claims",
    logo: "Icons/carriers/geico.png",
    brandColor: "#1f2937"
  }
];

function initClaimsDirectory() {
  const carrierGrid = document.querySelector(".carrier-grid");
  if (!carrierGrid) return;

  carrierGrid.innerHTML = CLAIM_CARRIERS.map(buildCarrierCard).join("");
}

function buildCarrierCard(carrier) {
  return `
    <div class="carrier-card" data-brand="${escapeHtml(carrier.key)}" style="--brand:${escapeHtml(carrier.brandColor)};">
      <div class="carrier-head">
        <img src="${escapeHtml(carrier.logo)}" alt="${escapeHtml(carrier.name)} logo" class="carrier-logo" />
        <h3>${escapeHtml(carrier.name)}</h3>
      </div>

      <p>
        <strong data-en="Phone:" data-es="Teléfono:">Phone:</strong>
        <a href="tel:${escapeHtml(carrier.phoneHref)}">${escapeHtml(carrier.phoneDisplay)}</a>
      </p>

      <p>
        <strong data-en="Claims Hours:" data-es="Horario de Reclamos:">Claims Hours:</strong>
        <span data-en="${escapeHtml(carrier.hoursEn)}" data-es="${escapeHtml(carrier.hoursEs)}">${escapeHtml(carrier.hoursEn)}</span>
      </p>

      <a href="${escapeHtml(carrier.website)}"
         target="_blank"
         rel="noopener"
         data-en="File Online"
         data-es="Presentar en Línea">
         File Online
      </a>
    </div>
  `;
}

function initCallAgentButton() {
  const callAgentBtn = document.getElementById("callAgentBtn");
  if (!callAgentBtn) return;

  // TODO: replace with your real office/claims line
  const officeNumber = "+12105551234";

  callAgentBtn.addEventListener("click", () => {
    window.location.href = `tel:${officeNumber}`;
  });
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
