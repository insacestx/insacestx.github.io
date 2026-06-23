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
                    label_en: "State",
                    label_es: "Estado",
                    type: "text",
                    required: true
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
                    type: "number",
                    required: true
                },
                {
                    id: "deductible",
                    label_en: "Deductible Amount",
                    label_es: "Monto del Deducible",
                    type: "number",
                    required: true
                }
            ]
        }
    ]
};
