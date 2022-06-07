var ParametreRequest = kendo.data.Model.define({
    fields: {
        ModelName: {
            type: "string",
            defaultValue: ""
        },
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        KurumId: {
            type: "number",
            defaultValue: 0
        },
        UstId: {
            type: "number",
            defaultValue: 0
        },
        Tanim: {
            type: "string",
            defaultValue: ""
        }
    }
});
