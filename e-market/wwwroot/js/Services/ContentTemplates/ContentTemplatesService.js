/// <reference path="../../model/icerikkurumsalsablontanimlarimodel.ts" />
/// <reference path="../../model/dropdownmodel.ts" />
class ContentTemplatesService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new IcerikKurumsalSablonTanimlariModel({
            TabloID: 0,
            IcerikTanim: "",
            SablonIcerikTipiId: 0,
            IcerikBaslik: "",
            IcerikTamMetin: "",
            IcerikGorselMedyaId: 0,
            IcerikRenkKodu: "",
            SistemMi: false,
            GonderimTipi: "MAIL",
        });
        this.GonderimTipiModel = {
            mail: "MAIL",
            sms: "SMS"
        };
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/Templates"));
    }
    IcerikSablonTipleriGetir() {
        this.sablonTipleriList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/templates/ContentTypeList";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    if (item.paramTanim == "OzelGun")
                        templateService.sablonTipleriList.push({ tanim: "Özel Gün Bildirimi", tabloID: item.tabloID });
                    if (item.paramTanim == "Hatirlatma")
                        templateService.sablonTipleriList.push({ tanim: "Hatırlatma", tabloID: item.tabloID });
                });
            }
        };
        this._repository.getData(null, conf);
    }
    savetemplate() {
        if (templateService.data.get("GonderimTipi") == "MAIL") {
            templateService.data.set("IcerikTamMetin", ReplaceTagValuesforSave(getDataFromCkEditor(customeditor)));
            if (templateService.data.get("GonderimTipi") == "SMS") {
                templateService.data.set("IcerikTamMetin", ReplaceSMSValuesForSave(templateService.data.get("IcerikTamMetin")));
            }
            var conf = AjaxConfiguration.postDefault();
            conf.url = "/Templates/SaveTemplate";
            conf.async = false;
            conf.type = AjaxType.POST;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    console.log(result.value);
                    if (templateService.data.get("TabloID"))
                        alertim.toast(siteLang.Guncelle, "success", function () {
                            window.location.href = "/templates/list";
                        });
                    else
                        alertim.toast(siteLang.Kaydet, "success", function () {
                            window.location.href = "/templates/list";
                        });
                }
            };
            conf.error = function (e) {
                errorHandler(e);
            };
            if (templateService.data.get("TabloID")) {
                conf.url = "/Templates/UpdateTemplate";
                this._repository.postData(JSON.stringify(templateService.data.toJSON()), conf);
            }
            else {
                this._repository.postData(JSON.stringify(templateService.data.toJSON()), conf);
            }
        }
    }
    getTemplateData(id) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Templates/GetTemplate/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var obj = JSON.stringify(result.value);
                templateService.data.set("TabloID", result.value.tabloID);
                templateService.data.set("SablonIcerikTipiId", result.value.sablonIcerikTipiId);
                templateService.data.set("IcerikTanim", result.value.icerikTanim);
                templateService.data.set("IcerikBaslik", result.value.icerikBaslik);
                templateService.data.set("IcerikGorselMedyaId", result.value.icerikGorselMedyaId);
                templateService.data.set("IcerikRenkKodu", result.value.icerikRenkKodu);
                templateService.data.set("SistemMi", result.value.sistemMi);
                templateService.data.set("GonderimTipi", result.value.gonderimTipi);
                $('input[type=radio][name=SablonTipi]').change();
                if (result.value.gonderimTipi == "MAIL") {
                    setDataToCkEditor(customeditor, ReplaceTagValuesforView(result.value.icerikTamMetin));
                }
                if (result.value.gonderimTipi == "SMS") {
                    templateService.data.set("IcerikTamMetin", ReplaceSMSValuesForView(result.value.icerikTamMetin));
                    $('#mailRadio').prop("checked", false);
                    $('#smsRadio').prop("checked", true);
                    $('input[type=radio][name=SablonTipi]').change();
                }
            }
            ;
            conf.error = function (e) {
                console.log(e);
            };
        };
        this._repository.getData(null, conf);
    }
    InitializeForSave() {
        this.IcerikSablonTipleriGetir();
        kendo.bind($(".model-bind"), templateService);
    }
    InitializeForUpdate() {
        this.IcerikSablonTipleriGetir();
        var id = GetURLParameter();
        if (id) {
            templateService.getTemplateData(id);
        }
        kendo.bind($(".model-bind"), templateService);
    }
    InitializeForList() {
        this.IcerikSablonTipleriGetir();
        this.drawDataTable();
        this.TemplatesList();
        kendo.bind($(".model-bind"), templateService);
    }
    drawDataTable() {
        $("#SablonListesiTable").DataTable().destroy();
        templateService.templatesDataTable = $('#SablonListesiTable').DataTable({
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
    TemplatesList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Templates/ListForKurum";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var data2 = [{
                        tabloID: 0,
                        icerikTanim: "",
                        sablonIcerikTipiId: 0,
                        icerikBaslik: "",
                        icerikTamMetin: "",
                        icerikGorselMedyaId: 0,
                        icerikRenkKodu: "",
                        sistemMi: false,
                        gonderimTipi: "",
                        kayitTarihi: "",
                    }];
                data2 = result.value;
                templateService.templatesDataTable.clear().draw();
                for (var item of data2) {
                    var iceriktipi = templateService.sabloniceriktipAdi(templateService.sablonTipleriList, item.sablonIcerikTipiId);
                    if (iceriktipi.length) {
                        templateService.templatesDataTable.row.add([
                            item.icerikBaslik,
                            item.icerikTanim,
                            iceriktipi[0].tanim,
                            item.gonderimTipi,
                            CsharpDateToStringDateyyyymmddForProfile(item.kayitTarihi),
                            "<button type='button' class= 'btn  btn-sm mx-1' onclick = 'toTemplateUpdate(\"" + item.tabloID + "\")' > <img src='/img/edit.svg'/> </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteTemplate(\"" + item.tabloID + "\")'>  <img src='/img/trash.svg'/>  </button>"
                        ]).draw(true);
                    }
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    toCreatePage() {
        window.location.href = "/Templates/Create";
    }
    toUpdatePage(id) {
        window.location.href = "/Templates/Update/" + id;
    }
    DeleteTemplate(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/Templates/SetDeleted/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    templateService.drawDataTable();
                    templateService.TemplatesList();
                }
            };
            templateService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    sabloniceriktipAdi(array, id) {
        var result = $.grep(array, function (v) {
            return v.tabloID === parseInt(id);
        });
        return result;
    }
}
var templateService = new ContentTemplatesService();
var customeditor;
var insertAtCaret;
var putElemAtEditor;
var GetURLParameter;
var CsharpDateToStringDateyyyymmddForProfile;
function getDataFromCkEditor(editor) {
    return editor.getData();
}
function setDataToCkEditor(editor, data) {
    editor.setData(data.toString());
}
function InsertElemByType(tag, link) {
    if (templateService.data.get("GonderimTipi") == "MAIL") {
        if (link == false)
            putElemAtEditor(customeditor, tag);
        else
            putElemAtEditor(customeditor, tag, true);
    }
    if (templateService.data.get("GonderimTipi") == "SMS") {
        insertAtCaret("SmsSablonMetin", tag);
        $('#SmsSablonMetin').change();
    }
}
var errorHandler;
var alertim;
function ReplaceTagValuesforSave(text) {
    text = text.replace(/\&lt;Kişi Adı&gt;/g, "@Model.Name");
    text = text.replace(/\&lt;Etkinlik Zamanı&gt;/g, "@Model.Tarih");
    text = text.replace(/\&lt;Mesaj içeriği&gt;/g, "@Model.Mesaj");
    text = text.replace(/\<Mesaj içeriği>/g, "@Model.Mesaj");
    return text;
}
function ReplaceTagValuesforView(text) {
    text = text.replace(/\@Model.Name/g, "&lt;Kişi Adı&gt;");
    text = text.replace(/\@Model.Tarih/g, "&lt;Etkinlik Zamanı&gt;");
    text = text.replace(/\@Model.Mesaj/g, "&lt;Mesaj içeriği&gt;");
    text = text.replace(/\@Model.Mesaj/g, "<Mesaj içeriği>");
    return text;
}
function ReplaceSMSValuesForSave(text) {
    text = text.replace(/\<Kişi Adı>/g, "@Model.Name");
    text = text.replace(/\<Etkinlik Zamanı>/g, "@Model.Tarih");
    text = text.replace(/\<Mesaj içeriği>/g, "@Model.Mesaj");
    return text;
}
function ReplaceSMSValuesForView(text) {
    text = text.replace(/\@Model.Name/g, "<Kişi Adı>");
    text = text.replace(/\@Model.Tarih/g, "<Etkinlik Zamanı>");
    text = text.replace(/\@Model.Mesaj/g, "<Mesaj içeriği>");
    return text;
}
function deleteTemplate(id) {
    templateService.DeleteTemplate(id);
}
function toTemplateUpdate(id) {
    templateService.toUpdatePage(id);
}
