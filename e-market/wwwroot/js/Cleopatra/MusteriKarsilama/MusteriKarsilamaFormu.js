$(function () {
    $("#vucutBolgeleri_").html($(VucutBolgeleriTekrarDiv));
    $(document).on('click', '.VucutBolgeleriAddButton', function () {


        $(document).find("[id^='vucutBolgeleri_']").each(function (i, e) {
            $(e).select2('destroy');
        });



        TekrarliAlanAddClickForAdres("Adres", $("[id^='vucutBolgeleriTekrar_']").last());

        $(".AdresRemoveButton").show();

        var $e1 = $(document).find("[id^='Ulke_']").last();


        $(document).find("[id^='vucutBolgeleri_']").each(function (i, e) {
            $(e).select2();
        });
    });
});

var VucutBolgeleriTekrarDiv = `  
                            <div class="row" id="vucutBolgeleriTekrar_1">
<select id="vucutBolgeleri_" class="form-control select2-primary" style="width: 100%;"multiple="multiple" disabled>
                                <option value="0">@localizator["Seçiniz"].Value</option>
                                <option value="1" selected="selected">Üst Kol</option>
                                <option value="2">Bilek</option>
                                <option value="3">Bacak</option>

                            </select>
 <button type='button' class='btn btn-xs VucutBolgeleriAddButton'>
                                    <i class='fas fa-plus'></i>"+ siteLang.AdresEkle + "\
                                </button> &nbsp\
                            </div>`;