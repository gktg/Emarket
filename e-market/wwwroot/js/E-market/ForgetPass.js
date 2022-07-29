var mail = "";
function MailGonder() {
     mail = $("#email").val()

    if (mail == "") {
        $('#email').addClass("is-invalid");

        return;
    }
    else {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    }

    $.ajax({
        type: "POST",
        url: "/emarket/MailGonder/",
        dataType: "json",
        data: {mail : mail},
        success: function (result) {
            if (result == true) {
                alert("Mail Gönderildi");
            }
            else {
                $('#email').removeClass("is-valid");
                $('#email').addClass("is-invalid");
                alert("Email Adresiniz Hatalı!");

            }

        },
        error: function (e) {

            console.log(e);
            errorHandler(e);
        }
    });
}