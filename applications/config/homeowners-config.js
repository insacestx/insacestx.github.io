export default {
    title: "Homeowners Insurance Application",

    steps: [
        {
            id: "property",
            title: "Property Information",
            fields: [
                { id: "propertyAddress", label: "Property Address", type: "text", required: true },
                { id: "propertyCity", label: "City", type: "text", required: true },
                { id: "propertyState", label: "State", type: "text", required: true },
                { id: "propertyZip", label: "ZIP Code", type: "text", required: true },
                { id: "yearBuilt", label: "Year Built", type: "number", required: true },
                { id: "constructionType", label: "Construction Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "frame", label: "Frame" },
                        { value: "brick", label: "Brick" },
                        { value: "stucco", label: "Stucco" },
                        { value: "masonry", label: "Masonry" }
                    ]
                }
            ]
        },

        {
            id: "coverage",
            title: "Coverage Options",
            fields: [
                { id: "dwellingCoverage", label: "Dwelling Coverage Amount", type: "number", required: true },
                { id: "personalProperty", label: "Personal Property Coverage", type: "number", required: true },
                { id: "liabilityCoverage", label: "Liability Coverage", type: "number", required: true },
                { id: "deductible", label: "Deductible Amount", type: "number", required: true },
                { id: "roofType", label: "Roof Type", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "shingle", label: "Shingle" },
                        { value: "metal", label: "Metal" },
                        { value: "tile", label: "Tile" },
                        { value: "flat", label: "Flat" }
                    ]
                }
            ]
        },

        {
            id: "claims",
            title: "Claims History",
            fields: [
                { id: "claimsPast5Years", label: "Claims in the Past 5 Years", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3+", label: "3 or more" }
                    ]
                },
                { id: "roofAge", label: "Roof Age (Years)", type: "number", required: true },
                { id: "priorCarrier", label: "Prior Insurance Carrier", type: "text", required: false }
            ]
        },

        {
            id: "additional",
            title: "Additional Details",
            fields: [
                { id: "occupancyType", label: "Occupancy Type", type: "select", required: true,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "owner", label: "Owner Occupied" },
                        { value: "tenant", label: "Tenant Occupied" },
                        { value: "vacant", label: "Vacant" }
                    ]
                },
                { id: "pets", label: "Any Pets?", type: "select", required: false,
                    options: [
                        { value: "", label: "Select..." },
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                    ]
                },
                { id: "pool", label: "Swimming Pool?", type: "select", required: false,
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
