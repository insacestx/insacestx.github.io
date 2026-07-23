const commercialAutoConfig = {
  appType: "commercialauto",
  title_en: "Commercial Auto Insurance Application",
  title_es: "Solicitud de Seguro de Auto Comercial",

  steps: [
    {
      id: "business-info",
      title_en: "Business Information",
      title_es: "Información del Negocio",
      fields: [
        {
          id: "business_name",
          type: "text",
          label_en: "Business Legal Name",
          label_es: "Nombre Legal del Negocio",
          placeholder_en: "ABC Transport LLC",
          placeholder_es: "ABC Transport LLC",
          required: true
        },
        {
          id: "dba_name",
          type: "text",
          label_en: "DBA (if applicable)",
          label_es: "Nombre Comercial (si aplica)",
          placeholder_en: "Doing Business As",
          placeholder_es: "Nombre Comercial",
          required: false
        },
        {
          id: "fein",
          type: "text",
          label_en: "Federal EIN",
          label_es: "EIN Federal",
          placeholder_en: "12-3456789",
          placeholder_es: "12-3456789",
          required: true
        },
        {
          id: "business_phone",
          type: "text",
          label_en: "Business Phone",
          label_es: "Teléfono del Negocio",
          placeholder_en: "(555) 555-5555",
          placeholder_es: "(555) 555-5555",
          required: true
        },
        {
          id: "business_email",
          type: "text",
          label_en: "Business Email",
          label_es: "Correo Electrónico del Negocio",
          placeholder_en: "name@company.com",
          placeholder_es: "nombre@empresa.com",
          required: true
        },
        {
          id: "years_in_business",
          type: "text",
          label_en: "Years in Business",
          label_es: "Años en Operación",
          placeholder_en: "5",
          placeholder_es: "5",
          required: true
        }
      ]
    },

    {
      id: "address-info",
      title_en: "Garaging & Business Address",
      title_es: "Dirección del Negocio y Garaje",
      fields: [
        {
          id: "business_address",
          type: "text",
          label_en: "Street Address",
          label_es: "Dirección",
          placeholder_en: "123 Main St",
          placeholder_es: "123 Calle Principal",
          required: true
        },
        {
          id: "business_city",
          type: "text",
          label_en: "City",
          label_es: "Ciudad",
          placeholder_en: "Houston",
          placeholder_es: "Houston",
          required: true
        },
        {
          id: "business_state",
          type: "text",
          label_en: "State",
          label_es: "Estado",
          placeholder_en: "TX",
          placeholder_es: "TX",
          required: true
        },
        {
          id: "business_zip",
          type: "text",
          label_en: "ZIP Code",
          label_es: "Código Postal",
          placeholder_en: "77001",
          placeholder_es: "77001",
          required: true
        },
        {
          id: "same_as_garage",
          type: "select",
          label_en: "Garaging Address Same as Business Address?",
          label_es: "¿La dirección del garaje es igual a la del negocio?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        }
      ]
    },

    {
      id: "operations-info",
      title_en: "Operations",
      title_es: "Operaciones",
      fields: [
        {
          id: "business_type",
          type: "text",
          label_en: "Type of Business",
          label_es: "Tipo de Negocio",
          placeholder_en: "Contractor, Delivery, Service, etc.",
          placeholder_es: "Contratista, Entrega, Servicio, etc.",
          required: true
        },
        {
          id: "radius_of_operation",
          type: "select",
          label_en: "Operating Radius",
          label_es: "Radio de Operación",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "local-50", label_en: "Local (0-50 miles)", label_es: "Local (0-50 millas)" },
            { value: "intermediate-200", label_en: "Intermediate (51-200 miles)", label_es: "Intermedio (51-200 millas)" },
            { value: "long-haul", label_en: "Long Haul (200+ miles)", label_es: "Larga Distancia (200+ millas)" }
          ]
        },
        {
          id: "usdotor_mcp",
          type: "text",
          label_en: "USDOT / MCP (if applicable)",
          label_es: "USDOT / MCP (si aplica)",
          placeholder_en: "Enter number(s)",
          placeholder_es: "Ingrese número(s)",
          required: false
        },
        {
          id: "current_insurance",
          type: "select",
          label_en: "Currently Insured?",
          label_es: "¿Tiene seguro actualmente?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        },
        {
          id: "prior_losses",
          type: "select",
          label_en: "Any claims/losses in last 3 years?",
          label_es: "¿Reclamaciones/pérdidas en los últimos 3 años?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "no", label_en: "No", label_es: "No" },
            { value: "yes", label_en: "Yes", label_es: "Sí" }
          ]
        }
      ]
    },

    {
      id: "vehicle-info",
      title_en: "Vehicle Information",
      title_es: "Información de Vehículos",
      fields: [
        {
          id: "vehicle_count",
          type: "text",
          label_en: "Number of Vehicles",
          label_es: "Número de Vehículos",
          placeholder_en: "1",
          placeholder_es: "1",
          required: true
        },
        {
          id: "vehicle_use",
          type: "text",
          label_en: "Primary Vehicle Use",
          label_es: "Uso Principal de Vehículos",
          placeholder_en: "Delivery, service, hauling tools, etc.",
          placeholder_es: "Entrega, servicio, transporte de herramientas, etc.",
          required: true
        },
        {
          id: "owned_or_leased",
          type: "select",
          label_en: "Vehicles are",
          label_es: "Los vehículos son",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "owned", label_en: "Owned", label_es: "Propios" },
            { value: "leased", label_en: "Leased", label_es: "Arrendados" },
            { value: "mixed", label_en: "Mixed", label_es: "Mixtos" }
          ]
        },
        {
          id: "heavy_trucks",
          type: "select",
          label_en: "Any vehicles over 26,000 GVW?",
          label_es: "¿Vehículos mayores de 26,000 GVW?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "no", label_en: "No", label_es: "No" },
            { value: "yes", label_en: "Yes", label_es: "Sí" }
          ]
        },
        {
          id: "trailers",
          type: "select",
          label_en: "Any trailers to insure?",
          label_es: "¿Remolques para asegurar?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "no", label_en: "No", label_es: "No" },
            { value: "yes", label_en: "Yes", label_es: "Sí" }
          ]
        }
      ]
    },

    {
      id: "driver-info",
      title_en: "Driver Information",
      title_es: "Información de Conductores",
      fields: [
        {
          id: "driver_count",
          type: "text",
          label_en: "Number of Drivers",
          label_es: "Número de Conductores",
          placeholder_en: "1",
          placeholder_es: "1",
          required: true
        },
        {
          id: "youngest_driver_age",
          type: "text",
          label_en: "Youngest Driver Age",
          label_es: "Edad del Conductor Más Joven",
          placeholder_en: "25",
          placeholder_es: "25",
          required: true
        },
        {
          id: "mvr_issues",
          type: "select",
          label_en: "Any major violations in last 3 years?",
          label_es: "¿Infracciones graves en los últimos 3 años?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "no", label_en: "No", label_es: "No" },
            { value: "yes", label_en: "Yes", label_es: "Sí" }
          ]
        },
        {
          id: "cdl_required",
          type: "select",
          label_en: "CDL Required for operations?",
          label_es: "¿Se requiere CDL para operar?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        }
      ]
    },

    {
      id: "coverage-info",
      title_en: "Coverage Request",
      title_es: "Solicitud de Cobertura",
      fields: [
        {
          id: "liability_limit",
          type: "select",
          label_en: "Liability Limit",
          label_es: "Límite de Responsabilidad",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "30000", label_en: "$30,000", label_es: "$30,000" },
            { value: "100000", label_en: "$100,000", label_es: "$100,000" },
            { value: "300000", label_en: "$300,000", label_es: "$300,000" },
            { value: "500000", label_en: "$500,000", label_es: "$500,000" },
            { value: "1000000", label_en: "$1,000,000", label_es: "$1,000,000" }
          ]
        },
        {
          id: "physical_damage",
          type: "select",
          label_en: "Physical Damage Coverage?",
          label_es: "¿Cobertura de Daños Físicos?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        },
        {
          id: "cargo_coverage",
          type: "select",
          label_en: "Cargo Coverage Needed?",
          label_es: "¿Necesita Cobertura de Carga?",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        },
        {
          id: "effective_date",
          type: "date",
          label_en: "Requested Effective Date",
          label_es: "Fecha de Inicio Solicitada",
          required: true
        }
      ]
    },

    {
      id: "contact-info",
      title_en: "Contact & Final Details",
      title_es: "Contacto y Detalles Finales",
      fields: [
        {
          id: "contact_name",
          type: "text",
          label_en: "Primary Contact Name",
          label_es: "Nombre del Contacto Principal",
          placeholder_en: "Full name",
          placeholder_es: "Nombre completo",
          required: true
        },
        {
          id: "contact_phone",
          type: "text",
          label_en: "Contact Phone",
          label_es: "Teléfono de Contacto",
          placeholder_en: "(555) 555-5555",
          placeholder_es: "(555) 555-5555",
          required: true
        },
        {
          id: "contact_email",
          type: "text",
          label_en: "Contact Email",
          label_es: "Correo Electrónico de Contacto",
          placeholder_en: "email@company.com",
          placeholder_es: "correo@empresa.com",
          required: true
        },
        {
          id: "preferred_contact_method",
          type: "select",
          label_en: "Preferred Contact Method",
          label_es: "Método de Contacto Preferido",
          required: true,
          options: [
            { value: "", label_en: "Select", label_es: "Seleccione" },
            { value: "phone", label_en: "Phone", label_es: "Teléfono" },
            { value: "email", label_en: "Email", label_es: "Correo Electrónico" },
            { value: "text", label_en: "Text", label_es: "Mensaje de Texto" }
          ]
        },
        {
          id: "additional_notes",
          type: "text",
          label_en: "Additional Notes",
          label_es: "Notas Adicionales",
          placeholder_en: "Anything else we should know?",
          placeholder_es: "¿Algo más que debamos saber?",
          required: false
        }
      ]
    }
  ]
};

export default commercialAutoConfig;
