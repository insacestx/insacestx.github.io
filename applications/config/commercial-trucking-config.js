export default {
    title: "Commercial Trucking Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "dotNumber", label: "USDOT Number", type: "text", required: true },
                { id: "mcNumber", label: "MC Number", type: "text", required: false },
                { id: "businessAddress", label: "Business Address", type: "text", required: true },
                { id: "businessPhone", label: "Business Phone", type: "text", required: true },
                { id: "yearsInBusiness", label: "Years in Business", type: "number", required: true }
            ]
        },

        {
            id: "fleet",
            title: "Fleet Information",
            fields: [
                { id: "numPowerUnits", label: "Number of Power Units", type: "number", required: true },
                { id: "numTrailers", label: "Number of Trailers", type: "number", required: true },
                { id: "radiusOfOperation", label: "Radius of Operation (Miles)", type: "number", required: true },
                { id: "cargoType", label: "Primary Cargo Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "general", label: "General Freight" },
                        { value: "reefer", label: "Refrigerated Goods" },
                        { value: "flatbed", label: "Flatbed / Heavy Haul" },
                        { value: "hazmat", label: "Hazmat" },
                        { value: "autos", label: "Auto Hauler" }
                    ]
                }
            ]
        },

        {
            id: "drivers",
            title: "Driver Information",
            fields: [
                { id: "numDrivers", label: "Number of Drivers", type: "number", required: true },
                { id: "minDriverAge", label: "Minimum Driver Age", type: "number", required: true },
                { id: "driverExperience", label: "Minimum Years Experience", type: "number", required: true },
                { id: "mvrPolicy", label: "MVR Policy", type: "text", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "liabilityLimit", label: "Liability Limit", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "750k", label: "$750,000" },
                        { value: "1m", label: "$1,000,000" },
                        { value: "2m", label: "$2,000,000" }
                    ]
                },
                { id: "cargoLimit", label: "Cargo Limit", type: "number", required: true },
                { id: "physicalDamage", label: "Physical Damage Coverage", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                }
            ]
        },

        {
            id: "safety",
            title: "Safety & Compliance",
            fields: [
                { id: "safetyProgram", label: "Formal Safety Program?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "eldSystem", label: "ELD System Used", type: "text", required: false },
                { id: "drugTesting", label: "Drug Testing Program?", type: "select", required: true,
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
                { id: "claimsPast3Years", label: "Claims in Past 3 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3+", label: "3 or more" }
                    ]
                },
                { id: "lossRuns", label: "Loss Runs Available?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                }
            ]
        }
    ]
};
