export default {
    title: "Renters Insurance Application",

    steps: [
        {
            id: "personal",
            title: "Personal Information",
            fields: [
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "dob", label: "Date of Birth", type: "date", required: true },
                { id: "phone", label: "Phone Number", type: "text", required: true },
                { id: "email", label: "Email Address", type: "email", required: true }
            ]
        },

        {
            id: "property",
            title: "Property Information",
            fields: [
                { id: "rentalAddress", label: "Rental Address", type: "text", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State", type: "text", required: true },
                { id: "zip", label: "ZIP Code", type: "text", required: true },
                { id: "propertyType", label: "Property Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "apartment", label: "Apartment" },
                        { value: "condo", label: "Condo" },
                        { value: "townhome", label: "Townhome" },
                        { value: "singlefamily", label: "Single Family Home" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "personalProperty", label: "Personal Property Coverage", type: "number", required: true },
                { id: "liabilityCoverage", label: "Liability Coverage", type: "number", required: true },
                { id: "deductible", label: "Deductible Amount", type: "number", required: true }
            ]
        }
    ]
};
