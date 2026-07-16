export default {
    title_en: "Commercial Trucking Insurance Application",
    title_es: "Solicitud de Seguro para Camiones Comerciales",

    steps: [

        /* -------------------- BUSINESS INFORMATION -------------------- */
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true, default: "", validate: "text" },
                { id: "ownerName", label_en: "Owner Name(s)", label_es: "Nombre(s) del Propietario", type: "text", required: true, default: "", validate: "text" },
                {
                    id: "businessType",
                    label_en: "Business Type",
                    label_es: "Tipo de Negocio",
                    type: "select",
                    required: true,
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "llc", label_en: "LLC", label_es: "LLC" },
                        { value: "corp", label_en: "Corporation", label_es: "Corporación" },
                        { value: "soleprop", label_en: "Sole Proprietor", label_es: "Propietario Único" },
                        { value: "partnership", label_en: "Partnership", label_es: "Sociedad" }
                    ]
                },
                { id: "fein", label_en: "FEIN", label_es: "FEIN", type: "text", default: "", validate: "text" },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true, default: 1, validate: "number" },
                { id: "garagingAddress", label_en: "Garaging Address", label_es: "Dirección de Garaje", type: "text", required: true, default: "", validate: "text" },
                { id: "dotNumber", label_en: "DOT Number", label_es: "Número DOT", type: "text", default: "", validate: "text" },
                { id: "mcNumber", label_en: "MC Number", label_es: "Número MC", type: "text", default: "", validate: "text" },

                {
                    id: "operatingAuthority",
                    label_en: "Operating Authority",
                    label_es: "Tipo de Autoridad Operativa",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "forHire", label_en: "For-Hire", label_es: "Contratado" },
                        { value: "private", label_en: "Private Carrier", label_es: "Transportista Privado" },
                        { value: "exempt", label_en: "Exempt", label_es: "Exento" }
                    ]
                },

                {
                    id: "leaseOn",
                    label_en: "Leased Onto a Motor Carrier?",
                    label_es: "¿Arrendado a un Transportista?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "leaseCarrierName",
                    label_en: "Motor Carrier Name (if leased)",
                    label_es: "Nombre del Transportista (si aplica)",
                    type: "text",
                    default: "",
                    validate: "text",
                    showIf: { leaseOn: "yes" }
                }
            ]
        },

        /* -------------------- VEHICLE & FLEET DETAILS -------------------- */
        {
            id: "vehicles",
            title_en: "Vehicle & Fleet Details",
            title_es: "Detalles de Vehículos y Flota",
            fields: [
                { id: "numPowerUnits", label_en: "Number of Power Units", label_es: "Número de Unidades Motrices", type: "number", required: true, default: 1, validate: "number" },
                { id: "numTrailers", label_en: "Number of Trailers", label_es: "Número de Remolques", type: "number", default: 0, validate: "number" },

                {
                    id: "vehicleTypes",
                    label_en: "Vehicle Types",
                    label_es: "Tipos de Vehículos",
                    type: "select",
                    required: true,
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "tractor", label_en: "Tractor", label_es: "Tractor" },
                        { value: "boxTruck", label_en: "Box Truck", label_es: "Camión Caja" },
                        { value: "hotshot", label_en: "Hotshot", label_es: "Hotshot" },
                        { value: "dump", label_en: "Dump Truck", label_es: "Camión Volteo" }
                    ]
                },

                { id: "radius", label_en: "Radius of Operation (miles)", label_es: "Radio de Operación (millas)", type: "number", required: true, default: 50, validate: "number" },

                {
                    id: "unitList",
                    label_en: "List All Power Units (Year/Make/Model/VIN/GVWR)",
                    label_es: "Lista de Unidades (Año/Marca/Modelo/VIN/GVWR)",
                    type: "textarea",
                    default: "",
                    validate: "text"
                },

                {
                    id: "trailerList",
                    label_en: "List All Trailers (Type/Year/VIN)",
                    label_es: "Lista de Remolques (Tipo/Año/VIN)",
                    type: "textarea",
                    default: "",
                    validate: "text",
                    showIf: { numTrailers: { gt: 0 } }
                },

                {
                    id: "hiredNonOwned",
                    label_en: "Any Hired or Non-Owned Exposure?",
                    label_es: "¿Exposición de Vehículos Contratados o No Propios?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "amazonRelay",
                    label_en: "Do You Haul for Amazon Relay / FedEx / UPS?",
                    label_es: "¿Transporta para Amazon Relay / FedEx / UPS?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        },

        /* -------------------- DRIVER INFORMATION -------------------- */
        {
            id: "drivers",
            title_en: "Driver Information",
            title_es: "Información de Conductores",
            fields: [
                { id: "numDrivers", label_en: "Number of Drivers", label_es: "Número de Conductores", type: "number", required: true, default: 1, validate: "number" },

                {
                    id: "driverList",
                    label_en: "Driver List (Name/DOB/License State/CDL Class/Experience)",
                    label_es: "Lista de Conductores (Nombre/Fecha de Nacimiento/Estado de Licencia/Clase CDL/Experiencia)",
                    type: "textarea",
                    default: "",
                    validate: "text"
                },

                {
                    id: "mvrHistory",
                    label_en: "Any MVR Violations?",
                    label_es: "¿Violaciones en el Historial de Manejo (MVR)?",
                    type: "select",
                    required: true,
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "accidents",
                    label_en: "Any Accidents in Last 3 Years?",
                    label_es: "¿Accidentes en los Últimos 3 Años?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "eldUsage",
                    label_en: "Do You Use ELDs?",
                    label_es: "¿Usa Dispositivos ELD?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        },

        /* -------------------- CARGO & OPERATIONS -------------------- */
        {
            id: "cargo",
            title_en: "Cargo & Operations",
            title_es: "Carga y Operaciones",
            fields: [
                { id: "cargoType", label_en: "Primary Cargo Type", label_es: "Tipo de Carga Principal", type: "text", required: true, default: "", validate: "text" },
                { id: "cargoValue", label_en: "Average Cargo Value Per Load", label_es: "Valor Promedio de Carga por Viaje", type: "number", default: 0, validate: "number" },
                { id: "annualMiles", label_en: "Annual Miles", label_es: "Millas Anuales", type: "number", required: true, default: 50000, validate: "number" },

                {
                    id: "hazmat",
                    label_en: "Hazmat?",
                    label_es: "¿Materiales Peligrosos (Hazmat)?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "hazmatDetails",
                    label_en: "Hazmat Details",
                    label_es: "Detalles de Hazmat",
                    type: "textarea",
                    default: "",
                    validate: "text",
                    showIf: { hazmat: "yes" }
                },

                {
                    id: "oversize",
                    label_en: "Oversized or Overweight Loads?",
                    label_es: "¿Cargas Sobredimensionadas o con Sobrepeso?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                { id: "statesOperated", label_en: "Primary States of Operation", label_es: "Estados Principales de Operación", type: "textarea", default: "", validate: "text" },

                {
                    id: "crossState",
                    label_en: "Do You Cross State Lines?",
                    label_es: "¿Cruza Líneas Estatales?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                }
            ]
        },

        /* -------------------- COVERAGE OPTIONS -------------------- */
        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "liabilityLimit", label_en: "Liability Limit", label_es: "Límite de Responsabilidad", type: "number", required: true, default: 1000000, validate: "number" },
                { id: "cargoLimit", label_en: "Cargo Coverage Limit", label_es: "Límite de Cobertura de Carga", type: "number", default: 100000, validate: "number" },

                {
                    id: "physicalDamage",
                    label_en: "Physical Damage Coverage?",
                    label_es: "¿Cobertura de Daños Físicos?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "statedValue",
                    label_en: "Stated Value of Units",
                    label_es: "Valor Declarado de las Unidades",
                    type: "textarea",
                    default: "",
                    validate: "text",
                    showIf: { physicalDamage: "yes" }
                },

                { id: "trailerInterchange", label_en: "Trailer Interchange Limit", label_es: "Límite de Intercambio de Remolque", type: "number", default: 0, validate: "number" },
                { id: "nonOwnedTrailer", label_en: "Non-Owned Trailer Limit", label_es: "Límite de Remolque No Propio", type: "number", default: 0, validate: "number" },
                { id: "reeferBreakdown", label_en: "Reefer Breakdown Coverage", label_es: "Cobertura de Avería de Refrigeración", type: "number", default: 0, validate: "number" },
                { id: "deductible", label_en: "Deductible", label_es: "Deducible", type: "number", default: 1000, validate: "number" }
            ]
        },

        /* -------------------- SAFETY & COMPLIANCE -------------------- */
        {
            id: "safety",
            title_en: "Safety & Compliance",
            title_es: "Seguridad y Cumplimiento",
            fields: [
                {
                    id: "safetyProgram",
                    label_en: "Written Safety Program?",
                    label_es: "¿Programa de Seguridad Escrito?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "maintenanceSchedule",
                    label_en: "Maintenance Schedule",
                    label_es: "Programa de Mantenimiento",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "weekly", label_en: "Weekly", label_es: "Semanal" },
                        { value: "monthly", label_en: "Monthly", label_es: "Mensual" },
                        { value: "mileage", label_en: "Mileage-Based", label_es: "Basado en Millaje" }
                    ]
                },

                {
                    id: "dashCams",
                    label_en: "Dash Cameras Installed?",
                    label_es: "¿Cámaras de Tablero Instaladas?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                {
                    id: "gpsTelematics",
                    label_en: "GPS / Telematics?",
                    label_es: "¿GPS / Telemática?",
                    type: "select",
                    default: "",
                    validate: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },

                { id: "fmcsarating", label_en: "FM
