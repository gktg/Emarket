var KisiID;
var Register = {}
var GuncelleModel = {}
var FavoriKategoriModel = {}
var FavoriKategoriler = []
var FavoriKategorilerInt = []
var KisiGonderileri = []


$(document).ready(function () {

    Email();
    KisiID = $("#site-kisiID").val()
    KategoriGetir()
    KisiBilgileriGetir();
    CustomInputMask(".kisiTelNo");
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
        contentType: "application/json",
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
                KisiGonderileri = KisiModel.gonderi.$values;
                KisiBilgileriniSayfayaBas()

                if (KisiGonderileri != null) {
                    GonderileriTabloBas()
                }
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


function GonderileriTabloBas() {
    var satirlar = "";
    for (var i = 0; i < KisiGonderileri.length; i++) {
        if (KisiGonderileri[i].status != "Deleted")
        satirlar += "<tr >\
                       <td>"+ KisiGonderileri[i].gonderiPaylasim + "</td>\
                        <td >"+ CSStringDateToStringddmmyyyyhhmm(KisiGonderileri[i].gonderiTarihi) + "</td>\
                        <td >"+ KisiGonderileri[i].status + "</td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + KisiGonderileri[i].id + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + KisiGonderileri[i].id + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";
    }
    $("#gonderilerTbody").html(satirlar);
    MakeDatatable("gonderilerTable", false)
}


function KisiBilgileriniSayfayaBas() {

    $("#txtAd").val(KisiModel.ad)
    $("#txtSoyad").val(KisiModel.soyad)
    $("#txtEmail").val(KisiModel.email)
    if (KisiModel.kisiHassasBilgiler != null) {
        $("#txtDogumTarihi").val(CsharpDateToStringDateyyyymmdd(KisiModel.kisiHassasBilgiler.dogumTarihi)).change();
        $("#txtTelefon").val(KisiModel.kisiHassasBilgiler.telefonNumarasi)
        $("#txtAdres").val(KisiModel.kisiHassasBilgiler.adres)
    }

    if (KisiModel.kisiFavoriKategorileri.$values.length > 0)
    {
        $.each(KisiModel.kisiFavoriKategorileri.$values, function (x, y) {

            $("#drdKategori option[value='" + y.kategoriID + "']").prop("selected", true).change();

        })
    }

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
    GuncelKisiBilgileriModeleBas()
    $.ajax({
        type: "Post",
        url: "/emarket/KisiBilgileriGuncelle/",
        dataType: "json",
        data: Register,
        async: false,
        success: function (result) {
            if (result.id == KisiID) {
                KisiModel = result;
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

function Sil(gonderiID) {
    $.ajax({
        type: "Post",
        url: "/emarket/GonderiSil/" + gonderiID,
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result == true) {
                location.reload();
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