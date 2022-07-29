var urun = {};
var medya = []
var urunID;


$(document).ready(function () {

    urunID = GetURLParameter()

    KategoriGetir()

    if (urunID != "UrunEkleView") {

        $("#btnKaydet").removeClass("btn-primary")
        $("#btnKaydet").removeAttr("onclick")
        $("#btnKaydet").attr("onclick","UrunGuncelle()")
        $("#btnKaydet").addClass("btn-warning")
        $("#btnKaydet").text("Ürün Güncelle")

        UrunBilgileriGetir();
    }
})


function ParamDDLDoldur(alanID, data) {
    var str = "";
    str += "<option value='0'>Seçiniz</option>";
    for (var i of data) {
        var kategoriAdi = i.kategoriAdi == undefined ? i.kategoriAdi : i.kategoriAdi;
        str += "<option value='" + i.kategoriID + "'>" + kategoriAdi + "</option>";
    }
    $("#" + alanID).html(str);
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
                ParamDDLDoldur("drdKategori", result.$values)
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

function UploadFile(id) {
    var fdata = new FormData();
    var fileInput = $('#' + id)[0];
    var file = fileInput.files[0];
    fdata.append("file", file);

    $.ajax({
        type: "POST",
        url: "/emarket/WriteFile/",
        data: fdata,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result != null) {

                console.log(result);
                medya = result
                $("#img").attr("src", result.medyaUrl);
                $("#imgA").show();

            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    });
}

function UrunBilgileriGetir() {
    $.ajax({
        type: "Get",
        url: "/emarket/UrunGetirIDIle/"+urunID,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result != null) {
                console.log(result)
                urun = result;
                $("#txtUrunAdi").val(urun.urunAdi)
                $("#drdKategori").val(urun.kategoriID)
                $("#txtUrunFiyati").val(urun.urunFiyati)
                $("#txtUrunStok").val(urun.stok)
                $("#img").attr("src", urun.urunMedya);
                $("#imgA").show();
                medya["medyaUrl"] = urun.urunMedya;
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}



function UrunuModeleBas() {

    urun = {};

    if (urunID != "UrunEkleView")
    {
        urun["ID"] = urunID

    }
    urun["UrunAdi"] = $("#txtUrunAdi").val()
    urun["KategoriID"] = $("#drdKategori").val()
    urun["UrunFiyati"] = $("#txtUrunFiyati").val()
    urun["Stok"] = $("#txtUrunStok").val()
    urun["UrunMedya"] = medya.medyaUrl


}

function UrunKaydet() {
    UrunuModeleBas()
    console.log(urun);

    $.ajax({
        type: "Post",
        url: "/emarket/UrunEkle/",
        dataType: "json",
        data: urun,
        async: false,
        success: function (result) {
            if (result != null) {
                alertim.toast(siteLang.Kaydet, alertim.types.success);
                setTimeout(function () {
                    location.href = "UrunEkleViewList"
                }, 700)
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}
function UrunGuncelle() {
    UrunuModeleBas()
    console.log(urun);

    $.ajax({
        type: "Post",
        url: "/emarket/UrunGuncelle/",
        dataType: "json",
        data: urun,
        async: false,
        success: function (result) {
            if (result == true) {
                alertim.toast(siteLang.Guncelle, alertim.types.success);
                setTimeout(function () {
                    location.href = "UrunEkleViewList"
                }, 700)
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}