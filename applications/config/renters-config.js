export default {
    title_en: "Renters Insurance Application",
    title_es: "Solicitud de Seguro de Inquilino",

    steps: [
        {
            id: "personal",
            title_en: "Personal Information",
            title_es: "Información Personal",
            fields: [
                {
                    id: "fullName",
                    label_en: "Full Name",
                    label_es: "Nombre Completo",
                    type: "text",
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
                },
                {
                    id: "dob",
                    label_en: "Date of Birth",
                    label_es: "Fecha de Nacimiento",
                    type: "date",
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
                }
            ]
        },

        {
            id: "property",
            title_en: "Property Information",
            title_es: "Información de la Propiedad",
            fields: [
                {
                    id: "rentalAddress",
                    label_en: "Rental Address",
                    label_es: "Dirección de la Vivienda",
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
                    id: "propertyType",
                    label_en: "Property Type",
                    label_es: "Tipo de Propiedad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "apartment", label_en: "Apartment", label_es: "Departamento" },
                        { value: "condo", label_en: "Condo", label_es: "Condominio" },
                        { value: "townhome", label_en: "Townhome", label_es: "Casa Adosada" },
                        { value: "singlefamily", label_en: "Single Family Home", label_es: "Casa Unifamiliar" }
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
                    id: "personalProperty",
                    label_en: "Personal Property Coverage",
                    label_es: "Cobertura de Propiedad Personal",
                    type: "number",
                    required: true
                },
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
                    label_en: "Deductible Amount",
                    label_es: "Monto del Deducible",
                    type: "select",
                    required: true,
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
