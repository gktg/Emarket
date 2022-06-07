var kullaniciAdiUygunMuKontrol = true;
var SistemYabanciDilListForDDL = [];
var id;
var notificationList = [];
class KisiService {
    get(call) {
        $.ajax({
            type: "GET",
            url: "/panel/GetUserProfile",
            dataType: "json",
            data: null,
            success: function (data) {
                kisiItem = data;
                call(data);
            },
            error: function (e) {
                console.log(e)
            }
        });
    }
    update() {
        if (!kullaniciAdiUygunMuKontrol && $("#KisiEposta").val() != oldEmail) {
            alertim.toast(siteLang.MailHata, alertim.types.warning);
            return;
        }
        kisiItem["kisiAdi"] = $("#KisiAdi").val();
        kisiItem["kisiSoyadi"] = $("#KisiSoyadi").val();
        kisiItem["kisiEposta"] = $("#KisiEposta").val();
        //kisiItem["kisiEkranAdi"] = $("#KisiEkranAdi").val();
        kisiItem["kisiTelefon1"] = $("#KisiTelefon1").val();
        kisiItem["dilID"] = $("#DilID").val();
        kisiItem["kisiResimId"] = $('#KisiResimUrl').attr("medyaid");
        if (status == 'true') {
            $.ajax({
                type: "POST",
                url: "/panel/UpdateProfile/",
                dataType: "json",
                data: kisiItem,
                success: function (result) {
                    alertim.toast(siteLang.Guncelle, alertim.types.success, function () {
                        window.location.replace("/panel/profile");
                    });
                },
                error: function (e) {
                    errorHandler(e);
                },
            })
        } else {
            //kisiItem['Offline'] = 1;
            //if ($('#KisiResimUrl').data('offline') === 'offline') {
            //    kisiItem["kisiResimUrl"] = $('#KisiResimUrl').attr('src');
            //}
            //OfflineCache.put("/panel/UpdateProfile/", JSON.stringify(kisiItem));
            //OfflineCache.put("/panel/GetUserProfile/", JSON.stringify(kisiItem));
            //window.location.replace("/panel/profile");
        }
    }

    delete() {
        if (status == 'true') {
            alertim.confirm(siteLang.SilOnay, "info",
                function () {
                    $.ajax({
                        type: "GET",
                        url: "/panel/TemelKisiSilindiYap/" + kisiItem["tabloID"],
                        dataType: "json",
                        data: null, // < === this is where the problem was !!
                        success: function (result) {
                            if (result.isSuccess) {
                                if (result.value) {
                                    Logout();
                                    alertim.toast(siteLang.Sil, alertim.types.success);
                                } else {
                                    alertim.toast(siteLang.Hata, alertim.types.danger);
                                }
                            } else {
                                alertim.toast(siteLang.Hata, alertim.types.danger);
                            }
                        },
                        error: function (e) {
                            errorHandler(e);
                        }
                    });
                },
                function () {
                    return;
                }
            )
        } else {
            //kisiItem['Offline'] = 1;
            //if ($('#KisiResimUrl').data('offline') === 'offline') {
            //    kisiItem["kisiResimUrl"] = $('#KisiResimUrl').attr('src');
            //}
            //OfflineCache.put("/panel/UpdateProfile/", JSON.stringify(kisiItem));
            //OfflineCache.put("/panel/GetUserProfile/", JSON.stringify(kisiItem));
            //window.location.replace("/panel/profile");
        }
    }

