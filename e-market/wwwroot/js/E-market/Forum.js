var gonderi = {}

$(document).ready(function () {
    var x = 0;
    $("#btnBegen").on("click", function () {
        x++
        if (x % 2 == 0) {
            $("#btnBegen").css("color", "gray");
        }
        else {
            $("#btnBegen").css("color", "blue");
        }
    })

    var y = 0;
    $("#btnYorum").on("click", function () {
        y++
        if (y % 2 == 0) {
            $("#btnYorum").css("color", "gray");
        }
        else {
            $("#btnYorum").css("color", "blue");
        }
    })
    ClassicEditor
        .create(document.querySelector('#editor'), {
            toolbar: []

        })
        .then(editor => {
            myEditor = editor;
        })
        .catch(error => {
            console.log(error);
        });

    $("#btnKaydet").on("click", function () {
        GonderiKaydet()
    })

})


function GonderiKaydet() {
    var data = myEditor.getData();
    gonderi["GonderiPaylasim"] = data.substring(3, data.length - 4);

    $.ajax({
        type: "Post",
        url: "/emarket/GonderiKaydet/",
        dataType: "json",
        data: gonderi,
        async: false,
        success: function (result) {
            if (result != null) {
                $('#GonderiModel').modal('hide');
                alertim.toast(siteLang.Kaydet, alertim.types.success);
                myEditor.setData("<p></p>");
                GonderileriGetir()
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}

function GonderileriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/GonderileriGetir/",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result != null) {

            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.warning)

            }


        },
        error: function (e) {

            console.log(e);
        }
    })
}