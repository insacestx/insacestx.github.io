export default {
    title: "Commercial Umbrella Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "fein", label: "FEIN", type: "text", required: false },
                { id: "address", label: "Mailing Address", type: "text", required: true },
                { id: "industry", label: "Industry / Operations", type: "text", required: true }
            ]
        },

        {
            id: "underlying",
            title: "Underlying Policies",
            fields: [
                { id: "glCarrier", label: "GL Carrier", type: "text", required: true },
                { id: "autoCarrier", label: "Auto Carrier", type: "text", required: false },
                { id: "wcCarrier", label: "Workers Comp Carrier", type: "text", required: false },
                { id: "glLimit", label: "GL Limit", type: "text", required: true },
                { id: "autoLimit", label: "Auto Limit", type: "text", required: false }
            ]
        },

        {
            id: "limits",
            title: "Umbrella Limits",
            fields: [
                { id: "umbrellaLimit", label: "Requested Umbrella Limit", type: "number", required: true },
                { id: "selfInsuredRetention", label: "Self-Insured Retention (if any)", type: "number", required: false }
            ]
        }
    ]
};
