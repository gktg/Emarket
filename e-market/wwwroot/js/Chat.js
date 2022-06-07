const OFFLIE_MESSAGE_TAG = "chatMessages";
const OFFLIE_USER_TAG = "chatUsers";
let chatHubConnected = false;
const uid = document.getElementsByTagName("body")[0].getAttribute("data-id");
const sessionId = document.getElementById("site-id").value;
const sessionName = document.getElementById("site-name").value;
const myUser = { id: uid, name: sessionName };
//const chatHubUrl = $("#site-urlSocket").val()+"/chatHub?sessionId=" + sessionId;
//const chatHubUrl = "https://digiforceweb.mayaict.com.tr:51309/chatHub?sessionId=" + sessionId;
//const chatHubUrl = "http://localhost:51309/chatHub?sessionId=" + sessionId;
const chatConnection = new signalR.HubConnectionBuilder()
    .withUrl(chatHubUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();
chatConnection.serverTimeoutInMilliseconds = 1000 * 60 * 120; // 1 second * 60 * 1 = 1 minutes.
chatConnection.keepAliveIntervalInMilliseconds = 1000 * 60 * 60; // 1 second * 60 * 1 = 1 minutes.
chatConnection.on("UpdateUsers", function (list) {
    pushOfflineUsers(list);
    updateUserList(list);
})
chatConnection.on("ReceiveMessage", function (fromUser, message) {
    AppendChatArea(fromUser.id, fromUser.name);
    var div = document.getElementById("messages-" + fromUser.id);
    $(div).append(messaageLeft({ message, user: fromUser }))
    div.scrollTop = div.scrollHeight;
    chatConnection.invoke("wasSeen", message.id);
    playSound();
})
chatConnection.on("SuccessMessage", function (toUser, message) {
    AppendChatArea(toUser.id, toUser.name);
    appendMyMessage(toUser, message);
})
chatConnection.on("ReceiveHistory", function (toUser, messages) {
    ReceiveHistory(toUser, messages);
})
chatConnection.on("WasSeenReceive", function (id) {
    $("#message-" + id + " i").addClass("fa-check-double");
})
chatConnection.on("ReceiveUnreadedMessages", function (list) {
    var html = "";
    var totalCount = 0
    for (var i = 0; i < list.length; i++) {
        if (list[i].Id != uid) {
            totalCount += list[i].Count
            html += unreadMesage(list[i]);
        }
    }
    if (html == "") {
        html += siteLang.Yenibirmesajınızbulunmamaktadır;
        $("#chatUnreadMessages").html(html);
    }
    if (totalCount == 0)
        $("#chatUnreadDivCount").css("display", "none");
    else
        $("#chatUnreadDivCount").css("display", "block");

    $("#chatUnreadMessages").html(html);
    $("#chatUnreadMessagesCount").html(totalCount);
})
async function chatConnectionstart() {
    chatHubConnected = false;
    try {
        //await chatConnection.start();
        chatHubConnected = true;
        CheckOfflineMessages();
    } catch (err) {
        setTimeout(chatConnectionstart, 5000);
        updateUserList(await getOfflineUsers());
    }
};
chatConnection.onclose(chatConnectionstart);
chatConnectionstart();

function AppendChatArea(to, name) {
    if ($("#chat-" + to).length) {
        $("#chat-" + to).removeAttr("style")
        if ($("#chat-" + to + ".collapsed-card").length) {
            $("#chat-" + to + " [data-card-widget='collapse']").click();
        }
        return;
    }

    var m = `
<div id="chat-${to}" to="${to}" class="card direct-chat direct-chat-danger col-lg-3">
  <div class="card-header">
    <h3 class="card-title">${name}</h3>
    <div class="card-tools">
      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
      <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i>
      </button>
    </div>
  </div>
  <div class="card-body">
    <div id="messages-${to}" class="direct-chat-messages">
    </div>
  </div>
  <div class="card-footer">
      <div class="input-group">
        <input type="text" id="message-text-${to}" name="message" placeholder="..." class="form-control msg-area">
        <span class="input-group-append">
          <button type="button" class="btn btn-info upload-doc"><i class="fas fa-paperclip"></i></button>
          <button type="button" class="btn btn-danger send-message"><i class="fas fa-rocket"></i></button>
        </span>
      </div>
  </div>
  <input type="file" hidden="hidden" class="msgdocupload">
</div>
`

    $("#chat-container").append(m)
    GetHistory(to);
}

function messaageLeft(obj) {
    var m = `
<div class="direct-chat-msg">
  <div class="direct-chat-infos clearfix">
    <span class="direct-chat-name float-left">${obj.user.name}</span>
    <span class="direct-chat-timestamp float-right">${obj.message.date}</span>
  </div>
  <img class="direct-chat-img" src="/images/blankprofile.png">
  <div id="message-${obj.message.id}" class="direct-chat-text">
    ${obj.message.text}
  </div>
</div>
`
    return m;
}

function messageRight(obj) {
    var status = messageStatus(obj.message.wasSeen);

    var m = `
<div class="direct-chat-msg right">
  <div class="direct-chat-infos clearfix">
    <span class="direct-chat-name float-right">${obj.user.name}</span>
    <span class="direct-chat-timestamp float-left">${obj.message.date}</span>
  </div>
  <img class="direct-chat-img" src="/images/blankprofile.png">
  <div id="message-${obj.message.id}" class="direct-chat-text">
    <i class="fas fa-${status} chat-status"></i>
    ${obj.message.text}
  </div>
</div>
`
    return m;
}

function messageStatus(status) {
    var s = "clock";
    if (status === true) {
        s = "check-double"
    } else if (status === false) {
        s = "check"
    }
    return s;
}

function unreadMesage(obj) {
    var m = `
<a class="dropdown-item chatuser" data-id="${obj.Id}" data-name="${obj.Name}">
  <div class="media">
    <div class="media-body">
      <h3 class="dropdown-item-title">
        ${obj.Name}
        <span class="float-right text-sm text-danger">${obj.Count} <i class="far fa-comment"></i></span>
      </h3>
      <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i>${obj.LastMessageDate}</p>
    </div>
  </div>
</a>
`
    return m;
}

function chatUser(obj) {
    var m = `
<a class="dropdown-item chatuser" data-id="${obj.Id}" data-name="${obj.Name}">
    <div class="media">
        <div class="media-body">
            <h3 class="dropdown-item-title">
                ${obj.Name}
                <span class="float-right text-sm text-${(obj.IsOnline ? "success" : "danger")}"><i class="fas fa-signal"></i></span>
            </h3>
        </div>
    </div>
</a>
`
    return m;
}

async function GetHistory(toId) {
    if (chatHubConnected) {
        chatConnection.invoke("getHistory", toId);
    } else {
        var messages = await getOfflineMessages();
        var toMessages = messages.filter(o => o.to == toId)
        if (toMessages.length) {
            var toUser = { id: toMessages[0].to }
            var messages = toMessages.map(o => ({ text: o.message, fromID: uid, date: "" }));
            ReceiveHistory(toUser, messages);
        }
    }
}

function appendMyMessage(toUser, message) {
    var div = document.getElementById("messages-" + toUser.id);
    $(div).append(messageRight({ message, user: myUser }))
    div.scrollTop = div.scrollHeight;
    $("#message-text-" + toUser.id).val("")
}

async function ReceiveHistory(toUser, messages) {
    var div = document.getElementById("messages-" + toUser.id);
    $(div).html("");
    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        if (message.fromID == uid) {
            $(div).append(messageRight({ message, user: myUser }))
        } else {
            $(div).append(messaageLeft({ message, user: toUser }))
        }
    }
    div.scrollTop = div.scrollHeight;
}

