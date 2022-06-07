var KurumTemelKayitModel = {};
var KurumMusteriTemsilcisiIdList = [];
var kisiID;
var kurumID;
var AdresListesi = [];
var AdresModel = {};

//var coreUrl = "http://77.92.105.18:51305";
//var coreUrl =  "http://172.16.31.10:51305";
//var coreUrl =  "http://localhost:51305";

var kurumAdresSehirVerileri = [];
var kurumAdresSehirModel = {};

var kurumBankaSubeVerileri = [];
var kurumBankaSubeModel = {};
$(document).ready(function () {
    Email();
    $(document).on("change", ".InputSil", function () {
        if ($('.InputSil').val()) {
            $('.InputSil').after("<button type='button' id='InputS' class= 'close' aria-label='Close' onclick='InputSil()'><span class='spcss' aria-hidden='true'>&times;</span></button>");
        }
    });

    $("#kurRes").click(function () {
        $("#KurumResimUrl").attr("src", "");
        $('#KurumResimUrl').attr("medyaid", 0);
    });

    kisiID = GetURLParameter();
    $("#KurumAdresTekrarliAlan").append($(KurumAdresTekrarliAlan));
    $("#KurumBankaTekrarliAlan").append($(KurumBankaTekrarliAlan));
    KurumLokasyonTipiListGetir();
    KurumIliskiListGetirG();
    KurumMusteriTemsilcisiGetirG();
    UlkeListGetir();
    BankaListGetir();
    $('#KurumUlke').attr("onchange", "SehirListGetir('KurumSehir',$('#KurumUlke').val())");
    $('#KurumBanka').attr("onchange", "SubeListGetir('KurumSube',$('#KurumBanka').val())");

    $('#Ulke_1').attr("onchange", "SehirListGetir('Sehir_1',$('#Ulke_1').val())");
    $('#Banka_1').attr("onchange", "SubeListGetir('Sube_1',$('#Banka_1').val())");

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

    $(document).on('click', '.KurumBankaAddButton', function () {
        $(document).find("[id^='Banka_']").each(function (i, e) {
            $(e).select2('destroy');
        });
        $(document).find("[id^='Sube_']").each(function (i, e) {
            $(e).select2('destroy');
        });

        TekrarliAlanAddClickForBanka("KurumBanka", $("[id^='KurumBankaTekrar_']").last());
        $(".KurumBankaRemoveButton").show();

        var $e = $(document).find("[id^='Banka_']").last();
        var $e1 = $(document).find("[id^='Sube_']").last();
        $(document).find("[id^='Banka_']").each(function (i, e) {
            $(e).select2();
        });

        $(document).find("[id^='Sube_']").each(function (i, e) {
            $(e).select2();
        });

        $e.attr("tabloId", 0);
        $e1.attr("tabloId", 0);
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

    $(document).on('click', '.KurumBankaRemoveButton', function (e) {
        var btn = $(e.target);
        $(btn).closest("[id^='KurumBankaTekrar_']").remove();
        if ($(".KurumBankaTekrar").length == 1) {
            $(".KurumBankaRemoveButton").hide();
        }
    });
    if ($(".KurumBankaTekrar").length == 1) {
        $(".KurumBankaRemoveButton").hide();
    }

    KurumVerileriniGetir();
    $("#KurumResimUrl").click(function () {
        $("#KurumLogo").click();
    });

    $(document).on("change", "#WebSitesi", function () {
        if ($('#WebSitesi').val()) {
            if (!isWebSite($('#WebSitesi').val())) {
                alertim.toast(siteLang.WebsiteErr, alertim.types.warning);
                $('#WebSitesi').addClass("is-invalid");
                return;
            } else {
                $('#WebSitesi').removeClass("is-invalid");
            }
        }
    });

    $(document).on("change", '[placeholder="IBAN"]', function () {
        if ($('[placeholder="IBAN"]').val()) {
            if (!isIBAN($('[placeholder="IBAN"]').val())) {
                alertim.toast(siteLang.IbanErr, alertim.types.warning);
                $('[placeholder="IBAN"]').addClass("is-invalid");
                return;
            } else {
                $('[placeholder="IBAN"]').removeClass("is-invalid");
            }
        }
    });

    Numeric();
    IBANmask('[placeholder="IBAN"]');
    RunAfterElementExists('[placeholder="IBAN"]', function () {
        IBANmask('[placeholder="IBAN"]')
    });
    KurulusTarihi.max = new Date().toISOString().split("T")[0];
    var imageCropper;
    $("#KurumLogo").on("change", function () {
        $("#imageCrop").cropper('destroy')
        if (document.getElementById("KurumLogo").files.length) {
            var file = document.getElementById("KurumLogo").files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                var data = event.target.result;
                $("#imageCrop").attr("src", data);
                setTimeout(function () {
                    $("#imageCrop").cropper();
                    imageCropper = $("#imageCrop").data("cropper");
                }, 300)
            };
            reader.readAsDataURL(file);
            $("#modalCropper").modal("show");
        }
    })
    $("#imageCropSave").click(function () {
        imageCropper.crop();
        var data = imageCropper.getCroppedCanvas().toDataURL("image/png");
        var fileName = $("#KurumLogo").val().split("\\").pop();
        var file = dataURLtoFile(data, fileName)

        var fd = new FormData();
        fd.append('file', file);
        $.ajax({
            url: "/panel/resimyukle/",
            processData: false,
            contentType: false,
            type: "POST",
            data: fd,
            success: function (data) {
                var id = data.value.tabloID;
                var url = data.value.medyaUrl;
                //$('#KurumResimUrl').attr("src", $("#site-urlMedya").val() + url);
                //$('#KisiResimUrl').attr("src", "http://77.92.105.18:51305" + url);
                //$('#KisiResimUrl').attr("src", "http://172.16.31.10:51305" + url);
                //$('#KisiResimUrl').attr("src", "http://localhost:51305" + url);
                $('#KurumResimUrl').attr("medyaid", id);
                $("#KurumLogo").val('')
            },
            error: function (e) {
                console.log(e);
                errorHandler(e);
            }
        });

        $("#imageCrop").cropper('destroy')
        $("#modalCropper").modal("hide");
    })

    CustomInputMask("#FaxNo");
    $('#guncelleBtn').on("click", function () {
        TemelKurumGuncelle();
    });
});

function KurumVerileriniGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/KurumTemelVerileriGetir/" + kisiID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                KurumTemelKayitModel = result.value;
                console.log(KurumTemelKayitModel);
                KurumVerileriniSayfayaBas();
                kurumID = KurumTemelKayitModel.tabloID;
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function KurumVerileriniSayfayaBas() {
    $("#KurumAdi").val(KurumTemelKayitModel.kurumAdi); //DDL
    $('#MusteriTemsilcileri').val(KurumTemelKayitModel.musteriTemsilciIds.ListBy("tabloID")).change();
    $('#KurumTipi').val(KurumTemelKayitModel.kurumTips.ListBy("tabloID")).change();
    $("#KurumResimUrl").attr("medyaid", KurumTemelKayitModel.kurumLogo);
    //$('#KurumResimUrl').attr("src", $("#site-urlMedya").val() + KurumTemelKayitModel.kurumResimUrl);//DDL
    $("#KurulusTarihi").val(CsharpDateToStringDateyyyymmdd(KurumTemelKayitModel.kurulusTarihi) == null ? "" : CsharpDateToStringDateyyyymmdd(KurumTemelKayitModel.kurulusTarihi)); //DDL
    $("#VergiNo").val(KurumTemelKayitModel.vergiNo); //DDL
    $("#VergiDairesi").val(KurumTemelKayitModel.kurumVergiDairesiId);//VergiDairesi
    $("#TicaretSicilNo").val(KurumTemelKayitModel.ticaretSicilNo); //DDL
    $("#WebSitesi").val(KurumTemelKayitModel.webSitesi);
    $("#EpostaAdresi").val(KurumTemelKayitModel.epostaAdresi);
    $("#FaxNo").val(KurumTemelKayitModel.faxNo);
    $("#KurumUlke").val(KurumTemelKayitModel.kurumUlkeId);
    $("#KurumUlke").change();
    $("#KurumSehir").val(KurumTemelKayitModel.kurumSehirId);

    kurumAdresSehirModel = {};
    kurumAdresSehirModel["alanID"] = $("#KurumSehir").attr("id");
    kurumAdresSehirModel["value"] = KurumTemelKayitModel.kurumSehirId;
    kurumAdresSehirVerileri.push(kurumAdresSehirModel);

    if (KurumTemelKayitModel.adresListesi.length > 0) {
        for (var i = 0; i < KurumTemelKayitModel.adresListesi.length - 1; i++) {
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
        }
        $("[id^=KurumAdresTekrar_]").each(function (i, e) {
            kurumAdresSehirModel = {};
            kurumAdresSehirModel["alanID"] = $(e).find("[id^='Sehir_']").attr("id");
            kurumAdresSehirModel["value"] = KurumTemelKayitModel.adresListesi[i].sehir;
            kurumAdresSehirVerileri.push(kurumAdresSehirModel);
            $(e).find("[id^='LokasyonTipi_']").val(KurumTemelKayitModel.adresListesi[i].lokasyonTipi);
            $(e).find("[id^='LokasyonTipi_']").change();
            $(e).find("[id^='Ulke_']").val(KurumTemelKayitModel.adresListesi[i].ulke);
            $(e).find("[id^='Ulke_']").change();
            $(e).find("[id^='Sehir_']").val(KurumTemelKayitModel.adresListesi[i].sehir);
            $(e).find("[id^='Adres_']").val(KurumTemelKayitModel.adresListesi[i].adres);
        });
    }

    if (KurumTemelKayitModel.bankaListesi.length > 0) {
        for (var i = 0; i < KurumTemelKayitModel.bankaListesi.length - 1; i++) {
            $(document).find("[id^='Banka_']").each(function (i, e) {
                $(e).select2('destroy');
            });
            $(document).find("[id^='Sube_']").each(function (i, e) {
                $(e).select2('destroy');
            });

            TekrarliAlanAddClickForBanka("KurumBanka", $("[id^='KurumBankaTekrar_']").last());
            $(".KurumBankaRemoveButton").show();

            var $e = $(document).find("[id^='Banka_']").last();
            var $e1 = $(document).find("[id^='Sube_']").last();
            $(document).find("[id^='Banka_']").each(function (i, e) {
                $(e).select2();
            });

            $(document).find("[id^='Sube_']").each(function (i, e) {
                $(e).select2();
            });

            $e.attr("tabloId", 0);
            $e1.attr("tabloId", 0);
        }
        $("[id^=KurumBankaTekrar_]").each(function (i, e) {
            kurumBankaSubeModel = {};
            kurumBankaSubeModel["alanID"] = $(e).find("[id^='Sube_']").attr("id");
            kurumBankaSubeModel["value"] = KurumTemelKayitModel.bankaListesi[i].subeId;
            kurumBankaSubeVerileri.push(kurumBankaSubeModel);
            $(e).find("[id^='Banka_']").val(KurumTemelKayitModel.bankaListesi[i].bankaId);
            $(e).find("[id^='Banka_']").change();
            $(e).find("[id^='Sube_']").val(KurumTemelKayitModel.bankaListesi[i].subeId);
            $(e).find("[id^='Iban_']").val(KurumTemelKayitModel.bankaListesi[i].iban);
            $(e).find("[id^='Hesap_']").val(KurumTemelKayitModel.bankaListesi[i].hesapNo);
        });
    }
}

function GuncellenenVerileriModeleBas() {
    KurumTemelKayitModel = {};
    MusteriTemsilciIds = [];
    KurumTips = [];
    AdresModel = {};
    BankaModel = {};
    OkulModel = {};
    TelefonModel = {};
    DilModel = {};

    AdresListesi = [];
    BankaListesi = [];
    OkulListesi = [];
    TelefonListesi = [];
    DilListesi = [];

    var musteriTemsilcisiSelect2Selected = $('#MusteriTemsilcileri').select2('data');

    for (var j = 0; j < musteriTemsilcisiSelect2Selected.length; j++) {
        var musteriTemsilcisi = {
            tabloID: 0,
            adSoyad: ""
        };
        id = parseInt(musteriTemsilcisiSelect2Selected[j].id);
        musteriTemsilcisi["tabloID"] = id;
        MusteriTemsilciIds.push(musteriTemsilcisi);
    }

    var kurumTipSelect2Selected = $('#KurumTipi').select2('data');

    for (var j = 0; j < kurumTipSelect2Selected.length; j++) {
        var kurumTips = {
            tabloID: 0,
            tanim: ""
        };
        id = parseInt(kurumTipSelect2Selected[j].id);
        kurumTips["tabloID"] = id;
        KurumTips.push(kurumTips);
    }

    KurumTemelKayitModel["TabloID"] = kisiID;
    KurumTemelKayitModel["KurumAdi"] = $("#KurumAdi").val(); //DDL
    KurumTemelKayitModel["KurumLogo"] = $("#KurumResimUrl").attr("medyaid"); //DDL
    KurumTemelKayitModel["KurulusTarihi"] = $("#KurulusTarihi").val(); //DDL
    KurumTemelKayitModel["VergiNo"] = $("#VergiNo").val();
    KurumTemelKayitModel["KurumVergiDairesiId"] = $("#VergiDairesi").val();//VergiDairesi
    KurumTemelKayitModel["TicaretSicilNo"] = $("#TicaretSicilNo").val(); //DDL
    KurumTemelKayitModel["WebSitesi"] = $("#WebSitesi").val();
    KurumTemelKayitModel["EpostaAdresi"] = $("#EpostaAdresi").val();
    KurumTemelKayitModel["FaxNo"] = $("#FaxNo").val();
    KurumTemelKayitModel["KurumUlkeId"] = $("#KurumUlke").val();
    KurumTemelKayitModel["KurumSehirId"] = $("#KurumSehir").val();
    //KuurmTemelKayitModel["KurumResimUrl"] =

    $("[id^=KurumAdresTekrar_]").each(function (i, e) {
        AdresModel["LokasyonTipi"] = $(e).find("[id^='LokasyonTipi_']").val() == "" ? 0 : $(e).find("[id^='LokasyonTipi_']").val();
        AdresModel["Ulke"] = $(e).find("[id^='Ulke_']").val();
        AdresModel["Sehir"] = $(e).find("[id^='Sehir_']").val();
        AdresModel["Adres"] = $(e).find("[id^='Adres_']").val();
        AdresListesi.push(AdresModel);
        AdresModel = {};
    });

    $("[id^=KurumBankaTekrar_]").each(function (i, e) {
        BankaModel["BankaID"] = $(e).find("[id^='Banka_']").val();
        BankaModel["SubeID"] = $(e).find("[id^='Sube_']").val();
        BankaModel["Iban"] = $(e).find("[id^='Iban_']").val();
        BankaModel["HesapNo"] = $(e).find("[id^='Hesap_']").val();
        BankaListesi.push(BankaModel);
        BankaModel = {};
    });

    KurumTemelKayitModel["AdresListesi"] = AdresListesi;
    KurumTemelKayitModel["BankaListesi"] = BankaListesi;
    KurumTemelKayitModel["MusteriTemsilciIds"] = MusteriTemsilciIds;
    KurumTemelKayitModel["KurumTips"] = KurumTips;
    console.log(KurumTemelKayitModel);
}

function TemelKurumGuncelle() {
    $('#guncelleBtn').attr("disabled", "disabled");

    if ($('[placeholder="IBAN"]').val()) {
        if (!isIBAN($('[placeholder="IBAN"]').val())) {
            alertim.toast(siteLang.IbanErr, alertim.types.warning);
            $('[placeholder="IBAN"]').addClass("is-invalid");
            return;
        } else {
            $('[placeholder="IBAN"]').removeClass("is-invalid");
        }
    }
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
        $('#guncelleBtn').removeAttr("disabled");
        return;
    }
    GuncellenenVerileriModeleBas();
    var model = KurumTemelKayitModel;
    $.ajax({
        type: "POST",
        url: "/panel/KurumTemelVerileriGuncelle",
        dataType: "json",
        data: model,
        success: function (result) {
            if (result.isSuccess == true) {
                KurumEkParametrelerKayit(kurumID)
                alertim.toast(siteLang.Guncelle, alertim.types.success, function () {
                    location.href = "/panel/CompanyList";
                });
            } else {
                if (result.reasons.length) {
                    $('#guncelleBtn').removeAttr("disabled");
                    alertim.toast(result.reasons.map(x => x.message).toString(), alertim.types.warning);
                } else {
                    alertim.toast(siteLang.Hata, alertim.types.danger);
                }
            }
        },
        error: function (e) {
            console.log(e);
            errorHandler(e);
            $('#guncelleBtn').removeAttr("disabled");
        }
    });
}

function KurumLokasyonTipiListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/KurumLokasyonTipiList",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value);
                ParamDDLDoldur("LokasyonTipi_1", result.value);
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
        data: null,
        async: false,// < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value);
                ParamDDLDoldur("KurumUlke", result.value);
                ParamDDLDoldur("Ulke_1", result.value);
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
                console.log(result.value);
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

function BankaListGetir() {
    $.ajax({
        type: "GET",
        url: "/panel/BankaList",
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value);
                ParamDDLDoldur("KurumBanka", result.value);
                ParamDDLDoldur("Banka_1", result.value);
                $('#KurumBanka').change();
                $('#Banka_1').change();
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function SubeListGetir(alanID, bankaID) {
    if (bankaID == 0 || bankaID == "0") {
        return;
    }
    $.ajax({
        type: "GET",
        url: "/panel/SubeList/" + bankaID,
        dataType: "json",
        data: null,
        success: function (result) {
            if (result.isSuccess == true) {
                console.log(result.value);
                ParamDDLDoldur(alanID, result.value);
            } else {
                alertim.toast(siteLang.Hata, alertim.types.danger);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function ParamDDLDoldur(alanID, data) {
    var str = "<option value='0'>" + siteLang.Choose + " </option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].paramTanim + "</option>";
    }
    $("#" + alanID).html(str);
    //}
    if (kurumAdresSehirVerileri.length > 0 && alanID.includes("Sehir")) {
        for (var j = 0; j < kurumAdresSehirVerileri.length; j++) {
            var value = kurumAdresSehirVerileri[j].value == null ? 0 : kurumAdresSehirVerileri[j].value;
            $("#" + kurumAdresSehirVerileri[j].alanID).val(value);
        }
    }
    if (kurumBankaSubeVerileri.length > 0 && alanID.includes("Sube")) {
        for (var j = 0; j < kurumBankaSubeVerileri.length; j++) {
            var value = kurumBankaSubeVerileri[j].value == null ? 0 : kurumBankaSubeVerileri[j].value;
            $("#" + kurumBankaSubeVerileri[j].alanID).val(value);
        }
    }
}

function InputSil() {
    $('.InputSil').val("");
    //$('#blah').attr('src', "");
    //$("#blah1").attr("href", "#");
    //$('#blah').hide();
    //$("#blah1").hide();
    $('#InputS').hide();
}

function TekrarliAlanAddClickForAdres(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
    //$("." + alanID + "tekrarBtnGrp").hide();
    //$("." + alanID + "tekrarBtnGrp").last().show();
    //$("." + alanID + "RemoveButton").hide();
    //$("." + alanID + "RemoveButton").last().show();
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
            $(e).attr("onchange", "SehirListGetir('Sehir_" + newID + "',$('#Ulke_" + newID + "').val())")
            //$(e).change();
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
    $("#Ulke_" + newID + "").change();
}

function TekrarliAlanAddClickForBanka(alanID, alanDiv) {
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
        if ($(e).attr("id").includes("Banka")) {
            $(e).removeAttr("onchange");
            $(e).attr("onchange", "SubeListGetir('Sube_" + newID + "',$('#Banka_" + newID + "').val())");
        }
        if ($(e).attr("id").includes("Sube")) {
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

function KurumIliskiListGetirG() {
    $.ajax({
        type: "GET",
        url: "/panel/KurumIliskiTuruGetir",
        dataType: "json",
        async: false,
        data: null,
        success: function (data) {
            if (data.value) {
                var selectData = [];
                var uniqueArray = [];
                data.value.forEach(function (item) {
                    if (!uniqueArray.includes(item.paramTanim)) {
                        uniqueArray.push(item.paramTanim);
                        selectData.push({ id: item.tabloID, text: item.paramTanim });
                    }
                });
                $("#KurumTipi").html("");
                $("#KurumTipi").select2({ data: selectData });
            } else {
                $("#KurumTipi").select2({ data: [] });
            }
        },
        error: function (e) {
            $("#KurumTipi").select2({ data: [] });
        }
    });
}

function KurumMusteriTemsilcisiGetirG() {
    //ajax, sistem sayfalar getir, select2'ye doldur.
    $.ajax({
        url: "/panel/MusteriTemsilcisiGetir",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.value) {
                var selectData = [];
                data.value.forEach(function (item) {
                    selectData.push({ id: item.tabloID, text: item.deger });
                });
                $("#MusteriTemsilcileri").html("");
                $("#MusteriTemsilcileri").select2({ data: selectData });
            } else {
                $("#MusteriTemsilcileri").select2({ data: [] });
            }
        },
        error: function (e) {
            $("#MusteriTemsilcileri").select2({ data: [] });
        }
    })
}

var KurumBankaTekrarliAlan = "<div class='KurumBankaTekrar' id='KurumBankaTekrar_1'>\
                                            <div class='col-md-12'>\
                                                <div class='row'>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label  class='Lbl'>"+ siteLang.Banka + "</label>\
                                                            <select id='Banka_1' class='form-control' style='width: 100%;' onchange='SubeListGetir(\"Sube\",$(\"#Banka_1\").val())'></select>\
                                                        </div>\
                                                    </div>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.Sube + "</label>\
                                                            <select id='Sube_1' class='form-control' style='width: 100%;'>\
 <option value='0' hidden>"+ siteLang.Choose + "</option>\
                                                            </select>\
                                                        </div>\
                                                    </div>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.IBAN + "</label>\
                                                            <input class='form-control' type='text' id='Iban_1'>\
                                                        </div>\
                                                    </div>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label  class='Lbl'>"+ siteLang.HesapNumarasi + "</label>\
                                                            <input class='form-control' type='text' id='Hesap_1'>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div class='AdrestekrarBtnGrp'>\
                                                    <button type='button' class='btn btn-xs KurumBankaAddButton'>\
                                                        <i class='fas fa-plus'></i>"+ siteLang.BankaEkle + "\
                                                    </button> &nbsp;\
                                                    <button type='button' class='btn btn-xs KurumBankaRemoveButton' style='display: none;'>\
                                                        <i class='fas fa-minus-circle accent-danger'></i>\
                                                    </button>\
                                                </div>\
                                            </div>\
                                        </div>";
//<hr style='background-color: #fd7e14;'>\

var KurumAdresTekrarliAlan = "<div class='KurumAdresTekrar' id='KurumAdresTekrar_1'>\
                                            <div class='col-md-12'>\
                                                <div class='form-group'>\
                                                    <label class='Lbl' for='LokasyonTipi'>"+ siteLang.LokasyonTipi + "</label>\
                                                    <select id='LokasyonTipi_1' class='form-control' style='width: 100%;'>\
 <option value='0' hidden>"+ siteLang.Choose + "</option>\
                                                    </select>\
                                                </div>\
                                                <div class='row'>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.Ulke + "</label>\
                                                            <select id='Ulke_1' class='form-control' style='width: 100%;' onchange='SehirListGetir(\"Sehir\",$(\"#Ulke_1\").val())'>" +
    " <option value='0' hidden>" + siteLang.Choose + "</option>\</select>\
                                                        </div>\
                                                    </div>\
                                                    <div class='col-md-6'>\
                                                        <div class='form-group'>\
                                                            <label class='Lbl'>"+ siteLang.Sehir + "</label>\
                                                            <select id='Sehir_1' class='form-control' style='width: 100%;'>\
                                                            <option value='0' hidden>"+ siteLang.Choose1 + "</option>\
                                                        </select >\
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