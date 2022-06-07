var CografyaListViewModel = kendo.data.Model.define({
    //constructor(value? any) {
    //    super(value);
    //}
    fields: {
        CografyaTanim: {
            type: "string",
            defaultValue: "",
            validation: {
                required: true
            }
        },
        CografyaAciklama: {
            type: "string",
            defaultValue: "",
        },
        SehirlerIDList: {
            type: "object",
            defaultValue: [],
            validation: {
                required: true
            }
        },
        CografyaKutupanesiId: {
            type: "number",
            defaultValue: 0
        },
        UlkeId: {
            type: "number",
            defaultValue: 0,
            validation: {
                required: true
            }
        }
    }
});
