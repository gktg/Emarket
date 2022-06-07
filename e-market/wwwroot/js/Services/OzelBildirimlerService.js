/// <reference path="../model/DropDownModel.ts" />
/// <reference path="../model/ozelbildirimmodel.ts" />
class OzelBildirimlerService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new OzelBildirimModel({
            BildirimGonderilecekKisiList: [],
            BildirimZamani: null,
            BildirimMetni: "",
            BildirimEpostaYollayacakMi: false,
            BildirimSmsYollayacakMi: false
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/notificationsetting"));
    }
    save() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/notificationsetting/AddRange";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            alertim.toast(siteLang.Kaydet, "success", function () {
                clearValues();
                window.location.href = "/notificationsetting/SpecificNotificationList";
            });
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(ozelBildirimlerService.data.toJSON()), conf);
    }
    SecilenKisiEkle(id) {
        var list = [];
        list = ozelBildirimlerService.data.get("BildirimGonderilecekKisiList");
        if ($.inArray(id, list) < 0) {
            list.push(id);
            ozelBildirimlerService.data.set("BildirimGonderilecekKisiList", list);
        }
    }
    SecilenKisiSil(id) {
        var list = ozelBildirimlerService.data.get("BildirimGonderilecekKisiList");
        var newList = $.grep(list, function (n, i) {
            return (n !== id);
        });
        ozelBildirimlerService.data.set("BildirimGonderilecekKisiList", newList);
        console.log(list);
        console.log(newList);
    }
    GetDropdownDatas() {
        ozelBildirimlerService.GetTanimlar();
        ozelBildirimlerService.GetRoller();
        ozelBildirimlerService.GetPozisyonlar();
        ozelBildirimlerService.GetKurumlar();
    }
    GetTanimlar() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/GetPersonTargetGroups";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                ozelBildirimlerService.hedefkitleler = result.value;
            }
        };
        this._repository.getData(null, conf);
    }
    GetRoller() {
        var obj = [];
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/panel/GetKurumBirimList/3";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    obj.push({ tanim: item.tanim, tabloID: item.tabloId });
                });
                ozelBildirimlerService.roller = obj;
            }
        };
        this._repository.getData(null, conf);
    }
    GetPozisyonlar() {
        var obj = [];
        var conf = AjaxConfiguration.postDefault();
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    obj.push({ tanim: item.tanim, tabloID: item.tabloId });
                });
                ozelBildirimlerService.pozisyonlar = obj;
            }
        };
        conf.url = "/panel/GetKurumBirimList/2";
        this._repository.getData(null, conf);
    }
    GetKurumlar() {
        var obj = [];
        var conf = AjaxConfiguration.postDefault();
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    obj.push({ tanim: item.kurumTicariUnvani, tabloID: item.tabloID });
                });
                ozelBildirimlerService.kurumlar = obj;
            }
        };
        conf.url = "/panel/ListKendisiIle";
        this._repository.getData(null, conf);
    }
    HedefKitleler() {
        $('.secimDiv').hide();
        $("#hedef-kisiler").select2({ placeholder: "Seçiniz" });
        $('#hedefkitleDiv').show();
    }
    Pozisyonlar() {
        $('.secimDiv').hide();
        $("#pozisyon-kisiler").select2({ placeholder: "Seçiniz" });
        $('#pozisyonDiv').show();
    }
    Roller() {
        $('.secimDiv').hide();
        $("#rol-kisiler").select2({ placeholder: "Seçiniz" });
        $('#rolDiv').show();
    }
    SirketKisileri() {
        $('.secimDiv').hide();
        $("#kurum-kisiler").select2({ placeholder: "Seçiniz" });
        $('#sirketDiv').show();
    }
    getHedefKitleUsers() {
        var kisiList = [];
        var id = ozelBildirimlerService.hedefKitleId;
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/TargetGroupMembersListByGroupId/" + id;
        conf.async = false;
        conf.success = function (result) {
            if (!result) {
                alertim.toast(siteLang.Hata, "error");
            }
            if (result.value) {
                for (var item of result.value) {
                    kisiList.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi });
                }
            }
            else {
                alertim.toast(siteLang.Hata, "error");
            }
        };
        conf.error = function (err) {
            console.log(err);
            alertim.toast(siteLang.Hata, "error");
        };
        ozelBildirimlerService._repository.getData(null, conf);
        $('#hedef-kisiler').val(null).trigger("change");
        $("#hedef-kisiler").html("");
        $("#hedef-kisiler").select2({ placeholder: "Seçiniz", data: kisiList });
    }
    getPozisyonUsers() {
        var kisiList = [];
        var id = [(ozelBildirimlerService.pozisyonId.tabloID).toString()];
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Panel/ListKurumOrganizasyonIdileKisiListele";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    kisiList.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi });
                }
            }
            else {
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.postData(JSON.stringify(id), conf);
        $("#pozisyon-kisiler").select2("destroy");
        $("#pozisyon-kisiler").empty();
        $("#pozisyon-kisiler").select2({ placeholder: "Seçiniz", data: kisiList });
    }
    getRolUsers() {
        var kisiList = [];
        var id = [(ozelBildirimlerService.rolId.tabloID).toString()];
        var conf = AjaxConfiguration.postDefault(); // < === if this place is out of control !!
        conf.url = "/Panel/ListKurumOrganizasyonIdileKisiListele";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    kisiList.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi });
                }
            }
            else {
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.postData(JSON.stringify(id), conf);
        $("#rol-kisiler").select2("destroy");
        $("#rol-kisiler").empty();
        $("#rol-kisiler").select2({ placeholder: "Seçiniz", data: kisiList });
    }
    getKurumUsers() {
        var kisiList = [];
        var id = ozelBildirimlerService.kurumId;
        var conf = AjaxConfiguration.postDefault();
        conf.type = AjaxType.GET;
        conf.url = "/kisi/KurumaBagliKisiListGetirById/" + id;
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                for (var item of result.value) {
                    kisiList.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi });
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
        $("#kurum-kisiler").select2("destroy");
        $("#kurum-kisiler").empty();
        $("#kurum-kisiler").select2({ placeholder: "Seçiniz", data: kisiList });
    }
    SpecNotList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/notificationsetting/specNotList";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var data2 = [{
                        tabloID: 0,
                        gonKisiAdi: "",
                        gondKisiAdi: "",
                        gonderimZamani: null,
                        gondMetni: ""
                    }];
                data2 = result.value;
                ozelBildirimlerService.specNotDataTable.clear().draw();
                for (var item of data2) {
                    if (new Date(item.gonderimZamani) < new Date()) {
                        ozelBildirimlerService.specNotDataTable.row.add([
                            item.gonKisiAdi,
                            item.gondKisiAdi,
                            moment(item.gonderimZamani).format('LLL'),
                            item.gondMetni,
                            "<button type='button' class = 'btn' disabled title='Tarihi geçmiş notlarla ilgili işlem yapamazsınız.'> <img src='/img/trash.svg'></button>"
                        ]).draw(true);
                    }
                    else {
                        ozelBildirimlerService.specNotDataTable.row.add([
                            item.gonKisiAdi,
                            item.gondKisiAdi,
                            moment(item.gonderimZamani).format('LLL'),
                            item.gondMetni,
                            "<button type='button' class = 'btn ' onclick = 'deleteSpecNot(\"" + item.tabloID.toString() + "\")'> <img src='/img/trash.svg'> </button>"
                        ]).draw(true);
                    }
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    toSpecNotAddPage() {
        window.location.href = "/notificationsetting/SpecificNotification/Add";
    }
    DeleteSpecNot(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/notificationsetting/specNotDelete/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    ozelBildirimlerService.SpecNotList();
                }
            };
            ozelBildirimlerService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    drawDataTable() {
        $("#SpecNotListTable").DataTable().destroy();
        ozelBildirimlerService.specNotDataTable = $('#SpecNotListTable').DataTable({
            "paging": true,
            "responsive": true,
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
            "dom": 'Bfrtip',
            "buttons": [
                {
                    "extend": 'excel',
                    "text": siteLang.ExceleAktar,
                    "className": "btn btn-success",
                    "exportOptions": {
                        "columns": ":not(:last-child)"
                    }
                }
            ]
        });
    }
    SecimTuru(id) {
        switch (id) {
            case "0":
                this.hidekisiler();
                break;
            case "1":
                this.HedefKitleler();
                $('#kisilerDiv').show();
                break;
            case "2":
                this.Pozisyonlar();
                $('#kisilerDiv').show();
                break;
            case "3":
                this.Roller();
                $('#kisilerDiv').show();
                break;
            case "4":
                this.SirketKisileri();
                $('#kisilerDiv').show();
                break;
            default:
        }
    }
    hidekisiler() {
        $('.secimDiv').hide();
        $('#kisilerDiv').hide();
    }
    InitializeForSave() {
        ozelBildirimlerService.GetDropdownDatas();
        $('#total-kisiler').select2();
        $(document).ready(function () {
            $('#secimTuru').on("change", function () { ozelBildirimlerService.SecimTuru(this.value); });
            $('.kisiList').on('select2:select', function (e) {
                var data = e["params"].data;
                var id = parseInt(data.id);
                ozelBildirimlerService.SecilenKisiEkle(id);
                ozelBildirimlerService.AddSelectedToThePool(data);
                console.log(data);
            });
            $('.kisiList').on('select2:unselect', function (e) {
                var data = e["params"].data;
                var id = parseInt(data.id);
                ozelBildirimlerService.SecilenKisiSil(id);
                $('.kisiList option[value="' + id + '"]').prop('selected', false).parent().trigger("change");
                $('#total-kisiler option[value="' + id + '"]').prop('selected', false).parent().trigger("change");
                $('#total-kisiler option[value="' + id + '"]').remove();
                console.log(data);
            });
            $('#kisiPool').find(".select2").addClass("w-100");
            $('#kisiPool span.select2-selection.select2-selection--multiple').attr("style", "height:100px;");
            $('#kisiPool').on('select2:opening', function (e) {
                e.preventDefault();
            });
        });
        kendo.bind($(".model-bind"), ozelBildirimlerService);
    }
    initializeForList() {
        ozelBildirimlerService.drawDataTable();
        ozelBildirimlerService.SpecNotList();
        kendo.bind($(".model-bind"), ozelBildirimlerService);
    }
    AddSelectedToThePool(data) {
        if ($('#total-kisiler').find("option[value='" + data.id + "']").length) {
            $('#total-kisiler option[value="' + data.id + '"]').prop('selected', true).parent().trigger("change");
        }
        else {
            var newOption = new Option(data.text, data.id, true, true);
            $('#total-kisiler').append(newOption).trigger('change');
        }
    }
}
var ozelBildirimlerService = new OzelBildirimlerService({});
var moment;
var alertim;
function clearValues() {
    $("#select-param-organizasyon-birimi").empty().trigger('change');
    $('#Tanim').val("");
    $("#kurum-kisiler").empty().trigger('change');
    $("#rol-kisiler").empty().trigger('change');
    $("#hedef-kisiler").empty().trigger('change');
    $("#pozisyon-kisiler").empty().trigger('change');
    $("#total-kisiler").empty().trigger('change');
    ozelBildirimlerService.data.set("BildirimGonderilecekKisiList", []);
    ozelBildirimlerService.data.set("BildirimZamani", null);
    ozelBildirimlerService.data.set("BildirimMetni", "");
    ozelBildirimlerService.data.set("BildirimEpostaYollayacakMi", false);
    ozelBildirimlerService.data.set("BildirimSmsYollayacakMi", false);
}
function deleteSpecNot(id) {
    ozelBildirimlerService.DeleteSpecNot(id);
}
