//Bu js dosyasına sadece  cleopatra projesinde kullanılacak genel js fonk'ları yazılacak.ör:ParamVucutBolgelerini getiren fonk.

var vucutBolgeleri = [];

function VucutBolgeleriGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamVucutBolgeleri",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            vucutBolgeleri = result.value;
            ParamDDLDoldur("vucutBolgeleri_", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}

function TekrarliAlanAddClickForVucutBolgeleri(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[1];
        $(e).attr("id", newFieldID + "" + newID);
        $(e).val("");
    });
    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        var id = $(e).attr("id");
        if (id.includes("vucutBolgeleri")) {
            ParamDDLDoldur(id, vucutBolgeleri);
        } 

    });
    $("#" + alanID + "Tekrar_" + newID).find("textarea").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        $(e).val("");
    });
}
