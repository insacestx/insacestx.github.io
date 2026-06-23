export default {
    title_en: "ATV / UTV Insurance Application",
    title_es: "Solicitud de Seguro ATV / UTV",

    steps: [
        {
            id: "owner",
            title_en: "Owner Information",
            title_es: "Información del Propietario",
            fields: [
                {
                    id: "ownerName",
                    label_en: "Full Name",
                    label_es: "Nombre Completo",
                    type: "text",
                    required: true
                },
                {
                    id: "phone",
                    label_en: "Phone Number",
                    label_es: "Número de Teléfono",
                    type: "text",
                    required: true
                }
            ]
        },

        {
            id: "vehicle",
            title_en: "Vehicle Details",
            title_es: "Detalles del Vehículo",
            fields: [
                {
                    id: "year",
                    label_en: "Year",
                    label_es: "Año",
                    type: "number",
                    required: true
                },
                {
                    id: "make",
                    label_en: "Make",
                    label_es: "Marca",
                    type: "text",
                    required: true
                },
                {
                    id: "model",
                    label_en: "Model",
                    label_es: "Modelo",
                    type: "text",
                    required: true
                },
                {
                    id: "vin",
                    label_en: "VIN",
                    label_es: "VIN",
                    type: "text",
                    required: false
                },
                {
                    id: "vehicleType",
                    label_en: "Vehicle Type",
                    label_es: "Tipo de Vehículo",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "atv", label_en: "ATV", label_es: "ATV" },
                        { value: "utv", label_en: "UTV", label_es: "UTV" },
                        { value: "dirtbike", label_en: "Dirt Bike", label_es: "Motocicleta de Tierra" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title_en: "Usage & Terrain",
            title_es: "Uso y Terreno",
            fields: [
                {
                    id: "usageType",
                    label_en: "Usage Type",
                    label_es: "Tipo de Uso",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "recreational", label_en: "Recreational", label_es: "Recreativo" },
                        { value: "farm", label_en: "Farm/Ranch", label_es: "Granja/Rancho" },
                        { value: "business", label_en: "Business", label_es: "Negocios" }
                    ]
                },
                {
                    id: "terrain",
                    label_en: "Typical Terrain",
                    label_es: "Terreno Típico",
                    type: "text",
                    required: false
                }
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
                    type: "number",
                    required: true
                },
                {
                    id: "compDeductible",
                    label_en: "Comprehensive Deductible",
                    label_es: "Deducible de Cobertura Amplia",
                    type: "number",
                    required: false
                },
                {
                    id: "collisionDeductible",
                    label_en: "Collision Deductible",
                    label_es: "Deducible de Colisión",
                    type: "number",
                    required: false
                }
            ]
        }
    ]
};
