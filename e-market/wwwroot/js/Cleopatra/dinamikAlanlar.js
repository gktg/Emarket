function AlanOlustur(parametre) {
    var html = "";
    var tekdDeger = "";
    var cokluDeger = [];
    if (parametre.degerler.length) {
        tekdDeger = parametre.degerler[0].deger;
        cokluDeger = parametre.degerler.map(o => o.deger);
    }
    if (parametre.parametreTipi == 1) {
        if (parametre.parametreGosterimTipi == 1) {
            html += `<input dynamic="${parametre.parametreGosterimTipi}" value="${tekdDeger}" class="form-control" type="text" id="${parametre.tabloID}" placeholder="${parametre.parametreAdi}" required="${parametre.zorunluMu}"/>`;
        } else if (parametre.parametreGosterimTipi == 2) {
            html += `<textarea dynamic="${parametre.parametreGosterimTipi}" class="form-control" id="${parametre.tabloID}" placeholder="${parametre.parametreAdi}" required="${parametre.zorunluMu}">${tekdDeger}</textarea>`;
        } else if (parametre.parametreGosterimTipi == 3) {
            html += `<input dynamic="${parametre.parametreGosterimTipi}" value="${tekdDeger}" class="form-control" type="number" id="${parametre.tabloID}" placeholder="${parametre.parametreAdi}" required="${parametre.zorunluMu}"/>`;
        } else if (parametre.parametreGosterimTipi == 4) {
            html += `<input dynamic="${parametre.parametreGosterimTipi}" value="${tekdDeger}" class="form-control" type="date" id="${parametre.tabloID}" placeholder="${parametre.parametreAdi}" required="${parametre.zorunluMu}"/>`;
        }
    }
    else if (parametre.parametreTipi == 2) {
        var olasiDegerler = parametre.olasiDegerler;
        if (parametre.parametreGosterimTipi == 5) {
            var olasiDegerHtml = '<option value="0">' + siteLang.Choose + '</option>';
            for (var i = 0; i < olasiDegerler.length; i++) {
                var seciliMi = olasiDegerler[i].tabloID == tekdDeger ? "selected" : "";
                olasiDegerHtml += `<option ${seciliMi} value="${olasiDegerler[i].tabloID}">${olasiDegerler[i].olasiDegerAdi}</option>`
            }

            html += `<select dynamic="${parametre.parametreGosterimTipi}" id="${parametre.tabloID}" class="form-control" style="width: 100%;" required="${parametre.zorunluMu}">
                           ${olasiDegerHtml}
                     </select>`;
        } else if (parametre.parametreGosterimTipi == 6) {
            var olasiDegerHtml = '';
            for (var i = 0; i < olasiDegerler.length; i++) {
                var seciliMi = cokluDeger.includes(olasiDegerler[i].tabloID.toString()) ? "selected" : "";
                olasiDegerHtml += `<option ${seciliMi} value="${olasiDegerler[i].tabloID}">${olasiDegerler[i].olasiDegerAdi}</option>`
            }

            html += `<select multiple dynamic="${parametre.parametreGosterimTipi}" id="${parametre.tabloID}" class="form-control" style="width: 100%;" required="${parametre.zorunluMu}">
                           ${olasiDegerHtml}
                     </select>`;
        } else if (parametre.parametreGosterimTipi == 7) {
            var olasiDegerHtml = '';
            for (var i = 0; i < olasiDegerler.length; i++) {
                var seciliMi = cokluDeger.includes(olasiDegerler[i].tabloID.toString()) ? "checked" : "";
                olasiDegerHtml += `<input ${seciliMi} type="radio" name="${parametre.tabloID}" value="${olasiDegerler[i].tabloID}" />${olasiDegerler[i].olasiDegerAdi}<br/>`
            }

            html += `<div dynamic="${parametre.parametreGosterimTipi}" id="${parametre.tabloID}" style="width: 100%;" required="${parametre.zorunluMu}">
                           ${olasiDegerHtml}
                     </div>`;
        } else if (parametre.parametreGosterimTipi == 8) {
            var olasiDegerHtml = '';
            for (var i = 0; i < olasiDegerler.length; i++) {
                var seciliMi = cokluDeger.includes(olasiDegerler[i].tabloID.toString()) ? "checked" : "";
                olasiDegerHtml += `<input ${seciliMi} type="checkbox" name="${parametre.tabloID}" value="${olasiDegerler[i].tabloID}" />${olasiDegerler[i].olasiDegerAdi}<br/>`
            }

            html += `<div dynamic="${parametre.parametreGosterimTipi}" id="${parametre.tabloID}" style="width: 100%;" required="${parametre.zorunluMu}">
                           ${olasiDegerHtml}
                     </div>`;
        }
    }
    else if (parametre.parametreTipi == 3) {
        if (parametre.parametreGosterimTipi == 9) {
            html += `<input dynamic="${parametre.parametreGosterimTipi}" class="form-control InputSil fileInputEk" type="file" id="${parametre.tabloID}" deger="${tekdDeger}" required="${parametre.zorunluMu}"/>`;
            //<a href="#" style="display:none;" target="_blank" id="blah1"><img id="blah" style="display:none; src=" #" alt="Önizleme" width="200px;"/></a>
            if (tekdDeger) {
            /*    html += `<div><a target="_Blank" href="${$("#site-urlSocket").val()+tekdDeger}"><i class="far fa-file"></i> ${tekdDeger.split("/").pop().substring(32)}</a><span class="badge badge-danger" onclick="ekParametreDocRemove(this)"><i class="fas fa-trash"></i></span></div>`*/
            }
        }
    }

    var div = `<div class="col">
                   <div class="form-group">
                       <label  class='Lbl'>${parametre.parametreAdi}</label>
                       ${html}
                   </div>
               </div>`

    return div;
}

