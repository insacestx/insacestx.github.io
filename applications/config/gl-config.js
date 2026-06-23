export default {
    title_en: "General Liability Insurance Application",
    title_es: "Solicitud de Seguro de Responsabilidad General",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "industry", label_en: "Industry / NAICS", label_es: "Industria / NAICS", type: "text", required: true },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true },
                { id: "annualRevenue", label_en: "Annual Revenue", label_es: "Ingresos Anuales", type: "number", required: true }
            ]
        },

        {
            id: "operations",
            title_en: "Operations & Exposures",
            title_es: "Operaciones y Exposiciones",
            fields: [
                { id: "operationsDescription", label_en: "Description of Operations", label_es: "Descripción de Operaciones", type: "text", required: true },
                {
                    id: "productsExposure",
                    label_en: "Products Exposure?",
                    label_es: "¿Exposición por Productos?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "subcontractors",
                    label_en: "Use of Subcontractors?",
                    label_es: "¿Uso de Subcontratistas?",
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
                { id: "eachOccurrenceLimit", label_en: "Each Occurrence Limit", label_es: "Límite por Incidente", type: "number", required: true },
                { id: "aggregateLimit", label_en: "General Aggregate Limit", label_es: "Límite Agregado General", type: "number", required: true },
                { id: "deductible", label_en: "Deductible (if any)", label_es: "Deducible (si aplica)", type: "number" }
            ]
        }
    ]
};
