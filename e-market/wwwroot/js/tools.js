// Created by Serhat Şahal
$(function () {
    var tabtitle = $qs("[icerikid],h1,h2,h3").text() || "";
    if (tabtitle)
        $("title").first().html(tabtitle);
});

///---Tool---///
function qstring(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var postCaches = []
function Post(url, data, fnsuccess, fnerror, async, cache) {
    var key = "";
    if (cache) {
        key = url + "+" + JSON.stringify(data);

        var c = postCaches.findBy("key", key);
        if (c) {
            return fnsuccess(c.rdata);
        }
    }

    if (data == null || data == undefined)
        data = "{}";
    if (async !== false)
        async = true

    

    new $.ajax({
        type: "POST",
        url: url,
        data: data,
        async: async,
        dataType: "json",

        success: function (rdata) {
            if (cache) {
                postCaches.push({ key, rdata })
            }
            if (fnsuccess != null) {
                return fnsuccess(rdata);
            }
        },
        error: function (rdata) {
            if (cache) {
                postCaches.push({ key, rdata })
            }
            if (fnerror != null) {
                return fnerror(rdata);
            }
            console.log({ url: url, data: data, err: rdata });
        }
    })
}

function Get(url, fnsuccess, fnerror, async, cache) {
    var key = "";
    if (cache) {
        key = url;

        var c = postCaches.findBy("key", key);
        if (c) {
            return fnsuccess(c.rdata);
        }
    }

    if (async !== false)
        async = true

    const sessionId = localStorage.getItem('sessionId')

    new $.ajax({
        type: "GET",
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionId ?? '',
        },
        async: async,
        data:null,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rdata) {
            if (cache) {
                postCaches.push({ key, rdata })
            }
            if (fnsuccess != null) {
                return fnsuccess(rdata);
            }
        },
        error: function (rdata) {
            if (cache) {
                postCaches.push({ key, rdata })
            }
            if (fnerror != null) {
                return fnerror(rdata);
            }
            console.log({ url: url, data: data, err: rdata });
        }
    })
}




function Linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
function getPageName() {
    return window.location.href.split('/')[window.location.href.split('/').length - 1];
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function formatHtml(html) {
    var tab = '\t';
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function (element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match(/^<?\w[^>]*[^\/]$/)) {
            indent += tab;
        }
    });

    return result.substring(1, result.length - 3);
}

///---Init Methods---///
function Numeric() {
    $(document).on("keydown", ".numeric", function (e) {
        if (jQuery.inArray(e.keyCode, [189, 46, 8, 9, 27, 13, 110 /*, 190 . nolta konmasını engellemek ının, 188*/]) !== -1 ||
            ((e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 86) && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) || (e.keyCode == 188) /* . nolta konmasını engellemek ının */ || (e.keyCode == 110) || (e.keyCode == 190)) {
            e.preventDefault();
        }
    });
}
function PreventSpace() {
    $(document).on("keydown", ".preventspace", function (e) {
        if (e.keyCode === 32)
            return false;
    });

    // if a space copied and pasted in the input field, replace it (remove it):
    $(document).on("change", ".preventspace", function (e) {
        this.value = this.value.replace(/\s/g, "");
    });
}
//Yalnızca alfabetik karakter ve boşluk için text input kontrolü
function AlphaAndSpace() {
    $(".onlyText").keypress(function (evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        //Bu şartımız ile harf girildiği takdirde true olarak geri dönüş sağlıyoruz.
        //Türkçe karakter desteği için ascii kod şartları aşağıya eklenmiştir.
        if (((charCode <= 93 && charCode >= 65) || (charCode <= 122 && charCode >= 97) || charCode == 8) || charCode == 350 || charCode == 351 || charCode == 304 || charCode == 286 || charCode == 287 || charCode == 231 || charCode == 199 || charCode == 305 || charCode == 214 || charCode == 246 || charCode == 32 || charCode == 220 || charCode == 252) {
            return true;
        }
        //if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode == 32)) {
        //    return true;
        //}
        return false;
    });
}

function Email() {
    $(".onlyEmail").keypress(function (e) {
        var re = /[A-Z0-9a-z@\._]/.test(e.key);
        if (!re) {
            return false;
        }
        return true;
    });
}
// Belirtilen ondalık ayracın yazımına izin veren numeric fonksiyonu 28.04.2020 //Mustafa Can Semerci
function NumericWSelect(ayrac) {
    $(document).on("keydown", ".numeric", function (e) {
        var binlikAyrac = ayrac == "nokta" ? 190 : 188;
        var ondalikAyrac = ayrac == "nokta" ? 188 : 190;
        if (jQuery.inArray(e.keyCode, [109, 189, 46, 8, 9, 27, 13, 110, ondalikAyrac /*, 190 . nolta konmasını engellemek ının, 188*/]) !== -1 ||
            ((e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 86) && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) || (e.keyCode == 110) || (e.keyCode == binlikAyrac)) {
            e.preventDefault();
        }
    });
};
function DisableEnter() {
    $("input:not(textarea,[searchp],[searchbtn])").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
}
function basicDate() {
    $('.basicDate').dateEntry({ dateFormat: 'dmy.', useMouseWheel: false });
}
function basicTime() {
    $('.basicTime').timeEntry({ show24Hours: true, useMouseWheel: false });
}
function basicDateTime() {
    $('.basicDateTime').datetimeEntry({ datetimeFormat: 'D.O.Y H:M', useMouseWheel: false });
}
function DateTimeDrop() {
    jQuery('.datetimedrop').bootstrapMaterialDatePicker({ format: 'DD.MM.YYYY HH:mm', lang: 'tr' });
    jQuery('.datedrop').bootstrapMaterialDatePicker({ format: 'DD.MM.YYYY', lang: 'tr', time: false });
    jQuery('.timedrop').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm', lang: 'tr' });
}
var option = "<option value={0}>{1}</option>";
var optionProp = "<option value={0} title={2}>{1}</option>";
var optionImg = "<option value={0} img={2}>{1}</option>";
function Select2Destroy(alan) {
    $(alan).find(".field-select2.select2-hidden-accessible").select2("destroy");
}
function SetSelect2(alan) {
    if (!alan) {
        alan = document;
    }
    $(alan).find(".field-select2:not(.select2-hidden-accessible)").select2();
}

$.fn.SetSelect2Post = function (url, object, text, id) {
    this.each(function () {
        $(this).select2({
            ajax: {
                url: url,
                dataType: 'json',
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                quietMillis: 100,
                data: function (term) {
                    // return data
                    object.term = term.term;
                    return JSON.stringify(object)
                },
                processResults: function (data) {
                    return {
                        results: $.map(data.d, function (item) {
                            return {
                                text: item[text],
                                slug: item[text],
                                id: item[id]
                            }
                        })
                    };
                },
            },
            minimumInputLength: 3,
        });
    });
};

//function SetSelect2Post(url, data, fnsuccess, fnerror, async, cache) {
//    var key = "";
//    if (cache) {
//        key = url + "+" + JSON.stringify(data);

//        var c = select2PostCaches.findBy("key", key);
//        if (c) {
//            return fnsuccess(c.rdata);
//        }
//    }

//    if (data == null || data == undefined)
//        data = "{}";
//    if (async !== false)
//        async = true

//    new $.ajax({
//        type: "POST",
//        url: url,
//        data: data,
//        async: async,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        success: function (rdata) {
//            if (cache) {
//                select2PostCaches.push({ key, rdata })
//            }
//            if (fnsuccess != null) {
//                return fnsuccess(rdata);
//            }
//        },
//        error: function (rdata) {
//            if (cache) {
//                select2PostCaches.push({ key, rdata })
//            }
//            if (fnerror != null) {
//                return fnerror(rdata);
//            }
//            console.log({ url: url, data: data, err: rdata });
//        }
//    })
//}

function CkEditor() {
    $(".richtext").each(function (i, e) {
        ckeditorInline(e);
    })
}
//CKeditor oluşturan fonksiyon /Mustafa Can Semerci, 09.03.2020/
function ckeditorInline(introElem) {
    InlineEditor
        .create(introElem, {
            startupFocus: true
        })
        .then(newEditor => {
            editor.pop();
            editor.Destroy();
            editor.push(newEditor);
        })
        .catch(error => {
            console.log(error);
        });
}
//Ckeditor class ve attr değerlerini temizleme fonksiyonu
function cleanCKeditors() {
    var elem = $('.c, .h, .f').find(".ck");
    $(elem).each(function (i, divs) {
        $.each(elem[i].attributes, function (index, attribute) {
            var attr = elem[i].attributes;
            if ((attr.name != undefined && attr.name != "icerikdilid") && (attr.name != undefined && attr.name != "tip") && (attr.name != undefined && attr.name != "style")) {
                $(elem).removeAttr(attr.name);
            }
        });
    });
    $(elem).removeAttr("lang");
}
function cleanCKeditor(elem) {
    InlineEditor
        .create(elem, {
            startupFocus: true
        })
        .then(newEditor => {
            newEditor.Destroy();
        })
        .catch(error => {
            console.log(error);
        });
    // $(elem).each(function (i, divs) {
    //     $.each(elem.attributes, function (index, attribute) {
    //         var attr = elem.attributes;
    //         if ((attr.name != undefined && attr.name != "icerikdilid") && (attr.name != undefined && attr.name != "tip") && (attr.name != undefined && attr.name != "style")) {
    //             $(elem).removeAttr(attr.name);
    //         }
    //     });
    //// });
    // $(elem).removeAttr("lang");
}

function destroyCKeditors(introElem) {
    InlineEditor.create(introElem)
        .then(editor => editor.destroy())
        .catch(err => console.log(err));
}

///---Global Methods---///
$.multipress = function (keys, handler) {
    'use strict';

    if (keys.length === 0) {
        return;
    }

    var down = {};
    jQuery(document).keydown(function (event) {
        down[event.keyCode] = true;
    }).keyup(function (event) {
        // Copy keys array, build array of pressed keys
        var remaining = keys.slice(0),
            pressed = Object.keys(down).map(function (num) { return parseInt(num, 10); }),
            indexOfKey;
        // Remove pressedKeys from remainingKeys
        jQuery.each(pressed, function (i, key) {
            if (down[key] === true) {
                down[key] = false;
                indexOfKey = remaining.indexOf(key);
                if (indexOfKey > -1) {
                    remaining.splice(indexOfKey, 1);
                }
            }
        });
        // If we hit all the keys, fire off handler
        if (remaining.length === 0) {
            handler(event);
        }
    });
}
$.doublepress = function (key, handler) {
    var dblCtrlKey = 0;
    jQuery(document).keyup(function (event) {
        if (dblCtrlKey != 0 && event.keyCode == key) {
            handler(event);
        } else {
            dblCtrlKey = setTimeout(function () { dblCtrlKey = 0; }, 350);
        }
    });
}

///---Element Methods---///
$.fn.bindFirst = function (name, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.on(name, fn);

    // Thanks to a comment by @Martin, adding support for
    // namespaced events too.
    this.each(function () {
        var handlers = $._data(this, 'events')[name.split('.')[0]];
        console.log(handlers);
        // take out the handler we just inserted from the end
        var handler = handlers.pop();
        // move it at the beginning
        handlers.splice(0, 0, handler);
    })
}
$.fn.bindLast = function (name, attr, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.on(name, fn);

    // Thanks to a comment by @Martin, adding support for
    // namespaced events too.
    this.each(function () {
        var handlers = $._data(this, 'events')[name.split('.')[0]];
        console.log(handlers);
        // take out the handler we just inserted from the end
        var handler = handlers.pop();
        // move it at the beginning
        handler.selector = "[" + attr + "]";
        handlers.splice(handlers.length, 0, handler);
    })
}
$.fn.nearest = function (selector, exclude, isFirst) {
    if (isFirst !== false) {
        var $el = $qa(selector);
        if ($el.length == 1) {
            return $el
        } else if ($el.length == 0) {
            return $();
        }
    }
    var elem = this.get(0);
    if (elem == undefined)
        return $();

    var varMi = elem.querySelector(selector);
    if (varMi) {
        if (exclude) {
            var $select = $(this).find(selector).filter(function (elem) {
                return !$(this).closest(".nearestexclude").length
            });
            if ($select.length) {
                return $select
            } else {
                var $parent = $(this).parent();
                if ($parent.length) {
                    return $parent.nearest(selector, exclude, false);
                } else {
                    return $();
                }
            }
        } else {
            return $(this).find(selector);
        }
    } else {
        var $parent = $(this).parent();
        if ($parent.length) {
            return $parent.nearest(selector, exclude, false);
        } else {
            return $();
        }
    }
}
$.fn.nearestSingle = function (selector, isFirst) {
    if (isFirst !== false) {
        var $el = $qa(selector);
        if ($el.length == 1) {
            return $el
        } else if ($el.length == 0) {
            return $();
        }
    }
    var elem = this.get(0);
    if (elem == undefined)
        return $();

    var varMi = elem.querySelector(selector);
    if (varMi) {
        return $(varMi);
    } else {
        var $parent = $(this).parent();
        if ($parent.length) {
            return $parent.nearestSingle(selector, false);
        } else {
            return $();
        }
    }
}
$.fn.loader = function (show) {
    var overlay = '<div class="overlay"><i class="fas fa-sync fa-spin fa-2x"></i></div>';
    if (show) {
        $(this).append(overlay);
    } else {
        $(this).find(".overlay").remove();
    }
}
$.fn.single = function (selector) {
    var elm = $(this).get(0);
    if (elm) {
        return $(elm.querySelector(selector));
    } else {
        return $()
    }
}
$.fn.html2 = function (elem) {
    var $e = $(elem);
    var id = random.all(10);
    $e.attr("benzersiz", id);
    $(this).html($e);
    var $newElm = $(this).find("[benzersiz='" + id + "']");
    $newElm.removeAttr("benzersiz");
    return $newElm;
}
$.fn.append2 = function (elem) {
    var $e = $(elem);
    var id = random.all(10);
    $e.attr("benzersiz", id);
    $(this).append($e);
    var $newElm = $(this).find("[benzersiz='" + id + "']");
    $newElm.removeAttr("benzersiz");
    return $newElm;
}
$.fn.after2 = function (elem) {
    var $e = $(elem);
    var id = random.all(10);
    $e.attr("benzersiz", id);
    $(this).after($e);
    var $newElm = $(document).single("[benzersiz='" + id + "']");
    $newElm.removeAttr("benzersiz");
    return $newElm;
}

