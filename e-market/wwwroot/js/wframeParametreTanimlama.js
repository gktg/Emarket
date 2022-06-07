var ParamListForDDL = [];
$(document).ready(function () {
    jsGrid.locale("tr");
    var selectDil = [
        { id: 1, text: "Türkçe" },
        { id: 2, text: "İngilizce" }
    ];
    var selectData = [
        { id: 0, text: "Seçiniz" },
        { id: "ParamKurumTipleri", text: "ParamKurumTipleri" },
        { id: "ParamSubeTipleri", text: "ParamSubeTipleri" },
        { id: "ParamIstenCikarilmaNedenleri", text: "ParamIstenCikarilmaNedenleri" },
        { id: "ParamMedeniHal", text: "ParamMedeniHal" },
        { id: "ParamPersonelIKIslemKategorileri", text: "ParamPersonelIKIslemKategorileri" },
        { id: "ParamOrganizasyonBirimleri", text: "ParamOrganizasyonBirimleri" },
        { id: "ParamHizmetTipleri", text: "ParamHizmetTipleri" },
        { id: "ParamDiller", text: "ParamDiller" },
        { id: "ParamCinsiyet", text: "ParamCinsiyet" },
        { id: "ParamOkulTipi", text: "ParamOkulTipi" },
        { id: "ParamStudyoAtamasiGenelSurecleri", text: "ParamStudyoAtamasiGenelSurecleri" },
        { id: "ParamStudyoAtamasiOnayStatuleri", text: "ParamStudyoAtamasiOnayStatuleri" },
        { id: "ParamAtamaGidisatSurecleri", text: "ParamAtamaGidisatSurecleri" },
        { id: "ParamAracTipleri", text: "ParamAracTipleri" },
        { id: "ParamAracMarkalari", text: "ParamAracMarkalari" },
        { id: "ParamAracModelleri", text: "ParamAracModelleri" },
        { id: "ParamSosyalMedyaTipleri", text: "ParamSosyalMedyaTipleri" },
        { id: "ParamBelgeTipleri", text: "ParamBelgeTipleri" },
        { id: "ParamBirimler", text: "ParamBirimler" },
        { id: "ParamTakvimKayitTipleri", text: "ParamTakvimKayitTipleri" },
        { id: "ParamOteller", text: "ParamOteller" },
        { id: "ParamVucutBolgeleri", text: "ParamVucutBolgeleri" },
        { id: "ParamMusteriVazgecmeSebepleri", text: "ParamMusteriVazgecmeSebepleri" },
        { id: "ParamTahsilatYollari", text: "ParamTahsilatYollari" },
        { id: "ParamAtamaIptalTalebiOnaySebepleri", text: "ParamAtamaIptalTalebiOnaySebepleri" },
        { id: "ParamAtamaIptalTalebiSebepleri", text: "ParamAtamaIptalTalebiSebepleri" },
        { id: "ParamIsStatuleri", text: "ParamIsStatuleri" },
        { id: "ParamNotlamaTipleri", text: "ParamNotlamaTipleri" },
        { id: "ParamHakedisler", text: "ParamHakedisler" },
        { id: "ParamCezaKategorisiTipleri", text: "ParamCezaKategorisiTipleri" },
        { id: "ParamIsSikayetGerekceleri", text: "ParamIsSikayetGerekceleri" },
        { id: "ParamIsSikayetDegerlendirmeStatuleri", text: "ParamIsSikayetDegerlendirmeStatuleri" },
        { id: "ParamEgitimKategorileri", text: "ParamEgitimKategorileri" },
        { id: "ParamEgitimler", text: "ParamEgitimler" },
        { id: "ParamAdayDegerlendirmeHavuzu", text: "ParamAdayDegerlendirmeHavuzu" },
        { id: "ParamGorusmeBasariKategorileri", text: "ParamGorusmeBasariKategorileri" },
        { id: "ParamOnayTurleri", text: "ParamOnayTurleri" },
        { id: "ParamTakvimOzelGunTipleri", text: "ParamTakvimOzelGunTipleri" },
        { id: "ParamSatisOlasilikKategorileri", text: "ParamSatisOlasilikKategorileri" },
        { id: "ParamOlasiSatisGerceklesmeZamanDilimleri", text: "ParamOlasiSatisGerceklesmeZamanDilimleri" },
        { id: "ParamIptalGerekceleri", text: "ParamIptalGerekceleri" },
        { id: "ParamIletisimKanalTipleri", text: "ParamIletisimKanalTipleri" },
        { id: "ParamAdresTipi", text: "ParamAdresTipi" },



        //{ id: "ParamAdresTipi", text: "ParamAdresTipi" },
        //{ id: "ParamAdresTipleri", text: "ParamAdresTipleri" },
        //{ id: "ParamBankalar", text: "ParamBankalar" },
        //{ id: "ParamBelgeler", text: "ParamBelgeler" },
        //{ id: "ParamCalisanSayilari", text: "ParamCalisanSayilari" },
        //{ id: "ParamDilSeviyesi", text: "ParamDilSeviyesi" },
        //{ id: "ParamDinler", text: "ParamDinler" },
        //{ id: "ParamDisSistemTokenTipleri", text: "ParamDisSistemTokenTipleri" },
        //{ id: "ParamEkonomikFaaliyetSektorleri", text: "ParamEkonomikFaaliyetSektorleri" },
        //{ id: "ParamEtiketler", text: "ParamEtiketler" },
        //{ id: "ParamFaaiyetKategorileri", text: "ParamFaaiyetKategorileri" },
        //{ id: "ParamFaaliyetAlanlari", text: "ParamFaaliyetAlanlari" },

        //{ id: "ParamHesapDeAktifEtmeSebebleriKisisel", text: "ParamHesapDeAktifEtmeSebebleriKisisel" },
        //{ id: "ParamHesapDeAktifEtmeSebepleriKurumsal", text: "ParamHesapDeAktifEtmeSebepleriKurumsal" },
        //{ id: "ParamHizmetKategorileri", text: "ParamHizmetKategorileri" },
        //{ id: "ParamIcerikKategorileri", text: "ParamIcerikKategorileri" },
        //{ id: "ParamIcerikSablonTipleri", text: "ParamIcerikSablonTipleri" },
        //{ id: "ParamIcerikTipleri", text: "ParamIcerikTipleri" },
        //{ id: "ParamIliskiTurleri", text: "ParamIliskiTurleri" },
        //{ id: "ParamKimlikTipleri", text: "ParamKimlikTipleri" },
        //{ id: "ParamKisiUyelikOnaylanmaStatu", text: "ParamKisiUyelikOnaylanmaStatu" },
        //{ id: "ParamKureselParametreler", text: "ParamKureselParametreler" },
        //{ id: "ParamKurumBelgeTipleri", text: "ParamKurumBelgeTipleri" },
        //{ id: "ParamKurumCalisanSayilari", text: "ParamKurumCalisanSayilari" },
        //{ id: "ParamKurumCiroBaremleri", text: "ParamKurumCiroBaremleri" },
        //{ id: "ParamKurumLokasyonTipi", text: "ParamKurumLokasyonTipi" },
        //{ id: "ParamKurumSektorleri", text: "ParamKurumSektorleri" },
        //{ id: "ParamKurumUyelikTipleri", text: "ParamKurumUyelikTipleri" },
        //{ id: "ParamKurumYetenekleri", text: "ParamKurumYetenekleri" },
        //{ id: "ParamLisansVektorTipleri", text: "ParamLisansVektorTipleri" },
        //{ id: "ParamLogHataKayitTipleri", text: "ParamLogHataKayitTipleri" },
        //{ id: "ParamLokasyonTipleri", text: "ParamLokasyonTipleri" },
        //{ id: "ParamMedyaTipleri", text: "ParamMedyaTipleri" },
        //{ id: "ParamMeslekler", text: "ParamMeslekler" },
        //{ id: "ParamMetaEtiketler", text: "ParamMetaEtiketler" },
        //{ id: "ParamMolaTipleri", text: "ParamMolaTipleri" },
        //{ id: "ParamOlcumBirimleri", text: "ParamOlcumBirimleri" },
        //{ id: "ParamParaBirimleri", text: "ParamParaBirimleri" },
        //{ id: "ParamPersonelGorevleri", text: "ParamPersonelGorevleri" },
        //{ id: "ParamPostaciIslemDurumTipleri", text: "ParamPostaciIslemDurumTipleri" },
        //{ id: "ParamProjeAktiviteCiktiGerceklesenIslemStatuleri", text: "ParamProjeAktiviteCiktiGerceklesenIslemStatuleri" },
        //{ id: "ParamProjeAktiviteCiktiIslemDurumuGerekceleri", text: "ParamProjeAktiviteCiktiIslemDurumuGerekceleri" },
        //{ id: "ParamProjeAktivitelerIslemDurumlariGerekceler", text: "ParamProjeAktivitelerIslemDurumlariGerekceler" },
        //{ id: "ParamProjeAktivitelerIslemStatuleri", text: "ParamProjeAktivitelerIslemStatuleri" },
        //{ id: "ParamProjeButceBaremleri", text: "ParamProjeButceBaremleri" },
        //{ id: "ParamProjeErisimRolleri", text: "ParamProjeErisimRolleri" },
        //{ id: "ParamProjeTamamlanmaStatuleri", text: "ParamProjeTamamlanmaStatuleri" },
        //{ id: "ParamSaatDilimleri", text: "ParamSaatDilimleri" },
        //{ id: "ParamSanalPOSDurumStatuleri", text: "ParamSanalPOSDurumStatuleri" },
        //{ id: "ParamSanalPosNoktalari", text: "ParamSanalPosNoktalari" },
        //{ id: "ParamSanalPosServisleri", text: "ParamSanalPosServisleri" },
        //{ id: "ParamSertifikalar", text: "ParamSertifikalar" },
        //{ id: "ParamSirketTicariTurleri", text: "ParamSirketTicariTurleri" },
        //{ id: "ParamSistemFormParametreleri", text: "ParamSistemFormParametreleri" },
        //{ id: "ParamSistemKisiEtkilesimTipleri", text: "ParamSistemKisiEtkilesimTipleri" },
        //{ id: "ParamSistemKullanimRolleri", text: "ParamSistemKullanimRolleri" },
        //{ id: "ParamSistemModulleri", text: "ParamSistemModulleri" },
        //{ id: "ParamSosyalMedyaPlatformlari", text: "ParamSosyalMedyaPlatformlari" },

        //{ id: "ParamTakipListesiKategorileri", text: "ParamTakipListesiKategorileri" },
        //{ id: "ParamTakipListesiTipleri", text: "ParamTakipListesiTipleri" },
        //{ id: "ParamTarayiciTipleri", text: "ParamTarayiciTipleri" },
        //{ id: "ParamTeklifDegerlendirmeIslemDurumuGerekceler", text: "ParamTeklifDegerlendirmeIslemDurumuGerekceler" },
        //{ id: "ParamTeklifIslemDurumlari", text: "ParamTeklifIslemDurumlari" },
        //{ id: "ParamTekrarlamaPeriyodlari", text: "ParamTekrarlamaPeriyodlari" },
        //{ id: "ParamTelefonTipi", text: "ParamTelefonTipi" },
        //{ id: "ParamUlkeler", text: "ParamUlkeler" },
        //{ id: "ParamUyelikBelgeleriOnaylamaStatu", text: "ParamUyelikBelgeleriOnaylamaStatu" },
        //{ id: "ParamVergiDaireleri", text: "ParamVergiDaireleri" },
        //{ id: "ParamYabanciDiller", text: "ParamYabanciDiller" },
        //{ id: "ParamYetenekler", text: "ParamYetenekler" },
        //{ id: "ParamYorumIslemlerGerekceler", text: "ParamYorumIslemlerGerekceler" },
        //{ id: "ParamYorumIslemStatusu", text: "ParamYorumIslemStatusu" },
        //{ id: "ParamZamanBirimleri", text: "ParamZamanBirimleri" },
        //{ id: "ParamZamanDilimleri", text: "ParamZamanDilimleri" },
    ];
    $("#drdParametreTipi").select2({ data: selectData })
    $("#drdParametreTipi").on('select2:select', function (e) {
        var data = e.params.data;
        if (data.id !== "Seçiniz") {
            readGrid();
        }
    });

    function readGrid() {
        $(".validationMessage").hide();
        var data = {
            ModelName: $("#drdParametreTipi").select2().find(":selected")[0].value,
            UstId: 0,
            KurumId: 0,
            TabloID: 0,
            Tanim: "test",
            ParamKod: "",
            DilID: 0,
            EsDilID: 0
        }
        $.ajax({
            data: data,
            url: "/panel/param/listparam",
            type: "POST",
            dataType: "json",
            success: function (result) {
                if (result.value) {
                    var ustData = result.value.slice();
                    ustData.splice(0, 0, { tanim: "", paramKod: "", tabloID: 0 });
                    $("#jsGrid").jsGrid({
                        width: "100%",
                        height: "auto",
                        inserting: true,
                        editing: true,
                        sorting: true,
                        onItemEditing: function (args) {
                            // var str = ".jsgrid-edit-row > td > select> option[value=" + args.item.tabloID + "]";
                            //setTimeout(function () {
                            //   $(str).remove();
                            //},500)
                        },
                        //onItemDeleted: function (args) {
                        //    args.item["modelName"] = $("#drdParametreTipi").select2().find(":selected")[0].value;
                        //    $.ajax({
                        //        data: args.item,
                        //        url: "/panel/param/delete",
                        //        type: "POST",
                        //        dataType: "json",
                        //        success: function () {
                        //            readGrid();
                        //        }
                        //    })
                        //},
                        onItemUpdated: function (args) {
                            args.item["modelName"] = $("#drdParametreTipi").select2().find(":selected")[0].value;
                            $.ajax({
                                data: args.item,
                                url: "/panel/param/update",
                                type: "POST",
                                dataType: "json",
                                success: function () {
                                    readGrid();
                                },
                                error: function (e) {
                                    errorHandler(e);
                                    readGrid();
                                }
                            })
                        },
                        onItemInserted: function (args) {
                            args.item["modelName"] = $("#drdParametreTipi").select2().find(":selected")[0].value;
                            args.item["tabloID"] = 0;
                            if (!args.item["esDilID"] || args.item["esDilID"] === undefined || !(args.item["esDilID"] > 0)) {
                                args.item["esDilID"] = 0;
                            }
                            $.ajax({
                                data: args.item,
                                url: "/panel/param/add",
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    if (data.isSuccess) {
                                        readGrid();
                                    } else {
                                        alertim.toast(siteLang.Hata, alertim.types.danger);
                                    }
                                },
                                error: function (e) {
                                    readGrid();
                                    errorHandler(e);
                                    alertim.toast(siteLang.Hata, alertim.types.danger);
                                }
                            })
                        },
                        confirmDeleting: false,
                        onItemDeleting: function (args) {
                            if (!args.item.deleteConfirmed) { // custom property for confirmation
                                args.cancel = true; // cancel deleting
                                alertim.confirm(siteLang.SilOnay, "info",
                                    function () {
                                        args.item["modelName"] = $("#drdParametreTipi").select2().find(":selected")[0].value;
                                        $.ajax({
                                            data: args.item,
                                            url: "/panel/param/delete",
                                            type: "POST",
                                            dataType: "json",
                                            success: function () {
                                                readGrid();
                                            }
                                        })
                                    }
                                );
                            }
                        },
                        data: result.value,
                        fields: [
                            { name: "tabloID", title: siteLang.KayitNo, type: "hidden", width: 50 },
                            { name: "dilID", title: siteLang.ParametreDili, type: "select", items: selectDil, valueField: "id", textField: "text" },
                            { name: "tanim", title: siteLang.Tanım + "*", type: "text", width: 150 },
                            { name: "paramKod", title: siteLang.Kod, type: "text", width: 150 },
                            { name: "esDilID", title: siteLang.FarkliDil, type: "select", items: ustData, valueField: "esDilID", textField: "tanim" },
                            { name: "ustId", title: siteLang.BaglıOlduğuParametre, type: "select", items: ustData, valueField: "tabloID", textField: "tanim" },
                            { type: "control" }
                        ]
                    });
                }
            }
        })
    }
});