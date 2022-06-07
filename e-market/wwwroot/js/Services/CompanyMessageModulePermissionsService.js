/// <reference path="../model/companymessagemodulepermissionsmodel.ts" />
class CompanyMessageModulePermissionsService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new CompanyMessageModulePermissionsModel({
            TabloID: 0,
            KurumID: 0,
            KisiID: 0,
            IzinVerilmeyenBirimIDleri: []
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault(""));
    }
    getPozisyonData() {
        this.pozisyonlar = [];
        var conf = AjaxConfiguration.postDefault();
        conf.type = AjaxType.GET;
        conf.url = "/panel/GetKurumBirimList/2";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    companyMessageModulePermissionsService.pozisyonlar.push({ tanim: item.tanim, tabloID: item.tabloId });
                });
            }
        };
        this._repository.getData(null, conf);
    }
    Save() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/panel/IzinVerilmeyenPozisyonKaydi";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                companyMessageModulePermissionsService.ListGetir();
                companyMessageModulePermissionsService.data.set("IzinVerilmeyenBirimIDleri", []);
            }
            else {
                console.log(result);
            }
        };
        conf.error = function (e) {
            errorHandler(e);
            console.log(e);
        };
        this._repository.getData(JSON.stringify(companyMessageModulePermissionsService.data.toJSON()), conf);
    }
    Initialize() {
        this.getPozisyonData();
        this.drawDataTable();
        this.ListGetir();
        kendo.bind(".model-bind", companyMessageModulePermissionsService);
    }
    drawDataTable() {
        $("#recordstable").DataTable().destroy();
        companyMessageModulePermissionsService.DataTable = $('#recordstable').DataTable({
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
            "dom": 'rti',
        });
    }
    ListGetir() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/panel/messagePermissionListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var tableData = [{
                        izinVerilmeyenBirimTanim: "",
                        izinVerilmeyenBirimID: 0,
                        tabloID: 0,
                    }];
                tableData = result.value;
                companyMessageModulePermissionsService.DataTable.clear().draw();
                for (var item of tableData) {
                    companyMessageModulePermissionsService.DataTable.row.add([
                        item.izinVerilmeyenBirimTanim,
                        " <button type='button' class = 'btn btn-sm' onclick = 'deleteRecord(\"" + item.tabloID + "\")'> <img src='/img/trash.svg'/> </button>"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    Delete(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/panel/DeleteRecord/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    alertim.toast(siteLang.Sil, "success");
                    companyMessageModulePermissionsService.drawDataTable();
                    companyMessageModulePermissionsService.ListGetir();
                }
                else {
                    alertim.toast(siteLang.Hata, "warning");
                }
            };
            companyMessageModulePermissionsService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
}
var companyMessageModulePermissionsService = new CompanyMessageModulePermissionsService();
function deleteRecord(id) {
    companyMessageModulePermissionsService.Delete(id);
}
