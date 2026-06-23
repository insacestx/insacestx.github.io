export default {
    title: "Life Insurance Application",

    steps: [
        {
            id: "insured",
            title: "Proposed Insured",
            fields: [
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "dob", label: "Date of Birth", type: "date", required: true },
                { id: "gender", label: "Gender", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                    ]
                },
                { id: "tobaccoUse", label: "Tobacco Use?", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Requested",
            fields: [
                { id: "productType", label: "Product Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "term", label: "Term" },
                        { value: "whole", label: "Whole Life" },
                        { value: "ul", label: "Universal Life" }
                    ]
                },
                { id: "faceAmount", label: "Face Amount", type: "number", required: true },
                { id: "termLength", label: "Term Length (if Term)", type: "number", required: false }
            ]
        },

        {
            id: "beneficiaries",
            title: "Beneficiaries",
            fields: [
                { id: "primaryBeneficiary", label: "Primary Beneficiary Name", type: "text", required: true },
                { id: "contingentBeneficiary", label: "Contingent Beneficiary Name", type: "text", required: false }
            ]
        }
    ]
};
