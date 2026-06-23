export default {
    title_en: "Cyber Liability Insurance Application",
    title_es: "Solicitud de Seguro de Responsabilidad Cibernética",

    steps: [
        {
            id: "business",
            title_en: "Business Profile",
            title_es: "Perfil del Negocio",
            fields: [
                { id: "businessName", label_en: "Business Name", label_es: "Nombre del Negocio", type: "text", required: true },
                { id: "industry", label_en: "Industry", label_es: "Industria", type: "text", required: true },
                { id: "numRecords", label_en: "Estimated Number of Records Stored", label_es: "Número Estimado de Registros Almacenados", type: "number", required: true }
            ]
        },

        {
            id: "itSecurity",
            title_en: "IT Security Controls",
            title_es: "Controles de Seguridad Informática",
            fields: [
                {
                    id: "firewall",
                    label_en: "Firewall in Place?",
                    label_es: "¿Cuenta con Firewall?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                {
                    id: "mfa",
                    label_en: "Multi-Factor Authentication (MFA) Enabled?",
                    label_es: "¿Autenticación Multifactor (MFA) Activada?",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", label_en: "Select...", label_es: "Seleccione..." },
                        { value: "yes", label_en: "Yes", label_es: "Sí" },
                        { value: "no", label_en: "No", label_es: "No" }
                    ]
                },
                { id: "backupPolicy", label_en: "Data Backup Policy", label_es: "Política de Respaldo de Datos", type: "text" }
            ]
        },

        {
            id: "coverage",
            title_en: "Coverage Options",
            title_es: "Opciones de Cobertura",
            fields: [
                { id: "limit", label_en: "Requested Limit", label_es: "Límite Solicitado", type: "number", required: true },
                { id: "retention", label_en: "Retention", label_es: "Retención", type: "number", required: true }
            ]
        }
    ]
};
