class CompanyMessageModulePermissionsService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault(""));
    }
}
var companyMessageModulePermissionsService = new CompanyMessageModulePermissionsService();
