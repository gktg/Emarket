var LisansDetayKayitModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        Name: {
            type: "string",
            defaultValue: ""
        },
        LisansDetayId: {
            type: "number",
            defaultValue: 0
        },
        ModulId: {
            type: "object",
            defaultValue: []
        },
        GecerliOlduguGun: {
            type: "number",
            defaultValue: 0
        },
        LisansZamanlariList: {
            type: "object",
            defaultValue: 0
        }
    }
});
var LisansZamanModel = kendo.data.Model.define({
    fields: {
        GecerliOlduguGun: {
            type: "number",
            defaultValue: 0
        },
        LisansId: {
            type: "number",
            defaultValue: 0
        },
        TabloID: {
            type: "number",
            defaultValue: 0
        },
        LisansBedeli: {
            type: "string",
            defaultValue: ""
        },
        LisansBedeliParaBirimiId: {
            type: "number",
            defaultValue: 0
        },
        IyzicoUrunPlaniToken: {
            type: "string",
            defaultValue: ""
        },
        LisansPaketiKisiSayisi: {
            type: "number",
            defaultValue: 0
        }
    }
});
