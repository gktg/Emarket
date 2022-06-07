class KurumOrganizasyonBirimModel extends kendo.data.Model {
    constructor(value) {
        super(value);
        this.fields = {
            Tanim: {
                type: "string",
                defaultValue: "",
                validation: {
                    required: true
                }
            },
            TipId: {
                type: "number",
                defaultValue: 8
            },
            TabloId: {
                type: "number",
                defaultValue: 0
            },
            KurumId: {
                type: "number",
                defaultValue: 1
            }
        };
    }
}
