export default {
    title_en: "RV Insurance Application",
    title_es: "Solicitud de Seguro para RV",

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
            id: "rvDetails",
            title_en: "RV Details",
            title_es: "Detalles del RV",
            fields: [
                { id: "rvYear", label_en: "Year", label_es: "Año", type: "number", required: true },
                { id: "rvMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
                { id: "rvModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
                { id: "vin", label_en: "VIN", label_es: "VIN", type: "text", required: true },
                {
                    id: "rvType",
                    label_en: "RV Type",
                    label_es: "Tipo de RV",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "motorhome", label_en: "Motorhome", label_es: "Casa Rodante" },
                        { value: "travelTrailer", label_en: "Travel Trailer", label_es: "Remolque" },
                        { value: "fifthWheel", label_en: "Fifth Wheel", label_es: "Quinta Rueda" },
                        { value: "camper", label_en: "Truck Camper", label_es: "Camper" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title_en: "Usage & Storage",
            title_es: "Uso y Almacenamiento",
            fields: [
                {
                    id: "fullTime",
                    label_en: "Full-Time RV Use?",
                    label_es: "¿Uso de RV a Tiempo Completo?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "annualMiles", label_en: "Estimated Annual Miles", label_es: "Millas Anuales Estimadas", type: "number" },
                { id: "storageLocation", label_en: "Primary Storage Location", label_es: "Lugar de Almacenamiento", type: "text", required: true }
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
                        { value: "50/100/50", label_en: "50/100/50", label_es: "50/100/50" },
                        { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" },
                        { value: "250/500/250", label_en: "250/500/250", label_es: "250/500/250" }
                    ]
                },
                { id: "compDeductible", label_en: "Comprehensive Deductible", label_es: "Deducible de Cobertura Amplia", type: "number" },
                { id: "collisionDeductible", label_en: "Collision Deductible", label_es: "Deducible de Colisión", type: "number" },
                { id: "contentsCoverage", label_en: "Contents Coverage Limit", label_es: "Límite de Contenido", type: "number" }
            ]
        }
    ]
};
