class KurumService {
    loadProfile = function () {
        //var coreUrl = $("#site-urlMedya").val();
        //"http://77.92.105.18:51305";
        //var coreUrl =  "http://172.16.31.10:51305";
        //var coreUrl =  "http://localhost:51305";
        var id = GetURLParameter();
        var url = "/panel/KurumTemelVerileriGetir/" + id;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result.value);
                if (result.value) {
                    var html = "";
                    for (var i = 0; i < result.value.musteriTemsilciIds.length; i++) {
                        html += musteriTems(result.value.musteriTemsilciIds[i]);
                    }
                    $("#musteriTemsilcileri").html(html);

                    var html1 = "";
                    for (var i = 0; i < result.value.kurumTips.length; i++) {
                        html1 += kurumTip(result.value.kurumTips[i]);
                    }
                    $("#kurumTipi").html(html1);
                    $("#kurumAdi").html(result.value.kurumAdi == null ? "" : result.value.kurumAdi);
                    $("#webSitesi").html(result.value.webSitesi == null ? "" : result.value.webSitesi);
                    $("#vergiNo").html(result.value.vergiNo == null ? "" : result.value.vergiNo);
                    $("#vergiDairesiAdi")
                        .html(result.value.kurumVergiDairesiId == null ? "" : result.value.kurumVergiDairesiId);
                    $("#ticaretSicilNo").html(result.value.ticaretSicilNo == null ? "" : result.value.ticaretSicilNo);
                    $("#faxNo").html(result.value.faxNo == null ? "" : result.value.faxNo);
                    $("#epostaAdresi").html(result.value.epostaAdresi == null ? "" : result.value.epostaAdresi);
                    $("#kurulusTarihi").html(result.value.kurulusTarihi == null
                        ? ""
                        : CsharpDateToStringDateyyyymmddForProfile(result.value.kurulusTarihi));
                    $("#kurumUlkeAdi").html(result.value.kurumUlkeAdi == null ? "" : result.value.kurumUlkeAdi);
                    $("#kurumSehirAdi").html(result.value.kurumSehirAdi == null ? "" : result.value.kurumSehirAdi);

                    if (result.value.kurumResimUrl == null) {
                        $('#KurumResimUrl').hide();
                    } else {
                        $('#KurumResimUrl').show();
                        //$('#KurumResimUrl').attr("src", coreUrl + result.value.kurumResimUrl);
                    }

                    var adresBilgiler = result.value.adresListesi;
                    var bankaBilgileri = result.value.bankaListesi;
                    AdresleriBas(adresBilgiler);
                    BankalariBas(bankaBilgileri);
                }
            }
        });

        KurumEkParametrelerGetirLabel(id);
    }
}
function AdresleriBas(adresListesi) {
    var adresSatir = "";
    if (adresListesi.length > 0) {
        for (var i = 0; i < adresListesi.length; i++) {
            var adres = adresListesi[i].adres == null ? '' : adresListesi[i].adres;
            var lokasyonAdi = adresListesi[i].lokasyonAdi == null ? '' : adresListesi[i].lokasyonAdi;
            var sehirAdi = adresListesi[i].sehirAdi == null ? '' : adresListesi[i].sehirAdi;
            var ulkeAdi = adresListesi[i].ulkeAdi == null ? '' : adresListesi[i].ulkeAdi;
            adresSatir += "<tr >\
                    <td >"+ lokasyonAdi + "</td>\
                    <td >"+ ulkeAdi + "</td>\
                    <td >"+ sehirAdi + "</td>\
                    <td >"+ adres + "</td>\
                     </tr>";
        }
    }
    $("#tbodyAdresTable").html(adresSatir);

    $('#adresTable').DataTable({
        "paging": false,
        "responsive": true,
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

function BankalariBas(bankaBilgileri) {
    var adresSatir = "";
    if (bankaBilgileri.length > 0) {
        for (var i = 0; i < bankaBilgileri.length; i++) {
            var iban = bankaBilgileri[i].iban == null ? '' : bankaBilgileri[i].iban;
            var hesapNo = bankaBilgileri[i].hesapNo == null ? '' : bankaBilgileri[i].hesapNo;
            var bankaAdi = bankaBilgileri[i].bankaAdi == null ? '' : bankaBilgileri[i].bankaAdi;
            var subeAdi = bankaBilgileri[i].subeAdi == null ? '' : bankaBilgileri[i].subeAdi;
            adresSatir += "<tr >\
                    <td >"+ bankaAdi + "</td>\
                    <td >"+ subeAdi + "</td>\
                    <td >"+ hesapNo + "</td>\
                    <td >"+ iban + "</td>\
                     </tr>";
        }
    }
    $("#tbodyBankaTable").html(adresSatir);

    $('#bankaTable').DataTable({
        "paging": false,
        "responsive": true,
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
var kurumServiceModel = new KurumService();
$(document).ready(function () {
    kurumServiceModel.loadProfile();
})

function musteriTems(obj) {
    var m = `
    <p>${obj.adSoyad}</p>
`
    return m;
}

function kurumTip(obj) {
    var m = `
    <p>${obj.tanim}</p>
`
    return m;
}