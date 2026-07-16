export default {
    title_en: "Commercial Auto Insurance Application",
    title_es: "Solicitud de Seguro de Auto Comercial",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "fein", label_en: "FEIN / Tax ID", label_es: "FEIN / ID Fiscal", type: "text" },
                { id: "businessAddress", label_en: "Business Address", label_es: "Dirección del Negocio", type: "text", required: true },
                { id: "businessCity", label_en: "City", label_es: "Ciudad", type: "text", required: true },
                { id: "businessState", label_en: "State", label_es: "Estado", type: "text", required: true },
                { id: "businessZip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true },
                {
                    id: "businessType",
                    label_en: "Type of Business",
                    label_es: "Tipo de Negocio",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "soleProprietor", label_en: "Sole Proprietor", label_es: "Propietario Único" },
                        { value: "partnership", label_en: "Partnership", label_es: "Sociedad" },
                        { value: "llc", label_en: "LLC", label_es: "LLC" },
                        { value: "corporation", label_en: "Corporation", label_es: "Corporación" },
                        { value: "other", label_en: "Other", label_es: "Otro" }
                    ]
                }
            ]
        },

        {
            id: "vehicles",
            title_en: "Vehicle / Fleet Information",
            title_es: "Información de Vehículos / Flota",
            fields: [
                { id: "numVehicles", label_en: "Number of Vehicles", label_es: "Número de Vehículos", type: "number", required: true },
                {
                    id: "vehicleType",
                    label_en: "Primary Vehicle Type",
                    label_es: "Tipo Principal de Vehículo",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "pickupTruck", label_en: "Pickup Truck", label_es: "Camioneta" },
                        { value: "van", label_en: "Van / Cargo Van", label_es: "Van / Furgoneta" },
                        { value: "boxTruck", label_en: "Box Truck (under 26,000 lbs)", label_es: "Camión Caja (menos de 26,000 lbs)" },
                        { value: "dump", label_en: "Dump Truck", label_es: "Camión Volteo" },
                        { value: "flatbed", label_en: "Flatbed", label_es: "Plataforma" },
                        { value: "utility", label_en: "Utility / Service Truck", label_es: "Camión de Servicio" },
                        { value: "other", label_en: "Other", label_es: "Otro" }
                    ]
                },
                { id: "vehicleYear", label_en: "Newest Vehicle Year", label_es: "Año del Vehículo más Nuevo", type: "number" },
                { id: "vehicleMake", label_en: "Make", label_es: "Marca", type: "text" },
                { id: "vehicleModel", label_en: "Model", label_es: "Modelo", type: "text" },
                { id: "vin", label_en: "VIN (if single vehicle)", label_es: "VIN (si es un solo vehículo)", type: "text" },
                {
                    id: "vehicleUse",
                    label_en: "Primary Use of Vehicles",
                    label_es: "Uso Principal de los Vehículos",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "delivery", label_en: "Delivery / Courier", label_es: "Entrega / Mensajería" },
                        { value: "construction", label_en: "Construction / Contracting", label_es: "Construcción / Contratación" },
                        { value: "sales", label_en: "Sales / Service Calls", label_es: "Ventas / Visitas de Servicio" },
                        { value: "transport", label_en: "Passenger Transport", label_es: "Transporte de Pasajeros" },
                        { value: "other", label_en: "Other", label_es: "Otro" }
                    ]
                },
                { id: "garageAddress", label_en: "Garaging Address (if different)", label_es: "Dirección de Cochera (si es diferente)", type: "text" }
            ]
        },

        {
            id: "drivers",
            title_en: "Driver Information",
            title_es: "Información de Conductores",
            fields: [
                { id: "numDrivers", label_en: "Number of Drivers", label_es: "Número de Conductores", type: "number", required: true },
                { id: "primaryDriverName", label_en: "Primary Driver Full Name", label_es: "Nombre Completo del Conductor Principal", type: "text", required: true },
                { id: "primaryDriverDOB", label_en: "Primary Driver Date of Birth", label_es: "Fecha de Nacimiento del Conductor Principal", type: "date", required: true },
                { id: "primaryDriverLicense", label_en: "Driver License Number", label_es: "Número de Licencia de Conducir", type: "text", required: true },
                { id: "licenseState", label_en: "License State", label_es: "Estado de la Licencia", type: "text", required: true },
                { id: "yearsLicensed", label_en: "Years Licensed", label_es: "Años con Licencia", type: "number", required: true },
                {
                    id: "violations",
                    label_en: "Any Violations or Accidents in Last 3 Years?",
                    label_es: "¿Infracciones o Accidentes en los Últimos 3 Años?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "violationDetails", label_en: "If yes, please describe", label_es: "Si es así, describa", type: "text" }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                {
                    id: "liabilityLimit",
                    label_en: "Liability Limit",
                    label_es: "Límite de Responsabilidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "300000", label_en: "$300,000 CSL", label_es: "$300,000 CSL" },
                        { value: "500000", label_en: "$500,000 CSL", label_es: "$500,000 CSL" },
                        { value: "750000", label_en: "$750,000 CSL", label_es: "$750,000 CSL" },
                        { value: "1000000", label_en: "$1,000,000 CSL", label_es: "$1,000,000 CSL" }
                    ]
                },
                {
                    id: "physicalDamage",
                    label_en: "Physical Damage (Comp & Collision)?",
                    label_es: "¿Daños Físicos (Comp & Colisión)?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "uninsuredMotorist",
                    label_en: "Uninsured / Underinsured Motorist?",
                    label_es: "¿Motorista No Asegurado / Insuficientemente Asegurado?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "medicalPayments",
                    label_en: "Medical Payments Coverage?",
                    label_es: "¿Cobertura de Pagos Médicos?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "hiredNonOwned",
                    label_en: "Hired / Non-Owned Auto Coverage?",
                    label_es: "¿Cobertura de Auto Contratado / No Propio?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "cargo",
                    label_en: "Cargo / Tools Coverage?",
                    label_es: "¿Cobertura de Carga / Herramientas?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "effectiveDate", label_en: "Desired Effective Date", label_es: "Fecha Efectiva Deseada", type: "date" }
            ]
        },

        {
            id: "claims",
            title_en: "Claims History",
            title_es: "Historial de Reclamaciones",
            fields: [
                {
                    id: "hadClaims",
                    label_en: "Any Commercial Auto Claims in the Last 3 Years?",
                    label_es: "¿Reclamaciones de Auto Comercial en los Últimos 3 Años?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "claimsDetails", label_en: "If yes, describe each claim (date, type, amount)", label_es: "Si es así, describa cada reclamación (fecha, tipo, monto)", type: "text" },
                {
                    id: "currentlyInsured",
                    label_en: "Currently Insured?",
                    label_es: "¿Actualmente Asegurado?",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "currentCarrier", label_en: "Current Carrier (if any)", label_es: "Aseguradora Actual (si aplica)", type: "text" },
                { id: "currentExpiration", label_en: "Current Policy Expiration Date", label_es: "Fecha de Vencimiento de la Póliza Actual", type: "date" },
                { id: "additionalNotes", label_en: "Additional Notes or Questions", label_es: "Notas Adicionales o Preguntas", type: "text" }
            ]
        }
    ]
};
