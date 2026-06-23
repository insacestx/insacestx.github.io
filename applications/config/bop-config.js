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
                { id: "buildingLimit", label_en: "Building Limit", label_es: "Límite del Edificio", type: "number" },
                { id: "bppLimit", label_en: "Business Personal Property Limit", label_es: "Límite de Propiedad Personal Comercial", type: "number", required: true },
                { id: "liabilityLimit", label_en: "Liability Limit", label_es: "Límite de Responsabilidad", type: "number", required: true }
            ]
        }
    ]
};
