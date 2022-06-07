var LoginVm = {};

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
                window.location.href = "Dashboard";
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