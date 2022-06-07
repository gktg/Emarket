$(function () {
    $("#KurumAdresTekrarliAlan").append($(KurumAdresTekrarliAlan));
    $(document).on('click', '.KurumAdresAddButton', function () {
        $(document).find("[id^='LokasyonTipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });
        $(document).find("[id^='Ulke_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        $(document).find("[id^='Sehir_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        TekrarliAlanAddClickForAdres("KurumAdres", $("[id^='KurumAdresTekrar_']").last());
        $(".KurumAdresRemoveButton").show();

        var $e = $(document).find("[id^='LokasyonTipi_']").last();
        var $e1 = $(document).find("[id^='Ulke_']").last();
        var $e2 = $(document).find("[id^='Sehir_']").last();
        $(document).find("[id^='LokasyonTipi_']").each(function (i, e) {
            $(e).select2();
        });

        $(document).find("[id^='Ulke_']").each(function (i, e) {
            $(e).select2();
        });

        $(document).find("[id^='Sehir_']").each(function (i, e) {
            $(e).select2();
        });
        $e.attr("tabloId", 0);
        $e1.attr("tabloId", 0);
        $e2.attr("tabloId", 0);
    });
    $(document).on('click', '.KurumAdresRemoveButton', function (e) {
        var btn = $(e.target);
        $(btn).closest("[id^='KurumAdresTekrar_']").remove();
        if ($(".KurumAdresTekrar").length == 1) {
            $(".KurumAdresRemoveButton").hide();
        }
    });
    if ($(".KurumAdresTekrar").length == 1) {
        $(".KurumAdresRemoveButton").hide();
    }

});


function TekrarliAlanAddClickForAdres(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        $(e).val("");
    });
    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        var id = $(e).attr("id");
        if ($(e).attr("id").includes("Ulke")) {
            $(e).removeAttr("onchange");
            $(e).attr("onchange", "SehirListGetir('Sehir_" + newID + "',$('#Ulke_" + newID + "').val())");
        }
        if ($(e).attr("id").includes("Sehir")) {
            $(e).html("<option value='0' hidden>" + siteLang.Choose + "</option>");
        }
    });
    $("#" + alanID + "Tekrar_" + newID).find("textarea").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        $(e).val("");
    });
    $("#Ulke_" + newID + "").change();
}

var KurumAdresTekrarliAlan = "<div class='KurumAdresTekrar' id='KurumAdresTekrar_1'>\
                                            <div class='col-md-12'>\
                                                <div class='form-group'>\
                                                    <label class='Lbl' for='LokasyonTipi'>"+ siteLang.LokasyonTipi + "</label>\
                                                    <select id='LokasyonTipi_1' class='form-control' style='width: 100%;'>\
                                                    </select>\
                                                </div>\
                                                <div class='row'>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.Ulke + "</label>\
                                                            <select id='Ulke_1' class='form-control' style='width: 100%;' onchange='SehirListGetir(\"Sehir\",$(\"#Ulke_1\").val())'></select>\
                                                        </div>\
                                                    </div>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.Sehir + "</label>\
                                                            <select id='Sehir_1' class='form-control' style='width: 100%;'>\
                                                             <option value='0' hidden>"+ siteLang.Choose1 + "</option>\
                                                            </select>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div class='form-group'>\
                                                    <label class='Lbl'>"+ siteLang.Adres + "</label>\
                                                    <textarea id='Adres_1' class='form-control' rows='1' placeholder='"+ siteLang.Adres + " ...'></textarea>\
                                                <label for='Adres' class='validationMessage'></label>\
                                                </div>\
                                                <div class='AdrestekrarBtnGrp'>\
                                                    <button type='button' class='btn btn-xs KurumAdresAddButton'>\
                                                        <i class='fas fa-plus'></i>"+ siteLang.AdresEkle + "\
                                                    </button> &nbsp;\
                                                    <button type='button' class='btn btn-xs KurumAdresRemoveButton' style='display: none;'>\
                                                        <i class='fas fa-minus-circle accent-danger'></i>\
                                                    </button>\
                                                </div>\
                                            </div>\
                                        </div>";