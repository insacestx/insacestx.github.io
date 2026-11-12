export default {
    title_en: "Auto Insurance Application",
    title_es: "Solicitud de Seguro de Auto",

    steps: [
        {
            id: "drivers",
            title_en: "Driver Information",
            title_es: "Información del Conductor",
            fields: [
                {
                    id: "driverName",
                    label_en: "Full Name",
                    label_es: "Nombre Completo",
                    type: "text",
                    required: true
                },
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
                    id: "driverDOB",
                    label_en: "Date of Birth",
                    label_es: "Fecha de Nacimiento",
                    type: "date",
                    required: true
                },
                {
                    id: "driverLicense",
                    label_en: "Driver License Number",
                    label_es: "Número de Licencia",
                    type: "text",
                    required: true
                },
                {
  id: "driverState",
  label_en: "License State",
  label_es: "Estado de la Licencia",
  type: "select",
  required: true,
  options: [
    { value: "", label_en: "Select...", label_es: "Seleccione..." },
    { value: "AL", label_en: "Alabama", label_es: "Alabama" },
    { value: "AK", label_en: "Alaska", label_es: "Alaska" },
    { value: "AZ", label_en: "Arizona", label_es: "Arizona" },
    { value: "AR", label_en: "Arkansas", label_es: "Arkansas" },
    { value: "CA", label_en: "California", label_es: "California" },
    { value: "CO", label_en: "Colorado", label_es: "Colorado" },
    { value: "CT", label_en: "Connecticut", label_es: "Connecticut" },
    { value: "DE", label_en: "Delaware", label_es: "Delaware" },
    { value: "FL", label_en: "Florida", label_es: "Florida" },
    { value: "GA", label_en: "Georgia", label_es: "Georgia" },
    { value: "HI", label_en: "Hawaii", label_es: "Hawaii" },
    { value: "ID", label_en: "Idaho", label_es: "Idaho" },
    { value: "IL", label_en: "Illinois", label_es: "Illinois" },
    { value: "IN", label_en: "Indiana", label_es: "Indiana" },
    { value: "IA", label_en: "Iowa", label_es: "Iowa" },
    { value: "KS", label_en: "Kansas", label_es: "Kansas" },
    { value: "KY", label_en: "Kentucky", label_es: "Kentucky" },
    { value: "LA", label_en: "Louisiana", label_es: "Louisiana" },
    { value: "ME", label_en: "Maine", label_es: "Maine" },
    { value: "MD", label_en: "Maryland", label_es: "Maryland" },
    { value: "MA", label_en: "Massachusetts", label_es: "Massachusetts" },
    { value: "MI", label_en: "Michigan", label_es: "Michigan" },
    { value: "MN", label_en: "Minnesota", label_es: "Minnesota" },
    { value: "MS", label_en: "Mississippi", label_es: "Mississippi" },
    { value: "MO", label_en: "Missouri", label_es: "Missouri" },
    { value: "MT", label_en: "Montana", label_es: "Montana" },
    { value: "NE", label_en: "Nebraska", label_es: "Nebraska" },
    { value: "NV", label_en: "Nevada", label_es: "Nevada" },
    { value: "NH", label_en: "New Hampshire", label_es: "New Hampshire" },
    { value: "NJ", label_en: "New Jersey", label_es: "New Jersey" },
    { value: "NM", label_en: "New Mexico", label_es: "New Mexico" },
    { value: "NY", label_en: "New York", label_es: "New York" },
    { value: "NC", label_en: "North Carolina", label_es: "North Carolina" },
    { value: "ND", label_en: "North Dakota", label_es: "North Dakota" },
    { value: "OH", label_en: "Ohio", label_es: "Ohio" },
    { value: "OK", label_en: "Oklahoma", label_es: "Oklahoma" },
    { value: "OR", label_en: "Oregon", label_es: "Oregon" },
    { value: "PA", label_en: "Pennsylvania", label_es: "Pennsylvania" },
    { value: "RI", label_en: "Rhode Island", label_es: "Rhode Island" },
    { value: "SC", label_en: "South Carolina", label_es: "South Carolina" },
    { value: "SD", label_en: "South Dakota", label_es: "South Dakota" },
    { value: "TN", label_en: "Tennessee", label_es: "Tennessee" },
    { value: "TX", label_en: "Texas", label_es: "Texas" },
    { value: "UT", label_en: "Utah", label_es: "Utah" },
    { value: "VT", label_en: "Vermont", label_es: "Vermont" },
    { value: "VA", label_en: "Virginia", label_es: "Virginia" },
    { value: "WA", label_en: "Washington", label_es: "Washington" },
    { value: "WV", label_en: "West Virginia", label_es: "West Virginia" },
    { value: "WI", label_en: "Wisconsin", label_es: "Wisconsin" },
    { value: "WY", label_en: "Wyoming", label_es: "Wyoming" },
    { value: "DC", label_en: "District of Columbia", label_es: "Distrito de Columbia" }
  ]
}
                {
                    id: "maritalStatus",
                    label_en: "Marital Status",
                    label_es: "Estado Civil",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "single", label_en: "Single", label_es: "Soltero(a)" },
                        { value: "married", label_en: "Married", label_es: "Casado(a)" },
                        { value: "divorced", label_en: "Divorced", label_es: "Divorciado(a)" },
                        { value: "widowed", label_en: "Widowed", label_es: "Viudo(a)" }
                    ]
                }
            ]
        },

        {
            id: "vehicles",
            title_en: "Vehicle Information",
            title_es: "Información del Vehículo",
            fields: [
                {
                    id: "vehicleYear",
                    label_en: "Vehicle Year",
                    label_es: "Año del Vehículo",
                    type: "number",
                    required: true
                },
                {
                    id: "vehicleMake",
                    label_en: "Make",
                    label_es: "Marca",
                    type: "text",
                    required: true
                },
                {
                    id: "vehicleModel",
                    label_en: "Model",
                    label_es: "Modelo",
                    type: "text",
                    required: true
                },
                {
                    id: "vin",
                    label_en: "VIN Number",
                    label_es: "Número de VIN",
                    type: "text",
                    required: true
                },
                {
                    id: "primaryUse",
                    label_en: "Primary Use",
                    label_es: "Uso Principal",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "commute", label_en: "Commute", label_es: "Trabajo" },
                        { value: "pleasure", label_en: "Pleasure", label_es: "Personal" },
                        { value: "business", label_en: "Business", label_es: "Negocios" }
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
                    id: "liabilityLimits",
                    label_en: "Liability Limits",
                    label_es: "Límites de Responsabilidad",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "30/60/25", label_en: "30/60/25", label_es: "30/60/25" },
                        { value: "50/100/50", label_en: "50/100/50", label_es: "50/100/50" },
                        { value: "100/300/100", label_en: "100/300/100", label_es: "100/300/100" },
                        { value: "250/500/250", label_en: "250/500/250", label_es: "250/500/250" }
                    ]
                },
                {
                    id: "compDeductible",
                    label_en: "Comprehensive Deductible",
                    label_es: "Deducible de Cobertura Amplia",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "250", label_en: "$250", label_es: "$250" },
                        { value: "500", label_en: "$500", label_es: "$500" },
                        { value: "1000", label_en: "$1,000", label_es: "$1,000" },
                        { value: "2500", label_en: "$2,500", label_es: "$2,500" }
                    ]
                },
                {
                    id: "collisionDeductible",
                    label_en: "Collision Deductible",
                    label_es: "Deducible de Colisión",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "250", label_en: "$250", label_es: "$250" },
                        { value: "500", label_en: "$500", label_es: "$500" },
                        { value: "1000", label_en: "$1,000", label_es: "$1,000" },
                        { value: "2500", label_en: "$2,500", label_es: "$2,500" }
                    ]
                },
                {
                    id: "rentalCoverage",
                    label_en: "Rental Reimbursement",
                    label_es: "Reembolso de Auto Rentado",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
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
                    id: "claimsPast3Years",
                    label_en: "Claims in the Past 3 Years",
                    label_es: "Reclamos en los Últimos 3 Años",
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
                    id: "accidentsPast3Years",
                    label_en: "Accidents in the Past 3 Years",
                    label_es: "Accidentes en los Últimos 3 Años",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "0", label_en: "0", label_es: "0" },
                        { value: "1", label_en: "1", label_es: "1" },
                        { value: "2", label_en: "2", label_es: "2" },
                        { value: "3+", label_en: "3 or more", label_es: "3 o más" }
                    ]
                }
            ]
        }
    ]
};