function playSound() {
    var audio = document.getElementById("notificationSound");
    audio.muted = false;
    audio.play();
}
async function pushOfflineMessage(to, message) {
    var list = await getOfflineMessages()
    list.push({ to, message })
    OfflineCache.put(OFFLIE_MESSAGE_TAG, JSON.stringify(list));
}

async function getOfflineMessages() {
    var j = await OfflineCache.get(OFFLIE_MESSAGE_TAG);
    return j || [];
}

async function deleteOfflineMessages() {
    await OfflineCache.delete(OFFLIE_MESSAGE_TAG);
}

async function pushOfflineUsers(list) {
    OfflineCache.put(OFFLIE_USER_TAG, JSON.stringify(list));
}

async function getOfflineUsers() {
    var j = await OfflineCache.get(OFFLIE_USER_TAG);
    return j || [];
}

async function CheckOfflineMessages() {
    var list = await getOfflineMessages();
    if (list) {
        deleteOfflineMessages();
        for (var i = 0; i < list.length; i++) {
            SendMessage(list[i].to, list[i].message);
        }
        var toList = list.map(o => o.to).uniqueObjects();
        for (var i = 0; i < toList.length; i++) {
            if ($("#messages-" + toList[i]).length) {
                GetHistory(toList[i]);
            }
        }
    }
}
async function SendMessage(to, message) {
    if (message == "") {
        return;
    }
    message = Linkify(message);
    if (chatHubConnected) {
        chatConnection.invoke("sendMessage", to, message);
    } else {
        await pushOfflineMessage(to, message);
        var toUser = { id: to }
        var message = { text: message, date: "" };
        appendMyMessage(toUser, message);
    }
}

