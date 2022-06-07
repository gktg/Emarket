var HatirlatmaGenelAyarModel = kendo.data.Model.define({
    fields: {
        HatirlatmaBaslamaZamanTipi: {
            type: "string",
            defaultValue: "Yok"
        },
        HatirlatmaBaslamaZamanTipiDegeri: {
            type: "number",
            defaultValue: 0
        },
        HatirlatmaMaksimumSayisi: {
            type: "number",
            defaultValue: 0
        },
        HatirlatmaEpostaYollasinMi: {
            type: "boolean",
            defaultValue: false
        },
        HatirlatmaSmsyollasinMi: {
            type: "boolean",
            defaultValue: false
        },
        HatirlatmaAralikSikligiDakikaBazinda: {
            type: "number",
            defaultValue: 0
        },
        TabloId: {
            type: "number",
            defaultValue: 0
        }
    }
});
