var registerPostModel = {};
var kurumModel = {};
var kisiModel = {};
var organizasyonBirimleri = [];
var orgBirim = {};
var kurumList = [];
var keyLength = 0;
var kullaniciAdiUygunMuKontrol = false;

$(document).ready(function () {
    //UlkeListGetir();
    //CalisanSayilariListGetir();
    //SistemDilleriGetir();
    //paraBirimTipleriGetir();
    LisansGetir2();
    //PhoneMask();
    Numeric();
    BireyselLabel();

    $("[name=KTuru]").click(function () {
        $(".validationMessage").html("");
        //$("#txtKisiAdi").val("");
        //$("#txtKisiSoyadi").val("");
        //$("#txtMeslekiUnvan").val("");
        //$("#txtKisiKullaniciAdi").val("");
        //$("#txtTelefonNo").val("");
        $("#txtKurumTicariUnvan").val("");
        $("#txtVergiNo").val("");
        //$("#CalisanSayisi").val(0);
        //$("#UlkeDDL").val(0);
        //$("#sirketDili").val(0);
        $("#lisanslar").val(0);
        //$("#zamanlar").val(0);
        $("#LKisiS").val("");
        //$("#txtSifre").val("");
        //$("#txtSifreTekrar").val("");
    });

    $("#txtSifreTekrar").on("change",
        function () {
            if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
                $('#txtSifreTekrar').addClass("is-invalid");
            } else {
                $('#txtSifreTekrar').removeClass("is-invalid");
                $('#txtSifreTekrar').addClass("is-valid");
            }
        });

    $("#txtKisiKullaniciAdi").on("change",
        function () {
            KullaniciAdiKontrolu();
        });

    //$(document).on("change",
    //    "#lisanslar",
    //    function () {
    //        LisansZamanıGetir();
    //    });

    //CustomInputMask('#txtTelefonNo');

    $('input[name*="KTuru"]').on("change",
        function () {
            if ($('input:checked[name*="KTuru"]').val() === "1") {
                KurumsalLabel();
                //UlkeListGetir();
                //CalisanSayilariListGetir();
                //SistemDilleriGetir();
                //paraBirimTipleriGetir();
                LisansGetir();
                //PhoneMask();

                //$('#kosul').on("change",
                //    function () {
                //        if (!$(this).is(":checked")) {
                //            $('#btnRegister').attr("disabled", "disabled");
                //        } else if ($(this).is(":checked")) {
                //            $('#btnRegister').removeAttr("disabled");
                //        }
                //    });

                //$("#txtSifre").on("change",
                //    function () {
                //        if (!CheckStrength() && $("#txtSifre").val().length > 0) {
                //            $('#txtSifre').addClass("is-invalid");
                //            $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
                //            alertim.toast(
                //                "Şifreniz en az 8 karakter ve  en az 1 sayı, özel karakter(!,?) ve büyük harf bulunmalıdır.",
                //                alertim.types.warning);
                //        } else {
                //            $('#txtSifre').removeClass("is-invalid");
                //            $('#txtSifre').addClass("is-valid");
                //            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
                //        }
                //        if (!($("#txtSifre").val().length > 0)) {
                //            $('#txtSifre').removeClass("is-valid");
                //            $('#txtSifre').removeClass("is-invalid");
                //            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
                //        }
                //    });

                $("#txtSifreTekrar").on("change",
                    function () {
                        if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
                            $('#txtSifreTekrar').addClass("is-invalid");
                        } else {
                            $('#txtSifreTekrar').removeClass("is-invalid");
                            $('#txtSifreTekrar').addClass("is-valid");
                        }
                    });

                $("#txtKisiKullaniciAdi").on("change",
                    function () {
                        //if ($('#txtKisiKullaniciAdi').val().length == 0) {
                        //    if (!Register()) {
                        //        return;
                        //    }
                        //}
                        //$('#txtKisiKullaniciAdi').removeClass("is-invalid");
                        //$('#txtKisiKullaniciAdi').addClass("is-valid");
                        //$('#alertDiv').hide();
                        if ($('#txtKisiKullaniciAdi').val().length > 0) {
                            KullaniciAdiKontrolu();
                            //$("#txtKisiMail").val(($("#txtKisiKullaniciAdi").val());
                            //if (!isEmail($('#txtKisiKullaniciAdi').val())) {
                            //    var str = "Lütfen kullanıcı adı olarak geçerli bir mail adresi girin!";
                            //    $('#alertDiv').html(str);
                            //    $('#alertDiv').show();
                            //    $('#txtKisiKullaniciAdi').removeClass("is-valid");
                            //    $('#txtKisiKullaniciAdi').addClass("is-invalid");
                            //    return;
                            //} else {
                            //    $('#txtKisiKullaniciAdi').removeClass("is-invalid");
                            //    $('#txtKisiKullaniciAdi').addClass("is-valid");
                            //    $('#alertDiv').hide();
                            //}
                        } else {
                            $('#txtKisiKullaniciAdi').removeClass("is-invalid");
                            $('#txtKisiKullaniciAdi').removeClass("is-valid");
                            $('#alertDiv').hide();
                        }
                    });

                //$(document).on("change",
                //    "#lisanslar",
                //    function () {
                //        LisansZamanıGetir();
                //    });

                //CustomInputMask('#txtTelefonNo');
            }

            else {
                BireyselLabel();
                //UlkeListGetir();
                //paraBirimTipleriGetir();
                LisansGetir2();
                //PhoneMask();

                //$('#kosul').on("change",
                //    function () {
                //        if (!$(this).is(":checked")) {
                //            $('#btnRegister').attr("disabled", "disabled");
                //        } else if ($(this).is(":checked")) {
                //            $('#btnRegister').removeAttr("disabled");
                //        }
                //    });

                //$("#txtSifre").on("change",
                //    function () {
                //        if (!CheckStrength() && $("#txtSifre").val().length > 0) {
                //            $('#txtSifre').addClass("is-invalid");
                //            $('#strengthMessage').find("p").addClass('SifreKarmasikUyari');
                //            alertim.toast(
                //                "Şifreniz en az 8 karakter ve  en az 1 sayı, özel karakter(!,?) ve büyük harf bulunmalıdır.",
                //                alertim.types.warning);
                //        } else {
                //            $('#txtSifre').removeClass("is-invalid");
                //            $('#txtSifre').addClass("is-valid");
                //            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
                //        }
                //        if (!($("#txtSifre").val().length > 0)) {
                //            $('#txtSifre').removeClass("is-valid");
                //            $('#txtSifre').removeClass("is-invalid");
                //            $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
                //        }
                //    });

                $("#txtSifreTekrar").on("change",
                    function () {
                        if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
                            $('#txtSifreTekrar').addClass("is-invalid");
                        } else {
                            $('#txtSifreTekrar').removeClass("is-invalid");
                            $('#txtSifreTekrar').addClass("is-valid");
                        }
                    });

                $("#txtKisiKullaniciAdi").on("change",
                    function () {
                        //if ($('#txtKisiKullaniciAdi').val().length == 0) {
                        //    if (!Register()) {
                        //        return;
                        //    }
                        //}
                        //$('#txtKisiKullaniciAdi').removeClass("is-invalid");
                        //$('#txtKisiKullaniciAdi').addClass("is-valid");
                        //$('#alertDiv').hide();
                        if ($('#txtKisiKullaniciAdi').val().length > 0) {
                            KullaniciAdiKontrolu();
                            //$("#txtKisiMail").val(($("#txtKisiKullaniciAdi").val());
                            //if (!isEmail($('#txtKisiKullaniciAdi').val())) {
                            //    var str = "Lütfen kullanıcı adı olarak geçerli bir mail adresi girin!";
                            //    $('#alertDiv').html(str);
                            //    $('#alertDiv').show();
                            //    $('#txtKisiKullaniciAdi').removeClass("is-valid");
                            //    $('#txtKisiKullaniciAdi').addClass("is-invalid");
                            //    return;
                            //} else {
                            //    $('#txtKisiKullaniciAdi').removeClass("is-invalid");
                            //    $('#txtKisiKullaniciAdi').addClass("is-valid");
                            //    $('#alertDiv').hide();
                            //}
                        } else {
                            $('#txtKisiKullaniciAdi').removeClass("is-invalid");
                            $('#txtKisiKullaniciAdi').removeClass("is-valid");
                            $('#alertDiv').hide();
                        }
                    });

                //$(document).on("change",
                //    "#lisanslar",
                //    function () {
                //        LisansZamanıGetir();
                //    });

                //CustomInputMask('#txtTelefonNo');
            }
        });
});

