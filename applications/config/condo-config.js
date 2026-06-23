export default {
    title_en: "Condo Insurance Application",
    title_es: "Solicitud de Seguro de Condominio",

    steps: [
        {
            id: "personal",
            title_en: "Personal Information",
            title_es: "Información Personal",
            fields: [
                { id: "fullName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
                { id: "phone", label_en: "Phone Number", label_es: "Número de Teléfono", type: "text", required: true },
                { id: "email", label_en: "Email Address", label_es: "Correo Electrónico", type: "email", required: true }
            ]
        },

        {
            id: "property",
            title_en: "Condo Details",
            title_es: "Detalles del Condominio",
            fields: [
                { id: "address", label_en: "Condo Address", label_es: "Dirección del Condominio", type: "text", required: true },
                { id: "city", label_en: "City", label_es: "Ciudad", type: "text", required: true },
                { id: "state", label_en: "State", label_es: "Estado", type: "text", required: true },
                { id: "zip", label_en: "ZIP Code", label_es: "Código Postal", type: "text", required: true },
                { id: "unitFloor", label_en: "Unit Floor", label_es: "Piso de la Unidad", type: "number" },
                { id: "yearBuilt", label_en: "Year Built", label_es: "Año de Construcción", type: "number" }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "dwellingImprovements", label_en: "Improvements & Betterments Coverage", label_es: "Mejoras y Mejoramientos", type: "number", required: true },
                { id: "personalProperty", label_en: "Personal Property Coverage", label_es: "Cobertura de Propiedad Personal", type: "number", required: true },
                { id: "liabilityCoverage", label_en: "Liability Coverage", label_es: "Cobertura de Responsabilidad", type: "number", required: true },
                { id: "deductible", label_en: "Deductible", label_es: "