async function updateUserList(list) {
    var html = "";
    var onlineCount = 0
    for (var i = 0; i < list.length; i++) {
        if (list[i].Id != uid) {
            if (list[i].IsOnline) {
                ++onlineCount
            }
            html += chatUser(list[i]);
        }
    }
    if (onlineCount == 0) {
        $("#usercountDiv").css("display", "none");
    } else {
        $("#usercountDiv").css("display", "block");
    }
    $("#chatUsers").html(html);
    $("#chatUsersCount").html(onlineCount);
    userSearchRender();
}

function userSearchRender() {
    var text = $(".search-user").val().toLowerCase();
    $(".chatuser").removeAttr("hidden");
    if (text != "") {
        $(".chatuser").each(function () {
            var name = $(this).data("name").toLowerCase();
            if (!name.includes(text)) {
                $(this).attr("hidden", "");
            }
        })
    }
}

$(document).on("click", ".send-message", function () {
    var btn = this;
    var to = parseInt($(btn).closest("[to]").attr("to"));
    var message = $("#message-text-" + to).val();
    SendMessage(to, message);
});
$(document).on('keyup', ".msg-area", function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        var btn = this;
        var to = parseInt($(btn).closest("[to]").attr("to"));
        var message = $("#message-text-" + to).val();
        SendMessage(to, message);
    }
});
$(document).on("click", ".chatuser", function () {
    var btn = this;
    var id = $(btn).data("id")
    var name = $(btn).data("name")
    AppendChatArea(id, name)
})
$(".search-user").on("keyup", function () {
    userSearchRender();
})

$(document).on("click", ".upload-doc", function () {
    $('.msgdocupload').click();
});
$(document).on("change", ".msgdocupload", function () {
    var btn = this;
    var to = parseInt($(btn).closest("[to]").attr("to"));
    uploadDocument(to, btn);
});
function sendDocument() {
}
function uploadDocument(to, e) {
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
        success: function (result) {
            if (result.isSuccess) {
                var link = result.value.medyaUrl;
                //let message = $("#site-urlMedya").val() + link;
                SendMessage(to, "");
            } else {
                alertim.toast(siteLang.Hata, "error");
            }
        },
        error: function (e) {
            alertim.toast(siteLang.Hata, "error");
        }
    });
}