    setView() {
        kisiServiceModel.get(function (data) {
            if (data != null) {
                oldEmail = data.kisiEposta;

                if (data.kisiResimUrl != null) {
                    //$("#KisiResimUrl").attr("src", $("#site-urlMedya").val() + data.kisiResimUrl);
                }

                $("#KisiAdi").html(data.kisiAdi + " " + data.kisiSoyadi);
                $("#KisiEposta").html(data.kisiEposta);
                $("#KisiEkranAdi").html(data.kisiEkranAdi);
                $("#KisiTelefon1").html(data.kisiTelefon1);
                SistemDilListGetir(function () {
                    var dilad = SistemYabanciDilListForDDL.filter(function (t) {
                        return t.tabloID === parseInt(data.dilID);
                    })[0].paramTanim;
                    $("#DilAd").html(dilad);
                });
            }
        });
    }
    setUpdateView() {
        kisiServiceModel.get(function (data) {
            oldEmail = data.kisiEposta;
            $("#KisiAdi").val(data.kisiAdi);
            $(".Name-Surname").html(data.kisiAdi + " " + data.kisiSoyadi);
            $(".Email").html(data.kisiEposta);
            $("#KisiSoyadi").val(data.kisiSoyadi);
            $("#KisiEposta").val(data.kisiEposta);
            $("#KisiEkranAdi").val(data.kisiEkranAdi);
            $("#KisiTelefon1").val(data.kisiTelefon1);
            $(".proftxt").html(CsharpDateToStringDateyyyymmddForProfile(data.kayitTarihi));
            SistemDilListGetir(function () {
                $("#DilID").val(data.dilID);
            });

            if (data.kisiResimUrl != null) {
                //$("#KisiResimUrl").attr("src", $("#site-urlMedya").val() + data.kisiResimUrl);
            }
            $('#KisiResimUrl').attr("medyaid", data.kisiResimId);
        });
    }
    //async senkorinize() {
    //   /* var data = await OfflineCache.get("/panel/UpdateProfile/");*/
    //    if (data) {
    //        if (data["kisiResimUrl"].indexOf("filesystem:") > -1) {
    //            getImageFormUrl(data["kisiResimUrl"], function (blobImage, name) {
    //                var formData = new FormData();
    //                formData.append('file', blobImage, name);
    //                $.ajax({
    //                    url: "/panel/resimyukle/",
    //                    processData: false,
    //                    contentType: false,
    //                    type: "POST",
    //                    data: formData,
    //                    success: function (result) {
    //                        var id = result.value.tabloID;
    //                        var url = result.value.medyaUrl;

    //                        if (url != null) {
    //                            //$('#KisiResimUrl').attr("src", $("#site-urlMedya").val() + url);
    //                        }

    //                        //$('#KisiResimUrl').attr("src", "http://172.16.31.10:51305" + url);
    //                        $('#KisiResimUrl').attr("medyaid", id);
    //                        data["kisiResimId"] = id;
    //                        $.ajax({
    //                            type: "POST",
    //                            url: "/panel/UpdateProfile/",
    //                            dataType: "json",
    //                            data: data,
    //                            success: function () {
    //                                window.location.replace("/panel/profile");
    //                            }
    //                        })
    //                    },
    //                    error: function () {
    //                        alertim.toast(siteLang.Hata, alertim.types.danger);
    //                    }
    //                });
    //            });
    //        } else {
    //            $.ajax({
    //                type: "POST",
    //                url: "/panel/UpdateProfile/",
    //                dataType: "json",
    //                data: data,
    //                success: function () {
    //                    window.location.replace("/panel/profile");
    //                }
    //            })
    //        }
    //       /* await OfflineCache.delete("/panel/UpdateProfile/");*/
    //    }
    //}
}

//class OfflineCache {
//    static isSportted() {
//        let isCacheSupported = 'caches' in window;
//        return isCacheSupported;
//    }
//    static async get(name) {
//        if (OfflineCache.isSportted()) {
//            var cache = await caches.open('V_12::CacheFirstSafe');
//            var response = await cache.match(name);
//            if (response) {
//                try {
//                    return await response.json();
//                } catch (e) {
//                }
//            }
//        }
//        return null;
//    }
//    static async delete(name) {
//        if (OfflineCache.isSportted()) {
//            var cache = await caches.open('V_12::CacheFirstSafe');
//            cache.delete(name);
//        }
//    }
//    static async put(name, json) {
//        if (OfflineCache.isSportted()) {
//            var cache = await caches.open('V_12::CacheFirstSafe');
//            await cache.put(name, new Response(json));
//        }
//    }
//}

//function getImageFormUrl(url, callback) {
//    var img = new Image();
//    img.setAttribute('crossOrigin', 'anonymous');
//    img.onload = function (a) {
//        var canvas = document.createElement("canvas");
//        canvas.width = this.width;
//        canvas.height = this.height;
//        var ctx = canvas.getContext("2d");
//        ctx.drawImage(this, 0, 0);

