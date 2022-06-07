$(function () {
    getPlatformlar();
    getKurumlar();
    KurumSosyalMedyaHesapKaydet();
});
/*gloabal degiskenler starts from here*/
var SosyalMedyaKurumHesapModel = {};
/*gloabal degiskenler ends here*/

/*platformalari getriren fonk starts from here */
function getPlatformlar() {
    const dropdownHolder = $("#platformId");
    $.ajax({
        url: '/Cleopatra/PlatformlariGetir/',
        type: 'GET',
        contentType: "application/json",
        success: function (data) {
            dropdownHolder.find('option').remove();
            dropdownHolder.append(`<option selected value="0">Platform Seçiniz</option>`);
            $.each(data.value, function (index, platform) {
                dropdownHolder.append('<option value="' + platform.tabloID + '">' + platform.sosyalMedyaPlatformAdi + '</option>')

            })
        },

    });
};
/*platformalari getriren fonk  ends here */

/*kurumlari getriren fonk starts from here */
function getKurumlar() {
    const dropdownHolder = $("#kurumlarId");
    $.ajax({
        url: '/Cleopatra/KurumTemelBilgileriGetir/',
        type: 'GET',
        contentType: "application/json",
        success: function (data) {
            dropdownHolder.find('option').remove();
            dropdownHolder.append(`<option selected value="0">Kurum Seçiniz</option>`);
            $.each(data.value, function (index, kurum) {
                dropdownHolder.append('<option value="' + kurum.tabloID + '">' + kurum.kurumKisaUnvan + '</option>')

            })

        },
    });
};
/*kurumlari getriren fonk  ends here */

/*btnKaydet starts from here*/
function KurumSosyalMedyaHesapKaydet() {
    $(document).on('click', '#btnKaydet', function (event) {
        alert("sa");
        event.preventDefault();
        SosyalMedyaKurumHesapModel["IlgiliKurumID"] = $("#kurumlarId").val();
        SosyalMedyaKurumHesapModel["SosyalMedyaPlatformID"] = $("#platformId").val();
        SosyalMedyaKurumHesapModel["PlatformUrl"] = $("#hesapUrlId").val();
        SosyalMedyaKurumHesapModel["UserToken"] = $("#userTokenId").val();
        var model = SosyalMedyaKurumHesapModel;
        $.ajax({
            url: '/Cleopatra/SosyalMedyaKurumHesapEkle',
            type: 'POST',
            dataType: 'json',
            data:model,
            success: function (data) {
                alertim.toast("success!", "success");
            },
            error: function (data) {
                alertim.toast("error!", "warning");
            }
        });

    })
}
/*btnKaydet ends here here*/