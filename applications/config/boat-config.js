export default {
    title: "Boat Insurance Application",

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
            id: "vessel",
            title: "Vessel Details",
            fields: [
                { id: "vesselYear", label: "Year", type: "number", required: true },
                { id: "vesselMake", label: "Make", type: "text", required: true },
                { id: "vesselModel", label: "Model", type: "text", required: true },
                { id: "hullId", label: "HIN (Hull ID)", type: "text", required: true },
                { id: "length", label: "Length (ft)", type: "number", required: true },
                { id: "vesselType", label: "Vessel Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "runabout", label: "Runabout" },
                        { value: "pontoon", label: "Pontoon" },
                        { value: "sailboat", label: "Sailboat" },
                        { value: "fishing", label: "Fishing Boat" },
                        { value: "yacht", label: "Yacht" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title: "Usage & Mooring",
            fields: [
                { id: "primaryWaters", label: "Primary Waters (Lake/Bay/Gulf/etc.)", type: "text", required: true },
                { id: "mooringLocation", label: "Mooring Location", type: "text", required: true },
                { id: "layupPeriod", label: "Lay-Up Period (if any)", type: "text", required: false },
                { id: "usageType", label: "Usage Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "pleasure", label: "Pleasure" },
                        { value: "fishing", label: "Fishing" },
                        { value: "charter", label: "Charter" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "hullValue", label: "Hull Agreed Value", type: "number", required: true },
                { id: "liabilityLimit", label: "Liability Limit", type: "number", required: true },
                { id: "medicalPayments", label: "Medical Payments Limit", type: "number", required: false },
                { id: "trailerCoverage", label: "Trailer Coverage?", type: "select", required: false,
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
