export default {
    title_en: "Homeowners Insurance Application",
    title_es: "Solicitud de Seguro de Casa",

    steps: [
        {
            id: "property",
            title_en: "Property Information",
            title_es: "Información de la Propiedad",
            fields: [
                {
                    id: "propertyAddress",
                    label_en: "Property Address",
                    label_es: "Dirección de la Propiedad",
                    type: "text",
                    required: true
                },
                {
                    id: "propertyCity",
                    label_en: "City",
                    label_es: "Ciudad",
                    type: "text",
                    required: true
                },
                {
                    id: "propertyState",
                    label_en: "State",
                    label_es: "Estado",
                    type: "text",
                    required: true
                },
                {
                    id: "propertyZip",
                    label_en: "ZIP Code",
                    label_es: "Código Postal",
                    type: "text",
                    required: true
                },
                {
                    id: "yearBuilt",
                    label_en: "Year Built",
                    label_es: "Año de Construcción",
                    type: "number",
                    required: true
                },
                {
                    id: "constructionType",
                    label_en: "Construction Type",
                    label_es: "Tipo de Construcción",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "frame", label_en: "Frame", label_es: "Madera" },
                        { value: "brick", label_en: "Brick", label_es: "Ladrillo" },
                        { value: "stucco", label_en: "Stucco", label_es: "Estuco" },
                        { value: "masonry", label_en: "Masonry", label_es: "Mampostería" }
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
                    id: "dwellingCoverage",
                    label_en: "Dwelling Coverage Amount",
                    label_es: "Cobertura de Vivienda",
                    type: "number",
                    required: true
                },
                {
                    id: "personalProperty",
                    label_en: "Personal Property Coverage",
                    label_es: "Cobertura de Propiedad Personal",
                    type: "number",
                    required: true
                },
                {
                    id: "liabilityCoverage",
                    label_en: "Liability Coverage",
                    label_es: "Cobertura de Responsabilidad",
                    type: "number",
                    required: true
                },
                {
                    id: "deductible",
                    label_en: "Deductible Amount",
                    label_es: "Monto del Deducible",
                    type: "number",
                    required: true
                },
                {
                    id: "roofType",
                    label_en: "Roof Type",
                    label_es: "Tipo de Techo",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "shingle", label_en: "Shingle", label_es: "Teja Asfáltica" },
                        { value: "metal", label_en: "Metal", label_es: "Metal" },
                        { value: "tile", label_en: "Tile", label_es: "Teja" },
                        { value: "flat", label_en: "Flat", label_es: "Plano" }
                    ]
                }
            ]
        },

        {
            id: "claims",
            title_en: "Claims History",
            title_es: "Historial de Reclamos",
            fields: [
                {
                    id: "claimsPast5Years",
                    label_en: "Claims in the Past 5 Years",
                    label_es: "Reclamos en los Últimos 5 Años",
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
                    id: "roofAge",
                    label_en: "Roof Age (Years)",
                    label_es: "Edad del Techo (Años)",
                    type: "number",
                    required: true
                },
                {
                    id: "priorCarrier",
                    label_en: "Prior Insurance Carrier",
                    label_es: "Aseguradora Anterior",
                    type: "text",
                    required: false
                }
            ]
        },

        {
            id: "additional",
            title_en: "Additional Details",
            title_es: "Detalles Adicionales",
            fields: [
                {
                    id: "occupancyType",
                    label_en: "Occupancy Type",
                    label_es: "Tipo de Ocupación",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "owner", label_en: "Owner Occupied", label_es: "Ocupado por el Propietario" },
                        { value: "tenant", label_en: "Tenant Occupied", label_es: "Ocupado por el Inquilino" },
                        { value: "vacant", label_en: "Vacant", label_es: "Desocupado" }
                    ]
                },
                {
                    id: "pets",
                    label_en: "Any Pets?",
                    label_es: "¿Mascotas?",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "pool",
                    label_en: "Swimming Pool?",
                    label_es: "¿Alberca/Piscina?",
                    type: "select",
                    required: false,
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
