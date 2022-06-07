﻿var StudyoTemelKayitModel = {};
var AdresModel = {};
var TelefonModel = {};
var SosyalMedyaModel = {};

var BolgeTanimlariList = [];
var BolgelerList = [];

var UlkeListforDDL = [];
var SehirListforDDL = [];
var AdresTipiListForDDL = [];
var TelefonTipiListForDDL = [];
var SosyalMedyaTipiListForDDL = [];
var VergiDaireListForDDL = [];

$(document).ready(function () {

    $("#AdresTekrarliAlan").html($(AdresTekrarDiv));
    $("#TelefonTekrarliAlan").html($(TelefonTekrarDiv));
    $("#TelefonTekrarliAlan").html($(TelefonTekrarDiv));
    $("#SosyalMedyaTekrarliAlan").html($(SosyalMedyaTekrarDiv));
    SosyalMedyaListGetir();
    StudyoTipleriGetir();
    TelefonTipiGetir();
    UlkeGetir();
    AdresTipiGetir();
    VergiDaireListGetir();
    BolgeTanimlariGetir();
    BolgeleriGetir();
    $('#DogduguUlke').attr("onchange", "SehirListGetir('DogduguSehir',$('#DogduguUlke').val())");
    $('#Ulke_').attr("onchange", "SehirListGetir('Sehir_',$('#Ulke_').val())");
    $("#HanutcuTable").DataTable().destroy();
    $('#HanutcuTable').DataTable({
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

    $("#mekanlarTable").DataTable().destroy();
    $('#mekanlarTable').DataTable({
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


    $(document).on('click', '.AdresAddButton', function () {

        $(document).find("[id^='ATipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });
        $(document).find("[id^='Ulke_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        $(document).find("[id^='Sehir_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        TekrarliAlanAddClickForAdres("Adres", $("[id^='AdresTekrar_']").last());

        $(".AdresRemoveButton").show();

        var $e = $(document).find("[id^='ATipi_']").last();
        var $e1 = $(document).find("[id^='Ulke_']").last();
        var $e2 = $(document).find("[id^='Sehir_']").last();
        $(document).find("[id^='ATipi_']").each(function (i, e) {
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
    $(document).on('click', '.AdresRemoveButton', function (e) {
        var btn = $(e.target);
        $(btn).closest("[id^='AdresTekrar_']").remove();
        if ($(".AdresTekrar").length == 1) {
            $(".AdresRemoveButton").hide();
        }
    });

    $(document).on('click', '.TelefonAddButton', function () {
        $(document).find("[id^='TelefonTipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });
        TekrarliAlanAddClickDiger("Telefon", $("[id^='TelefonTekrar_']").last());
        $(".TelefonRemoveButton").show();

        var $e = $(document).find("[id^='TelefonTipi_']").last();
        $(document).find("[id^='TelefonTipi_']").each(function (i, e) {
            $(e).select2();
        });
        $e.attr("tabloId", 0);
        CustomInputMask(".kisiTelNo");

    });
    $(document).on('click', '.TelefonRemoveButton', function (e) {
        //TekrarliAlanRemoveClick("Telefon");
        var btn = $(e.target);
        $(btn).closest("[id^='TelefonTekrar_']").remove();
        if ($(".TelefonTekrar").length == 1) {
            $(".TelefonRemoveButton").hide();
        }
    });
    $(document).on('click', '.SosyalMedyaAddButton', function () {
        $(document).find("[id^='HesapTipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });
        TekrarliAlanAddClickDiger("SosyalMedya", $("[id^='SosyalMedyaTekrar_']").last());
        $(".SosyalMedyaRemoveButton").show();

        var $e = $(document).find("[id^='HesapTipi_']").last();
        $(document).find("[id^='HesapTipi_']").each(function (i, e) {
            $(e).select2();
        });
        $e.attr("tabloId", 0);
    });
    $(document).on('click', '.SosyalMedyaRemoveButton', function (e) {
        //TekrarliAlanRemoveClick("Telefon");
        var btn = $(e.target);
        $(btn).closest("[id^='SosyalMedyaTekrar_']").remove();
        if ($(".SosyalMedyaTekrar").length == 1) {
            $(".SosyalMedyaRemoveButton").hide();
        }
    });

    if ($(".AdresTekrar").length == 1) {
        $(".AdresRemoveButton").hide();
    }
    if ($(".TelefonTekrar").length == 1) {
        $(".TelefonRemoveButton").hide();
    }
    if ($(".SosyalMedyaTekrar").length == 1) {
        $(".SosyalMedyaRemoveButton").hide();
    }

    CustomInputMask(".kisiTelNo");

});

function TekrarliAlanAddClickDiger(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    $("#" + alanID + "Tekrar_" + newID).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        if (!newFieldID.includes('MezuniyetTarihi'))
            $(e).val("");
    });

    $("#" + alanID + "Tekrar_" + newID).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        var id = $(e).attr("id");
        if (id.includes("Okul")) {
            ParamDDLDoldur(id, OkulTipiListForDDL);
        } else if (id.includes("Telefon")) {
            ParamDDLDoldur(id, TelefonTipiListForDDL);
        } else if (id.includes("YabanciDil")) {
            ParamDDLDoldur(id, YabanciDilTipiListForDDL);
        }
        $(e).val(0);
    });
    $("#" + alanID + "Tekrar_" + newID).find("textarea").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        $(e).val("");
    });
    PhoneMask();
}
function TekrarliAlanAddClickForAdres(alanID, alanDiv) {
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
        if (id.includes("Adres")) {
            ParamDDLDoldur(id, ATipiListForDDL);
        } else if (id.includes("Okul")) {
            ParamDDLDoldur(id, OkulTipiListForDDL);
        } else if (id.includes("Telefon")) {
            ParamDDLDoldur(id, TelefonTipiListForDDL);
        } else if (id.includes("YabanciDil")) {
            ParamDDLDoldur(id, YabanciDilTipiListForDDL);
        }
        if ($(e).attr("id").includes("Ulke")) {
            ParamDDLDoldur(id, UlkeListforDDL);
            $(e).attr("onchange", "SehirListGetir('Sehir_" + newID + "',$('#Ulke_" + newID + "').val())");
        }
        if ($(e).attr("id").includes("Sehir")) {
            $(e).html("<option value='0' hidden>" + siteLang.Choose + "</option>");
            //$(e).change();
        }
    });
    $("#" + alanID + "Tekrar_" + newID).find("textarea").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
        $(e).val("");
    });
}

function ParamDDLDoldur(alanID, data) {
    var str = "<option value='0'>Seçiniz </option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].tanim + "</option>";
    }
    $("#" + alanID).html(str);
}
function ParamDDLDoldurBolge(alanID) {
    var str = "<option value='0'>Seçiniz </option>";
    for (var i = 0; i < BolgeTanimlariList.length; i++) {
        str += "<option value='" + BolgeTanimlariList[i].tabloID + "'>" + BolgeTanimlariList[i].bolgeAdi + "</option>";
    }
    $("#" + alanID).html(str);
}

function StudyoTipleriGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamSubeTipleri",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            ParamDDLDoldur("studyotipidrd", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function TelefonTipiGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamTelefonTipi",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            TelefonTipiListForDDL = result.value;
            ParamDDLDoldur("TelefonTipi_", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function AdresTipiGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamAdresTipi",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            AdresTipiListForDDL = result.value;
            ParamDDLDoldur("ATipi_", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function UlkeGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamUlkeler",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            UlkeListforDDL = result.value;
            ParamDDLDoldur("Ulke_", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function SehirListGetir(alanID, ulkeID) {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamUlkeler",
        UstId: ulkeID
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            SehirListforDDL = result.value;
            ParamDDLDoldur(alanID, result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function SosyalMedyaListGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamSosyalMedyaTipleri",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            SosyalMedyaTipiListForDDL = result.value;
            ParamDDLDoldur("HesapTipi_", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
}
function VergiDaireListGetir() {
    var ParametreRequest = {
        Tanim: "test",
        ModelName: "ParamVergiDaireleri",
        UstId: 0
    }
    Post("/globalparameters/ParamList", ParametreRequest, function (result) {
        if (result.isSuccess == true) {
            console.log(result.value);
            VergiDaireListForDDL = result.value;
            ParamDDLDoldur("vergiDairesidrd", result.value);
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    }, function (e) {
        console.log(e);
    }, false, false)
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
                ParamDDLDoldurBolge("Bolge_")
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function BolgeleriGetir() {
    $.ajax({
        type: "GET",
        url: "/bolge/BolgelerList",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            var data;
            if (result.isSuccess == true) {
                data = result.value;
                console.log(data);
                BolgelerList = data;
                

            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}


//Tekrarlı alan string variables //
var AdresTekrarDiv = " <div class='AdresTekrar mt-3' id='AdresTekrar_1'>\
                            <div class='row'>\
                                <div class='col-md-3'>\
                                    <div class='form-group'>\
                                        <label  class='Lbl' for='ATipi_'>"+ siteLang.AdresTipi + "</label>\
                                        <select id='ATipi_' class='form-control' style='width: 100%;'>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class='col-md-3'>\
                                    <div class='form-group'>\
                                        <label  class='Lbl' >"+ siteLang.Ulke + "</label>\
                                        <select id='Ulke_' class='form-control' style='width: 100%;' onchange='SehirListGetir('Sehir_',$('#Ulke_').val())'>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class='col-md-3'>\
                                    <div class='form-group'>\
                                        <label  class='Lbl' >"+ siteLang.Sehir + "</label>\
                                        <select id='Sehir_' class='form-control' style='width: 100%;'>\
                                        <option value='0' hidden>"+ siteLang.Choose + "</option>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class='col-md-12'>\
                                    <div class='form-group'>\
                                        <label  class='Lbl' >"+ siteLang.Adres + "</label>\
                                        <textarea id='Adres_1' class='form-control' rows='3' placeholder='"+ siteLang.Adres + "...'></textarea>\
                                        <label for='Adres' class='validationMessage'></label>\
                                    </div>\
                                </div>\
                                <div class='AdrestekrarBtnGrp'>\
                                    <button type='button' class='btn btn-xs AdresAddButton'>\
                                        <i class='fas fa-plus'></i>"+ siteLang.AdresEkle + "\
                                    </button> &nbsp\
                                    <button type='button' class='btn btn-xs AdresRemoveButton'>\
                                        <i class='fas fa-minus-circle accent-danger'></i>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>";

var TelefonTekrarDiv = "<div class='TelefonTekrar' id='TelefonTekrar_1'>\
                            <div class='row'>\
                                <div class='col-md-6'>\
                                    <div class='form-group'>\
                                        <label class='Lbl' for='TelefonTipi_'>"+ siteLang.TelefonTipi + "</label>\
                                        <select id='TelefonTipi_' class='form-control .TelefonTipiDDL' style='width: 100%;'>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class='col-md-6'>\
                                    <div class='form-group'>\
                                        <label class='Lbl' for='TelefonNo_1'>"+ siteLang.TelefonNo + "</label>\
                                        <div class='input-group'>\
                                            <div class='input-group-prepend'>\
                                                <div class='dropdown h-100'>\
                                                    <button class='btn h-100 btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>\
                                                        <a href='#'>\
                                                            <img id='ddlImg' src='/lib/flag-icons/24x24/TR.png' />\
                                                        </a>\
                                                    </button>\
                                                    <ul class='pr-5 dropdown-menu dropdown-menu-flags text-center' id='phoneicons'>\
                                                    </ul>\
                                               </div>\
                                            </div>\
                                            <input type='text' id='TelefonNo_1' class='form-control kisiTelNo' >\
                                            <label for='TelefonNo' class='validationMessage'></label>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class='TelefontekrarBtnGrp'>\
                                    <button type='button' class='btn btn-xs TelefonAddButton'>\
                                        <i class='fas fa-plus'></i> "+ siteLang.TelefonEkle + "\
                                    </button> &nbsp\
                                    <button type='button' class='btn btn-xs TelefonRemoveButton'>\
                                        <i class='fas fa-minus-circle accent-danger'></i>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>";


var SosyalMedyaTekrarDiv = "<div class='SosyalMedyaTekrar mt-3' id='SosyalMedyaTekrar_1'>\
                         <div class='row'>\
                                <div class='col-md-6'>\
                                    <div class='form-group'>\
                                    <label class=''>"+ siteLang.SosyalMedyaPlatformları + "</label>\
                                    <select id='HesapTipi_' class='form-control select2 '>\
                                    </select>\
                                </div>\
                                </div>\
                                <div class='col-md-6'>\
                                    <label class=''>"+ siteLang.KullaniciAdi + "</label>\
                                    <input type='text' id='HesapAdi_' class='form-control'>\
                                </div>\
                                <div class='SosyaltekrarBtnGrp'>\
                                    <button type='button' class='btn btn-xs SosyalMedyaAddButton'>\
                                        <i class='fas fa-plus'></i> "+ siteLang.HesapEkle + "\
                                    </button> &nbsp\
                                    <button type='button' class='btn btn-xs SosyalMedyaRemoveButton'>\
                                        <i class='fas fa-minus-circle accent-danger'></i>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>";

function StudyoVerileriModeleBas() {
    StudyoTemelKayitModel = {};
    AdresModel = {};
    TelefonModel = {};
    SosyalMedyaModel = {};

    AdresListesi = [];
    TelefonListesi = [];
    SosyalMedyaListesi = [];

    StudyoTemelKayitModel["SirketTamAdi"] = $("#sirketTamAdi").val(); //DDL
    StudyoTemelKayitModel["SirketUnvani"] = $("#sirketUnvani").val(); //DDL
    StudyoTemelKayitModel["SubeTipiId"] = $("#studyotipidrd option:selected").val();
    StudyoTemelKayitModel["StudyoAdi"] = $("#studyoAdi").val(); //DDL
    StudyoTemelKayitModel["BagliOlduguSubeId"] = $("#bagliOlduguStudyodrd option:selected").val();
    StudyoTemelKayitModel["KurumVergiDairesiId"] = $("#vergiDairesidrd option:selected").val();//VergiDairesi
    StudyoTemelKayitModel["VergiNo"] = $("#VergiNo").val();
    StudyoTemelKayitModel["KoltukSayisi"] = $("#koltukSayisi").val();
    StudyoTemelKayitModel["TasarimİstasyonSayisi"] = $("#tasarimİstasyonSayisi").val();
    StudyoTemelKayitModel["EpostaAdresi"] = $("#EpostaAdresi").val();




    $("[id^=AdresTekrar_]").each(function (i, e) {
        AdresModel["AdresTipi"] = $(e).find("[id^='ATipi_']").val();
        AdresModel["Ulke"] = $(e).find("[id^='Ulke_']").val();
        AdresModel["Sehir"] = $(e).find("[id^='Sehir_']").val();
        AdresModel["Adres"] = $(e).find("[id^='Adres_']").val();
        AdresModel["Bolge"] = $("#Bolge_").val();
        AdresListesi.push(AdresModel);
        AdresModel = {};
    });
    $("[id^=TelefonTekrar_]").each(function (i, e) {
        TelefonModel["TelefonTipi"] = $(e).find("[id^='TelefonTipi_']").val();
        TelefonModel["TelefonNo"] = $(e).find("[id^='TelefonNo_']").val();
        TelefonListesi.push(TelefonModel);
        TelefonModel = {};
    });
    $("[id^=SosyalMedyaTekrar_]").each(function (i, e) {
        SosyalMedyaModel["HesapTipi"] = $(e).find("[id^='HesapTipi_']").val();
        SosyalMedyaModel["HesapAdi"] = $(e).find("[id^='HesapAdi_']").val();
        SosyalMedyaListesi.push(SosyalMedyaModel);
        SosyalMedyaModel = {};
    });


    StudyoTemelKayitModel["AdresListesi"] = AdresListesi;
    StudyoTemelKayitModel["TelefonListesi"] = TelefonListesi;
    StudyoTemelKayitModel["SosyalMedyaListesi"] = SosyalMedyaListesi;

    console.log(StudyoTemelKayitModel);
}

function StudyoTemelVeriKaydet() {
    StudyoVerileriModeleBas();
    var model = StudyoTemelKayitModel;
    $.ajax({
        type: "POST",
        url: "/studyo/StudyoTemelVerileriKaydet/",
        dataType: "json",
        data: model, // < === this is where the problem was !!
        success: function (result) {
            alert("Kayıt Başarılı");
            location.href = "/cleopatra/StudyoListesi";

        },
        error: function (e) {
            
            console.log(e);
            errorHandler(e);
        }, //success: function (result) {
    });
}