//        var dataURI = canvas.toDataURL("image/jpg");

//        // convert base64/URLEncoded data component to raw binary data held in a string
//        var byteString;
//        if (dataURI.split(',')[0].indexOf('base64') >= 0)
//            byteString = atob(dataURI.split(',')[1]);
//        else
//            byteString = unescape(dataURI.split(',')[1]);

//        // separate out the mime component
//        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//        // write the bytes of the string to a typed array
//        var ia = new Uint8Array(byteString.length);
//        for (var i = 0; i < byteString.length; i++) {
//            ia[i] = byteString.charCodeAt(i);
//        }
//        var name = "";
//        if (mimeString.toLowerCase() == 'image/jpg')
//            name = "img.jpg";
//        else if (mimeString.toLowerCase() == 'image/png')
//            name = "img.png";
//        return callback(new Blob([ia], { type: mimeString }), name);
//    }

//    img.src = url;
//}

var SIZE = 100 * 1024 * 1024; // 100 MB

var errorFct = function (e) {
    console.error(e);
};
var getFileSystem = function (successFct) {
    navigator.webkitPersistentStorage.requestQuota(SIZE, function () {
        window.webkitRequestFileSystem(window.PERSISTENT, SIZE, successFct, errorFct);
    }, errorFct);
};
var createTempName = function () {
    return 'temp.name.dummy.jpg';
};
var addToSyncQueue = function (filename) {
    // adding to sync queue
    console.log('Adding to queue', filename);
};
//var showImage = function (fileName) {
//    var src = 'filesystem:' + window.location.origin + '/persistent/' + fileName;

