class KurumIdariService {
    constructor() {
        this.allList = [];
        this.kurumtemelList = [];
        this.kurumBankaListesi = [];
        this.kurumLisansListesi = [];
        this.kurumKisiLisansListesi = [];
        this.loadIdariProfile = function () {
            //var coreUrl = $("#site-urlMedya").val();
            var url = "/panel/KurumIdariVerileriGetir/" + 0;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    console.log(result.value);
                    if (result.value) {
                        id = result.value.tabloID;
                        kurumIdariServiceModel.kurumtemelList = [];
                        kurumIdariServiceModel.kurumtemelList.push(result.value);
                        kurumIdariServiceModel.kurumBankaListesi = [];
                        kurumIdariServiceModel.kurumLisansListesi = [];
                        kurumIdariServiceModel.kurumKisiLisansListesi = [];
                        kurumIdariServiceModel.kurumBankaListesi = result.value.kurumBankaListesi;
                        kurumIdariServiceModel.kurumLisansListesi = result.value.kurumLisansListesi;
                        kurumIdariServiceModel.kurumKisiLisansListesi = result.value.kurumKisiLisansListesi;
                        $("#kurumTemelBilgilerTable").DataTable().destroy();
                        kurumIdariServiceModel.kurumTemelBilgilerTable = $('#kurumTemelBilgilerTable').DataTable({
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
                            data: kurumIdariServiceModel.kurumtemelList,
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
                        kurumIdariServiceModel.kurumLisansBilgiTable = $('#kurumLisansBilgiTable').DataTable({
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
                            data: kurumIdariServiceModel.kurumLisansListesi,
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
                        kurumIdariServiceModel.bankaBilgilerTable = $('#bankaBilgilerTable').DataTable({
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
                            data: kurumIdariServiceModel.kurumBankaListesi,
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
                        kurumIdariServiceModel.kurumKisiLisansBilgileriTable = $('#kurumKisiLisansBilgileriTable').DataTable({
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
                            data: kurumIdariServiceModel.kurumKisiLisansListesi,
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
                        //$('#KurumResimUrl').attr("src", result.value.kurumResimUrl == null ? "" : coreUrl + result.value.kurumResimUrl);
                        $("#kurumAdi").html(result.value.kurumAdi == null ? "" : result.value.kurumAdi);
                        $("#epostaAdresi").html(result.value.epostaAdresi == null ? "" : result.value.epostaAdresi);
                        $("#faxNo").html(result.value.faxNo == null ? "" : result.value.faxNo);
                        $("#ticaretSicilNo").html(result.value.ticaretSicilNo == null ? "" : result.value.ticaretSicilNo);
                        $("#vergiNo").html(result.value.vergiNo == null ? "" : result.value.vergiNo);
                        //result.value.kurumLisansListesi.forEach(function (val) {
                        //    var adresHtml = KurumLisansTekrarDiv
                        //        .replace("{name}", val.name == null || undefined ? "" : val.name)
                        //        .replace("{sonKullanimTarihi}", val.sonKullanimTarihi == null || undefined ? "" : CsharpDateToStringDateyyyymmddForProfile(val.sonKullanimTarihi))
                        //        .replace("{lisansKisiSayisi}", val.lisansKisiSayisi == null || undefined ? "" : val.lisansKisiSayisi);
                        //    $("#KurumLisansTekrarliAlan").append(adresHtml)
                        //});
                        //result.value.kurumKisiLisansListesi.forEach(function (val) {
                        //    var adresHtml = KurumLisansKisiTekrarDiv
                        //        .replace("{lisansAboneKisiAdi}", val.lisansAboneKisiAdi == null || undefined ? "" : val.lisansAboneKisiAdi)
                        //        .replace("{lisansAboneKisiMail}", val.lisansAboneKisiMail == null || undefined ? "" : val.lisansAboneKisiMail)
                        //        .replace("{name}", val.name == null || undefined ? "" : val.name)
                        //        .replace("{lisansAbonelikBaslangicTarihi}", val.lisansAbonelikBaslangicTarihi == null || undefined ? "" : CsharpDateToStringDateyyyymmddForProfile(val.lisansAbonelikBaslangicTarihi))
                        //        .replace("{lisansAbonelikBitisTarihi}", val.lisansAbonelikBitisTarihi == null || undefined ? "" : CsharpDateToStringDateyyyymmddForProfile(val.lisansAbonelikBitisTarihi))
                        //    $("#KurumKisiLisansTekrarliAlan").append(adresHtml)
                        //});
                        //result.value.kurumBankaListesi.forEach(function (val) {
                        //    var adresHtml = BankaIdariTekrarDiv
                        //        .replace("{iban}", val.iban == null || undefined ? "" : val.iban)
                        //        .replace("{hesapNo}", val.hesapNo == null || undefined ? "" : val.hesapNo)
                        //        .replace("{bankaId}", val.bankaAdi == null || undefined ? "" : val.bankaAdi)
                        //        .replace("{subeId}", val.subeAdi == null || undefined ? "" : val.subeAdi).replace(
                        //            "{subeId}",
                        //            val.subeAdi == null || undefined ? "" : val.subeAdi);
                        //    $("#BankaIdariTekrarliAlan").append(adresHtml);
                        //});
                    }
                }
            });
        };
    }
}
var id;
var kurumIdariServiceModel = new KurumIdariService();
$(document).ready(function () {
    kurumIdariServiceModel.loadIdariProfile();
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
