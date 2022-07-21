var RegisterModel = {};

function SifreKarakterKontrol() {
    var sifre = $("#sifre").val()

    console.log(sifre);
    if (sifre.length == 0) {
        $("#sifreMesaj").hide();
        $("#btnregister").prop("disabled", false);
    }
    else if (sifre.length < 8 ) {
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
    RegisterModel = {};

    RegisterModel["ad"] = $("#ad").val();
    RegisterModel["soyad"] = $("#soyad").val();
    RegisterModel["email"] = $("#email").val();
    RegisterModel["sifre"] = $("#sifre").val();

    console.log(RegisterModel);

}


function Register() {
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
    var model = RegisterModel;
   
    $.ajax({
        type: "POST",
        url: "/emarket/Register/",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Kaydet, alertim.types.success)
                $(".form-control").each(function (i, x) {
                    $(x).val("")
                });
                setTimeout(function () {

                    window.location.href = "/emarket/Login";

                }, 1000);
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.warning)

            }


        },
        error: function (e) {

            console.log(e);
        }
    });
}
