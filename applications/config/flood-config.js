export default {
  title_en: "Flood Insurance Application",
  title_es: "Solicitud de Seguro contra Inundaciones",

  steps: [
    {
      id: "contact",
      title_en: "Contact Information",
      title_es: "Información de Contacto",
      fields: [
        {
          id: "fullName",
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
      id: "property",
      title_en: "Property Information",
      title_es: "Información de la Propiedad",
      fields: [
        {
          id: "propertyAddress",
          label_en: "Property Address",
          label_es: "Dirección de la Propiedad",
          type: "text",
          required: true
        },
        {
          id: "city",
          label_en: "City",
          label_es: "Ciudad",
          type: "text",
          required: true
        },
        {
          id: "state",
          label_en: "State (Texas only for now)",
          label_es: "Estado (solo Texas por ahora)",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "TX", label_en: "Texas", label_es: "Texas" }
          ]
        },
        {
          id: "zip",
          label_en: "ZIP Code",
          label_es: "Código Postal",
          type: "text",
          required: true
        },
        {
          id: "occupancy",
          label_en: "Occupancy Type",
          label_es: "Tipo de Ocupación",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "primary", label_en: "Primary Residence", label_es: "Residencia Principal" },
            { value: "secondary", label_en: "Secondary Residence", label_es: "Residencia Secundaria" },
            { value: "rental", label_en: "Rental", label_es: "Renta" }
          ]
        }
      ]
    },

    {
      id: "structure",
      title_en: "Structure Details",
      title_es: "Detalles de la Estructura",
      fields: [
        {
          id: "yearBuilt",
          label_en: "Year Built",
          label_es: "Año de Construcción",
          type: "number",
          required: true
        },
        {
          id: "foundationType",
          label_en: "Foundation Type",
          label_es: "Tipo de Cimentación",
          type: "text"
        },
        {
          id: "elevationCert",
          label_en: "Elevation Certificate Available?",
          label_es: "¿Certificado de Elevación Disponible?",
          type: "select",
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
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
          id: "buildingLimit",
          label_en: "Building Coverage Limit",
          label_es: "Límite de Cobertura del Edificio",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "100000", label_en: "$100,000", label_es: "$100,000" },
            { value: "150000", label_en: "$150,000", label_es: "$150,000" },
            { value: "200000", label_en: "$200,000", label_es: "$200,000" },
            { value: "250000", label_en: "$250,000", label_es: "$250,000" },
            { value: "300000", label_en: "$300,000", label_es: "$300,000" },
            { value: "500000", label_en: "$500,000", label_es: "$500,000" }
          ]
        },
        {
          id: "contentsLimit",
          label_en: "Contents Coverage Limit",
          label_es: "Límite de Contenido",
          type: "select",
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "25000", label_en: "$25,000", label_es: "$25,000" },
            { value: "50000", label_en: "$50,000", label_es: "$50,000" },
            { value: "75000", label_en: "$75,000", label_es: "$75,000" },
            { value: "100000", label_en: "$100,000", label_es: "$100,000" },
            { value: "150000", label_en: "$150,000", label_es: "$150,000" },
            { value: "200000", label_en: "$200,000", label_es: "$200,000" }
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
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" },
            { value: "5000", label_en: "$5,000", label_es: "$5,000" },
            { value: "10000", label_en: "$10,000", label_es: "$10,000" }
          ]
        }
      ]
    }
  ]
};
