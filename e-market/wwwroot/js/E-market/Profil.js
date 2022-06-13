var KisiID;
var GuncelleModel = {}
var RegisterProfil2 = {}
var KisiHassasBilgilerProfil2 = {}
var FavoriKategoriModel = {}
var FavoriKategoriler = []


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

function KategoriKaydet() {
    FavoriKategoriler = $("#drdKategori").select2("val");
    FavoriKategoriModel["ProfilID"] = KisiID;
    FavoriKategoriModel["KategoriID"] = FavoriKategoriler;
    $.ajax({
        type: "Post",
        url: "/emarket/FavoriKategorileriKaydet/",
        dataType: "json",
        data: FavoriKategoriModel,
        async: false,
        success: function (result) {
            console.log(result)
            if (result == true) {
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


function KisiBilgileriGetir() {
    $.ajax({

        type: "Get",
        url: "/emarket/KisiBilgileriGetir/" + KisiID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.registerProfil.id == KisiID) {
                console.log(result)
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

    $("#txtAd").val(KisiModel.registerProfil.ad)
    $("#txtSoyad").val(KisiModel.registerProfil.soyad)
    $("#txtEmail").val(KisiModel.registerProfil.email)
    $("#txtDogumTarihi").val(CsharpDateToStringDateyyyymmdd(KisiModel.registerProfil.kisiHassasBilgiler.dogumTarihi)).change();
    $("#txtTelefon").val(KisiModel.registerProfil.kisiHassasBilgiler.telefonNumarasi)
    $("#txtAdres").val(KisiModel.registerProfil.kisiHassasBilgiler.adres)

    $.each(KisiModel.registerProfil.kisiFavoriKategorileri.$values, function (x, y) {

        $("#drdKategori option[value='" + y.kategoriID + "']").prop("selected", true).change();

    })
}

function GuncelKisiBilgileriModeleBas() {

    RegisterProfil["ID"] = KisiID;
    RegisterProfil["Ad"] = $("#txtAd").val()
    RegisterProfil["Soyad"] = $("#txtSoyad").val()
    RegisterProfil["Email"] = $("#txtEmail").val()

    KisiHassasBilgilerProfil["ID"] = KisiID;
    KisiHassasBilgilerProfil["DogumTarihi"] = $("#txtDogumTarihi").val()
    KisiHassasBilgilerProfil["TelefonNumarasi"] = $("#txtTelefon").val()
    KisiHassasBilgilerProfil["Adres"] = $("#txtAdres").val()

    GuncelleModel["RegisterProfil"] = RegisterProfil;
    GuncelleModel["KisiHassasBilgilerProfil"] = KisiHassasBilgilerProfil;
    console.log(GuncelleModel)
}

function KisiBilgileriGuncelle() {

    GuncelKisiBilgileriModeleBas();
    model = GuncelleModel;
    console.log(model)

    $.ajax({

        type: "Get",
        url: "/emarket/KisiBilgileriGuncelle/",
        dataType: "json",
        data: model,
        async: false,
        success: function (result) {
            if (result.tabloID == KisiID) {

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

