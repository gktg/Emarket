var urunler = [];
var KisiID;
$(document).ready(function () {

    KisiID = GetURLParameter();
    FavoriUrunGetir();

})

function FavoriUrunGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/FavoriUrunGetir/" + KisiID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result != null) {
                urunler = result.$values

                UrunTekrarli();



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

function SepeteUrunEkle(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/SepeteUrunEkle/" + urunID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result != null) {
                SepetiGetir()
            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}

function UrunTekrarli() {
    for (var x = 0; x < urunler.length; x++) {

        var html = `    <div class="col-md-3" id="urunDiv${urunler[x].id}">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="${urunler[x].urunMedya}" height="150" width="250" />
                                        <p id="urunAdi${x}">${urunler[x].urunAdi}</p>
                                        <p id="urunFiyati${x}">${urunler[x].urunFiyati} TL</p>
                                        <p id="urunKategori${x}" data-kategoriid="${urunler[x].kategoriID}">${urunler[x].kategoriAdi}</p>
                                        <p id="stok${x}">${urunler[x].stok}</p>
                                        <button class="form-control btnSepet" id="${urunler[x].id}" onclick="SepeteUrunEkle(this.id)">Sepete Ekle</button>
                                    </div>
                                </div>
                            </div>`;
        $("#urunTekrarli").append(html);
    }
}
