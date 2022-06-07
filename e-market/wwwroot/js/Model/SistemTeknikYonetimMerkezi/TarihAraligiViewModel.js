var TarihAraligiViewModel = kendo.data.Model.define({
    fields: {
        BaslangicTarihi: {
            type: "string",
            defaultValue: ""
        },
        BitisTarihi: {
            type: "string",
            defaultValue: ""
        },
        KurumId: {
            type: "number",
            defaultValue: 0
        }
    }
});
