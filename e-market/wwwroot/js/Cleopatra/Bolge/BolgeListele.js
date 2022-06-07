$(function () {
    BolgeleriListele();
});



function BolgeleriListele() {
    Get("/Bolge/BolgeleriGetir", function (data) {
        var dataValues = data.value;
        var satirlar = "";
        $.each(dataValues, function (x, y) {
            var sehirler = "";
            var dataValueSehirler = y.sehirler;
            $.each(dataValueSehirler, function (m, n) {
                sehirler += `<p>${n.paramTanim}</p>`
            })
            satirlar += `                  <tr>
                                            <td>${y.bolgeAdi}</td>
                                            <td> ${y.ulke.paramTanim}</td>
                                            <td>
                                                <div class="myDIV"><img src='/img/eye.svg' width="24" height="24" /> </div>
                                                <div class="hide">
                                                    ${sehirler}
                                                </div>
                                            </td>
                                            <td>
                                                <button type='button' class='btn' data-target="#modelMarmara" data-toggle=modal title="@localizator["Düzenle"].Value" onclick="GuncelleSayfasınaGit(${y.bolgeTanimlariId})"> <img src='/img/pencil.svg' /> </button>

                                                <button type='button' class='btn' data-target="#modelMarmara" data-toggle=modal title="@localizator["Sil"].Value" onclick="Sil(${y.bolgeTanimlariId})"> <img src='/img/trash.svg' /> </button>
                                            </td>
                                        </tr>`;
        });

        $('#tbody').html(satirlar);
        $("#BolgeListesiTable").DataTable().destroy();
        $('#BolgeListesiTable').DataTable({
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

    }, function (err) {
        console.log(err);
    }, false, false);





};

function Sil(bolgeId) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/bolge/bolgesil/" + bolgeId,
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
                    BolgeleriListele();
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
};



function GuncelleSayfasınaGit(id) {
    location.href = "/bolge/BolgeGuncelleme/" + id;
}