export default {
  title_en: "Boat Insurance Application",
  title_es: "Solicitud de Seguro para Embarcaciones",

  steps: [
    {
      id: "owner",
      title_en: "Owner Information",
      title_es: "Información del Propietario",
      fields: [
        { id: "ownerName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
        { id: "phone", label_en: "Phone Number", label_es: "Número de Teléfono", type: "text", required: true },
        { id: "email", label_en: "Email Address", label_es: "Correo Electrónico", type: "email", required: true },
        {
          id: "preferredLanguage",
          label_en: "Preferred Agent Language",
          label_es: "Idioma Preferido del Agente",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "en", label_en: "English", label_es: "Inglés" },
            { value: "es", label_en: "Spanish", label_es: "Español" }
          ]
        }
      ]
    },

    {
      id: "vessel",
      title_en: "Vessel Details",
      title_es: "Detalles de la Embarcación",
      fields: [
        { id: "vesselYear", label_en: "Year", label_es: "Año", type: "number", required: true },
        { id: "vesselMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
        { id: "vesselModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
        { id: "hullId", label_en: "HIN (Hull ID)", label_es: "HIN (ID del Casco)", type: "text", required: true },
        {
          id: "length",
          label_en: "Length",
          label_es: "Longitud",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "under16", label_en: "Under 16 ft", label_es: "Menos de 16 pies" },
            { value: "16to20", label_en: "16 - 20 ft", label_es: "16 - 20 pies" },
            { value: "21to25", label_en: "21 - 25 ft", label_es: "21 - 25 pies" },
            { value: "26to30", label_en: "26 - 30 ft", label_es: "26 - 30 pies" },
            { value: "31to40", label_en: "31 - 40 ft", label_es: "31 - 40 pies" },
            { value: "41plus", label_en: "41+ ft", label_es: "41+ pies" }
          ]
        },
        {
          id: "vesselType",
          label_en: "Vessel Type",
          label_es: "Tipo de Embarcación",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "runabout", label_en: "Runabout", label_es: "Lancha" },
            { value: "pontoon", label_en: "Pontoon", label_es: "Pontón" },
            { value: "sailboat", label_en: "Sailboat", label_es: "Velero" },
            { value: "fishing", label_en: "Fishing Boat", label_es: "Lancha de Pesca" },
            { value: "yacht", label_en: "Yacht", label_es: "Yate" }
          ]
        }
      ]
    },

    {
      id: "usage",
      title_en: "Usage & Mooring",
      title_es: "Uso y Atraque",
      fields: [
        {
          id: "primaryWaters",
          label_en: "Primary Waters",
          label_es: "Aguas Principales",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "inland-lakes", label_en: "Inland Lakes", label_es: "Lagos Interiores" },
            { value: "rivers", label_en: "Rivers", label_es: "Ríos" },
            { value: "gulf-nearshore", label_en: "Gulf Nearshore", label_es: "Golfo Costero" },
            { value: "coastal-bays", label_en: "Coastal Bays", label_es: "Bahías Costeras" },
            { value: "offshore", label_en: "Offshore", label_es: "Mar Abierto" }
          ]
        },
        { id: "mooringLocation", label_en: "Mooring Location", label_es: "Lugar de Atraque", type: "text", required: true },
        {
          id: "layupPeriod",
          label_en: "Lay-Up Period",
          label_es: "Período de Inactividad",
          type: "select",
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "none", label_en: "No Lay-Up", label_es: "Sin Inactividad" },
            { value: "1to3", label_en: "1 - 3 months", label_es: "1 - 3 meses" },
            { value: "4to6", label_en: "4 - 6 months", label_es: "4 - 6 meses" },
            { value: "7plus", label_en: "7+ months", label_es: "7+ meses" }
          ]
        },
        {
          id: "usageType",
          label_en: "Usage Type",
          label_es: "Tipo de Uso",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "pleasure", label_en: "Pleasure", label_es: "Recreativo" },
            { value: "fishing", label_en: "Fishing", label_es: "Pesca" },
            { value: "charter", label_en: "Charter", label_es: "Charter" }
          ]
        }
      ]
    },

    {
      id: "coverage",
      title_en: "Coverage Options",
      title_es: "Opciones de Cobertura",
      fields: [
        { id: "hullValue", label_en: "Hull Agreed Value", label_es: "Valor Acordado del Casco", type: "number", required: true },
        {
          id: "liabilityLimit",
          label_en: "Liability Limit",
          label_es: "Límite de Responsabilidad",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "100000", label_en: "$100,000", label_es: "$100,000" },
            { value: "300000", label_en: "$300,000", label_es: "$300,000" },
            { value: "500000", label_en: "$500,000", label_es: "$500,000" },
            { value: "1000000", label_en: "$1,000,000", label_es: "$1,000,000" }
          ]
        },
        {
          id: "deductible",
          label_en: "Deductible",
          label_es: "Deducible",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "250", label_en: "$250", label_es: "$250" },
            { value: "500", label_en: "$500", label_es: "$500" },
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" }
          ]
        },
        { id: "medicalPayments", label_en: "Medical Payments Limit", label_es: "Límite de Pagos Médicos", type: "number" },
        {
          id: "trailerCoverage",
          label_en: "Trailer Coverage?",
          label_es: "¿Cobertura para Remolque?",
          type: "select",
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        }
      ]
    }
  ]
};
