function KurumEkParametrelerGetirNULL() {
    $.ajax({
        type: "GET",
        url: "/panel/EkParametreListesi",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanOlustur(parametreler[i])
                }
                $("#kurumEkBilgiler").html(html);
                if (parametreler.length == 0) {
                    $("#kurumEkBilgiler").parent().hide();
                } else {
                    $("#kurumEkBilgiler").parent().show();
                }

                ZorunluAlanaLabelEkle();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function KurumEkParametrelerGetir(id) {
    $.ajax({
        type: "GET",
        url: "/panel/EkParametreListesi/" + id,
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanOlustur(parametreler[i])
                }
                $("#kurumEkBilgiler").html(html);
                if (parametreler.length == 0) {
                    $("#kurumEkBilgiler").parent().hide();
                } else {
                    $("#kurumEkBilgiler").parent().show();
                }

                ZorunluAlanaLabelEkle();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function KurumEkParametrelerGetirLabel(id) {
    $.ajax({
        type: "GET",
        url: "/panel/EkParametreListesi/" + id,
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanGoster(parametreler[i])
                }
                $("#kurumEkBilgiler").html(html);
                KurumEkparamLabelClassEkle();
                if (parametreler.length == 0) {
                    $("#kurumEkBilgiler").parent().hide();
                } else {
                    $("#kurumEkBilgiler").parent().show();
                }
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function KurumEkParametrelerKayit(kurumID) {
    var post = { IlgiliKurumID: kurumID, Degerler: AlanDegerleriniBul() }

    $.ajax({
        type: "Post",
        url: "/panel/EkParametreKayit",
        dataType: "json",
        data: post,
        async: false,
        success: function (result) {
            console.log(result);
            if (result.isSuccess == true) {
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function KurumEkparamLabelClassEkle() {
    $('#kurumEkBilgiler label').each(function () {
        $(this).addClass("Lbl");
    })
}