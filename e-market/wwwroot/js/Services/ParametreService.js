/// <reference path="../model/ParametreRequestModel.ts" />
class ParametreService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new ParametreRequest({
            ModelName: "",
            TabloID: 0,
            KurumId: 0,
            UstId: 0,
            Tanim: "",
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/panel/param"));
    }
    Save(data) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/panel/param/add";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success");
            }
        };
        this._repository.postData(JSON.stringify(data.toJSON()), conf);
    }
}
