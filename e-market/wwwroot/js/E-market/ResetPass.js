var ResetPassVM = {};


function SifreKarakterKontrol() {
    var sifre = $("#sifre").val()

    console.log(sifre);
    if (sifre.length == 0) {
        $("#sifreMesaj").hide();
        $("#btnregister").prop("disabled", false);
    }
    else if (sifre.length < 8) {
        $("#sifreMesaj").text("Şifreniz 8 karakterden kısa olamaz")
        $("#sifreMesaj").show();
        $("#btnregister").prop("disabled", true);
    }
    else {
        $("#sifreMesaj").hide();
        $("#btnregister").prop("disabled", false);
    }
}

function ModeleBas() {
    ResetPassVM = {};

    ResetPassVM["ID"] = GetURLParameter();
    ResetPassVM["Sifre"] = $("#sifre").val();

    console.log(ResetPassVM);

}


function ResetPass() {
    var sifre = $("#sifre").val()
    var sifreTekrar = $("#sifreTekrar").val()

    if (sifre !== sifreTekrar || sifre == "" || sifreTekrar == "") {
        $('#sifreTekrar').addClass("is-invalid");
        $("#sifreMesaj2").show();
        return;
    }
    $('#sifreTekrar').removeClass("is-invalid");
    $('#sifreTekrar').addClass("is-valid");
    $("#sifreMesaj2").hide();


    ModeleBas()
    var model = ResetPassVM;

    $.ajax({
        type: "POST",
        url: "/emarket/ResetPassVM/",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.sifreGunc, alertim.types.success);

                setTimeout(function () {

                    window.location.href = "/Login";

                }, 1000);
            }
            else {
                alertim.toast(siteLang.SifreHata2, alertim.types.danger);

            }

        },
        error: function (e) {

            console.log(e);
            errorHandler(e);
        }
    });
}