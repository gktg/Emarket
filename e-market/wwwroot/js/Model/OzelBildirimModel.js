var OzelBildirimModel = kendo.data.Model.define({
    fields: {
        BildirimZamani: {
            type: "date",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        BildirimMetni: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        BildirimGonderilecekKisiList: {
            type: "object",
            defaultValue: []
        },
        BildirimEpostaYollayacakMi: {
            type: "boolean",
            defaultValue: false
        },
        BildirimSmsYollayacakMi: {
            type: "boolean",
            defaultValue: false
        }
    }
});
