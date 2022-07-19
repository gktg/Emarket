var gonderi = {}
var Gonderiler = [];

$(document).ready(function () {
    GonderileriGetir();
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
                $("#cardTekrar").find("div[id^='card']").each(function (x, y) {

                    y.remove();
                })
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
                Gonderiler = result.$values
                GonderileriBas()
                console.log()
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



function GonderileriBas() {

    for (var x = 0; x < Gonderiler.length; x++) {

        var html = `<div class="card" id="card${x}">
            <div class="card-body" id="cardbody${x}">
                <div class="row" id="GonderiTekrar${x}">
                    <div class="col-md-3">
                        <img width="100" height="100" src="/images/generated_photos_5e6813f56d3b380006d7f6e5.jpg" />
                        <p>Graves Hastalığı</p>
                        <p>${Gonderiler[x].register.ad} ${Gonderiler[x].register.soyad}</p>
                        <p>Mesaj Tarihi: ${CSStringDateToStringddmmyyyyhhmm(Gonderiler[x].gonderiTarihi)}</p>
                    </div>
                    <div class="col-md-9">
                        <p>${Gonderiler[x].gonderiPaylasim}</p>
                        <div class="row justify-content-end">
                            <button class="btn" id="btnBegen${x}"><i class="fas fa-thumbs-up"></i>Beğen</button>
                            <button class="btn" id="btnYorum${x}"><i class="fas fa-comment"></i>Yorum Yap</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        $("#cardTekrar").append(html);
    }

}