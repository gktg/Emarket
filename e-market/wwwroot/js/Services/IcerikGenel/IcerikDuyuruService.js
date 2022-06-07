class IcerikDuyuruService extends kendo.data.ObservableObject {
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
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/announcementgeneral"));
    }
    GetIcerikData(id) {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/announcementgeneral/getannouncement/" + id;
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            icerikDuyuruService.icerikKutuphanesi.set("TabloID", result.value.tabloID);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikBaslik", result.value.icerikBaslik);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikOzetMetni", result.value.icerikOzetMetni);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikTaslakMi", result.value.icerikTaslakMi);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikYayinlanmaZamani", result.value.icerikYayinlanmaZamani);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikBitisZamani", result.value.icerikBitisZamani);
            icerikDuyuruService.icerikKutuphanesi.set("IcerikTamMetin", result.value.icerikTamMetin);
            setDataToCkEditorIcerik(customeditor, result.value.icerikTamMetin);
        };
        conf.error = function (e) {
            alertim.toast(siteLang.Hata, "error");
        };
        this._repository.getData(null, conf);
    }
    DuyuruOzelList() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/announcementgeneral/showannouncement";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                console.log(result.value);
                var dataIc = [{
                        tabloID: 0,
                        icerikBaslik: "",
                        icerikYayinlanmaZamani: null,
                        icerikBitisZamani: null,
                        icerikOzetMetni: ""
                    }];
                dataIc = result.value;
                var html = "";
                for (var i = 0; i < dataIc.length; i++) {
                    html += duyuruMesage(dataIc[i]);
                }
                $("#DuyuruList").html(html);
            }
        };
        conf.error = function (e) {
            console.log(e);
        };
        this._repository.getData(null, conf);
    }
    GoruntuleDuyuru(id) {
        window.location.href = "/announcementgeneral/announcementdetail/" + id;
    }
    initializeforDetail() {
        var id = icerikDuyuruService.GetURLParameter();
        icerikDuyuruService.GetIcerikData(id.toString());
        kendo.bind($(".model-bind"), icerikDuyuruService);
    }
    initializeForList() {
        icerikDuyuruService.DuyuruOzelList();
        kendo.bind($(".model-bind"), icerikDuyuruService);
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
}
var icerikDuyuruService = new IcerikDuyuruService();
var errorHandler;
var alertim;
function getDataFromCkEditorDuyuru(editor) {
    return editor.getData();
}
function setDataToCkEditorDuyuru(editor, data) {
    editor.setData(data.toString());
}
function Pretty(date) {
    try {
        var diff = (((new Date()).getTime() - date.getTime()) / 1000), day_diff = Math.floor(diff / 86400);
        var stringtime;
        if (isNaN(day_diff) || day_diff < 0)
            return stringtime;
        return day_diff == 0 &&
            (diff < 60 && "Şimdi" ||
                diff < 3600 && Math.floor(diff / 60) + " dakika önce" ||
                diff < 86400 && Math.floor(diff / 3600) + " saat önce") ||
            day_diff == 1 && "Dün" ||
            day_diff < 7 && day_diff + " gün önce" ||
            Math.ceil(day_diff / 7) + " hafta önce";
    }
    catch (e) {
        return "";
    }
}
function duyuruMesage(obj) {
    var date = new Date(obj.icerikYayinlanmaZamani);
    var s = Pretty(date);
    var m = `<a href="/announcementgeneral/announcementdetail/${obj.tabloID}" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start duyuru-list">
    <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1 text-center">${obj.icerikBaslik}</h5>
    <small>${s}</small>
    </div>
    <p class="mb-1">${obj.icerikOzetMetni}</p>
    </a>
`;
    return m;
}
