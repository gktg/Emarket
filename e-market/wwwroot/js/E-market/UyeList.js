var uyeler = [];

$(document).ready(function () {

    MakeDatatable("uyeTable", false)
    UyeleriGetir()

})

function UyeleriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/UyeleriGetir/",
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result != null) {
                uyeler = result.$values
                console.log(uyeler)
                var satirlar;

                for (var i = 0; i < uyeler.length; i++) {

                    var kisiAdi = uyeler[i].ad == null ? '' : uyeler[i].ad;
                    var soyAd = uyeler[i].soyad == null ? '' : uyeler[i].soyad;
                    var email = uyeler[i].email == null ? '' : uyeler[i].email;
                    var uyelikTarihi = CSStringDateToStringddmmyyyy(uyeler[i].createdDate) == null ? '' : CSStringDateToStringddmmyyyy(uyeler[i].createdDate);
                    var gonderiSayisi = uyeler[i].gonderi.$values.length;

                    satirlar += "<tr >\
                       <td >"+ kisiAdi + "</td>\
                        <td >"+ soyAd + "</td>\
                        <td >"+ email + "</td>\
                        <td >"+ gonderiSayisi + "</td>\
                        <td >"+ uyelikTarihi + "</td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + uyeler[i].$id + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + uyeler[i].$id + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";
                }

                $("#tbodyUye").html(satirlar);
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

function Goruntule(id) {

    location.href = "Profil/" + id
}

function Sil(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/UrunSil/" + urunID,
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Sil, alertim.types.success)
                setTimeout(function () {
                    location.href = "UrunEkleViewList"
                }, 700)
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

