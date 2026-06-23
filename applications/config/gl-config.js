export default {
    title: "General Liability Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "industry", label: "Industry / NAICS", type: "text", required: true },
                { id: "yearsInBusiness", label: "Years in Business", type: "number", required: true },
                { id: "annualRevenue", label: "Annual Revenue", type: "number", required: true }
            ]
        },

        {
            id: "operations",
            title: "Operations & Exposures",
            fields: [
                { id: "operationsDescription", label: "Description of Operations", type: "text", required: true },
                { id: "productsExposure", label: "Products Exposure?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "subcontractors", label: "Use of Subcontractors?", type: "select", required: false,
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
                { id: "eachOccurrenceLimit", label: "Each Occurrence Limit", type: "number", required: true },
                { id: "aggregateLimit", label: "General Aggregate Limit", type: "number", required: true },
                { id: "deductible", label: "Deductible (if any)", type: "number", required: false }
            ]
        }
    ]
};