$.fn.hasAttr = function (name) {
    return (this.attr(name) !== undefined && this.attr(name) !== false);
};

///---String---///
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}
String.prototype.replaceAll = function (search, replacement) {
    //return this.replace(new RegExp(search, 'g'), replacement);
    return this.split(search).join(replacement);
};
String.prototype.recursiveTekilestir = function (target) {
    var source = target + target;
    var str = this;
    str = str.replace(source, target);
    if (str.includes(source)) {
        str = str.recursiveTekilestir(target);
    }
    return str;
}
String.prototype.sondanKes = function () {
    return this.split(/\-(?=[^\-]+$)/)[0]
}

///---Number---///
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function yuvarla(sayi, hane) {
    return Number(Math.round(sayi + 'e' + hane) + 'e-' + hane);
}
// binlik ve ondalık ayraç türüne göre numberFormat fonksiyonu. /28.03.2020 Mustafa Can Semerci
function formatBinlikKusuratsiz(nStr, ayrac, decimal) {
    var binlik;
    var binlikRep;
    var ondalik;

    if (ayrac == "nokta") {
        binlik = '.';
        ondalik = ',';
        binlikRep = /\./g;
        //nStr = nStr.replace(/\,/g, '')
        //nStr += '';
    } else {
        binlik = ',';
        ondalik = '.';
        binlikRep = /\,/g;
        //nStr = nStr.replace(/\./g, '')
        //nStr += '';
    }
    nStr = nStr.replace(binlikRep, '');
    nStr += '';
    var x = nStr.split(ondalik);
    var x1 = x[0];
    var x2 = x.length > 1 ? ondalik + x[1].slice(0, decimal) : '';

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + binlik + '$2');
    }
    if (decimal == "0") {
        return x1
    }
    return x1 + x2;
    //return (x1 + x2).toFixed(decimal); input değer 1.200 formatındaysa
};
//Binlik Ayraç sayım Fonksiyonu 01.04.2020 Mustafa Can Semerci
function AyracCount(value, ayrac) {
    if (ayrac == "nokta") {
        return (value.match(/\./g) || []).length;
    }
    else {
        return (value.match(/\,/g) || []).length;
    }
}
//numerik input veri girişinde formatNumber methodu küsüratlı sayı kabul etmediği için verinin ayraçlarını temizleme methodu
//Ekleyen ayrıntıları: Mustafa Can Semerci 26.03.2020
function ayraclariTemizle(deger) {
    var binlik;
    var ondalik;
    var nDeger = "";
    var regexNokta = new RegExp(/\./g);
    var regexVirgul = new RegExp(/\,/g);

    if (deger.match(regexNokta) != null && deger.match(regexVirgul) != null && deger.match(regexNokta).length > deger.match(regexVirgul).length) {
        binlik = /\./g;
        ondalik = /\,/g;
    } else if (deger.match(regexNokta) != null && deger.match(regexVirgul) && deger.match(regexNokta).length == deger.match(regexVirgul).length) {
        var virgulIndex = deger.lastIndexOf(/\,/g);
        var noktaIndex = deger.lastIndexOf(/\./g);
        if (virgulIndex > noktaIndex) {
            binlik = /\./g;
            ondalik = /\,/g;
        } else {
            binlik = /\,/g;
            ondalik = /\./g;
        }
    }
    for (i = 0; i < deger.length; i++) {
        if (deger.charAt(i) !== ondalik && deger.charAt(i) != binlik) {
            nDeger += deger.charAt(i);
        }
        else if (deger.charAt(i) == ondalik) {
            i++;
            if (deger.charAt(i) !== 0) {
                nDeger += deger.charAt(i);
            } else if (deger.charAt(i) == 0 && deger.charAt(i - 1) != 0) {
                nDeger += deger.charAt(i);
            }
        }
        var ondalikAyrac = ondalik == /\,/g ? "." : ".";
        sonuc = nDeger.replaceAll(/\,/g, ondalikAyrac);
    }
    sonuc = parseFloat(sonuc);
    return sonuc;
};      //Melek Şen tarafından yapılan numeric işlemler sırasında kullanılan parseFloat() methodu ondalık ayracı olarak virgül kabul etmediği için sayıyı alıp, binlik ayraçlarını temizleyip, ondalık ayracını nokta yapacak hale getirildi.
//Melek Şen & Mustafa Can Semerci 07.05.2020

function denemeFormatBinlikKusuratsiz(nStr, ayrac, decimal) {
    var binlik;
    var binlikRep;
    var ondalik;

    if (nStr.indexOf(",") != -1) {
        var dgr = nStr.split(",");
        dgr[1].length;
    }

    if (ayrac == "nokta") {
        binlik = '.';
        ondalik = ',';
        binlikRep = /\./g;
        //nStr = nStr.replace(/\,/g, '')
        //nStr += '';
    } else {
        binlik = ',';
        ondalik = '.';
        binlikRep = /\,/g;
        //nStr = nStr.replace(/\./g, '')
        //nStr += '';
    }
    nStr = nStr.replace(binlikRep, '');
    nStr += '';
    var x = nStr.split(ondalik);
    var x1 = x[0];
    var x2 = x.length > 1 ? ondalik + x[1].slice(0, decimal) : '';

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + binlik + '$2');
    }
    if (decimal == "0") {
        return x1
    }
    return x1 + x2;
};

///---Array---///
//Array.prototype.dropDoldur = function (value, text, first) {
//    var gelen = String.format(option, "0", "Select");
//    if (first === null)
//        gelen = "";
//    if (typeof first == 'string')
//        gelen = String.format(option, "0", first);

//    for (var i = 0; i < this.length; i++) {
//        gelen += String.format(option, this[i][value], this[i][text]);
//    }
//    return gelen;
//}//Kullanılmıyor
//Array.prototype.dropDoldurMultiple = function (value, text, first) {
//    var gelen = String.format(option, "0", "Select");
//    if (first === null)
//        gelen = "";
//    if (typeof first == 'string')
//        gelen = String.format(option, "0", first);

//    for (var i = 0; i < this.length; i++) {
//        var textcombine = "";
//        for (var j = 0; j < text.length; j++) {
//            textcombine = textcombine + " ---- " + (this[i][text[j]] == null ? "**" : this[i][text[j]]) + " ";
//        }

//        gelen += String.format(option, this[i][value], textcombine);
//    }
//    return gelen;
//}//Kullanılmıyor
//Array.prototype.dropDoldurProp = function (value, text, prop, first) {
//    var gelen = String.format(option, "0", "Select");
//    if (first === null)
//        gelen = "";
//    if (typeof first == 'string')
//        gelen = String.format(optionProp, "0", first);

//    for (var i = 0; i < this.length; i++) {
//        gelen += String.format(optionProp, this[i][value], this[i][text], this[i][prop]);
//    }
//    return gelen;
//}//Kullanılmıyor
//Array.prototype.dropDoldurImg = function (value, text, prop, first) {
//    var gelen = String.format(option, "0", "Select");
//    if (first === null)
//        gelen = "";
//    if (typeof first == 'string')
//        gelen = String.format(optionImg, "0", first);

//    for (var i = 0; i < this.length; i++) {
//        gelen += String.format(optionImg, this[i][value], this[i][text], this[i][prop]);
//    }
//    return gelen;
//}//Kullanılmıyor
//Array.prototype.pushIfNotExist = function (obj, prop) {
//    for (var i = 0; i < this.length; i++) {
//        if (this[i][prop] === obj[prop])
//            return;
//    }
//    this.push(obj);
//}//Kullanılmıyor
//Array.prototype.findBy = function (prop, val) {
//    for (var i = 0; i < this.length; i++) {
//        if (this[i][prop] == val) {
//            return this[i];
//        }
//    }
//}
//Array.prototype.findByReturnList = function (prop, val, opr) {
//    var fboperators = {
//        '>': function (a, b) { return a > b },
//        '<': function (a, b) { return a < b },
//        '=': function (a, b) { return a == b },
//        '!=': function (a, b) { return a != b },
//        '<=': function (a, b) { return a <= b },
//        '>=': function (a, b) { return a >= b },
//        'in': function (a, b) { return b.includes(a) },
//        'reversein': function (a, b) { return a.includes(b) },
//        'notin': function (a, b) { return !(b.includes(a)) },
//        'like': function (a, b) { var reg = new RegExp(b.toLowerCase(), 'g'); a = a.toLowerCase(); return (a.match(reg) != null) },
//        '': function (a, b) { return false }
//    };

//    if (opr == undefined)
//        opr = "=";

//    var list = [];
//    for (var i = 0; i < this.length; i++) {
//        var sorgu = fboperators[opr](this[i][prop], val)
//        if (sorgu) {
//            list.push(this[i]);
//        }
//    }
//    return list;
//}
//Array.prototype.findByStartWithReturnList = function (prop, val) {
//    var list = [];
//    for (var i = 0; i < this.length; i++) {
//        if (this[i][prop].startsWith(val)) {
//            list.push(this[i]);
//        }
//    }
//    return list;
//}//Kullanılmıyor
//Array.prototype.removeBy = function (prop, val) {
//    for (var i = 0; i < this.length; i++) {
//        if (this[i][prop] == val) {
//            this.splice(i, 1);
//            i--;
//        }
//    }
//}//Kullanılmıyor
//Array.prototype.naturalSort = function () {
//    function naturalCompare(a, b) {
//        var ax = [], bx = [];

//        // Replace guid
//        a = a.replace(/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g, '');
//        b = b.replace(/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g, '');

//        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
//        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

//        while (ax.length && bx.length) {
//            var an = ax.shift();
//            var bn = bx.shift();
//            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
//            if (nn) return nn;
//        }

//        return ax.length - bx.length;
//    }

//    return this.sort(naturalCompare);
//}//Kullanılmıyor
//Array.prototype.sortBy = function (key) {
//    return this.sort(function (a, b) {
//        var x = a[key]; var y = b[key];
//        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//    });
//}//Kullanılmıyor
//Array.prototype.move = function (from, to) {
//    this.splice(to, 0, this.splice(from, 1)[0]);
//};//Kullanılmıyor
//Array.prototype.unique = function () {
//    return Array.from(new Set(this));
//}//Kullanılmıyor
//Array.prototype.uniqueObjects = function (props) {
//    if (props) {
//        function compare(a, b) {
//            var prop;
//            if (props) {
//                for (var j = 0; j < props.length; j++) {
//                    prop = props[j];
//                    if (a[prop] != b[prop]) {
//                        return false;
//                    }
//                }
//            } else {
//                for (prop in a) {
//                    if (a[prop] != b[prop]) {
//                        return false;
//                    }
//                }
//            }
//            return true;
//        }
//        return this.filter(function (item, index, list) {
//            for (var i = 0; i < index; i++) {
//                if (compare(item, list[i])) {
//                    return false;
//                }
//            }
//            return true;
//        });
//    } else {
//        var uniq = new Set(this.map(e => JSON.stringify(e)));
//        return Array.from(uniq).map(e => JSON.parse(e));
//    }
//}
//Array.prototype.uniqueObjectsBy = function (prop) {
//    //var uniqueList = []
//    //for (var i = 0; i < this.length; i++) {
//    //    if (this[i][prop] !== undefined) {
//    //        if (!uniqueList.findBy(prop, this[i][prop])) {
//    //            uniqueList.push(this[i])
//    //        }
//    //    }
//    //}
//    //return uniqueList;

//    var uniqueList = []
//    var set = new Set();
//    for (var i = 0; i < this.length; i++) {
//        if (this[i][prop] !== undefined && !set.has(this[i][prop])) {
//            uniqueList.push(this[i])
//            set.add(this[i][prop])
//        }
//    }
//    return uniqueList;
//};
//Array.prototype.intersect = function (list2, prop) {
//    if (!prop) {
//        var setB = new Set(this);
//        return [...new Set(list2)].filter(x => setB.has(x));
//    }

//    var result = [];
//    var list1 = this;

//    for (var i = 0; i < list1.length; i++) {
//        var item1 = list1[i],
//            found = false;
//        for (var j = 0; j < list2.length; j++) {
//            if (item1[prop] === list2[j][prop]) {
//                found = true;
//                break;
//            }
//        }
//        if (found === true) {
//            result.push(item1);
//        }
//    }
//    return result;
//}//Kullanılmıyor
//Array.prototype.diff = function (list2, prop) {
//    var result = [];
//    var list1 = this;

