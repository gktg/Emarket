var KurumEkParametreViewModel = {};
var KurumEkParametreOlasiDegerler = {};

var DegerListesi = [];
$(document).ready(function () {
    $("#ParamTip").on('change', function () {
        var paramTip = $("#ParamTip option:selected").val()
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
        $("#ParamGosTip").html(gosterimTip);

        if ($("#ParamTip option:selected").val() === "2") {
            $("#DegerTekrarliAlan").show();
            $("#DegerTekrarliAlan").html($(DegerTekrarDiv));
            if ($(".DegerTekrar").length <= 1) {
                $(".DegerRemoveButton").hide();
            }
            return;
        } else {
            $("#DegerTekrarliAlan").hide();
        }
    });
    $("#ParamTip").val(1).change();

    //ZorunluMu True False Checkbox value
    $("#ZorunluMuCheckbox").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).attr('value', true);
        }
        else {
            $(this).attr('value', false);
        }
    });

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

    $('#ekParamKaydetButton').on("click", function () {
        KurumEkParametreKaydet();
    });
});

function KurumEkParametreKaydet() {
    VerileriModeleBas();
    var model = KurumEkParametreViewModel;
    $.ajax({
        type: "POST",
        url: "/ekparametreler/KurumEkParametreKaydet",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result.isSuccess == true) {
                alertim.toast(siteLang.Kaydet, alertim.types.success, function () {
                    location.href = "/SuppParameters/CompanySuppParameterList";
                });
            }
        },
        error: function (e) {
            errorHandler(e);
        }
    });
}

function VerileriModeleBas() {
    KurumEkParametreViewModel = {};
    KurumEkParametreOlasiDegerler = {};
    DegerListesi = [];
    KurumEkParametreViewModel["ParametreAdi"] = $("#ParamAdi").val();
    KurumEkParametreViewModel["ParametreTipi"] = $("#ParamTip").val(); //DDL
    KurumEkParametreViewModel["ParametreGosterimTipi"] = $("#ParamGosTip").val(); //DDL
    KurumEkParametreViewModel["ZorunluMu"] = $("#ZorunluMuCheckbox").val(); //Checkbox

    $("[id^=DegerTekrar_]").each(function (i, e) {
        KurumEkParametreOlasiDegerler["OlasiDegerAdi"] = $(e).find("[id^='DegerAdi_']").val();
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
                            <div class='col-md-3 mt-4 DegertekrarBtnGrp'>\
                                 <button type='button' class='btn btn-xs DegerAddButton'>\
                                    <i class='fas fa-plus'></i>\
                                </button> &nbsp\
                                <button type='button' class='btn btn-xs DegerRemoveButton'>\
                                    <i class='fas fa-minus-circle accent-danger'></i>\
                                </button>\
                            </div>\
                        </div>\
                    </div>";

// Kurum Ek Parametre Listeleme İşlemleri

var ParametreTipiListesi = ["", siteLang.Metin, siteLang.Seçim, siteLang.Dosya];
var ParametreGosterimListesi = ["", "Textbox", "TextArea", "NumericText", "Datepicker", "Dropdown", "Listbox", "Radiobox", "Checkbox", "Filepicker"];

$(function () {
    $('#ekleHeaderbtn').on('click', function () {
        location.href = "/SuppParameters/CompanySuppParametersDefinition";
    });
    KurumEkParamVerileriniGetir();
});

function KurumEkParamVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/ekparametreler/KurumEkParametreList",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                for (var i = 0; i < result.value.length; i++) {
                    result.value[i].ParametreTipiText = ParametreTipiListesi[result.value[i].parametreTipi];
                    result.value[i].ParametreGosterimTipiText = ParametreGosterimListesi[result.value[i].parametreGosterimTipi];
                }
                $("#KEkParamListesiTable").DataTable().destroy();
                var satirlar = "";
                data = result.value;
                for (var i = 0; i < data.length; i++) {
                    satirlar += "<tr >\
                    <td >"+ data[i].parametreAdi + "</td>\
                    <td >"+ data[i].ParametreTipiText + "</td>\
                    <td >"+ data[i].ParametreGosterimTipiText + "</td>\
                    <td style=' min-width: 20% !important;'><button type='button' class='btn ' onclick='GuncelleSayfasınaGit(" + data[i].tabloID + ")'><img src='/img/edit.svg'/> </button>\
                    <button type='button' class='btn ' onclick='Sil(" + data[i].tabloID + ")'><img src='/img/trash.svg'/></button></td>\
                     </tr>";
                }
                $("#tbody").html(satirlar);

                $('#KEkParamListesiTable').DataTable({
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
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function Sil(tabloID) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $.ajax({
                type: "GET",
                url: "/ekparametreler/KurumEkParametreSil/" + tabloID,
                dataType: "json",
                data: null,
                success: function (result) {
                    if (result.isSuccess) {
                        if (result.value) {
                            KurumEkParamVerileriniGetir();
                            alertim.toast(siteLang.Sil, alertim.types.success);
                        }
                        else {
                            alertim.toast(siteLang.KayitliVeriHata, alertim.types.warning);
                        }
                    } else {
                        alertim.toast(siteLang.KayitliVeriHata, alertim.types.warning);
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
    location.href = "/SuppParameters/CompanySuppParametersUpdate/" + id;
}