$(document).ready(function () {
    $('#ProfilYeniSifre').on("change", function () {
        if ($('#ProfilYeniSifre').val().length > 0) {
            //if (!CheckStrength()) {
            //    $('#ProfilYeniSifre').addClass("is-invalid");
            //    //is-valid
            //    $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
            //}
            //else {
            //    $('#ProfilYeniSifre').removeClass("is-invalid");
            //    $('#ProfilYeniSifre').addClass("is-valid");
            //    $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
            //}
        } else {
            $('#ProfilYeniSifre').removeClass("is-invalid");
            $('#ProfilYeniSifre').removeClass("is-valid");
            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
        }
    });
    $('#ProfilYeniSifreTekrar').on("change", function () {
        if ($('#ProfilYeniSifreTekrar').val().length > 0) {
            if ($('#ProfilYeniSifre').val() !== $('#ProfilYeniSifreTekrar').val()) {
                $('#ProfilYeniSifreTekrar').addClass("is-invalid");
            }
            else {
                $('#ProfilYeniSifreTekrar').removeClass("is-invalid");
                $('#ProfilYeniSifreTekrar').addClass("is-valid");
            }
        } else {
            $('#ProfilYeniSifre').removeClass("is-invalid");
            $('#ProfilYeniSifre').removeClass("is-valid");
            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
        }
    });
});

function SifreYenile() {
    var sifreModel = {};
    sifreModel["OldPassword"] = $('#ProfilEskiSifre').val();
    sifreModel["NewPassword"] = $('#ProfilYeniSifre').val();
    sifreModel["NewPasswordTekrar"] = $('#ProfilYeniSifreTekrar').val();
    if (!sifreKontrols('ProfilYeniSifre', 'ProfilYeniSifreTekrar', 'strengthMessage')) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/panel/UpdatePassword",
        dataType: "json",
        async: false,
        data: sifreModel,
        success: function (result) {
            if (result.isSuccess) {
                alertim.toast(siteLang.sifreGunc, alertim.types.success);
                Logout();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            return;
        },
    });
}

function sifreKontrols(sifrealani, sifretekrari, mesajdiv) {
    if ($('#' + sifrealani).val() !== $('#' + sifretekrari).val()) {
        $('#' + sifretekrari).addClass("is-invalid");
        return false;
    }
    $('#' + sifretekrari).removeClass("is-invalid");
    $('#' + sifretekrari).addClass("is-valid");
    //if (!CheckStrength()) {
    //    $('#' + sifrealani).addClass("is-invalid");
    //    $('#' + mesajdiv).find("p").addClass('SifreKarmasikUyari');
    //    return false;
    //}
    $('#' + sifrealani).removeClass("is-invalid");
    $('#' + sifrealani).addClass("is-valid");
    $('#' + mesajdiv).find("p").removeClass('SifreKarmasikUyari');
    return true;
}

//function CheckStrength() {
//    return $('#ProfilYeniSifre').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\,\.\?\":{}|<>]).{8,}$/);
//}

function Logout() {
    $.ajax({
        type: "GET",
        url: "/LoginRegister/Logout",
        data: null,
        dataType: "json",
        success: function (data) {
            window.location.href = "/";
        },
        error: function (e) {
            console.log(e);
        }
    });
}