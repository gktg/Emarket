class TargetGroupService extends kendo.data.ObservableObject {
    constructor(val) {
        super(val);
        this.targerGroupTypes = ["Kurum", "Kişi"];
        this.init(val);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/TargetGroup"));
    }
    addGroup() {
        targetGroupService.filter.push({ LocigalOperator: "AND", FilterType: "group", InputType: "none" });
    }
    addExpression() {
        if (this.HedefKitleTipi == "Kurum") {
            targetGroupService.filter.push({
                LocigalOperator: "AND", Operator: "IsEqualTo", MemberName: "Kurum Kısa Adı",
                Value: "", FilterType: "expression", FieldType: "System.String", InputType: "text", FieldName: "KurumKisaUnvan", RowID: random.all(10)
            });
        }
        else {
            targetGroupService.filter.push({
                LocigalOperator: "AND", Operator: "IsEqualTo", MemberName: "Adı", FieldName: "KisiAdi",
                Value: "", FilterType: "expression", FieldType: "System.String", InputType: "text", EkParametreId: 0, ParametreTableName: null, RowID: random.all(10)
            });
        }
    }
    getData(e) {
        var item = targetGroupService.fields.filter(function (value) { return value.name == e.MemberName; })[0];
        return this.getOperatorListNames(item.operatorList);
    }
    getOperatorListNames(operatorList) {
        const lang = $("#site-lang").val();
        //const values = ["IsLessThan", "IsLessThanOrEqualTo", "IsGreaterThanOrEqualTo", "IsGreaterThan", "IsEqualTo", "IsNotEqualTo", "StartsWith", "EndsWith", "Contains", "IsContainedIn", "DoesNotContain", "IsNull", "IsNotNull", "IsEmpty", "IsNotEmpty", "IsNullOrEmpty"]
        //const texts = {
        //    'en-US': ["IsLessThan", "IsLessThanOrEqualTo", "IsGreaterThanOrEqualTo", "IsGreaterThan", "IsEqualTo", "IsNotEqualTo", "StartsWith", "EndsWith", "Contains", "IsContainedIn", "DoesNotContain", "IsNull", "IsNotNull", "IsEmpty", "IsNotEmpty", "IsNullOrEmpty"],
        //    'tr-TR': ["Küçük", "Küçük eşit", "Büyük eşit", "Büyük", "Eşit", "Eşit Değil", "Başlayan", "Biten", "İçeren", "İçinde içeren", "İçermeyen", "Olmayan", "Olan", "Boş Olan", "Boş Olmayan", "Olmayan veya Boş Olan"]
        //}
        const values = ["IsLessThan", "IsLessThanOrEqualTo", "IsGreaterThanOrEqualTo", "IsGreaterThan", "IsEqualTo", "IsNotEqualTo", "StartsWith", "EndsWith", "Contains", "IsContainedIn", "DoesNotContain", "IsNull", "IsNotNull", "IsEmpty", "IsNotEmpty", "IsNullOrEmpty"];
        const texts = {
            'en-US': ["IsLessThan", "IsLessThanOrEqualTo", "IsGreaterThanOrEqualTo", "IsGreaterThan", "IsEqualTo", "IsNotEqualTo", "StartsWith", "EndsWith", "Contains", "IsContainedIn", "DoesNotContain", "IsNull", "IsNotNull", "IsEmpty", "IsNotEmpty", "IsNullOrEmpty"],
            'tr-TR': ["Küçük", "Küçük eşit", "Büyük eşit", "Büyük", "Eşit", "Eşit Değil", "Başlayan", "Biten", "İçeren", "İçinde içeren", "İçermeyen", "Olmayan", "Olan", "Boş Olan", "Boş Olmayan", "Olmayan veya Boş Olan"]
        };
        let arr = [];
        for (var i = 0; i < operatorList.length; i++) {
            const index = values.indexOf(operatorList[i]);
            arr.push({ text: texts[lang][index] || values[index], value: values[index] });
        }
        return arr;
    }
    getParamData(e) {
        var data;
        var item = targetGroupService.fields.filter(function (value) { return value.name == e.MemberName; })[0];
        var url = "/targetgroup/";
        if (item.ekParametreId > 0) {
            if (targetGroupService.HedefKitleTipi == "Kurum") {
                url = url + "GetDynamicValueForKurum/" + item.ekParametreId;
            }
            else {
                url = url + "GetDynamicValueForKisi/" + item.ekParametreId;
            }
        }
        else {
            url = url + "GetParamValue/" + item.parametreTableName;
        }
        var res;
        var conf = AjaxConfiguration.getDafault();
        conf.url = url;
        conf.async = false;
        conf.success = function (result) {
            data = result.value;
        };
        this._repository.getData(null, conf);
        return data;
        console.log(item);
    }
    readData(e) {
        var item = targetGroupService.fields.filter(function (value) { return value.name == e.MemberName; })[0];
        if (item.inputType == "text") {
            $("div[data-id=" + e.uid + "select]").attr("style", "display:none");
        }
        else {
            $("div[data-id=" + e.uid + "input]").attr("style", "display:none");
        }
    }
    change(e) {
    }
    removeItem(item) {
        console.log(item);
        var filtre = targetGroupService.filter;
        filtre.remove(item);
    }
    selectTargetGroupType(e) {
        setTimeout(function () {
            targetGroupService = new TargetGroupService({ filter: [], fields: [], TabloID: 0, HedefKitleTipi: e.dataItem, Tanim: "" });
            targetGroupService.GetTargetGroupFields(e.dataItem);
            kendo.bind(".binder", targetGroupService);
        }, 200);
    }
    LoadFilterById(id) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/SingleOrDefaultForView/" + id;
        conf.async = true;
        conf.success = function (result) {
            console.log(result);
            console.log(targetGroupService.filter);
            if (result.value) {
                targetGroupService.Tanim = result.value.tanim;
                targetGroupService.HedefKitleTipi = result.value.hedefKitleTipi;
                targetGroupService.TabloID = result.value.tabloID;
                targetGroupService.GetTargetGroupFields(result.value.hedefKitleTipi);
                targetGroupService.removeFilters();
                result.value.filters.forEach(function (val) {
                    if (val.inputType == "date") {
                        val.value = val.value.split("T")[0];
                    }
                    targetGroupService.filter.push({
                        LocigalOperator: val.locigalOperator, Operator: val.operator, MemberName: val.memberName,
                        Value: val.value, FilterType: val.filterType, FieldType: val.fieldType, InputType: val.inputType,
                        ParametreTableName: val.parametreTableName, EkParametreId: val.ekParametreId, FieldName: val.fieldName, TableName: val.tableName, RowID: random.all(10)
                    });
                });
                kendo.bind(".binder", targetGroupService);
            }
        };
        this._repository.getData(null, conf);
    }
    GetTargetGroupFields(targetType) {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/gettargetgroupfields/" + targetType;
        conf.async = false;
        conf.success = function (result) {
            if (targetGroupService.filter.length > 0) {
                targetGroupService.removeFilters();
            }
            targetGroupService.fields = result.value;
            targetGroupService.filter.push({ LocigalOperator: "AND", FilterType: "group" });
        };
        this._repository.getData(null, conf);
    }
    SelectParametre(e) {
        var valueSelector = "div[data-id=" + e.data.uid + "value]";
        $(valueSelector).remove();
        var item = e.dataItem;
        e.data.set("FieldType", item.fieldType);
        e.data.set("InputType", item.inputType);
        e.data.set("ParametreTableName", item.parametreTableName);
        e.data.set("EkParametreId", item.ekParametreId);
        e.data.set("FieldName", item.fieldName);
        e.data.set("TableName", item.tableName);
        if (item.inputType == "text" || item.inputType == "number" || item.inputType == "date") {
            e.data.set("Value", "");
            $("div[data-id=" + e.data.uid + "select]").attr("style", "display:none");
            $("div[data-id=" + e.data.uid + "input]").attr("style", "display:show");
            $("div[data-id=" + e.data.uid + "input]").attr("type", item.inputType);
        }
        else {
            e.data.set("Value", "");
            $("div[data-id=" + e.data.uid + "input]").attr("style", "display:none");
            $("div[data-id=" + e.data.uid + "select]").attr("style", "display:show");
            this.getEkparametreSource(e, "div[data-id=" + e.data.uid + "select] select");
        }
        var operatorSelector = "div[data-id=" + e.data.uid + "operator] select";
        $(operatorSelector).data("kendoDropDownList").dataSource.data(this.getOperatorListNames(item.operatorList));
    }
    getEkparametreSource(e, selector) {
        var item = e.dataItem;
        if (item.ekParametreId > 0 || item.parametreTableName !== null) {
            var url = "/targetgroup/";
            if (item.ekParametreId > 0) {
                if (targetGroupService.HedefKitleTipi == "Kurum") {
                    url = url + "GetDynamicValueForKurum/" + item.ekParametreId;
                }
                else {
                    url = url + "GetDynamicValueForKisi/" + item.ekParametreId;
                }
            }
            else {
                if (item.name == "Şehir") {
                    url = url + "GetParamValueWithUstID/" + item.parametreTableName + "/1";
                }
                else {
                    url = url + "GetParamValue/" + item.parametreTableName;
                }
            }
            var res;
            var conf = AjaxConfiguration.getDafault();
            conf.url = url;
            conf.async = true;
            conf.success = function (result) {
                $(selector).data("kendoDropDownList").dataSource.data(result.value);
            };
            this._repository.getData(null, conf);
        }
    }
    delete(id) {
        alertim.confirm(siteLang.SilOnay, "info", function () {
            var conf = AjaxConfiguration.getDafault();
            conf.url = "/targetgroup/hedefkitlesil/" + id;
            conf.async = false;
            conf.dataType = "json";
            conf.contentType = "application/json; charset=utf-8";
            conf.success = function (result) {
                alertim.toast(siteLang.Sil, "success");
                TargetGroupService.initForList();
            };
            targetGroupService._repository.postData(null, conf);
        }, function () {
            return;
        });
    }
    removeFilters() {
        var filtre = targetGroupService.filter;
        targetGroupService.filter.forEach(function (item) {
            filtre.remove(item);
        });
    }
    create() {
        if (targetGroupService.Tanim === "" || targetGroupService.Tanim === null) {
            alertim.toast(siteLang.Hata, "warning");
        }
        var data = this.toJSON();
        console.log(data);
        var dataSet = { TabloID: this.TabloID, Tanim: this.Tanim, HedefKitleTipi: this.HedefKitleTipi, Filters: data["filter"] };
        dataSet.Filters.forEach(function (item) {
            if (item.Value != null && typeof (item.Value) == "number")
                item.Value = item.Value.toString();
        });
        var conf = AjaxConfiguration.postDefault();
        conf.url = "/targetgroup/create";
        conf.async = false;
        conf.dataType = "json";
        conf.contentType = "application/json; charset=utf-8";
        conf.success = function (result) {
            alertim.toast(siteLang.Kaydet, "success", function () { window.location.href = "/targetgroup/list"; }, function () { });
        };
        conf.error = function (e) {
            errorHandler(e);
        };
        this._repository.postData(JSON.stringify(dataSet), conf);
    }
    static initalize() {
        var itemId = 0;
        try {
            itemId = parseInt(GetURLParameter());
        }
        catch (e) {
        }
        if (isNaN(itemId) || itemId == 0 || !itemId) {
            targetGroupService = new TargetGroupService({ filter: [], fields: [], TabloID: 0, HedefKitleTipi: "Kişi", Tanim: "" });
            targetGroupService.GetTargetGroupFields("Kişi");
            kendo.bind(".binder", targetGroupService);
        }
        else if (itemId > 0) {
            targetGroupService = new TargetGroupService({ filter: [], fields: [], TabloID: 0, HedefKitleTipi: "Kurum", Tanim: "Test Tanim" });
            targetGroupService.LoadFilterById(itemId);
        }
    }
    hedefKitleTanimChange(id, tip) {
        //Bu method henüz çalışmıyor. ????
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/RunExpression/" + id + "/" + tip;
        conf.async = false;
        conf.success = function (result) {
            if (!result) {
                alertim.toast(siteLang.Hata, "warning");
            }
            if (result.value) {
                $('#list').dataTable().fnDestroy();
                $('#list').DataTable({
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
                    data: result.value,
                    columns: [
                        { data: 'key' },
                    ],
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
            else {
                alertim.toast(siteLang.Hata, "warning");
            }
        };
        conf.error = function (err) {
            alertim.toast(siteLang.Hata, "warning");
        };
        targetGroupService._repository.getData(null, conf);
    }
    GetTanimlar() {
        var conf = AjaxConfiguration.getDafault();
        conf.url = "/targetgroup/gettargetgroups";
        conf.async = false;
        conf.success = function (result) {
            if (result.value) {
                targetGroupService.tanimlar = result.value;
            }
        };
        targetGroupService._repository.getData(null, conf);
    }
    static initForList() {
        targetGroupService.GetTanimlar();
        $('#list').dataTable().fnDestroy();
        $('#list').DataTable({
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
            data: targetGroupService.tanimlar,
            columns: [
                { data: 'tanim' },
                { data: 'hedefKitleTipi' },
                {
                    "data": null,
                    render: function (data, type, row) {
                        return '<button id="update" class="btn  btn-sm mx-1" data-id="' + data.tabloID + '"><img src="/img/edit.svg"/></button>'
                            + '<button id="delete" class="btn  btn-sm" data-id="' + data.tabloID + '" ><img src="/img/trash.svg"/> </button>';
                    },
                    message: 'Are You Sure!',
                    "targets": -1
                }
            ],
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
        $('body').on('click', '#delete', function (e) {
            var id = $(this).attr("data-id");
            targetGroupService.delete(id);
        });
        $('body').on('click', '#update', function (e) {
            var id = $(this).attr("data-id");
            window.location.href = "/targetgroup/update/" + id;
        });
        $(document).ready(function () {
            $('.modal-content').resizable({
                minHeight: 100,
                minWidth: 100
            });
            $('.modal-dialog').draggable();
        });
    }
    static initForTest() {
        targetGroupService.GetTanimlar();
        kendo.bind($(".model-bind"), targetGroupService);
    }
}
function HedefKitleTanimChange(id) {
    var a = targetGroupService.tanimlar.filter(x => x.tabloID == id)[0];
    targetGroupService.hedefKitleTanimChange(a.tabloID, a.hedefKitleTipi);
}
var targetGroupService;
class TargetGroupModel {
}
class HedefKitleTanim {
}
$(document).ready(function () {
    TargetGroupService.initalize();
});
function removeRow(e) {
    console.log(e);
    var uid = $(e).attr("id");
    var filtre = targetGroupService.filter;
    var item = filtre.filter(a => a.uid == uid);
    targetGroupService.removeItem(item[0]);
}
var GetURLParameter;
var alertim;
var random;
