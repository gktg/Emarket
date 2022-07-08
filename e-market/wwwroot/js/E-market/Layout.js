var sepet = [];
var toplamUcret = 0;
var sepetUzunluk = 0;
$(document).ready(function () {

    $('select:not(".select2-hidden-accessible,[data-role]")').select2();
    SepetiGetir()


})

$(document).on('click', '.container-fluid .dropdown-menu', function (e) {
    e.stopPropagation();
});

function SepetiGetir() {
    $.ajax({
        type: "get",
        url: "/emarket/SepetiGetir/",
        dataType: "json",
        data: null,
        success: function (result) {
            sepet = [];
            toplamUcret = 0;
            sepetUzunluk = 0;
            if (result != null) {
                sepet = result.$values;
                console.log(sepet)
                $.each(sepet, function (x, y) {
                    toplamUcret += parseFloat(y.urunFiyati)
                    sepetUzunluk += y.miktar
                });
                SepetTekrarli()


            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}


function SepettenUrunSil(id) {
    $.ajax({
        type: "Post",
        url: "/emarket/SepettenUrunSil/" + id,
        dataType: "json",
        data: null,
        success: function (result) {
            sepet = [];
            toplamUcret = 0;
            sepetUzunluk = 0;
            if (result != null) {
                sepet = result.$values;
                console.log(sepet)
                $.each(sepet, function (x, y) {
                    toplamUcret += parseFloat(y.urunFiyati)
                    sepetUzunluk += y.miktar
                });
                SepetTekrarli()

            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}



function SepetTekrarli() {
    $("#sepetDiv").find(".cart-detail").each(function (i, e) {
        $(e).remove()
    })
    $(".badge").text(sepetUzunluk)
    $("#total").text(toplamUcret + " TL")
    $.each(sepet, function (x, y) {
        var sepetHtml = ` <div class="row cart-detail">
                                <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                                    <img src="${y.urunMedya}">
                                </div>
                                <div class="col-lg-8 col-sm-8 col-8 cart-detail-product">
                                    <p>${y.urunAdi}</p>
                                    <span class="price text-info">${y.urunFiyati} TL</span>
                                    <span class="count"> Quantity:${y.miktar}</span>
                                    <span id="${y.id}" onclick="SepettenUrunSil(this.id)"><i class="fas fa-trash-alt"></i></span>
                                </div>
                            </div>`;
        $("#sepetDiv").append(sepetHtml);

    });



}
