function KisiEkParametrelerGetirNull() {
    $.ajax({
        type: "GET",
        url: "/panel/KisiEkParametreListesi/",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanOlustur(parametreler[i])
                }
                $("#kisiEkBilgiler").html(html);
                if (parametreler.length == 0) {
                    $("#kisiEkBilgiler").parent().hide();
                } else {
                    $("#kisiEkBilgiler").parent().show();
                }
                ZorunluAlanaLabelEkle();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}
function KisiEkParametrelerGetir(id) {
    $.ajax({
        type: "GET",
        url: "/panel/KisiEkParametreListesi/" + id,
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanOlustur(parametreler[i])
                }
                $("#kisiEkBilgiler").html(html);
                if (parametreler.length == 0) {
                    $("#kisiEkBilgiler").parent().hide();
                } else {
                    $("#kisiEkBilgiler").parent().show();
                }
                ZorunluAlanaLabelEkle();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}

function KisiEkParametrelerKayit(kisiID) {
    var post = { IlgiliKisiID: kisiID, Degerler: AlanDegerleriniBul() }

    $.ajax({
        type: "Post",
        url: "/panel/KisiEkParametreKayit",
        dataType: "json",
        data: post,
        async: false,
        success: function (result) {
            if (result.isSuccess) {
                return;
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}

function KisiEkParametrelerGetirLabel(id) {
    $.ajax({
        type: "GET",
        url: "/panel/KisiEkParametreListesi/" + id,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess) {
                var html = "";
                var parametreler = result.value;
                for (var i = 0; i < parametreler.length; i++) {
                    html += AlanGoster(parametreler[i])
                }
                $("#kisiEkBilgiler").html(html);
                if (parametreler.length == 0) {
                    $("#kisiEkBilgiler").parent().hide();
                } else {
                    $("#kisiEkBilgiler").parent().show();
                }
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}