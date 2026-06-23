export default {
    title: "RV Insurance Application",

    steps: [
        {
            id: "owner",
            title: "Owner Information",
            fields: [
                { id: "ownerName", label: "Full Name", type: "text", required: true },
                { id: "phone", label: "Phone Number", type: "text", required: true },
                { id: "email", label: "Email Address", type: "email", required: true }
            ]
        },

        {
            id: "rvDetails",
            title: "RV Details",
            fields: [
                { id: "rvYear", label: "Year", type: "number", required: true },
                { id: "rvMake", label: "Make", type: "text", required: true },
                { id: "rvModel", label: "Model", type: "text", required: true },
                { id: "vin", label: "VIN", type: "text", required: true },
                { id: "rvType", label: "RV Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "motorhome", label: "Motorhome" },
                        { value: "travelTrailer", label: "Travel Trailer" },
                        { value: "fifthWheel", label: "Fifth Wheel" },
                        { value: "camper", label: "Truck Camper" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title: "Usage & Storage",
            fields: [
                { id: "fullTime", label: "Full-Time RV Use?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "annualMiles", label: "Estimated Annual Miles", type: "number", required: false },
                { id: "storageLocation", label: "Primary Storage Location", type: "text", required: true }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "liabilityLimits", label: "Liability Limits", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "50/100/50", label: "50/100/50" },
                        { value: "100/300/100", label: "100/300/100" },
                        { value: "250/500/250", label: "250/500/250" }
                    ]
                },
                { id: "compDeductible", label: "Comprehensive Deductible", type: "number", required: false },
                { id: "collisionDeductible", label: "Collision Deductible", type: "number", required: false },
                { id: "contentsCoverage", label: "Contents Coverage Limit", type: "number", required: false }
            ]
        }
    ]
};