//    for (var i = 0; i < list1.length; i++) {
//        var item1 = list1[i],
//            found = false;
//        for (var j = 0; j < list2.length; j++) {
//            if (item1[prop] === list2[j][prop]) {
//                found = true;
//                break;
//            }
//        }
//        if (found === false) {
//            result.push(item1);
//        }
//    }
//    return result;
//}
//Array.prototype.union = function (list2, prop) {
//    var list1 = this;
//    return list1.concat(list2).uniqueObjectsBy(prop);
//}//Kullanılmıyor
//Array.prototype.findText = function (column, alan) {
//    //function findText(list,) {
//    var findtext = "";
//    var list = this.uniqueObjectsBy(column);
//    var gtid = "";
//    var id = "";
//    var dynid = "";
//    for (var j = 0; j < list.length; j++) {
//        // findtext += "[gtid^='" + list[j][column] + "-'],[id^='" + list[j][column] + "-'],[dynid^='" + list[j][column] + "-'] "
//        if ($(alan).find("[gtid^='" + list[j][column] + "-']").length) {
//            gtid += "[gtid^='" + list[j][column] + "-']";
//        }
//        if ($(alan).find("[dynid^='" + list[j][column] + "-']").length) {
//            dynid += "[dynid^='" + list[j][column] + "-']";
//        }
//        if ($(alan).find("[id^='" + list[j][column] + "-']").length) {
//            id += "[id^='" + list[j][column] + "-']";
//        }
//    }
//    findtext = (gtid == "" ? "" : gtid) + (dynid == "" ? "" : dynid) + (id == "" ? "" : id);
//    // findtext = findtext.substring(0, findtext.length - 1)
//    return findtext;
//}//Kullanılmıyor
//Array.prototype.DatadanTekrarliAlanBul = function (paramList) {
//    DatadakiTekrarliAlanveParametreleri(this);
//    ParametreUyusmaSayilari(paramList)
//    var datakapsar = ArrayGetMaxValue(DatadakiTekrarliAlanParametresiList, "count");

//    return datakapsar.count > 0 ? datakapsar.kapsarID : "";
//}//Kullanılmıyor
//Array.prototype.DatadanGruplamaDivBul = function (paramList) {
//    DatadakiGruplamaDivveParametreleri(this);
//    GruplamaDivParametreUyusmaSayilari(paramList)
//    var datakapsar = ArrayGetMaxValueReturnList(DatadakiGruplamaDivveParametreleriList, "count");

//    return datakapsar;
//}//Kullanılmıyor
//Array.prototype.asyncFor = function (fn, callback) {
//    var list = []
//    var array = this;
//    for (var i = 0; i < array.length; i++) {
//        var p = new Promise(function (resolve, reject) {
//            setTimeout(function (item) {
//                fn(item)
//                resolve();
//            }, 0, array[i])
//        })
//        list.push(p);
//    }

//    Promise.all(list).then(callback);
//}//K
//Array.prototype.valueControl = function (prmid, value) {
//    var array = this.findByReturnList("ParamID", prmid).findBy("Value", value);

