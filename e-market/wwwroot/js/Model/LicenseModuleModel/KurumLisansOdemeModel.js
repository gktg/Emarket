var KurumLisansOdemeModel = kendo.data.Model.define({
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
        },
        KisiKimlikNo: {
            type: "string",
            defaultValue: ""
        },
        FaturaAdresi: {
            type: "object",
            defaultValue: {}
        },
        IyzicoUrunPlaniToken: {
            type: "string",
            defaultValue: ""
        },
        CepTelefonNumarasi: {
            type: "string",
            defaultValue: ""
        }
        //TeslimatAdresi: {
        //    type: "object",
        //    defaultValue: {}
        //}
    }
});
//var LisansOdemeAdresModel = kendo.data.Model.define({
//    fields: {
//        Address: {
//            type: "string",
//            defaultValue: ""
//        },
//        ContactName: {
//            type: "string",
//            defaultValue: ""
//        },
//        City: {
//            type: "string",
//            defaultValue: ""
//        },
//        Country: {
//            type: "string",
//            defaultValue: ""
//        },
//        ZipCode: {
//            type: "string",
//            defaultValue: ""
//        }
//    }
//})
