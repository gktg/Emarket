var KisiTemelKayitModel = {};
var AdresModel = {};
var OkulModel = {};
var TelefonModel = {};
var DilModel = {};

var AdresListesi = [];
var OkulListesi = [];
var TelefonListesi = [];
var DilListesi = [];
var kisiID;

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
var kurumOrgBirimDetay = {};
var kisiAdresSehirVerileri = [];
var kisiAdresSehirModel = {};
var DinListForDDL = [];
var request = {};
var kullaniciAdiUygunMuKontrol = false;

$(document).ready(function () {
    $("#ATipi_").select2();
    $("#Ulke_").select2();
    $("#Sehir_").select2();
    $("#OkulTipi_").select2();
    $("#TelefonTipi_").select2();
    $("#YabanciDilTipi_").select2();
    AdminMi();
    kisiID = GetURLParameter();
    $("#AdresTekrarliAlan").append($(AdresTekrarDiv));
    $("#OkulTekrarliAlan").append($(OkulTekrarDiv));
    $("#TelefonTekrarliAlan").append($(TelefonTekrarDiv));
    $("#YabanciDilTekrarliAlan").append($(DilTekrarDiv));

    $('#DogduguUlke').attr("onchange", "SehirListGetir('DogduguSehir',$('#DogduguUlke').val())");
    $('#Ulke_1').attr("onchange", "SehirListGetir('Sehir_1',$('#Ulke_1').val())");
    //ParamDDLDoldur("YabanciDilTipi", YabanciDilTipi + "ListforDDL", "tabloID", "paramTanim");
    KurumListGetir();

    UlkeListGetir();
    CinsiyetListGetir();
    DinListGetir();
    ATipiListGetir();
    DilListGetir();
    MedeniHalListGetir();
    TelefonTipiListGetir();
    OkulTipiListGetir();
    KisiVerileriniGetir();
    Numeric();
    AlphaAndSpace();

    $(document).on("change", ".InputSil", function () {
        //readURL(this);
        //$('#blah').show();
        //$("#blah1").show();
        if ($('.InputSil').val()) {
            $('.InputSil').after("<button type='button' id='InputS' class= 'close' aria-label='Close' onclick='InputSil()'><span class='spcss' aria-hidden='true'>&times;</span></button>");
        }
    });

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
        //TekrarliAlanRemoveClick("Adres");
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
    $('#guncelleButton').on("click", function () {
        TemelKisiGuncelle();
    });

    moment.locale('tr');
    moment().format('yyyy-MM-dd');
    moment.createFromInputFallback = function (config) {
        // unreliable string magic, or
        config._d = new Date(config._i);
    };

    KisiEkParametrelerGetir(kisiID);
});

function InputSil() {
    $('.InputSil').val("");
    $('#InputS').hide();
}

function KisiVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/KisiTemelKayitVerileriGetir/" + kisiID,
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                KisiTemelKayitModel = result.value;
                console.log(KisiTemelKayitModel);
                KisiVerileriniSayfayaBas();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function KisiVerileriniSayfayaBas() {
    kurumOrgBirimDetay["id"] = KisiTemelKayitModel.kurum;
    /* kurumOrgBirimDetay["departman"] = KisiTemelKayitModel.departman;*/
    kurumOrgBirimDetay["pozisyon"] = KisiTemelKayitModel.pozisyon;
    kurumOrgBirimDetay["rol"] = KisiTemelKayitModel.rol;
    /* kurumOrgBirimDetay["lokasyon"] = KisiTemelKayitModel.lokasyon;*/
    $('#Kurum [value=' + KisiTemelKayitModel.kurum + ']').attr('selected', 'true').change();
    $("#IseGirisTarihi").val(CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.iseGirisTarihi) == null ? "" : CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.iseGirisTarihi));
    $("#Ad").val(KisiTemelKayitModel.adi);
    $("#Soyad").val(KisiTemelKayitModel.soyadi);
    $("#Sicil").val(KisiTemelKayitModel.sicilNo);
    $("#Tc").val(KisiTemelKayitModel.tcKimlikNo);
    $("#Eposta").val(KisiTemelKayitModel.epostaAdresi);
    $("#Baba").val(KisiTemelKayitModel.babaAdi);
    $("#Ana").val(KisiTemelKayitModel.anneAdi);
    $('#Din [value=' + KisiTemelKayitModel.dini + ']').attr('selected', 'true');
    $('#Medeni [value=' + KisiTemelKayitModel.medeniHali + ']').attr('selected', 'true');
    $('#Cins [value=' + KisiTemelKayitModel.cinsiyeti + ']').attr('selected', 'true');
    $('#DogduguUlke [value=' + KisiTemelKayitModel.dogduguUlke + ']').attr('selected', 'true');
    $('#DogduguUlke [value=' + KisiTemelKayitModel.dogduguUlke + ']').change();
    kisiAdresSehirModel = {};
    kisiAdresSehirModel["alanID"] = "DogduguSehir";
    kisiAdresSehirModel["value"] = KisiTemelKayitModel.dogduguSehir;
    kisiAdresSehirVerileri.push(kisiAdresSehirModel);
    $('#DogduguSehir [value=' + KisiTemelKayitModel.dogduguSehir + ']').attr('selected', 'true');
    $("#DogumTarihi").val(CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.dogumTarihi) == null ? "" : CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.dogumTarihi));

    if (KisiTemelKayitModel.adresListesi.length > 0) {
        for (var i = 0; i < KisiTemelKayitModel.adresListesi.length - 1; i++) {

            TekrarliAlanAddClickForAdres("Adres", $("[id^='AdresTekrar_']").last());

            $(".AdresRemoveButton").show();
        }
        $("[id^=AdresTekrar_]").each(function (i, e) {
            kisiAdresSehirModel = {};
            kisiAdresSehirModel["alanID"] = $(e).find("[id^='Sehir_']").attr("id");
            kisiAdresSehirModel["value"] = KisiTemelKayitModel.adresListesi[i].sehir;

            kisiAdresSehirVerileri.push(kisiAdresSehirModel);
            $(e).find("[id^='ATipi_']").val(KisiTemelKayitModel.adresListesi[i].adresTipi);
            $(e).find("[id^='Ulke_']").val(KisiTemelKayitModel.adresListesi[i].ulke);
            $(e).find("[id^='Ulke_']").change();
            $(e).find("[id^='Sehir_']").val(KisiTemelKayitModel.adresListesi[i].sehir);
            $(e).find("[id^='Adres_']").val(KisiTemelKayitModel.adresListesi[i].adres);
        });
    }

    if (KisiTemelKayitModel.okulListesi.length > 0) {

        for (var i = 0; i < KisiTemelKayitModel.okulListesi.length - 1; i++) {
            TekrarliAlanAddClickDiger("Okul", $("[id^='OkulTekrar_']").last());
            $(".OkulRemoveButton").show();
        }
        $("[id^=OkulTekrar_]").each(function (i, e) {
            $(e).find("[id^='OkulTipi_']").val(KisiTemelKayitModel.okulListesi[i].okulTipi);
            $(e).find("[id^='OkulAdi_']").val(KisiTemelKayitModel.okulListesi[i].okulAdi);
            $(e).find("[id^='Fakulte_']").val(KisiTemelKayitModel.okulListesi[i].fakulte);
            $(e).find("[id^='MezuniyetTarihi_']").val(CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.okulListesi[i].mezuniyetTarihi) == null ? "" : CsharpDateToStringDateyyyymmdd(KisiTemelKayitModel.okulListesi[i].mezuniyetTarihi));

        });
    }

    if (KisiTemelKayitModel.telefonListesi.length > 0) {
        for (var i = 0; i < KisiTemelKayitModel.telefonListesi.length - 1; i++) {
            TekrarliAlanAddClickDiger("Telefon", $("[id^='TelefonTekrar_']").last());
            $(".TelefonRemoveButton").show();
        }
        $("[id^=TelefonTekrar_]").each(function (i, e) {
            $(e).find("[id^='TelefonTipi_']").val(KisiTemelKayitModel.telefonListesi[i].telefonTipi);
            $(e).find("[id^='TelefonNo_']").val(KisiTemelKayitModel.telefonListesi[i].telefonNo);
        });
    }

    if (KisiTemelKayitModel.dilListesi.length > 0) {
        for (var i = 0; i < KisiTemelKayitModel.dilListesi.length - 1; i++) {
            TekrarliAlanAddClickDiger("YabanciDil", $("[id^='YabanciDilTekrar_']").last());
            $(".DilRemoveButton").show();
        }
        $("[id^=YabanciDilTekrar_]").each(function (i, e) {
            $(e).find("[id^='YabanciDilTipi_']").val(KisiTemelKayitModel.dilListesi[i].yabanciDilTipi);
            $(e).find("[id^='DilSeviye_']").val(KisiTemelKayitModel.dilListesi[i].dilSeviye);
        });
    }
}

