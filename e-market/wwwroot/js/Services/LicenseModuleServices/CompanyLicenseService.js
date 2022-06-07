/// <reference path="../../model/licensemodulemodel/kurumlisansdetaykayitmodel.ts" />
/// <reference path="../../model/licensemodulemodel/lisansdetaykayitmodel.ts" />
class CompanyLicenseService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new KurumLisansDetayKayitModel({
            TabloID: 0,
            LisansId: 0,
            Name: "",
            KurumID: 0,
            IlgiliKurumId: 0,
            GecerliOlduguGun: 0,
            SonKullanimTarihi: "",
            SayfaId: [],
            LisansZamanId: 0,
            LisansKisiSayisi: 0
        });
        this.zamanData = new LisansZamanModel({
            GecerliOlduguGun: 0,
            LisansId: 0,
            TabloID: 0,
            Name: 0
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/CompanyLicenseModule"));
    }
    KurumGetir() {
        this.kurumList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/panel/kurumList";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    companyLicenseService.kurumList.push({ tabloID: item.tabloID, tanim: item.kurumKisaUnvan });
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    LisansGetir() {
        this.lisansList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/License/LisansListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    companyLicenseService.lisansList.push({ tabloID: item.tabloID, tanim: item.name });
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    LisansZamanıGetir() {
        var id = companyLicenseService.data.get("LisansId");
        this.lisansZamanList = [];
        this.zamanList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/LicenseZaman/List/" + id;
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    var paketbedeli = "";
                    let tempZaman = { id: 0, gun: "", kur: "", fiyat: "", token: "", lisansPaketiKisiSayisi: 0 };
                    tempZaman.id = item.tabloID;
                    tempZaman.token = item.iyzicoUrunPlaniToken;
                    tempZaman.gun = item.gecerliOlduguGun;
                    tempZaman.lisansPaketiKisiSayisi = item.lisansPaketiKisiSayisi;
                    if (item.lisansBedeli != null && item.lisansBedeliParaBirimiId != null) {
                        var kur = companyLicenseService.paraBirimList.filter(a => a.id == item.lisansBedeliParaBirimiId)[0].title;
                        paketbedeli = item.lisansBedeli + " " + kur;
                        tempZaman.fiyat = item.lisansBedeli;
                        tempZaman.kur = kur;
                    }
                    companyLicenseService.lisansZamanList.push({ tabloID: item.tabloID, tanim: item.lisansPaketiKisiSayisi + " Kişi (" + paketbedeli + " / Ay)" });
                    companyLicenseService.zamanList.push(tempZaman);
                }
                kendo.bind($(".model-bind"), companyLicenseService);
                let zaman = companyLicenseService.data.get("LisansZamanId");
                companyLicenseService.data.set("LisansZamanId", zaman);
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    KurumLisansVeriGetir(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/GetKurumLisansData/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                companyLicenseService.data.set("TabloID", result.value.tabloID);
                companyLicenseService.data.set("Name", result.value.name);
                companyLicenseService.data.set("LisansId", result.value.lisansId);
                companyLicenseService.data.set("KurumID", result.value.kurumID);
                companyLicenseService.data.set("IlgiliKurumId", result.value.ilgiliKurumId);
                companyLicenseService.data.set("GecerliOlduguGun", result.value.gecerliOlduguGun);
                companyLicenseService.data.set("SonKullanimTarihi", result.value.sonKullanimTarihi);
                companyLicenseService.data.set("LisansZamanId", result.value.lisansZamanId);
                companyLicenseService.data.set("LisansKisiSayisi", result.value.lisansKisiSayisi);
                companyLicenseService.LisansZamanıGetir();
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    Kaydet() {
        companyLicenseService.backgroundVerileriModeleBas();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/CompanyLicense/AddOrUpdate";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/companylicense/list";
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(companyLicenseService.data.toJSON()), conf);
    }
    backgroundVerileriModeleBas() {
        var int = companyLicenseService.data.get("GecerliOlduguGun");
        var date = JSDateToStringCSDate(lisansSonKullanimTarihi(int));
        companyLicenseService.data.set("SonKullanimTarihi", date);
        if ($("#Lisanslar").val() != null && $("#Kurumlar").val() != null) {
            var name = companyLicenseService.kurumList.filter(k => k.tabloID === parseInt($('#Kurumlar').val()))[0].tanim + "_" + companyLicenseService.lisansList.filter(k => k.tabloID === parseInt($('#Lisanslar').val()))[0].tanim;
        }
        name = name.replaceAll(" ", "_");
        companyLicenseService.data.set("Name", name);
        let zaman = companyLicenseService.zamanList.filter(a => a.id == companyLicenseService.data.get("LisansZamanId"))[0];
        companyLicenseService.data.set("LisansKisiSayisi", zaman.lisansPaketiKisiSayisi);
    }
    ZamanIdyegoreGecerliGunAta() {
        var id = companyLicenseService.data.get("LisansZamanId");
        var gecerliGun = companyLicenseService.zamanList.filter(a => a.id == id)[0].gun;
        companyLicenseService.data.set("GecerliOlduguGun", gecerliGun);
    }
    drawDataTable() {
        $("#companyLicenseTable").DataTable().destroy();
        companyLicenseService.kurumLisansTable = $('#companyLicenseTable').DataTable({
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
    KurumLisansListGetir() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/ListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var tableData = [{
                        tabloID: 0,
                        lisansId: 0,
                        name: "",
                        kurumID: 0,
                        ilgiliKurumId: 0,
                        gecerliOlduguGun: 0,
                        sonKullanimTarihi: "",
                        sayfaId: []
                    }];
                tableData = result.value;
                companyLicenseService.kurumLisansTable.clear().draw();
                for (var item of tableData) {
                    var kurumAdi = companyLicenseService.kurumList.filter(k => k.tabloID === (item.ilgiliKurumId == null ? 0 : item.ilgiliKurumId))[0].tanim;
                    var lisansAdi = companyLicenseService.lisansList.filter(k => k.tabloID === (item.lisansId == null ? 0 : item.lisansId))[0].tanim;
                    companyLicenseService.kurumLisansTable.row.add([
                        item.name,
                        kurumAdi,
                        lisansAdi,
                        item.sayfaId.length,
                        item.gecerliOlduguGun,
                        CsharpDateToStringDateyyyymmddForProfile(item.sonKullanimTarihi),
                        "<button type='button' class= 'btn  btn-sm mx-1' onclick = 'toCompanyLicenseUpdate(\"" + item.tabloID + "\")' > <img src='/img/edit.svg'/> </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteCompanyLicense(\"" + item.tabloID + "\")'> <img src='/img/trash.svg'/> </button>"
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
        window.location.href = "/CompanyLicense/Update/" + id;
    }
    DeleteCompanyLicense(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/CompanyLicense/SetDelete/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    companyLicenseService.drawDataTable();
                    companyLicenseService.KurumLisansListGetir();
                    window.location.href = "/companylicense/list";
                }
            };
            companyLicenseService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    paraBirimTipleriGetir() {
        companyLicenseService.paraBirimList = [];
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
            },
            error: function (e) {
                console.log(e);
            }
        });
        companyLicenseService.paraBirimList = list;
    }
    SaveInitialize() {
        companyLicenseService.paraBirimTipleriGetir();
        companyLicenseService.KurumGetir();
        companyLicenseService.LisansGetir();
        kendo.bind($(".model-bind"), companyLicenseService);
    }
    UpdateInitialize() {
        companyLicenseService.paraBirimTipleriGetir();
        companyLicenseService.KurumGetir();
        companyLicenseService.LisansGetir();
        var id = GetURLParameter();
        if (id) {
            companyLicenseService.KurumLisansVeriGetir(id);
        }
        kendo.bind($(".model-bind"), companyLicenseService);
    }
    ListInitialize() {
        companyLicenseService.KurumGetir();
        companyLicenseService.LisansGetir();
        companyLicenseService.drawDataTable();
        companyLicenseService.KurumLisansListGetir();
        kendo.bind($(".model-bind"), companyLicenseService);
    }
}
var companyLicenseService = new CompanyLicenseService();
var JSDateToStringCSDate;
var GetURLParameter;
var errorhandler;
var alertim;
var lisansSonKullanimTarihi;
function deleteCompanyLicense(id) {
    companyLicenseService.DeleteCompanyLicense(id);
}
function toCompanyLicenseUpdate(id) {
    companyLicenseService.toUpdatePage(id);
}
