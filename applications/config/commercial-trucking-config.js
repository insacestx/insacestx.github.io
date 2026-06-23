export default {
    title_en: "Commercial Trucking Insurance Application",
    title_es: "Solicitud de Seguro para Camiones Comerciales",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "fein", label_en: "FEIN", label_es: "FEIN", type: "text" },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true },
                { id: "dotNumber", label_en: "DOT Number", label_es: "Número DOT", type: "text" },
                { id: "mcNumber", label_en: "MC Number", label_es: "Número MC", type: "text" }
            ]
        },

        {
            id: "vehicles",
            title_en: "Vehicle & Fleet Details",
            title_es: "Detalles de Vehículos y Flota",
            fields: [
                { id: "numPowerUnits", label_en: "Number of Power Units", label_es: "Número de Unidades Motrices", type: "number", required: true },
                { id: "numTrailers", label_en: "Number of Trailers", label_es: "Número de Remolques", type: "number" },
                {
                    id: "vehicleTypes",
                    label_en: "Vehicle Types",
                    label_es: "Tipos de Vehículos",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "tractor", label_en: "Tractor", label_es: "Tractor" },
                        { value: "boxTruck", label_en: "Box Truck", label_es: "Camión Caja" },
                        { value: "hotshot", label_en: "Hotshot", label_es: "Hotshot" },
                        { value: "dump", label_en: "Dump Truck", label_es: "Camión Volteo" }
                    ]
                },
                { id: "radius", label_en: "Radius of Operation (miles)", label_es: "Radio de Operación (millas)", type: "number", required: true }
            ]
        },

        {
            id: "drivers",
            title_en: "Driver Information",
            title_es: "Información de Conductores",
            fields: [
                { id: "numDrivers", label_en: "Number of Drivers", label_es: "Número de Conductores", type: "number", required: true },
                {
                    id: "mvrHistory",
                    label_en: "Any MVR Violations?",
                    label_es: "¿Violaciones en el Historial de Manejo (MVR)?",
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
            id: "cargo",
            title_en: "Cargo & Operations",
            title_es: "Carga y Operaciones",
            fields: [
                { id: "cargoType", label_en: "Primary Cargo Type", label_es: "Tipo de Carga Principal", type: "text", required: true },
                { id: "annualMiles", label_en: "Annual Miles", label_es: "Millas Anuales", type: "number", required: true },
                {
                    id: "hazmat",
                    label_en: "Hazmat?",
                    label_es: "¿Materiales Peligrosos (Hazmat)?",
                    type: "select",
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
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "liabilityLimit", label_en: "Liability Limit", label_es: "Límite de Responsabilidad", type: "number", required: true },
                { id: "cargoLimit", label_en: "Cargo Coverage Limit", label_es: "Límite de Cobertura de Carga", type: "number" },
                { id: "physicalDamage", label_en: "Physical Damage Coverage?", label_es: "¿Cobertura de Daños Físicos?", type: "select",
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