function BireyselLabel() {
    $(".dvKurum").hide();
    $(".dvVergi").hide();
    $(".dvLKisiS").hide();
    //$('#lisanslar').val($('#lisanslar option').eq(1).val())
    //$(".dvCalisan").hide();
    //$(".dvDil").hide();
}

function KurumsalLabel() {
    $(".dvKurum").show();
    $(".dvVergi").show();
    $(".dvLKisiS").show();
    $('.dvLisans').show();

    //$(".dvCalisan").show();
    //$(".dvDil").show();
}

function GoFocusElem(elem) {
    elem[0].scrollIntoView();
    window.scrollBy(0, -50);
}
function GetInputValuesForRegister() {
    if ($('input:checked[name*="KTuru"]').val() === "1") {
        organizasyonBirimleri = [];
        orgBirim = {};
        kisiModel = {};
        kurumModel = {};
        registerPostModel = {};

        var kurumID = $('#txtKurumTicariUnvan').attr("kurumID");
        if (kurumID != 0) {
            kurumModel["TabloID"] = kurumID;
        }
        kurumModel["KurumVergiNo"] = $("#txtVergiNo").val();

        kurumModel["KurumTicariUnvani"] = $('#txtKurumTicariUnvan').val();

        kurumModel["KurumKisaUnvan"] = $('#txtKurumTicariUnvan').val();
        kurumModel["KurumTipiId"] = 1; //$('#ddlKurumTipi').val(); //DDL
        kurumModel["KurumSektorId"] = 1; //$('#ddlKurumSektoru').val(); //DDL
        kurumModel["KurumAdres"] = 1; // $('#txtKurumAdres').val();
        kurumModel["UlkeID"] = 1//$('#UlkeDDL').val();
        kurumModel["LisansId"] = $('#lisanslar').val();
        kurumModel["LisansZamanId"] = 1; //$('#zamanlar').val()
        kurumModel["LisansKisiSayisi"] = $('#LKisiS').val();

        kisiModel["KisiAdi"] = $('#txtKisiAdi').val();
        kisiModel["KisiSoyadi"] = $('#txtKisiSoyadi').val();
        kisiModel["KisiKullaniciAdi"] = $('#txtKisiKullaniciAdi').val();
        kisiModel["KisiMail"] = $('#txtKisiKullaniciAdi').val();
        kisiModel["KisiTelefon"] = ""//$('#txtTelefonNo').val();
        kisiModel["KisiCinsiyetId"] = 1; // $('#ddlCinsiyet').val(); //DDL
        kisiModel["KisiSifre"] = $('#txtSifre').val();
        kisiModel["MeslekiUnvan"] = "";//$('#txtMeslekiUnvan').val();
        kisiModel["CalisanSayisiID"] = 1// $('#CalisanSayisi').val();
        kisiModel["KisiDilID"] = 1//$('#sirketDili').val();
        kisiModel["UyelikSartiKabulEttiMi"] = $('#kosul').is(":checked");
        kisiModel["PazarlamaBilgisiOnayladiMi"] = $('#bilgilendirme').is(":checked");
        orgBirim["id"] = 1; //$('#ddlDepartman').val();
        orgBirim["tanim"] = "genel"; //$('#ddlDepartman :selected').text();
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1; // $('#ddlPozisyon').val();
        orgBirim["tanim"] = "genel"; // $('#ddlPozisyon :selected').text();
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1; //$('#ddlRol').val();
        orgBirim["tanim"] = "genel"; // $('#ddlRol :selected').text();
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1; // $('#ddlLokasyon').val();
        orgBirim["tanim"] = "genel"; // $('#ddlLokasyon :selected').text();
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};

        kisiModel["organizasyonBirimleri"] = organizasyonBirimleri;
        registerPostModel["KurumModel"] = kurumModel;
        registerPostModel["KisiModel"] = kisiModel;

        return registerPostModel;
    }

    else {
        organizasyonBirimleri = [];
        orgBirim = {};
        kisiModel = {};
        kurumModel = {};
        registerPostModel = {};
        var bireyselKurumAdi = $('#txtKisiAdi').val()[0] + $('#txtKisiSoyadi').val()[0];
        kurumModel["TabloID"] = 0;
        kurumModel["KurumVergiNo"] = random.guid;

        kurumModel["KurumTicariUnvani"] = bireyselKurumAdi;

        kurumModel["KurumKisaUnvan"] = bireyselKurumAdi;
        kurumModel["KurumTipiId"] = 1;
        kurumModel["KurumSektorId"] = 1;
        kurumModel["KurumAdres"] = 1;
        kurumModel["UlkeID"] = 1// $('#UlkeDDL').val();
        kurumModel["LisansId"] = $('#lisanslar').val();
        kurumModel["LisansZamanId"] = 1; //$('#zamanlar').val()
        kurumModel["LisansKisiSayisi"] = 1;

        kisiModel["KisiAdi"] = $('#txtKisiAdi').val();
        kisiModel["KisiSoyadi"] = $('#txtKisiSoyadi').val();
        kisiModel["KisiKullaniciAdi"] = $('#txtKisiKullaniciAdi').val();
        kisiModel["KisiMail"] = $('#txtKisiKullaniciAdi').val();
        kisiModel["KisiTelefon"] = ""//$('#txtTelefonNo').val();
        kisiModel["KisiCinsiyetId"] = 1;
        kisiModel["KisiSifre"] = $('#txtSifre').val();
        kisiModel["MeslekiUnvan"] = ""//$('#txtMeslekiUnvan').val();
        kisiModel["CalisanSayisiID"] = 1// $('#CalisanSayisi').val();
        kisiModel["KisiDilID"] = 1;
        kisiModel["UyelikSartiKabulEttiMi"] = $('#kosul').is(":checked");
        kisiModel["PazarlamaBilgisiOnayladiMi"] = $('#bilgilendirme').is(":checked");
        orgBirim["id"] = 1;
        orgBirim["tanim"] = "genel";
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1;
        orgBirim["tanim"] = "genel";
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1;
        orgBirim["tanim"] = "genel";
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};
        orgBirim["id"] = 1;
        orgBirim["tanim"] = "genel";
        organizasyonBirimleri.push(orgBirim);
        orgBirim = {};

        kisiModel["organizasyonBirimleri"] = organizasyonBirimleri;
        registerPostModel["KurumModel"] = kurumModel;
        registerPostModel["KisiModel"] = kisiModel;
        return registerPostModel;
    }
}

