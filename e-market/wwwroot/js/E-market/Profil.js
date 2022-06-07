var KisiID;
var KisiModel = {};
var GuncellKisiModel = {};

$(document).ready(function () {

    Email();
    KisiID = GetURLParameter();
    KisiBilgileriGetir();


})



function KisiBilgileriGetir() {
    $.ajax({

        type: "Get",
        url: "/emarket/KisiBilgileriGetir/" + KisiID,
        dataType: "json",
        data: null,
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


function KisiBilgileriniSayfayaBas() {

    $("#txtAd").val(KisiModel.ad)
    $("#txtSoyad").val(KisiModel.soyad)
    $("#txtEmail").val(KisiModel.email)
}

function GuncelKisiBilgileriModeleBas(){

    GuncellKisiModel["TabloID"] = KisiID;
    GuncellKisiModel["Ad"] = $("#txtAd").val()
    GuncellKisiModel["Soyad"] = $("#txtSoyad").val()
    GuncellKisiModel["Email"] = $("#txtEmail").val()

    console.log(GuncellKisiModel)
}


function KisiBilgileriGuncelle() {

    GuncelKisiBilgileriModeleBas();
    model = GuncellKisiModel;

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
