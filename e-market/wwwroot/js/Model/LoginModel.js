var LoginModel = kendo.data.Model.define({
    fields: {
        username: {
            type: "string",
            validation: { required: true, minLength: 5, maxLength: 20 },
            defaultValue: ""
        },
        password: {
            type: "string",
            validation: { required: true },
            defaultValue: "",
        }
    }
});
//class LoginModel2 extends kendo.data.Model {
//    constructor(value?: any) {
//        super(value)
//    }
//    fields = {
//        username: {
//            type: "string",
//            validation: { required: true, minLength: 5, maxLength: 20 },
//            defaultValue: ""
//        },
//        password: {
//            type: "string",
//            validation: { required: true },
//            defaultValue: "",
//        }
//    }
//}
