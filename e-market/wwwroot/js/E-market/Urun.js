var data;
$(document).ready(function () {

    UrunleriGetir()

})

function UrunleriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/UrunGetir/",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            data = result.$values;
            if (result != null) {
                for (var i = 0; i < data.length; i++) {

                    UrunTekrarli();
                    $("#urunMedya" + i).attr("src", data[i].urunMedya)
                    $("#urunAdi" + i).text(data[i].urunAdi)
                    $("#urunFiyati" + i).text(data[i].urunFiyati)
                    $("#stok" + i).text("Stok: " + data[i].stok)
                }


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

var x = 0;
function UrunTekrarli() {
    var html = `    <div class="col-md-3" id="urunDiv${x}">
                            <div class="card">
                                <div class="card-body">
                                    <img id="urunMedya${x}" height="150" width="250" />
                                    <p id="urunAdi${x}" ></p>
                                    <p id="urunFiyati${x}" ></p>
                                    <p id="stok${x}"></p>
                                    <button class="form-control buttonfocus" onclick="ButttonCss(this.id)" id="${x}">Sepete Ekle</button>
                                </div>
                            </div>
                        </div>`;
    x++;
    $("#urunTekrarli").append(html);



}

function ButttonCss(id) {
    setTimeout(function () {
        $('#' + id).removeClass('buttonfocus')
    }, 3000);
}