//    return array;
//}//K
//Array.prototype.combineFilteredData = function (prop, list) {
//    var mergedata = [];
//    for (var i = 0; i < list.length; i++) {
//        mergedata = mergedata.concat(this.findByReturnList(prop, list[i]))
//    }
//    return mergedata;
//}//Kullanılmıyor
Array.prototype.sortByKeyAsc = function (key) {
    return this.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
Array.prototype.sortByKeyDesc = function (key) {
    return this.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
};
//}//Kullanılmıyor
//Array.prototype.ListBy = function (prop) {
//    var arr = [];
//    for (var i = 0; i < this.length; i++) {
//        arr.push(this[i][prop]);
//        //if (this[i][prop] == val) {
//        //    return this[i];
//        //}
//    }
//    return arr;
//}

function uniqueObjects(list) {
    var uniq = new Set(list.map(e => JSON.stringify(e)));
    return Array.from(uniq).map(e => JSON.parse(e));
}
function ArrayIntersect() {
    if (arguments.length == 1 || arguments.length == 0)
        return arguments[0];

    var l = arguments.length;
    for (var i = 0; i < l; i++) {
        if (arguments[i].length == 0)
            return [];
    }
    var t = SWStart();
    var jsons = []
    for (var i = 0; i < l; i++) {
        jsons.push(arguments[i].map(o => JSON.stringify(o)));
    }

    var f = jsons[0];
    for (var i = 1; i < l; i++) {
        var n = []
        for (var j = 0; j < f.length; j++) {
            if (jsons[i].indexOf(f[j]) != -1) {
                n.push(f[j]);
            }
        }
        f = n;
    }
    var ret = f.map(o => JSON.parse(o));
    t.SWStop(arguments.length + " array intersect");

    return ret;
}

///---Date---///
function CsharpDateToJsDate(csDate) {
    try {
        return new Date(parseInt(csDate.substr(6)));
    } catch (err) {
        return "";
    }
}
function CsharpDateToStringDate(csDate) {
    try {
        var date = CsharpDateToJsDate(csDate);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return dd + "." + mm + "." + yyyy;
    } catch (err) {
        return "";
    }
}
function CsharpDateToStringDateTime(csDate) {
    try {
        var date = CsharpDateToJsDate(csDate);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
    } catch (err) {
        return "";
    }
}
function CsharpStringDateToStringDateTime(csDate) {
    try {
        var date = StringDateTimeToJSDateTime(csDate);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
    } catch (err) {
        return "";
    }
}
function JSDateToStringDateTime(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
    } catch (err) {
        return "";
    }
}
function JSDateToStringDateTimeSecond(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min + ":" + sec;
    } catch (err) {
        return "";
    }
}
function JSDateToStringTime(date) {
    try {
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return hh + ":" + min;
    } catch (err) {
        return "";
    }
}
function JSDateToStringDate(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return dd + "." + mm + "." + yyyy;
    } catch (err) {
        return "";
    }
}
function JSDateToStringCSDate(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":" + sec;
    } catch (err) {
        return "";
    }
}
function JSDateToStringDateyyyymmdd(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return yyyy + "." + mm + "." + dd;
    } catch (err) {
        return "";
    }
}
function JS1DateToStringDateyyyymmdd(date) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return yyyy + "-" + mm + "-" + dd;
    } catch (err) {
        return "";
    }
}
function CSStringDateToStringddmmyyyyhhmm(dateStr) {
    try {
        var date = StringDateTimeToJSDateTime(dateStr);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
    } catch (err) {
        return "";
    }
}
function CSStringDateToStringddmmyyyy(dateStr) {
    try {
        var date = StringDateTimeToJSDateTime(dateStr);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return dd + "." + mm + "." + yyyy;
    } catch (err) {
        return "";
    }
}
function CSStringDateToStringddmmyyyyhhmmss(dateStr) {
    try {
        var date = StringDateTimeToJSDateTime(dateStr);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + min + ":" + sec;
    } catch (err) {
        return "";
    }
}
function CsharpDateToStringDateyyyymmdd(csDate) {
    try {
        var date = StringDateTimeToJSDateTime(csDate);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return yyyy + "-" + mm + "-" + dd;
    } catch (err) {
        return "";
    }
}
function CsharpDateToStringDateyyyymmddForProfile(csDate) {
    try {
        var date = StringDateTimeToJSDateTime(csDate);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return dd + "." + mm + "." + yyyy;// yyyy + "-" + mm + "-" + dd;
    } catch (err) {
        return "";
    }
}
function JSDateToStringDateForFormat(date, format) {
    try {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return dd + "." + mm + "." + yyyy;
    } catch (err) {
        return "";
    }
}
function StringDateToJSDate(stringDate) {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
    return date;
}
function StringDateToPrettyTime(stringDate) {
    var time = stringDate.substr(11, 18).split(":");
    return time[0] + siteLang.hour + time[1] + siteLang.min + time[2].split(".")[0] + siteLang.sec;
}
function StringDateToPrettyDateTime(stringDate) {
    let days = new Date().diff(new Date(stringDate.substr(0, 10)), "d");
    let time = stringDate.substr(11, 18).split(":");
    return days + siteLang.day + time[0] + siteLang.hour + time[1] + siteLang.min + time[2].split(".")[0] + siteLang.sec;
}
function AddBusinessDays(numAdd, date) {
    //***26.04.2019***-----Resmi izin günleri için kontrol eklenmiştir. M.Ş. Eski kod yorum satırına alınmıştır.
    //var dataAvui = date ? new Date(date.getTime()) : new Date()
    //if (numAdd > 0) {
    //    for (var i = 0; i < numAdd; i++) {
    //        var dataTemp = dataAvui
    //        dataTemp.setDate(dataTemp.getDate() + 1)
    //        if (dataTemp.getDay() == 6) {
    //            dataTemp.setDate(dataTemp.getDate() + 2)
    //        } else if (dataTemp.getDay() == 0) {
    //            dataTemp.setDate(dataTemp.getDate() + 1)
    //        }
    //        dataAvui = dataTemp
    //    }
    //}
    //else if (numAdd < 0) {
    //    for (var i = numAdd; i < 0; i++) {
    //        var dataTemp = dataAvui
    //        dataTemp.setDate(dataTemp.getDate() - 1)
    //        if (dataTemp.getDay() == 6) {
    //            dataTemp.setDate(dataTemp.getDate() - 1)
    //        } else if (dataTemp.getDay() == 0) {
    //            dataTemp.setDate(dataTemp.getDate() - 2)
    //        }
    //        dataAvui = dataTemp
    //    }
    //}
    //***26.04.2019***----------------------------------------------------

    //------------Holiday bölümü------------//
    var holidays = [
        '4/23',//23 Nisan
        '5/1',//1 Mayıs
    ];

    var dataAvui = date ? new Date(date.getTime()) : new Date()
    if (numAdd > 0) {
        for (var i = 0; i < numAdd; i++) {
            var dataTemp = dataAvui
            dataTemp.setDate(dataTemp.getDate() + 1)

            //------------Holiday bölümü------------//
            var dayOfMonth = dataTemp.getDate(),
                month = dataTemp.getMonth() + 1,
                monthDay = month + '/' + dayOfMonth;
            if (holidays.indexOf(monthDay) > -1) {
                dataTemp.setDate(dataTemp.getDate() + 1)
            }
            //------------Holiday bölümü------------//

            if (dataTemp.getDay() == 6) {
                dataTemp.setDate(dataTemp.getDate() + 2)
            } else if (dataTemp.getDay() == 0) {
                dataTemp.setDate(dataTemp.getDate() + 1)
            }
            dataAvui = dataTemp
        }
    }
    else if (numAdd < 0) {
        for (var i = numAdd; i < 0; i++) {
            var dataTemp = dataAvui
            dataTemp.setDate(dataTemp.getDate() - 1)

            //------------Holiday bölümü------------//
            var dayOfMonth = dataTemp.getDate(),
                month = dataTemp.getMonth() + 1,
                monthDay = month + '/' + dayOfMonth;

            if (holidays.indexOf(monthDay) > -1) {
                dataTemp.setDate(dataTemp.getDate() - 1)
            }
            //------------Holiday bölümü------------//

            if (dataTemp.getDay() == 6) {
                dataTemp.setDate(dataTemp.getDate() - 1)
            } else if (dataTemp.getDay() == 0) {
                dataTemp.setDate(dataTemp.getDate() - 2)
            }
            dataAvui = dataTemp
        }
    }
    return dataAvui;
}
function IsGunuEkle(gunSayisi, tarih) {
    var post = JSON.stringify({ tarih: tarih, kacIsGun: gunSayisi });
    Post("/WebServices/KosulKontrolService.asmx/TatilGunleriGetir", post, function (gelen) {
        tarih = gelen.d;
    }, function (err) {
        console.log(err);
    }, false, true);

    return tarih.replaceAll("-", ".");
}
function GetBusinessDatesCount(startDate, endDate) {
    var count = 0;
    var curDate = startDate;
    while (curDate <= endDate) {
        var dayOfWeek = curDate.getDay();
        if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
            count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}
function dateFromWeekNumber(year, week) {
    var d = new Date(year, 0, 1);
    var dayNum = d.getDay();
    var diff = --week * 7;

    // If 1 Jan is Friday to Sunday, go to next week
    if (!dayNum || dayNum > 4) {
        diff += 7;
    }

    // Add required number of days
    d.setDate(d.getDate() - d.getDay() + ++diff);
    return d;
}

function formatDateTimeGet(dateTime, format) {
    //format 1y-10m-3w-4d-10h-5min

    var formYear = format.substring(format.substring(0, format.indexOf("y")).lastIndexOf("-") + 1, format.indexOf("y"));

    var formMonth = format.substring(format.substring(0, format.indexOf("m")).lastIndexOf("-") + 1, format.indexOf("m"));

    var formWeek = format.substring(format.substring(0, format.indexOf("w")).lastIndexOf("-") + 1, format.indexOf("w"));

    var formDay = format.substring(format.substring(0, format.indexOf("d")).lastIndexOf("-") + 1, format.indexOf("d"));

    var formHour = format.substring(format.substring(0, format.indexOf("h")).lastIndexOf("-") + 1, format.indexOf("h"));

    var formMin = format.substring(format.substring(0, format.indexOf("min")).lastIndexOf("-") + 1, format.indexOf("min"));

    var newdate = StringDateTimeToJSDateTime(dateTime);

    if (formYear != "")
        newdate.setFullYear(newdate.getFullYear() + parseInt(formYear));

    if (formMonth != "")
        newdate.setMonth(newdate.getMonth() + parseInt(formMonth) + 1);

    if (formWeek != "")
        newdate.setDate(newdate.getDate() + parseInt(formWeek) * 7);

    if (formDay != "")
        newdate.setDate(newdate.getDate() + parseInt(formDay));

    if (formHour != "")
        newdate.setHours(newdate.getHours() + parseInt(formHour));

    if (formMin != "")
        newdate.setMinutes(newdate.getMinutes() + parseInt(formMin));

    var dd;
    if (newdate.getDate().toString().length == 1) {
        dd = "0" + newdate.getDate();
    } else {
        dd = newdate.getDate();
    }

    var mm;
    if (newdate.getMonth().toString().length == 1) {
        mm = "0" + newdate.getMonth();
    } else {
        mm = newdate.getMonth();
    }

    var y = newdate.getFullYear();

    var h;
    if (newdate.getHours().toString().length == 1) {
        h = "0" + newdate.getHours();
    } else {
        h = newdate.getHours();
    }

    var min = newdate.getMinutes();
    if (newdate.getMinutes().toString().length == 1) {
        min = "0" + newdate.getMinutes();
    } else {
        min = newdate.getMinutes();
    }

    var someFormattedDate = dd + "." + mm + "." + y + " " + h + ":" + min;
    return someFormattedDate;
}
function StringDateTimeToJSDateTime(stringDateTime) {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/;
    var date = new Date(stringDateTime.replace(pattern, '$3-$2-$1 $4:$5'));
    return date;
}
function formatDateGet(date, format) {
    //format 1y-10m-3w-4d

    var formYear = format.substring(format.substring(0, format.indexOf("y")).lastIndexOf("-") + 1, format.indexOf("y"));

    var formMonth = format.substring(format.substring(0, format.indexOf("m")).lastIndexOf("-") + 1, format.indexOf("m"));

    var formWeek = format.substring(format.substring(0, format.indexOf("w")).lastIndexOf("-") + 1, format.indexOf("w"));

    var formDay = format.substring(format.substring(0, format.indexOf("d")).lastIndexOf("-") + 1, format.indexOf("d"));

    var newdate = StringDateToJSDate(date);

    if (formYear != "")
        newdate.setFullYear(newdate.getFullYear() + parseInt(formYear));

    if (formMonth != "")
        newdate.setMonth(newdate.getMonth() + parseInt(formMonth) + 1);

    if (formWeek != "")
        newdate.setDate(newdate.getDate() + parseInt(formWeek) * 7);

    if (formDay != "")
        newdate.setDate(newdate.getDate() + parseInt(formDay));

    var dd;
    if (newdate.getDate().toString().length == 1) {
        dd = "0" + newdate.getDate();
    } else {
        dd = newdate.getDate();
    }

    var mm;
    if (newdate.getDate().toString().length == 1) {
        mm = "0" + newdate.getMonth();
    } else {
        mm = newdate.getMonth();
    }

    var y = newdate.getFullYear();

    var someFormattedDate = dd + "." + mm + "." + y;
    return someFormattedDate;
}
function formatTimeGet(time, format) {
    //format 10h-5min

    var formHour = format.substring(format.substring(0, format.indexOf("h")).lastIndexOf("-") + 1, format.indexOf("h"));

    var formMin = format.substring(format.substring(0, format.indexOf("min")).lastIndexOf("-") + 1, format.indexOf("min"));

    var dateTime = "01.01.1900 " + time;
    var newTime = AddHoursAndMin(formHour, formMin, dateTime);

    var h;
    if (newTime.getHours().toString().length == 1) {
        h = "0" + newTime.getHours();
    } else {
        h = newTime.getHours();
    }

    var min = newTime.getMinutes();
    if (newTime.getMinutes().toString().length == 1) {
        min = "0" + newTime.getMinutes();
    } else {
        min = newTime.getMinutes();
    }

    var someFormattedTime = h + ":" + min;
    return someFormattedTime;
}
function AddHoursAndMin(hours, min, dateTime) {
    var dat = StringDateTimeToJSDateTime(dateTime);
    dat.setHours(dat.getHours() + parseInt(hours));
    dat.setMinutes(dat.getMinutes() + parseInt(min));
    return dat;
}

function formatDateTimeSubtractGet(dateTime, format) {
    //format 1y-10m-3w-4d-10h-5min

    var formYear = format.substring(format.substring(0, format.indexOf("y")).lastIndexOf("-") + 1, format.indexOf("y"));

    var formMonth = format.substring(format.substring(0, format.indexOf("m")).lastIndexOf("-") + 1, format.indexOf("m"));

    var formWeek = format.substring(format.substring(0, format.indexOf("w")).lastIndexOf("-") + 1, format.indexOf("w"));

    var formDay = format.substring(format.substring(0, format.indexOf("d")).lastIndexOf("-") + 1, format.indexOf("d"));

    var formHour = format.substring(format.substring(0, format.indexOf("h")).lastIndexOf("-") + 1, format.indexOf("h"));

    var formMin = format.substring(format.substring(0, format.indexOf("min")).lastIndexOf("-") + 1, format.indexOf("min"));

    var newdate = StringDateTimeToJSDateTime(dateTime);

    if (formYear != "")
        newdate.setFullYear(newdate.getFullYear() - parseInt(formYear));

    if (formMonth != "")
        newdate.setMonth((newdate.getMonth() + 1) - parseInt(formMonth));

    if (formWeek != "")
        newdate.setDate(newdate.getDate() - parseInt(formWeek) * 7);

    if (formDay != "")
        newdate.setDate(newdate.getDate() - parseInt(formDay));

    if (formHour != "")
        newdate.setHours(newdate.getHours() - parseInt(formHour));

    if (formMin != "")
        newdate.setMinutes(newdate.getMinutes() - parseInt(formMin));

    var dd;
    if (newdate.getDate().toString().length == 1) {
        dd = "0" + newdate.getDate();
    } else {
        dd = newdate.getDate();
    }

    var mm;
    if (newdate.getMonth().toString().length == 1) {
        mm = "0" + newdate.getMonth();
    } else {
        mm = newdate.getMonth();
    }

    var y = newdate.getFullYear();

    var h;
    if (newdate.getHours().toString().length == 1) {
        h = "0" + newdate.getHours();
    } else {
        h = newdate.getHours();
    }

    var min = newdate.getMinutes();
    if (newdate.getMinutes().toString().length == 1) {
        min = "0" + newdate.getMinutes();
    } else {
        min = newdate.getMinutes();
    }

    var someFormattedDate = dd + "." + mm + "." + y + " " + h + ":" + min;
    return someFormattedDate;
}
function formatDateSubtractGet(date, format) {
    //format 1y-10m-3w-4d

    var formYear = format.substring(format.substring(0, format.indexOf("y")).lastIndexOf("-") + 1, format.indexOf("y"));

    var formMonth = format.substring(format.substring(0, format.indexOf("m")).lastIndexOf("-") + 1, format.indexOf("m"));

    var formWeek = format.substring(format.substring(0, format.indexOf("w")).lastIndexOf("-") + 1, format.indexOf("w"));

    var formDay = format.substring(format.substring(0, format.indexOf("d")).lastIndexOf("-") + 1, format.indexOf("d"));

    var newdate = StringDateToJSDate(date);

    if (formYear != "")
        newdate.setFullYear(newdate.getFullYear() - parseInt(formYear));

    if (formMonth != "")
        newdate.setMonth(newdate.getMonth() - parseInt(formMonth) + 1);

    if (formWeek != "")
        newdate.setDate(newdate.getDate() - parseInt(formWeek) * 7);

    if (formDay != "")
        newdate.setDate(newdate.getDate() - parseInt(formDay));

    var dd;
    if (newdate.getDate().toString().length == 1) {
        dd = "0" + newdate.getDate();
    } else {
        dd = newdate.getDate();
    }

    var mm;
    if (newdate.getDate().toString().length == 1) {
        mm = "0" + newdate.getMonth();
    } else {
        mm = newdate.getMonth();
    }

    var y = newdate.getFullYear();

    var someFormattedDate = dd + "." + mm + "." + y;
    return someFormattedDate;
}
function formatTimeSubtractGet(time, format) {
    //format 10h-5min

    var formHour = format.substring(format.substring(0, format.indexOf("h")).lastIndexOf("-") + 1, format.indexOf("h"));

    var formMin = format.substring(format.substring(0, format.indexOf("min")).lastIndexOf("-") + 1, format.indexOf("min"));

    var dateTime = "01.01.1900 " + time;
    var newTime = SubtractHoursAndMin(formHour, formMin, dateTime);

    var h;
    if (newTime.getHours().toString().length == 1) {
        h = "0" + newTime.getHours();
    } else {
        h = newTime.getHours();
    }

    var min = newTime.getMinutes();
    if (newTime.getMinutes().toString().length == 1) {
        min = "0" + newTime.getMinutes();
    } else {
        min = newTime.getMinutes();
    }

    var someFormattedTime = h + ":" + min;
    return someFormattedTime;
}
function SubtractHoursAndMin(hours, min, dateTime) {
    var dat = StringDateTimeToJSDateTime(dateTime);
    dat.setHours(dat.getHours() - parseInt(hours));
    dat.setMinutes(dat.getMinutes() - parseInt(min));
    return dat;
}

Date.prototype.format = function (frmt) {
    var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    if (frmt == "MMMM d, yyyy") {
        return aylar[this.getMonth()] + " " + this.getDate() + ", " + this.getFullYear();
    } else if (frmt == "d MMMM, yyyy") {
        return this.getDate() + " " + aylar[this.getMonth()] + ", " + this.getFullYear();
    }
    else {
        return JSDateToStringDate(this);
    }
}
Date.prototype.formatIng = function (frmt) {
    var aylar = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (frmt == "MMMM d, yyyy") {
        return aylar[this.getMonth()] + " " + this.getDate() + ", " + this.getFullYear();
    } else if (frmt == "d MMMM, yyyy") {
        return this.getDate() + " " + aylar[this.getMonth()] + ", " + this.getFullYear();
    }
    else {
        return JSDateToStringDate(this);
    }
}
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + parseInt(days));
    return dat;
}
Date.prototype.addDaysReturnStr = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + parseInt(days));
    return JS1DateToStringDateyyyymmdd(dat);
}
Date.prototype.getWeek = function () {
    var jan4th = new Date(this.getFullYear(), 0, 4);
    return Math.ceil((((this - jan4th) / 86400000) + jan4th.getDay() + 1) / 7);
}
Date.prototype.pretty = function () {
    try {
        let date = this;
        let diff = (((new Date()).getTime() - date.getTime()) / 1000);
        let day_diff = Math.floor(diff / 86400);

        if (isNaN(day_diff) || day_diff < 0)
            return stringtime;

        return day_diff == 0 &&
            (
                diff < 60 && "Şimdi" ||
                diff < 3600 && Math.floor(diff / 60) + " dakika önce" ||
                diff < 86400 && Math.floor(diff / 3600) + " saat önce"
            ) ||
            day_diff == 1 && "Dün" ||
            day_diff < 7 && day_diff + " gün önce" ||
            Math.ceil(day_diff / 7) + " hafta önce";
    } catch (e) {
        return "";
    }
}
Date.prototype.prettyRemaining = function () {
    try {
        let date = this;
        let diff = ((date.getTime() - (new Date()).getTime()) / 1000); //toplam zaman

        if (isNaN(diff) || diff < 0)
            return stringtime;

        let days = Math.floor(diff / 86400);
        let hours = Math.floor((diff % 86400) / 3600);
        let mins = Math.floor((diff % 3600) / 60);
        let secs = Math.floor((diff % 60));

        return days + " " + siteLang.day + " " + ("0" + hours).slice(-2) + " " + siteLang.hour + " " + ("0" + mins).slice(-2) + " " + siteLang.min + " " + ("0" + secs).slice(-2) + " " + siteLang.sec;
    } catch (e) {
        return "";
    }
}
Date.prototype.prettyRemainingMinutes = function () {
    try {
        let date = this;
        let diff = ((date.getTime() - (new Date()).getTime()) / 1000); //toplam zaman

        if (isNaN(diff) || diff < 0)
            return stringtime;

        let days = Math.floor(diff / 86400);
        let hours = Math.floor((diff % 86400) / 3600);
        let mins = Math.floor((diff % 3600) / 60);
        let secs = Math.floor((diff % 60));

        return ("0" + mins).slice(-2) + " dk. " + ("0" + secs).slice(-2) + " sn. ";
    } catch (e) {
        return "";
    }
}
Date.prototype.diff = function (todate, datepart) {
    // datepart: 'w', 'd', 'h', 'm', 's', 'ms'
    datepart = datepart.toLowerCase();
    var diff = todate - this;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
    };

    return Math.floor(diff / divideBy[datepart]);
}
Date.prototype.diffms = function (todate) {
    return todate - this;
}
function SWStart(text) {
    if (text) {
        console.log(text);
    }
    return new Date();
}
Date.prototype.SWStop = function (text) {
    var time = this.diffms(new Date());
    if (text) {
        console.log(text + " " + time);
    }
    return time;
}
Date.prototype.toJSON = function () {
    return moment(this).format();
}

