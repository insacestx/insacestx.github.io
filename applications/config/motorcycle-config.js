export default {
    title_en: "Motorcycle Insurance Application",
    title_es: "Solicitud de Seguro de Motocicleta",

    steps: [
        {
            id: "rider",
            title_en: "Rider Information",
            title_es: "Información del Conductor",
            fields: [
                { id: "riderName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
                { id: "riderDOB", label_en: "Date of Birth", label_es: "Fecha de Nacimiento", type: "date", required: true },
                { id: "licenseNumber", label_en: "License Number", label_es: "Número de Licencia", type: "text", required: true },
                { id: "licenseState", label_en: "License State", label_es: "Estado de la Licencia", type: "text", required: true },
                { id: "yearsRiding", label_en: "Years of Riding Experience", label_es: "Años de Experiencia", type: "number", required: true }
            ]
        },

        {
            id: "bike",
            title_en: "Motorcycle Details",
            title_es: "Detalles de la Motocicleta",
            fields: [
                { id: "bikeYear", label_en: "Year", label_es: "Año", type: "number", required: true },
                { id: "bikeMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
                { id: "bikeModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
                { id: "vin", label_en: "VIN", label_es: "VIN", type: "text", required: true },
                { id: "cc", label_en: "Engine CC", label_es: "Cilindraje (CC)", type: "number", required: true },
                {
                    id: "usage",
                    label_en: "Primary Use",
                    label_es: "Uso Principal",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "pleasure", label_en: "Pleasure", label_es: "Recreativo" },
                        { value: "commute", label_en: "Commute", label_es: "Trabajo" },
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
                        { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" }
                    ]
                },
                { id: "compDeductible", label_en: "Comprehensive Deductible", label_es: "Deducible de Cobertura Amplia", type: "number" },
                { id: "collisionDeductible", label_en: "Collision Deductible", label_es: "Deducible de Colisión", type: "number" },
                { id: "accessoriesLimit", label_en: "Accessories Coverage Limit", label_es: "Límite de Accesorios", type: "number" }
            ]
        },

        {
            id: "claims",
            title_en: "Claims & Violations",
            title_es: "Reclamos y Violaciones",
            fields: [
                {
                    id: "claimsPast3Years",
                    label_en: "Claims in Past 3 Years",
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
                    id: "violationsPast3Years",
                    label_en: "Moving Violations in Past 3 Years",
                    label_es: "Violaciones de Tránsito en los Últimos 3 Años",
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
