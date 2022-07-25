var PageModel = {};

$(document).ready(function () {


})


function ModeleBas() {

    PageModel["PageName"] = $("#txtSayfaAdi").val();
    PageModel["PageUrl"] = $("#txtUrl").val();
    PageModel["Role"] = $("#drdErisim").val();
}


function SayfaEkle() {
    ModeleBas();
    var model = PageModel;
    $.ajax({
        type: "Post",
        url: "/emarket/SayfaEkle/",
        dataType: "json",
        data: model,
        async: false,
        success: function (result) {
            if (result != null) {
                alertim.toast(siteLang.Kaydet, alertim.types.success);
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        }
    })
}