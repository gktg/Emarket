class AksiyonYetkilendirmeService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new YetkilendirmeKayitModel({
            OrganizasyonBirimiID: 0,
            IlgiliKurumOrganizasyonBirimIdList: [],
            ErisimYetkisiVerilenSayfaIdList: [],
            ErisimYetkisiVerilenAksiyonId: 0
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/YetkiMerkezi"));
    }
    GetDropdownDatas() {
        this.aksiyonKategori = [];
        this.pozisyonlar = [];
        this.roller = [];
        //aksiyon tipleri getirme
        var conf = AjaxConfiguration.postDefault();
        var data2 = {
            ModelName: "ParamAksiyonTipleri",
            UstId: 0,
            KurumId: 0,
            TabloID: 0,
            Tanim: "test",
            DilID: 1
        };
        conf.url = "/panel/param/list";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                var selectData = [{ id: 0, text: "Seçiniz" }];
                result.value.forEach(function (item) {
                    aksiyonYetkilendirmeService.aksiyonKategori.push({ tanim: item.tanim, tabloID: item.tabloID });
                    selectData.push({ id: item.tabloID, text: item.tanim });
                    $("#aksiyonKategori").select2({ data: selectData });
                });
            }
        };
        this._repository.postData(data2, conf);
        //pozisyon getirme
        conf.url = "/panel/GetKurumBirimList/2";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                var selectData = [];
                result.value.forEach(function (item) {
                    aksiyonYetkilendirmeService.pozisyonlar.push({ tanim: item.tanim, tabloID: item.tabloId });
                    selectData.push({ id: item.tabloId, text: item.tanim });
                });
                $("#aksiyonPozisyonlar").select2({ data: selectData });
            }
        };
        this._repository.getData(null, conf);
        //rol getirme
        conf.url = "/panel/GetKurumBirimList/3";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                var selectData = [];
                result.value.forEach(function (item) {
                    aksiyonYetkilendirmeService.roller.push({ tanim: item.tanim, tabloID: item.tabloId });
                    selectData.push({ id: item.tabloId, text: item.tanim });
                });
                $("#aksiyonRoller").select2({ data: selectData });
            }
        };
        this._repository.getData(null, conf);
    }
    GetSelectItems() {
        aksiyonYetkilendirmeService.pozisyonlar = [];
        aksiyonYetkilendirmeService.roller = [];
        var pozisyonlarSelected = $('#aksiyonPozisyonlar').select2('data');
        var rollerSelected = $('#aksiyonRoller').select2('data');
        var aksiyonSelected = parseInt($('#aksiyonKategori').select2().find(":selected")[0].value);
        var organizasyonIdleri = [];
        for (var i = 0; i < pozisyonlarSelected.length; i++) {
            var Id = parseInt(pozisyonlarSelected[i].id);
            organizasyonIdleri.push(Id);
        }
        for (var i = 0; i < rollerSelected.length; i++) {
            var Id = parseInt(rollerSelected[i].id);
            organizasyonIdleri.push(Id);
        }
        aksiyonYetkilendirmeService.data.set("IlgiliKurumOrganizasyonBirimIdList", organizasyonIdleri);
        aksiyonYetkilendirmeService.data.set("ErisimYetkisiVerilenAksiyonId", aksiyonSelected);
    }
    Save() {
    }
    initializeForSave() {
        aksiyonYetkilendirmeService.GetDropdownDatas();
        kendo.bind($(".model-bind"), aksiyonYetkilendirmeService);
    }
    initializeForList() {
        kendo.bind($(".model-bind"), aksiyonYetkilendirmeService);
    }
    aksiyonYetkiKaydet() {
        aksiyonYetkilendirmeService.GetSelectItems();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/YetkiMerkezi/AksiyonYetkilendirmeKaydet";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/Action/AuthorizationList";
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(aksiyonYetkilendirmeService.data.toJSON()), conf);
    }
    delete(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/YetkiMerkezi/ErisimYetkiTanimiSil/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                }
            };
            aksiyonYetkilendirmeService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    toAuthAddPage() {
        window.location.href = "/AuthCenter#AksiyonYetkilendirmeTabContent";
    }
}
;
var aksiyonYetkilendirmeService = new AksiyonYetkilendirmeService();
function deleteAuth(id) {
    aksiyonYetkilendirmeService.delete(id);
}
var errorHandler;
var alertim;