function GuncellenenVerileriModeleBas() {
    KisiTemelKayitModel = {};
    AdresModel = {};
    OkulModel = {};
    TelefonModel = {};
    DilModel = {};

    AdresListesi = [];
    OkulListesi = [];
    TelefonListesi = [];
    DilListesi = [];

    KisiTemelKayitModel["TemelBilgiTabloID"] = kisiID;
    KisiTemelKayitModel["Kurum"] = $("#Kurum").val();
    KisiTemelKayitModel["Pozisyon"] = $("#Pozisyon").val() == null ? 0 : $("#Pozisyon").val();
    KisiTemelKayitModel["Rol"] = $("#Rol").val();
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

function TemelKisiGuncelle() {
    $('#guncelleButton').attr("disabled", "disabled");

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
        $('#guncelleButton').removeAttr("disabled");
        return;
    }
    GuncellenenVerileriModeleBas();
    var model = KisiTemelKayitModel;
    AktifPasifKisiList1(KisiTemelKayitModel.EpostaAdresi, KisiTemelKayitModel.TemelBilgiTabloID);
    if (!kullaniciAdiUygunMuKontrol) {
        alertim.toast(siteLang.Email, alertim.types.danger);
        $('#guncelleButton').removeAttr("disabled");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/panel/KisiTemelKayitVerileriGuncelle",
        dataType: "json",
        data: model, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess) {
                KisiEkParametrelerKayit(kisiID)
                alertim.toast(siteLang.Guncelle, alertim.types.success, function () {
                    location.href = "/panel/PersonList";
                });
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
                $('#guncelleButton').removeAttr("disabled");
            }
        },
        error: function (e) {
            $('#guncelleButton').removeAttr("disabled");
            errorHandler(e);
        },
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

