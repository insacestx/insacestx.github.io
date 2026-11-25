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
                { id: "industry", label_en: "Industry", label_es: "Industria", type: "text", required: true },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true }
            ]
        },

        {
            id: "underlying",
            title_en: "Underlying Policies",
            title_es: "Pólizas Subyacentes",
            fields: [
                {
                    id: "glLimit",
                    label_en: "General Liability Limit",
                    label_es: "Límite de Responsabilidad General",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" }
                    ]
                },
                {
                    id: "autoLimit",
                    label_en: "Commercial Auto Limit",
                    label_es: "Límite de Auto Comercial",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "None", label_en: "None", label_es: "Ninguno" },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$750,000", label_en: "$750,000", label_es: "$750,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" }
                    ]
                },
                {
                    id: "workersComp",
                    label_en: "Workers Comp Policy?",
                    label_es: "¿Póliza de Compensación para Trabajadores?",
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
                {
                    id: "umbrellaLimit",
                    label_en: "Umbrella Limit Requested",
                    label_es: "Límite Umbrella Solicitado",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" },
                        { value: "$3,000,000", label_en: "$3,000,000", label_es: "$3,000,000" },
                        { value: "$4,000,000", label_en: "$4,000,000", label_es: "$4,000,000" },
                        { value: "$5,000,000", label_en: "$5,000,000", label_es: "$5,000,000" },
                        { value: "$10,000,000", label_en: "$10,000,000", label_es: "$10,000,000" }
                    ]
                }
            ]
        }
    ]
};
