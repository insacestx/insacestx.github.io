export default {
    title: "Errors & Omissions (E&O) Application",

    steps: [
        {
            id: "firm",
            title: "Firm Information",
            fields: [
                { id: "firmName", label: "Firm Name", type: "text", required: true },
                { id: "profession", label: "Profession / Specialty", type: "text", required: true },
                { id: "yearsInBusiness", label: "Years in Business", type: "number", required: true }
            ]
        },

        {
            id: "exposures",
            title: "Professional Exposures",
            fields: [
                { id: "services", label: "Services Provided", type: "text", required: true },
                { id: "annualRevenue", label: "Annual Revenue", type: "number", required: true },
                { id: "largestClientPercent", label: "Largest Client % of Revenue", type: "number", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "limit", label: "Requested Limit", type: "number", required: true },
                { id: "deductible", label: "Deductible", type: "number", required: true },
                { id: "retroDate", label: "Retroactive Date (if any)", type: "date", required: false }
            ]
        }
    ]
};
