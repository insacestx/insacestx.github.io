export default {
    title: "Flood Insurance Application",

    steps: [
        {
            id: "property",
            title: "Property Information",
            fields: [
                { id: "propertyAddress", label: "Property Address", type: "text", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State", type: "text", required: true },
                { id: "zip", label: "ZIP Code", type: "text", required: true },
                { id: "occupancy", label: "Occupancy Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "primary", label: "Primary Residence" },
                        { value: "secondary", label: "Secondary Residence" },
                        { value: "rental", label: "Rental" }
                    ]
                }
            ]
        },

        {
            id: "structure",
            title: "Structure Details",
            fields: [
                { id: "yearBuilt", label: "Year Built", type: "number", required: true },
                { id: "foundationType", label: "Foundation Type", type: "text", required: false },
                { id: "elevationCert", label: "Elevation Certificate Available?", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "buildingLimit", label: "Building Coverage Limit", type: "number", required: true },
                { id: "contentsLimit", label: "Contents Coverage Limit", type: "number", required: false },
                { id: "deductible", label: "Deductible", type: "number", required: true }
            ]
        }
    ]
};
