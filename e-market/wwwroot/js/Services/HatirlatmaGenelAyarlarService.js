class HatirlatmaGenelAyarlarService extends kendo.data.ObservableObject {
    constructor(val) {
        super(val);
        this.data = new HatirlatmaGenelAyarModel({
            HatirlatmaBaslamaZamanTipi: "Yok",
            HatirlatmaBaslamaZamanTipiDegeri: 0,
            HatirlatmaMaksimumSayisi: 0,
            HatirlatmaEpostaYollayacakMi: false,
            HatirlatmaSmsyollayacakMi: false,
            HatirlatmaAralikSikligiDakikaBazinda: 0
        });
        super.init(val);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/notificationsetting"));
    }
    save() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/NotificationSetting/Add";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            alertim.toast(siteLang.Kaydet, "success", function () {
                window.location.href = "/notificationsetting/list";
            });
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        if (hatirlatmaGenelAyarlarServiceModel.data.get("TabloId")) {
            conf.url = "/NotificationSetting/Update";
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                alertim.toast(siteLang.Guncelle, "success", function () {
                    window.location.href = "/notificationsetting/list";
                });
            };
        }
        this._repository.postData(JSON.stringify(hatirlatmaGenelAyarlarServiceModel.data.toJSON()), conf);
    }
    setData(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/NotificationSetting/get/" + id;
        conf.type = AjaxType.GET;
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaBaslamaZamanTipi", result.value.hatirlatmaBaslamaZamanTipi);
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaBaslamaZamanTipiDegeri", result.value.hatirlatmaBaslamaZamanTipiDegeri);
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaMaksimumSayisi", result.value.hatirlatmaMaksimumSayisi);
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaEpostaYollasinMi", result.value.hatirlatmaEpostaYollasinMi);
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaSmsyollasinMi", result.value.hatirlatmaSmsyollasinMi);
                hatirlatmaGenelAyarlarServiceModel.data.set("TabloId", result.value.tabloID);
                hatirlatmaGenelAyarlarServiceModel.data.set("HatirlatmaAralikSikligiDakikaBazinda", result.value.hatirlatmaAralikSikligiDakikaBazinda);
            }
        };
        this._repository.getData(null, conf);
    }
    delete(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/NotificationSetting/Remove/" + id;
            conf.type = AjaxType.GET;
            conf.async = false;
            conf.success = function () {
                alertim.toast(siteLang.Sil, "success");
            };
            hatirlatmaGenelAyarlarServiceModel._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    writeDropDown() {
        this.zamanTipi = [{ tanim: "Yok", tabloID: 0 }, { tanim: "GUN", tabloID: 0 }, { tanim: "SAAT", tabloID: 0 }, { tanim: "DAKIKA", tabloID: 0 }];
    }
    writeDataTableList() {
        if ($("#dataTable").length === 0)
            return;
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/NotificationSetting/datalist";
        conf.type = AjaxType.GET;
        conf.async = false;
        conf.success = function (result) {
            $('#dataTable').DataTable({
                "paging": true,
                "responsive": true,
                "language": {
                    "lengthMenu": siteLang.lengthComputable,
                    "info": siteLang.info,
                    "searchPlaceholder": siteLang.searchPlaceholder,
                    "zeroRecords": siteLang.zeroRecords,
                    "paginate": {
                        "infoEmpty": siteLang.infoEmpty,
                        "first": siteLang.First,
                        "last": siteLang.Last,
                        "next": siteLang.Next,
                        "previous": siteLang.Previous,
                    }
                },
                //"language": {
                //    "url": siteLang.DataTableLang
                //},
                data: result.value,
                columns: [
                    { data: 'hatirlatmaBaslamaZamanTipi' },
                    { data: 'hatirlatmaBaslamaZamanTipiDegeri' },
                    { data: 'hatirlatmaMaksimumSayisi' },
                    {
                        "data": null,
                        render: function (data, type, row) {
                            return '<button id="updateHat" class="btn " data-id="' + data.tabloID + '"> <img src="/img/edit.svg"> </button>' + '<button id="deleteHat" class="btn" data-id="' + data.tabloID + '"><img src="/img/trash.svg"></button>';
                        },
                        message: 'Are You Sure!',
                        "targets": -1
                    }
                ],
                "dom": 'Bfrtip',
                "buttons": [
                    {
                        "extend": 'excel',
                        "text": siteLang.ExceleAktar,
                        "className": "btn btn-success",
                        "exportOptions": {
                            "columns": ":not(:last-child)"
                        }
                    }
                ]
            });
            $('body').on('click', '#deleteHat', function (e) {
                var id = $(this).attr("data-id");
                hatirlatmaGenelAyarlarServiceModel.delete(id);
                $(this).parents("tr").remove();
            });
            $('body').on('click', '#updateHat', function (e) {
                var id = $(this).attr("data-id");
                window.location.href = "/notificationsetting/update/" + id;
            });
        };
        this._repository.getData(null, conf);
    }
    GetURLParameter() {
        var sPageURL = window.location.href;
        var indexOfLastSlash = sPageURL.lastIndexOf("/");
        if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
            return parseInt(sPageURL.substring(indexOfLastSlash + 1));
        else
            return 0;
    }
    initalize() {
        this.writeDropDown();
        var id = this.GetURLParameter();
        if (id) {
            this.setData(id);
        }
        this.writeDataTableList();
        kendo.bind($(".service-body"), hatirlatmaGenelAyarlarServiceModel);
    }
    gotoadd() { window.location.href = "/NotificationSetting/add"; }
}
var errorHandler;
var alertim;
var hatirlatmaGenelAyarlarServiceModel;
$(document).ready(function () {
    hatirlatmaGenelAyarlarServiceModel = new HatirlatmaGenelAyarlarService({});
    hatirlatmaGenelAyarlarServiceModel.initalize();
});
