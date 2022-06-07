var OzelGunKayitModel = {};

var OzelGunTipiListForDDL = [];
var UlkeListforDDL = [];

$(document).ready(function () {

    OzelGunListGetir();
    UlkeGetir();

});

function DatePersonel() {
    $("#OzelGunBaslangicTarihi").attr('min', $("#OzelGunBaslangicTarihi").val())
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


function OzelGunVerileriModeleBas() {
    OzelGunKayitModel = {};

    OzelGunKayitModel["KurumTemelBilgiID"] = $("#site-kurumid").val();
    OzelGunKayitModel["ParamUlkeID"] = $("#drdUlke option:selected").val(); //DDL
    OzelGunKayitModel["ParamTakvimOzelGunTipiID"] = $("#ozelguntipi option:selected").val(); //DDL
    OzelGunKayitModel["OzelGunAciklama"] = $("#aciklama").val();
    OzelGunKayitModel["OzelGunTanim"] = $("#ozelGunTanim").val();
    OzelGunKayitModel["OzelGunBaslangicTarihi"] = $("#drdbaslangicTarihi").val();
    OzelGunKayitModel["OzelGunBitisTarihi"] = $("#drdbitisTarihi").val();

 

    console.log(OzelGunKayitModel);
}

function OzelGunTemelVeriKaydet() {
    OzelGunVerileriModeleBas();
    var model = OzelGunKayitModel;
    $.ajax({
        type: "POST",
        url: "/ozelgun/OzelGunTanimEkle/",
        dataType: "json",
        data: model, // < === this is where the problem was !!
        success: function (result) {
            alert("Kayıt Başarılı");
            location.href = "/ozelgun/OzelGunlerListesi";

        },
        error: function (e) {

            console.log(e);
            errorHandler(e);
        }, //success: function (result) {
    });
}