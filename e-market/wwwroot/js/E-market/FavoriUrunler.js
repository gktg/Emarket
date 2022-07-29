var urunler = [];
var kategoriler = [];
var KisiID;
$(document).ready(function () {

    KisiID = $("#site-kisiID").val()
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
            if (result.$values.length != 0) {
                urunler = result.$values

                UrunTekrarli(urunler);



            }
            else {
                alertim.toast(siteLang.FavoriUrunYok, alertim.types.danger);
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
                $("#urunTekrarli").find("[id^='urunDiv']").each(function (i, e) {
                    $(e).remove()
                })
                FavoriUrunGetir()
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
                                    <img src="${urunlerList[x].urunMedya}" height="150" width="250" />
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
