export default {
    title: "Auto Insurance Application",

    steps: [
        {
            id: "drivers",
            title: "Driver Information",
            fields: [
                { id: "driverName", label: "Full Name", type: "text", required: true },
                { id: "driverDOB", label: "Date of Birth", type: "date", required: true },
                { id: "driverLicense", label: "Driver License Number", type: "text", required: true },
                { id: "driverState", label: "License State", type: "text", required: true },
                { id: "maritalStatus", label: "Marital Status", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "single", label: "Single" },
                        { value: "married", label: "Married" },
                        { value: "divorced", label: "Divorced" },
                        { value: "widowed", label: "Widowed" }
                    ]
                }
            ]
        },

        {
            id: "vehicles",
            title: "Vehicle Information",
            fields: [
                { id: "vehicleYear", label: "Vehicle Year", type: "number", required: true },
                { id: "vehicleMake", label: "Make", type: "text", required: true },
                { id: "vehicleModel", label: "Model", type: "text", required: true },
                { id: "vin", label: "VIN Number", type: "text", required: true },
                { id: "primaryUse", label: "Primary Use", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "commute", label: "Commute" },
                        { value: "pleasure", label: "Pleasure" },
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
                        { value: "100/300/100", label: "100/300/100" },
                        { value: "250/500/250", label: "250/500/250" }
                    ]
                },
                { id: "compDeductible", label: "Comprehensive Deductible", type: "number", required: true },
                { id: "collisionDeductible", label: "Collision Deductible", type: "number", required: true },
                { id: "rentalCoverage", label: "Rental Reimbursement", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                }
            ]
        },

        {
            id: "claims",
            title: "Claims History",
            fields: [
                { id: "claimsPast3Years", label: "Claims in the Past 3 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3+", label: "3 or more" }
                    ]
                },
                { id: "accidentsPast3Years", label: "Accidents in the Past 3 Years", type: "select", required: true,
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
