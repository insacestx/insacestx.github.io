export default {
    title_en: "Life Insurance Application",
    title_es: "Solicitud de Seguro de Vida",

    steps: [
        {
            id: "insured",
            title_en: "Proposed Insured",
            title_es: "Asegurado Propuesto",
            fields: [
                { id: "fullName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
                { id: "dob", label_en: "Date of Birth", label_es: "Fecha de Nacimiento", type: "date", required: true },
                {
                    id: "gender",
                    label_en: "Gender",
                    label_es: "Género",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "male", label_en: "Male", label_es: "Masculino" },
                        { value: "female", label_en: "Female", label_es: "Femenino" },
                        { value: "other", label_en: "Other", label_es: "Otro" }
                    ]
                },
                {
                    id: "tobaccoUse",
                    label_en: "Tobacco Use?",
                    label_es: "¿Uso de Tabaco?",
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
                    id: "productType",
                    label_en: "Product Type",
                    label_es: "Tipo de Producto",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "term", label_en: "Term", label_es: "Plazo" },
                        { value: "whole", label_en: "Whole Life", label_es: "Vida Entera" },
                        { value: "ul", label_en: "Universal Life", label_es: "Vida Universal" }
                    ]
                },
                { id: "faceAmount", label_en: "Face Amount", label_es: "Monto de la Póliza", type: "number", required: true },
                { id: "termLength", label_en: "Term Length (if Term)", label_es: "Duración del Plazo (si aplica)", type: "number" }
            ]
        },

        {
            id: "beneficiaries",
            title_en: "Beneficiaries",
            title_es: "Beneficiarios",
            fields: [
                { id: "primaryBeneficiary", label_en: "Primary Beneficiary", label_es: "Beneficiario Principal", type: "text", required: true },
                { id: "contingentBeneficiary", label_en: "Contingent Beneficiary", label_es: "Beneficiario Contingente", type: "text" }
            ]
        }
    ]
};