function Register() {
    if ($('input:checked[name*="KTuru"]').val() === "1") {
        $('.Dsbl').attr("disabled", "disabled");

        if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
            $('#txtSifreTekrar').addClass("is-invalid");
            GoFocusElem($('#txtSifre'));
            alertim.toast(siteLang.SifreUyum, alertim.types.warning);
            $('#btnRegister').removeAttr("disabled");
            return;
        }
        $('#txtSifreTekrar').removeClass("is-invalid");
        $('#txtSifreTekrar').addClass("is-valid");

        registerPostModel = GetInputValuesForRegister();
        registerPostModel.KisiModel.kisiKimlikNo = "11111111111";
        $.ajax({
            type: "POST",
            url: "/LoginRegister/register",
            dataType: "json",
            data: registerPostModel,
            success: function (result) {
                if (result.isSuccess) {
                    //$('#iyzipay-checkout-form').append(result.value.checkoutFormContent)

                    $('#alertDivTop').html("Hesabınızı Aktifleştirmek için Mail Adresinizi Kontrol Edin");
                    $('#alertDivTop').show();
                    $(window).scrollTop(0);

                    alertim.toast(siteLang.Kaydet, alertim.types.success);
                    setTimeout(function () {
                        location.href = '/';
                    }, 5000);
                    //$('#btnRegister').removeAttr("disabled");
                }
                else {
                    var errormsg = result.reasons[0].message;//"Kullanıcı adı ve şifrenizi kontrol ediniz!";
                    $('#alertDivTop').html(errormsg);
                    $('#alertDivTop').show();
                    $(window).scrollTop(0);
                    alertim.toast(siteLang.Hata, alertim.types.warning);
                    $('#btnRegister').removeAttr("disabled");
                }
            },
            error: function (e) {
                console.log(e);
                errorHandler(e);
                //$('#btnRegister').removeAttr("disabled");
            }
        });
    }

    else {
        $('.Dsbl').attr("disabled", "disabled");
        $('#strengthMessage').find("p").removeClass('SifreKarmasikUyari');
        if ($('#txtSifre').val() !== $('#txtSifreTekrar').val()) {
            $('#txtSifreTekrar').addClass("is-invalid");
            GoFocusElem($('#txtSifre'));
            alertim.toast(siteLang.SifreUyum, alertim.types.warning);
            $('#btnRegister').removeAttr("disabled");
            return;
        }
        $('#txtSifreTekrar').removeClass("is-invalid");
        $('#txtSifreTekrar').addClass("is-valid");

        registerPostModel = GetInputValuesForRegister();

        $.ajax({
            type: "POST",
            url: "/LoginRegister/BireyselRegister",
            dataType: "json",
            data: registerPostModel, // < === this is where the problem was !!
            success: function (result) {
                if (result.isSuccess) {
                    //$('#iyzipay-checkout-form').append(result.value.checkoutFormContent)

                    $('#alertDivTop').html("Hesabınızı Aktifleştirmek için Mail Adresinizi Kontrol Edin");
                    $('#alertDivTop').show();
                    $(window).scrollTop(0);
                    alertim.toast(siteLang.Kaydet, alertim.types.success);
                    setTimeout(function () {
                        location.href = '/';
                    }, 5000);
                }
                else {
                    var errormsg = result.reasons[0].message;
                    $('#alertDivTop').html(errormsg);
                    $('#alertDivTop').show();
                    $(window).scrollTop(0);
                    alertim.toast(siteLang.Hata, alertim.types.warning);
                    $('#btnRegister').removeAttr("disabled");
                }
            },
            error: function (e) {
                console.log(e);
                errorHandler(e);
                /* $('#btnRegister').removeAttr("disabled");*/
            }
        });
    }
}

