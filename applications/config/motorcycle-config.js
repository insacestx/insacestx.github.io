export default {
    title: "Motorcycle Insurance Application",

    steps: [
        {
            id: "rider",
            title: "Rider Information",
            fields: [
                { id: "riderName", label: "Full Name", type: "text", required: true },
                { id: "riderDOB", label: "Date of Birth", type: "date", required: true },
                { id: "licenseNumber", label: "License Number", type: "text", required: true },
                { id: "licenseState", label: "License State", type: "text", required: true },
                { id: "yearsRiding", label: "Years of Riding Experience", type: "number", required: true }
            ]
        },

        {
            id: "bike",
            title: "Motorcycle Details",
            fields: [
                { id: "bikeYear", label: "Year", type: "number", required: true },
                { id: "bikeMake", label: "Make", type: "text", required: true },
                { id: "bikeModel", label: "Model", type: "text", required: true },
                { id: "vin", label: "VIN", type: "text", required: true },
                { id: "cc", label: "Engine CC", type: "number", required: true },
                { id: "usage", label: "Primary Use", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "pleasure", label: "Pleasure" },
                        { value: "commute", label: "Commute" },
                        { value: "business", label: "Business" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "liabilityLimits", label: "Liability Limits", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "30/60/25", label: "30/60/25" },
                        { value: "50/100/50", label: "50/100/50" },
                        { value: "100/300/100", label: "100/300/100" }
                    ]
                },
                { id: "compDeductible", label: "Comprehensive Deductible", type: "number", required: false },
                { id: "collisionDeductible", label: "Collision Deductible", type: "number", required: false },
                { id: "accessoriesLimit", label: "Accessories Coverage Limit", type: "number", required: false }
            ]
        },

        {
            id: "claims",
            title: "Claims & Violations",
            fields: [
                { id: "claimsPast3Years", label: "Claims in Past 3 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3+", label: "3 or more" }
                    ]
                },
                { id: "violationsPast3Years", label: "Moving Violations in Past 3 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3+", label: "3 or more" }
                    ]
                }
            ]
        }
    ]
};
