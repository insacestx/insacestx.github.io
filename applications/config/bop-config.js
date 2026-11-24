export default {
    title_en: "Business Owners Policy (BOP) Application",
    title_es: "Solicitud de Póliza para Dueños de Negocio (BOP)",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                {
                    id: "preferredLanguage",
                    label_en: "Preferred Agent Language",
                    label_es: "Idioma Preferido del Agente",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "en", label_en: "English", label_es: "Inglés" },
                        { value: "es", label_en: "Spanish", label_es: "Español" }
                    ]
                },
                {
                    id: "entityType",
                    label_en: "Entity Type",
                    label_es: "Tipo de Entidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "corp", label_en: "Corporation", label_es: "Corporación" },
                        { value: "llc", label_en: "LLC", label_es: "LLC" },
                        { value: "partnership", label_en: "Partnership", label_es: "Sociedad" },
                        { value: "soleprop", label_en: "Sole Proprietor", label_es: "Propietario Único" }
                    ]
                },
                { id: "yearsInBusiness", label_en: "Years in Business", label_es: "Años en el Negocio", type: "number", required: true },
                { id: "annualRevenue", label_en: "Annual Revenue", label_es: "Ingresos Anuales", type: "number", required: true }
            ]
        },

        {
            id: "location",
            title_en: "Location Details",
            title_es: "Detalles de la Ubicación",
            fields: [
                { id: "locationAddress", label_en: "Location Address", label_es: "Dirección del Local", type: "text", required: true },
                { id: "city", label_en: "City", label_es: "Ciudad", type: "text", required: true },
                { id: "state", label_en: "State", label_es: "Estado", type: "text", required: true },
                { id: "zip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                { id: "sqft", label_en: "Square Footage", label_es: "Metros Cuadrados", type: "number", required: true }
            ]
        },

        {
            id: "operations",
            title_en: "Operations",
            title_es: "Operaciones",
            fields: [
                { id: "description", label_en: "Description of Operations", label_es: "Descripción de Operaciones", type: "text", required: true },
                { id: "numEmployees", label_en: "Number of Employees", label_es: "Número de Empleados", type: "number", required: true },
                { id: "payroll", label_en: "Annual Payroll", label_es: "Nómina Anual", type: "number" }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                {
                    id: "buildingLimit",
                    label_en: "Building Limit",
                    label_es: "Límite del Edificio",
                    type: "select",
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "Not applicable (renting)", label_en: "Not applicable (renting)", label_es: "No aplica (renta)" },
                        { value: "$100,000", label_en: "$100,000", label_es: "$100,000" },
                        { value: "$250,000", label_en: "$250,000", label_es: "$250,000" },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$750,000", label_en: "$750,000", label_es: "$750,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" },
                        { value: "Over $2,000,000", label_en: "Over $2,000,000", label_es: "Más de $2,000,000" }
                    ]
                },
                {
                    id: "bppLimit",
                    label_en: "Business Personal Property Limit",
                    label_es: "Límite de Propiedad Personal Comercial",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "$25,000", label_en: "$25,000", label_es: "$25,000" },
                        { value: "$50,000", label_en: "$50,000", label_es: "$50,000" },
                        { value: "$100,000", label_en: "$100,000", label_es: "$100,000" },
                        { value: "$250,000", label_en: "$250,000", label_es: "$250,000" },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "Over $1,000,000", label_en: "Over $1,000,000", label_es: "Más de $1,000,000" }
                    ]
                },
                {
                    id: "liabilityLimit",
                    label_en: "Liability Limit",
                    label_es: "Límite de Responsabilidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "$300,000", label_en: "$300,000", label_es: "$300,000" },
                        { value: "$500,000", label_en: "$500,000", label_es: "$500,000" },
                        { value: "$1,000,000", label_en: "$1,000,000", label_es: "$1,000,000" },
                        { value: "$2,000,000", label_en: "$2,000,000", label_es: "$2,000,000" }
                    ]
                }
            ]
        }
    ]
};
