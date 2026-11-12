export default {
    title_en: "Condo Insurance Application",
    title_es: "Solicitud de Seguro de Condominio",

    steps: [
        {
            id: "personal",
            title_en: "Personal Information",
            title_es: "Información Personal",
            fields: [
                { id: "fullName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
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
            id: "property",
            title_en: "Condo Details",
            title_es: "Detalles del Condominio",
            fields: [
                { id: "address", label_en: "Condo Address", label_es: "Dirección del Condominio", type: "text", required: true },
                { id: "city", label_en: "City", label_es: "Ciudad", type: "text", required: true },
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
                { id: "zip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                { id: "unitFloor", label_en: "Unit Floor", label_es: "Piso de la Unidad", type: "number" },
                { id: "yearBuilt", label_en: "Year Built", label_es: "Año de Construcción", type: "number" }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "dwellingImprovements", label_en: "Improvements & Betterments Coverage", label_es: "Mejoras y Mejoramientos", type: "number", required: true },
                { id: "personalProperty", label_en: "Personal Property Coverage", label_es: "Cobertura de Propiedad Personal", type: "number", required: true },
                {
                    id: "liabilityCoverage",
                    label_en: "Liability Coverage",
                    label_es: "Cobertura de Responsabilidad",
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
                        { value: "500", label_en: "$500", label_es: "$500" },
                        { value: "1000", label_en: "$1,000", label_es: "$1,000" },
                        { value: "2500", label_en: "$2,500", label_es: "$2,500" },
                        { value: "5000", label_en: "$5,000", label_es: "$5,000" }
                    ]
                }
            ]
        },

        {
            id: "association",
            title_en: "Association Details",
            title_es: "Detalles de la Asociación",
            fields: [
                { id: "hoaName", label_en: "HOA / Condo Association Name", label_es: "Nombre de la Asociación (HOA)", type: "text" },
                { id: "masterPolicyCarrier", label_en: "Master Policy Carrier", label_es: "Aseguradora de la Póliza Maestra", type: "text" },
                {
                    id: "masterPolicyDeductible",
                    label_en: "Master Policy Deductible",
                    label_es: "Deducible de la Póliza Maestra",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "500", label_en: "$500", label_es: "$500" },
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
