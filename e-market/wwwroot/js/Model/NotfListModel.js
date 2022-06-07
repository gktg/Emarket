var NotfListModel = kendo.data.Model.define({
    fields: {
        TabloId: {
            type: "number",
            defaultValue: 0,
        },
        GonKisiAdi: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        GondKisiAdi: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        GonderimZamani: {
            type: "date",
            defaultValue: null
        },
        GondMetni: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        }
    }
});
