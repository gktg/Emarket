//Global parameters
var pozisyonTipId = 2;
var KisiTemelKayitModel = {};
var AdresModel = {};
var OkulModel = {};
var TelefonModel = {};
var DilModel = {};

var AdresListesi = [];
var OkulListesi = [];
var TelefonListesi = [];
var DilListesi = [];

var KurumListForDDL = [];
var UlkeListforDDL = [];
var SehirListforDDL = [];
var CinsiyetListforDDL = [];
var YabanciDilTipiListForDDL = [];
var MedeniHalListForDDL = [];
var OkulTipiListForDDL = [];
var ATipiListForDDL = [];
var TelefonTipiListForDDL = [];
var OrgListForDLL = [];
var DinListForDDL = [];
var kullaniciAdiUygunMuKontrol = false;

var request = {};
var yeniStr = "";

$(document).ready(function () {
    AdminMi();
    TCNoMask('#Tc');
    $(document).on("change", ".InputSil", function () {
        //readURL(this);
        ////$('#blah').show();
        ////$("#blah1").show();
        if ($('.InputSil').val()) {
            $('.InputSil').after("<button type='button' id='InputS' class= 'close' aria-label='Close' onclick='InputSil()'><span class='spcss' aria-hidden='true'>&times;</span></button>");
        }
    });

    $("#AdresTekrarliAlan").html($(AdresTekrarDiv));
    $("#OkulTekrarliAlan").html($(OkulTekrarDiv));
    $("#TelefonTekrarliAlan").html($(TelefonTekrarDiv));
    $("#YabanciDilTekrarliAlan").html($(DilTekrarDiv));
    //ParamDDLDoldur("YabanciDilTipi", YabanciDilTipi + "ListforDDL", "tabloID", "paramTanim");
    //BirimDDLDoldur()

    $('#DogduguUlke').attr("onchange", "SehirListGetir('DogduguSehir',$('#DogduguUlke').val())");
    $('#Ulke_').attr("onchange", "SehirListGetir('Sehir_',$('#Ulke_').val())");

    /*Tekrarlı Alan Ekleme - çıkarma buton kontrolleri*/
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
    $(document).on('click', '.OkulAddButton', function () {
        $(document).find("[id^='OkulTipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        TekrarliAlanAddClickDiger("Okul", $("[id^='OkulTekrar_']").last());
        $(".OkulRemoveButton").show();

        var $e = $(document).find("[id^='OkulTipi_']").last();
        var $e1 = $(document).find("[id^='MezuniyetTarihi_']").last();

        $(document).find("[id^='OkulTipi_']").each(function (i, e) {
            $(e).select2();
        });
        $e.attr("tabloId", 0);
        $e1.val("");
    });
    $(document).on('click', '.OkulRemoveButton', function (e) {
        //TekrarliAlanRemoveClick("Okul");
        var btn = $(e.target);
        $(btn).closest("[id^='OkulTekrar_']").remove();
        if ($(".OkulTekrar").length == 1) {
            $(".OkulRemoveButton").hide();
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

    });
    $(document).on('click', '.TelefonRemoveButton', function (e) {
        //TekrarliAlanRemoveClick("Telefon");
        var btn = $(e.target);
        $(btn).closest("[id^='TelefonTekrar_']").remove();
        if ($(".TelefonTekrar").length == 1) {
            $(".TelefonRemoveButton").hide();
        }
    });

    $(document).on('click', '.DilAddButton', function () {
        $(document).find("[id^='YabanciDilTipi_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        TekrarliAlanAddClickDiger("YabanciDil", $("[id^='YabanciDilTekrar_']").last());
        $(".DilRemoveButton").show();

        var $e = $(document).find("[id^='YabanciDilTipi_']").last();

        $(document).find("[id^='YabanciDilTipi_']").each(function (i, e) {
            $(e).select2();
        });
        $e.attr("tabloId", 0);
    });
    $(document).on('click', '.DilRemoveButton', function (e) {
        //TekrarliAlanRemoveClick("YabanciDil");
        var btn = $(e.target);
        $(btn).closest("[id^='YabanciDilTekrar_']").remove();
        if ($(".YabanciDilTekrar").length == 1) {
            $(".DilRemoveButton").hide();
        }
    });

    if ($(".OkulTekrar").length == 1) {
        $(".OkulRemoveButton").hide();
    }
    if ($(".AdresTekrar").length == 1) {
        $(".AdresRemoveButton").hide();
    }
    if ($(".TelefonTekrar").length == 1) {
        $(".TelefonRemoveButton").hide();
    }
    if ($(".YabanciDilTekrar").length == 1) {
        $(".DilRemoveButton").hide();
    }

    //PhoneMask();
    CustomInputMask(".kisiTelNo");
    DogumTarihi.max = new Date().toISOString().split("T")[0];
    /*Kontroller sonu*/
    $('#kaydetButton').on("click", function () {
        TemelKisiKaydet();
    });

    KisiEkParametrelerGetirNull();

    //ZorunluAlanaLabelEkle();
});

function InputSil() {
    $('.InputSil').val("");
    $('#InputS').hide();
}

function VerileriModeleBas() {
    KisiTemelKayitModel = {};
    AdresModel = {};
    OkulModel = {};
    TelefonModel = {};
    DilModel = {};

    AdresListesi = [];
    OkulListesi = [];
    TelefonListesi = [];
    DilListesi = [];

    KisiTemelKayitModel["Kurum"] = $("#Kurum").val(); //DDL
    /* KisiTemelKayitModel["Departman"] = $("#Departman").val(); //DDL*/
    KisiTemelKayitModel["Pozisyon"] = $("#Pozisyon").val() == null ? 0 : $("#Pozisyon").val(); //DDL
    KisiTemelKayitModel["Rol"] = $("#Rol").val(); //DDL
    /*  KisiTemelKayitModel["Lokasyon"] = $("#Lokasyon").val(); //DDL*/
    KisiTemelKayitModel["IseGirisTarihi"] = $("#IseGirisTarihi").val() == "" ? null : $("#IseGirisTarihi").val();
    KisiTemelKayitModel["Adi"] = $("#Ad").val();
    KisiTemelKayitModel["Soyadi"] = $("#Soyad").val();
    KisiTemelKayitModel["SicilNo"] = $("#Sicil").val();
    KisiTemelKayitModel["TCKimlikNo"] = $("#Tc").val();
    KisiTemelKayitModel["EpostaAdresi"] = $("#Eposta").val();
    KisiTemelKayitModel["BabaAdi"] = $("#Baba").val();
    KisiTemelKayitModel["AnneAdi"] = $("#Ana").val();
    KisiTemelKayitModel["Dini"] = $("#Din").val(); //DDL
    KisiTemelKayitModel["MedeniHali"] = $("#Medeni").val(); //DDL
    KisiTemelKayitModel["Cinsiyeti"] = $("#Cins").val(); //DDL
    KisiTemelKayitModel["DogduguUlke"] = $("#DogduguUlke").val(); //DDL
    KisiTemelKayitModel["DogduguSehir"] = $("#DogduguSehir").val(); //DDL
    KisiTemelKayitModel["DogumTarihi"] = $("#DogumTarihi").val() == "" ? null : $("#DogumTarihi").val();

    $("[id^=AdresTekrar_]").each(function (i, e) {
        AdresModel["AdresTipi"] = $(e).find("[id^='ATipi_']").val();
        AdresModel["Ulke"] = $(e).find("[id^='Ulke_']").val();
        AdresModel["Sehir"] = $(e).find("[id^='Sehir_']").val();
        AdresModel["Adres"] = $(e).find("[id^='Adres_']").val();
        AdresListesi.push(AdresModel);
        AdresModel = {};
    });
    $("[id^=OkulTekrar_]").each(function (i, e) {
        OkulModel["OkulTipi"] = $(e).find("[id^='OkulTipi_']").val();
        OkulModel["OkulAdi"] = $(e).find("[id^='OkulAdi_']").val();
        OkulModel["Fakulte"] = $(e).find("[id^='Fakulte_']").val();
        OkulModel["MezuniyetTarihi"] = $(e).find("[id^='MezuniyetTarihi_']").val() == "" ? null : $(e).find("[id^='MezuniyetTarihi_']").val();
        OkulListesi.push(OkulModel);
        OkulModel = {};
    });
    $("[id^=TelefonTekrar_]").each(function (i, e) {
        TelefonModel["TelefonTipi"] = $(e).find("[id^='TelefonTipi_']").val();
        TelefonModel["TelefonNo"] = $(e).find("[id^='TelefonNo_']").val();
        TelefonListesi.push(TelefonModel);
        TelefonModel = {};
    });
    $("[id^=YabanciDilTekrar_]").each(function (i, e) {
        DilModel["YabanciDilTipi"] = $(e).find("[id^='YabanciDilTipi_']").val();
        DilModel["DilSeviye"] = $(e).find("[id^='DilSeviye_']").val();
        DilListesi.push(DilModel);
        DilModel = {};
    });
    KisiTemelKayitModel["OkulListesi"] = OkulListesi;
    KisiTemelKayitModel["TelefonListesi"] = TelefonListesi;
    KisiTemelKayitModel["DilListesi"] = DilListesi;
    KisiTemelKayitModel["AdresListesi"] = AdresListesi;
    console.log(KisiTemelKayitModel);
}

function TemelKisiKaydet() {
    $('#kaydetButton').attr("disabled", "disabled");
    var ZorunluParamKontrol = true;
    $('[required="true"]').each(function (i, e) {
        //input text, file, text area, dropdown, listbox, checkbox array / radiobutton için kontrol eklendi.
        if (!$(e).val().length > 0 || parseInt($(e).val()) == 0) {
            if ($(e).prop("tagName") != "DIV") {
                $(e).next().addClass("zorunluALanLabelUyari");
                ZorunluParamKontrol = false;
            }
        }
        else {
            $(e).next().removeClass("zorunluALanLabelUyari");
        }

        if ($(e).prop("tagName") == "DIV" && ($(e).find("[type='checkbox']") || $(e).find("[type='radio']"))) {
            if (!$(e).find(':checked').length > 0) {
                $(e).next().addClass("zorunluALanLabelUyari");
                ZorunluParamKontrol = false;
            }
            else {
                $(e).next().removeClass("zorunluALanLabelUyari");
            }
        }
    });
    if (!ZorunluParamKontrol) {
        alertim.toast(siteLang.ZorunluEkParam, alertim.types.warning);
        $('#kaydetButton').removeAttr("disabled");
        return;
    }

    VerileriModeleBas();
    var model = KisiTemelKayitModel;
    AktifPasifKisiList(KisiTemelKayitModel.EpostaAdresi);
    if (!kullaniciAdiUygunMuKontrol) {
        alertim.toast(siteLang.Email, alertim.types.danger);
        $('#kaydetButton').removeAttr("disabled");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/panel/KisiTemelKaydet",
        dataType: "json",
        data: model, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess) {
                KisiEkParametrelerKayit(result.value.temelBilgiTabloID);
                alertim.toast(siteLang.Kaydet, alertim.types.success, function () {
                    location.href = "/panel/PersonList";
                });
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
                $('#kaydetButton').removeAttr("disabled");
            }
        },
        error: function (e) {
            $('#kaydetButton').removeAttr("disabled");
            console.log(e);
            errorHandler(e);
        }, //success: function (result) {
    });
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
//sabit blok DDL methodları
function KurumListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/ListKendisiIle",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                KurumListForDDL = result.value;
                console.log(KurumListForDDL);
                KurumDDLDoldur("Kurum", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function OrganizasyonBirimiGetir2(id, name, pozisyonTipId) {
    request["KurumId"] = id;
    request["Name"] = name;
    if (id !== "0") {
        $.ajax({
            type: "Get",
            url: "/panel/GetKurumBirim2/" + id + "/" + pozisyonTipId,
            dataType: "json",
            data: request, // < === this is where the problem was !!
            success: function (result) {
                if (result.isSuccess == true) {
                    $("#" + name).html("");
                    result.value.forEach(function (item) {
                        var level = 1;
                        $("#" + name).append("<option value='" + item.tabloId + "' >" + item.tanim + "</option>");
                        if (item.altItems.length > 0) {
                            WriteData(item.tabloId, item.altItems, 0, name);
                        }
                    })
                    $("#Pozisyon").select2();//ideal
                } else {
                    alertim.toast(siteLang.Hata, alertim.types.danger);
                }
            },
            error: function (e) {
                console.log(e);
            }, //success: function (result) {
        });
    }
    else {
        $("#Pozisyon").select2("destroy");
        OrgBirimiDLLDoldur("Pozisyon", []);
        $("#Rol").select2("destroy");
        OrgBirimiDLLDoldur("Rol", []);
    }
}

function OrganizasyonBirimiGetir(id, name) {
    request["KurumId"] = id;
    request["Name"] = name;
    if (id !== "0") {
        $.ajax({
            type: "POST",
            url: "/panel/ListTip",
            dataType: "json",
            data: request, // < === this is where the problem was !!
            success: function (result) {
                if (result.isSuccess == true) {
                    OrgListForDLL = result.value;
                    console.log(OrgListForDLL);
                    OrgBirimiDLLDoldur(name, result.value);
                    $("#Rol").select2();
                } else {
                    alertim.toast(siteLang.Hata, alertim.types.danger);
                }
            },
            error: function (e) {
                console.log(e);
            }, //success: function (result) {
        });
    }
}

function WriteData(id, data, level, name) {
    var level2 = level + 1;
    var str = "";
    var bosluk = "";
    for (var i = 0; i < level2; i++) {
        bosluk += '&nbsp;&nbsp;&nbsp;&nbsp;'
    }
    data.forEach(function (item) {
        str = str + "<option value='" + item.tabloId + "'>" + bosluk + item.tanim + "</option>";
    })
    $("#" + name).append(str);
    data.forEach(function (item) {
        if (item.altItems.length > 0) {
            WriteData(item.tabloId, item.altItems, level2, name);
        }
    })
}

function MedeniHalListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/MedeniHalList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                MedeniHalListForDDL = result.value;
                console.log(MedeniHalListForDDL);
                ParamDDLDoldur("Medeni", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function DinListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/DinlerList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                DinListForDDL = result.value;
                console.log(DinListForDDL);
                ParamDDLDoldur("Din", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function CinsiyetListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/CinsiyetList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                CinsiyetListforDDL = result.value;
                console.log(CinsiyetListforDDL);
                ParamDDLDoldur("Cins", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

//Tekrarlı alan DDL Doldur
function ATipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/AdresTipiList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                ATipiListForDDL = result.value;
                console.log(ATipiListForDDL);
                ParamDDLDoldur("ATipi_", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function UlkeListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/UlkeList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                UlkeListforDDL = result.value;
                console.log(UlkeListforDDL);
                ParamDDLDoldur("DogduguUlke", result.value);
                ParamDDLDoldur("Ulke_", result.value);
                $('#DogduguUlke').change();
                $('#Ulke_').change();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function SehirListGetir(alanID, ulkeID) {
    if (ulkeID == 0 || ulkeID == "0") {
        return;
    }
    $.ajax({
        type: "GET",
        url: "/panel/SehirList/" + ulkeID,
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                SehirListforDDL = result.value;
                console.log(SehirListforDDL);
                ParamDDLDoldur(alanID, result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function DilListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/DilList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                YabanciDilTipiListForDDL = result.value;
                console.log(YabanciDilTipiListForDDL);
                ParamDDLDoldur("YabanciDilTipi_", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function OkulTipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/OkulTipiList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                OkulTipiListForDDL = result.value;
                console.log(OkulTipiListForDDL);
                ParamDDLDoldur("OkulTipi_1", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function TelefonTipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/TelefonTipiList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                TelefonTipiListForDDL = result.value;
                console.log(TelefonTipiListForDDL);
                ParamDDLDoldur("TelefonTipi_", result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
//Doldurma Methotları
function KurumDDLDoldur(alanID, data) {
    var str = "";
    str = "<option value='0' selected>" + siteLang.Choose + "</option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].kurumTicariUnvani + "</option>";
    }
    $("#" + alanID).html(str);
}

function OrgBirimiDLLDoldur(alanID, data) {
    var str = "";
    str = "<option value='0' selected>" + siteLang.Choose + "</option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloId + "'>" + data[i].tanim + "</option>";
    }
    $("#" + alanID).html(str);
}

function BirimDDLDoldur(id) {
    /* OrganizasyonBirimiGetir(id, "Departman");*/
    OrganizasyonBirimiGetir2(id, "Pozisyon", pozisyonTipId);
    OrganizasyonBirimiGetir(id, "Rol");
    /* OrganizasyonBirimiGetir(id, "Lokasyon");*/
}
function ParamDDLDoldur(alanID, data) {
    var str = "";
    str = "<option value='0' selected>" + siteLang.Choose + "</option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].paramTanim + "</option>";
    }
    $("#" + alanID).html(str);
};

function AdminMi() {
    $.ajax({
        type: "GET",
        url: "/home/AdminMi",
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.isSuccess == true) {
                if (result.value == false) {
                    $("#Rl").hide();
                    return;
                }
                $("#Rl").show();
                $("#Krm").removeClass("col-4").addClass("col");
                $("#Pzsyn").removeClass("col-4").addClass("col");
                $("#Grs").removeClass("col-4").addClass("col");
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}

function AktifPasifKisiList(eposta) {
    $.ajax({
        type: "GET",
        url: "/kisi/AktifPasifKisiList/" + eposta,
        dataType: "json",
        data: null,
        async: false,
        success: function (result) {
            if (result.isSuccess) {
                kullaniciAdiUygunMuKontrol = result.value;
            }
            else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}



//Tekrarlı alan string variables //
var AdresTekrarDiv = " <div class='AdresTekrar' id='AdresTekrar_1'>\
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
                                    <label  class='Lbl' >Bölge</label>\
                                    <select id='Bolge_' class='form-control' style='width: 100%;'>\
                                        < option value = '0' selected>Marmara</option >\
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
                                    <option value='0' hidden>"+ siteLang.Choose1 + "</option>\
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

var OkulTekrarDiv = "<div class='card-body OkulTekrar' id='OkulTekrar_1'>\
                        <div class='row row-cols-2'>\
                             <div class='col'>\
                                <div class='form-group'>\
                                    <label  class='Lbl'  for='OkulTipi_1'>"+ siteLang.OkulTipi + "</label>\
                                    <select id='OkulTipi_1' class='form-control .OkulTipiDDL' style='width: 100%;'>\
                                    </select>\
                                </div>\
                            </div>\
                            <div class='col'>\
                                <div class='form-group'>\
                                    <label  class='Lbl'  for='inputSpentBudget'>"+ siteLang.Okul + "</label>\
                                    <input type='text' id='OkulAdi_1' class='form-control'>\
                                    <label for='OkulAdi' class='validationMessage'></label>\
                                </div>\
                            </div>\
                            <div class='col'>\
                                <div class='form-group'>\
                                    <label  class='Lbl'  for='inputSpentBudget'>"+ siteLang.Fakülte + "</label>\
                                    <input type='text' id='Fakulte_1' class='form-control'>\
                                    <label for='Fakulte' class='validationMessage'></label>\
                                </div>\
                            </div>\
                           <div class='col'>\
                                <div class='form-group'>\
                                    <label  class='Lbl'  for='MezuniyetTarihi_'>"+ siteLang.MezuniyetTarihi + ":</label>\
                                    <input class='form-control' type='date'  id='MezuniyetTarihi_'></div>\
                            </div>\
                            <div class='OkultekrarBtnGrp'>\
                                 <button type='button' class='btn btn-xs OkulAddButton'>\
                                    <i class='fas fa-plus'></i>  "+ siteLang.OkulEkle + "\
                                </button> &nbsp\
                                <button type='button' class='btn btn-xs OkulRemoveButton'>\
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

var DilTekrarDiv = "<div class='card-body YabanciDilTekrar' id='YabanciDilTekrar_1'>\
                        <div class='row'>\
                             <div class='col-md-6'>\
                                <div class='form-group'>\
                                    <label class='Lbl'for='YabanciDilTipi_'>"+ siteLang.YabancıDilTipi + "</label>\
                                    <select id='YabanciDilTipi_' class='form-control .YabanciDilTipiDDL' style='width: 100%;'>\
                                        <option value='1' selected='selected'>\
                                    </select>\
                                </div>\
                            </div>\
                            <div class='col-md-6'>\
                                <div class='form-group'>\
                                    <label class='Lbl' for='DilSeviye_1'>"+ siteLang.YabancıDilSeviyesi + "</label>\
                                   <input type='text' id='DilSeviye_1' class='form-control'>\
                                    <label for='DilSeviye' class='validationMessage'></label>\
                                </div>\
                            </div>\
                            <div class='DiltekrarBtnGrp'>\
                                <button type='button' class='btn btn-xs DilAddButton'>\
                                    <i class='fas fa-plus'></i> "+ siteLang.YabancıDilEkle + "\
                                </button> &nbsp\
                                <button type='button' class='btn btn-xs DilRemoveButton'>\
                                    <i class='fas fa-minus-circle accent-danger'></i>\
                                </button>\
                            </div>\
                        </div>\
                    </div>";