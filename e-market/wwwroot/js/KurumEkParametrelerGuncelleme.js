var KurumEkParametreViewModel = {};
var KurumEkParametreOlasiDegerler = {};
var tabloID;
var DegerListesi = [];

$(document).ready(function () {
    tabloID = GetURLParameter();
    $("#DegerTekrarliAlanG").append($(DegerTekrarDiv));
    $("#ParamTipGuncelle").on('change', function () {
        var paramTip = $("#ParamTipGuncelle option:selected").val()
        var gosterimTip = ""
        if (paramTip == 1) {
            gosterimTip = `<option value="1">Textbox</option>
                           <option value="2">TextArea</option>
                           <option value="3">NumericText</option>
                           <option value="4">Datepicker</option>`
        } else if (paramTip == 2) {
            gosterimTip = `<option value="5">Dropdown</option>
                           <option value="6">Listbox</option>
                           <option value="7">Radiobox</option>
                           <option value="8">Checkbox</option>`
        } else if (paramTip == 3) {
            gosterimTip = `<option value="9">Filepicker</option>`
        }
        $("#ParamGosTipGuncelle").html(gosterimTip);

        if ($("#ParamTipGuncelle option:selected").val() === "2") {
            $("#DegerTekrarliAlanG").show();
            $("#DegerTekrarliAlanG").html($(DegerTekrarDiv));
            if ($(".DegerTekrar").length <= 1) {
                $(".DegerRemoveButton").hide();
            }
            return;
        } else {
            $("#DegerTekrarliAlanG").hide();
        }
    });
    //ZorunluMu True False Checkbox value
    $("#ZorunluMuGuncelleCheckbox").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).attr('value', true);
        }
        else {
            $(this).attr('value', false);
        }
    });

    EkParametreVerileriniGetir(tabloID);
    $(document).on('click', '.DegerAddButton', function () {
        TekrarliAlanAddClickDiger("Deger", $("[id^='DegerTekrar_']").last());
        $(".DegerRemoveButton").show();
    });
    $(document).on('click', '.DegerRemoveButton', function (e) {
        var btn = $(e.target);
        $(btn).closest("[id^='DegerTekrar_']").remove();
        if ($(".DegerTekrar").length <= 1) {
            $(".DegerRemoveButton").hide();
        }
    });

    /*Kontroller sonu*/
    $('#guncelleButton').on("click", function () {
        KurumEkParametrelerGuncelle();
    });
});

