var urunler = [];
var kategoriler = [];

$(document).ready(function () {

    UrunleriGetir()
    KategoriGetir()
    

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
            if (result != null) {
                urunler = result.$values;

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

function KategoriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/KategoriGetir/",
        dataType: "json",
        contentType: "application/json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result != null) {
                kategoriler = result.$values;
                KategoriTekrarli()

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

function UrunTekrarli() {
    for (var x = 0; x < urunler.length; x++) {

        var html = `    <div class="col-md-3" id="urunDiv${urunler[x].id}">
                            <div class="card">
                                <div class="card-body">
                                    <img src="${urunler[x].urunMedya}" height="150" width="210" />
                                    <p id="urunAdi${x}">${urunler[x].urunAdi}</p>
                                    <p id="urunFiyati${x}">${urunler[x].urunFiyati}</p>
                                    <p id="urunKategori${x}" data-kategoriid="${urunler[x].kategoriID}">${urunler[x].kategoriAdi}</p>
                                    <p id="stok${x}">${urunler[x].stok}</p>
                                    <button class="form-control btnSepet" id="${urunler[x].id}" onclick="SepeteUrunEkle(this.id)">Sepete Ekle</button>
                                </div>
                            </div>
                        </div>`;
        $("#urunTekrarli").append(html);
    }
}

function KategoriTekrarli() {
    for (var y = 0; y < kategoriler.length; y++) {
        var html = `<div class="col-md-12" id="kategoriDiv${kategoriler[y].kategoriID}">
                <input class="mr-2" name="${kategoriler[y].kategoriAdi}" data-id="${kategoriler[y].kategoriID}" type="checkbox"/><span">${kategoriler[y].kategoriAdi}</span>
            </div> `;
        $("#kategoriTekrarli").append(html);
    }
    var btn = `<div class="col-md-12 mt-3">
                <button class="form-control" onclick="Filtre()">Filtre Uygula</button>
                <button class="form-control mt-2" onclick="FiltreTemizle()">Filtreleri Temizle</button>
            </div> `;
    $("#kategoriTekrarli").append(btn);


}



var filtreKategori = [];
function Filtre() {
    filtreKategori = [];
    $("#kategoriTekrarli").find("input[type='checkbox']").each(function (x, y) {
        if ($(y).is(":checked")) {
            $(y).attr("disabled",true)
            var filtre = (y).getAttribute("data-id");
            filtreKategori.push(parseInt(filtre));

        }

    })
    FiltreliUrunGetir()
}

function FiltreliUrunGetir() {
    $.ajax({
        type: "Post",
        url: "/emarket/FiltreliUrunGetir/",
        dataType: "json",
        data: { idList: filtreKategori },
        success: function (result) {
            console.log(result)
            if (result != null) {
                $("#urunTekrarli").find("div[id^='urunDiv']").each(function (x, y) {

                    y.remove();
                })
                urunler = result.$values;
                UrunTekrarli();

            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}

function FiltreTemizle() {

    $("#urunTekrarli").find("div[id^='urunDiv']").each(function (x, y) {

        y.remove();
    })
    $("#kategoriTekrarli").find("input[type='checkbox']").each(function (x, y) {

        $(y).prop("checked",false)
        $(y).attr("disabled", false)

    })

    UrunleriGetir()
}


function SepeteUrunEkle(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/SepeteUrunEkle/" + urunID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result != null) {
                SepetiGetir();
            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}

