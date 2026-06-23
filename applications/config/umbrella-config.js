export default {
    title_en: "Personal Umbrella Insurance Application",
    title_es: "Solicitud de Seguro Umbrella Personal",

    steps: [
        {
            id: "insured",
            title_en: "Named Insured",
            title_es: "Asegurado Nombrado",
            fields: [
                { id: "insuredName", label_en: "Full Name", label_es: "Nombre Completo", type: "text", required: true },
                { id: "dob", label_en: "Date of Birth", label_es: "Fecha de Nacimiento", type: "date", required: true },
                { id: "address", label_en: "Mailing Address", label_es: "Dirección Postal", type: "text", required: true }
            ]
        },

        {
            id: "underlying",
            title_en: "Underlying Policies",
            title_es: "Pólizas Subyacentes",
            fields: [
                { id: "autoCarrier", label_en: "Auto Carrier", label_es: "Aseguradora de Auto", type: "text", required: true },
                { id: "homeCarrier", label_en: "Home Carrier", label_es: "Aseguradora de Casa", type: "text" },
                { id: "autoLiabilityLimit", label_en: "Auto Liability Limit", label_es: "Límite de Responsabilidad de Auto", type: "text", required: true },
                { id: "homeLiabilityLimit", label_en: "Home Liability Limit", label_es: "Límite de Responsabilidad de Casa", type: "text" }
            ]
        },

        {
            id: "exposures",
            title_en: "Exposures",
            title_es: "Exposiciones",
            fields: [
                { id: "numVehicles", label_en: "Number of Vehicles", label_es: "Número de Vehículos", type: "number", required: true },
                { id: "numProperties", label_en: "Number of Properties", label_es: "Número de Propiedades", type: "number", required: true },
                {
                    id: "watercraft",
                    label_en: "Any Watercraft?",
                    label_es: "¿Alguna Embarcación?",
                    type: "select",
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
