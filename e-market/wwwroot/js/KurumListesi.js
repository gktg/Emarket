var kurumId = 0;
var musteriIds = [];
var digeriIds = [];
$(function () {
    $('#ekleHeaderbtn').on('click', function () {
        location.href = "/panel/CompanyDefinition";
    });
    loadKurumID();
    IliskiList();
    KurumVerileriniGetirM();
    $("#kurumTab-aktif-tab").on("click", function () {
        KurumVerileriniGetirM();
    })

    $("#kurumTab-pasif-tab").on("click", function () {
        KurumVerileriniGetirD();
    })
});

function KurumVerileriniGetirD() {
    $.ajax({
        type: "GET",
        //url: "/panel/KurumListForKurum",
        url: "/panel/AmirTemsilciyeGoreKurumListesi",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                $("#KurumListesiTable").DataTable().destroy();
                var satirlar = "";
                var list = [];
                if (digeriIds.length > 0) {
                    digeriIds.forEach(function (item) {
                        result.value.forEach(function (a) {
                            if (a.tabloID == item) {
                                list.push(a);
                            }
                        });
                    })
                }
                data = list;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].aktifMi == 1) {
                            var kurumKisaUnvan = data[i].kurumKisaUnvan == null ? '' : data[i].kurumKisaUnvan;
                            var kurulusTarihi = data[i].kurulusTarihi == null ? '' : CsharpDateToStringDateyyyymmddForProfile(data[i].kurulusTarihi)
                            var ticaretSicilNo = data[i].ticaretSicilNo == null ? '' : data[i].ticaretSicilNo;
                            var kurumVergiNo = data[i].kurumVergiNo == null ? '' : data[i].kurumVergiNo
                            var webSitesi = data[i].webSitesi == null ? '' : data[i].webSitesi
                            var epostaAdresi = data[i].epostaAdresi == null ? '' : data[i].epostaAdresi;
                            satirlar += "<tr >\
                   <td >"+ kurumKisaUnvan + "</td>\
                    <td >"+ kurulusTarihi + "</td>\
                    <td >"+ ticaretSicilNo + "</td>\
                    <td >"+ kurumVergiNo + "</td>\
                    <td >"+ webSitesi + "</td>\
                    <td >"+ epostaAdresi + "</td>\
                    <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + data[i].tabloID + ")'> <img src='/img/eye.svg'/> </button>\
                    <button type='button' class='btn ' onclick='GuncelleSayfasınaGit(" + data[i].tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                    <button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'> <img src='/img/trash.svg'/> </button></td>\
                     </tr>";
                        }
                    }
                }

                $("#tbody").html(satirlar);

                $('#KurumListesiTable').DataTable({
                    "paging": true,
                    "responsive": true,
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
                    "dom": 'Bfrtip',
                    "buttons": [
                        {
                            "extend": 'excel',
                            "text": siteLang.ExceleAktar,
                            "className": "btn btn-success",
                            "exportOptions": {
                                "columns": ":not(:last-child)"
                            }
                        }
                    ]
                })
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function KurumVerileriniGetirM() {
    $.ajax({
        type: "GET",
        //url: "/panel/KurumListForKurum",
        url: "/panel/AmirTemsilciyeGoreKurumListesi",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                $("#KurumListesiTable").DataTable().destroy();
                var satirlar = "";
                var list = [];
                if (musteriIds.length > 0) {
                    musteriIds.forEach(function (item) {
                        result.value.forEach(function (a) {
                            if (a.tabloID == item) {
                                list.push(a);
                            }
                        });
                    })
                }
                data = list;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].aktifMi == 1) {
                            var kurumKisaUnvan = data[i].kurumKisaUnvan == null ? '' : data[i].kurumKisaUnvan;
                            var kurulusTarihi = data[i].kurulusTarihi == null ? '' : CsharpDateToStringDateyyyymmddForProfile(data[i].kurulusTarihi)
                            var ticaretSicilNo = data[i].ticaretSicilNo == null ? '' : data[i].ticaretSicilNo;
                            var kurumVergiNo = data[i].kurumVergiNo == null ? '' : data[i].kurumVergiNo
                            var webSitesi = data[i].webSitesi == null ? '' : data[i].webSitesi
                            var epostaAdresi = data[i].epostaAdresi == null ? '' : data[i].epostaAdresi;
                            satirlar += "<tr >\
                   <td >"+ kurumKisaUnvan + "</td>\
                    <td >"+ kurulusTarihi + "</td>\
                    <td >"+ ticaretSicilNo + "</td>\
                    <td >"+ kurumVergiNo + "</td>\
                    <td >"+ webSitesi + "</td>\
                    <td >"+ epostaAdresi + "</td>\
                    <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + data[i].tabloID + ")'> <img src='/img/eye.svg'/> </button>\
                    <button type='button' class='btn ' onclick='GuncelleSayfasınaGit(" + data[i].tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                    <button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'> <img src='/img/trash.svg'/> </button></td>\
                     </tr>";
                        }
                    }
                }

                $("#tbody").html(satirlar);

                $('#KurumListesiTable').DataTable({
                    "paging": true,
                    "responsive": true,
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
                    "dom": 'Bfrtip',
                    "buttons": [
                        {
                            "extend": 'excel',
                            "text": siteLang.ExceleAktar,
                            "className": "btn btn-success",
                            "exportOptions": {
                                "columns": ":not(:last-child)"
                            }
                        }
                    ]
                })
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function GuncelleSayfasınaGit(id) {
    location.href = "/panel/CompanyUpdate/" + id;
}

function Goruntule(id) {
    location.href = "/panel/CompanyDetail/" + id;
}

function Sil(kurumID) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/panel/TemelKurumSilindiYap/" + kurumID,
                dataType: "json",
                data: null, // < === this is where the problem was !!
                success: function (result) {
                    if (result.isSuccess) {
                        if (result.value) {
                            alertim.toast(siteLang.Sil, alertim.types.success);
                            location.reload();
                        }
                        else {
                            alertim.toast(siteLang.Hata, alertim.types.danger);
                        }
                    } else {
                        alertim.toast(siteLang.Hata, alertim.types.danger);
                    }
                },
                error: function (e) {
                    console.log(e);
                }, //success: function (result) {
            });
        },
        function () {
            return;
        }
    )
}

function loadKurumID() {
    var url = "/panel/cookieKurumID";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log(result.value);
            if (result.value) {
                kurumId = result.value;
            }
        }
    })
}

function IliskiList() {
    var url = "/panel/KurumIliskiList";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log(result.value);
            if (result.value) {
                result.value.filter(a => a.iliskiTuruId == 8 && a.buKurumId != kurumId).forEach(function (item) {
                    musteriIds.push(item.buKurumId);
                })
                result.value.filter(a => a.iliskiTuruId != 8 && a.buKurumId != kurumId).forEach(function (item) {
                    digeriIds.push(item.buKurumId);
                })
            }
        }
    })
}