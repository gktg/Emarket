var IcerikMedyaModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        Url: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        }
    }
});
