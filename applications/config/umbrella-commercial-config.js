export default {
    title_en: "Commercial Umbrella Insurance Application",
    title_es: "Solicitud de Seguro Umbrella Comercial",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "industry", label_en: "Industry", label_es: "Industria", type: "text", required: true },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true }
            ]
        },

        {
            id: "underlying",
            title_en: "Underlying Policies",
            title_es: "Pólizas Subyacentes",
            fields: [
                { id: "glLimit", label_en: "General Liability Limit", label_es: "Límite de Responsabilidad General", type: "number", required: true },
                { id: "autoLimit", label_en: "Commercial Auto Limit", label_es: "Límite de Auto Comercial", type: "number" },
                { id: "workersComp", label_en: "Workers Comp Policy?", label_es: "¿Póliza de Compensación para Trabajadores?", type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        },

        {
            id: "exposures",
            title_en: "Exposures",
            title_es: "Exposiciones",
            fields: [
                { id: "numVehicles", label_en: "Number of Commercial Vehicles", label_es: "Número de Vehículos Comerciales", type: "number" },
                { id: "numLocations", label_en: "Number of Locations", label_es: "Número de Ubicaciones", type: "number" },
                { id: "annualRevenue", label_en: "Annual Revenue", label_es: "Ingresos Anuales", type: "number", required: true }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Requested",
            title_es: "Cobertura Solicitada",
            fields: [
                { id: "umbrellaLimit", label_en: "Umbrella Limit Requested", label_es: "Límite Umbrella Solicitado", type: "number", required: true }
            ]
        }
    ]
};
