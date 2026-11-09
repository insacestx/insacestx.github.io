export default {
  title_en: "ATV / UTV Insurance Application",
  title_es: "Solicitud de Seguro ATV / UTV",

  steps: [
    {
      id: "owner",
      title_en: "Owner Information",
      title_es: "Información del Propietario",
      fields: [
        {
          id: "ownerName",
          label_en: "Full Name",
          label_es: "Nombre Completo",
          type: "text",
          required: true
        },
        {
          id: "phone",
          label_en: "Phone Number",
          label_es: "Número de Teléfono",
          type: "text",
          required: true
        },
        {
          id: "email",
          label_en: "Email Address",
          label_es: "Correo Electrónico",
          type: "email",
          required: true
        },
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
      id: "vehicle",
      title_en: "Vehicle Details",
      title_es: "Detalles del Vehículo",
      fields: [
        {
          id: "year",
          label_en: "Year",
          label_es: "Año",
          type: "number",
          required: true
        },
        {
          id: "make",
          label_en: "Make",
          label_es: "Marca",
          type: "text",
          required: true
        },
        {
          id: "model",
          label_en: "Model",
          label_es: "Modelo",
          type: "text",
          required: true
        },
        {
          id: "vin",
          label_en: "VIN",
          label_es: "VIN",
          type: "text",
          required: false
        },
        {
          id: "vehicleType",
          label_en: "Vehicle Type",
          label_es: "Tipo de Vehículo",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "atv", label_en: "ATV", label_es: "ATV" },
            { value: "utv", label_en: "UTV", label_es: "UTV" },
            { value: "dirtbike", label_en: "Dirt Bike", label_es: "Motocicleta de Tierra" }
          ]
        }
      ]
    },

    {
      id: "usage",
      title_en: "Usage & Terrain",
      title_es: "Uso y Terreno",
      fields: [
        {
          id: "usageType",
          label_en: "Usage Type",
          label_es: "Tipo de Uso",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "recreational", label_en: "Recreational", label_es: "Recreativo" },
            { value: "farm", label_en: "Farm/Ranch", label_es: "Granja/Rancho" },
            { value: "business", label_en: "Business", label_es: "Negocios" }
          ]
        },
        {
          id: "terrain",
          label_en: "Typical Terrain",
          label_es: "Terreno Típico",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "trails", label_en: "Trails", label_es: "Senderos" },
            { value: "dunes", label_en: "Sand Dunes", label_es: "Dunas" },
            { value: "mud", label_en: "Mud", label_es: "Lodo" },
            { value: "mountains", label_en: "Mountains", label_es: "Montañas" },
            { value: "farm-ranch", label_en: "Farm / Ranch Land", label_es: "Granja / Rancho" },
            { value: "mixed", label_en: "Mixed Terrain", label_es: "Terreno Mixto" }
          ]
        }
      ]
    },

    {
      id: "coverage",
      title_en: "Coverage Options",
      title_es: "Opciones de Cobertura",
      fields: [
        {
          id: "liabilityLimit",
          label_en: "Liability Limit",
          label_es: "Límite de Responsabilidad",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "25000", label_en: "$25,000", label_es: "$25,000" },
            { value: "50000", label_en: "$50,000", label_es: "$50,000" },
            { value: "100000", label_en: "$100,000", label_es: "$100,000" },
            { value: "300000", label_en: "$300,000", label_es: "$300,000" },
            { value: "500000", label_en: "$500,000", label_es: "$500,000" }
          ]
        },
        {
          id: "compDeductible",
          label_en: "Comprehensive Deductible",
          label_es: "Deducible de Cobertura Amplia",
          type: "select",
          required: false,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "250", label_en: "$250", label_es: "$250" },
            { value: "500", label_en: "$500", label_es: "$500" },
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" }
          ]
        },
        {
          id: "collisionDeductible",
          label_en: "Collision Deductible",
          label_es: "Deducible de Colisión",
          type: "select",
          required: false,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "250", label_en: "$250", label_es: "$250" },
            { value: "500", label_en: "$500", label_es: "$500" },
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" }
          ]
        }
      ]
    }
  ]
};