function KullaniciAdiKontrolu() {
    var username = new String();
    username = $('#txtKisiKullaniciAdi').val();
    var kontrol;
    $.ajax({
        type: "POST",
        url: "/LoginRegister/KullaniciAdiKontrolu",
        dataType: "json",
        data: { mailOrUsername: username },
        success: function (result) {
            if (result.value == true) {
                alertim.toast(siteLang.MailHata, alertim.types.warning);
                kullaniciAdiUygunMuKontrol = false;
            } else if (result.value == false) {
                kullaniciAdiUygunMuKontrol = true;
            }
            kullaniciAdiUygunMu(kullaniciAdiUygunMuKontrol);
        },
        error: function (e) {
            console.log(e);
        }
    });
    return kullaniciAdiUygunMuKontrol;
}

function kullaniciAdiUygunMu(result) {
    if ($('#txtKisiKullaniciAdi').val().length > 0) {
        if (!result) {
            $('#txtKisiKullaniciAdi').removeClass("is-valid");
            $('#txtKisiKullaniciAdi').addClass("is-invalid");
            return false;
        } else {
            $('#txtKisiKullaniciAdi').removeClass("is-invalid");
            $('#txtKisiKullaniciAdi').addClass("is-valid");
            return true;
        }
    }
}

//function DinamikKurumList() {
//    kurumList = [];
//    var kurumAdi = $('#txtKurumTicariUnvan').val();
//    $.ajax({
//        type: "POST",
//        url: "/LoginRegister/KurumList",
//        dataType: "json",
//        data: { kurumAdi: kurumAdi }, // < === this is where the problem was !!
//        //async: false,
//        success: function (result) {
//            if (result.value != null && result.value != "undefined") {
//                for (var item of result.value) {
//                    var kurumData =
//                    {
//                        TabloID: item.tabloID,
//                        KurumTicariUnvani: item.kurumTicariUnvani
//                    };
//                    kurumList.push(kurumData);
//                }
//            }
//        },
//        complete: function () {
//            autocomplete(document.getElementById('txtKurumTicariUnvan'), kurumList);
//        },
//        error: function (e) {
//            console.log(e);
//        },
//    });
//}
//function UlkeListGetir() {
//    $.ajax({
//        type: "GET",
//        url: "/panel/UlkeList",
//        dataType: "json",
//        data: null, // < === this is where the problem was !!
//        success: function (result) {
//            if (result.isSuccess == true) {
//                console.log(result.value);
//                ParamDDLDoldur("UlkeDDL", result.value);
//            } else {
//                alertim.toast(siteLang.Hata, alertim.types.danger);
//            }
//        },
//        error: function (e) {
//            console.log(e);
//        }, //success: function (result) {
//    });
//}

