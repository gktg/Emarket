var LisansKurumKisiAbonelikTanimModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        LisansGenelTanimId: {
            type: "number",
            defaultValue: 0
        },
        LisansEssizNo: {
            type: "string",
            defaultValue: ""
        },
        LisansAboneKurumId: {
            type: "number",
            defaultValue: 0
        },
        LisansAboneKisiId: {
            type: "number",
            defaultValue: 0
        },
        LisansAbonelikBaslangicTarihi: {
            type: "string",
            defaultValue: ""
        },
        LisansAbonelikBitisTarihi: {
            type: "string",
            defaultValue: ""
        },
    }
});
