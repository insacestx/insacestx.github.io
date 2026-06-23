export default {
    title_en: "Commercial Property Insurance Application",
    title_es: "Solicitud de Seguro de Propiedad Comercial",

    steps: [
        {
            id: "business",
            title_en: "Business Information",
            title_es: "Información del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "industry", label_en: "Industry / Operations", label_es: "Industria / Operaciones", type: "text", required: true }
            ]
        },

        {
            id: "location",
            title_en: "Location Details",
            title_es: "Detalles de la Ubicación",
            fields: [
                { id: "address", label_en: "Property Address", label_es: "Dirección de la Propiedad", type: "text", required: true },
                { id: "city", label_en: "City", label_es: "Ciudad", type: "text", required: true },
                { id: "state", label_en: "State", label_es: "Estado", type: "text", required: true },
                { id: "zip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                { id: "yearBuilt", label_en: "Year Built", label_es: "Año de Construcción", type: "number", required: true },
                { id: "constructionType", label_en: "Construction Type", label_es: "Tipo de Construcción", type: "text", required: true }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "buildingLimit", label_en: "Building Limit", label_es: "Límite del Edificio", type: "number", required: true },
                { id: "bppLimit", label_en: "Business Personal Property Limit", label_es: "Límite de Propiedad Personal Comercial", type: "number" },
                { id: "deductible", label_en: "Deductible", label_es: "Deducible", type: "number", required: true }
            ]
        }
    ]
};
