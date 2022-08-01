var gonderi = {}
var Gonderiler = [];

$(document).ready(function () {
    GonderileriGetir();



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
                        <p>${Gonderiler[x].ad} ${Gonderiler[x].soyad}</p>
                        <p>Mesaj Tarihi: ${CSStringDateToStringddmmyyyyhhmm(Gonderiler[x].gonderiTarihi)}</p>
                    </div>
                    <div class="col-md-9">
                        <p>${Gonderiler[x].gonderiPaylasim}</p>
                        <div class="row justify-content-end">
                            <button class="btn" id="btnBegen${x}" onclick="Begen(this.id)"><i class="fas fa-thumbs-up"></i>Beğen</button>
                            <button class="btn" id="btnYorum${x}" onclick="YorumYap(this.id)"><i class="fas fa-comment"></i>Yorum Yap</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer" id="YorumTekrar"></div>
        </div>`;

        $("#cardTekrar").append(html);
    }

}

function Begen(id) {

    $("#" + id).css("color", "blue");
    $("#" + id).attr("onclick", "Begenme(this.id)");


}

function Begenme(id) {

    $("#" + id).removeAttr("style");
    $("#" + id).attr("onclick", "Begen(this.id)");

}

function YorumYap(id) {

    $("#" + id).css("color", "blue");
    $("#" + id).attr("onclick", "YorumIptal(this.id)");

    var lastIndex = id.lastIndexOf("m")
    var ID = (id.substring(lastIndex + 1))
    var html = `
                <div class="row" id="yorum${id}"><div class="col-md-12 text-right">
                <textarea class="form-control"></textarea>
                <button class="btn" id="btnYorumKaydet"></i>Yorum Kaydet</button>
                </div>
                </div>`;
    $("#YorumTekrar").append(html);
}

function YorumIptal(id) {

    $("#" + id).removeAttr("style");
    $("#" + id).attr("onclick", "YorumYap(this.id)");

    $("#yorum" + id).remove();
}
