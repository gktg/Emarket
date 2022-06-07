class UyeService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/panel"));
    }
    drawDataTable() {
        $("#UyeListesiTable").DataTable().destroy();
        uyeService.dataTable = $('#UyeListesiTable').DataTable({
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
    List() {
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/UyeleriGetir/List";
        conf.type = AjaxType.GET;
        conf.success = function (result) {
            if (result.value) {
                var dataList = [];
                dataList = result.value;
                uyeService.dataTable.clear()
                    .draw();
                for (var data of dataList) {
                    uyeService.dataTable.row.add([
                        data.ad + " " + data.soyad,
                        data.eposta,
                        data.aktiflik,
                        CsharpDateToStringDateyyyymmddForProfile(data.uyeTarihi),
                        data.lisans,
                        data.freeMi,
                        data.odemeDurum,
                        data.kurumunLisansKisiSayisi
                    ]).draw(true);
                }
            }
        };
        this._repository.getData(null, conf);
    }
    CsharpDateToStringDateyyyymmddForProfile(stringDate) {
        try {
            var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
            var date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
            var yyyy = date.getFullYear();
            var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return dd + "." + mm + "." + yyyy; // yyyy + "-" + mm + "-" + dd;
        }
        catch (err) {
            return "";
        }
    }
    initalize() {
        uyeService.drawDataTable();
        uyeService.List();
        kendo.bind($(".servicebind"), uyeService);
    }
}
var uyeService = new UyeService();
//$(document).ready(function () {
//    UyeService.initalize();
//})
