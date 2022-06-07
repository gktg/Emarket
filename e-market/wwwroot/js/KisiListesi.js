$(function () {
    $('#ekleHeaderbtn').on('click', function () {
        location.href = "/panel/PersonDefinition";
    });
    loadKurumID();

    KisiVerileriniGetirK();
    PasifKisiVerileriniGetirK();

    $("#kurumTab-pasif-tab").on("click", function () {
        KisiVerileriniGetir();
        PasifKisiVerileriniGetir();
    })

    $("#kurumTab-aktif-tab").on("click", function () {
        KisiVerileriniGetirK();
        PasifKisiVerileriniGetirK();
    })

    $(document).on("click", "#ExcelEkleHeaderbtn", function () {
        $("#updexcel").click();
    });
    $(document).on("change", "#updexcel", function () {
        UploadFile(this);
    })

    //$("#txtSifre").on("change", function () {
    //    if (!CheckStrengthKisiList() && $("#txtSifre").val().length > 0) {
    //        $('#txtSifre').addClass("is-invalid");
    //        $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
    //    } else {
    //        $('#txtSifre').removeClass("is-invalid");
    //        $('#txtSifre').addClass("is-valid");
    //        $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
    //    }
    //    if (!($("#txtSifre").val().length > 0)) {
    //        $('#txtSifre').removeClass("is-valid");
    //        $('#txtSifre').removeClass("is-invalid");
    //        $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
    //    }
    //})
    $("#txtSifreTekrar").on("change", function () {
        if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
            $('#txtSifreTekrar').addClass("is-invalid");
        } else {
            $('#txtSifreTekrar').removeClass("is-invalid");
            $('#txtSifreTekrar').addClass("is-valid");
        }
    })
});

var sifreKisiId;
var kurumId = 0;

