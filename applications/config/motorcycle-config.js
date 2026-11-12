export default {
  title_en: "Motorcycle Insurance Application",
  title_es: "Solicitud de Seguro de Motocicleta",

  steps: [
    {
      id: "rider",
      title_en: "Rider Information",
      title_es: "Información del Conductor",
      fields: [
        { id: "riderName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
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
        { id: "phone", label_en: "Phone Number", label_es: "Número de Teléfono", type: "text", required: true },
        { id: "email", label_en: "Email Address", label_es: "Correo Electrónico", type: "email", required: true },
        { id: "riderDOB", label_en: "Date of Birth", label_es: "Fecha de Nacimiento", type: "date", required: true },
        { id: "licenseNumber", label_en: "License Number", label_es: "Número de Licencia", type: "text", required: true },
        {
  id: "licenseState",
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
},
        { id: "yearsRiding", label_en: "Years of Riding Experience", label_es: "Años de Experiencia", type: "number", required: true }
      ]
    },

    {
      id: "bike",
      title_en: "Motorcycle Details",
      title_es: "Detalles de la Motocicleta",
      fields: [
        { id: "bikeYear", label_en: "Year", label_es: "Año", type: "number", required: true },
        { id: "bikeMake", label_en: "Make", label_es: "Marca", type: "text", required: true },
        { id: "bikeModel", label_en: "Model", label_es: "Modelo", type: "text", required: true },
        { id: "vin", label_en: "VIN", label_es: "VIN", type: "text", required: true },
        {
          id: "cc",
          label_en: "Engine CC",
          label_es: "Cilindraje (CC)",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "0-125", label_en: "Up to 125cc", label_es: "Hasta 125cc" },
            { value: "126-250", label_en: "126cc - 250cc", label_es: "126cc - 250cc" },
            { value: "251-500", label_en: "251cc - 500cc", label_es: "251cc - 500cc" },
            { value: "501-750", label_en: "501cc - 750cc", label_es: "501cc - 750cc" },
            { value: "751-1000", label_en: "751cc - 1000cc", label_es: "751cc - 1000cc" },
            { value: "1001+", label_en: "1001cc+", label_es: "1001cc+" }
          ]
        },
        {
          id: "usage",
          label_en: "Primary Use",
          label_es: "Uso Principal",
          type: "select",
          required: true,
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "pleasure", label_en: "Pleasure", label_es: "Recreativo" },
            { value: "commute", label_en: "Commute", label_es: "Trabajo" },
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
            { value: "250/500/100", label_en: "250/500/100", label_es: "250/500/100" }
          ]
        },
        {
          id: "compDeductible",
          label_en: "Comprehensive Deductible",
          label_es: "Deducible de Cobertura Amplia",
          type: "select",
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
          options: [
            { value: "", label_en: "Select...", label_es: "Seleccione..." },
            { value: "250", label_en: "$250", label_es: "$250" },
            { value: "500", label_en: "$500", label_es: "$500" },
            { value: "1000", label_en: "$1,000", label_es: "$1,000" },
            { value: "2500", label_en: "$2,500", label_es: "$2,500" }
          ]
        },
        { id: "accessoriesLimit", label_en: "Accessories Coverage Limit", label_es: "Límite de Accesorios", type: "number" }
      ]
    },

    {
      id: "claims",
      title_en: "Claims & Violations",
      title_es: "Reclamos y Violaciones",
      fields: [
        {
          id: "claimsPast3Years",
          label_en: "Claims in Past 3 Years",
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
          id: "violationsPast3Years",
          label_en: "Moving Violations in Past 3 Years",
          label_es: "Violaciones de Tránsito en los Últimos 3 Años",
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
