/// <reference path="../model/cografyalistviewmodel.ts" />
class CografyaService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.data = new CografyaListViewModel({
            CografyaTanim: "",
            CografyaAciklama: "",
            CografyaKutupanesiId: 0,
            SehirlerIDList: [],
            UlkeId: 0,
        });
        this.sehirlistesi = [];
        this.selectedSehirList = [];
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/Geography"));
    }
    drawCografyaListDataTable() {
        $("#CografyaList").DataTable().destroy();
        cografyaService.cografyaTable = $('#CografyaList').DataTable({
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
    drawSehirListDataTable() {
        $("#CografyaTanımlama").DataTable().destroy();
        cografyaService.sehirTable = $('#CografyaTanımlama').DataTable({
            "bLengthChange": false,
            "paging": true,
            "responsive": false,
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
            "buttons": []
        });
    }
    ;
    drawSeciliSehirlerDataTable() {
        $("#SeciliSehirler").DataTable().destroy();
        cografyaService.seciliSehirTable = $('#SeciliSehirler').DataTable({
            "pageLength": 5,
            "bLengthChange": false,
            "paging": true,
            "responsive": false,
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
            "buttons": []
        });
    }
    ;
    Ekle() {
        window.location.href = "/Geography/Definition";
    }
    saveCografya() {
        cografyaService.data.set("SehirlerIDList", cografyaService.selectedSehirList);
        if (cografyaService.selectedSehirList.length == 0) {
            alertim.toast(siteLang.Hata, "error");
            $('.sehirListLabelLabel').css('color', "red");
            $('.sehirlabel').css('color', "red");
            return;
        }
        $('.sehirListLabelLabel').css('color', "#212529");
        $('.sehirlabel').css('color', "#212529");
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Geography/Save";
        conf.dataType = "json";
        conf.async = false;
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success");
                location.href = "/Geography/List";
            }
            else {
                alertim.toast(siteLang.Hata, "error");
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(cografyaService.data.toJSON()), conf);
    }
    SehirList(id) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/panel/SehirList/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                cografyaService.sehirlistesi = result.value;
                cografyaService.listeguncelle();
            }
        };
        this._repository.getData(null, conf);
    }
    listeguncelle() {
        cografyaService.sehirTable.clear().draw();
        for (var i = 0; i < cografyaService.sehirlistesi.length; i++) {
            var checked = "";
            if (cografyaService.selectedSehirList.indexOf(cografyaService.sehirlistesi[i].tabloID) > -1) {
                checked = "checked";
            }
            cografyaService.sehirTable.row.add([
                cografyaService.sehirlistesi[i].paramTanim,
                "<div class='custom-control custom-checkbox'>\
                         <input " + checked + " class='custom-control-input sehirSecim' type='checkbox' id='sehirSelect-" + cografyaService.sehirlistesi[i].tabloID + "' value='" + cografyaService.sehirlistesi[i].tabloID + "' data-id='" + cografyaService.sehirlistesi[i].tabloID + "' onchange = 'selectSehirInCheckbox(" + cografyaService.sehirlistesi[i].tabloID + ")'><label for='sehirSelect-" + cografyaService.sehirlistesi[i].tabloID + "' class='custom-control-label'></label>\
                        </div>"
            ]).draw(true);
        }
    }
    //Seçili şehirleri datatable'a basma
    seciliSehirList() {
        cografyaService.seciliSehirTable.clear().draw();
        var data = [];
        data = cografyaService.selectedSehirList;
        var sehirler = [];
        for (var i = 0; i < data.length; i++) {
            sehirler.push({ id: cografyaService.sehirlistesi.filter(x => x.tabloID == data[i])[0].tabloID, text: cografyaService.sehirlistesi.filter(x => x.tabloID == data[i])[0].paramTanim });
        }
        for (var i = 0; i < sehirler.length; i++) {
            cografyaService.seciliSehirTable.row.add([
                sehirler[i].text,
                "<button type='button' class= 'close' aria-label='Close' onclick = 'sehirKaldır(\"" + sehirler[i].id + "\")' ><span aria-hidden='true'>&times;</span></button>"
            ]).draw(true);
        }
    }
    //Şehir seçme
    selectSehirInCheckbox(id) {
        if ($('#sehirSelect-' + id).is(":checked")) {
            cografyaService.selectedSehirList.push(id);
        }
        else {
            cografyaService.selectedSehirList.splice(cografyaService.selectedSehirList.indexOf(id), 1);
        }
        cografyaService.seciliSehirList();
    }
    //Dropdownlaruı basma
    readDropDownListData() {
        this.ulkelerList = [];
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/panel/UlkeList";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                result.value.forEach(function (item) {
                    cografyaService.ulkelerList.push({ tanim: item.paramTanim, tabloID: item.tabloID });
                });
            }
        };
        this._repository.getData(null, conf);
    }
    CografyaListesi() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Geography/ListForView";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                var data = [{
                        sehirIdList: [],
                        sehirSayisi: 0,
                        cografyaTanim: "",
                        cografyaAciklama: "",
                        cografyaKutupanesiId: 0,
                    }];
                //console.log(result.value);
                data = result.value;
                cografyaService.cografyaTable.clear().draw();
                for (var item of data) {
                    cografyaService.cografyaTable.row.add([
                        item.cografyaTanim,
                        item.cografyaAciklama,
                        item.sehirSayisi,
                        "<button type='button' class= 'btn  btn-sm mx-1' onclick = 'toCografyaUpdate(\"" + item.cografyaKutupanesiId + "\")' > <img src='/img/edit.svg'/> </button>\ <button type='button' class = 'btn btn-sm' onclick = 'deleteCografya(\"" + item.cografyaKutupanesiId + "\")'> <img src='/img/trash.svg'/>  </button>"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
        };
        this._repository.getData(null, conf);
    }
    DeleteCografya(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/Geography/Delete/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    alertim.toast(siteLang.Sil, "success", function () {
                        cografyaService.CografyaListesi();
                    });
                }
            };
            cografyaService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    LoadDataForUpdate(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Geography/Get/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            cografyaService.data.set("CografyaAciklama", result.value.cografyaAciklama);
            cografyaService.data.set("CografyaTanim", result.value.cografyaTanim);
            cografyaService.data.set("UlkeId", result.value.ulkeId);
            cografyaService.data.set("CografyaKutupanesiId", result.value.cografyaKutupanesiId);
            cografyaService.selectedSehirList = result.value.sehirlerIDList;
        };
        this._repository.getData(null, conf);
    }
    update() {
        cografyaService.data.set("SehirlerIDList", cografyaService.selectedSehirList);
        if (cografyaService.selectedSehirList.length == 0) {
            alertim.toast(siteLang.Hata, "error");
            $('.sehirListLabelLabel').css('color', "red");
            $('.sehirlabel').css('color', "red");
            return;
        }
        $('.sehirListLabelLabel').css('color', "#212529");
        $('.sehirlabel').css('color', "#212529");
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/Geography/UpdateForView";
        conf.dataType = "json";
        conf.async = false;
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Guncelle, "success", function () {
                    location.href = "/Geography/List";
                });
            }
            else {
                alertim.toast(siteLang.Hata, "error");
            }
        },
            conf.error = function (e) {
                errorHandler(e);
            };
        this._repository.postData(JSON.stringify(cografyaService.data.toJSON()), conf);
    }
    clearSelectList() {
        for (var id = 0; id <= cografyaService.selectedSehirList.length; id++) {
            cografyaService.selectedSehirList.splice(cografyaService.selectedSehirList.indexOf(id), 1);
            $('#sehirSelect-' + id).prop("checked", false);
        }
        cografyaService.SehirList(cografyaService.data.get("UlkeId"));
        cografyaService.selectedSehirList = [];
        cografyaService.seciliSehirList();
        cografyaService.listeguncelle();
    }
    SelectAllSehir() {
        cografyaService.selectedSehirList = [];
        for (var i = 0; i < cografyaService.sehirlistesi.length; i++) {
            $('#sehirSelect-' + cografyaService.sehirlistesi[i].tabloID).prop("checked", true);
            cografyaService.selectedSehirList.push(cografyaService.sehirlistesi[i].tabloID);
        }
        cografyaService.seciliSehirList();
        cografyaService.listeguncelle();
    }
    findPageInfo() {
        var info = $("#CografyaTanımlama").DataTable().page.info();
        cografyaService.pageinfo = info.page + 1;
    }
    sehirKaldır(id) {
        cografyaService.selectedSehirList.splice(cografyaService.selectedSehirList.indexOf(parseInt(id)), 1);
        $('#sehirSelect-' + id).prop("checked", false);
        cografyaService.seciliSehirList();
        cografyaService.findPageInfo();
        cografyaService.listeGuncelleVeSayfayaGit();
    }
    listeGuncelleVeSayfayaGit() {
        cografyaService.sehirTable.clear().draw();
        for (var i = 0; i < cografyaService.sehirlistesi.length; i++) {
            var checked = "";
            if (cografyaService.selectedSehirList.indexOf(cografyaService.sehirlistesi[i].tabloID) > -1) {
                checked = "checked";
            }
            cografyaService.sehirTable.row.add([
                cografyaService.sehirlistesi[i].paramTanim,
                "<div class='custom-control custom-checkbox'>\
                          <input " + checked + " class='custom-control-input sehirSecim' type='checkbox' id='sehirSelect-" + cografyaService.sehirlistesi[i].tabloID + "' value='" + cografyaService.sehirlistesi[i].tabloID + "' data-id='" + cografyaService.sehirlistesi[i].tabloID + "' onchange = 'selectSehirInCheckbox(" + cografyaService.sehirlistesi[i].tabloID + ")'><label for='sehirSelect-" + cografyaService.sehirlistesi[i].tabloID + "' class='custom-control-label'></label>\
                        </div>"
            ]).draw(true);
        }
        $("#CografyaTanımlama").dataTable().fnPageChange(cografyaService.pageinfo - 1, true);
    }
    GetURLParameter() {
        var sPageURL = window.location.href;
        var indexOfLastSlash = sPageURL.lastIndexOf("/");
        if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash) {
            if (sPageURL.substring(indexOfLastSlash + 1).length == 36) {
                return sPageURL.substring(indexOfLastSlash + 1);
            }
            return parseInt(sPageURL.substring(indexOfLastSlash + 1));
        }
        else
            return 0;
    }
    ToUpdatePage(id) {
        window.location.href = "/Geography/Update/" + id;
    }
    toGroupAddPage() {
        window.location.href = "/Geography/Definitions";
    }
    initializeforSave() {
        this.drawSehirListDataTable();
        this.readDropDownListData();
        cografyaService.drawSeciliSehirlerDataTable();
        cografyaService.SehirList();
        cografyaService.seciliSehirList();
        SelectUlke();
        kendo.bind($(".model-bind"), cografyaService);
    }
    initializeForList() {
        cografyaService.drawCografyaListDataTable();
        cografyaService.CografyaListesi();
        kendo.bind($(".model-bind"), cografyaService);
    }
    initializeforUpdate() {
        this.readDropDownListData();
        this.drawSehirListDataTable();
        cografyaService.drawSeciliSehirlerDataTable();
        var id = cografyaService.GetURLParameter();
        cografyaService.LoadDataForUpdate(id);
        cografyaService.SehirList(this.data.get("UlkeId"));
        cografyaService.seciliSehirList();
        SelectUlke();
        kendo.bind($(".model-bind"), cografyaService);
    }
}
var cografyaService = new CografyaService();
function SelectUlke() {
    $('#selectUlke').on('change', function () {
        if (this.value != 0) {
            cografyaService.SehirList(this.value);
            cografyaService.selectedSehirList = [];
            cografyaService.seciliSehirTable.clear().draw();
        }
    });
}
function deleteCografya(id) {
    cografyaService.DeleteCografya(id);
}
function toCografyaUpdate(id) {
    cografyaService.ToUpdatePage(id);
}
function selectSehirInCheckbox(id) {
    cografyaService.selectSehirInCheckbox(id);
}
function sehirKaldır(id) {
    cografyaService.sehirKaldır(id);
}
var errorHandler;
var alertim;
