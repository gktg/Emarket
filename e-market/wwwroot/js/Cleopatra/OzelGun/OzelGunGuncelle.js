var OzelGunTemelModel = {};
var OzelGunKayitModel = {};
var ozelgunID;

$(document).ready(function () {
    ozelgunID = GetURLParameter();
    OzelGunListGetir();
    UlkeGetir();
    OzelGunVerileriniGetir();
});


function OzelGunVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/ozelgun/OzelGunTanimIdsineGoreGetir/" + ozelgunID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.isSuccess == true) {
                OzelGunTemelModel = result.value;
                console.log(OzelGunTemelModel);
                OzelGunVerileriniSayfayaBas();
                ozelgunID = OzelGunTemelModel.tabloID;
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}


function OzelGunVerileriniSayfayaBas() {

    $("#drdUlke").val(OzelGunTemelModel.paramUlkeID).change();
    $("#ozelguntipi").val(OzelGunTemelModel.paramTakvimOzelGunTipiID).change();
    $("#ozelGunTanim").val(OzelGunTemelModel.ozelGunTanim);
    $("#aciklama").val(OzelGunTemelModel.ozelGunAciklama);
    $("#drdbaslangicTarihi").val(OzelGunTemelModel.ozelGunBaslangicTarihi).change();
    $("#drdbitisTarihi").val(OzelGunTemelModel.ozelGunBitisTarihi).change();

}



function ParamDDLDoldur(alanID, data) {
    var str = "<option value='0'>Seçiniz </option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].tanim + "</option>";
    }
    $("#" + alanID).html(str);
}
function OzelGunListGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamTakvimOzelGunTipleri",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            OzelGunTipiListForDDL = result.value;
            ParamDDLDoldur("ozelguntipi", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function UlkeGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamUlkeler",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            UlkeListforDDL = result.value;
            ParamDDLDoldur("drdUlke", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}

function OzelGunTemelKayitModeleBas() {
    OzelGunKayitModel = {};

    OzelGunKayitModel["TabloID"] = ozelgunID;
    OzelGunKayitModel["ParamUlkeID"] = $("#drdUlke option:selected").val(); //DDL
    OzelGunKayitModel["ParamTakvimOzelGunTipiID"] = $("#ozelguntipi option:selected").val(); //DDL
    OzelGunKayitModel["OzelGunAciklama"] = $("#aciklama").val();
    OzelGunKayitModel["OzelGunTanim"] = $("#ozelGunTanim").val();
    OzelGunKayitModel["OzelGunBaslangicTarihi"] = $("#drdbaslangicTarihi").val();
    OzelGunKayitModel["OzelGunBitisTarihi"] = $("#drdbitisTarihi").val();

    console.log(OzelGunKayitModel);
}

function OzelGunGuncelle() {
    OzelGunTemelKayitModeleBas();
    var model = OzelGunKayitModel;
    $.ajax({
        type: "POST",
        url: "/ozelgun/OzelGunTanimGuncelle",
        dataType: "json",
        data: model,
        success: function (result) {
            alert("Kayıt Başarılı");
            location.href = "/ozelgun/OzelGunlerListesi";

        },
        error: function (e) {
            console.log(e);
            errorHandler(e);
        }
    });
}