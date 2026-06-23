export default {
    title: "ATV / Off-Road Vehicle Application",

    steps: [
        {
            id: "owner",
            title: "Owner Information",
            fields: [
                { id: "ownerName", label: "Full Name", type: "text", required: true },
                { id: "phone", label: "Phone Number", type: "text", required: true }
            ]
        },

        {
            id: "vehicle",
            title: "Vehicle Details",
            fields: [
                { id: "year", label: "Year", type: "number", required: true },
                { id: "make", label: "Make", type: "text", required: true },
                { id: "model", label: "Model", type: "text", required: true },
                { id: "vin", label: "VIN", type: "text", required: false },
                { id: "vehicleType", label: "Vehicle Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "atv", label: "ATV" },
                        { value: "utv", label: "UTV" },
                        { value: "dirtbike", label: "Dirt Bike" }
                    ]
                }
            ]
        },

        {
            id: "usage",
            title: "Usage & Terrain",
            fields: [
                { id: "usageType", label: "Usage Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "recreational", label: "Recreational" },
                        { value: "farm", label: "Farm/Ranch" },
                        { value: "business", label: "Business" }
                    ]
                },
                { id: "terrain", label: "Typical Terrain", type: "text", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "liabilityLimit", label: "Liability Limit", type: "number", required: true },
                { id: "compDeductible", label: "Comprehensive Deductible", type: "number", required: false },
                { id: "collisionDeductible", label: "Collision Deductible", type: "number", required: false }
            ]
        }
    ]
};
