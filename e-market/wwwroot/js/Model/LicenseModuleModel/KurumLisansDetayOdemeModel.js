var KurumLisansDetayOdemeModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        LisansId: {
            type: "number",
            defaultValue: 0
        },
        Name: {
            type: "string",
            defaultValue: ""
        },
        KurumID: {
            type: "number",
            defaultValue: 0
        },
        IlgiliKurumId: {
            type: "number",
            defaultValue: 0
        },
        GecerliOlduguGun: {
            type: "number",
            defaultValue: 0
        },
        SonKullanimTarihi: {
            type: "string",
            defaultValue: ""
        },
        SayfaId: {
            type: "object",
            defaultValue: []
        },
        LisansZamanId: {
            type: "number",
            defaultValue: 0
        },
        LisansKisiSayisi: {
            type: "number",
            defaultValue: 0
        }
    }
});
