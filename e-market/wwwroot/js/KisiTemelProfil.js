var KisiTemelKayitModel = {};
var KisiTemelViewModel = {};
var AdresModel = {};
var OkulModel = {};
var TelefonModel = {};
var DilModel = {};

var AdresListesi = [];
var OkulListesi = [];
var TelefonListesi = [];
var DilListesi = [];
var kisiID;

var KurumListForDDL = [];
var UlkeListforDDL = [];
var SehirListforDDL = [];
var CinsiyetListforDDL = [];
var YabanciDilTipiListForDDL = [];
var MedeniHalListForDDL = [];
var OkulTipiListForDDL = [];
var ATipiListForDDL = [];
var TelefonTipiListForDDL = [];
var OrgListForDLL = [];
var kurumOrgBirimDetay = {};
var kisiAdresSehirVerileri = [];
var kisiAdresSehirModel = {};

$(document).ready(function () {
    AdminMi();
    kisiID = GetURLParameter();
    KisiVerileriniGetir();
});

function KisiVerileriniGetir() {
    $.ajax({
        type: "GET",
        async: false,
        url: "/panel/KisiTemelKayitVerileriGetirView/" + kisiID,
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                KisiTemelKayitModel = result.value;
                console.log(KisiTemelKayitModel);
                KisiVerileriniSayfayaBas();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    KisiEkParametrelerGetirLabel(kisiID);
}

function KisiVerileriniSayfayaBas() {
    $('#Kurum').text(KisiTemelKayitModel.kurum == null ? "" : KisiTemelKayitModel.kurum);
    /* $('#Departman').text(KisiTemelKayitModel.departman == null ? "" : KisiTemelKayitModel.departman);*/
    $('#Pozisyon').text(KisiTemelKayitModel.pozisyon == null ? "" : KisiTemelKayitModel.pozisyon);
    $('#Rol').text(KisiTemelKayitModel.rol == null ? "" : KisiTemelKayitModel.rol);
    /*   $('#Lokasyon').text(KisiTemelKayitModel.lokasyon == null ? "" : KisiTemelKayitModel.lokasyon);*/
    $("#IseGirisTarihi").text(KisiTemelKayitModel.iseGirisTarihi.includes("0001-01-01T00:00:00") ? "" : CsharpDateToStringDateyyyymmddForProfile(KisiTemelKayitModel.iseGirisTarihi));
    $("#Ad").text(KisiTemelKayitModel.adi == null ? "" : KisiTemelKayitModel.adi);
    $("#Soyad").text(KisiTemelKayitModel.soyadi == null ? "" : KisiTemelKayitModel.soyadi);
    $("#Sicil").text(KisiTemelKayitModel.sicilNo == null ? "" : KisiTemelKayitModel.sicilNo);
    $("#Tc").text(KisiTemelKayitModel.tcKimlikNo == null ? "" : KisiTemelKayitModel.tcKimlikNo);
    $("#Eposta").text(KisiTemelKayitModel.epostaAdresi == null ? "" : KisiTemelKayitModel.epostaAdresi);
    $("#Baba").text(KisiTemelKayitModel.babaAdi == null ? "" : KisiTemelKayitModel.babaAdi);
    $("#Ana").text(KisiTemelKayitModel.anneAdi == null ? "" : KisiTemelKayitModel.anneAdi);
    $('#Din').text(KisiTemelKayitModel.dini == null ? "" : KisiTemelKayitModel.dini);
    $('#Medeni').text(KisiTemelKayitModel.medeniHali == null ? "" : KisiTemelKayitModel.medeniHali);
    $('#Cins').text(KisiTemelKayitModel.cinsiyeti == null ? "" : KisiTemelKayitModel.cinsiyeti);
    $('#DogduguUlke').text(KisiTemelKayitModel.dogduguUlke == null ? "" : KisiTemelKayitModel.dogduguUlke);
    $('#DogduguSehir').text(KisiTemelKayitModel.dogduguSehir == null ? "" : KisiTemelKayitModel.dogduguSehir);
    $("#DogumTarihi").text(KisiTemelKayitModel.dogumTarihi.includes("0001-01-01T00:00:00") ? "" : CsharpDateToStringDateyyyymmddForProfile(KisiTemelKayitModel.dogumTarihi));
    var adresListesi = KisiTemelKayitModel.adresListesi;
    var okulListesi = KisiTemelKayitModel.okulListesi;
    var dilListesi = KisiTemelKayitModel.dilListesi;
    var telefonListesi = KisiTemelKayitModel.telefonListesi;
    AdresleriBas(adresListesi);
    OkulBas(okulListesi);
    TelefonBas(telefonListesi);
    YabancDilBas(dilListesi);

    //$("[id^=TelefonTekrar_]").each(function (i, e) {
    //    $(e).find("[id^='TelefonTipi']").text(KisiTemelKayitModel.telefonListesi[i].telefonTipi == null ? "" : KisiTemelKayitModel.telefonListesi[i].telefonTipi);
    //    $(e).find("[id^='TelefonNo']").text(KisiTemelKayitModel.telefonListesi[i].telefonNo == null ? "" : KisiTemelKayitModel.telefonListesi[i].telefonNo);
    //});
}
function AdresleriBas(adresListesi) {
    var adresSatir = "";
    if (adresListesi.length > 0) {
        for (var i = 0; i < adresListesi.length; i++) {
            var adresTipi = adresListesi[i].adresTipi == null ? "" : adresListesi[i].adresTipi;
            var ulke = adresListesi[i].ulke == null ? "" : adresListesi[i].ulke;
            var sehir = adresListesi[i].sehir == null ? "" : adresListesi[i].sehir;
            var adres = adresListesi[i].adres == null ? "" : adresListesi[i].adres;
            adresSatir += "<tr >\
                    <td >"+ adresTipi + "</td>\
                    <td >"+ ulke + "</td>\
                    <td >"+ sehir + "</td>\
                    <td >"+ adres + "</td>\
                     </tr>";
        }
    }
    $("#tbodyAdresTable").html(adresSatir);

    $('#adresTable').DataTable({
        "paging": false,
        "responsive": false,
        "order": [],
        "language": {
            "lengthMenu": siteLang.lengthComputable,
            "info": siteLang.info,
            "searchPlaceholder": siteLang.searchPlaceholder,
            "zeroRecords": siteLang.zeroRecords,
            "paginate": {
                "infoEmpty": siteLang.infoEmpty,
                "first": siteLang.First,
                "last": siteLang.Last,
                "next": siteLang.Next,
                "previous": siteLang.Previous,
            }
        },
        //"language": {
        //    "url": siteLang.DataTableLang
        //},
    });
}

function OkulBas(okulListesi) {
    var Satir = "";
    if (okulListesi.length > 0) {
        for (var i = 0; i < okulListesi.length; i++) {
            var okulTipi = okulListesi[i].okulTipi == null ? "" : okulListesi[i].okulTipi;
            var okulAdi = okulListesi[i].okulAdi == null ? "" : okulListesi[i].okulAdi;
            var fakulte = okulListesi[i].fakulte == null ? "" : okulListesi[i].fakulte;
            Satir += "<tr >\
                    <td >"+ okulTipi + "</td>\
                    <td >"+ okulAdi + "</td>\
                    <td >"+ fakulte + "</td>\
                    <td >"+ (okulListesi[i].mezuniyetTarihi.includes("0001-01-01T00:00:00") ? "" : CsharpDateToStringDateyyyymmddForProfile(KisiTemelKayitModel.okulListesi[i].mezuniyetTarihi)) + "</td>\
                     </tr>";
        }
    }
    $("#tbodyOkulTable").html(Satir);

    $('#okulTable').DataTable({
        "paging": false,
        "responsive": false,
        "order": [],
        "language": {
            "lengthMenu": siteLang.lengthComputable,
            "info": siteLang.info,
            "searchPlaceholder": siteLang.searchPlaceholder,
            "zeroRecords": siteLang.zeroRecords,
            "paginate": {
                "infoEmpty": siteLang.infoEmpty,
                "first": siteLang.First,
                "last": siteLang.Last,
                "next": siteLang.Next,
                "previous": siteLang.Previous,
            }
        },
        //"language": {
        //    "url": siteLang.DataTableLang
        //},
    });
}

function YabancDilBas(dilListesi) {
    var adresSatir = "";
    if (dilListesi.length > 0) {
        for (var i = 0; i < dilListesi.length; i++) {
            var yabanciDilTipi = dilListesi[i].yabanciDilTipi == null ? "" : dilListesi[i].yabanciDilTipi;
            var dilSeviye = dilListesi[i].dilSeviye == null ? "" : dilListesi[i].dilSeviye;
            adresSatir += "<tr >\
                    <td >"+ yabanciDilTipi + "</td>\
                    <td >"+ dilSeviye + "</td>\
                     </tr>";
        }
    }
    $("#dilBodyTable").html(adresSatir);

    $('#dilTable').DataTable({
        "paging": false,
        "responsive": false,
        "order": [],
        "language": {
            "lengthMenu": siteLang.lengthComputable,
            "info": siteLang.info,
            "searchPlaceholder": siteLang.searchPlaceholder,
            "zeroRecords": siteLang.zeroRecords,
            "paginate": {
                "infoEmpty": siteLang.infoEmpty,
                "first": siteLang.First,
                "last": siteLang.Last,
                "next": siteLang.Next,
                "previous": siteLang.Previous,
            }
        },
        //"language": {
        //    "url": siteLang.DataTableLang
        //},
    });
}

function TelefonBas(telefonListesi) {
    var adresSatir = "";
    if (telefonListesi.length > 0) {
        for (var i = 0; i < telefonListesi.length; i++) {
            var telefonTipi = telefonListesi[i].telefonTipi == null ? "" : telefonListesi[i].telefonTipi;
            var telefonNo = telefonListesi[i].telefonNo == null ? "" : telefonListesi[i].telefonNo;
            adresSatir += "<tr >\
                    <td >"+ telefonTipi + "</td>\
                    <td >"+ telefonNo + "</td>\
                     </tr>";
        }
    }
    $("#telBody").html(adresSatir);

    $('#telTable').DataTable({
        "paging": false,
        "responsive": false,
        "order": [],
        "language": {
            "lengthMenu": siteLang.lengthComputable,
            "info": siteLang.info,
            "searchPlaceholder": siteLang.searchPlaceholder,
            "zeroRecords": siteLang.zeroRecords,
            "paginate": {
                "infoEmpty": siteLang.infoEmpty,
                "first": siteLang.First,
                "last": siteLang.Last,
                "next": siteLang.Next,
                "previous": siteLang.Previous,
            }
        },
        //"language": {
        //    "url": siteLang.DataTableLang
        //},
    });
}

function TekrarliAlanAddClickForAdres(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    $("." + alanID + "tekrarBtnGrp").hide();
    $("." + alanID + "tekrarBtnGrp").last().show();
    $("." + alanID + "RemoveButton").hide();
    $("." + alanID + "RemoveButton").last().show();
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "" + newID);
        $(e).val("");
    });
    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "" + newID);
        var id = $(e).attr("id");
        if (id.includes("Adres")) {
            ParamDDLDoldur(id, ATipiListForDDL);
        } else if (id.includes("Okul")) {
            ParamDDLDoldur(id, OkulTipiListForDDL);
        } else if (id.includes("Telefon")) {
            ParamDDLDoldur(id, TelefonTipiListForDDL);
        } else if (id.includes("YabanciDil")) {
            ParamDDLDoldur(id, YabanciDilTipiListForDDL);
        }

        if ($(e).attr("id").includes("Ulke")) {
            ParamDDLDoldur(id, UlkeListforDDL);
            $(e).attr("onchange", "SehirListGetir('Sehir" + newID + "',$('#Ulke" + newID + "').val())");
        }
    });

    if ($("." + alanID + "Tekrar").length == 2) {
        $("." + alanID + "AddButton").hide();
    }
}

function TekrarliAlanAddClickDiger(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    $("." + alanID + "tekrarBtnGrp").hide();
    $("." + alanID + "tekrarBtnGrp").last().show();
    $("." + alanID + "RemoveButton").hide();
    $("." + alanID + "RemoveButton").last().show();
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "" + newID);
        $(e).val("");
    });
    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "" + newID);
        //var id = $(e).attr("id");
        //ParamDDLDoldur(id, alanID + "TipiListforDDL");
    });

    if ($("." + alanID + "Tekrar").length == 2) {
        $("." + alanID + "AddButton").hide();
    }
}

function AdminMi() {
    $.ajax({
        type: "GET",
        url: "/home/AdminMi",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.isSuccess == true) {
                if (result.value == false) {
                    $("#Rl").hide();
                    return;
                }
                $("#Rl").show();
                $("#Krm").removeClass("col-4").addClass("col");
                $("#Pzsyn").removeClass("col-4").addClass("col");
                $("#Grs").removeClass("col-4").addClass("col");
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}