//Global parameters
var KurumIliskiKayitModel = {};
var Iliskiler = {};
var KurumListForDDL = [];
var IliskiListForDDL = [];
var request = {};
var TableData;
$(document).ready(function () {
    readIliski();
});

function IliskiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/KurumIliskiTuruGetir",
        dataType: "json",
        async: false,
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                var uniqueArray = [];
                result.value.forEach(function (item) {
                    if (!uniqueArray.includes(item.paramTanim)) {
                        uniqueArray.push(item.paramTanim);
                        IliskiListForDDL.push(item);
                    }
                });
                //for (var i = 0; i < result.value.length; i++) {
                //    IliskiListForDDL.push(result.value[i]);
                //}
                console.log(IliskiListForDDL);
                console.log(result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function KurumListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/AmirTemsilciyeGoreKurumListesi",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                for (var i = 0; i < result.value.length; i++) {
                    KurumListForDDL.push(result.value[i]);
                }
                console.log(KurumListForDDL);
                console.log(result.value);
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function readIliski() {
    KurumListForDDL = [{
        aktifEdenKisiID: 0,
        aktifMi: 0,
        aktiflikTarihi: null,
        bagliOlduguKurumId: 0,
        dilID: 0,
        epostaAdresi: "",
        faxNo: "",
        guncellenmeTarihi: "",
        guncelleyenKisiID: 0,
        kayitEdenID: 0,
        kayitTarihi: "",
        kisiID: 0,
        kurulusTarihi: "",
        kurumAdres: 0,
        kurumHesabiAktifMi: true,
        kurumHesabiDeAktifAciklama: null,
        kurumHesabiDeAktifEdenKisiId: null,
        kurumHesabiDeAktifSebebiId: null,
        kurumHesabiDeAktifTarihi: null,
        kurumID: 0,
        kurumKisaUnvan: "Seçiniz",
        kurumLogoId: 0,
        kurumSehirId: 0,
        kurumSektorId: null,
        kurumTicariUnvani: "",
        kurumTipiId: 0,
        kurumUlkeId: 0,
        kurumVergiDairesiId: 0,
        kurumVergiNo: "",
        pasifEdenKisiID: null,
        pasiflikTarihi: null,
        silenKisiID: null,
        silindiMi: 0,
        silinmeTarihi: null,
        tabloID: 0,
        ticaretSicilNo: "",
        ulkeId: null,
        webSitesi: ""
    }];
    IliskiListForDDL = [{ paramTanim: "Seçiniz", tabloID: 0 }];
    KurumListGetir();
    IliskiListGetir();

    var data;
    $.ajax({
        data: data,
        url: "/panel/KurumIliskiList",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.value) {
                var ustData = KurumListForDDL.slice();
                ustData.splice(0, 0, { kurumKisaUnvan: "", tabloID: 0 });
                $("#jsGrid").jsGrid({
                    width: "100%",
                    height: "auto",
                    inserting: true,
                    editing: true,
                    sorting: true,
                    noDataContent: "Kayıt Bulunamadı",
                    pagerFormat: "Sayfalar: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} / {pageCount}",
                    pagePrevText: "<",
                    pageNextText: ">",
                    pageFirstText: "<<",
                    pageLastText: ">>",
                    loadMessage: "Lütfen bekleyiniz...",
                    invalidMessage: "Geçersiz veri girişi !",

                    onItemEditing: function (args) {
                    },
                    //onItemDeleted: function (args) {
                    //    $.ajax({
                    //        data: args.item,
                    //        url: "/panel/KurumIliskiSil/" + args.item.tabloID,
                    //        type: "GET",
                    //        dataType: "json",
                    //        success: function () {
                    //            readIliski();
                    //        }
                    //    })
                    //},
                    onItemUpdating: function (args) {
                        if (args.item.buKurumId == args.item.bununKurumId && args.item.buKurumId != 0 && args.item.bununKurumId != 0) {
                            args.cancel = true;
                            alertim.toast(siteLang.AyniKurum, alertim.types.warning);
                        }
                        else {
                            return $.ajax({
                                data: args.item,
                                url: "/panel/KurumIliskiGuncelle",
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    if (data.isSuccess == true) {
                                        alertim.toast(siteLang.Guncelle, "success");
                                        readIliski();
                                    } else {
                                        alertim.toast(siteLang.KurumIliskiHata, alertim.types.warning);
                                        readIliski();
                                    }
                                },
                                error: function (e) {
                                    readIliski();
                                    errorHandler(e);
                                }
                            });
                        }
                    },
                    onItemInserting: function (args) {
                        $(".validationMessage").hide();
                        if (args.item.buKurumId == args.item.bununKurumId && args.item.buKurumId != 0 && args.item.bununKurumId != 0) {
                            args.cancel = true;
                            alertim.toast(siteLang.AyniKurum, alertim.types.warning);
                        }
                        else {
                            return $.ajax({
                                data: args.item,
                                url: "/panel/KurumIliskiKaydet",
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    if (data.isSuccess == true) {
                                        alertim.toast(siteLang.Kaydet, "success");
                                        readIliski();
                                    } else {
                                        alertim.toast(siteLang.KurumIliskiHata, alertim.types.warning);
                                        readIliski();
                                    }
                                },
                                error: function (e) {
                                    readIliski();
                                    errorHandler(e);
                                }
                            });
                        }
                    },
                    data: result.value,
                    //deleteConfirm: "Kayıtlı veriyi silmek istediğinizden emin misiniz?",
                    confirmDeleting: false,
                    onItemDeleting: function (args) {
                        if (!args.item.deleteConfirmed) { // custom property for confirmation
                            args.cancel = true; // cancel deleting
                            alertim.confirm(siteLang.SilOnay, "info",
                                function () {
                                    $.ajax({
                                        data: args.item,
                                        url: "/panel/KurumIliskiSil/" + args.item.tabloID,
                                        type: "GET",
                                        dataType: "json",
                                        success: function () {
                                            readIliski();
                                        }
                                    })
                                }
                            );
                        }
                    },
                    loadMessage: "Lütfen bekleyiniz...",
                    fields: [
                        { name: "buKurumId", title: siteLang.BaglıKurum, classes: "bukurum", type: "select", items: KurumListForDDL, valueField: "tabloID", textField: "kurumKisaUnvan", selectedIndex: -2 },
                        { name: "iliskiTuruId", title: siteLang.İlişkiTürü, type: "select", items: IliskiListForDDL, valueField: "tabloID", textField: "paramTanim", selectedIndex: -2 },
                        { name: "bununKurumId", title: siteLang.BaglantılıOlduguKurum, type: "select", items: KurumListForDDL, valueField: "tabloID", textField: "kurumKisaUnvan", selectedIndex: -2 },
                        {
                            type: "control",
                            searchModeButtonTooltip: "Arama moduna geç",
                            insertModeButtonTooltip: "Yeni kayıt moduna geç",
                            editButtonTooltip: "Değiştir",
                            deleteButtonTooltip: "Sil",
                            searchButtonTooltip: "Bul",
                            clearFilterButtonTooltip: "Filtreyi temizle",
                            insertButtonTooltip: "Ekle",
                            updateButtonTooltip: "Güncelle",
                            cancelEditButtonTooltip: "Güncelleme iptali"
                        }
                    ]
                });
                ExcelHiddenTable(result.value);
            }
        }
    })
}
function ExcelHiddenTable(data) {
    $("#HiddenTable").DataTable().destroy();
    TableData = $('#HiddenTable').DataTable({
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
        "dom": 'B',
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
    var data1 = [{
        buKurumId: "",
        iliskiTuruId: "",
        bununKurumId: "",
    }];
    data1 = data;
    TableData.clear()
        .draw();
    for (var item of data1) {
        TableData.row.add([
            KurumListForDDL.find(e => e.tabloID === item.buKurumId)["kurumKisaUnvan"],//item.Rol,
            IliskiListForDDL.find(e => e.tabloID === item.iliskiTuruId)["paramTanim"],//item.Rol,
            KurumListForDDL.find(e => e.tabloID === item.bununKurumId)["kurumKisaUnvan"],//item.Rol,
            "<div class='custom-control custom-checkbox'></div>",
        ]).draw(true);
    }
}