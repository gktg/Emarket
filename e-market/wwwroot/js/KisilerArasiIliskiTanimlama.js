//Global parameters
var KisiIliskiKayitModel = {};
var Iliskiler = {};
var KisiListForDDL = [];
var IliskiListForDDL = [];
var request = {};
var TableData;
$(document).ready(function () {
    readIliski();
});

function IliskiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/KisiIliskiTuruGetir",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                //for (var i = 0; i < result.value.length; i++) {
                //    IliskiListForDDL.push(result.value[i]);
                //}
                var uniqueArray = [];
                result.value.forEach(function (item) {
                    if (!uniqueArray.includes(item.paramTanim)) {
                        uniqueArray.push(item.paramTanim);
                        IliskiListForDDL.push(item);
                    }
                });
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

function KisiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/TemelKisiListesiGetir",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                for (var i = 0; i < result.value.length; i++) {
                    KisiListForDDL.push(result.value[i]);
                }
                console.log(KisiListForDDL);
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

function readIliski() {
    KisiListForDDL = [{ kisiAdi: siteLang.Choose, kisiSoyadi: "", tabloID: 0 }];
    IliskiListForDDL = [{ paramTanim: siteLang.Choose, tabloID: 0 }];
    KisiListGetir();
    IliskiListGetir();

    var data;
    $.ajax({
        data: data,
        url: "/panel/KisiIliskiList",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.value) {
                for (var i = 0; i < KisiListForDDL.length; i++) {
                    KisiListForDDL[i].adisoyadi = KisiListForDDL[i].kisiAdi + " " + KisiListForDDL[i].kisiSoyadi;
                }
                var ustData = KisiListForDDL.slice();
                ustData.splice(0, 0, { kisiAdi: " ", kisiSoyadi: " ", tabloID: 0 });

                $("#jsGrid").jsGrid({
                    width: "100%",
                    height: "auto",
                    inserting: true,
                    editing: true,
                    sorting: true,
                    noDataContent: siteLang.infoEmpty,
                    onItemEditing: function (args) {
                        var str = ".jsgrid-edit-row > td:nth-child(3) > select> option[value=" + args.item.buKisiId + "]";
                        setTimeout(function () {
                            $(str).remove();
                        }, 500)
                    },
                    //onItemDeleted: function (args) {
                    //    $.ajax({
                    //        data: args.item,
                    //        url: "/panel/KisiIliskiSil/" + args.item.tabloID,
                    //        type: "GET",
                    //        dataType: "json",
                    //        success: function () {
                    //            readIliski();
                    //        }
                    //    })
                    //},
                    onItemUpdating: function (args) {
                        if (args.item.buKisiId == args.item.bununKisiId && args.item.buKisiId != 0 && args.item.bununKisiId != 0) {
                            args.cancel = true;
                            alertim.toast(siteLang.AyniKisi, alertim.types.warning);
                        }
                        else {
                            return $.ajax({
                                data: args.item,
                                url: "/panel/KisiIliskiGuncelle",
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    if (data.isSuccess == true) {
                                        alertim.toast(siteLang.Guncelle, "success");
                                        readIliski();
                                    }
                                    else {
                                        alertim.toast(siteLang.KisiIliskiHata, alertim.types.warning);
                                        readIliski();
                                    }
                                },
                                error: function (e) {
                                    readIliski();
                                    errorHandler(e);
                                }
                            })
                        }
                    },
                    onItemInserting: function (args) {
                        $(".validationMessage").hide();
                        if (args.item.buKisiId == args.item.bununKisiId && args.item.buKisiId != 0 && args.item.bununKisiId != 0) {
                            args.cancel = true;
                            alertim.toast(siteLang.AyniKisi, alertim.types.warning);
                        }
                        else {
                            return $.ajax({
                                data: args.item,
                                url: "/panel/KisiIliskiKaydet",
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    if (data.isSuccess == true) {
                                        alertim.toast(siteLang.Kaydet, "success");
                                        readIliski();
                                    }
                                    else {
                                        alertim.toast(siteLang.KisiIliskiHata, alertim.types.warning);
                                        readIliski();
                                    }
                                },
                                error: function (e) {
                                    readIliski();
                                    errorHandler(e);
                                }
                            })
                        }
                    },
                    data: result.value,
                    //deleteConfirm: "Silmek istediğinize emin misiniz?",
                    confirmDeleting: false,
                    onItemDeleting: function (args) {
                        if (!args.item.deleteConfirmed) { // custom property for confirmation
                            args.cancel = true; // cancel deleting
                            alertim.confirm(siteLang.SilOnay, "info",
                                function () {
                                    $.ajax({
                                        data: args.item,
                                        url: "/panel/KisiIliskiSil/" + args.item.tabloID,
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
                    fields: [
                        {
                            name: "buKisiId", title: siteLang.BaglıKisi, classes: "bukisi", type: "select", items: KisiListForDDL, valueField: "tabloID", textField: "adisoyadi", selectedIndex: -2
                        },
                        { name: "iliskiTuruId", title: siteLang.İlişkiTürü, type: "select", items: IliskiListForDDL, valueField: "tabloID", textField: "paramTanim", selectedIndex: -2 },
                        { name: "bununKisiId", title: siteLang.BağlantılıOlduğuKişi, type: "select", items: KisiListForDDL, valueField: "tabloID", textField: "adisoyadi", selectedIndex: -2 },
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
        buKisiId: "",
        iliskiTuruId: "",
        bununKisiId: "",
    }];
    data1 = data;
    TableData.clear()
        .draw();
    for (var item of data1) {
        TableData.row.add([
            KisiListForDDL.find(e => e.tabloID === item.buKisiId)["adisoyadi"],//item.Rol,
            IliskiListForDDL.find(e => e.tabloID === item.iliskiTuruId)["paramTanim"],//item.Rol,
            KisiListForDDL.find(e => e.tabloID === item.bununKisiId)["adisoyadi"],//item.Rol,
            "<div class='custom-control custom-checkbox'></div>",
        ]).draw(true);
    }
}

function myformatter(cellvalue, options, rowObject) {
    return cellvalue + ' ' + rowObject.kisiAdi + ' ' + rowObject.kisiSoyadi;
}