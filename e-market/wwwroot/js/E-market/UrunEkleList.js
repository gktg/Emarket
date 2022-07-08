var kategoriler = [];
var urunler = [];

$(document).ready(function () {

    MakeDatatable("urunTable", false)
    KategoriGetir()
    KisiEkledigiUrunGetir()


})



function KategoriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/KategoriGetir/",
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result != null) {
                kategoriler = result.$values
                console.log(kategoriler)
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


function KisiEkledigiUrunGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/KisiEkledigiUrunGetir/",
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result != null) {
                urunler = result.$values;
                console.log(urunler)
                var satirlar;

                for (var i = 0; i < urunler.length; i++) {

                    var urunAdi = urunler[i].urunAdi == null ? '' : urunler[i].urunAdi;
                    var urunFiyati = urunler[i].urunFiyati == null ? '' : urunler[i].urunFiyati;
                    var stok = urunler[i].stok == null ? '' : urunler[i].stok;
                    var kategoriAdi = kategoriler.find(x => x.$id == urunler[i].kategoriID).kategoriAdi;

                    satirlar += "<tr >\
                       <td >"+ urunAdi + "</td>\
                        <td >"+ kategoriAdi + "</td>\
                        <td >"+ urunFiyati + "</td>\
                        <td >"+ stok + "</td>\
                        <td ><a id='imgA("+ urunler[i].id + ")'><img id='img' width='75' height='75' src='" + urunler[i].urunMedya + "' /></a></td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + urunler[i].id + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + urunler[i].id + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";
                }

                $("#tbodyUrun").html(satirlar);

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

    location.href ="/emarket/UrunEkleView/"+id
}

function Sil(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/UrunSil/"+urunID,
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Sil, alertim.types.success)
                setTimeout(function () {
                    location.href = "/emarket/UrunEkleViewList"
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