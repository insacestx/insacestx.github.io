export default {
    title: "Commercial Property Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "industry", label: "Industry / Operations", type: "text", required: true }
            ]
        },

        {
            id: "location",
            title: "Location Details",
            fields: [
                { id: "address", label: "Property Address", type: "text", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State", type: "text", required: true },
                { id: "zip", label: "ZIP Code", type: "text", required: true },
                { id: "yearBuilt", label: "Year Built", type: "number", required: true },
                { id: "constructionType", label: "Construction Type", type: "text", required: true }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "buildingLimit", label: "Building Limit", type: "number", required: true },
                { id: "bppLimit", label: "Business Personal Property Limit", type: "number", required: false },
                { id: "deductible", label: "Deductible", type: "number", required: true }
            ]
        }
    ]
};