//function CalisanSayilariListGetir() {
//    $.ajax({
//        type: "GET",
//        url: "/panel/CalisanSayilariList",
//        dataType: "json",
//        data: null, // < === this is where the problem was !!
//        success: function (result) {
//            if (result.isSuccess == true) {
//                console.log(result.value);
//                ParamDDLDoldur("CalisanSayisi", result.value);
//            } else {
//                alertim.toast(siteLang.Hata, alertim.types.danger);
//            }
//        },
//        error: function (e) {
//            console.log(e);
//        },
//    });
//}

//function SistemDilleriGetir() {
//    $.ajax({
//        type: "GET",
//        url: "/panel/SistemDilleriGetir",
//        dataType: "json",
//        data: null, // < === this is where the problem was !!
//        success: function (result) {
//            if (result.isSuccess == true) {
//                console.log(result.value);
//                ParamDDLDoldur("sirketDili", result.value);
//            } else {
//                alertim.toast(siteLang.Hata, alertim.types.danger);
//            }
//        },
//        error: function (e) {
//            console.log(e);
//        }, //success: function (result) {
//    });
//}

function LisansGetir() {
    var str = "";
    $.ajax({
        type: "GET",
        url: "/License/LisansListForView",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.value) {
                var data = result.value;
                str += "<option value='0'>Seçiniz</option>";
                for (var i = 0; i < data.length; i++) {
                    var tanim = data[i].name; //data[i].paramTanim == undefined ? data[i].tanim : data[i].paramTanim;
                    str += "<option value='" + data[i].tabloID + "'>" + tanim + "</option>";
                }
                $("#lisanslar").html(str);
                //console.log(str);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function LisansGetir2() {
    var str = "";
    $.ajax({
        type: "GET",
        url: "/License/LisansListForView",
        dataType: "json",
        data: null, // < === this is where the problem was !!
        success: function (result) {
            if (result.value) {
                var data = result.value.filter(a => a.name === "OctaPull FREE" || a.name === "OctaMeet");
                str += "<option value='0'>Seçiniz</option>";
                for (var i = 0; i < data.length; i++) {
                    var tanim = data[i].name; //data[i].paramTanim == undefined ? data[i].tanim : data[i].paramTanim;
                    str += "<option value='" + data[i].tabloID + "'>" + tanim + "</option>";
                }
                $("#lisanslar").html(str);

                $('#lisanslar').prop("selectedIndex", 1);
                //console.log(str);
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}
var paraBirimList = [];
function paraBirimTipleriGetir() {
    paraBirimList = [];
    var data = {
        ModelName: "ParamParaBirimleri",
        UstId: 0,
        KurumId: 0,
        TabloID: 0,
        Tanim: "test",
        DilID: 1,
        EsDilID: 0
    }
    var list = [];
    $.ajax({
        data: data,
        url: "/panel/param/listparam",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (x) {
            for (var item of x.valueOrDefault) {
                list.push({
                    id: item.tabloID,
                    title: item.tanim,
                });
            }
            //licenseService.ParaBirimleriSayfayaBas(list);
        },
        error: function (e) {
            console.log(e);
        }
    })
    paraBirimList = list;
}

//function LisansZamanıGetir() {
//    var str = "";
//    var id = $("#lisanslar").val();
//    $.ajax({
//        type: "GET",
//        url: "/LicenseZaman/List/" + id,
//        dataType: "json",
//        data: null, // < === this is where the problem was !!
//        success: function (result) {
//            if (result.value) {
//                var data = result.value;
//                str += "<option value='0'>Seçiniz</option>";
//                for (var item of data) {
//                    var paketbedeli = ""
//                    if (item.lisansBedeli != null && item.lisansBedeliParaBirimiId != null) {
//                        var kur = paraBirimList.filter(a => a.id == item.lisansBedeliParaBirimiId)[0].title;
//                        paketbedeli = "(" + item.lisansBedeli + " " + kur + ")";
//                    }
//                    var tanim = Math.round(parseInt(item.gecerliOlduguGun) / 30).toString() + " Ay " + paketbedeli;
//                    str += "<option value='" + item.tabloID + "'>" + tanim + "</option>";
//                }
//            }
//            $("#zamanlar").html(str);
//            //console.log(str);
//        },
//        error: function (e) {
//            console.log(e);
//        },
//    });
//}