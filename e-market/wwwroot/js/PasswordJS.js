

function SifreYenilemeIstegi() {
    var mail = $('#sifreYenileMail').val();
    if (!isEmail(mail)) {
        var str = "Lütfen geçerli bir mail adresi giriniz!";
        $('#alertDiv').html(str);
        $('#alertDiv').addClass("text-danger");
        $('#alertDiv').show();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/LoginRegister/SifreYenilemeIstegi",
        dataType: "json",
        data: { 'mail': mail }, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                var url = result.value.sifreYenilemeSayfasiGeciciUrl;
                var str = "<a href='" + url + "'>Şifre yenileme linkinizi kontrol ediniz!</a>";
                $('#alertDiv').removeClass("text-danger");
                $('#alertDiv').html("Mail adresinize şifre yenileme maili gönderilmiştir.");
                $('#alertDiv').show();
            } else {
                var str = result.reasons[0].message;
                $('#alertDiv').addClass("text-danger");
                $('#alertDiv').html(str);
                $('#alertDiv').show();
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

$(document).ready(function () {
    if (qstring("g").length > 0) {
        AktivasyonGecerliMi();
    }

    $("#sifreYenile").on("change", function () {
        if (!CheckStrength()) {
            $('#sifreYenile').addClass("is-invalid");
            $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
        } else {
            $('#sifreYenile').removeClass("is-invalid");
            $('#sifreYenile').addClass("is-valid");
            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
        }
    })
    $("#sifreYenileTekrar").on("change", function () {
        if ($('#sifreYenile').val() !== $('#sifreYenileTekrar').val()) {
            $('#sifreYenileTekrar').addClass("is-invalid");

        } else {
            $('#sifreYenileTekrar').removeClass("is-invalid");
            $('#sifreYenileTekrar').addClass("is-valid");
        }
    });
});

function AktivasyonGecerliMi() {
    var guid = qstring("g");

    $.ajax({
        type: "POST",
        url: "/LoginRegister/SifreYenilemeGecerliMi",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(guid), // < === this is where the problem was !!
        success: function (result) {
            if (result.value === false) {
                alertim.toast(siteLang.SifreYenilemeSure, alertim.types.warning);
                location.href = '/';
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function SifreYenile() {
    if ($('#sifreYenile').val() !== $('#sifreYenileTekrar').val()) {
        alertim.toast(siteLang.SifreUyum, alertim.types.warning);
        $('#sifreYenileTekrar').addclass("is-invalid");
        return;
    } else {
        $('#sifreYenileTekrar').removeClass("is-invalid");
        $('#sifreYenileTekrar').addClass("is-valid");
        if (!CheckStrength()) {
            alertim.toast(siteLang.SifreHata, alertim.types.warning)
            $('#sifreYenile').addClass("is-invalid");
            //is-valid
            $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
            return;
        }
        else {
            $('#sifreYenile').removeClass("is-invalid");
            $('#sifreYenile').addClass("is-valid");
            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
        }
    }
    var guid = qstring("g");
    var SifreModel = {};
    SifreModel["NewPasswordTekrar"] = $('#sifreYenileTekrar').val();
    SifreModel["NewPassword"] = $('#sifreYenile').val(); //kontrolGUID
    SifreModel["kontrolGUID"] = guid;
    $.ajax({
        type: "POST",
        url: "/LoginRegister/SifreYenile",
        dataType: "json",
        data: SifreModel, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                alertim.toast(siteLang.sifreYenile, alertim.types.success, function () {
                    location.href = '/';
                });
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function CheckStrength() {
    return $('#sifreYenile').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\,\.\?\":{}|<>]).{8,}$/);

}




