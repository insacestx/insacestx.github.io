export default {
  title_en: "RV Insurance Application",
  title_es: "Solicitud de Seguro para RV",

  steps: [
    {
      id: "owner",
      title_en: "Owner Information",
      title_es: "Información del Propietario",
      fields: [
        { id: "ownerName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
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
        },
        { id: "phone", label_en: "Phone Number", label_es: "Número de Teléfono", type: "text", required: true },
        { id: "email", label_en: "Email Address", label_es: "Correo Electrónico", type: "email", required: true }
      ]
    },

    {
      id: "rvDetails",
      title_en: "RV Details",
      title_es: "Detalles del RV",
      fields: [
        { id: "rvYear", label_en: "Year", label_es: "Año", type: "number", required: true },
        { id: "rvMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
        { id: "rvModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
        { id: "vin", label_en: "VIN", label_es: "VIN", type: "text", required: true },
        {
          id: "rvType",
          label_en: "RV Type",
          label_es: "Tipo de RV",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "motorhome", label_en: "Motorhome", label_es: "Casa Rodante" },
            { value: "travelTrailer", label_en: "Travel Trailer", label_es: "Remolque" },
            { value: "fifthWheel", label_en: "Fifth Wheel", label_es: "Quinta Rueda" },
            { value: "camper", label_en: "Truck Camper", label_es: "Camper" }
          ]
        }
      ]
    },

    {
      id: "usage",
      title_en: "Usage & Storage",
      title_es: "Uso y Almacenamiento",
      fields: [
        {
          id: "fullTime",
          label_en: "Full-Time RV Use?",
          label_es: "¿Uso de RV a Tiempo Completo?",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        },
        {
          id: "annualMiles",
          label_en: "Estimated Annual Miles",
          label_es: "Millas Anuales Estimadas",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "0-2500", label_en: "0 - 2,500 miles", label_es: "0 - 2,500 millas" },
            { value: "2501-5000", label_en: "2,501 - 5,000 miles", label_es: "2,501 - 5,000 millas" },
            { value: "5001-7500", label_en: "5,001 - 7,500 miles", label_es: "5,001 - 7,500 millas" },
            { value: "7501-10000", label_en: "7,501 - 10,000 miles", label_es: "7,501 - 10,000 millas" },
            { value: "10001+", label_en: "10,001+ miles", label_es: "10,001+ millas" }
          ]
        },
        {
          id: "storageLocation",
          label_en: "Primary Storage Location",
          label_es: "Lugar de Almacenamiento",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "home-driveway", label_en: "Home Driveway", label_es: "Cochera en Casa" },
            { value: "home-garage", label_en: "Home Garage", label_es: "Garaje en Casa" },
            { value: "covered-storage", label_en: "Covered Storage Facility", label_es: "Almacenamiento Cubierto" },
            { value: "open-storage", label_en: "Open Storage Facility", label_es: "Almacenamiento Abierto" },
            { value: "rv-park", label_en: "RV Park / Campground", label_es: "Parque RV / Campamento" }
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
          id: "liabilityLimits",
          label_en: "Liability Limits",
          label_es: "Límites de Responsabilidad",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "50/100/50", label_en: "50/100/50", label_es: "50/100/50" },
            { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" },
            { value: "250/500/250", label_en: "250/500/250", label_es: "250/500/250" },
            { value: "500/500/500", label_en: "500/500/500", label_es: "500/500/500" }
          ]
        },
        {
          id: "compDeductible",
          label_en: "Comprehensive Deductible",
          label_es: "Deducible de Cobertura Amplia",
          type: "select",
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
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "250", label_en: "$250", label_es: "$250" },
            { value: "500", label_en: "$500", label_es: "$500" },
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" }
          ]
        },
        { id: "contentsCoverage", label_en: "Contents Coverage Limit", label_es: "Límite de Contenido", type: "number" }
      ]
    }
  ]
};