//    if (fileName != '' && fileName != null) {
//        $('#KisiResimUrl').attr('src', src);
//    }
//    $('#KisiResimUrl').data('offline', 'offline');
//};
var readImage = function (fileName, successFct) {
    getFileSystem(function (fileSystem) {
        fileSystem.root.getFile(fileName, {}, function (fileEntry) {
            fileEntry.createWriter(function (writer) {
                var blob = new Blob();
                writer.write(blob);
                successFct(blob);
            })
            //fileEntry.file(successFct, errorFct);
        }, errorFct);
    }
    );
};
var writeSuccessFull = function () {
    var img = document.getElementById('updimage');
    var name = img.files[0].name;
    addToSyncQueue(name);
    showImage(name);
};
function writeImage(fileName, file) {
    getFileSystem(function (fileSystem) {
        fileSystem.root.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = writeSuccessFull;

                fileWriter.onerror = errorFct;

                fileWriter.write(file);
            }, errorFct);
        });
    });
}
var kisiItem;
$(document).ready(function () {
    start();

    $("#kurRes").click(function () {
        $("#KisiResimUrl").attr("src", "");
        $('#KisiResimUrl').attr("medyaid", 0);
    });

    //$('#ProfilEskiSifre').on("change", function () {
    //    if (!$('#ProfilEskiSifre').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\,\.\?\":{}|<>+]).{8,}$/)) {
    //        $('#ProfilEskiSifre').addClass("is-invalid");
    //    } else {
    //        $('#ProfilEskiSifre').removeClass("is-invalid");
    //    }
    //});

    $('#ProfilYeniSifre').on("change", function () {
        if ($('#ProfilYeniSifre').val().length > 0) {
            if ($('#ProfilYeniSifre').val() !== $('#ProfilYeniSifreTekrar').val()) {
                $('#ProfilYeniSifre').addClass("is-invalid");
                $('#ProfilYeniSifreTekrar').addClass("is-invalid");
                //$('#ProfilYeniSifre').addClass("is-valid");
            }
            else {
                $('#ProfilYeniSifreTekrar').removeClass("is-invalid");
                $('#ProfilYeniSifreTekrar').addClass("is-valid");
                $('#ProfilYeniSifre').removeClass("is-invalid");
                $('#ProfilYeniSifre').addClass("is-valid");
            }
        } else {
            $('#ProfilYeniSifre').removeClass("is-invalid");
            //$('#strengthMessage').removeClass('SifreKarmasikUyari');
        }
    });
    $('#ProfilYeniSifreTekrar').on("change", function () {
        if ($('#ProfilYeniSifreTekrar').val().length > 0) {
            if ($('#ProfilYeniSifre').val() !== $('#ProfilYeniSifreTekrar').val()) {
                $('#ProfilYeniSifreTekrar').addClass("is-invalid");
                $('#ProfilYeniSifre').addClass("is-invalid");
            }
            else {
                $('#ProfilYeniSifreTekrar').removeClass("is-invalid");
                $('#ProfilYeniSifreTekrar').addClass("is-valid");
                $('#ProfilYeniSifre').removeClass("is-invalid");
                $('#ProfilYeniSifre').addClass("is-valid");
            }
        } else {
            $('#ProfilYeniSifreTekrar').removeClass("is-invalid");
            $('#ProfilYeniSifreTekrar').addClass("is-invalid");
            //$('#strengthMessage').removeClass('SifreKarmasikUyari');
        }
    });
    //PhoneMask();

    $("#KisiEposta").on("change",
        function () {
            if ($("#KisiEposta").val() != "") {
                KullaniciAdiKontrolu();
            }
        });

    $("#btnDlt").click(function () {
        if (kisiItem["tabloID"] > 0) {
            kisiServiceModel.delete();
        }
    });

    $("#btnUpdate").click(function () {
        var err = false;

        //if (oldEmail != $('#KisiEposta').val()) {
        //    if (!Email()) {
        //        return;
        //    }
        //}
        if ($('#ProfilYeniSifre').val().length > 0) {
            SifreGuncelle();
        } else {
            kisiServiceModel.update();
        }
    })

    $("#openImage").click(function () {
        $("#updimage").click();
    });

    $("#imageCropSave").click(function () {
        imageCropper.crop();
        var data = imageCropper.getCroppedCanvas().toDataURL("image/png");
        var fileName = $("#updimage").val().split("\\").pop();
        var file = dataURLtoFile(data, fileName)

        if (status == 'true') {
            var fd = new FormData();
            fd.append('file', file);
            $.ajax({
                url: "/panel/resimyukle/",
                processData: false,
                contentType: false,
                type: "POST",
                data: fd,
                success: function (data) {
                    var id = data.value.tabloID;
                    var url = data.value.medyaUrl;

                    if (url != null) {
                        //$('#KisiResimUrl').attr("src", $("#site-urlMedya").val() + url);
                    }

                    //$('#KisiResimUrl').attr("src", "http://77.92.105.18:51305" + url);
                    //$('#KisiResimUrl').attr("src", "http://172.16.31.10:51305" + url);
                    //$('#KisiResimUrl').attr("src", "http://localhost:51305" + url);
                    $('#KisiResimUrl').attr("medyaid", id);
                    $("#updimage").val('')
                },
                error: function () {
                    console.log("fail!");
                    alertim.toast(siteLang.Hata, alertim.types.danger);
                }
            });
        } else {
            writeImage(fileName, file);
        }

        $("#imageCrop").cropper('destroy');
        $("#modalCropper").modal("hide");
    })

    $("#updimage").on("change", function () {
        $("#imageCrop").cropper('destroy');
        if (document.getElementById("updimage").files.length) {
            var file = document.getElementById("updimage").files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                var data = event.target.result;
                $("#imageCrop").attr("src", data);
                setTimeout(function () {
                    $("#imageCrop").cropper();
                    imageCropper = $("#imageCrop").data("cropper");
                    imageCropper.options.aspectRatio = 1 / 1;
                    imageCropper.optionszoomOnWheel = false;
                    imageCropper.optionszoomOnTouch = false;
                    imageCropper.options.zoomable = false;
                    imageCropper.options.cropBoxResizable = false;
                    imageCropper.options.cropBoxMovable = false;
                    imageCropper.options.dragMode = 'move';
                    imageCropper.options.minCropBoxHeight = 128;
                    imageCropper.options.minCropBoxWidth = 128;
                }, 300)
            };

            reader.readAsDataURL(file);
            $("#modalCropper").modal("show");
        }
    })

   /* loadNotification();*/
    $(".btn-notification").click(function () {
        if (notifCount == 0)
          /*  loadNotification();*/

        $('.badge.badge-warning.navbar-badge.notificount').html(0);
        SetSeen();
        notifCount = 0;
    })
    $(document).on("click", "a.notific-item", function (e) {
        var elem = e.target;
        var model = {};
        var bildirimId = $(elem).attr("notifId");
        var bildirimIcerik = notificationList.filter(function (t) {
            return t.id === parseInt(bildirimId);
        })[0].message;
        model["BildirimId"] = bildirimId;
        model["BildirimIcerik"] = bildirimIcerik;

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/panel/BildirimAksiyonLog",
            async: false,
            data: model,
            success: function (result) { },
            error: function (e) { console.log(e); }
        })
    });
    $('#notificationDropdown').click(function (event) {
        event.stopPropagation();
    });
})
var notifCount;
var notifdivlist;
//function loadNotification() {
//    $.ajax({
//        type: "GET",
//        dataType: "json",
//        url: "/panel/GetNotification",
//        success: function (result) {
//            if (!result || result == null)
//                return;
//            if (result.value) {
//                if (result.value.item.length > 0) {
//                    notifCount = result.value.count;
//                    //$(".notifi").html('<span class="dropdown-item dropdown-header">' + result.value.count + ' Yeni Bildirim</span>');
//                    notificationList = [];
//                    notifdivlist = [];
//                    $(".notifications-div").html("");
//                    result.value.item.forEach(function (item) {
//                        var date = new Date(item.date);
//                        var msgdiv = "";

