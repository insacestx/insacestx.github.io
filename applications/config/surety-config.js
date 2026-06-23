export default {
    title_en: "Surety Bond Application",
    title_es: "Solicitud de Fianza (Surety Bond)",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "fein", label_en: "FEIN", label_es: "FEIN", type: "text" },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true },
                { id: "industry", label_en: "Industry / Trade", label_es: "Industria / Oficio", type: "text", required: true }
            ]
        },

        {
            id: "bondDetails",
            title_en: "Bond Details",
            title_es: "Detalles de la Fianza",
            fields: [
                {
                    id: "bondType",
                    label_en: "Bond Type",
                    label_es: "Tipo de Fianza",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "contract", label_en: "Contract Bond", label_es: "Fianza Contractual" },
                        { value: "license", label_en: "License/Permit Bond", label_es: "Fianza de Licencia/Permiso" },
                        { value: "court", label_en: "Court Bond", label_es: "Fianza Judicial" }
                    ]
                },
                { id: "bondAmount", label_en: "Bond Amount", label_es: "Monto de la Fianza", type: "number", required: true },
                { id: "obligee", label_en: "Obligee Name", label_es: "Nombre del Beneficiario (Obligee)", type: "text", required: true }
            ]
        },

        {
            id: "financials",
            title_en: "Financial Information",
            title_es: "Información Financiera",
            fields: [
                { id: "annualRevenue", label_en: "Annual Revenue", label_es: "Ingresos Anuales", type: "number", required: true },
                { id: "netWorth", label_en: "Net Worth", label_es: "Valor Neto", type: "number" },
                {
                    id: "creditCheck",
                    label_en: "Credit Check Authorization?",
                    label_es: "¿Autoriza Revisión de Crédito?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        }
    ]
};
