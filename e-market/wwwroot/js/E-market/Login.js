var LoginVm = {};

$(document).ready(function () {

    var count = 2;
    $(".fa-lock").on("click", function () {
        count++;
        if (count % 2 === 0) {
            $("#sifre").attr("type", "password");

        }
        else if (count % 2 === 1) {

            $("#sifre").attr("type", "text");
        }
    })

})

function Login() {
    LoginVm = {}


    LoginVm["Email"] = $("#email").val();
    LoginVm["Sifre"] = $("#sifre").val();

    model = LoginVm;
    $.ajax({
        type: "POST",
        url: "/emarket/LoginKontrol/",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Giris, alertim.types.success);
                setTimeout(function () {

                    window.location.href = "Urunler";

                }, 3000);
            }
            else {
                alertim.toast(siteLang.Giris2, alertim.types.warning);

            }

        },
        error: function (e) {

            console.log(e);
            errorHandler(e);
        }
    });
}

$(".container-fluid").on('keydown', 'input', function (e) {
    if (e.keyCode === 13) {
        Login()
    }
});


