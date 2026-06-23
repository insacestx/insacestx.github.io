export default {
    title_en: "Flood Insurance Application",
    title_es: "Solicitud de Seguro contra Inundaciones",

    steps: [
        {
            id: "property",
            title_en: "Property Information",
            title_es: "Información de la Propiedad",
            fields: [
                { id: "propertyAddress", label_en: "Property Address", label_es: "Dirección de la Propiedad", type: "text", required: true },
                { id: "city", label_en: "City", label_es: "Ciudad", type: "text", required: true },
                { id: "state", label_en: "State", label_es: "Estado", type: "text", required: true },
                { id: "zip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                {
                    id: "occupancy",
                    label_en: "Occupancy Type",
                    label_es: "Tipo de Ocupación",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "primary", label_en: "Primary Residence", label_es: "Residencia Principal" },
                        { value: "secondary", label_en: "Secondary Residence", label_es: "Residencia Secundaria" },
                        { value: "rental", label_en: "Rental", label_es: "Renta" }
                    ]
                }
            ]
        },

        {
            id: "structure",
            title_en: "Structure Details",
            title_es: "Detalles de la Estructura",
            fields: [
                { id: "yearBuilt", label_en: "Year Built", label_es: "Año de Construcción", type: "number", required: true },
                { id: "foundationType", label_en: "Foundation Type", label_es: "Tipo de Cimentación", type: "text" },
                {
                    id: "elevationCert",
                    label_en: "Elevation Certificate Available?",
                    label_es: "¿Certificado de Elevación Disponible?",
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
                { id: "buildingLimit", label_en: "Building Coverage Limit", label_es: "Límite de Cobertura del Edificio", type: "number", required: true },
                { id: "contentsLimit", label_en: "Contents Coverage Limit", label_es: "Límite de Contenido", type: "number" },
                { id: "deductible", label_en: "Deductible", label_es: "Deducible", type: "number", required: true }
            ]
        }
    ]
};
