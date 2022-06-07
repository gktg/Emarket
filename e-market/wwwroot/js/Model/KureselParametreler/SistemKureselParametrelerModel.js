var SistemKureselParametrelerModel = kendo.data.Model.define({
    fields: {
        SistemMi: {
            type: "number",
            defaultValue: 0,
        },
        KurumID: {
            type: "number",
            defaultValue: 0
        },
        KureselParams: {
            type: "object",
            defaultValue: [{ Adi: "", Deger: 0, MetinDegeri: "", ID: 0 }]
        }
    }
});
