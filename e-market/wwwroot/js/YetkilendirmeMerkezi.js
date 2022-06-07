$(document).ready(function () {
    OrgBirimiGetir();
    SistemSayfalarGetir();
    $('#select-organizasyon-birimi').select2();
    $(document).on('click', '#kaydetBtn', function () {
        EslestirmeKaydet();
    });
});

function OrgBirimiGetir() {
    //ajax, organizasyon birimlerini select'e doldur.
    $.ajax({
        url: "/panel/GetOrganizasyonBirim",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.value) {
                var selectData = [];
                data.value.forEach(function (item) {
                    if (item.tanim == "Pozisyon") {
                        selectData.push({ id: item.tabloId, text: item.tanim, tipId: 4 });
                    }
                })
                $("#select-param-organizasyon-birimi").select2({ data: selectData })
                $("#select-param-organizasyon-birimi").on('select2:select', function (e) {
                    var data = e.params.data;
                    if (parseInt(data.id) > 0) {
                        OrgBirimTanimiGetir();
                    }
                })
            }
        }
    })
}

function OrgBirimTanimiGetir() {
    var id = parseInt($("#select-param-organizasyon-birimi").select2().find(":selected")[0].value);
    if (id > 0) {
        var url = "/panel/GetKurumBirimList/" + id;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (result) {
                if (result.value) {
                    var selectData = [];
                    result.value.forEach(function (item) {
                        selectData.push({ id: item.tabloId, text: item.tanim });
                    });
                    $("#select-organizasyon-birimi").html('');
                    $("#select-organizasyon-birimi").select2({ data: selectData })
                }
            }
        })
    }
}

function SistemSayfalarGetir() {
    //ajax, sistem sayfalar getir, select2'ye doldur.
    $.ajax({
        url: "/panel/YetkiIcinSayfaGetir",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.value) {
                var selectData = [];
                data.value.forEach(function (item) {
                    selectData.push({ id: item.tabloID, text: item.sayfaTanimi });
                })
                $("#Sayfalar").html("");
                $("#Sayfalar").select2({ data: selectData })
            }
        }
    })
}

function EslestirmeKaydet() {
    var IlgiliKurumOrganizasyonBirimIdList = [];
    var ErisimYetkisiVerilenSayfaIdList = [];

    var orgBirimSelect2Selected = $('#select-organizasyon-birimi').select2('data');
    var sayfalarSelect2Selected = $('#Sayfalar').select2('data');

    for (var i = 0; i < orgBirimSelect2Selected.length; i++) {
        Id = parseInt(orgBirimSelect2Selected[i].id);
        IlgiliKurumOrganizasyonBirimIdList.push(Id);
    }

    for (var j = 0; j < sayfalarSelect2Selected.length; j++) {
        id = parseInt(sayfalarSelect2Selected[j].id);
        ErisimYetkisiVerilenSayfaIdList.push(id);
    }
    console.log(IlgiliKurumOrganizasyonBirimIdList);
    console.log(ErisimYetkisiVerilenSayfaIdList);

    var data = {
        OrganizasyonBirimiID: parseInt($("#select-param-organizasyon-birimi").select2().find(":selected")[0].value),
        IlgiliKurumOrganizasyonBirimIdList: IlgiliKurumOrganizasyonBirimIdList,
        ErisimYetkisiVerilenSayfaIdList: ErisimYetkisiVerilenSayfaIdList,
    };

    $.ajax({
        data: data,
        url: "/YetkiMerkezi/ErisimYetkilendirmeTanimlariKaydet",
        type: "POST",
        dataType: "json",
        success: function (result) {
            alertim.toast(siteLang.Kaydet, alertim.types.warning);
            $('#select-param-organizasyon-birimi').val(0).trigger('change');
            $('#select-organizasyon-birimi').val(null).trigger('change');
            $('#Sayfalar').val(null).trigger('change');
            window.location.href = "/AuthCenter/AccessAuthList";
        },
        error: function (e) {
            errorHandler(e);
        }
    })
}