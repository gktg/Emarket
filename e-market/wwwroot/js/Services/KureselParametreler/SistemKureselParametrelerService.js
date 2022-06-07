/// <reference path="../../model/kureselparametreler/sistemkureselparametrelermodel.ts" />
class SistemKureselParametrelerService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.dataKuresel = new SistemKureselParametrelerModel({
            SistemMi: 0,
            KurumID: 0,
            KureselParams: [{ Adi: "", Deger: 0, MetinDegeri: "", ID: 0 }]
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/kureselparametreler"));
    }
    SaveUpdateSystemGlobal() {
        if (sistemKureselParametrelerService.data.SessionTimeOut.IntValue == null) {
            $('[name="sessiontimeout"]').val(5184000);
            sistemKureselParametrelerService.data.SessionTimeOut.IntValue = 0.00;
        }
        if (sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue == null) {
            $('[name="zorunlusifre"]').val(90);
            sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue = 0.00;
        }
        sistemKureselParametrelerService.dataKuresel.set("SistemMi", 0);
        sistemKureselParametrelerService.dataKuresel.set("KurumID", 0);
        sistemKureselParametrelerService.dataKuresel.set("KureselParams", [
            { Adi: sistemKureselParametrelerService.data.SessionTimeOut.TextValue, Deger: sistemKureselParametrelerService.data.SessionTimeOut.IntValue, MetinDegeri: "", ID: sistemKureselParametrelerService.data.SessionTimeOut.ID },
            { Adi: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.TextValue, Deger: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue, MetinDegeri: "", ID: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.ID },
            { Adi: sistemKureselParametrelerService.data.GoogleApiKey.TextValue, Deger: 0, MetinDegeri: sistemKureselParametrelerService.data.GoogleApiKey.Api, ID: sistemKureselParametrelerService.data.GoogleApiKey.ID },
            { Adi: sistemKureselParametrelerService.data.SmsBasligi.TextValue, Deger: 0, MetinDegeri: sistemKureselParametrelerService.data.SmsBasligi.Api, ID: sistemKureselParametrelerService.data.SmsBasligi.ID },
            { Adi: sistemKureselParametrelerService.data.SmsApiUrl.TextValue, Deger: 0, MetinDegeri: sistemKureselParametrelerService.data.SmsApiUrl.Api, ID: sistemKureselParametrelerService.data.SmsApiUrl.ID },
            { Adi: sistemKureselParametrelerService.data.SmsApiKullaniciAdi.TextValue, Deger: 0, MetinDegeri: sistemKureselParametrelerService.data.SmsApiKullaniciAdi.Api, ID: sistemKureselParametrelerService.data.SmsApiKullaniciAdi.ID },
            { Adi: sistemKureselParametrelerService.data.SmsApiSifresi.TextValue, Deger: 0, MetinDegeri: sistemKureselParametrelerService.data.SmsApiSifresi.Api, ID: sistemKureselParametrelerService.data.SmsApiSifresi.ID }
        ]);
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/globalparameters/systemglobaladdupdate";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            sistemKureselParametrelerService.clearData();
            alertim.toast(siteLang.Kaydet, "success", function () {
                location.href = "/globalparameter/systemglobalparameterdefinition";
            });
        },
            conf.error = function (e) {
                errorHandler(e);
            };
        if (sistemKureselParametrelerService.dataKuresel.get("KureselParams").tabloID) {
            conf.url = "/globalparameters/systemglobaladdupdate";
            conf.success = function (result1) {
                sistemKureselParametrelerService.clearData();
                alertim.toast(siteLang.Guncelle, "success", function () {
                    location.href = "/globalparameter/systemglobalparameterdefinition";
                });
            },
                conf.error = function (e) {
                    errorHandler(e);
                };
        }
        this._repository.postData(JSON.stringify(sistemKureselParametrelerService.dataKuresel.toJSON()), conf);
    }
    SaveUpdateGlobal() {
        if (sistemKureselParametrelerService.data.SessionTimeOut.IntValue == null) {
            $('[name="sessiontimeout"]').val(5184000);
            sistemKureselParametrelerService.data.SessionTimeOut.IntValue = 0;
        }
        if (sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue == null) {
            $('[name="zorunlusifre"]').val(90);
            sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue = 0;
        }
        sistemKureselParametrelerService.dataKuresel.set("SistemMi", 0);
        sistemKureselParametrelerService.dataKuresel.set("KurumID", 0);
        sistemKureselParametrelerService.dataKuresel.set("KureselParams", [
            { Adi: sistemKureselParametrelerService.data.SessionTimeOut.TextValue, Deger: sistemKureselParametrelerService.data.SessionTimeOut.IntValue, MetinDegeri: "", ID: sistemKureselParametrelerService.data.SessionTimeOut.ID },
            { Adi: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.TextValue, Deger: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.IntValue, MetinDegeri: "", ID: sistemKureselParametrelerService.data.ZorunluSifreYenilemeAraligi.ID }
        ]);
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/globalparameters/globaladdupdate";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            sistemKureselParametrelerService.clearData();
            alertim.toast(siteLang.Kaydet, "success", function () {
                location.href = "/globalparameter/globalparameterdefinition";
            });
        },
            conf.error = function (e) {
                errorHandler(e);
            };
        if (sistemKureselParametrelerService.dataKuresel.get("KureselParams").tabloID) {
            conf.url = "/globalparameters/globaladdupdate";
            conf.success = function (result1) {
                sistemKureselParametrelerService.clearData();
                alertim.toast(siteLang.Guncelle, "success", function () {
                    location.href = "/globalparameter/globalparameterdefinition";
                });
            },
                conf.error = function (e) {
                    errorHandler(e);
                };
        }
        this._repository.postData(JSON.stringify(sistemKureselParametrelerService.dataKuresel.toJSON()), conf);
    }
    clearData() {
        sistemKureselParametrelerService.dataKuresel.set("SistemMi", 0);
        sistemKureselParametrelerService.dataKuresel.set("KurumID", 0);
        sistemKureselParametrelerService.dataKuresel.set("KureselParams", []);
    }
    IsmeGoreGetir(tabloID) {
        var deger = "";
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/globalparameters/idparamname/" + tabloID;
        conf.type = AjaxType.GET;
        conf.async = false;
        conf.success = function (result) {
            deger = result.value;
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
        return deger;
    }
    GetGlobalData() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/globalparameters/globalparameterget";
        conf.type = AjaxType.GET;
        conf.async = false;
        conf.success = function (result) {
            var sess = new KureselFieldModel({ ID: 0, TextValue: "Session Timeout", IntValue: 5184000, Api: "" });
            var sif = new KureselFieldModel({ ID: 0, TextValue: "ZorunluŞifreYenilemeAralığı", IntValue: 90, Api: "" });
            sistemKureselParametrelerService.data = new KureselParamModel({
                KurumID: result.value.kurumID,
                SistemMi: result.value.parametreKurumsalMiSistemMi,
                SessionTimeOut: sess,
                ZorunluSifreYenilemeAraligi: sif
            });
            result.value.forEach(function (val) {
                if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "Session Timeout") {
                    sess.IntValue = parseInt(val.parametreBaslangicDegeri);
                    sess.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "ZorunluŞifreYenilemeAralığı") {
                    sif.IntValue = parseInt(val.parametreBaslangicDegeri);
                    sif.ID = val.tabloID;
                }
            });
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
    }
    SystemGetGlobalData() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/globalparameters/systemglobalparameterget";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            var sess = new KureselFieldModel({ ID: 0, TextValue: "Session Timeout", IntValue: 0.00, Api: "" });
            var sif = new KureselFieldModel({ ID: 0, TextValue: "ZorunluŞifreYenilemeAralığı", IntValue: 0.00, Api: "" });
            var apiKey = new KureselFieldModel({ ID: 0, TextValue: "GoogleApiKey", IntValue: 0, Api: "" });
            var smsb = new KureselFieldModel({ ID: 0, TextValue: "SmsBasligi", IntValue: 0, Api: "" });
            var smsu = new KureselFieldModel({ ID: 0, TextValue: "SmsApiUrl", IntValue: 0, Api: "" });
            var smsk = new KureselFieldModel({ ID: 0, TextValue: "SmsApiKullaniciAdi", IntValue: 0, Api: "" });
            var smss = new KureselFieldModel({ ID: 0, TextValue: "SmsApiSifresi", IntValue: 0, Api: "" });
            sistemKureselParametrelerService.data = new KureselParamModel({
                KurumID: result.value.kurumID,
                SistemMi: result.value.parametreKurumsalMiSistemMi,
                SessionTimeOut: sess,
                ZorunluSifreYenilemeAraligi: sif,
                GoogleApiKey: apiKey,
                SmsBasligi: smsb,
                SmsApiUrl: smsu,
                SmsApiKullaniciAdi: smsk,
                SmsApiSifresi: smss
            });
            result.value.forEach(function (val) {
                if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "Session Timeout") {
                    sess.IntValue = parseInt(val.parametreBaslangicDegeri);
                    sess.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "ZorunluŞifreYenilemeAralığı") {
                    sif.IntValue = parseInt(val.parametreBaslangicDegeri);
                    sif.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "GoogleApiKey") {
                    apiKey.Api = val.parametreMetinDegeri;
                    apiKey.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "SmsBasligi") {
                    smsb.Api = val.parametreMetinDegeri;
                    smsb.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "SmsApiUrl") {
                    smsu.Api = val.parametreMetinDegeri;
                    smsu.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "SmsApiKullaniciAdi") {
                    smsk.Api = val.parametreMetinDegeri;
                    smsk.ID = val.tabloID;
                }
                else if (sistemKureselParametrelerService.IsmeGoreGetir(val.kureselParametreId) == "SmsApiSifresi") {
                    smss.Api = val.parametreMetinDegeri;
                    smss.ID = val.tabloID;
                }
            });
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
    }
    initializeForList() {
        sistemKureselParametrelerService.GetGlobalData(); //list
        kendo.bind($(".model-bind"), sistemKureselParametrelerService);
    }
    initializeForListSystem() {
        sistemKureselParametrelerService.SystemGetGlobalData(); //list
        kendo.bind($(".model-bind"), sistemKureselParametrelerService);
    }
}
var errorHandler;
var alertim;
var sistemKureselParametrelerService = new SistemKureselParametrelerService();
class KureselParamModel extends kendo.data.Model {
    constructor(value) {
        super(value);
        this.init(value);
    }
}
class KureselFieldModel extends kendo.data.Model {
    constructor(value) {
        super(value);
        this.init(value);
    }
}
