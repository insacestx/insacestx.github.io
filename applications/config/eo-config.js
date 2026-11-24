export default {
    title_en: "Errors & Omissions (E&O) Insurance Application",
    title_es: "Solicitud de Seguro de Errores y Omisiones (E&O)",

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
                { id: "industry", label_en: "Professional Field", label_es: "Campo Profesional", type: "text", required: true },
                { id: "yearsExperience", label_en: "Years of Experience", label_es: "Años de Experiencia", type: "number", required: true }
            ]
        },

        {
            id: "operations",
            title_en: "Professional Services",
            title_es: "Servicios Profesionales",
            fields: [
                { id: "services", label_en: "Description of Services", label_es: "Descripción de Servicios", type: "text", required: true },
                {
                    id: "contractsUsed",
                    label_en: "Written Contracts Used?",
                    label_es: "¿Usa Contratos Escritos?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "clientTypes",
                    label_en: "Primary Client Types",
                    label_es: "Tipos de Clientes Principales",
                    type: "text"
                }
            ]
        },

        {
            id: "claims",
            title_en: "Claims History",
            title_es: "Historial de Reclamos",
            fields: [
                {
                    id: "claimsPast5Years",
                    label_en: "Claims in Past 5 Years",
                    label_es: "Reclamos en los Últimos 5 Años",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "0", label_en: "0", label_es: "0" },
                        { value: "1-2", label_en: "1–2", label_es: "1–2" },
                        { value: "3+", label_en: "3 or more", label_es: "3 o más" }
                    ]
                },
                {
                    id: "openClaims",
                    label_en: "Any Open Claims?",
                    label_es: "¿Reclamos Abiertos?",
                    type: "select",
                    required: true,
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
            title_en: "Coverage Requested",
            title_es: "Cobertura Solicitada",
            fields: [
                {
                    id: "limit",
                    label_en: "Liability Limit",
                    label_es: "Límite de Responsabilidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "$250,000", label_en: "$250,000", label_es: "$250,000" },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" },
                        { value: "$3,000,000", label_en: "$3,000,000", label_es: "$3,000,000" },
                        { value: "$5,000,000", label_en: "$5,000,000", label_es: "$5,000,000" }
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
                        { value: "$1,000", label_en: "$1,000", label_es: "$1,000" },
                        { value: "$2,500", label_en: "$2,500", label_es: "$2,500" },
                        { value: "$5,000", label_en: "$5,000", label_es: "$5,000" },
                        { value: "$10,000", label_en: "$10,000", label_es: "$10,000" },
                        { value: "$25,000", label_en: "$25,000", label_es: "$25,000" }
                    ]
                }
            ]
        }
    ]
};
