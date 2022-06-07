var IcerikKutuphanesiModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        IcerikBaslik: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        IcerikOzetMetni: {
            type: "string",
            defaultValue: ""
        },
        IcerikTaslakMi: {
            type: "bool",
            defaultValue: null
        },
        IcerikYayinlanmaZamani: {
            type: "datetime",
            defaultValue: null
        },
        IcerikBitisZamani: {
            type: "datetime",
            defaultValue: null
        },
        IcerikTamMetin: {
            type: "string",
            defaultValue: ""
        }
    }
});