function ekParametreDocRemove(elm) {
    alertim.confirm(siteLang.SilOnay, "info",
        function () {
            $(elm).closest(".form-group").find("input").removeAttr("deger");
            $(elm).closest("div").remove();
        },
        function () {
            return;
        }
    )
}

function AlanGoster(parametre) {
    var html = "";
    var tekdDeger = "";
    var cokluDeger = [];
    if (parametre.degerler.length) {
        tekdDeger = parametre.degerler[0].deger;
        cokluDeger = parametre.degerler.map(o => o.deger);
    }
    if (parametre.parametreTipi == 1) {
        html += `<div>${tekdDeger}</div>`;
    }
    else if (parametre.parametreTipi == 2) {
        var olasiDegerler = parametre.olasiDegerler;
        for (var i = 0; i < olasiDegerler.length; i++) {
            var seciliMi = cokluDeger.includes(olasiDegerler[i].tabloID.toString());
            if (seciliMi) {
                html += `<div>${olasiDegerler[i].olasiDegerAdi}</div>`
            }
        }
    }
    else if (parametre.parametreTipi == 3) {
        if (tekdDeger) {
           /* html += `<div><a target="_Blank" href="${$("#site-urlSocket").val()+tekdDeger}"><i class="far fa-file"></i></i> ${tekdDeger.split("/").pop().substring(32)}</a></div>`*/
        }
    }

    var div = `<div class="col-md-6">
                   <div class="form-group">
                       <label>${parametre.parametreAdi}</label>
                       ${html}
                   </div>
               </div>`

    return div;
}

function AlanDegerleriniBul() {
    var list = [];
    $("[dynamic]").each(function () {
        var id = this.id;
        var tip = $(this).attr("dynamic");
        if (["1", "2", "3", "4", "5"].includes(tip)) {
            var value = $(this).val();
            list.push({ ParametreID: id, Deger: value });
        } else if (["6"].includes(tip)) {
            var value = $(this).val();
            for (var i = 0; i < value.length; i++) {
                list.push({ ParametreID: id, Deger: value[i] });
            }
        } else if (["7", "8"].includes(tip)) {
            var value = $(this).find(":checked");
            for (var i = 0; i < value.length; i++) {
                list.push({ ParametreID: id, Deger: $(value[i]).val() });
            }
        } else if (["9"].includes(tip)) {
            var files = this.files;
            if (files && files.length > 0) {
                var fd = new FormData();
                fd.append('file', files[0]);
                $.ajax({
                    url: "/panel/resimyukle/",
                    processData: false,
                    contentType: false,
                    type: "POST",
                    data: fd,
                    async: false,
                    success: function (data) {
                        var medyaid = data.value.tabloID;
                        var url = data.value.medyaUrl;
                        list.push({ ParametreID: id, Deger: url });
                    },
                    error: function () {
                        console.log("fail!");
                        alertim.toast(siteLang.Hata, alertim.types.warning);
                    }
                });
            } else if ($(this).attr("deger")) {
                list.push({ ParametreID: id, Deger: $(this).attr("deger") });
            }
        }
    });

    return list;
}

function ZorunluAlanaLabelEkle() {
    var str = "<label class='zorunluAlanLabel'> *Doldurulması zorunlu alandır.<label>";
    $('[required="true"]').each(function (i, e) {
        $(e).after(str);
    });
}