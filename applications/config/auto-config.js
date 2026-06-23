export default {
    title_en: "Auto Insurance Application",
    title_es: "Solicitud de Seguro de Auto",

    steps: [
        {
            id: "drivers",
            title_en: "Driver Information",
            title_es: "Información del Conductor",
            fields: [
                {
                    id: "driverName",
                    label_en: "Full Name",
                    label_es: "Nombre Completo",
                    type: "text",
                    required: true
                },
                {
                    id: "driverDOB",
                    label_en: "Date of Birth",
                    label_es: "Fecha de Nacimiento",
                    type: "date",
                    required: true
                },
                {
                    id: "driverLicense",
                    label_en: "Driver License Number",
                    label_es: "Número de Licencia",
                    type: "text",
                    required: true
                },
                {
                    id: "driverState",
                    label_en: "License State",
                    label_es: "Estado de la Licencia",
                    type: "text",
                    required: true
                },
                {
                    id: "maritalStatus",
                    label_en: "Marital Status",
                    label_es: "Estado Civil",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "single", label_en: "Single", label_es: "Soltero(a)" },
                        { value: "married", label_en: "Married", label_es: "Casado(a)" },
                        { value: "divorced", label_en: "Divorced", label_es: "Divorciado(a)" },
                        { value: "widowed", label_en: "Widowed", label_es: "Viudo(a)" }
                    ]
                }
            ]
        },

        {
            id: "vehicles",
            title_en: "Vehicle Information",
            title_es: "Información del Vehículo",
            fields: [
                {
                    id: "vehicleYear",
                    label_en: "Vehicle Year",
                    label_es: "Año del Vehículo",
                    type: "number",
                    required: true
                },
                {
                    id: "vehicleMake",
                    label_en: "Make",
                    label_es: "Marca",
                    type: "text",
                    required: true
                },
                {
                    id: "vehicleModel",
                    label_en: "Model",
                    label_es: "Modelo",
                    type: "text",
                    required: true
                },
                {
                    id: "vin",
                    label_en: "VIN Number",
                    label_es: "Número de VIN",
                    type: "text",
                    required: true
                },
                {
                    id: "primaryUse",
                    label_en: "Primary Use",
                    label_es: "Uso Principal",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "commute", label_en: "Commute", label_es: "Trabajo" },
                        { value: "pleasure", label_en: "Pleasure", label_es: "Personal" },
                        { value: "business", label_en: "Business", label_es: "Negocios" }
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
                    id: "liabilityLimits",
                    label_en: "Liability Limits",
                    label_es: "Límites de Responsabilidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "30/60/25", label_en: "30/60/25", label_es: "30/60/25" },
                        { value: "50/100/50", label_en: "50/100/50", label_es: "50/100/50" },
                        { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" },
                        { value: "250/500/250", label_en: "250/500/250", label_es: "250/500/250" }
                    ]
                },
                {
                    id: "compDeductible",
                    label_en: "Comprehensive Deductible",
                    label_es: "Deducible de Cobertura Amplia",
                    type: "number",
                    required: true
                },
                {
                    id: "collisionDeductible",
                    label_en: "Collision Deductible",
                    label_es: "Deducible de Colisión",
                    type: "number",
                    required: true
                },
                {
                    id: "rentalCoverage",
                    label_en: "Rental Reimbursement",
                    label_es: "Reembolso de Auto Rentado",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        },

        {
            id: "claims",
            title_en: "Claims History",
            title_es: "Historial de Reclamos",
            fields: [
                {
                    id: "claimsPast3Years",
                    label_en: "Claims in the Past 3 Years",
                    label_es: "Reclamos en los Últimos 3 Años",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "0", label_en: "0", label_es: "0" },
                        { value: "1", label_en: "1", label_es: "1" },
                        { value: "2", label_en: "2", label_es: "2" },
                        { value: "3+", label_en: "3 or more", label_es: "3 o más" }
                    ]
                },
                {
                    id: "accidentsPast3Years",
                    label_en: "Accidents in the Past 3 Years",
                    label_es: "Accidentes en los Últimos 3 Años",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "0", label_en: "0", label_es: "0" },
                        { value: "1", label_en: "1", label_es: "1" },
                        { value: "2", label_en: "2", label_es: "2" },
                        { value: "3+", label_en: "3 or more", label_es: "3 o más" }
                    ]
                }
            ]
        }
    ]
};
