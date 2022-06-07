class TestMerkeziService extends kendo.data.ObservableObject {
    constructor(val) {
        super(val);
        this.ozelGunData = new HatirlatmaKayitlarModel({
            HatirlatmaZamani: "",
            HatirlatmaMetni: "",
            HatirlatmaEpostaYollayacakMi: false,
            HatirlatmaSmsyollayacakMi: false,
            HatirlatmaTipi: "OzelGun"
        });
        super.init(val);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/TestMerkezi"));
    }
    ozelGunSave() {
        var validator = $(".ozel-gun-validate").kendoValidator().data("kendoValidator"); // < === this is where the data to be checked is determined !!
        //console.log(validator);
        if (validator.validate()) { // < === this is where it is checked !!
            var zaman = testMerkeziService.ozelGunData.get("HatirlatmaZamani");
            if (zaman == "") {
                alertim.toast(siteLang.Hata, "warning");
                return;
            }
            var conf = AjaxConfiguration.postDefault();
            conf.url = "/TestMerkezi/HatirlatmaAyarlariTetiklemeTesti";
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/TestCenter/TestView";
                });
            };
            conf.error = function (e) {
                errorHandler(e);
            };
            this._repository.postData(JSON.stringify(testMerkeziService.ozelGunData.toJSON()), conf);
        }
        else {
            alertim.toast(siteLang.Hata, "warning");
        }
    }
    save() {
        var validator = $(".service-body").kendoValidator().data("kendoValidator");
        if (validator.validate()) {
            var zaman = testMerkeziService.data.get("HatirlatmaZamani");
            if (zaman == "") {
                alertim.toast(siteLang.Hata, "warning");
                return;
            }
            var conf = AjaxConfiguration.postDefault();
            conf.url = "/TestMerkezi/HatirlatmaAyarlariTetiklemeTesti";
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/TestCenter/TestView";
                });
            };
            conf.error = function (e) {
                errorHandler(e);
            };
            this._repository.postData(JSON.stringify(testMerkeziService.data.toJSON()), conf);
        }
        else {
            alertim.toast(siteLang.Hata, "warning");
        }
    }
    //writeDropDowmList() {
    //    this.aksiyonKategori = [];
    //    var conf = AjaxConfiguration.postDefault();
    //    var data = {
    //        ModelName: "ParamAksiyonTipleri",
    //        UstId: 0,
    //        KurumId: 0,
    //        TabloID: 0,
    //        Tanim: "test"
    //    };
    //    conf.url = "/TestMerkezi/param/list";
    //    conf.async = false;
    //    conf.success = function (result) {
    //        if (result.value) {
    //            result.value.forEach(function (item) {
    //                testMerkeziService.aksiyonKategori.push(
    //                    { tanim: item.tanim, tabloID: item.tabloID });
    //            });
    //        }
    //    }
    //    this._repository.postData(data, conf);
    //}
    GetURLParameter() {
        var sPageURL = window.location.href;
        var indexOfLastSlash = sPageURL.lastIndexOf("/");
        if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
            return parseInt(sPageURL.substring(indexOfLastSlash + 1));
        else
            return 0;
    }
    initalize() {
        /*   this.writeDropDowmList();*/
        var id = this.GetURLParameter();
        kendo.bind($(".service-body"), testMerkeziService);
    }
    gotoadd() { window.location.href = "/TestCenter/TestView"; }
}
var testMerkeziService;
$(document).ready(function () {
    testMerkeziService = new TestMerkeziService({});
    testMerkeziService.data = new HatirlatmaKayitlarModel({
        HatirlatmaZamani: "",
        HatirlatmaMetni: "",
        HatirlatmaEpostaYollasinMi: false,
        HatirlatmaSmsyollasinMi: false
    });
    testMerkeziService.initalize();
});
var errorHandler;
var alertim;
