var MessageRecordsSearchModel = kendo.data.Model.define({
    fields: {
        MesajIcerigi: {
            defaultValue: "",
            type: "string"
        },
        GonderimZamani: {
            defaultValue: "",
            type: "string"
        },
        GonderenKisiId: {
            defaultValue: 0,
            type: "number"
        },
        GonderenKisiAdi: {
            defaultValue: "",
            type: "string"
        },
        HedefKisiId: {
            defaultValue: 0,
            type: "number"
        },
        HedefKisiAdi: {
            defaultValue: "",
            type: "string"
        },
        MesajKaynagiTipi: {
            defaultValue: "",
            type: "string"
        }
    }
});
