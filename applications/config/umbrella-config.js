export default {
    title: "Personal Umbrella Application",

    steps: [
        {
            id: "insured",
            title: "Named Insured",
            fields: [
                { id: "insuredName", label: "Named Insured", type: "text", required: true },
                { id: "dob", label: "Date of Birth", type: "date", required: true },
                { id: "address", label: "Mailing Address", type: "text", required: true }
            ]
        },

        {
            id: "underlying",
            title: "Underlying Policies",
            fields: [
                { id: "autoCarrier", label: "Auto Carrier", type: "text", required: true },
                { id: "homeCarrier", label: "Home Carrier", type: "text", required: false },
                { id: "autoLiabilityLimit", label: "Auto Liability Limit", type: "text", required: true },
                { id: "homeLiabilityLimit", label: "Home Liability Limit", type: "text", required: false }
            ]
        },

        {
            id: "exposures",
            title: "Exposures",
            fields: [
                { id: "numVehicles", label: "Number of Vehicles", type: "number", required: true },
                { id: "numProperties", label: "Number of Properties", type: "number", required: true },
                { id: "watercraft", label: "Any Watercraft?", type: "select", required: false,
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
