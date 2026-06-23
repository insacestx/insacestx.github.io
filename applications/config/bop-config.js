export default {
    title: "Business Owners Policy (BOP) Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "entityType", label: "Entity Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "corp", label: "Corporation" },
                        { value: "llc", label: "LLC" },
                        { value: "partnership", label: "Partnership" },
                        { value: "soleprop", label: "Sole Proprietor" }
                    ]
                },
                { id: "yearsInBusiness", label: "Years in Business", type: "number", required: true },
                { id: "annualRevenue", label: "Annual Revenue", type: "number", required: true }
            ]
        },

        {
            id: "location",
            title: "Location Details",
            fields: [
                { id: "locationAddress", label: "Location Address", type: "text", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State", type: "text", required: true },
                { id: "zip", label: "ZIP Code", type: "text", required: true },
                { id: "sqft", label: "Square Footage", type: "number", required: true }
            ]
        },

        {
            id: "operations",
            title: "Operations",
            fields: [
                { id: "description", label: "Description of Operations", type: "text", required: true },
                { id: "numEmployees", label: "Number of Employees", type: "number", required: true },
                { id: "payroll", label: "Annual Payroll", type: "number", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "buildingLimit", label: "Building Limit", type: "number", required: false },
                { id: "bppLimit", label: "Business Personal Property Limit", type: "number", required: true },
                { id: "liabilityLimit", label: "Liability Limit (per occurrence)", type: "number", required: true }
            ]
        }
    ]
};
