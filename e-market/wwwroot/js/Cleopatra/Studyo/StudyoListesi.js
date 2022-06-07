var BolgeTanimlariList = [];
var bolgeAdi;

$(document).ready(function () {
    StudyoVerileriniGetirD();
    BolgeTanimlariGetir()
})

function StudyoVerileriniGetirD() {
    $.ajax({
        type: "GET",
        url: "/studyo/StudyoList",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value)
                $("#StudyoListesiTable").DataTable().destroy();
                var satirlar = "";
                var list = [];
                result.value.forEach(function (a) {
                    list.push(a);
                });
                data = list;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].aktifMi == 1) {
                            var SubeTipi;
                            var kurumTicariUnvani = data[i].kurumTicariUnvani == null ? '' : data[i].kurumTicariUnvani;
                            var studyoAdi = data[i].studyoAdi == null ? '' : data[i].studyoAdi;
                            var paramSubeTipiID = data[i].paramSubeTipiID == null ? '' : data[i].paramSubeTipiID;
                            if (paramSubeTipiID == "2") {
                                SubeTipi = "Frenchise"
                            }
                            else {
                                SubeTipi = "Organik"

                            }
                            for (var x = 0; x < BolgeTanimlariList.length; x++) {
                                if (data[i].bolgeID == BolgeTanimlariList[x].tabloID) {
                                    bolgeAdi = BolgeTanimlariList[x].bolgeAdi == null ? '' : BolgeTanimlariList[x].bolgeAdi;
                                    break;
                                }
                                else {
                                    bolgeAdi = ''
                                }
                            }
                            
                            var koltukSayisi = data[i].koltukSayisi == null ? '' : data[i].koltukSayisi;
                            var kurumVergiNo = data[i].kurumVergiNo == null ? '' : data[i].kurumVergiNo
                            var epostaAdresi = data[i].epostaAdresi == null ? '' : data[i].epostaAdresi;
                            satirlar += "<tr >\
                       <td >"+ kurumTicariUnvani + "</td>\
                        <td >"+ studyoAdi + "</td>\
                        <td >"+ SubeTipi + "</td>\
                        <td >"+ bolgeAdi + "</td>\
                        <td >"+ kurumVergiNo + "</td>\
                        <td >"+ epostaAdresi + "</td>\
                        <td >"+ koltukSayisi + "</td>\
                        <td class='text-center'><button type='button' class='btn' onclick='Goruntule(" + data[i].tabloID + ")'> <img src='/img/eye.svg'/> </button>\
                        <button type='button' class='btn ' onclick='GuncelleSayfasınaGit(" + data[i].tabloID + ")'> <img src='/img/edit.svg'/> </button>\
                        <button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'> <img src='/img/trash.svg'/> </button></td>\
                         </tr>";
                        }
                    }
                }

                $("#tbody").html(satirlar);

                $('#StudyoListesiTable').DataTable({
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

function BolgeTanimlariGetir() {
    $.ajax({
        type: "GET",
        url: "/bolge/BolgeTanimlariList",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            var data;
            if (result.isSuccess == true) {
                console.log(result.value);
                data = result.value;
                BolgeTanimlariList = data;
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function Sil(studyoID) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/studyo/StudyoSilindiYap/" + studyoID,
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
    location.href = "/studyo/StudyoGuncelle/" + id;
}
function Goruntule(id) {
    location.href = "/panel/CompanyDetail/" + id;
}