var sehirIdList;
var ulkeId;
var bolgeAdi;
var bolgeTanimlamaVM = {};
var SehirlerList = [];
var UlkeModel = {};
$(function () {
    UlkeGetir();
    $('#Sehir_').on('change', function () {
        sehirIdList=$('#Sehir_').val().map(Number);

        SehirlerList = [];
        for (var i = 0; i < sehirIdList.length; i++) {

            SehirlerList.push({ 'TabloID': sehirIdList[i], 'ParamTanim' : "s"});

        }
        bolgeTanimlamaVM['Sehirler'] = SehirlerList;
    })

    $('#Ulke_').on('change', function () {
        UlkeModel = {};
        UlkeModel['TabloID'] = Number($('#Ulke_').val());
        UlkeModel['ParamTanim'] = "s";
        bolgeTanimlamaVM['Ulkeler'] = UlkeModel;
    })

    $('#txtBolgeAdi').on('change', function () {
        bolgeAdi = $('#txtBolgeAdi').val();
    })

    $('#btnBolgeKaydet').on('click', function () {
        bolgeTanimlamaVM['BolgeAdi'] = bolgeAdi;
        bolgeTanimlamaVM['Sehirler'] = SehirlerList;
        bolgeTanimlamaVM['Ulke'] = UlkeModel;
        Post("/Bolge/BolgeEkle", bolgeTanimlamaVM, function (gelen) {
            alert('eklendi');
        }, function (err) {
            console.log(err);
        }, false, false);

    })
})


