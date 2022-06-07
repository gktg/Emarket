/// <reference path="../../model/licensemodulemodel/lisansdetaykayitmodel.ts" />
class LicenseService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new LisansDetayKayitModel({
            TabloID: 0,
            Name: "",
            ModulId: [],
            LisansZamanlariList: []
        });
        this.lisansZamanList = [];
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/License"));
    }
    modulGetir() {
        var modulList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Module/ModulListForView";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    modulList.push({ id: item.tabloID, text: item.name });
                }
                $("#Moduller").html("");
                $("#Moduller").select2({ placeholder: "Seçiniz", data: modulList });
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    Kaydet() {
        licenseService.TekrariModeleBas();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/License/AddOrUpdate";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/license/list";
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(licenseService.data.toJSON()), conf);
    }
    LisansVeriGetir(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/License/GetLicenseDetay/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                licenseService.data.set("TabloID", result.value.tabloID);
                licenseService.data.set("Name", result.value.name);
                licenseService.data.set("ModulId", result.value.modulId);
                $("#Moduller").val(result.value.modulId).trigger("change");
                licenseService.TekrariSayfayaBas(result.value.lisansZamanlariList);
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    drawDataTable() {
        $("#licenseTable").DataTable().destroy();
        licenseService.LisansDataTable = $('#licenseTable').DataTable({
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
    LicenseList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/License/LisansListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var tableData = [{
                        tabloID: 0,
                        name: "",
                        modulId: [],
                        lisansZamanlariList: [],
                    }];
                tableData = result.value;
                licenseService.LisansDataTable.clear().draw();
                for (var item of tableData) {
                    licenseService.LisansDataTable.row.add([
                        item.name,
                        item.modulId.length,
                        item.lisansZamanlariList.length,
                        "<button type='button' class= 'btn btn-sm mx-1' onclick = 'toLicenseUpdate(\"" + item.tabloID + "\")' > <img src='/img/edit.svg'/> </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteLicense(\"" + item.tabloID + "\")'>  <img src='/img/trash.svg'/>  </button>"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    ReadyMethods() {
        $(document).ready(function () {
            $(document).on("click", ".zamanAddButton", function () {
                $(document).find("[id^='zamanSelect_']").each(function (i, e) {
                    $(e).select2('destroy');
                });
                TekrarliAlanAddClick("zaman", $("[id^='zamanTekrar_']").last());
                $(".zamanRemoveButton").show();
                let $e = $(document).find("[id^='zamanSelect_']").last();
                $(document).find("[id^='zamanSelect_']").each(function (i, e) {
                    $(e).select2();
                });
                $e.attr("tabloId", 0);
            });
            $(document).on("click", ".zamanRemoveButton", function (e) {
                var btn = $(e.target);
                $(btn).closest("[id^='zamanTekrar_']").remove();
                if ($(".zamanTekrar").length == 1) {
                    $(".zamanRemoveButton").hide();
                }
            });
        });
    }
    TekrariModeleBas() {
        licenseService.lisansZamanList = [];
        $("[id^=zamanTekrar_]").each(function (i, e) {
            licenseService.lisansZamanList.push({
                TabloID: parseInt($(e).find("[id^='zamanSelect_']").attr('tabloId')),
                GecerliOlduguGun: parseInt($(e).find("[id^='zamanSelect_']").val()),
                LisansId: licenseService.data.get("TabloID"),
                LisansBedeli: $(e).find("[id^='paketBedeli_']").val(),
                LisansBedeliParaBirimiId: $(e).find("input[name^='paraBirimi_']:checked").val(),
                LisansPaketiKisiSayisi: $(e).find("[id^='LisansPaketiKisiSayisi_']").val() || 0,
                IyzicoUrunPlaniToken: $(e).find("[id^='IyzicoUrunPlaniToken_']").val(),
            });
        });
        licenseService.data.set("LisansZamanlariList", licenseService.lisansZamanList);
    }
    TekrariSayfayaBas(list) {
        if (list.length > 0) {
            for (var i = 0; i < list.length - 1; i++) {
                TekrarliAlanAddClick("zaman", $("[id^='zamanTekrar_']").last());
                $(".zamanRemoveButton").show();
            }
            $("[id^=zamanTekrar_]").each(function (i, e) {
                $(e).find("[id^='zamanSelect_']").val(list[i].gecerliOlduguGun);
                $(e).find("[id^='zamanSelect_']").attr("tabloId", list[i].tabloID);
                $(e).find("[id^='paketBedeli_']").val(list[i].lisansBedeli);
                $(e).find("[id^='LisansPaketiKisiSayisi_']").val(list[i].lisansPaketiKisiSayisi);
                $(e).find("[id^='IyzicoUrunPlaniToken_']").val(list[i].iyzicoUrunPlaniToken);
                $(e).find("input[name^='paraBirimi_'][value=" + list[i].lisansBedeliParaBirimiId + "]").prop("checked", true);
            });
        }
    }
    paraBirimTipleriGetir() {
        licenseService.paraBirimList = [];
        var data = {
            ModelName: "ParamParaBirimleri",
            UstId: 0,
            KurumId: 0,
            TabloID: 0,
            Tanim: "test",
            DilID: 1,
            EsDilID: 0
        };
        var list = [];
        $.ajax({
            data: data,
            url: "/panel/param/listparam",
            type: "POST",
            dataType: "json",
            async: false,
            success: function (x) {
                for (var item of x.valueOrDefault) {
                    list.push({
                        id: item.tabloID,
                        title: item.tanim,
                    });
                }
                licenseService.ParaBirimleriSayfayaBas(list);
            },
            error: function (e) {
                console.log(e);
            }
        });
        licenseService.paraBirimList = list;
    }
    ParaBirimleriSayfayaBas(list) {
        let html = "";
        for (var birim of list) {
            html += "<div class='d-inline '>\
                        <input type='radio' id='" + birim.title + "_' value='" + birim.id + "' name='paraBirimi_' checked=''>\
                        <label for='" + birim.title + "_'>" + birim.title + "</label>\
                    </div>";
        }
        $('.paraBirimleri').append(html);
    }
    toUpdatePage(id) {
        window.location.href = "/License/Update/" + id;
    }
    DeleteLicense(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/License/Remove/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    licenseService.drawDataTable();
                    licenseService.LicenseList();
                }
            };
            licenseService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    SaveInitialize() {
        licenseService.paraBirimTipleriGetir();
        licenseService.modulGetir();
        licenseService.ReadyMethods();
        kendo.bind($(".model-bind"), licenseService);
    }
    UpdateInitialize() {
        licenseService.paraBirimTipleriGetir();
        licenseService.ReadyMethods();
        licenseService.modulGetir();
        var id = GetURLParameter();
        if (id) {
            licenseService.LisansVeriGetir(id);
        }
        kendo.bind($(".model-bind"), licenseService);
    }
    ListInitialize() {
        licenseService.drawDataTable();
        licenseService.LicenseList();
        kendo.bind($(".model-bind"), licenseService);
    }
}
var licenseService = new LicenseService();
var TekrarliAlanAddClick;
var errorHandler;
var GetURLParameter;
var alertim;
function deleteLicense(id) {
    licenseService.DeleteLicense(id);
}
function toLicenseUpdate(id) {
    licenseService.toUpdatePage(id);
}
