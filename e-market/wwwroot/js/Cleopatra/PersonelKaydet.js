$(document).ready(function () {
    //image işlemleri
    $("#kurRes").click(function () {
        $("#KurumResimUrl").attr("src", "/img/_image.svg");
        $('#KurumResimUrl').attr("medyaid", 0);
    });

    $("#KurumResimUrl").click(function () {
        $("#KurumLogo").click();
    });
    var imageCropper;
    $("#KurumLogo").on("change", function () {
        $("#imageCrop").cropper('destroy')
        if (document.getElementById("KurumLogo").files.length) {
            var file = document.getElementById("KurumLogo").files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                var data = event.target.result;
                $("#imageCrop").attr("src", data);
                setTimeout(function () {
                    $("#imageCrop").cropper();
                    imageCropper = $("#imageCrop").data("cropper");
                }, 300)
            };
            reader.readAsDataURL(file);
            $("#modalCropper").modal("show");
        }
    })
    $("#imageCropSave").click(function () {
        imageCropper.crop();
        var data = imageCropper.getCroppedCanvas().toDataURL("image/png");
        var fileName = $("#KurumLogo").val().split("\\").pop();
        var file = dataURLtoFile(data, fileName)

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
                //$('#KurumResimUrl').attr("src", $("#site-urlMedya").val() + url);
                //$('#KisiResimUrl').attr("src", "http://77.92.105.18:51305" + url);
                //$('#KisiResimUrl').attr("src", "http://172.16.31.10:51305" + url);
                //$('#KisiResimUrl').attr("src", "http://localhost:51305" + url);
                $('#KurumResimUrl').attr("medyaid", id);
                $("#KurumLogo").val('')
            },
            error: function (e) {
                console.log(e);
                errorHandler(e);
            }
        });

        $("#imageCrop").cropper('destroy')
        $("#modalCropper").modal("hide");
    })
    //image işlemleri

    $(".tabs li a").click(function () {

        // Active state for tabs
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");

        // Active state for Tabs Content
        $(".tab_content_container > .tab_content_active").removeClass("tab_content_active").fadeOut(200);
        $(this.rel).fadeIn(500).addClass("tab_content_active");

    });
    //geçici fonk'lar

    $("#pozisyonx1").change(function () {
        HideAllDivs();
        selectedValue = $("#pozisyonx1").val();
        if (selectedValue == 0) {
            HideAllDivs();
        }
        if (selectedValue == 1) {
            $("#dovmeRutbesi").show();
            $("#dovmeStilleri").show();
            $("#yuzdeDiv").show();
            $("#istisnaKomisyon").show();

        }
        else if (selectedValue == 2) {
            $("#tasarimRutbeleri").show();
            $("#tasarimStilleri").show();
            $("#yuzdeDiv").show();
            $("#istisnaKomisyon").show();
        }
        else if (selectedValue == 3) {
            $("#sorumluOlduguStudyolar").show();
            $("#yuzdeDiv").show();
            $("#istisnaKomisyon").show();
            $("#sorumluOlduguStudyolar").show();

        }

    });


});
function HideAllDivs() {
    $("#tasarimRutbeleri").hide();
    $("#tasarimStilleri").hide();
    $("#dovmeRutbesi").hide();
    $("#dovmeStilleri").hide();
    $("#yuzdeDiv").hide();
    $("#istisnaKomisyon").hide();
};