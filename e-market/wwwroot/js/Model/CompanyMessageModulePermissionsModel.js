var CompanyMessageModulePermissionsModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            defaultValue: 0,
            type: "string"
        },
        KurumID: {
            defaultValue: 0,
            type: "string"
        },
        KisiID: {
            defaultValue: 0,
            type: "string"
        },
        IzinVerilmeyenBirimIDleri: {
            defaultValue: [],
            type: "object"
        }
    }
});
