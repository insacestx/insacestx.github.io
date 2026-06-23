export default {
    title: "Workers Compensation Application",

    steps: [
        {
            id: "business",
            title: "Business Information",
            fields: [
                { id: "businessName", label: "Business Name", type: "text", required: true },
                { id: "fein", label: "FEIN", type: "text", required: false },
                { id: "yearsInBusiness", label: "Years in Business", type: "number", required: true }
            ]
        },

        {
            id: "payroll",
            title: "Payroll & Employees",
            fields: [
                { id: "numEmployees", label: "Number of Employees", type: "number", required: true },
                { id: "annualPayroll", label: "Total Annual Payroll", type: "number", required: true },
                { id: "classCodes", label: "Primary Class Codes", type: "text", required: true }
            ]
        },

        {
            id: "lossHistory",
            title: "Loss History",
            fields: [
                { id: "lossesPast3Years", label: "Losses in Past 3 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1-2", label: "1–2" },
                        { value: "3+", label: "3 or more" }
                    ]
                },
                { id: "lossRunsAvailable", label: "Loss Runs Available?", type: "select", required: true,
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
