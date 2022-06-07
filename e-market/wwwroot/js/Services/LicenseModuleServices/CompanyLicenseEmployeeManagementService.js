/// <reference path="../../model/licensemodulemodel/lisanskurumkisiaboneliktanimmodel.ts" />
class CompanyLicenseEmployeeManagementService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new LisansKurumKisiAbonelikTanimModel({
            TabloID: 0,
            LisansGenelTanimId: 0,
            LisansEssizNo: "",
            LisansAboneKurumId: 0,
            LisansAboneKisiId: 0,
            LisansAbonelikBaslangicTarihi: null,
            LisansAbonelikBitisTarihi: null
        });
        this.lisansToplamSayi = 0;
        this.lisansOlmSayi = 0;
        this.lisansAktifSayi = 0;
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/CompanyLicenseModule"));
    }
    LisansAtamasiYap() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/CompanyLicense/KurumKisiLisansEslestirmesi";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success");
                $("#LisansGuncelleModal").modal('hide');
                employeeManagementService.SayiMethodlari();
                employeeManagementService.KurumKisiLisansVeriGetir();
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(employeeManagementService.data.toJSON()), conf);
    }
    LisansGetir() {
        this.lisansList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/ListForOnlyKurum";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                employeeManagementService.lisansList.push({ tabloID: 0, tanim: siteLang.LisansıOlmayanKişiler });
                for (var item of result.value) {
                    var endDate = CsharpDateToStringDateyyyymmddForProfile(item.sonKullanimTarihi);
                    employeeManagementService.lisansList.push({ tabloID: item.tabloID, tanim: item.name + ` (${endDate})` });
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    KurumKisiLisansVeriGetir() {
        this.lisansKisiVerileri = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/KurumKisiLisansVerileriGetir";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    employeeManagementService.lisansKisiVerileri.push({
                        TabloID: item.tabloID,
                        LisansGenelTanimId: item.lisansGenelTanimId,
                        LisansEssizNo: item.lisansEssizNo,
                        LisansAboneKurumId: item.lisansAboneKurumId,
                        LisansAboneKisiId: item.lisansAboneKisiId,
                        LisansAbonelikBaslangicTarihi: item.lisansAbonelikBaslangicTarihi,
                        LisansAbonelikBitisTarihi: item.lisansAbonelikBitisTarihi
                    });
                }
                for (var member of employeeManagementService.kisiList) {
                    var kisilisansdurumu = employeeManagementService.lisansKisiVerileri.filter(a => a.LisansAboneKisiId == member.tabloID)[0];
                    if (kisilisansdurumu != undefined) {
                        member["lisansId"] = kisilisansdurumu.LisansGenelTanimId;
                        member["lisansAbonelikId"] = kisilisansdurumu.TabloID;
                    }
                    else {
                        member["lisansId"] = 0;
                        member["lisansAbonelikId"] = 0;
                    }
                }
            }
            employeeManagementService.FillDataTable();
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    drawDataTable() {
        $("#KisiListesiTable").DataTable().destroy();
        employeeManagementService.KisiListesiTable = $('#KisiListesiTable').DataTable({
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
    KisiListGetir() {
        this.kisiList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/panel/TemelKisiListesiGetir";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var tableData = [{
                        kisiAdi: "",
                        kisiSoyadi: "",
                        kisiKullaniciAdi: "",
                        kisiEposta: "",
                        tabloID: 0,
                        lisansId: 0
                    }];
                tableData = result.value;
                employeeManagementService.kisiList = tableData;
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    FillDataTable() {
        employeeManagementService.KisiListesiTable.clear().draw();
        employeeManagementService.lisansOlmSayi = employeeManagementService.kisiList.filter(x => x.lisansId == 0).length;
        for (var item of employeeManagementService.kisiList) {
            let button = "";
            let seciliLisans = employeeManagementService.data.get("LisansGenelTanimId");
            let lisans = employeeManagementService.lisansList.filter(a => a.tabloID === item["lisansId"])[0];
            let lisansdurumu = lisans != undefined ? lisans.tanim : "Lisans ataması bulunmamaktadır.";
            if (item["lisansId"] == seciliLisans) {
                if (seciliLisans > 0) {
                    button = "<button type='button' class='btn btn-warning btn-sm mx-1' onclick='lisansModalAc(" + item.tabloID + "," + item["lisansAbonelikId"] + ")'>" + siteLang.LisansDegistir + "</button>";
                    button += "<button type='button' class='btn btn-danger btn-sm' onclick='CancelLicense(" + item["lisansAbonelikId"] + ")'>" + siteLang.LisansIptal + "</button>";
                }
                else {
                    button = "<button type='button' class='btn btn-success btn-sm mx-1' onclick='lisansModalAc(" + item.tabloID + ",0)'>" + siteLang.LisansEkle + "</button>";
                    lisansdurumu = "Lisans ataması bulunmamaktadır.";
                }
                employeeManagementService.KisiListesiTable.row.add([
                    item.kisiAdi + " " + item.kisiSoyadi,
                    item.kisiKullaniciAdi,
                    item.kisiEposta,
                    lisansdurumu,
                    button,
                ]).draw(true);
            }
            else if (!employeeManagementService.lisansList.some(a => a.tabloID === item["lisansId"]) && seciliLisans == 0) {
                button = "<button type='button' class='btn btn-success btn-sm mx-1' onclick='lisansModalAc(" + item.tabloID + ",0)'>" + siteLang.LisansEkle + "</button>";
                lisansdurumu = "Lisans kullanım süresi sona ermiştir.";
                employeeManagementService.KisiListesiTable.row.add([
                    item.kisiAdi + " " + item.kisiSoyadi,
                    item.kisiKullaniciAdi,
                    item.kisiEposta,
                    lisansdurumu,
                    button,
                ]).draw(true);
            }
        }
        console.log(employeeManagementService.kisiList);
    }
    KurumLisansToplamSayiGetir() {
        var id = employeeManagementService.data.get("LisansGenelTanimId");
        this.lisansToplamSayi = 0;
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/KurumLisansKisiSayisiGetir/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.isSuccess) {
                employeeManagementService.lisansToplamSayi = result.value;
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    KurumLisansKullanilanSayiGetir() {
        var id = employeeManagementService.data.get("LisansGenelTanimId");
        this.lisansAktifSayi = 0;
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/CompanyLicense/KurumLisansaBagliAktifKisiSayisi/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.isSuccess) {
                employeeManagementService.lisansAktifSayi = result.value;
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    KurumLisansDeaktifEt(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/CompanyLicense/LisansDeaktifEt/" + id;
            conf.type = AjaxType.GET;
            conf.success = function (result) {
                if (result.value) {
                    alertim.toast(siteLang.Sil, "success");
                    employeeManagementService.SayiMethodlari();
                    employeeManagementService.KurumKisiLisansVeriGetir();
                }
            };
            conf.error = function (e) {
                console.log(e);
            };
            employeeManagementService._repository.getData(null, conf);
        }, function () {
            return;
        });
    }
    lisansModalAc(id, tabloId) {
        employeeManagementService.data.set("LisansAboneKisiId", id);
        employeeManagementService.data.set("TabloID", tabloId);
        var kisi = employeeManagementService.kisiList.filter(a => a.tabloID == id)[0];
        if (kisi != undefined)
            $('#lisansAtanacakKisi').html(kisi.kisiAdi + " " + kisi.kisiSoyadi);
        $('#LisansGuncelleModal').modal('show');
    }
    SayiMethodlari() {
        employeeManagementService.KurumLisansToplamSayiGetir();
        employeeManagementService.KurumLisansKullanilanSayiGetir();
        kendo.bind($(".model-bind"), employeeManagementService);
    }
    LisansOnchange() {
        if ($("#Lisanslar").val() === "0") {
            $("#lisansOlan").hide();
            $("#lisanOlm").show();
        }
        else {
            $("#lisansOlan").show();
            $("#lisanOlm").hide();
        }
        employeeManagementService.SayiMethodlari();
        employeeManagementService.FillDataTable();
        kendo.bind($(".model-bind"), employeeManagementService);
    }
    ModalLisansOnchange() {
        employeeManagementService.SayiMethodlari();
        kendo.bind($(".model-bind"), employeeManagementService);
    }
    initialize() {
        employeeManagementService.KisiListGetir();
        employeeManagementService.LisansGetir();
        employeeManagementService.drawDataTable();
        employeeManagementService.KurumKisiLisansVeriGetir();
        kendo.bind($(".model-bind"), employeeManagementService);
    }
}
var employeeManagementService = new CompanyLicenseEmployeeManagementService();
var errorHandler;
var alertim;
function CancelLicense(id) {
    console.log(id);
    employeeManagementService.KurumLisansDeaktifEt(id);
}
function UpdateCompanyLicense() {
    if (!employeeManagementService.data.get("LisansGenelTanimId")) {
        alertim.toast(siteLang.LisansSec, "warning");
        return;
    }
    $('#LisansGuncelleModal').modal('toggle');
    alertim.confirm(siteLang.LisansAtamaG, "info", function () {
        employeeManagementService.initialize();
        if ($("#Lisanslar").val() === "0") {
            $("#lisansOlan").hide();
            $("#lisanOlm").show();
        }
        else {
            $("#lisansOlan").show();
            $("#lisanOlm").hide();
        }
        if (!(employeeManagementService.lisansAktifSayi < employeeManagementService.lisansToplamSayi)) {
            alertim.toast(siteLang.LisansKota, "warning");
            return;
        }
        employeeManagementService.LisansAtamasiYap();
    }, function () {
        return;
    });
}
function lisansModalAc(id, tabloId) {
    employeeManagementService.lisansModalAc(id, tabloId);
}