//Sabit blok DDL methotları
function KurumListGetir() {
    $.ajax({
        type: "GET",
        async: false,
        url: "/panel/ListKendisiIle",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                KurumListForDDL = result.value;
                console.log(UlkeListforDDL);
                KurumDDLDoldur("Kurum", result.value);
            } else {
                alertim.toast(siteLang.KurHata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function OrganizasyonBirimiGetir2(id, name) {
    request["KurumId"] = id;
    request["Name"] = name;
    if (id !== "0") {
        $.ajax({
            type: "Get",
            url: "/panel/GetKurumBirim2/" + id,
            dataType: "json",
            data: request, // < === this is where the problem was !!
            success: function (result) {
                if (result.isSuccess == true) {
                    $("#" + name).html("");
                    result.value.forEach(function (item) {
                        var level = 1;
                        if (item.tabloId == kurumOrgBirimDetay.pozisyon) {
                            $("#" + name).append("<option value='" + item.tabloId + "' selected>" + item.tanim + "</option>");
                        }
                        else {
                            $("#" + name).append("<option value='" + item.tabloId + "' >" + item.tanim + "</option>");
                        }
                        if (item.altItems.length > 0) {
                            WriteData(item.tabloId, item.altItems, 0, name);
                        }
                    })
                    $("#Pozisyon").select2();
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
            async: false,
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
        if (item.tabloId == kurumOrgBirimDetay.pozisyon) {
            str += "<option value='" + item.tabloId + "' selected>" + bosluk + item.tanim + "</option>";
        }
        else {
            str += "<option value='" + item.tabloId + "'>" + bosluk + item.tanim + "</option>";
        }
    })
    $("#" + name).append(str);
    data.forEach(function (item) {
        if (item.altItems.length > 0) {
            WriteData(item.tabloId, item.altItems, level2, name);
        }
    })
}

function CinsiyetListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/CinsiyetList",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                CinsiyetListforDDL = result.value;
                console.log(CinsiyetListforDDL);
                ParamDDLDoldur("Cins", result.value);
            } else {
                alertim.toast(siteLang.CinsHata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function MedeniHalListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/MedeniHalList",
        dataType: "json",
        async: false,
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
        async: false,
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

//Tekrarlı alan DDL Methotları
function DilListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/DilList",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                YabanciDilTipiListForDDL = result.value;
                console.log(YabanciDilTipiListForDDL);
                ParamDDLDoldur("YabanciDilTipi_1", result.value);
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
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                UlkeListforDDL = result.value;
                console.log(UlkeListforDDL);
                ParamDDLDoldur("DogduguUlke", result.value);
                ParamDDLDoldur("Ulke_1", result.value);
                $('#DogduguUlke').change();
                $('#Ulke_1').change();
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
    if (ulkeID == 0) {
        return;
    }
    $.ajax({
        type: "GET",
        url: "/panel/SehirList/" + ulkeID,
        dataType: "json",
        async: false,
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
function ATipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/AdresTipiList",
        dataType: "json",
        async: false,
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
function OkulTipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/OkulTipiList",
        dataType: "json",
        async: false,
        data: null, // < === this is where the problem was !!
        async: false,
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
        async: false,
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                TelefonTipiListForDDL = result.value;
                console.log(TelefonTipiListForDDL);
                ParamDDLDoldur("TelefonTipi_1", result.value);
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
function ParamDDLDoldur(alanID, data) {
    var str = "<option value='0'>" + siteLang.Choose + " </option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].paramTanim + "</option>";
    }

    $("#" + alanID).html(str);
    if (kisiAdresSehirVerileri.length > 0) {
        for (var j = 0; j < kisiAdresSehirVerileri.length; j++) {
            $("#" + kisiAdresSehirVerileri[j].alanID).val(kisiAdresSehirVerileri[j].value);
        }
    }
};
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
        if (alanID.includes("Rol")) {
            if (data[i].tabloId == kurumOrgBirimDetay.rol) {
                str += "<option value='" + data[i].tabloId + "' selected>" + data[i].tanim + "</option>";
            }
            else {
                str += "<option value='" + data[i].tabloId + "'>" + data[i].tanim + "</option>";
            }
        }
    }
    $("#" + alanID).html(str);
}

function BirimDDLDoldur(id) {
    /* OrganizasyonBirimiGetir(id, "Departman");*/
    OrganizasyonBirimiGetir2(id, "Pozisyon");
    OrganizasyonBirimiGetir(id, "Rol");
    /* OrganizasyonBirimiGetir(id, "Lokasyon");*/
}
function SehirVerileriSelect() {
    for (var i = 0; i < kisiAdresSehirVerileri; i++) {
        var value = kisiAdresSehirVerileri[i].value == null ? 0 : kisiAdresSehirVerileri[i].value;
        $("#" + kisiAdresSehirVerileri[i].alanID + " [value=" + value + "]").attr('selected', 'true');
    }
}

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

function AktifPasifKisiList1(eposta,tabloid) {
    $.ajax({
        type: "GET",
        url: "/kisi/AktifPasifKisiList1/" + eposta + "/" + tabloid,
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
var AdresTekrarDiv = " <div class='card-body AdresTekrar' id='AdresTekrar_1'>\
                        <div class='row'>\
                            <div class='col-md-4'>\
                                <div class='form-group'>\
                                    <label  class='Lbl' for='ATipi_'>"+ siteLang.AdresTipi + "</label>\
                                    <select id='ATipi_' class='form-control' style='width: 100%;'>\
                                    </select>\
                                </div>\
                            </div>\
                            <div class='col-md-4'>\
                                <div class='form-group'>\
                                    <label  class='Lbl' >"+ siteLang.Ulke + "</label>\
                                    <select id='Ulke_1' class='form-control' style='width: 100%;' onchange='SehirListGetir('Sehir_1',$('#Ulke_1').val())'>\
                                    </select>\
                                </div>\
                            </div>\
                            <div class='col-md-4'>\
                                <div class='form-group'>\
                                    <label  class='Lbl' >"+ siteLang.Sehir + "</label>\
                                    <select id='Sehir_1' class='form-control' style='width: 100%;'>\
                                    <option value='0' hidden>"+ siteLang.Choose1 + "</option>\
                                    </select >\
                                </div>\
                            </div>\
                            <div class='col-md-12'>\
                                <div class='form-group'>\
                                    <label  class='Lbl' >"+ siteLang.Adres + "</label>\
                                    <textarea id='Adres_1' class='form-control' rows='1' placeholder='"+ siteLang.Adres + "...'></textarea>\
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
                                    <label  class='Lbl'  for='MezuniyetTarihi_1'>"+ siteLang.MezuniyetTarihi + ":</label>\
                                    <input class='form-control' type='date'  id='MezuniyetTarihi_1'></div>\
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

var TelefonTekrarDiv = "<div class='card-body TelefonTekrar' id='TelefonTekrar_1'>\
                        <div class='row'>\
                            <div class='col-md-6'>\
                                <div class='form-group'>\
                                    <label class='Lbl' for='TelefonTipi_1'>"+ siteLang.TelefonTipi + "</label>\
                                    <select id='TelefonTipi_1' class='form-control .TelefonTipiDDL' style='width: 100%;'>\
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
                                    <label class='Lbl'for='YabanciDilTipi_1'>"+ siteLang.YabancıDilTipi + "</label>\
                                    <select id='YabanciDilTipi_1' class='form-control .YabanciDilTipiDDL' style='width: 100%;'>\
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