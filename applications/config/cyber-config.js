export default {
    title: "Cyber Liability Application",

    steps: [
        {
            id: "business",
            title: "Business Profile",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "industry", label: "Industry", type: "text", required: true },
                { id: "numRecords", label: "Estimated Number of Records Stored", type: "number", required: true }
            ]
        },

        {
            id: "itSecurity",
            title: "IT Security Controls",
            fields: [
                { id: "firewall", label: "Firewall in Place?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "mfa", label: "Multi-Factor Authentication (MFA) Enabled?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "backupPolicy", label: "Data Backup Policy", type: "text", required: false }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "limit", label: "Requested Limit", type: "number", required: true },
                { id: "retention", label: "Retention", type: "number", required: true }
            ]
        }
    ]
};
