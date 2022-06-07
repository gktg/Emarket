class SistemIdariService {
    constructor() {
        this.allList = [];
        this.kurumtemelList = [];
        this.kurumBankaListesi = [];
        this.kurumLisansListesi = [];
        this.kurumKisiLisansListesi = [];
        this.loadIdariProfile = function () {
            $("#Kurumlar").val(kurumID);
            $("#KurumUlke").change();
            InputCleaner();
            //var coreUrl = $("#site-urlMedya").val();
            var url = "/panel/KurumIdariVerileriGetir/" + kurumID;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    console.log(result.value);
                    if (result.value) {
                        id = result.value.tabloID;
                        sistemIdariServiceModel.kurumtemelList = [];
                        sistemIdariServiceModel.kurumtemelList.push(result.value);
                        sistemIdariServiceModel.kurumBankaListesi = [];
                        sistemIdariServiceModel.kurumLisansListesi = [];
                        sistemIdariServiceModel.kurumKisiLisansListesi = [];
                        sistemIdariServiceModel.kurumBankaListesi = result.value.kurumBankaListesi;
                        sistemIdariServiceModel.kurumLisansListesi = result.value.kurumLisansListesi;
                        sistemIdariServiceModel.kurumKisiLisansListesi = result.value.kurumKisiLisansListesi;
                        $("#kurumTemelBilgilerTable").DataTable().destroy();
                        sistemIdariServiceModel.kurumTemelBilgilerTable = $('#kurumTemelBilgilerTable').DataTable({
                            "paging": false,
                            "responsive": false,
                            "order": [],
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
                            data: sistemIdariServiceModel.kurumtemelList,
                            columns: [
                                {
                                    data: null,
                                    render: function (data) {
                                        //var resimUrl = data.kurumResimUrl == null
                                        //    ? ""
                                        //    : coreUrl + data.kurumResimUrl;
                                        return `<div class='logo-div'><span class='logo-span'><img src='' class='kurumLogo'></span></div>`;
                                    }
                                },
                                { data: 'kurumAdi' },
                                { data: 'epostaAdresi' },
                                { data: 'faxNo' },
                                { data: 'ticaretSicilNo' },
                                { data: 'vergiNo' },
                            ],
                            "dom": 'Bi',
                            "buttons": []
                        });
                        $("#kurumLisansBilgiTable").DataTable().destroy();
                        sistemIdariServiceModel.kurumLisansBilgiTable = $('#kurumLisansBilgiTable').DataTable({
                            "paging": false,
                            "responsive": false,
                            "order": [],
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
                            data: sistemIdariServiceModel.kurumLisansListesi,
                            columns: [
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.name == null || undefined ? "" : data.name;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.sonKullanimTarihi == null || undefined
                                            ? ""
                                            : CsharpDateToStringDateyyyymmddForProfile(data.sonKullanimTarihi);
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.lisansKisiSayisi == null || undefined ? "" : data.lisansKisiSayisi;
                                    }
                                },
                            ],
                            "dom": 'Bi',
                            "buttons": []
                        });
                        $("#bankaBilgilerTable").DataTable().destroy();
                        sistemIdariServiceModel.bankaBilgilerTable = $('#bankaBilgilerTable').DataTable({
                            "paging": false,
                            "responsive": false,
                            "order": [],
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
                            data: sistemIdariServiceModel.kurumBankaListesi,
                            columns: [
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.bankaAdi == null || undefined ? "" : data.bankaAdi;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.subeAdi == null || undefined ? "" : data.subeAdi;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.hesapNo == null || undefined ? "" : data.hesapNo;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.iban == null || undefined ? "" : data.iban;
                                    }
                                },
                            ],
                            "dom": 'Bi',
                            "buttons": []
                        });
                        $("#kurumKisiLisansBilgileriTable").DataTable().destroy();
                        sistemIdariServiceModel.kurumKisiLisansBilgileriTable = $('#kurumKisiLisansBilgileriTable').DataTable({
                            "paging": true,
                            "responsive": false,
                            "order": [],
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
                            data: sistemIdariServiceModel.kurumKisiLisansListesi,
                            columns: [
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.lisansAboneKisiAdi == null || undefined ? "" : data.lisansAboneKisiAdi;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.lisansAboneKisiMail == null || undefined
                                            ? ""
                                            : data.lisansAboneKisiMail;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.name == null || undefined ? "" : data.name;
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.lisansAbonelikBaslangicTarihi == null || undefined
                                            ? ""
                                            : CsharpDateToStringDateyyyymmddForProfile(data.lisansAbonelikBaslangicTarihi);
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data) {
                                        return data.lisansAbonelikBitisTarihi == null || undefined
                                            ? ""
                                            : CsharpDateToStringDateyyyymmddForProfile(data.lisansAbonelikBitisTarihi);
                                    }
                                },
                            ],
                            "dom": 'Bip',
                            "buttons": []
                        });
                    }
                }
            });
        };
        this.loadKurumID = function () {
            var url = "/panel/cookieKurumID";
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function (result) {
                    console.log(result.value);
                    if (result.value) {
                        kurumID = result.value;
                    }
                }
            });
        };
        this.kurumGetir = function () {
            var url = "/panel/kurumList";
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function (result) {
                    if (result.value) {
                        ParamDDLDoldur("Kurumlar", result.value);
                    }
                    else {
                        alertim.toast(siteLang.Hata, alertim.types.danger);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        };
    }
}
var id;
var kurumID = 0;
var sistemIdariServiceModel = new SistemIdariService();
$(document).ready(function () {
    sistemIdariServiceModel.loadKurumID();
    sistemIdariServiceModel.kurumGetir();
    sistemIdariServiceModel.loadIdariProfile();
    $("#Kurumlar").on('select2:select', function (e) {
        if (parseInt(this.value) > 0) {
            kurumID = this.value;
            sistemIdariServiceModel.loadIdariProfile();
        }
    });
    $("#kurumDuzenle").click(function () {
        window.location.href = "/panel/CompanyUpdate/" + id;
    });
    $("#kurumBankaDuzenle").click(function () {
        window.location.href = "/panel/CompanyUpdate/" + id;
    });
    $("#kurumLisansDuzenle").click(function () {
        window.location.href = "/CompanyLicense/List";
    });
    $("#kurumKisiLisansDuzenle").click(function () {
        window.location.href = "/CompanyLicense/EmployeeManagement";
    });
});
function ParamDDLDoldur(alanID, data) {
    var str = "<option value='0'>Seçiniz </option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].kurumKisaUnvan + "</option>";
    }
    $("#" + alanID).html(str);
}
function InputCleaner() {
    //$("#KurumLisansTekrarliAlan").remove();
    //$("#BankaIdariTekrarliAlan").remove();
    //$("#KurumKisiLisansTekrarliAlan").remove();
    $(".LisansTekrar").remove();
    $(".BankaTekrar").remove();
    $(".LisansKisiTekrar").remove();
}
//var BankaIdariTekrarDiv = "<div class='card-body BankaTekrar'>\
//        <div class='row'>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label for='Banka'>Banka: </label>\
//                    <a id='Banka' style='width: 100%;'>{bankaId}\
//                 </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Şube: </label>\
//                    <a id='Sube' style='width: 100%;'>{subeId}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Hesap Numarası: </label>\
//                    <a id='Hesap' style='width: 100%;'>{hesapNo}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Iban: </label>\
//                    <a id='Iban' style='width: 100%;'>{iban}\
//                        </a>\
//                </div>\
//            </div>\
//        </div>\
//        <hr/>\
//    </div>";
//var KurumLisansTekrarDiv = "<div class='card-body LisansTekrar'>\
//        <div class='row'>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label for='LAdi'>Lisans Adı: </label>\
//                    <a id='LAdi' style='width: 100%;'>{name}\
//                 </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Lisans Son Kullanma Tarihi: </label>\
//                    <a id='SonKullanim' style='width: 100%;'>{sonKullanimTarihi}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Lisans Kişi Sayısı: </label>\
//                    <a id='KisiSayisi' style='width: 100%;'>{lisansKisiSayisi}\
//                        </a>\
//                </div>\
//            </div>\
//        </div>\
//        <hr/>\
//    </div>";
//var KurumLisansKisiTekrarDiv = "<div class='card-body LisansKisiTekrar'>\
//        <div class='row'>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label for='AdSoyad'>Adı-Soyadı: </label>\
//                    <a id='AdSoyad' style='width: 100%;'>{lisansAboneKisiAdi}\
//                 </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>E-mail: </label>\
//                    <a id='KisiMail' style='width: 100%;'>{lisansAboneKisiMail}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Abonelik Adı: </label>\
//                    <a id='Abonelik' style='width: 100%;'>{name}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Abonelik Başlangıç Tarihi: </label>\
//                    <a id='BasTar' style='width: 100%;'>{lisansAbonelikBaslangicTarihi}\
//                        </a>\
//                </div>\
//            </div>\
//            <div class='col-md-4'>\
//                <div class='form-group'>\
//                    <label>Abonelik Bitiş Tarihi: </label>\
//                    <a id='BitTar' style='width: 100%;'>{lisansAbonelikBitisTarihi}\
//                        </a>\
//                </div>\
//            </div>\
//        </div>\
//        <hr/>\
//    </div>";
