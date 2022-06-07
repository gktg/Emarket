$(document).ready(function () {
    $('#ekleHeaderbtn').on('click', function () {
        location.href = "/AuthCenter";
    });
    ErisimYetkiVerileriniGetir();
});

function ErisimYetkiVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/YetkiMerkezi/ErisimYetkiTanimListGetir",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess) {
                $("#YetkiListesiTable").DataTable().destroy();
                var satirlar = "";
                data = result.value;
                for (var i = 0; i < data.length; i++) {
                    satirlar += "<tr >\
                    <td >"+ data[i].organizasyonBirimAdi + "</td>\
                    <td >"+ data[i].sayfaAdi + "</td>\
                    <td >"+ data[i].birimTanimiAdi + "</td>\
                    <td class='text-center'><button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'><img src='/img/trash.svg'/></button></td>\
                     </tr>";
                }
                $("#tbody").html(satirlar);

                $('#YetkiListesiTable').DataTable({
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
                alertim.toast(siteLang.Hata, alertim.types.warning);
            }
        },
        error: function (e) {
            return;
        },
    });
}

function Sil(id) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/YetkiMerkezi/ErisimYetkiTanimiSil/" + id,
                dataType: "json",
                data: null,
                success: function (result) {
                    if (result.isSuccess) {
                        if (result.value) {
                            ErisimYetkiVerileriniGetir();
                            alertim.toast(siteLang.Sil, alertim.types.success);
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
                },
            });
        },
        function () {
            return;
        }
    )
}