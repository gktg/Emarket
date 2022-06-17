var KisiID;
var Register = {}
var GuncelleModel = {}
var FavoriKategoriModel = {}
var FavoriKategoriler = []
var FavoriKategorilerInt = []


$(document).ready(function () {

    Email();
    KisiID = GetURLParameter();
    KategoriGetir()
    KisiBilgileriGetir();

    CustomInputMask(".kisiTelNo");
    //PhoneMask();
})

function ParamDDLDoldur(alanID, data) {
    var str = "";
    str += "<option value='0'>Seçiniz</option>";
    for (var i of data) {
        var kategoriAdi = i.kategoriAdi == undefined ? i.kategoriAdi : i.kategoriAdi;
        str += "<option value='" + i.kategoriID + "'>" + kategoriAdi + "</option>";
    }
    $("#" + alanID).html(str);
}

function KategoriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/KategoriGetir/",
        dataType: "json",
        contentType:"application/json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result != null) {
                ParamDDLDoldur("drdKategori", result.$values)
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.warning)

            }


        },
        error: function (e) {

            console.log(e);
        }
    })
}

function KisiBilgileriGetir() {
    $.ajax({

        type: "Get",
        url: "/emarket/KisiBilgileriGetir/" + KisiID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.id == KisiID) {
                KisiModel = result;
                KisiBilgileriniSayfayaBas()
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.warning)

            }


        },
        error: function (e) {

            console.log(e);
        }
    })
}


function KisiBilgileriniSayfayaBas() {

    $("#txtAd").val(KisiModel.ad)
    $("#txtSoyad").val(KisiModel.soyad)
    $("#txtEmail").val(KisiModel.email)
    $("#txtDogumTarihi").val(CsharpDateToStringDateyyyymmdd(KisiModel.kisiHassasBilgiler.dogumTarihi)).change();
    $("#txtTelefon").val(KisiModel.kisiHassasBilgiler.telefonNumarasi)
    $("#txtAdres").val(KisiModel.kisiHassasBilgiler.adres)

    $.each(KisiModel.kisiFavoriKategorileri.$values, function (x, y) {

        $("#drdKategori option[value='" + y.kategoriID + "']").prop("selected", true).change();

    })
}

function GuncellenmisKisiBilgileriniSayfayaBas() {

    $("#txtAd").val(KisiModel.ad)
    $("#txtSoyad").val(KisiModel.soyad)
    $("#txtEmail").val(KisiModel.email)
    $("#txtDogumTarihi").val(CsharpDateToStringDateyyyymmdd(KisiModel.kisiHassasBilgiler.dogumTarihi)).change();
    $("#txtTelefon").val(KisiModel.kisiHassasBilgiler.telefonNumarasi)
    $("#txtAdres").val(KisiModel.kisiHassasBilgiler.adres)

    $.each(KisiModel.kisiFavoriKategorileri.$values, function (x, y) {

        $("#drdKategori option[value='" + y.kategoriID + "']").prop("selected", true).change();

    })
}

function GuncelKisiBilgileriModeleBas() {

    Register["ID"] = KisiID;
    Register["Ad"] = $("#txtAd").val()
    Register["Soyad"] = $("#txtSoyad").val()
    Register["Email"] = $("#txtEmail").val()
    Register["DogumTarihi"] = $("#txtDogumTarihi").val()
    Register["TelefonNumarasi"] = $("#txtTelefon").val()
    Register["Adres"] = $("#txtAdres").val()
    Register["KisiFavoriKategorileri"] = $("#drdKategori").val().map(Number);

    console.log(Register)
}

function KisiBilgileriGuncelle() {

    GuncelKisiBilgileriModeleBas();

    $.ajax({

        type: "Post",
        url: "/emarket/KisiBilgileriGuncelle/",
        dataType: "json",
        data: Register,
        async: false,
        success: function (result) {
            console.log(result)
            if (result.id == KisiID) {

                KisiModel = result;
                GuncellenmisKisiBilgileriniSayfayaBas()
                alertim.toast(siteLang.Kaydet, alertim.types.success)

            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.warning)

            }


        },
        error: function (e) {

            console.log(e);
        }
    })
}

