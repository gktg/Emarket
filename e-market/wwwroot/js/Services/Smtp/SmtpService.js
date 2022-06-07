class SmtpService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.sistemSmtpDegerleri = new SistemSmtpDegerleriModel({
            TabloID: 0,
            SMTPAdi: "",
            SmtpBaglantiDizisi: "",
            SmtpBaglantiKullaniciAdi: "",
            SmtpBaglantiSifre: "",
            SMTPPort: 0
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/smtp"));
    }
    drawDataTable() {
        $("#SmtpListesiTable").DataTable().destroy();
        smtpService.smtpDataTable = $('#SmtpListesiTable').DataTable({
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
    SaveSmtp() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/smtp/smtpadd";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                smtpService.clearSmtpData();
                alertim.toast(siteLang.Kaydet, "success", function () {
                    location.href = "/smtp/systemsmtplist";
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        if (smtpService.sistemSmtpDegerleri.get("TabloID")) {
            conf.url = "/smtp/smtpupdate";
            conf.success = function (result1) {
                smtpService.clearSmtpData();
                alertim.toast(siteLang.Guncelle, "success", function () {
                    location.href = "/smtp/systemsmtplist";
                });
            };
        }
        this._repository.postData(JSON.stringify(smtpService.sistemSmtpDegerleri.toJSON()), conf);
    }
    GetSmtpData(id) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/smtp/getsmtpbyid/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            smtpService.sistemSmtpDegerleri.set("TabloID", result.value.tabloID);
            smtpService.sistemSmtpDegerleri.set("SMTPAdi", result.value.smtpAdi);
            smtpService.sistemSmtpDegerleri.set("SmtpBaglantiDizisi", result.value.smtpBaglantiDizisi);
            smtpService.sistemSmtpDegerleri.set("SmtpBaglantiKullaniciAdi", result.value.smtpBaglantiKullaniciAdi);
            smtpService.sistemSmtpDegerleri.set("SmtpBaglantiSifre", result.value.smtpBaglantiSifre);
            smtpService.sistemSmtpDegerleri.set("SMTPPort", result.value.smtpPort);
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
    }
    clearSmtpData() {
        smtpService.sistemSmtpDegerleri.set("TabloID", 0);
        smtpService.sistemSmtpDegerleri.set("SMTPAdi", "");
        smtpService.sistemSmtpDegerleri.set("SmtpBaglantiDizisi", "");
        smtpService.sistemSmtpDegerleri.set("SmtpBaglantiKullaniciAdi", "");
        smtpService.sistemSmtpDegerleri.set("SmtpBaglantiSifre", "");
        smtpService.sistemSmtpDegerleri.set("SMTPPort", 0);
    }
    SmtpList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/smtp/getsystemsmtplist";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var data2 = [{
                        tabloID: 0,
                        smtpAdi: "",
                        smtpBaglantiDizisi: "",
                        smtpBaglantiKullaniciAdi: "",
                        smtpBaglantiSifre: "",
                        smtpPort: 0
                    }];
                data2 = result.value;
                smtpService.smtpDataTable.clear().draw();
                for (var item of data2) {
                    smtpService.smtpDataTable.row.add([
                        item.smtpAdi,
                        item.smtpBaglantiDizisi,
                        item.smtpBaglantiKullaniciAdi,
                        item.smtpPort,
                        "<button type='button' class= 'btn   btn-sm mx-1' onclick = 'toSmtpUpdate(\"" + item.tabloID.toString() + "\")' >  <img src='/img/edit.svg'/>  </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteSmtp(\"" + item.tabloID.toString() + "\")'>  <img src='/img/trash.svg'/> </button>"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    DeleteSmtp(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/smtp/systemsmtpdelete/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    smtpService.SmtpList();
                }
            };
            smtpService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    toUpdatePage(id) {
        window.location.href = "/smtp/systemsmtpupdate/" + id;
    }
    toSmtpAddPage() {
        window.location.href = "/smtp/systemsmtpadd";
    }
    initializeforSave() {
        smtpService.drawDataTable();
        smtpService.SmtpList();
        kendo.bind($(".model-bind"), smtpService);
    }
    initializeforUpdate() {
        var id = smtpService.GetURLParameter();
        smtpService.GetSmtpData(id.toString());
        kendo.bind($(".model-bind"), smtpService);
    }
    initializeForList() {
        smtpService.drawDataTable();
        smtpService.SmtpList();
        kendo.bind($(".model-bind"), smtpService);
    }
    //Tools.js tarafından geçici olarak alınan metotlar.
    GetURLParameter() {
        var sPageURL = window.location.href;
        var indexOfLastSlash = sPageURL.lastIndexOf("/");
        if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash) {
            if (sPageURL.substring(indexOfLastSlash + 1).length == 36) {
                return sPageURL.substring(indexOfLastSlash + 1);
            }
            return parseInt(sPageURL.substring(indexOfLastSlash + 1));
        }
        else
            return 0;
    }
}
var smtpService = new SmtpService();
var errorHandler;
var alertim;
function deleteSmtp(id) {
    smtpService.DeleteSmtp(id);
}
function toSmtpUpdate(id) {
    smtpService.toUpdatePage(id);
}