function test() {
    var tHeads = $('#KisiListesiTable > thead > tr').children();
    var dataJson = {};
    tHeads.each(function (i, e) {
        console.log($(e).html());
        dataJson[$(e).html()];
    })
    console.log(dataJson);
    $($('#KisiListesiTable > thead > tr > th')[0]).html()
}
//function CheckStrengthKisiList() {
//    return $('#txtSifre').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*(),\.\?":{}|<>]).{8,}$/g);
//}
function KisiVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/AmirTemsilciyeGoreKisiListesi",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                $("#KisiListesiTable").DataTable().destroy();
                var satirlar = "";
                var sifreButton = "";
                data = result.value.filter(a => a.kisiBagliOlduguKurumId != kurumId);
                for (var i of data) {
                    //if (i.sifreVarMi == false) {
                    //    sifreButton = "<button type='button' class='btn btn-sm' onclick='SifreAtaModal(" + i.tabloID + ")'><img src='/img/list_lock.svg'/></button>"
                    //}
                    //else {
                    //    sifreButton = "";
                    //}
                    satirlar += "<tr >\
                    <td >"+ i.kisiAdi + "</td>\
                    <td >"+ i.kisiSoyadi + "</td>\
                    <td >"+ i.kisiKullaniciAdi + "</td>\
                    <td >"+ i.kisiEkranAdi + "</td>\
                    <td >"+ i.kisiEposta + "</td>\
                    <td style=' max-width: 13% !important;'>"+ i.kurumAdi + "</td>\
                    <td style=' min-width: 20% !important;' class='text-center'><button type='button' class='btn btn-sm' onclick='Goruntule(" + i.tabloID + ")'> <img src='/img/eye.svg'/> </button>\
                    <button type='button' class='btn  btn-sm mx-1' onclick='GuncelleSayfasınaGit(" + i.tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                    <button type='button' class='btn  btn-sm ' onclick='Sil(" + i.tabloID + ")'> <img src='/img/trash.svg'/></tr> ";
                }
                $("#tbody").html(satirlar);

                $('#KisiListesiTable').DataTable({
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

function KisiVerileriniGetirK() {
    $.ajax({
        type: "GET",
        url: "/panel/AmirTemsilciyeGoreKisiListesi",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                $("#KisiListesiTable").DataTable().destroy();
                var satirlar = "";
                var sifreButton = "";
                data = result.value.filter(a => a.kisiBagliOlduguKurumId == kurumId);
                for (var i of data) {
                    if (i.sifreVarMi == false) {
                        sifreButton = "<button type='button' class='btn btn-sm' onclick='SifreAtaModal(" + i.tabloID + ")'><img src='/img/list_lock.svg'/></button>"
                    }
                    else {
                        sifreButton = "";
                    }
                    satirlar += "<tr >\
                    <td >"+ i.kisiAdi + "</td>\
                    <td >"+ i.kisiSoyadi + "</td>\
                    <td >"+ i.kisiKullaniciAdi + "</td>\
                    <td >"+ i.kisiEkranAdi + "</td>\
                    <td >"+ i.kisiEposta + "</td>\
                    <td style=' max-width: 13% !important;'>"+ i.kurumAdi + "</td>\
                    <td style=' min-width: 20% !important;' class='text-center'><button type='button' class='btn btn-sm' onclick='Goruntule(" + i.tabloID + ")'><img src='/img/eye.svg'/></button>\
                    <button type='button' class='btn  btn-sm mx-1' onclick='GuncelleSayfasınaGit(" + i.tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                    <button type='button' class='btn  btn-sm ' onclick='Sil(" + i.tabloID + ")'> <img src='/img/trash.svg'/> </button>" + sifreButton + "</td></tr> ";
                }
                $("#tbody").html(satirlar);

                $('#KisiListesiTable').DataTable({
                    "paging": true,
                    "responsive":{
                        "details": {
                            "display": $.fn.dataTable.Responsive.display.modal({
                                "header": function (row) {
                                    var data = row.data();
                                    return 'Details for ' + data[0] + ' ' + data[1];
                                }
                            }),
                            "renderer": $.fn.dataTable.Responsive.renderer.tableAll()
                        }
                    },
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

function PasifKisiVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/PasifKisiListesiGetir",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                $("#PasifKisiListesiTable").DataTable().destroy();
                var satirlar = "";
                if (result.value.length > 0) {
                    data = result.value.filter(a => a.kisiBagliOlduguKurumId != kurumId);
                    for (var i = 0; i < data.length; i++) {
                        satirlar += "<tr >\
                    <td >"+ data[i].kisiAdi + "</td>\
                    <td >"+ data[i].kisiSoyadi + "</td>\
                    <td >"+ data[i].kisiEposta + "</td>\
                    <td ><button type='button' class='btn btn-warning btn-sm' onclick='Aktif(" + data[i].tabloID + ")'>Aktif</button></td>\
                     </tr>";
                    }
                }

                $("#tbodypasif").html(satirlar);

                $('#PasifKisiListesiTable').DataTable({
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

function PasifKisiVerileriniGetirK() {
    $.ajax({
        type: "GET",
        url: "/panel/PasifKisiListesiGetir",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                $("#PasifKisiListesiTable").DataTable().destroy();
                var satirlar = "";
                if (result.value.length > 0) {
                    data = result.value.filter(a => a.kisiBagliOlduguKurumId == kurumId);
                    for (var i = 0; i < data.length; i++) {
                        satirlar += "<tr >\
                    <td >"+ data[i].kisiAdi + "</td>\
                    <td >"+ data[i].kisiSoyadi + "</td>\
                    <td >"+ data[i].kisiEposta + "</td>\
                    <td ><button type='button' class='btn btn-warning btn-sm' onclick='Aktif(" + data[i].tabloID + ")'>Aktif</button></td>\
                     </tr>";
                    }
                }

                $("#tbodypasif").html(satirlar);

                $('#PasifKisiListesiTable').DataTable({
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
    location.href = "/panel/PersonUpdate/" + id;
}

function Goruntule(id) {
    location.href = "/panel/PersonDetail/" + id;
}

function Sil(kisiID) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/panel/TemelKisiSilindiYap/" + kisiID,
                dataType: "json",
                data: null, // < === this is where the problem was !!
                success: function (result) {
                    if (result.isSuccess == true) {
                        if (result.value == true) {
                            alertim.toast(siteLang.Sil, alertim.types.success);
                            KisiVerileriniGetirK();
                            PasifKisiVerileriniGetirK();
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

function Aktif(kisiID) {
    alertim.confirm(siteLang.AktifEt, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/panel/TemelKisiAktifYap/" + kisiID,
                dataType: "json",
                data: null, // < === this is where the problem was !!
                success: function (result) {
                    if (result.isSuccess) {
                        if (result.value) {
                            KisiVerileriniGetirK();
                            PasifKisiVerileriniGetirK();
                            alertim.toast(siteLang.HesAktif, alertim.types.success);
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
                }
            });
        },
        function () {
            return;
        }
    )
}

function UploadFile(e) {
    var formData = new FormData();
    var elem = $(e)[0];

    var file = elem.files[0];
    formData.append("file", file);

    $.ajax({
        url: "/panel/ExcelKisiKayit",
        processData: false,
        contentType: false,
        type: "POST",
        data: formData,
        success: function (result) {
            if (result.value) {
                console.log(result.value);
                alertim.toast(siteLang.ExKaydet, alertim.types.success);
            } else {
                if (result.reasons[0]?.message?.includes("kurum")) {
                    alertim.toast(siteLang.KurumYok, alertim.types.warning);
                }
                else {
                    alertim.toast(siteLang.ExSec, alertim.types.warning);
                }
            }
        },
        error: function (e) {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    });
}
function SifreAtaModal(id) {
    $('#kisiSifreModal').modal('show');
    $('#strengthMessage').removeClass('SifreKarmasikUyari');
    $('#txtSifre').val("");
    $('#txtSifreTekrar').val("");
    $('#txtSifre').removeClass("is-invalid");
    sifreKisiId = id;
}
function SifreKaydet() {
    $('#sifreAta').attr("disabled", "disabled");
    $('#txtSifre').removeClass("is-invalid");
    $('#txtSifre').addClass("is-valid");
    $('#strengthMessage').removeClass('SifreKarmasikUyari');
    if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
        $('#txtSifreTekrar').addClass("is-invalid");
        $('#sifreAta').removeAttr("disabled");
        $('#strengthMessage').addClass('SifreKarmasikUyari');
        return;
    }
    $('#txtSifreTekrar').removeClass("is-invalid");
    $('#txtSifreTekrar').addClass("is-valid");
    var sifreAtaModel = {
        kisiId: sifreKisiId,
        kisiSifre: $('#txtSifre').val()
    }
    $.ajax({
        type: "POST",
        url: "/panel/SifreAtama",
        dataType: "json",
        data: sifreAtaModel, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess) {
                alertim.toast(siteLang.sifreEkle, alertim.types.success, function () {
                    $('#kisiSifreModal').modal('hide');
                    location.reload();
                });
            } else {
                alertim.toast(siteLang.sifreEkle, alertim.types.success);
                $('#sifreAta').removeAttr("disabled");
            }
        },
        error: function (e) {
            errorHandler(e);
            $('#sifreAta').removeAttr("disabled");
        },
    });
    $('#sifreAta').removeAttr("disabled");
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