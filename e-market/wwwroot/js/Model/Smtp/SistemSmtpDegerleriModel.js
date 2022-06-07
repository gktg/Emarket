var SistemSmtpDegerleriModel = kendo.data.Model.define({
    fields: {
        TabloID: {
            type: "number",
            defaultValue: 0,
            validation: {
                required: true
            }
        },
        SMTPAdi: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        SmtpBaglantiDizisi: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        SmtpBaglantiKullaniciAdi: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        SmtpBaglantiSifre: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        SMTPPort: {
            type: "number",
            defaultValue: 0,
            validation: {
                required: true
            }
        },
        IlgiliKurumID: {
            type: "number",
            defaultValue: 0,
        },
        SistemAyarlariMi: {
            type: "bool",
            defaultValue: false,
        }
    }
});
