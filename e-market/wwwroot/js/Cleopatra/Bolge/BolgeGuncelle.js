var sehirIdList;
var ulkeId;
var bolgeAdi;
var bolgeTanimlamaVM = {};
var SehirlerList = [];
var UlkeModel = {};
var bolgeTanimId;


$(function () {


    bolgeTanimId = GetURLParameter();


    $("#btnBolgeKaydet").html('Güncelle');


    UlkeGetir();
    Get('/Bolge/BolgeTanimiGetir/' + bolgeTanimId, function (data) {
        var dataValue = data.value;
        ulkeIdGelen = dataValue.ulke.tabloID;
        var sehirlerId = [];
        $.each(dataValue.sehirler, function (x, y) {
            sehirlerId.push(y.tabloID);
        })
        $('#Ulke_').val(ulkeIdGelen).change();
        $('#Sehir_').val(sehirlerId).change();


        $('#txtBolgeAdi').val(dataValue.bolgeAdi);
        SehirlerList = sehirlerId;
        bolgeAdi = dataValue.bolgeAdi;
        ulkeId = ulkeIdGelen;
    }, false, false);

    //bölgeye ait güncellemeden önce varolan bilgiler
    var bolgeninVarolanSehirIdleri = $('#Sehir_').val().map(Number);
    var bolgeninVarolanUlkeIdsi = Number($('#Ulke_').val());

    bolgeTanimlamaVM['BolgeninVarolanUlkeIdsi'] = bolgeninVarolanUlkeIdsi;
    bolgeTanimlamaVM['BolgeninVarolanSehirIdleri'] = bolgeninVarolanSehirIdleri;
    //bölgeye ait güncellemeden önce varolan bilgiler


    $('#btnBolgeKaydet').on('click', function () {

        //bölgeye ait ülkeyi al
        UlkeModel = {};
        UlkeModel['TabloID'] = Number($('#Ulke_').val());
        UlkeModel['ParamTanim'] = "s";
        bolgeTanimlamaVM['Ulkeler'] = UlkeModel;
        //Bölge adini al
        bolgeAdi = $('#txtBolgeAdi').val();
        //bölgeye ait şehirleri al
        UlkeModel = {};
        UlkeModel['TabloID'] = Number($('#Ulke_').val());
        UlkeModel['ParamTanim'] = "s";
        bolgeTanimlamaVM['Ulkeler'] = UlkeModel;
        sehirIdList = $('#Sehir_').val().map(Number);

        SehirlerList = [];
        for (var i = 0; i < sehirIdList.length; i++) {
            SehirlerList.push({ 'TabloID': sehirIdList[i], 'ParamTanim': "s" });

        }
        bolgeTanimlamaVM['Sehirler'] = SehirlerList;

        bolgeTanimlamaVM['BolgeAdi'] = bolgeAdi;
        bolgeTanimlamaVM['Sehirler'] = SehirlerList;
        bolgeTanimlamaVM['Ulke'] = UlkeModel;
        bolgeTanimlamaVM['BolgeTanimlariId'] = Number(bolgeTanimId);
        Post("/Bolge/BolgeGuncelle", bolgeTanimlamaVM, function (gelen) {

        }, function (err) {
            console.log(err);
        }, false, false);

    })


})

