loginModel = {};
returnurl = "";
if (window.location.href.includes("returnurl=")) {
    returnurl = window.location.href.split("returnurl=/")[1];
}
var isMobile = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) != null;
if (isMobile) {
    if (window.location.href.includes("returnurl=")) {
        window.location.href = "digiforce://" + returnurl;
    }
}

$(document).ready(function () {
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            Login();
        }
    });
});
function Login() {
    loginModel["EmailOrUserName"] = $('#txtMail').val();
    loginModel["Password"] = $('#txtPassword').val();
    loginModel["IpAdress"] = "";
    loginModel["UserAgent"] = "";
    var x = JSON.stringify(loginModel);
    $(".validationMessage ").hide();
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "/LoginRegister/Login",
        data: JSON.stringify(loginModel),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.isSuccess == true) {
                if (data.value.includes("SifreYenile")) {
                    location.href = "/LoginRegister/ResetPassword"; //sifreyenilemesayfası
                } else if (returnurl) {
                    window.location.replace("/" + returnurl);
                }
                else {
                    window.location.replace("/Cleopatra/Dashboard");
                }
            } else {
                var str = data.reasons[0].message;//"Kullanıcı adı ve şifrenizi kontrol ediniz!";
                $('#alertDiv').html(str);
                $('#alertDiv').show();
                $("#loader").hide();
            }
        },
        error: function (e) {
            console.log(e);
            errorHandler(e);
            $("#loader").hide();
        }
    });
}

function ToRegister() {
    location.href = '/LoginRegister/Register';
}