function EkParametreVerileriniGetir(tabloID) {
    $.ajax({
        type: "GET",
        url: "/ekparametreler/EkParametreListesiID/" + tabloID,
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                KurumEkParametreViewModel = result.value;
                DegerListesi = result.value.olasiDegerler;
                console.log(KurumEkParametreViewModel);
                EkParametreleriSayfayaBas();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function KurumEkParametrelerGuncelle() {
    GuncellenenVerileriModeleBas();
    var model = KurumEkParametreViewModel;
    $.ajax({
        type: "POST",
        url: "/ekparametreler/KurumEkParametreGuncelle",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result.isSuccess == true) {
                //KurumEkParametreler(result.value.tabloID);
                alertim.toast(siteLang.Guncelle, alertim.types.success, function () {
                    location.href = "/SuppParameters/CompanySuppParameterList";
                });
            } else {
                return;
            }
        },
        error: function (e) {
            errorHandler(e);
        }
    });
}

function EkParametreleriSayfayaBas() {
    $("#ParamAdiGuncelle").val(KurumEkParametreViewModel[0].parametreAdi)
    $('#ParamTipGuncelle [value=' + KurumEkParametreViewModel[0].parametreTipi + ']').attr('selected', 'true').change();
    $('#ParamGosTipGuncelle [value=' + KurumEkParametreViewModel[0].parametreGosterimTipi + ']').attr('selected', 'true');
    $('#ZorunluMuGuncelleCheckbox').val(KurumEkParametreViewModel[0].zorunluMu)

    if (KurumEkParametreViewModel[0].zorunluMu == null) {
        $('#ZorunluMuGuncelleCheckbox').prop("checked", false);
    } else {
        $('#ZorunluMuGuncelleCheckbox').prop("checked", KurumEkParametreViewModel[0].zorunluMu);
    }

    if ($("#ParamTipGuncelle option:selected").val() === "2") {
        $("#DegerTekrarliAlanG").show();
        $("#DegerTekrarliAlanG").html($(DegerTekrarDiv));
        for (var i = 0; i < KurumEkParametreViewModel[0].olasiDegerler.length - 1; i++) {
            TekrarliAlanAddClickDiger("Deger", $('#DegerTekrar_1'));
        }

        if (KurumEkParametreViewModel[0].olasiDegerler.length > 0) {
            $("[id^=DegerTekrar_]").each(function (i, e) {
                $(e).find("[id^='DegerAdi_']").val(KurumEkParametreViewModel[0].olasiDegerler[i].olasiDegerAdi);
                $(e).find("[id^='DegerAdi_']").attr('olasiDegerId', KurumEkParametreViewModel[0].olasiDegerler[i].tabloID);
            });
        }
    } else {
        $("#DegerTekrarliAlanG").hide();
    }
    if ($(".DegerTekrar").length <= 1) {
        $(".DegerRemoveButton").hide();
    }
}

function GuncellenenVerileriModeleBas() {
    KurumEkParametreViewModel = {};
    KurumEkParametreOlasiDegerler = {};
    DegerListesi = [];
    KurumEkParametreViewModel["TabloID"] = tabloID;
    KurumEkParametreViewModel["ParametreAdi"] = $("#ParamAdiGuncelle").val();
    KurumEkParametreViewModel["ParametreTipi"] = $("#ParamTipGuncelle").val(); //DDL
    KurumEkParametreViewModel["ParametreGosterimTipi"] = $("#ParamGosTipGuncelle").val(); //DDL
    KurumEkParametreViewModel["ZorunluMu"] = $("#ZorunluMuGuncelleCheckbox").val(); //Checkbox

    $("[id^=DegerTekrar_]").each(function (i, e) {
        KurumEkParametreOlasiDegerler["OlasiDegerAdi"] = $(e).find("[id^='DegerAdi_']").val();
        KurumEkParametreOlasiDegerler["TabloID"] = $(e).find("[id^='DegerAdi_']").attr('olasiDegerId');
        DegerListesi.push(KurumEkParametreOlasiDegerler);
        KurumEkParametreOlasiDegerler = {};
    });
    KurumEkParametreViewModel["OlasiDegerler"] = DegerListesi;
    console.log(KurumEkParametreViewModel);
}

function TekrarliAlanAddClickDiger(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlanG").append($(clone));
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        id = $(e).attr("id");
        $(e).removeAttr('olasiDegerId');
        $(e).val("");
    });

    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        //var id = $(e).attr("id");
        $(e).val(0);
    });
}

var DegerTekrarDiv = "<div class='card-body DegerTekrar' id='DegerTekrar_1'>\
                        <div class='row'>\
                            <div class='col-md-9' style='text-align:center'>\
                                <div class='form-group'>\
                                    <label for='inputSpentBudget'>"+ siteLang.Deger + "</label>\
                                    <input type='text' id='DegerAdi_1' class='form-control'>\
                                    <label for='OlasiDegerAdi' class='validationMessage'>\
                                </div>\
                            </div>\
                            </br>\
                            <div class='col-md-3 my-auto DegertekrarBtnGrp'>\
                                 <button type='button' class='btn btn-xs DegerAddButton'>\
                                    <i class='fas fa-plus'></i>\
                                </button> &nbsp\
                                <button type='button' class='btn btn-xs DegerRemoveButton'>\
                                    <i class='fas fa-minus-circle accent-danger'></i>\
                                </button>\
                            </div>\
                        </div>\
                    </div>";