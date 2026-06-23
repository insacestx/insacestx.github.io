export default {
    title_en: "Workers Compensation Insurance Application",
    title_es: "Solicitud de Seguro de Compensación para Trabajadores",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "fein", label_en: "FEIN", label_es: "FEIN", type: "text" },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true }
            ]
        },

        {
            id: "payroll",
            title_en: "Payroll & Employees",
            title_es: "Nómina y Empleados",
            fields: [
                { id: "numEmployees", label_en: "Number of Employees", label_es: "Número de Empleados", type: "number", required: true },
                { id: "annualPayroll", label_en: "Total Annual Payroll", label_es: "Nómina Anual Total", type: "number", required: true },
                { id: "classCodes", label_en: "Primary Class Codes", label_es: "Códigos de Clasificación Primarios", type: "text", required: true }
            ]
        },

        {
            id: "lossHistory",
            title_en: "Loss History",
            title_es: "Historial de Pérdidas",
            fields: [
                {
                    id: "lossesPast3Years",
                    label_en: "Losses in Past 3 Years",
                    label_es: "Pérdidas en los Últimos 3 Años",
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
                    id: "lossRunsAvailable",
                    label_en: "Loss Runs Available?",
                    label_es: "¿Reportes de Pérdidas Disponibles?",
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
