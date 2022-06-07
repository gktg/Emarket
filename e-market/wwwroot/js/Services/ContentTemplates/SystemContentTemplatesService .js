/// <reference path="../../model/icerikkurumsalsablontanimlarimodel.ts" />
/// <reference path="../../model/dropdownmodel.ts" />
class SystemContentTemplatesService extends kendo.data.ObservableObject {
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
                    if (item.paramTanim != "OzelGun")
                        SystemTemplateService.sablonTipleriList.push({ tanim: item.paramTanim, tabloID: item.tabloID });
                });
            }
        };
        this._repository.getData(null, conf);
    }
    savetemplate() {
        if (SystemTemplateService.data.get("GonderimTipi") == "MAIL") {
            SystemTemplateService.data.set("IcerikTamMetin", SysReplaceTagValuesforSave(SysgetDataFromCkEditor(customeditor)));
        }
        if (SystemTemplateService.data.get("GonderimTipi") == "SMS") {
            SystemTemplateService.data.set("IcerikTamMetin", SysReplaceSMSValuesForSave(SystemTemplateService.data.get("IcerikTamMetin")));
        }
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Templates/SaveTemplateForSystem";
        conf.async = false;
        conf.type = AjaxType.POST;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                if (SystemTemplateService.data.get("TabloID"))
                    alertim.toast(siteLang.Guncelle, "success", function () {
                        window.location.href = "/templates/listForSystem";
                    });
                else
                    alertim.toast(siteLang.Kaydet, "success", function () {
                        window.location.href = "/templates/listForSystem";
                    });
            }
        };
        conf.error = function (e) {
            console.log(e);
            errorHandler(e);
        };
        if (SystemTemplateService.data.get("TabloID")) {
            conf.url = "/Templates/UpdateTemplateForSystem";
            this._repository.postData(JSON.stringify(SystemTemplateService.data.toJSON()), conf);
        }
        else {
            this._repository.postData(JSON.stringify(SystemTemplateService.data.toJSON()), conf);
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
                SystemTemplateService.data.set("TabloID", result.value.tabloID);
                SystemTemplateService.data.set("SablonIcerikTipiId", result.value.sablonIcerikTipiId);
                SystemTemplateService.data.set("IcerikTanim", result.value.icerikTanim);
                SystemTemplateService.data.set("IcerikBaslik", result.value.icerikBaslik);
                SystemTemplateService.data.set("IcerikGorselMedyaId", result.value.icerikGorselMedyaId);
                SystemTemplateService.data.set("IcerikRenkKodu", result.value.icerikRenkKodu);
                SystemTemplateService.data.set("SistemMi", result.value.sistemMi);
                SystemTemplateService.data.set("GonderimTipi", result.value.gonderimTipi);
                $('input[type=radio][name=SablonTipi]').change();
                if (result.value.gonderimTipi == "MAIL") {
                    SysSetDataToCkEditor(customeditor, SysReplaceTagValuesforView(result.value.icerikTamMetin));
                }
                if (result.value.gonderimTipi == "SMS") {
                    SystemTemplateService.data.set("IcerikTamMetin", SysReplaceSMSValuesForView(result.value.icerikTamMetin));
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
        kendo.bind($(".model-bind"), SystemTemplateService);
    }
    InitializeForUpdate() {
        this.IcerikSablonTipleriGetir();
        var id = GetURLParameter(); //update
        if (id) {
            SystemTemplateService.getTemplateData(id);
        }
        kendo.bind($(".model-bind"), SystemTemplateService);
    }
    InitializeForList() {
        this.IcerikSablonTipleriGetir();
        this.drawDataTable();
        this.TemplatesList();
        kendo.bind($(".model-bind"), SystemTemplateService);
    }
    drawDataTable() {
        $("#SablonListesiTable").DataTable().destroy();
        SystemTemplateService.templatesDataTable = $('#SablonListesiTable').DataTable({
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
        conf.url = "/Templates/ListSystem";
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
                /*
                        <th>Şablon İçerik Başlığı</th>
                        <th>Şablon İçerik Tanımı</th>
                        <th>Şablon İçerik Türü</th>
                        <th>Şablon Gönderim Türü</th>
                        <th style=' min-width: 20% !important;'>İşlem</th>
                 */
                data2 = result.value;
                SystemTemplateService.templatesDataTable.clear().draw();
                for (var item of data2) {
                    var iceriktipi = SystemTemplateService.sabloniceriktipAdi(SystemTemplateService.sablonTipleriList, item.sablonIcerikTipiId);
                    if (iceriktipi.length) {
                        SystemTemplateService.templatesDataTable.row.add([
                            item.icerikBaslik,
                            item.icerikTanim,
                            iceriktipi[0].tanim,
                            item.gonderimTipi,
                            CsharpDateToStringDateyyyymmddForProfile(item.kayitTarihi),
                            "<button type='button' class= 'btn btn-sm mx-1' onclick = 'SystoTemplateUpdate(\"" + item.tabloID + "\")' > <img src='/img/edit.svg'/> </button>\ <button type='button' class = 'btn  btn-sm' onclick = 'SysdeleteTemplate(\"" + item.tabloID + "\")'> <img src='/img/trash.svg'/>  </button>"
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
        window.location.href = "/Templates/CreateForSystem";
    }
    toUpdatePage(id) {
        window.location.href = "/Templates/UpdateForSystem/" + id;
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
                    SystemTemplateService.drawDataTable();
                    SystemTemplateService.TemplatesList();
                }
            };
            SystemTemplateService._repository.postData(null, conf);
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
var SystemTemplateService = new SystemContentTemplatesService();
var customeditor;
var insertAtCaret;
var putElemAtEditor;
var GetURLParameter;
var CsharpDateToStringDateyyyymmddForProfile;
var errorHandler;
var alertim;
function SysgetDataFromCkEditor(editor) {
    return editor.getData();
}
function SysSetDataToCkEditor(editor, data) {
    editor.setData(data.toString());
}
function SysInsertElemByType(tag, link) {
    if (SystemTemplateService.data.get("GonderimTipi") == "MAIL") {
        if (link == false)
            putElemAtEditor(customeditor, tag);
        else
            putElemAtEditor(customeditor, tag, true);
    }
    if (SystemTemplateService.data.get("GonderimTipi") == "SMS") {
        insertAtCaret("SmsSablonMetin", tag);
        $('#SmsSablonMetin').change();
    }
}
function SysReplaceTagValuesforSave(text) {
    text = text.replace(/\&lt;Kişi Adı&gt;/g, "@Model.Name");
    text = text.replace(/\&lt;Etkinlik Zamanı&gt;/g, "@Model.Tarih");
    text = text.replace(/\&lt;Mesaj içeriği&gt;/g, "@Model.Mesaj");
    text = text.replace(/\<Mesaj içeriği>/g, "@Model.Mesaj");
    return text;
}
function SysReplaceTagValuesforView(text) {
    text = text.replace(/\@Model.Name/g, "&lt;Kişi Adı&gt;");
    text = text.replace(/\@Model.Tarih/g, "&lt;Etkinlik Zamanı&gt;");
    text = text.replace(/\@Model.Mesaj/g, "&lt;Mesaj içeriği&gt;");
    text = text.replace(/\@Model.Mesaj/g, "<Mesaj içeriği>");
    return text;
}
function SysReplaceSMSValuesForSave(text) {
    text = text.replace(/\<Kişi Adı>/g, "@Model.Name");
    text = text.replace(/\<Etkinlik Zamanı>/g, "@Model.Tarih");
    text = text.replace(/\<Mesaj içeriği>/g, "@Model.Mesaj");
    return text;
}
function SysReplaceSMSValuesForView(text) {
    text = text.replace(/\@Model.Name/g, "<Kişi Adı>");
    text = text.replace(/\@Model.Tarih/g, "<Etkinlik Zamanı>");
    text = text.replace(/\@Model.Mesaj/g, "<Mesaj içeriği>");
    return text;
}
function SysdeleteTemplate(id) {
    SystemTemplateService.DeleteTemplate(id);
}
function SystoTemplateUpdate(id) {
    SystemTemplateService.toUpdatePage(id);
}
