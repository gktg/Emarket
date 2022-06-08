var KisiID;
var GuncelleModel = {}
var RegisterProfil = {}
var KisiHassasBilgilerProfil = {}

$(document).ready(function () {

    Email();
    KisiID = GetURLParameter();
    KisiBilgileriGetir();

    CustomInputMask(".kisiTelNo");
    //PhoneMask();

})



function KisiBilgileriGetir() {
    $.ajax({

        type: "Get",
        url: "/emarket/KisiBilgileriGetir/" + KisiID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result.registerProfil.id == KisiID) {

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
    
    RegisterProfil["KisiHassasBilgilerProfil"] = KisiHassasBilgilerProfil

    GuncelleModel["RegisterProfil"] = RegisterProfil;
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