///---Aliases---///
var qs = function (selector) {
    return document.querySelector(selector);
}
var qa = function (selector) {
    return document.querySelectorAll(selector);
}
var $qs = function (selector) {
    return $(qs(selector));
}
var $qa = function (selector) {
    return $(qa(selector));
}
Node.prototype.qs = function (selector) {
    return this.querySelector(selector);
}
Node.prototype.qa = function (selector) {
    return this.querySelectorAll(selector);
}
NodeList.prototype.qs = function (selector) {
    return this.querySelector(selector);
}
NodeList.prototype.qa = function (selector) {
    return this.querySelectorAll(selector);
}
Node.prototype.attr = function () {
    if (this == null) {
        return null;
    }
    if (arguments.length === 1) {
        return this.getAttribute(arguments[0]);
    }
    else if (arguments.length === 2) {
        return this.setAttribute(arguments[0], arguments[1]);
    }
    else {
        var obj = {};
        $.each(this.attributes, function () {
            if (this.specified) {
                obj[this.name] = this.value;
            }
        });
        return obj;
    }
    return this.getAttribute(attribute)
}

///---Grup Methods---///
var alertim = {
    types: {
        info: "info",
        success: "success",
        error: "error",
        warning: "warning",
        danger: "danger"
    },
    confirm: function (text, type, fnEvet, fnHayir) {
        if (text == null)
            text = siteLang.Emin;
        if (type == null)
            type = this.types.info;

        var id = random.all(10);
        var html = '<div class="modal fade" id="' + id + '" data-backdrop="static" data-keyboard="false">\
                        <div class="modal-dialog modal-sm">\
                            <div class="modal-content">\
                                <div class="modal-body text-center">\
                                    <h4>'+ text + '</h4>\
                                    <h1><i class="fas fa-question-circle text-'+ type + '"></i></h1>\
                                </div>\
                                <div class="modal-footer justify-content-between">\
                                    <button type="button" class="hayir btn btn-default">'+ siteLang.Hayir + '</button>\
                                    <button type="button" class="evet btn btn-'+ type + '">' + siteLang.Evet + '</button>\
                                </div>\
                            </div>\
                        </div >\
                      </div >'

        $("body").append(html);
        $("#" + id).modal("show");

        $("#" + id + " .evet").click(function () {
            if (fnEvet) {
                fnEvet();
            }
            console.log("Evet");
            $("#" + id).modal("hide");
            setTimeout(function () { $("#" + id).remove(); }, 1000);
        });

        $("#" + id + " .hayir").click(function () {
            if (fnHayir) {
                fnHayir();
            }
            console.log("Hayır");
            $("#" + id).modal("hide");
            setTimeout(function () { $("#" + id).remove(); }, 1000);
        });
    },
    alert: function (text, type) {
        if (type == null)
            type = "info"

        var id = random.all(10);
        var html = '<div class="modal fade" id="' + id + '" data-backdrop="static" data-keyboard="false">\
                        <div class="modal-dialog modal-sm">\
                            <div class="modal-content">\
                                <div class="modal-body text-center">\
                                    <h4>'+ text + '</h4>\
                                    <h1><i class="fas fa-exclamation-circle text-'+ type + '"></i></h1>\
                                </div>\
                                <div class="modal-footer">\
                                    <button type="button" class="tamam btn btn-'+ type + '">Tamam</button>\
                                </div>\
                            </div>\
                        </div >\
                      </div >'

        $("body").append(html);
        $("#" + id).modal("show");

        $("#" + id + " .tamam").click(function () {
            $("#" + id).modal("hide");
            setTimeout(function () { $("#" + id).remove(); }, 1000);
        });
    },
    toast: function (text, type, timeoutFn, time = 3000) {

        toastr.options.timeOut = time;
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;

        if (type == "info")
            toastr.info(text);
        else if (type == "success")
            toastr.success(text);
        else if (type == "error")
            toastr.error(text);
        else if (type == "warning")
            toastr.warning(text);
        else
            toastr.info(text);

        if (timeoutFn) {
            setTimeout(timeoutFn, toastr.options.timeOut)
        }
    }
}
var random = {
    number: function (length) {
        var id = "";
        var karakterler = "0123456789";
        for (var i = 0; i < length; i++) {
            id += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
            if (id === "0") {
                id = "";
                i--;
            }
        }

        return parseInt(id);
    },
    text: function (length) {
        var id = "";
        var karakterler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < length; i++)
            id += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
        return id;
    },
    all: function (length) {
        var id = "";
        var karakterler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        for (var i = 0; i < length; i++)
            id += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
        return id;
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    color: function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

///---Data Tool---///
function EkID() {
    return random.all(10);
}
function DivParamList(alan) {
    var prmlist = []
    $(alan).each(function (f, g) {
        var sonuc;
        //if ($(g).attr("atip") != 26 && $(g).attr("atip") != 5 && $(g).attr("atip") != 7) {
        var sonuc;
        if ($(g).attr("id")) {
            sonuc = $(g).attr("id").split("-")[0];
        }
        else if ($(g).attr("dynid")) {
            sonuc = $(g).attr("dynid").split("-")[0];
        }
        else if ($(g).attr("gtid")) {
            sonuc = $(g).attr("gtid").split("-")[0];
        }
        if (sonuc) {
            prmlist.push({ id: sonuc })
        }
        //}
    })
    return prmlist;
}
function AlandakiIDler(alan) {
    var t = SWStart();
    if (!alan) {
        alan = document;
    }

    var d = [];
    $(alan).find("[id].formcontrol,[dynid],[gtid]").each(function (i, o) {
        var id = o.attr("id") || o.attr("dynid") || o.attr("gtid");
        if (id != null && id.includes("-"))
            d.push(id);
    })
    t.SWStop("IDler");
    return d;
}
function AlanaGoreVeriFiltrele(list, alan) {
    var t = SWStart();
    var l1 = AlandakiIDler(alan);
    var l2 = list.filter(p => l1.includes(p.ParamID + "-" + p.ParamEkID));

    t.SWStop("AlanaGoreVeriFiltrele");
    return l2;
}
function BirGruplamaninButunDatasi(gpid, data, retrunVeriler) {
    var altVeriler = data.findByReturnList("GruplamaEssizUstID", gpid);
    retrunVeriler = retrunVeriler.concat(data.findByReturnList("GruplamaEssizID", gpid));
    if (altVeriler.length > 0) {
        retrunVeriler = retrunVeriler.concat(altVeriler);
        var uniqueGpDatalar = altVeriler.uniqueObjectsBy("GruplamaEssizID");
        for (var i = 0; i < uniqueGpDatalar.length; i++) {
            if (uniqueGpDatalar[i].GruplamaEssizID) {
                retrunVeriler = BirGruplamaninButunDatasi(uniqueGpDatalar[i].GruplamaEssizID, data, retrunVeriler);
            }
        }
    }
    return retrunVeriler;
}
function RecursiveDataBulReturnList(grupID, paramID, retrunListData) {
    var veri = retrunListData.findByReturnList("GruplamaEssizID", grupID).findByReturnList("ParamID", paramID);
    if (!veri.length && grupID) {
        veri = RecursiveDataBulReturnList(retrunListData.findBy("GruplamaEssizID", grupID).GruplamaEssizUstID, paramID, retrunListData);
    }
    return veri;
}

///---IDOlustur (Atıl Olacak)---///
function DivIciTumIDleriOlustur(div, alanlar, dataKontrol) {
    $(div).find("[ftype='ttkDivKapsar']").each(function (i2, e) {
        var frmcntID = IDOlusturFormControl($(e).find(".tetiklenenDivKapsar").attr("id").split("-")[0])
        $(e).find(".tetiklenenDivKapsar").attr("id", frmcntID);
    })
    TetiklenenDivNearst(div);
    $(div).find(".formcontrol").each(function (i2, e) {
        var frmcntID = IDOlusturTumu($(e).attr("id").split("-")[0], alanlar, dataKontrol)
        $(e).attr("id", frmcntID);
    })
    $(div).find("[dynid]").each(function (i2, e2) {
        var frmcntID = IDOlusturTumu($(e2).attr("dynid").split("-")[0], alanlar, dataKontrol)
        $(e2).attr("dynid", frmcntID)
    })
    $(div).find("[referansalan]").each(function (ind, elm) {
        var referansalan = [];
        referansalan = $(elm).attr("referansalan").split("-");
        var alan;
        alan = $(elm).nearest("[" + referansalan[2] + "^='" + referansalan[0] + "-']")
        $(elm).attr("referansalan", $(alan).attr(referansalan[2]) + "-" + referansalan[2]);

        var karsilastirilacakalan = [];
        karsilastirilacakalan = $(elm).attr("karsilastirilacakalan").split("-");
        alan = $(elm).nearest("[" + karsilastirilacakalan[2] + "^='" + karsilastirilacakalan[0] + "-']")
        $(elm).attr("karsilastirilacakalan", $(alan).attr(karsilastirilacakalan[2]) + "-" + karsilastirilacakalan[2]);

        if ($(elm).attr("ksltblistisnaalan") != null) {
            var oalan = [];
            oalan = $(elm).attr("ksltblistisnaalan").split("-");
            alan = $(elm).nearest("[" + oalan[2] + "^='" + oalan[0] + "-']")
            $(elm).attr("ksltblistisnaalan", $(alan).attr(oalan[2]) + "-" + oalan[2]);
        }
        if ($(elm).attr("onkarsilastirmarefalan") != null) {
            var oalan = [];
            oalan = $(elm).attr("onkarsilastirmarefalan").split("-");
            alan = $(elm).nearest("[" + oalan[2] + "^='" + oalan[0] + "-']")
            $(elm).attr("onkarsilastirmarefalan", $(alan).attr(oalan[2]) + "-" + oalan[2]);
        }
    })
}
function IDOlusturFormControl(paramID) {
    //var idler = $("[id^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)

    //    return sonID;

    //}

    var ekID = EkIDUret(["id"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturTabloControl(paramID, essiz, tabloAdi, alan) {
    let tabloEkID = 0;
    let alans = []
    var post = JSON.stringify({ "essiz": essiz, "paramID": paramID, "tabloAdi": tabloAdi });
    Post("/WebServices/ParametreService.asmx/EssizdekiParametreninEnYuksekEkIDliSatiri", post, function (gelen) {
        if (gelen.d)
            tabloEkID = parseInt(gelen.d.text) + 1;
    }, function (err) {
        console.log(err);
    }, false, true);
    var ekID = EkIDUret(["id", "dynid", "gtid"], paramID, null, true);
    if (parseInt(ekID) < tabloEkID)
        ekID = tabloEkID.toString();
    return paramID + "-" + ekID;
}
function IDOlusturFormControlAlanIci(alan, paramID) {
    //var idler = $(alan).find("[id^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], paramID, alan);
    return paramID + "-" + ekID;
}
function IDOlusturLabelAlanIci(alan, paramID) {
    //var idler = $(alan).find("[dynid^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr("dynid").split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}

    var ekID = EkIDUret(["dynid"], paramID, alan);
    return paramID + "-" + ekID;
}
function IDOlusturGoruntuAlanIci(alan, paramID) {
    //var idler = $(alan).find("[gtid^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr("gtid").split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}

    var ekID = EkIDUret(["gtid"], paramID, alan);
    return paramID + "-" + ekID;
}
//Clone butonu basıldıgında ek idler html bakılarak artırılıyordu
//fakat htmlden olusturulan tekrarlı alanın clonu nu hesaba katmıyordu
//hem htm hemde elimizdeki clona bakılarak ek id oluşturuyor
function IDOlusturFormControlAlanIciVeHtml(alan, paramID) {
    //var idler = $(alan).find("[id^='" + paramID + "-']");
    //idler.push.apply(idler, $("[id^='" + paramID + "-']"));
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturLabelAlanIciVeHtml(alan, paramID) {
    //var idler = $(alan).find("[dynid^='" + paramID + "-']");
    //idler.push.apply(idler, $("[dynid^='" + paramID + "-']"));
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr("dynid").split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)

    //    return sonID;
    //}

    var ekID = EkIDUret(["dynid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturGoruntuAlanIciVeHtml(alan, paramID) {
    //var idler = $(alan).find("[gtid^='" + paramID + "-']");
    //idler.push.apply(idler, $("[gtid^='" + paramID + "-']"));
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr("gtid").split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["gtid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturFormControlEksi1(paramID) {
    //var idler = $("[id^='" + paramID + "-']");
    //if (idler.length == 0 || idler.length == 1) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturLabelEksi1(paramID) {
    //var idler = $("[dynid^='" + paramID + "-']");
    //if (idler.length == 0 || idler.length == 1) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr('dynid').split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}
    var ekID = EkIDUret(["dynid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturGoruntuEksi1(paramID) {
    //var idler = $("[gt^='" + paramID + "-']");
    //if (idler.length == 0 || idler.length == 1) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr('gt').split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //    //return paramID + "-" + ekID;
    //    return sonID;
    //}

    var ekID = EkIDUret(["gtid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturTablo(paramID) {
    //var idler = $("[id^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturTekrarliAlan(paramID) {
    //var idler = $("[id^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturSabitIcerik(deger1, deger2) {
    var idler = $("[id^='" + deger1 + "-" + deger2 + "']");
    if (!idler.length) {
        return deger1 + "-" + deger2 + "-1";
    } else {
        var sonEkId = 0;
        for (var i = 0; i < idler.length; i++) {
            var ekID = idler[i].id.split('-')[2]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = deger1 + "-" + deger2 + "-" + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturKapsar(deger1, deger2) {
    var idler = $("[id^='" + deger1 + "-" + deger2 + "']");
    if (!idler.length) {
        return deger1 + "-" + deger2 + "-1";
    } else {
        var sonEkId = 0;
        for (var i = 0; i < idler.length; i++) {
            var ekID = idler[i].id.split('-')[2]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = deger1 + "-" + deger2 + "-" + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturKapsarTkrr(deger1, deger2) {
    var idler = $("[tkrttktkr^='" + deger1 + "-" + deger2 + "']");
    if (!idler.length) {
        return deger1 + "-" + deger2 + "-2";
    } else {
        var sonEkId = 0;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr("tkrttktkr").split('-')[2]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = deger1 + "-" + deger2 + "-" + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturLabel(paramID) {
    //var idler = $("[dynid^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr('dynid').split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["dynid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturLabelTablodan(tablo, degerID) {
    var idler = $("[dynid^='" + tablo + "-" + degerID + "-']");
    if (!idler.length) {
        return tablo + "-" + degerID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr('dynid').split('-')[2]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = tablo + "-" + degerID + "-" + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturLst(paramID) {
    var idler = $("[lstid^='" + paramID + "-']");
    if (!idler.length) {
        return paramID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr('lstid').split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = paramID + '-' + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturGoruntu(paramID) {
    //var idler = $("[gtid^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = $(idler[i]).attr('gtid').split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["gtid"], paramID);
    return paramID + "-" + ekID;
}
function IDOlusturDynmicGoruntu(paramID) {
    var idler = $("[gtid^='" + paramID + "-']");
    if (idler.length == 0 || idler.length == 1) {
        return paramID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr('gtid').split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = paramID + '-' + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturGenel(deger) {
    //var idler = $("[id^='" + deger + "-']");
    //if (!idler.length) {
    //    return deger + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = deger + '-' + (sonEkId + 1)

    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], deger);
    return deger + "-" + ekID;
}
function IDOlusturtlttk(degerID) {
    var idler = $("[tlttk^='" + degerID + "-']");
    if (!idler.length) {
        return degerID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr('tlttk').split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = degerID + '-' + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturyplttk(degerID) {
    var idler = $("[yplttk^='" + degerID + "-']");
    if (!idler.length) {
        return degerID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = $(idler[i]).attr('yplttk').split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = degerID + '-' + (sonEkId + 1)
        return sonID;
    }
}
function IDOlusturTabPane(deger1) {
    //var idler = $("[id^='" + deger1 + "']");
    //if (!idler.length) {
    //    return deger1 + "_1";
    //} else {
    //    var sonEkId = 0;
    //    for (var i = 0; i < idler.length; i++) {
    //        var ekID = idler[i].id.split('_')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = deger1 + "_" + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["id"], deger1);
    return deger1 + "_" + ekID;
}
function IDOlusturTumu(paramID, alanlar, dataKontrol) {
    //var idler = $("[id^='" + paramID + "-'],[dynid^='" + paramID + "-'],[gtid^='" + paramID + "-']");
    //if (!idler.length) {
    //    return paramID + "-1";
    //} else {
    //    var sonEkId = 1;
    //    for (var i = 0; i < idler.length; i++) {
    //        var alanAttr = "id";
    //        if ($(idler[i]).is("[dynid]"))
    //            alanAttr = "dynid";
    //        else if ($(idler[i]).is("[gtid]"))
    //            alanAttr = "gtid";

    //        var ekID = $(idler[i]).attr(alanAttr).split('-')[1]
    //        if (sonEkId < parseInt(ekID)) {
    //            sonEkId = parseInt(ekID);
    //        }
    //    }
    //    var sonID = paramID + '-' + (sonEkId + 1)
    //    return sonID;
    //}

    var ekID = EkIDUret(["id", "dynid", "gtid"], paramID, alanlar, dataKontrol);
    var returnID = paramID + "-" + ekID;
    if (dataKontrol == true) {
        setTimeout(function () {
            $qs("[id='" + returnID + "'],[dynid='" + returnID + "']").attr("dataekidkontrol", "")
        }, 1000)
    }
    return returnID;
}
//Sayfada basit tablo içinde aynı parametreye sahip ek sutun varsa ek idlerine bak en buyugunu 1 arttır sonra
//olusturmakta oldugumuz ama henuz sayfaya basılmamış tablomuzdaki aynı parametreye sahip ek sutunların
//ek idlerine bak en buyugunu 1 arttır
function IDOlusturFormControlTabloveHtmlKontrollu(paramID, tablohtml) {
    var html = $.parseHTML(tablohtml)
    var idlertablo = $(html).find("[id^='" + paramID + "-']");
    var idler = $("[id^='" + paramID + "-']");
    var sonEkId = 1;
    if (!idler.length) {
        if (!idlertablo.length) {
            return paramID + "-1";
        } else {
            for (var i = 0; i < idlertablo.length; i++) {
                var ekID = idlertablo[i].id.split('-')[1]
                if (sonEkId < parseInt(ekID)) {
                    sonEkId = parseInt(ekID);
                }
            }
        }
    }
    else {
        for (var i = 0; i < idler.length; i++) {
            var ekID = idler[i].id.split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        if (!idlertablo.length) {
            sonEkId = sonEkId;
        } else {
            for (var i = 0; i < idlertablo.length; i++) {
                var ekID = idlertablo[i].id.split('-')[1]
                if (sonEkId < parseInt(ekID)) {
                    sonEkId = parseInt(ekID);
                }
            }
        }
    }

    var sonID = paramID + '-' + (sonEkId + 1);
    //var ekID = parseInt(sonID.split('-')[1]) + 1;
    //return paramID + "-" + ekID;
    return sonID;
}
function IDOlusturDataControl(paramID, data) {
    var returnID = "";
    var idler = [];
    $("[id^='" + paramID + "-']").each(function () {
        idler.push(this.id);
    });
    var satir = data.findBy("value", paramID);
    if (satir) {
        idler.push(paramID + "-" + satir.text);
    }
    if (!idler.length) {
        returnID = paramID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = idler[i].split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = paramID + '-' + (sonEkId + 1)
        returnID = sonID;
    }
    setTimeout(function () {
        $qs("[id='" + returnID + "']").attr("dataekidkontrol", "")
    }, 500)

    return returnID;
}
function IDOlusturLabelDataControl2(paramID, data) {
    var returnID = "";
    var idler = [];
    $("[dynid^='" + paramID + "-']").each(function () {
        idler.push($(this).attr("dynid"));
    });
    var satir = data.findBy("value", paramID);
    if (satir) {
        idler.push(paramID + "-" + satir.text);
    }
    if (!idler.length) {
        returnID = paramID + "-1";
    } else {
        var sonEkId = 1;
        for (var i = 0; i < idler.length; i++) {
            var ekID = idler[i].split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = paramID + '-' + (sonEkId + 1)
        returnID = sonID;
    }
    setTimeout(function () {
        $qs("[dynid='" + returnID + "']").attr("dataekidkontrol", "")
    }, 500)

    return returnID;
}
function IDOlusturLabelDataControl(paramID, data) {
    var returnID = "";
    var idler = [];
    $("[dynid^='" + paramID + "-']").each(function () {
        var ekID = parseInt($(this).attr("dynid").split('-')[1]);
        if (idler.indexOf(ekID) == -1)
            idler.push(ekID);
    });
    var satir = data.findBy("value", paramID);
    if (satir) {
        idler.push(parseInt(satir.text));
    }
    if (!idler.length) {
        returnID = paramID + "-1";
    } else {
        var sonEkId = 1;
        sonEkId = idler.sort((a, b) => a - b)[idler.length - 1];
        var sonID = paramID + '-' + (sonEkId + 1)
        returnID = sonID;
    }
    setTimeout(function () {
        $qs("[dynid='" + returnID + "']").attr("dataekidkontrol", "")
    }, 500)

    return returnID;
}
function IDOlusturLabelAlanIciVeHtmlveDataControl(alan, data, paramID) {
    var returnID = "";
    var idler = $(alan).find("[dynid^='" + paramID + "-']");
    idler.push.apply(idler, $("[dynid^='" + paramID + "-']"));
    var idveriler = data.findByReturnList("value", paramID);
    if (!idveriler.length) {
        if (!idler.length) {
            returnID = paramID + "-1";
        } else {
            var sonEkId = 1;
            for (var i = 0; i < idler.length; i++) {
                var ekID = $(idler[i]).attr("dynid").split('-')[1]
                if (sonEkId < parseInt(ekID)) {
                    sonEkId = parseInt(ekID);
                }
            }
            var sonID = paramID + '-' + (sonEkId + 1)
            returnID = sonID;
        }
    }
    else {
        var yeniidlist = [];
        for (var i = 0; i < $(alan).find("[dynid^='" + paramID + "-']").length; i++) {
            yeniidlist.push({ id: $($(alan).find("[dynid^='" + paramID + "-']")[i]).attr("dynid") })
        }

        for (var i = 0; i < $("[dynid^='" + paramID + "-']").length; i++) {
            yeniidlist.push({ id: $($("[dynid^='" + paramID + "-']")[i]).attr("dynid") })
        }
        for (var i = 0; i < idveriler.length; i++) {
            yeniidlist.push({ id: idveriler[i].value + "-" + idveriler[i].text })
        }

        var sonEkId = 1;
        for (var i = 0; i < yeniidlist.length; i++) {
            var ekID = yeniidlist[i].id.split('-')[1]
            if (sonEkId < parseInt(ekID)) {
                sonEkId = parseInt(ekID);
            }
        }
        var sonID = paramID + '-' + (sonEkId + 1)
        returnID = sonID;
    }
    setTimeout(function () {
        $qs("[dynid='" + returnID + "']").attr("dataekidkontrol", "")
    }, 500)

    return returnID;
}
var IDListCache = {};
function IDOlustur(paramID, alanlar, dataKontrol) {
    var ekID = EkIDUret(["id", "dynid", "gtid"], paramID, alanlar, dataKontrol);
    var returnID = paramID + "-" + ekID;

    if (dataKontrol == true) {
        setTimeout(function () {
            $qs("[id='" + returnID + "'],[dynid='" + returnID + "']").attr("dataekidkontrol", "")
        }, 1000)
    }
    return returnID;
}
function EkIDUret(attrs, paramID, alanlar, dataKontrol) {
    if (paramID == 889) {
        var method = EkIDUret.caller;
        console.log(paramID + " - " + method)
    }

    var ekID = 1;
    for (var m = 0; m < attrs.length; m++) {
        var key = JSON.stringify({ attr: attrs[m], paramID: paramID, alanlar: alanlar, dataKontrol: dataKontrol })
        if (IDListCache[key]) {
            if (IDListCache[key] > ekID)
                ekID = IDListCache[key];
        } else {
            var ekIDler = [];
            var $alans = $();
            var datas = [];

            if (alanlar == null || alanlar == undefined || alanlar == []) {
                $.merge($alans, $(document));
            } else {
                alanlar.forEach(function (e, i) {
                    $.merge($alans, $(e));
                });
            }
            $alans.find("[" + attrs[m] + "^='" + paramID + "-']").each(function () {
                var ekID = parseInt($(this).attr(attrs[m]).split('-')[1]);
                if (ekIDler.indexOf(ekID) == -1)
                    ekIDler.push(ekID);
            });
            //***17.12.2019*** Eski koşulda; test kartlarında ktablo attrubutu olmadığı için method hataya düşüyordu. Hataya düşmeden işleme devam etmesi için $(".system44form").attr("ktablo")!= undefined koşulu koyuldu. Eski koşul aşağıda yer alıyor. M.Ş.
            //if (dataKontrol == true) {
            //***17.12.2019*** ---------------------------------------End Comment-----------------------------------------------------------------------------
            if (dataKontrol == true && $(".system44form").attr("ktablo") != undefined) {
                datas = EssizdekiParamEkIDler($(".system44form").attr("essiz") || qstring("q"), $(".system44form").attr("ktablo"));
                var satir = datas.findBy("value", paramID);
                if (satir) {
                    ekIDler.push(parseInt(satir.text));
                }
            }
            if (ekIDler.length) {
                // ekID = ekIDler.sort((a, b) => a - b)[ekIDler.length - 1];
                var sonekID = ekIDler.sort((a, b) => a - b)[ekIDler.length - 1];
                if (sonekID > ekID) {
                    ekID = sonekID;
                }
            }
        }
    }

    ekID = ekID + 1;
    for (var m = 0; m < attrs.length; m++) {
        var key = JSON.stringify({ attr: attrs[m], paramID: paramID, alanlar: alanlar, dataKontrol: dataKontrol })
        IDListCache[key] = ekID;
    }

    return ekID;
}
///---IDOlustur (Atıl Olacak)---///

//Object.prototype.listener = function (fn) {
//    Object.defineProperty(this, "listen", {
//        set: function () {
//            alert("Değişti");
//        }
//    });
//}

function goBack() {
    window.history.back();
}

///---Media---/// Medya işlemleriyle ilgili bir gruplama olmadığı için oluşturuldu. //Mustafa Can Semerci. 11.05.2020

//HTML5 picture ve srcset özelliklerini kullanmak için upload edilen image dosyasını
// 3 farklı boyutta convert edip kaydetmek için post eden method //Mustafa Can Semerci. 11.05.2020
function ImgUploadwSrcSet(element) {
    var veri = [];
    if ($(element)[0].files.length) {
        var docList = $(element)[0].files;
        var post = new FormData();
        for (var i = 0; i < docList.length; i++) {
            post.append("file" + (i + 1), $(element)[0].files[i]);
        }
        post.append("fileCount", docList.length);
        $.ajax({
            type: "POST",
            url: "/WebServices/KayitService.asmx/ImageResizeUpload",
            data: post,
            dataType: 'json',
            contentType: false,
            processData: false,
            async: false,
            success: function (data) {
                veri = data;
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    if ($(element)[0].files.length != 0 && veri.length == 0) {
        alertim.toast(getGlobalResourceObject("dynamicPages", "MedyaAlanYok"), alertim.types.warning);
        $(".modal-dialog").find(".hayir").click();
        throw 'Medya için yeterli alan yok.';
    } else {
        return veri;
    }
}
//HTML5 picture ve srcset özellikleriyle default hali ve 3 boyutta(sm, md, lg) kaydedilmiş bir resmin
//ekran genişliğine göre farklı boyutlarını çağırıp ekrana yansıtan method. //Mustafa Can Semerci. 11.05.2020
function ImgPreview(element) {
    FileUploadPictureLoaderGoster(element);
    imgDetail = $(element)[0].files; //ImgUploadwSrcSet(element);

    var imgDiv = $(element).closest(".custom-file").find("#imgPreview");
    var paramID = $(element).attr("fid");
    $(imgDiv).find(".pictureloader").remove();

    var fileclearbuton = "<button type='button' class='btnRemoveField btn btn-xs btn-danger' onclick='FileRemoveClick(this)'><i class='fa fa-minus'></i>\
                            </button>";

    if (imgDetail.length) {
        for (var i = 0; i < imgDetail.length; i++) {
            //var imgUrl = imgDetail[i].MedyaBilgiURL;
            //var imgFullPath = imgDetail.MedyaDepoURL;
            //var imgNameUzantisiz = imgUrl.slice(18, imgUrl.length - 4);
            //var imageNameUzanti = imgUrl.slice(imgUrl.length - 4, imgUrl.length);
            //var imgPathRoot = imgFullPath.slice(0, imgUrl.length);

            //var imgID = imgDetail[i].TabloID;
            //var path = "../MedyaKutuphanesi/";
            //var imgBase = path + imgNameUzantisiz + imageNameUzanti;
            //var imgLg = path + imgNameUzantisiz + "-lg" + imageNameUzanti;
            //var imgMd = path + imgNameUzantisiz + "-md" + imageNameUzanti;
            //var imgSm = path + imgNameUzantisiz + "-sm" + imageNameUzanti;

            var filerdr = new FileReader();
            filerdr.onload = function (e) {
                var imgUrl = e.target.result;
                var imgNameUzantisiz = imgUrl.slice(0, imgUrl.length - 4);
                var imageNameUzanti = imgUrl.slice(imgUrl.length - 4, imgUrl.length);

                var imgBase = imgNameUzantisiz + imageNameUzanti;
                var imgLg = imgNameUzantisiz + "-lg" + imageNameUzanti;
                var imgMd = imgNameUzantisiz + "-md" + imageNameUzanti;
                var imgSm = imgNameUzantisiz + "-sm" + imageNameUzanti;

                //$(imgDiv).find("picture").attr("srcset", imgLg + " 1200w, " + imgMd + " 992w, " + imgSm + " 768w");

                var ekid = PictureAlaniOlustur(paramID, imgDiv, true);
                var picAlan = $("[fidek='" + ekid + "']");
                $(picAlan).find("img").attr("src", imgUrl);
                if ($(picAlan).find("button").length == 0)
                    $(picAlan).append(fileclearbuton);
            }
            filerdr.readAsDataURL(imgDetail[i]);
        }
    }
}
function SrcSetImageShow(picAlan, imgUrl) {
    var imgNameUzantisiz = imgUrl.slice(18, imgUrl.length - 4);
    var imageNameUzanti = imgUrl.slice(imgUrl.length - 4, imgUrl.length);
    var path = "../MedyaKutuphanesi/";
    var imgLg = path + imgNameUzantisiz + "-lg" + imageNameUzanti;
    var imgMd = path + imgNameUzantisiz + "-md" + imageNameUzanti;
    var imgSm = path + imgNameUzantisiz + "-sm" + imageNameUzanti;

    $(picAlan).find("source").attr("srcset", imgLg + " 1200w, " + imgMd + " 992w, " + imgSm + " 768w");
    $(picAlan).find("img").attr("src", imgUrl);
}

function PictureAlaniOlustur(paramID, imgDiv, appendMi) {
    var ekID = EkID();
    var html = "<div class='pictureloader'>\
                  <picture pagedata='' tip='21' fid='" + paramID + "' fidek='" + ekID + "' odtip='16'>\
                     <source media='(min-width: 36em)' srcset='' sizes='(min-width: 36em) 33.3vw, 100vw'>\
                     <img class='img-fluid' src=''>\
                  </picture>\
                </div>";

    if (appendMi)
        $(imgDiv).append(html);
    else
        $(imgDiv).after(html);

    return ekID;
}

function SliderSrcSetImageShow(picAlan) {
    $(picAlan).find("img").each(function () {
        var imgUrl = $(this).attr("src");

        var imgNameUzantisiz = imgUrl.slice(18, imgUrl.length - 4);
        var imageNameUzanti = imgUrl.slice(imgUrl.length - 4, imgUrl.length);
        var path = "../MedyaKutuphanesi/";
        var imgLg = path + imgNameUzantisiz + "-lg" + imageNameUzanti;
        var imgMd = path + imgNameUzantisiz + "-md" + imageNameUzanti;
        var imgSm = path + imgNameUzantisiz + "-sm" + imageNameUzanti;
        $(this).attr("srcset", imgLg + " 1200w, " + imgMd + " 992w, " + imgSm + " 768w");
        $(this).attr("src", imgUrl);
    });
}

function FileUploadPictureLoaderGoster(elem) {
    $(elem).closest(".custom-file").find("#imgPreview").show();
    $(elem).closest(".custom-file").find("#imgPreview").addClass("d-block");
}

//giirlen text geçerli bir mail adresi mi kontrolü . Mustafa Can Semerci 28.10.2020
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

//Tekrarlı alan çoğaltma ve azaltma methodları. 5.11.2020 Mustafa Can Semerci.

//Tekrarlı alan kapsarı <div id=""+alanID+"TekrarliAlan"></div> olarak html'e eklenmelidir.
//alanID tekrarlı alanı belirleyen bir kelime, alanDiv ise aşağıdaki alanDiv formatında olmalıdır.
/*
var alanDiv = "<div class='" + alanID + "Tekrar' id='" + alanID +"Tekrar_1'>\
                        <div class='row'>\
                             <div>alan içeriği</div>\
                            <div class='"+alanID+"tekrarBtnGrp'>\
                                <button type='button' class='btn btn-xs "+ alanID +"AddButton'>\
                                    <i class='fas fa-plus'></i>\
                                </button> &nbsp\
                                <button type='button' class='btn btn-xs "+ alanID +"RemoveButton'>\
                                    <i class='fas fa-minus-circle accent-danger'></i>\
                                </button>\
                            </div>\
                        </div>\
                    </div>";*/
function TekrarliAlanAddClick(alanID, alanDiv) {
    var newID = parseInt($("[id^='" + alanID + "Tekrar_']").last().attr("id").split("_")[1]) + 1;
    tekrarId = newID;
    var clone = $(alanDiv).clone();
    //$(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    //$("#" + alanID + "TekrarliAlan").append($(clone));

    //$("." + alanID + "tekrarBtnGrp").hide();
    //$("." + alanID + "tekrarBtnGrp").last().show();
    //$("." + alanID + "RemoveButton").hide();
    //$("." + alanID + "RemoveButton").last().show();
    $(clone).find("input").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);

        if ($(e).attr("type") == "radio" || $(e).attr("type") == "checkbox") {
            let name = $(e).attr("name");
            $(e).attr("name", name + newID);
            $(e).siblings("label").attr("for", $(e).attr("id"));
        } else {
            $(e).val("");
        }
    });
    $(clone).find("select").each(function (i, e) {
        var newFieldID = $(e).attr("id").split("_")[0];
        $(e).attr("id", newFieldID + "_" + newID);
    });
    $(clone).attr("id", "" + alanID + "Tekrar_" + newID);
    $("#" + alanID + "TekrarliAlan").append($(clone));
}

function TekrarliAlanRemoveClick(alanID) {
    $("[id^='" + alanID + "Tekrar_']").last().remove();
    $("." + alanID + "RemoveButton").last().show();
    $("." + alanID + "tekrarBtnGrp").last().show();

    if ($("." + alanID + "Tekrar").length == 1) {
        $("." + alanID + "RemoveButton").hide();
        $("." + alanID + "AddButton").show();
    }
}

// url içinde url/controller/view/param şeklinde gönderilen param değerini alma methodu. Mustafa Can Semerci 6.11.2020.
function GetURLParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");

    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else
        return "";
}
// digiforce Param- tablolarından gelen parametre değerlerini dropdown'a basan method. Mustafa Can Semerci 6.11.2020.
//alanID basılacak alanın id değeri, data doldurulacak veri dizisi.
function ParamDDLDoldur(alanID, data) {
    var str = "";
    str += "<option value='0'>Seçiniz</option>";
    for (var i of data) {
        var tanim = i.tanim == undefined ? i.tanim : i.tanim;
        str += "<option value='" + i.tabloID + "'>" + tanim + "</option>";
    }
    $("#" + alanID).html(str);
}

// Telefon numarası maskeleme (jquery.inputmask.bundle.min.js , moment.min.js ve select2.min.js kütüphaneleri gereklidir.) Bilal Köse 12.11.2020
function PhoneMask(tel) {
    $('[data-mask]').inputmask();
}

// İki tarih aralığındaki iş günlerini bulan method (moment.js kütüphanesi gereklidir.) Bilal Köse 16.11.2020
function getBusinessDays(startDate, endDate) {
    var startDateMoment = moment(startDate);
    var endDateMoment = moment(endDate);
    var days = Math.round(startDateMoment.diff(endDateMoment, 'days') - startDateMoment.diff(endDateMoment, 'days') / 7 * 2);
    if (endDateMoment.day() === 6) {
        days--;
    }
    if (startDateMoment.day() === 7) {
        days--;
    }
    return days;
}
// İki tarih aralığındaki haftasonların sayısını bulan method  Bilal Köse 16.11.2020
function getWeekendCountBetweenDates(startDate, endDate) {
    var totalWeekends = 0;
    for (var i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if (i.getDay() == 0 || i.getDay() == 1) totalWeekends++;
    }
    return totalWeekends;
}
// İki tarih aralığındaki haftasonlarını bulan method  Bilal Köse 17.11.2020
function calcBusinessDays(dDate1, dDate2) {
    if (dDate1 > dDate2) return false;
    var date = dDate1;
    var dates = [];

    while (date < dDate2) {
        if (date.getDay() === 0 || date.getDay() === 6) dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

//Model validation kontrolü için yazılan Handler methodunun return değerine göre ilgili sayfada "for" attribute'ü ilgili property ismi olan input label'larına ilgili error mesajını basan metot. 30.11.2020, Mustafa Can Semerci.
//ilgili C# metotu için: BazWebApp.Handlers.ModelValidationFilter
//ilgili label için kullanılan css class'ı site.css içinde ".validationMessage".
function errorHandler(e) {
    console.log(e);
    $('.validationMessage').hide();
    if (e.hasOwnProperty("responseJSON")) {
        if (e.responseJSON.hasOwnProperty("errors")) {
            var errors = e.responseJSON.errors;
            if (errors.length > 0) {
                $('.Dsbl').removeAttr("disabled");
                for (i = 0; i < errors.length; i++) {
                    if (errors[i].hasOwnProperty("metadata")) {
                        console.log(errors[i].metadata);
                        var keys = Object.keys(errors[i].metadata); //hataları tutan property nesnesi
                        if (keys.length > 0) {
                            for (var j = 0; j < keys.length; j++) {
                                //str += keys[0] + ":"; // property ismi
                                var str = errors[i].metadata[keys[j]]; //hata mesajı
                                if (keys[j].includes("[") && keys[j].includes("]")) {//array içindeki veriler için hata mesajı
                                    var valOfList = keys[j].substr(keys[j].indexOf(".") + 1)

                                    if (valOfList.includes("[") && valOfList.includes("]")) {
                                        var valOfList1 = valOfList.substr(valOfList.indexOf(".") + 1)
                                        var ustarrId = parseInt(keys[j].split("[")[1].split("]")[0]) + 1;
                                        var arrId = valOfList.split("[")[1].split("]")[0];
                                        $("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]:eq(" + arrId + ")").html(str);
                                        $("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]:eq(" + arrId + ")").show();
                                        GoFocusElem($("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]"));
                                        if (j == 0) {
                                            $("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]:eq(" + arrId + ")").focus();
                                        }
                                        $("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]:eq(" + arrId + ")").parent().find("select,input").change(function () {
                                            $(this).parent().find(".validationMessage").removeAttr("style");
                                        });
                                        $("#FormTekrar_" + ustarrId).find("[for=" + valOfList1 + "]:eq(" + arrId + ")").parent().find("input,textarea").focusout(function () {
                                            $(this).parent().nearest(".validationMessage").removeAttr("style");
                                        });
                                    }
                                    else {
                                        var arrId = keys[j].split("[")[1].split("]")[0];
                                        $("[for=" + valOfList + "]:eq(" + arrId + ")").html(str);
                                        $("[for=" + valOfList + "]:eq(" + arrId + ")").show();
                                        GoFocusElem($("[for=" + valOfList + "]"));
                                        if (j == 0) {
                                            $("[for=" + valOfList + "]:eq(" + arrId + ")").focus();
                                        }
                                        $("[for=" + valOfList + "]:eq(" + arrId + ")").parent().find("select,input").change(function () {
                                            $(this).parent().find(".validationMessage").removeAttr("style");
                                        });
                                        $("[for=" + valOfList + "]:eq(" + arrId + ")").parent().find("input,textarea").focusout(function () {
                                            $(this).parent().nearest(".validationMessage").removeAttr("style");
                                        });
                                    }
                                }
                                else if (keys[j].includes(".")) { // sub model verileri için hata mesajı
                                    var prop = keys[j].split(".")[1];
                                    $("[for=" + prop + "]").html(str);
                                    $("[for=" + prop + "]").show();
                                    GoFocusElem($("[for=" + prop + "]"));

                                    $("[for=" + prop + "]").parent().find("select,input").change(function () {
                                        $(this).parent().find(".validationMessage").removeAttr("style");
                                    });
                                    $("[for=" + prop + "]").parent().find("input,textarea").focusout(function () {
                                        $(this).parent().nearest(".validationMessage").removeAttr("style");
                                    });
                                } else {
                                    $("[for=" + keys[j] + "]").html(str);
                                    $("[for=" + keys[j] + "]").show();
                                    GoFocusElem($("[for=" + keys[j] + "]"));

                                    $("[for=" + keys[j] + "]").parent().find("select,input").change(function () {
                                        $(this).parent().find(".validationMessage").removeAttr("style");
                                    });
                                    $("[for=" + keys[j] + "]").parent().find("input,textarea").focusout(function () {
                                        $(this).parent().nearest(".validationMessage").removeAttr("style");
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
//Lokasyon koordinat alanları için numeric harici veri girişini engelleyerek 99.999999 şeklinde mask oluşturan metot. Mustafa Can Semerci 06.12.2020
//alanSelector olarak kullanılmak istenen filed'ın class veya id değeri '.class' / '#id' şeklinde verilerek document.ready alanında çağırılması yeterlidir.
function LocationInputMask(alanSelector) {
    $(alanSelector).inputmask({
        mask: "99[.999999]",
        greedy: false,
        definitions: {
            '*': {
                validator: "[0-9]"
            }
        }
    });
}
//Vergi No alanları için numeric harici veri girişini engelleyerek 9999999999 şeklinde 10 haneli mask oluşturan metot. Mustafa Can Semerci 07.01.2021
//alanSelector olarak kullanılmak istenen filed'ın class veya id değeri '.class' / '#id' şeklinde verilerek document.ready alanında çağırılması yeterlidir.
//Bu metot sadece veri girişini kontrol eder, kayıt sırasında kontrol için extra metot yazılmaıs gereklidir.
function VergiNoMask(alanSelector) {
    $(alanSelector).inputmask({
        mask: "9999999999",
        greedy: false,
        definitions: {
            '*': {
                validator: "[0-9]"
            }
        }
    });
}

//TC No alanları için numeric harici veri girişini engelleyerek 99999999999 şeklinde 11 haneli mask oluşturan metot. Mustafa Can Semerci 07.12.2021
//alanSelector olarak kullanılmak istenen filed'ın class veya id değeri '.class' / '#id' şeklinde verilerek document.ready alanında çağırılması yeterlidir.
//Bu metot sadece veri girişini kontrol eder, kayıt sırasında kontrol için extra metot yazılmaıs gereklidir.
function TCNoMask(alanSelector) {
    $(alanSelector).inputmask({
        mask: "99999999999",
        greedy: false,
        definitions: {
            '*': {
                validator: "[0-9]"
            }
        }
    });
}

//Ticaret Sicil No alanları için numeric harici veri girişini engelleyerek 999999 şeklinde 6 haneli mask oluşturan metot. Mustafa Can Semerci 07.12.2021
//alanSelector olarak kullanılmak istenen filed'ın class veya id değeri '.class' / '#id' şeklinde verilerek document.ready alanında çağırılması yeterlidir.
//Bu metot sadece veri girişini kontrol eder, kayıt sırasında kontrol için extra metot yazılmaıs gereklidir.
function TicaretSicilMask(alanSelector) {
    $(alanSelector).inputmask({
        mask: "999999",
        greedy: false,
        definitions: {
            '*': {
                validator: "[0-9]"
            }
        }
    });
}

//Ticaret Sicil No alanları için numeric harici veri girişini engelleyerek 999999 şeklinde 6 haneli mask oluşturan metot. Mustafa Can Semerci 07.12.2021
//alanSelector olarak kullanılmak istenen filed'ın class veya id değeri '.class' / '#id' şeklinde verilerek document.ready alanında çağırılması yeterlidir.
//Bu metot sadece veri girişini kontrol eder, kayıt sırasında kontrol için extra metot yazılmaıs gereklidir.
function IBANmask(alanSelector) {
    $(alanSelector).inputmask({
        mask: "AA99 9999 9999 9999 9999 9999 99",
        greedy: false,
        definitions: {
            '*': {
                validator: "^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$"
            }
        }
    });
}

//Girilen veri geçerli bir web sitesi / domain mi kontrolü. Mustafa Can Semerci 08.01.2021
function isWebSite(email) {
    var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/igm;
    return regex.test(email);
}

//Sayfaya harici eklenen tekrarlı alan yahut liste gibi dom elementlerini hedefleyen metotların element sayfaya yüklendikten sonra çağırılmasını sağlayacak fonksiyon. 8.01.2021 Mustfa Can Semerci.
function RunAfterElementExists(selector, callback) {
    var checker = window.setInterval(function () {
        if ($(selector).length) { //ilgili dom elementi yüklendi mi kontrolü
            clearInterval(checker); //element yüklendiyse beklemeyi bitirir
            callback(); //ilgili metodu çağırır.
        }
    }, 500); //saniyede 2 kez kontrol sağlar.
}
//CK Editor yüklendikten sonra ilgili callback metodunu çalıştıran metot. Mustafa Can Semerci 27.4.2021
function RunAfterEditorBuilds(editor, callback) {
    var checker = window.setInterval(function () {
        if (editor != undefined) { //ilgili dom elementi yüklendi mi kontrolü
            clearInterval(checker); //element yüklendiyse beklemeyi bitirir
            callback(); //ilgili metodu çağırır.
        }
    }, 500); //saniyede 2 kez kontrol sağlar.
}
//iban alanları için girilen veri geçerli bir iban adresi mi kontrolü. Mustafa Can Semerci 08.01.2021
function isIBAN(iban) {
    var regex = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/igm;
    return regex.test(iban);
}

function UlkeBayrakDropdownDoldur(icons, alan) {
    var str = "";
    $.each(icons, function (i, elem) {
        str += "<li><a class='countryCode' id='maks_1' href='javascript:;' value='" + elem + "'><img src='/lib/flag-icons/24x24/" + elem + ".png' /></a></li>";
    })
    $(alan).append(str);
}

function CustomInputMask(numaraAlani) {
    $(numaraAlani).inputmask("+\\90 (999) 999-9999");
    var flags = ["TR", "US", "GB", "RU"];
    UlkeBayrakDropdownDoldur(flags, "#phoneicons");
    var masks = [
        //{ val: "TR", mask: "+\\90 (999) 999-9999" },
        //{ val: "US", mask: "+1 (999) 999-9999" },
        //{ val: "GB", mask: "+44 9 (999) 999999" },
        //{ val: "RU", mask: "+7 (999) 9999999" }
    ];
    //$.ajax({
    //    type: "GET",
    //    url: "/Panel/UlkeMaskGetir",
    //    dataType: "json",
    //    data: null,
    //    success: function (result) {
    //        if (result.isSuccess == true) {
    //            data = result.value;
    //            for (var i of data) {
    //                var maskModel = {
    //                    val: i.ulkeKod,
    //                    mask: i.telefonMask
    //                }
    //                masks.push(maskModel);
    //            }
    //        } else {
    //            alertim.toast(siteLang.Hata, alertim.types.danger);
    //        }
    //    },
    //    error: function (e) {
    //        console.log(e);
    //    }, //success: function (result) {
    //});

    //$(document).on("click", ".countryCode", function (elem) {
    //    var countryVal = $(this).attr("value"); masks.forEach(function (item) {
    //        if (item.val == countryVal) {
    //            $(numaraAlani).inputmask(item.mask);
    //        }
    //    });
    //    $('#ddlImg').attr("src", "/lib/flag-icons/24x24/" + countryVal + ".png");
    //});
}
function CepTelefonuMask(numaraAlani) {
    $(numaraAlani).inputmask("+\\90 599 999 9999");
}
//$(".InputSil").change(function () {
//    readURL(this);
//});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            $("#blah1").attr("href", e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

//ckeditor 5 için, dışarıdan bir butonla edtor metnine ilgili text değerini ekleyen metot. //04.02.2021 Mustafa Can Semerci
function putElemAtEditor(editor, text, link = false) {
    customElem = editor.model.change(writer => {
        const insertPosition = editor.model.document.selection.getFirstPosition();
        if (link == true)
            writer.insertText("Tıklayın", { linkHref: text }, insertPosition);
        else
            writer.insertText(text, insertPosition);
    });
}

function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    if (!txtarea) {
        return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") {
        strPos = txtarea.selectionStart;
    }

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}

function getISOStringWithoutSecsAndMillisecs1(date) {
    var dateAndTime = date.toISOString().split('T');
    var time = dateAndTime[1].split(':');

    return dateAndTime[0] + 'T' + time[0] + ':' + time[1];
}
//Text'i panoya kopyalamayı sağlar
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
// string olarak verilen sn'yi dk çevirir.
String.prototype.toHMS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? minutes = "0" + minutes : minutes;
    seconds = (seconds < 10) ? seconds = "0" + seconds : seconds;
    return (hours != "00") ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
}

function OutlookIcsOlustur(baslik, mesaj, url, basTrh, bitTrh) {
    var cal = ics();
    cal.addEvent(baslik, mesaj, url, basTrh, bitTrh);
    cal.download(baslik);
}
function googleEventAktar(baslik, mesaj, url, basTrh, bitTrh, sprop) {
    return `http://www.google.com/calendar/event?action=TEMPLATE&text=${baslik}&dates=${basTrh}/${bitTrh}&details=${mesaj}&location=${url}&sprop=website:${sprop}`;
}

function GoFocusElem(elem) {
    elem[0].scrollIntoView();
    window.scrollBy(0, -50);
}

//Dakika olarak gelen veriyi HH:MM:SS formatına çevirir
//function minuteFormatToHHMMSS(sure) {
//    var dakika = Math.floor(sure / 60);
//    var saniye = Math.floor(sure % 60);
//    var saat = Math.floor(dakika / 60);
//    dakika = Math.floor(dakika % 60);

//    var hours;
//    var minutes;
//    var seconds;

//    if (saat < 10) { hours = "0" + saat } else {
//        hours = saat;
//    }
//    if (dakika < 10) { minutes = "0" + dakika; } else {
//        minutes = dakika;
//    }
//    if (saniye < 10) { seconds = "0" + saniye; } else {
//        seconds = saniye;
//    }

//    var result = (hours + ":" + minutes + ":" + seconds);
//    return result;
//}

// Klavyeden 1 ile 999.999 arası sayı girmeye zorlama
function NumberExceptZero() {
    $(".ExcZ").attr("onkeyup", "if(this.value>999999){this.value='999999';}else if(this.value<0){this.value='0';}");
}

function lisansSonKullanimTarihi(days) {
    const dat = new Date()
    dat.setDate(dat.getDate() + parseInt(days))
    return dat
}

function htmlDecode(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];
    if (text && typeof text === 'string') {
        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
        return text;
    }
}

// String gelen true false değerini bool değere çevirme
function stringToBool(text) {
    if (text == "true") {
        text = true
        return text
    }
    text = false
    return text;
}

//İki json object arasındaki property farklılıklarını bulup return eden metot. Mustafa Can Semerci 30.11.2021
function getDifferences(oldObj, newObj) {
    var diff = {
        old: {},
        new: {}
    };

    for (var k in oldObj) {
        if (!(k in newObj))
            diff.old[k] = oldObj[k];  // property gone so explicitly set it undefined
        //else if (oldObj[k] !== newObj[k])
        //    diff[k] = newObj[k];  // property in both but has changed
    }

    for (k in newObj) {
        if (!(k in oldObj))
            diff.new[k] = newObj[k]; // property is new
    }

    return diff;
}


function currencyFormetter(price, currency) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    var priceFormat = formatter.format(price);
    return priceFormat;
}

function strArrayToInt(list) {
    let result = [];
    for (item of list) {
        result.push(parseInt(item))
    }
    return result;
}


function MakeDatatable(x, y) {
    let tableId = "#" + x;
    if (y == true) {
        //$(tableId).DataTable().destroy();
        //$(tableId).DataTable().clear();

        $(tableId).DataTable({
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
            "dom": 'Bfrtip',

            "buttons": [
                {
                    "extend": 'excel',
                    "text": siteLang.ExceleAktar,
                    "className": "btn btn-success",
                    "exportOptions": {
                        "columns": ":not(:last-child)"
                    }
                }]
        })
    } else {
        //$(tableId).DataTable().destroy();
        //$(tableId).DataTable().clear();

        $(tableId).DataTable({
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
            ]
        })

    }

}