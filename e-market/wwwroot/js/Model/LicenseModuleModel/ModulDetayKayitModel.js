var ModulDetayKayitModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        Name: {
            type: "string",
            defaultValue: ""
        },
        //ModulDetayId: {
        //    type: "number",
        //    defaultValue: 0
        //},
        SayfaId: {
            type: "object",
            defaultValue: []
        }
    }
});
