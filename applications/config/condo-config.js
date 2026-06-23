export default {
    title: "Condo Insurance Application",

    steps: [
        {
            id: "personal",
            title: "Personal Information",
            fields: [
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "phone", label: "Phone Number", type: "text", required: true },
                { id: "email", label: "Email Address", type: "email", required: true }
            ]
        },

        {
            id: "property",
            title: "Condo Details",
            fields: [
                { id: "address", label: "Condo Address", type: "text", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State", type: "text", required: true },
                { id: "zip", label: "ZIP Code", type: "text", required: true },
                { id: "unitFloor", label: "Unit Floor", type: "number", required: false },
                { id: "yearBuilt", label: "Year Built", type: "number", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "dwellingImprovements", label: "Improvements & Betterments Coverage", type: "number", required: true },
                { id: "personalProperty", label: "Personal Property Coverage", type: "number", required: true },
                { id: "liabilityCoverage", label: "Liability Coverage", type: "number", required: true },
                { id: "deductible", label: "Deductible", type: "number", required: true }
            ]
        },

        {
            id: "association",
            title: "Association Details",
            fields: [
                { id: "hoaName", label: "HOA/Condo Association Name", type: "text", required: false },
                { id: "masterPolicyCarrier", label: "Master Policy Carrier (if known)", type: "text", required: false }
            ]
        }
    ]
};
