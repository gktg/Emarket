$(document).ready(function () {
    OzelGunVerileriniGetirD();
})

function OzelGunVerileriniGetirD() {
    $.ajax({
        type: "GET",
        url: "/ozelgun/OzelGunTanimListeleme2",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value)
                var satirlar = "";
                var data = result.value;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ozelGunUlke = data[i].ulke.paramTanim == null ? '' : data[i].ulke.paramTanim;
                        var ozelGunTipi = data[i].ozelGunTipi.paramTanim == null ? '' : data[i].ozelGunTipi.paramTanim;
                        var ozelGunTanim = data[i].ozelGunTanim == null ? '' : data[i].ozelGunTanim;
                        var ozelGunBaslangicTarihi = data[i].ozelGunBaslangicTarihi == null ? '' : data[i].ozelGunBaslangicTarihi;
                        var ozelGunBitisTarihi = data[i].ozelGunBitisTarihi == null ? '' : data[i].ozelGunBitisTarihi;

                        var ozelGunBaslangicTarihitoDateTime = CsharpStringDateToStringDateTime(ozelGunBaslangicTarihi);
                        var ozelGunBitisTarihitoDateTime = CsharpStringDateToStringDateTime(ozelGunBitisTarihi);

                        satirlar += "<tr >\
                       <td >"+ ozelGunUlke + "</td>\
                       <td >"+ ozelGunTanim + "</td>\
                       <td >"+ ozelGunTipi + "</td>\
                        <td >"+ ozelGunBaslangicTarihitoDateTime + "</td>\
                        <td >"+ ozelGunBitisTarihitoDateTime + "</td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + data[i].tabloID + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='GuncelleSayfasınaGit(" + data[i].tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";

                    }
                }

                $("#tbody").html(satirlar);

                $('#ozelGunlerTableId').DataTable({
                    searchPanes: {
                        //cascadePanes: true,
                        viewTotal: true,
                        layout: "columns-3"

                    },

                    dom: 'Pfrtip',
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
                        },
                        "searchPanes": {
                            collapseMessage: "Filtreleri Kapat",
                            showMessage: "Filtreleri Göster",
                            clearMessage: "Filtreleri Temizle",
                            title: {
                                _: 'Seçili Filtre - %d',
                            }
                        }

                    },
                    columnDefs: [
                        {
                            searchPanes: {
                                show: true,
                            },
                            targets: [0,1,2]
                        }
                    ]
                });

                //$('#ozelGunlerTableId').DataTable({
                //    "paging": true,
                //    "responsive": true,
                //    "language": {
                //        "lengthMenu": siteLang.lengthComputable,
                //        "info": siteLang.info,
                //        "searchPlaceholder": siteLang.searchPlaceholder,
                //        "zeroRecords": siteLang.zeroRecords,
                //        "paginate": {
                //            "infoEmpty": siteLang.infoEmpty,
                //            "first": siteLang.First,
                //            "last": siteLang.Last,
                //            "next": siteLang.Next,
                //            "previous": siteLang.Previous,
                //        }
                //    },
                //    //"language": {
                //    //    "url": siteLang.DataTableLang
                //    //},
                //    "dom": 'Bfrtip',
                //    "buttons": [
                //    ]
                //})
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}


function Sil(ozelgunID) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/ozelgun/OzelGunTanimSil/" + ozelgunID,
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
function GuncelleSayfasınaGit(id) {
    location.href = "/ozelgun/OzelGunGuncelle/" + id;
}