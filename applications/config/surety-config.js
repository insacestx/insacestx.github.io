export default {
    title: "Surety Bond Application",

    steps: [
        {
            id: "principal",
            title: "Principal Information",
            fields: [
                { id: "principalName", label: "Principal Name", type: "text", required: true },
                { id: "entityType", label: "Entity Type", type: "text", required: true },
                { id: "address", label: "Address", type: "text", required: true }
            ]
        },

        {
            id: "bond",
            title: "Bond Details",
            fields: [
                { id: "bondType", label: "Bond Type", type: "text", required: true },
                { id: "obligee", label: "Obligee Name", type: "text", required: true },
                { id: "bondAmount", label: "Bond Amount", type: "number", required: true },
                { id: "effectiveDate", label: "Effective Date", type: "date", required: true }
            ]
        }
    ]
};
