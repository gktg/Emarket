
$(document).ready(function () {
    AktivasyonGecerliMi();
});

function AktivasyonGecerliMi() {
    var guid = qstring("g");

    $.ajax({
        type: "POST",
        url: "/LoginRegister/HesapAktivasyonLinkiGecerliMi",
        dataType: "json",
        data: { guid: guid },
        success: function (result) {
            if (!result.value) {
                alertim.toast(siteLang.Hata, alertim.types.danger, function () {
                    location.href = 'LoginRegister/Register';
                });
            }
            else {
                HesapAktiflestirme(guid);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function HesapAktiflestirme(guid) {
    $.ajax({
        type: "POST",
        url: "/LoginRegister/HesapAktiflestirme",
        dataType: "json",
        data: { guid: guid },
        success: function (result) {
            if (result.isSuccess) {
                alertim.toast(siteLang.HesAktif, alertim.types.success);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}

function ToLogin() {
    location.href = '/';
}