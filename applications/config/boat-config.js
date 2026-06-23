export default {
    title_en: "Boat Insurance Application",
    title_es: "Solicitud de Seguro para Embarcaciones",

    steps: [
        {
            id: "owner",
            title_en: "Owner Information",
            title_es: "Información del Propietario",
            fields: [
                { id: "ownerName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
                { id: "phone", label_en: "Phone Number", label_es: "Número de Teléfono", type: "text", required: true },
                { id: "email", label_en: "Email Address", label_es: "Correo Electrónico", type: "email", required: true }
            ]
        },

        {
            id: "vessel",
            title_en: "Vessel Details",
            title_es: "Detalles de la Embarcación",
            fields: [
                { id: "vesselYear", label_en: "Year", label_es: "Año", type: "number", required: true },
                { id: "vesselMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
                { id: "vesselModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
                { id: "hullId", label_en: "HIN (Hull ID)", label_es: "HIN (ID del Casco)", type: "text", required: true },
                { id: "length", label_en: "Length (ft)", label_es: "Longitud (pies)", type: "number", required: true },
                {
                    id: "vesselType",
                    label_en: "Vessel Type",
                    label_es: "Tipo de Embarcación",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "runabout", label_en: "Runabout", label_es: "Lancha" },
                        { value: "pontoon", label_en: "Pontoon", label_es: "Pontón" },
                        { value: "sailboat", label_en: "Sailboat", label_es: "Velero" },
                        { value: "fishing", label_en: "Fishing Boat", label_es: "Lancha de Pesca" },
                        { value: "yacht", label_en: "Yacht", label_es: "Yate" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title_en: "Usage & Mooring",
            title_es: "Uso y Atraque",
            fields: [
                { id: "primaryWaters", label_en: "Primary Waters", label_es: "Aguas Principales", type: "text", required: true },
                { id: "mooringLocation", label_en: "Mooring Location", label_es: "Lugar de Atraque", type: "text", required: true },
                { id: "layupPeriod", label_en: "Lay-Up Period", label_es: "Período de Inactividad", type: "text" },
                {
                    id: "usageType",
                    label_en: "Usage Type",
                    label_es: "Tipo de Uso",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "pleasure", label_en: "Pleasure", label_es: "Recreativo" },
                        { value: "fishing", label_en: "Fishing", label_es: "Pesca" },
                        { value: "charter", label_en: "Charter", label_es: "Charter" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "hullValue", label_en: "Hull Agreed Value", label_es: "Valor Acordado del Casco", type: "number", required: true },
                { id: "liabilityLimit", label_en: "Liability Limit", label_es: "Límite de Responsabilidad", type: "number", required: true },
                { id: "medicalPayments", label_en: "Medical Payments Limit", label_es: "Límite de Pagos Médicos", type: "number" },
                {
                    id: "trailerCoverage",
                    label_en: "Trailer Coverage?",
                    label_es: "¿Cobertura para Remolque?",
                    type: "select",
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
