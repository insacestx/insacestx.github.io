const bundleConfig = {
  title_en: "Bundle & Save Application",
  title_es: "Solicitud de Paquete y Ahorro",

  steps: [
    {
      id: "bundle_selection",
      title_en: "Policies to Bundle",
      title_es: "Pólizas para Agrupar",
      fields: [
        {
          id: "bundlePolicies",
          type: "select",
          required: true,
          label_en: "How many policies do you want to bundle?",
          label_es: "¿Cuántas pólizas desea agrupar?",
          options: [
            { value: "", label_en: "Select one", label_es: "Seleccione una" },
            { value: "2", label_en: "2 Policies", label_es: "2 Pólizas" },
            { value: "3", label_en: "3 Policies", label_es: "3 Pólizas" },
            { value: "4+", label_en: "4 or More Policies", label_es: "4 o Más Pólizas" }
          ]
        },
        {
  id: "policyTypes",
  type: "checkbox-group",
  required: true,
  minSelected: 2,
  label_en: "Which policy types are you interested in?",
  label_es: "¿Qué tipos de póliza le interesan?",
  options: [
    { value: "auto", label_en: "Auto", label_es: "Auto" },
    { value: "homeowners", label_en: "Homeowners", label_es: "Casa" },
    { value: "renters", label_en: "Renters", label_es: "Inquilinos" },
    { value: "condo", label_en: "Condo", label_es: "Condominio" },
    { value: "motorcycle", label_en: "Motorcycle", label_es: "Motocicleta" },
    { value: "boat", label_en: "Boat", label_es: "Barco" },
    { value: "rv", label_en: "RV", label_es: "RV" },
    { value: "umbrella", label_en: "Umbrella", label_es: "Umbrella" }
  ]
}
      ]
    },

    {
      id: "current_coverage",
      title_en: "Current Coverage",
      title_es: "Cobertura Actual",
      fields: [
        {
          id: "currentlyInsured",
          type: "select",
          required: true,
          label_en: "Are you currently insured?",
          label_es: "¿Actualmente tiene seguro?",
          options: [
            { value: "", label_en: "Select one", label_es: "Seleccione una" },
            { value: "yes", label_en: "Yes", label_es: "Sí" },
            { value: "no", label_en: "No", label_es: "No" }
          ]
        },
        {
          id: "currentCarrier",
          type: "text",
          required: false,
          label_en: "Current insurance company (if any)",
          label_es: "Compañía de seguro actual (si aplica)",
          placeholder_en: "Company name",
          placeholder_es: "Nombre de la compañía"
        },
        {
          id: "renewalDate",
          type: "text",
          required: false,
          label_en: "Renewal date (if known)",
          label_es: "Fecha de renovación (si la sabe)",
          placeholder_en: "MM/DD/YYYY",
          placeholder_es: "MM/DD/AAAA"
        }
      ]
    },

    {
      id: "property_and_drivers",
      title_en: "Property / Driver Details",
      title_es: "Detalles de Propiedad / Conductores",
      fields: [
        {
          id: "zipCode",
          type: "text",
          required: true,
          label_en: "Primary ZIP Code",
          label_es: "Código Postal Principal",
          placeholder_en: "e.g. 76643",
          placeholder_es: "ej. 76643"
        },
        {
          id: "householdDrivers",
          type: "text",
          required: false,
          label_en: "Number of household drivers",
          label_es: "Número de conductores en el hogar",
          placeholder_en: "e.g. 2",
          placeholder_es: "ej. 2"
        },
        {
          id: "propertyNotes",
          type: "text",
          required: false,
          label_en: "Property/vehicle notes",
          label_es: "Notas de propiedad/vehículos",
          placeholder_en: "Any relevant details",
          placeholder_es: "Cualquier detalle relevante"
        }
      ]
    },

    {
      id: "contact_info",
      title_en: "Contact Information",
      title_es: "Información de Contacto",
      fields: [
        {
          id: "fullName",
          type: "text",
          required: true,
          label_en: "Full Name",
          label_es: "Nombre Completo",
          placeholder_en: "Your full name",
          placeholder_es: "Su nombre completo"
        },
        {
          id: "phone",
          type: "text",
          required: true,
          label_en: "Phone Number",
          label_es: "Número de Teléfono",
          placeholder_en: "Best contact number",
          placeholder_es: "Mejor número de contacto"
        },
        {
          id: "email",
          type: "text",
          required: true,
          label_en: "Email Address",
          label_es: "Correo Electrónico",
          placeholder_en: "you@example.com",
          placeholder_es: "usted@ejemplo.com"
        },
        {
          id: "preferredContact",
          type: "select",
          required: true,
          label_en: "Preferred contact method",
          label_es: "Método de contacto preferido",
          options: [
            { value: "", label_en: "Select one", label_es: "Seleccione una" },
            { value: "phone", label_en: "Phone", label_es: "Teléfono" },
            { value: "email", label_en: "Email", label_es: "Correo electrónico" },
            { value: "text", label_en: "Text Message", label_es: "Mensaje de texto" }
          ]
        },
        {
          id: "notes",
          type: "text",
          required: false,
          label_en: "Additional Notes",
          label_es: "Notas Adicionales",
          placeholder_en: "Anything you'd like us to know",
          placeholder_es: "Lo que desea que sepamos"
        }
      ]
    }
  ]
};

export default bundleConfig;
