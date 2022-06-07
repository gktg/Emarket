class LoginService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/panel"));
    }
    static initalize() {
        kendo.bind($(".form"), new LoginService());
    }
}
$(document).ready(function () {
    LoginService.initalize();
});