//                        //var mesaj = '' + item.url+'';
//                        if (item.seenStatus) {
//                            msgdiv = '<div class="dropdown-item notification-select-item" notifId="' +
//                                item.id +
//                                '">\
//                            <p style="margin: 0 0.8vw;" notifId="' +
//                                item.id +
//                                '">\
//                            <span class="notification-select-item-message">' +
//                                item.message +
//                                ' <button style="float:right;" onClick="CopyUrlOnly2(\'' +
//                                item.url +
//                                '\')" type="button" class="btn btn-sm"> <img src="/img/notification-select-item-file-icon.svg" class="notification-select-item-file-icon" ></button></span>\
//                            <span class="notification-select-item-time" style="margin-left: 0.8vw; margin-right: 0.8vw;" title="' +
//                                date.pretty() +
//                                '"> ' +
//                                CsharpStringDateToStringDateTime(item.date) +
//                                '</span></p>\
//                            </div><hr style="width:90 %;background-color:black;">';
//                        } else {
//                            msgdiv = '<div class="dropdown-item notification-select-item" notifId="' +
//                                item.id +
//                                '">\
//                            <p style="margin: 0 0.8vw; font-weight:200;" notifId="' +
//                                item.id +
//                                '">\
//                            <span class="notification-select-item-message">' +
//                                item.message +
//                                ' <button style="float:right;" onClick="CopyUrlOnly2(\'' +
//                                item.url +
//                                '\')" type="button" class="btn btn-sm"> <img src="/img/notification-select-item-file-icon.svg" class="notification-select-item-file-icon" ></button></span>\
//                            <span class="notification-select-item-time" style="margin-left: 0.8vw; margin-right: 0.8vw;" title="' +
//                                date.pretty() +
//                                '"> ' +
//                                CsharpStringDateToStringDateTime(item.date) +
//                                '</span></p>\
//                            </div><hr style="width:90%;background-color:black;">';
//                        }
//                        notifdivlist.push(msgdiv);
//                        //$(".notifications-div").html(msgdiv);
//                        notificationList.push({ id: item.id, message: item.message });
//                    });
//                    notifdivlist.forEach(function (item) {
//                        $(".notifications-div").append(item);
//                    });
//                    if (result.value.count == 0) {
//                        $('#notifiCountSpan').css("display", "none");
//                    } else {
//                        $('#notifiCountSpan').css("display", "block");
//                    }
//                    $(".notificount").html(result.value.count);
//                } else {
//                    $(".notificount").html(0);
//                }
//            }
//        }
//    })
//}
function SetSeen() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/panel/SetSeen",
        success: function (result) {
        }
    });
}

function CopyUrlOnly2(mesaj) {
    copyTextToClipboard(mesaj);
    alertim.toast(siteLang.PanoKopya, alertim.types.success);
}

