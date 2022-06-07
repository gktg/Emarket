/// <reference path="../../model/licensemodulemodel/moduldetaykayitmodel.ts" />
class ModuleService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new ModulDetayKayitModel({
            TabloID: 0,
            Name: "",
            SayfaId: []
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/LicenseModule"));
    }
    sayfaGetir() {
        var sayfaList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/panel/YetkiIcinSayfaGetir";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    sayfaList.push({ id: item.tabloID, text: item.sayfaTanimi });
                }
                $("#Sayfalar").html("");
                $("#Sayfalar").select2({ placeholder: "Seçiniz", data: sayfaList });
            }
        };
        conf.error = function (result) {
        };
        this._repository.getData(null, conf);
    }
    Kaydet() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Module/AddOrUpdate";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/module/list";
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(moduleService.data.toJSON()), conf);
    }
    ModulVeriGetir(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Module/GetModulDetay/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                moduleService.data.set("TabloID", result.value.tabloID);
                moduleService.data.set("Name", result.value.name);
                moduleService.data.set("SayfaId", result.value.sayfaId);
                $("#Sayfalar").val(result.value.sayfaId).trigger("change");
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    drawDataTable() {
        $("#moduleTable").DataTable().destroy();
        moduleService.ModulDataTable = $('#moduleTable').DataTable({
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
    }
    ModuleList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Module/ModulListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var tableData = [{
                        tabloID: 0,
                        name: "",
                        sayfaId: []
                    }];
                tableData = result.value;
                moduleService.ModulDataTable.clear().draw();
                for (var item of tableData) {
                    moduleService.ModulDataTable.row.add([
                        item.name,
                        item.sayfaId.length,
                        "<button type='button' class= 'btn  btn-sm mx-1' onclick = 'toModuleUpdate(\"" + item.tabloID + "\")' >  <img src='/img/edit.svg'/>  </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteModule(\"" + item.tabloID + "\")'> <img src='/img/trash.svg'/> </button>"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    toUpdatePage(id) {
        window.location.href = "/Module/Update/" + id;
    }
    DeleteModule(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/Module/Remove/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    moduleService.drawDataTable();
                    moduleService.ModuleList();
                }
            };
            moduleService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    SaveInitialize() {
        moduleService.sayfaGetir();
        kendo.bind($(".model-bind"), moduleService);
    }
    UpdateInitialize() {
        moduleService.sayfaGetir();
        var id = GetURLParameter();
        if (id) {
            moduleService.ModulVeriGetir(id);
        }
        kendo.bind($(".model-bind"), moduleService);
    }
    ListInitialize() {
        moduleService.drawDataTable();
        moduleService.ModuleList();
        kendo.bind($(".model-bind"), moduleService);
    }
}
var moduleService = new ModuleService();
var errorHandler;
var GetURLParameter;
var alertim;
function deleteModule(id) {
    moduleService.DeleteModule(id);
}
function toModuleUpdate(id) {
    moduleService.toUpdatePage(id);
}
