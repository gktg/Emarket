/// <reference path="../../model/licensemodulemodel/KurumLisansOdemeModel.ts" />
/// <reference path="../../model/licensemodulemodel/lisansdetaykayitmodel.ts" />
class LicensePurchaseService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new KurumLisansOdemeModel({
            TabloID: 0,
            LisansId: 0,
            Name: "",
            KurumID: 0,
            IlgiliKurumId: 0,
            GecerliOlduguGun: 0,
            SonKullanimTarihi: "",
            SayfaId: [],
            LisansZamanId: 0,
            LisansKisiSayisi: 0,
            KisiKimlikNo: "",
            FaturaAdresi: {},
            IyzicoUrunPlaniToken: "",
            CepTelefonNumarasi: ""
            //TeslimatAdresi: {}
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
                    licensePurchaseService.kurumList.push({ tabloID: item.tabloID, tanim: item.kurumKisaUnvan });
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
                    licensePurchaseService.lisansList.push({ tabloID: item.tabloID, tanim: item.name });
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    LisansZamanıGetir() {
        var id = licensePurchaseService.data.get("LisansId");
        this.lisansZamanList = [];
        this.lisansZamanFiyatList = [];
        this.lisansZamanKurList = [];
        this.zamanList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/LicenseZaman/List/" + id;
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    let kisiSayi = item.lisansPaketiKisiSayisi || 1;
                    var paketbedeli = "";
                    let tempZaman = { id: 0, gun: "", kur: "", fiyat: "", token: "", lisansPaketiKisiSayisi: 0 };
                    tempZaman.id = item.tabloID;
                    tempZaman.token = item.iyzicoUrunPlaniToken;
                    tempZaman.gun = item.gecerliOlduguGun;
                    if (item.lisansBedeli != null && item.lisansBedeliParaBirimiId != null) {
                        var kur = licensePurchaseService.paraBirimList.filter(a => a.id == item.lisansBedeliParaBirimiId)[0].title;
                        paketbedeli = item.lisansBedeli + " " + kur;
                        licensePurchaseService.lisansZamanFiyatList.push({ tabloID: item.tabloID, tanim: item.lisansBedeli });
                        licensePurchaseService.lisansZamanKurList.push({ tabloID: item.tabloID, tanim: kur });
                        tempZaman.fiyat = item.lisansBedeli;
                        tempZaman.kur = kur;
                        tempZaman.lisansPaketiKisiSayisi = item.lisansPaketiKisiSayisi;
                    }
                    let tanim = item.lisansBedeli > 0 ? kisiSayi + " Kişi (" + paketbedeli + " / Ay)" : kisiSayi + " Kişi (Ücretsiz)";
                    licensePurchaseService.lisansZamanList.push({ tabloID: item.tabloID, tanim: tanim });
                    licensePurchaseService.zamanList.push(tempZaman);
                }
                kendo.bind($(".model-bind"), licensePurchaseService);
                let zaman = result.value[0].tabloID;
                licensePurchaseService.data.set("LisansZamanId", zaman);
                //licensePurchaseService.toplamFiyatHesapla();
            }
            licensePurchaseService.FreeLisansEkrani();
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
                licensePurchaseService.data.set("TabloID", result.value.tabloID);
                licensePurchaseService.data.set("Name", result.value.name);
                licensePurchaseService.data.set("LisansId", result.value.lisansId);
                licensePurchaseService.data.set("KurumID", result.value.kurumID);
                licensePurchaseService.data.set("IlgiliKurumId", result.value.ilgiliKurumId);
                licensePurchaseService.data.set("GecerliOlduguGun", result.value.gecerliOlduguGun);
                licensePurchaseService.data.set("SonKullanimTarihi", result.value.sonKullanimTarihi);
                licensePurchaseService.data.set("LisansZamanId", result.value.lisansZamanId);
                licensePurchaseService.data.set("LisansKisiSayisi", result.value.lisansKisiSayisi);
                licensePurchaseService.LisansZamanıGetir();
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    backgroundVerileriModeleBas() {
        var int = licensePurchaseService.data.get("GecerliOlduguGun");
        var date = JSDateToStringCSDate(lisansSonKullanimTarihi(int));
        licensePurchaseService.data.set("SonKullanimTarihi", date);
        if ($("#Lisanslar").val() != null) {
            var name = licensePurchaseService.lisansList.filter(k => k.tabloID === parseInt($('#Lisanslar').val()))[0].tanim + "_" + licensePurchaseService.kurumList.filter(k => k.tabloID === parseInt(licensePurchaseService.data.get("KurumID")))[0].tanim;
        }
        let product = licensePurchaseService.zamanList.filter(a => a.id == licensePurchaseService.data.get("LisansZamanId"))[0];
        licensePurchaseService.data.set("IyzicoUrunPlaniToken", product.token);
        name = name.replaceAll(" ", "_");
        licensePurchaseService.data.set("Name", name);
        var adres = licensePurchaseService.data.get("FaturaAdresi");
        adres.Country = "Türkiye";
        adres.ZipCode = "";
        let zaman = licensePurchaseService.zamanList.filter(a => a.id == licensePurchaseService.data.get("LisansZamanId"))[0];
        licensePurchaseService.data.set("LisansKisiSayisi", zaman.lisansPaketiKisiSayisi);
    }
    ZamanIdyegoreGecerliGunAta() {
        var id = licensePurchaseService.data.get("LisansZamanId");
        var gecerliGun = licensePurchaseService.zamanList.filter(a => a.id == id)[0].gun;
        licensePurchaseService.data.set("GecerliOlduguGun", gecerliGun);
        //licensePurchaseService.toplamFiyatHesapla();
    }
    paraBirimTipleriGetir() {
        licensePurchaseService.paraBirimList = [];
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
        licensePurchaseService.paraBirimList = list;
    }
    KisiVarOlanLisansAbonelik() {
        $.ajax({
            type: "GET",
            url: "/CompanyLicense/KisiVarOlanLisansAbonelik",
            data: null,
            dataType: "json",
            success: function (data) {
                var value = data.value;
                licensePurchaseService.KurumLisansVeriGetir(value.lisansGenelTanimId);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    SatinAlmaİstegiGonder() {
        licensePurchaseService.backgroundVerileriModeleBas();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/CompanyLicense/PurchaseLicenseSubscription"; //abonelik alımı
        //conf.url = "/CompanyLicense/PurchaseLicense"; // tek çekim alım
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.isSuccess) {
                $('#iyzipay-checkout-form').append(result.value.checkoutFormContent);
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(licensePurchaseService.data.toJSON()), conf);
    }
    FreeLisansEkrani() {
        if ($('#Lisanslar option:selected').text().toLowerCase().includes("free")) {
            $('#kisiselBilgiler').hide();
            $('#satisButton').hide();
            $('#freeButton').show();
        }
        else {
            $('#kisiselBilgiler').show();
            $('#satisButton').show();
            $('#freeButton').hide();
        }
    }
    FreeLisansSatinAl() {
        let data = licensePurchaseService.freeLisansVerileriOlustur();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/CompanyLicense/KurumFreeLisansKaydi";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.isSuccess) {
                alertim.toast("İşleminiz başarılı. Giriş sayfasına yönlendiriliyorsunuz.", "success", function () {
                    $('#logout-btn').click();
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(data), conf);
    }
    freeLisansVerileriOlustur() {
        licensePurchaseService.backgroundVerileriModeleBas();
        return {
            KurumId: licensePurchaseService.data.get("KurumID"),
            LisansId: licensePurchaseService.data.get("LisansId"),
            LisansZamanId: licensePurchaseService.data.get("LisansZamanId"),
            LisansKisiSayisi: 1,
            KisiAdi: "",
            FreeLisansMi: true
        };
    }
    //toplamFiyatHesapla() {
    //    var zamanId = licensePurchaseService.data.get("LisansZamanId");
    //    var tekilFiyat = parseInt(licensePurchaseService.lisansZamanFiyatList.filter(a => a.tabloID == zamanId)[0]?.tanim);
    //    let kisiSayisi =
    //        licensePurchaseService.data.get("LisansKisiSayisi");
    //    var kur = licensePurchaseService.lisansZamanKurList.filter(a => a.tabloID == zamanId)[0]?.tanim;
    //    var finalVal = (tekilFiyat * kisiSayisi) + " " + kur;
    //    if (!isNaN(tekilFiyat) && kur != undefined) {
    //        console.log(finalVal);
    //        $('#toplamFiyat').html(finalVal);
    //    }
    //}
    PurchaseInitialize() {
        licensePurchaseService.paraBirimTipleriGetir();
        licensePurchaseService.LisansGetir();
        licensePurchaseService.KisiVarOlanLisansAbonelik();
        licensePurchaseService.KurumGetir();
        kendo.bind($(".model-bind"), licensePurchaseService);
    }
}
var licensePurchaseService = new LicensePurchaseService();
var JSDateToStringCSDate;
var GetURLParameter;
var errorhandler;
var alertim;
var lisansSonKullanimTarihi;