function SistemDilListGetir(func) {
    fetch("/panel/SistemDilList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(result => {
        if (result.isSuccess == true) {
            SistemYabanciDilListForDDL = result.value;
            SiteParamDDLDoldur("DilID", result.value);
            if (func) {
                func();
            }
        } else {
            alertim.toast(siteLang.Hata, alertim.types.danger);
        }
    });
}

function SiteParamDDLDoldur(alanID, data) {
    var str = "<option value='0' hidden>Seçiniz</option>";
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i].tabloID + "'>" + data[i].paramTanim + "</option>";
    }
    $("#" + alanID).html(str);
};

window.addEventListener("load", () => {
    //new CustomerSevice().list();
});
function setStatus() {
   /* kisiServiceModel.senkorinize();*/
}
/*var status = 'false';*/
/*var offlineDataRead = 0;*/

const isInStandaloneMode = () =>
    (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');
var kisiServiceModel = new KisiService();
var globalUserId = $('body').data('id');
if (globalUserId === undefined) {
    globalUserId = window.ConferenceConfig.UserID;
}
/*const sessionId = document.getElementById("site-id").value;*/
//const connection = new signalR.HubConnectionBuilder()
//    .withUrl($("#site-urlSocket").val()+"/userHub?user=" + globalUserId/* + "&sessionId=" + sessionId*/)
    //.withUrl("http://localhost:51309/userHub?user=" + globalUserId)
    //.configureLogging(signalR.LogLevel.Information)
    //.build();
//connection.serverTimeoutInMilliseconds = 1000 * 60 * 120; // 1 second * 60 * 1 = 1 minutes.
//connection.keepAliveIntervalInMilliseconds = 1000 * 60 * 60; // 1 second * 60 * 1 = 1 minutes.
//connection.on("UpdateOnlineUser", function (count) {
//    $("#onl").html(count);
//})
//connection.on("SendNotification", function () {
//    loadNotification();
//})
//connection.on("Logout", function () {
//    Logout();
//})

async function start() {
    try {
        //await connection.start();
        setStatus();
        if ($(".profile-update-content").length > 0) {
            SistemDilListGetir();
            kisiServiceModel.setUpdateView();
        }
        if ($(".profile-view-content").length > 0) {
            SistemDilListGetir();
            kisiServiceModel.setView();
        }
    } catch (err) {
        //console.log(err);
        //setTimeout(start, 5000);
        //setStatus(false);
        //if (offlineDataRead == 0) {
        //    if ($(".profile-update-content").length > 0) {
        //        kisiServiceModel.setUpdateView();
        //    }
        //    if ($(".profile-view-content").length > 0) {
        //        kisiServiceModel.setView();
        //    }
        //    offlineDataRead = 1;
        //}
    }
}
/*connection.onclose(start);*/

function Logout() {
    $.ajax({
        type: "GET",
        url: "/LoginRegister/Logout",
        data: null,
        dataType: "json",
        success: function (data) {
            window.location.href = "/";
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function GetOnlineKisiCount() {
    $.ajax({
        type: "GET",
        url: "/panel/GetOnlineUserCount",
        data: null,
        dataType: "json",
        success: function (data) {
            var count = data.value;
            $('#onl').text(count);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function SifreGuncelle() {
    var sifreModel = {};
    sifreModel["OldPassword"] = $('#ProfilEskiSifre').val();
    sifreModel["NewPassword"] = $('#ProfilYeniSifre').val();
    sifreModel["NewPasswordTekrar"] = $('#ProfilYeniSifreTekrar').val();
    if (!sifreKontrols('ProfilYeniSifre', 'ProfilYeniSifreTekrar', 'strengthMessage')) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/panel/UpdatePassword",
        dataType: "json",
        async: false,
        data: sifreModel, // < === this is where the problem was !!
        success: function (result) {
            if (result.isSuccess == true) {
                $('#sifreGuncelleVazgecBtn').click();
                kisiServiceModel.update();
                $('#strengthMessage').removeClass('SifreKarmasikUyari');
            } else {
                alertim.toast(siteLang.Hata, alertim.types.warning);
                $('#ProfilEskiSifre').addClass("is-invalid");
                $('#strengthMessage').addClass('SifreKarmasikUyari');
                return;
            }
        },
        error: function (e) {
            console.log(e);
            $('#strengthMessage').addClass('SifreKarmasikUyari');
            alertim.toast(siteLang.Hata, alertim.types.error);
            errorHandler(e);
        }, //success: function (result) {
    });
}

function sifreKontrols(sifrealani, sifretekrari, mesajdiv) {
    if (!$('#ProfilEskiSifre').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\,\.\?\":{}|<>+]).{8,}$/)) {
        $('#ProfilEskiSifre').addClass("is-invalid");
        alertim.toast(siteLang.OldPass, alertim.types.warning)
        return false;
    } else {
        $('#ProfilEskiSifre').removeClass("is-invalid");
        if ($('#' + sifrealani).val() !== $('#' + sifretekrari).val()) {
            $('#' + sifretekrari).addClass("is-invalid");
            alertim.toast(siteLang.SifreUyum, alertim.types.warning)
            return false;
        }
        else {
            //$('#' + sifretekrari).removeClass("is-invalid");
            //$('#' + sifretekrari).addClass("is-valid");
            //if (!CheckStrength()) {
            //    $('#' + sifrealani).addClass("is-invalid");
            //    alertim.toast(siteLang.SifreHata, alertim.types.warning)
            //    $('#' + mesajdiv).addClass('SifreKarmasikUyari');
            //    return false;
            //}
            //else {
            //    $('#' + sifrealani).removeClass("is-invalid");
            //    $('#' + sifrealani).addClass("is-valid");
            //    $('#' + mesajdiv).removeClass('SifreKarmasikUyari');
            //    return true;
            //}
            return true;
        }
    }
}

//function CheckStrength() {
//    return $('#ProfilYeniSifre').val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\,\.\?\":{}|<>+]).{8,}$/);
//}

function KullaniciAdiKontrolu() {
    var username = new String();
    username = $('#KisiEposta').val();
    var kontrol;
    $.ajax({
        type: "POST",
        url: "/LoginRegister/KullaniciAdiKontrolu",
        dataType: "json",
        data: { mailOrUsername: username },
        success: function (result) {
            if (result.value == true) {
                if ($("#KisiEposta").val() != oldEmail) {
                    alertim.toast(siteLang.MailHata, alertim.types.warning);
                }
                kullaniciAdiUygunMuKontrol = false;
            } else if (result.value == false) {
                kullaniciAdiUygunMuKontrol = true;
            }
            kullaniciAdiUygunMu(kullaniciAdiUygunMuKontrol);
        },
        error: function (e) {
            console.log(e);
        }
    });
    return kullaniciAdiUygunMuKontrol;
}

function kullaniciAdiUygunMu(result) {
    if ($('#KisiEposta').val().length > 0) {
        if (!result) {
            $('#KisiEposta').removeClass("is-valid");
            $('#KisiEposta').addClass("is-invalid");
            return false;
        } else {
            $('#KisiEposta').removeClass("is-invalid");
            $('#KisiEposta').addClass("is-valid");
            return true;
        }
    }
}

function KisiVarOlanLisansAbonelik() {
    $.ajax({
        type: "GET",
        url: "/CompanyLicense/KisiVarOlanLisansAbonelik",
        data: null,
        dataType: "json",
        success: function (data) {
            var count = data.value;
            LisansKalanSureGoster(count.lisansAbonelikBitisTarihi);
            if (count.lisansDenemeSuresindeMi) {
                $('#lisansTuru').html(siteLang.Denemelisansınızınbitiminekalansüre + ":");
            } else {
                $('#lisansTuru').html(siteLang.Lisansınızınbitiminekalansüre + ":");
            }
            lisansCounter = setInterval(function () {
                LisansKalanSureGoster(count.lisansAbonelikBitisTarihi)
            }, 1000);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function LisansKalanSureGoster(date) {
    let total = new Date(date).getTime() - new Date().getTime();
    if (total >= 0) {
        let time = new Date(date).prettyRemaining();
        $('#zaman').html(time);
    }
    else {
        $('#zaman').html(siteLang.Lisansınızınsüresibitmistir + ".");
        clearInterval(lisansCounter);
    }
}
var lisansCounter;
var stopCounter;
var oldEmail;
var imageCropper;