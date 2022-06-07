class IcerikKutuphanesiService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.icerikKutuphanesi = new IcerikKutuphanesiModel({
            TabloID: 0,
            IcerikBaslik: "",
            IcerikOzetMetni: "",
            IcerikTaslakMi: null,
            IcerikYayinlanmaZamani: null,
            IcerikBitisZamani: null,
            IcerikTamMetin: ""
        });
        this.icerikMedya = new IcerikMedyaModel({
            TabloID: 0,
            Url: ""
        });
        this.data = new IcerikHedefKitleModel({
            TabloID: 0,
            IcerikBaslik: "",
            IcerikOzetMetni: "",
            IcerikTaslakMi: null,
            IcerikYayinlanmaZamani: null,
            IcerikBitisZamani: null,
            IcerikTamMetin: "",
            HedefIds: [],
            KisiIds: [],
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/announcementgeneral"));
    }
    drawDataTable() {
        $("#IcerikListesiTable").DataTable().destroy();
        icerikKutuphanesiService.icerikDataTable = $('#IcerikListesiTable').DataTable({
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
    drawDataTableViewList() {
        $("#IcerikListesiViewTable").DataTable().destroy();
        icerikKutuphanesiService.goruntuleyenTable = $('#IcerikListesiViewTable').DataTable({
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
    SaveIcerik() {
        if (icerikKutuphanesiService.data.get("IcerikTaslakMi") == null) {
            icerikKutuphanesiService.data.set("IcerikTaslakMi", false);
        }
        icerikKutuphanesiService.data.set("IcerikTamMetin", getDataFromCkEditorIcerik(customeditor));
        icerikKutuphanesiService.getSelectItems();
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/announcementgeneral/addorupdateannouncement";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            if (result.value) {
                alertim.toast(siteLang.Kaydet, "success", function () {
                    window.location.href = "/announcementgeneral/announcementlist";
                    icerikKutuphanesiService.clearIcerikData();
                });
            }
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        if (icerikKutuphanesiService.data.get("TabloID")) {
            conf.url = "/announcementgeneral/addorupdateannouncement";
            conf.success = function (result1) {
                alertim.toast(siteLang.Guncelle, "success", function () {
                    window.location.href = "/announcementgeneral/announcementlist";
                    icerikKutuphanesiService.clearIcerikData();
                });
            };
            conf.error = function (e) {
                errorHandler(e);
            };
        }
        this._repository.postData(JSON.stringify(icerikKutuphanesiService.data.toJSON()), conf);
    }
    GetIcerikData(id) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/announcementgeneral/getannouncement/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            icerikKutuphanesiService.data.set("TabloID", result.value.tabloID);
            icerikKutuphanesiService.data.set("IcerikBaslik", result.value.icerikBaslik);
            icerikKutuphanesiService.data.set("IcerikOzetMetni", result.value.icerikOzetMetni);
            icerikKutuphanesiService.data.set("IcerikTaslakMi", result.value.icerikTaslakMi);
            icerikKutuphanesiService.data.set("IcerikYayinlanmaZamani", result.value.icerikYayinlanmaZamani);
            icerikKutuphanesiService.data.set("IcerikBitisZamani", result.value.icerikBitisZamani);
            icerikKutuphanesiService.data.set("IcerikTamMetin", result.value.icerikTamMetin);
            icerikKutuphanesiService.data.set("HedefIds", result.value.hedefIds);
            icerikKutuphanesiService.data.set("KisiIds", result.value.kisiIds);
            setDataToCkEditorIcerik(customeditor, result.value.icerikTamMetin);
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
    }
    clearIcerikData() {
        icerikKutuphanesiService.data.set("TabloID", 0);
        icerikKutuphanesiService.data.set("IcerikBaslik", "");
        icerikKutuphanesiService.data.set("IcerikOzetMetni", "");
        icerikKutuphanesiService.data.set("IcerikTaslakMi", null);
        icerikKutuphanesiService.data.set("IcerikYayinlanmaZamani", null);
        icerikKutuphanesiService.data.set("IcerikBitisZamani", null);
        icerikKutuphanesiService.data.set("IcerikTamMetin", "");
        var kisiIds = [];
        var hedefIds = [];
        icerikKutuphanesiService.data.set("KisiIds", kisiIds);
        icerikKutuphanesiService.data.set("HedefIds", hedefIds);
    }
    IcerikList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/announcementgeneral/listannouncement";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var dataIc = [{
                        tabloID: 0,
                        icerikBaslik: "",
                        icerikYayinlanmaZamani: null,
                        icerikBitisZamani: null,
                        icerikTaslakMi: null
                    }];
                dataIc = result.value;
                icerikKutuphanesiService.icerikDataTable.clear().draw();
                for (var item of dataIc) {
                    icerikKutuphanesiService.icerikDataTable.row.add([
                        item.icerikBaslik,
                        moment(item.icerikYayinlanmaZamani).format('LLL'),
                        moment(item.icerikBitisZamani).format('LLL'),
                        item.icerikTaslakMi == true ? "<div class='icheck-success d-inline' > <input type='checkbox' id = 'checkboxSuccess1' checked disabled /><label for= 'checkboxSuccess1' > </label></div>" : "<div class='icheck-success d-inline' > <input type='checkbox' id = 'checkboxSuccess1' disabled /> <label for= 'checkboxSuccess1' > </label></div>",
                        "<button type='button' class='btn  btn-sm' onclick = 'goruntuleIcerik(" + item.tabloID.toString() + ")' >  <img src='/img/eye.svg'/></i></button >\
                        <button type='button' class='btn  btn-sm mx-1' onclick = 'toIcerikUpdate(" + item.tabloID.toString() + ")' >  <img src='/img/edit.svg'/>  </i></button >\
                        <button type='button' class='btn btn-sm' onclick = 'deleteIcerik(" + item.tabloID.toString() + ")' ><img src='/img/trash.svg'/> </i></button >\
                        <button type='button' class='btn btn-sm' onclick = 'toGoruntuleyenlerListesi(" + item.tabloID.toString() + ")' ><img src='/img/trending.svg'/> </i></button >"
                    ]).draw(true);
                }
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    DeleteIcerik(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/announcementgeneral/deleteannouncement/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                if (result.value) {
                    icerikKutuphanesiService.IcerikList();
                }
            };
            icerikKutuphanesiService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    goruntuleyenlerListesi(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Gorulme/GorulmeZamanlariListele/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var data = result.value;
                icerikKutuphanesiService.goruntuleyenTable.clear().draw();
                for (var item of data) {
                    icerikKutuphanesiService.goruntuleyenTable.row.add([
                        item.kisiAdSoyad,
                        moment(item.goruntulenmeZamani).format('LLL')
                    ]).
                        draw(true);
                }
            }
        };
        this._repository.getData(null, conf);
    }
    toUpdatePage(id) {
        window.location.href = "/announcementgeneral/announcementupdate/" + id;
    }
    GoruntuleIcerik(id) {
        window.location.href = "/announcementgeneral/announcementdetail/" + id;
    }
    toGoruntuleyenlerListesi(id) {
        window.location.href = "/announcementgeneral/announcementviewinglist/" + id;
    }
    toIcerikAddPage() {
        window.location.href = "/announcementgeneral/announcementadd";
    }
    initializeforSave() {
        icerikKutuphanesiService.drawDataTable();
        icerikKutuphanesiService.kisiListGetir(); //list
        icerikKutuphanesiService.HedefKitleGetir(); //list
        icerikKutuphanesiService.IcerikList(); //save & update
        kendo.bind($(".model-bind"), icerikKutuphanesiService);
    }
    initializeforUpdate() {
        var id = icerikKutuphanesiService.GetURLParameter();
        icerikKutuphanesiService.GetIcerikData(id.toString());
        icerikKutuphanesiService.kisiListGetir(); //list
        icerikKutuphanesiService.HedefKitleGetir(); //list
        kendo.bind($(".model-bind"), icerikKutuphanesiService);
    }
    initializeforDetail() {
        var id = icerikKutuphanesiService.GetURLParameter();
        GoruntulenmeKaydet(id);
        icerikKutuphanesiService.GetIcerikData(id.toString());
        kendo.bind($(".model-bind"), icerikKutuphanesiService);
    }
    initializeForList() {
        icerikKutuphanesiService.drawDataTable(); // list
        icerikKutuphanesiService.IcerikList(); //list
        kendo.bind($(".model-bind"), icerikKutuphanesiService);
    }
    initializeForViewList() {
        var id = icerikKutuphanesiService.GetURLParameter();
        icerikKutuphanesiService.drawDataTableViewList(); // list
        icerikKutuphanesiService.goruntuleyenlerListesi(id); //list
        kendo.bind($(".model-bind"), icerikKutuphanesiService);
    }
    //Tools.js tarafından geçici olarak alınan metotlar.
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
    kisiListGetir() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/Kisi/KisiListGetir";
        conf.success = function (result) {
            var selectData = [];
            if (result.value) {
                result.value.forEach(function (item) {
                    selectData.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi });
                });
                $("#kisilist").select2({ data: selectData });
                if (icerikKutuphanesiService.data.get("TabloID") > 0) {
                    $('#kisilist').val(icerikKutuphanesiService.data.get("KisiIds").toJSON()).trigger("change");
                }
                //if (icerikKutuphanesiService.data.get("KisiIds") !== undefined) {
                //    var tempList = [];
                //    result.value.forEach(function (item) {
                //        var kontrolList = [];
                //        kontrolList = icerikKutuphanesiService.kisiListesi.filter(a => a.tabloID == item.tabloID);
                //        if (kontrolList.length == 0) {
                //            tempList.push({ id: item.tabloID, text: item.kisiAdi + " " + item.kisiSoyadi })
                //        }
                //    });
                //    icerikKutuphanesiService.icerikdavetKisiListesi = tempList;
                //    $("#kisilist").empty();
                //    $("#kisilist").select2({ data: icerikKutuphanesiService.icerikdavetKisiListesi });
                //}
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    HedefKitleGetir() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/GetPersonTargetGroups";
        conf.async = false;
        conf.success = function (result) {
            var selectData = [];
            if (result.value) {
                result.value.forEach(function (item) {
                    selectData.push({ id: item.tabloID, text: item.tanim });
                });
                $("#hedeflist").select2({ data: selectData });
                if (icerikKutuphanesiService.data.get("TabloID") > 0) {
                    $('#hedeflist').val(icerikKutuphanesiService.data.get("HedefIds").toJSON()).trigger("change");
                }
                //if (icerikKutuphanesiService.data.get("HedefIds") !== undefined) {
                //    var tempList = [];
                //    result.value.forEach(function (item) {
                //        var kontrolList = [];
                //        kontrolList = icerikKutuphanesiService.hedefkitleler.filter(a => a.tabloID == item.tabloID);
                //        if (kontrolList.length == 0) {
                //            tempList.push({ id: item.tabloID, text: item.tanim })
                //        }
                //    });
                //    icerikKutuphanesiService.icerikdavetKisiListesi = tempList;
                //    $("#hedeflist").empty();
                //    $("#hedeflist").select2({ data: icerikKutuphanesiService.icerikdavetHedefListesi });
                //}
            }
        };
        this._repository.getData(null, conf);
    }
    getSelectItems() {
        var kisilerSelected = $('#kisilist').select2('data');
        var hedefKitleSelected = $('#hedeflist').select2('data');
        var kisiIds = [];
        var hedefIds = [];
        for (var i = 0; i < hedefKitleSelected.length; i++) {
            var Id = kendo.parseInt(hedefKitleSelected[i].id);
            hedefIds.push(Id);
        }
        for (var i = 0; i < kisilerSelected.length; i++) {
            var Id = kendo.parseInt(kisilerSelected[i].id);
            kisiIds.push(Id);
        }
        icerikKutuphanesiService.data.set("KisiIds", kisiIds);
        icerikKutuphanesiService.data.set("HedefIds", hedefIds);
        return true;
    }
    UploadFile(e) {
        var formData = new FormData();
        var elem = $(e)[0];
        var file = elem.files[0];
        formData.append("file", file);
        $.ajax({
            url: "/panel/resimyukle/",
            processData: false,
            contentType: false,
            type: "POST",
            data: formData,
            async: false,
            success: function (result) {
                if (result.isSuccess) {
                    //icerikKutuphanesiService.icerikMedya.set("Url", $("#site-urlMedya").val() + result.value.medyaUrl);
                    //copyTextToClipboard($("#site-urlMedya").val() + result.value.medyaUrl);
                    $("#dosyaUyari1").hide();
                    $("#dosyaUyari").show();
                    setTimeout(function () {
                        $("#dosyaUyari").hide();
                        $("#dosyaUyari1").show();
                    }, 2500);
                }
                else {
                    alertim.toast(siteLang.Hata, "error");
                }
            },
            error: function (e) {
                alertim.toast(siteLang.Hata, "error");
            }
        });
    }
}
var icerikKutuphanesiService = new IcerikKutuphanesiService();
var errorHandler;
var alertim;
function getDataFromCkEditorIcerik(editor) {
    return editor.getData();
}
function setDataToCkEditorIcerik(editor, data) {
    editor.setData(data.toString());
}
function GoruntulenmeKaydet(id) {
    var gorulmeModel = {
        IcerikKutuphanesiID: id,
        GoruntuleyenKisiId: 0,
        GoruntulenmeZamani: "",
        TabloID: 0
    };
    $.ajax({
        type: "POST",
        data: gorulmeModel,
        url: "/Gorulme/GorulmeZamaniKaydet",
        success: function (r) {
            console.log("Güruldü Atıldı.");
        },
        error: function (e) {
            console.log(e);
        }, //success: function (result) {
    });
}
function deleteIcerik(id) {
    icerikKutuphanesiService.DeleteIcerik(id);
}
function toIcerikUpdate(id) {
    icerikKutuphanesiService.toUpdatePage(id);
}
function toGoruntuleyenlerListesi(id) {
    icerikKutuphanesiService.toGoruntuleyenlerListesi(id);
}
function goruntuleIcerik(id) {
    icerikKutuphanesiService.GoruntuleIcerik(id);
}
$(document).ready(function () {
});
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    }
    catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}
