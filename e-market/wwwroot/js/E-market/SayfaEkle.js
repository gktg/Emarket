var PageModel = {};
var sayfalar;

$(document).ready(function () {

    MakeDatatable("sayfaTable", false)
    SayfaGetir()
})


function ModeleBas() {

    PageModel["PageName"] = $("#txtSayfaAdi").val();
    PageModel["PageUrl"] = "https://localhost:44393/" + $("#txtUrl").val();
    PageModel["Role"] = $("#drdErisim").val();

}


function SayfaEkle() {
    ModeleBas();
    var model = PageModel;
    $.ajax({
        type: "Post",
        url: "/emarket/SayfaEkle/",
        dataType: "json",
        data: model,
        async: false,
        success: function (result) {
            if (result != null) {
                alertim.toast(siteLang.Kaydet, alertim.types.success);
                SayfaGetir()
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}

function SayfaGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/SayfaGetir/",
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result != null) {
                sayfalar = result.$values
                console.log(sayfalar)
                var satirlar;

                for (var i = 0; i < sayfalar.length; i++) {

                    var sayfaAdi = sayfalar[i].pageName == null ? '' : sayfalar[i].pageName;
                    var sayfaUrl = sayfalar[i].pageUrl == null ? '' : sayfalar[i].pageUrl;
                    var sayfaYetki = sayfalar[i].role == null ? '' : sayfalar[i].role;


                    satirlar += "<tr >\
                       <td >"+ sayfaAdi + "</td>\
                        <td >"+ sayfaUrl + "</td>\
                        <td >"+ sayfaYetki + "</td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Getir(" + sayfalar[i].$id + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + sayfalar[i].$id + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";
                }

                $("#tbodySayfa").html(satirlar);
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

function Sil(id) {
    $.ajax({
        type: "Post",
        url: "/emarket/SayfaSil/" + id,
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Sil, alertim.types.success)
                setTimeout(function () {
                    location.href = "SayfaEkle"
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