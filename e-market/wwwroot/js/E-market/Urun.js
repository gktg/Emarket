var urunler = [];
var kategoriler = [];


$(document).ready(function () {

    UrunleriGetir()
    KategoriGetir()

    $("#drdSirala").on("change", function () {
        var selectedValue = $("#drdSirala").val();
        if (selectedValue == 1) {
            $("#urunTekrarli").find("div[id^='urunDiv']").each(function (x, y) {

                y.remove();
            })

            urunler.sortByKeyAsc("urunFiyati")
            UrunTekrarli(urunler);

        }
        else if (selectedValue == 2) {
            $("#urunTekrarli").find("div[id^='urunDiv']").each(function (x, y) {

                y.remove();
            })

            urunler.sortByKeyDesc("urunFiyati")
            UrunTekrarli(urunler);

        }
    })

})

function UrunleriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/UrunleriGetir/",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            console.log(result)
            if (result != null) {       

                urunler = result.$values;
                UrunTekrarli(urunler);



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





var filtreKategori = [];
function Filtre() {
    filtreKategori = [];
    $("#kategoriTekrarli").find("input[type='checkbox']").each(function (x, y) {
        if ($(y).is(":checked")) {
            $(y).attr("disabled", true)
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
            if (result != null) {
                $("#urunTekrarli").find("div[id^='urunDiv']").each(function (x, y) {

                    y.remove();
                })
                $("#drdSirala").val(0).change();
                urunler = result.$values;
                UrunTekrarli(urunler);

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

        $(y).prop("checked", false)
        $(y).attr("disabled", false)

    })
    $("#drdSirala").val(0).change();

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
                SepetiGetir()
            }
        },
        error: function (e) {

            console.log(e);
        }
    })
}

function FavoriUrunEkle(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/FavoriUrunEkle/" + urunID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result != null) {
                $("#btnFavori" + urunID).attr("src", "/images/heartred.png")
                $("#BtnFavori" + urunID).removeAttr("onclick")
                $("#BtnFavori" + urunID).attr("onclick", `FavoriUrunSil(${urunID})`)
            }
        },
        error: function (e) {

            console.log(e);
        }
    })
    
}
function FavoriUrunSil(urunID) {
    $.ajax({
        type: "Post",
        url: "/emarket/FavoriUrunSil/" + urunID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result != null) {
                $("#btnFavori" + urunID).attr("src", "/images/heartwhite.png")
                $("#BtnFavori" + urunID).removeAttr("onclick")
                $("#BtnFavori" + urunID).attr("onclick", `FavoriUrunEkle(${urunID})`)

            }
        },
        error: function (e) {

            console.log(e);
        }
    })

}

function UrunTekrarli(urunlerList) {
    for (var x = 0; x < urunlerList.length; x++) {
        if (!urunlerList[x].favoriMi) {
            var html = `    <div class="col-md-3" id="urunDiv${urunlerList[x].id}">
                            <div class="card">
                                <div class="card-body">
                                    <img src="${urunlerList[x].urunMedya}" height="150" width="210" />
<div class="row mt-3">
<div class="col-md-12">

                                    <span id="urunAdi${x}">${urunlerList[x].urunAdi}</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-12">

                                    <span id="urunFiyati${x}">${urunlerList[x].urunFiyati} TL</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-12">

                                    <span id="urunKategori${x}" data-kategoriid="${urunlerList[x].kategoriID}">${urunlerList[x].kategoriAdi}</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-9">

                                    <span id="stok${x}" style="vertical-align: -webkit-baseline-middle;">Stok: ${urunlerList[x].stok}
                                    </span>
</div>
<div class="col-md-3">

<button id="BtnFavori${urunlerList[x].id}"  class="btn" onclick="FavoriUrunEkle(${urunlerList[x].id})">
                                        <img id="btnFavori${urunlerList[x].id}" src="/images/heartwhite.png" width="25"/>
</button>
</div>
</div>
                                    <button class="form-control mt-3 btnSepet" id="${urunlerList[x].id}" onclick="SepeteUrunEkle(this.id)">Sepete Ekle</button>
                                </div>
                            </div>
                        </div>`;
            $("#urunTekrarli").append(html);
        }
        else {
            var html = `    <div class="col-md-3" id="urunDiv${urunlerList[x].id}">
                            <div class="card">
                                <div class="card-body">
                                    <img src="${urunlerList[x].urunMedya}" height="150" width="210" />
<div class="row mt-3">
<div class="col-md-12">
                                    <span id="urunAdi${x}">${urunlerList[x].urunAdi}</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-12">
                                    <span id="urunFiyati${x}">${urunlerList[x].urunFiyati} TL</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-12">
                                    <span id="urunKategori${x}" data-kategoriid="${urunlerList[x].kategoriID}">${urunlerList[x].kategoriAdi}</span>
</div>
</div>
<div class="row mt-3">
<div class="col-md-9">
                                    <span id="stok${x}" style="vertical-align: -webkit-baseline-middle;">Stok: ${urunlerList[x].stok}

                                    </span>
</div>
<div class="col-md-3">
<button id="BtnFavori${urunlerList[x].id}" class="btn" onclick="FavoriUrunSil(${urunlerList[x].id})">
                                        <img id="btnFavori${urunlerList[x].id}" src="/images/heartred.png" width="25"/>
</button>
</div>
</div>
                                    <button class="form-control mt-3  btnSepet" id="${urunlerList[x].id}" onclick="SepeteUrunEkle(this.id)">Sepete Ekle</button>
                                </div>
                            </div>
                        </div>`;
            $("#urunTekrarli").append(html);
        }

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

    var sirala = `<div class="col-md-12 mt-3">
                  <select class="form-control" id="drdSirala" >
                        <option value="0">Seçiniz</option>
                        <option value="1">Fiyat Artan</option>
                        <option value="2">Fiyat Azalan</option>
                   </select>
            </div> `
    $("#kategoriTekrarli").append(sirala);
    $("#drdSirala").select2();

}