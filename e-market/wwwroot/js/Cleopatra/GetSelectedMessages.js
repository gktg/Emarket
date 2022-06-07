var list;
var intList;
const chatHolder = $("#chatBodySelected");
const headerHolder = $("#kisiHeader");
$(document).ready(function () {
    list = sessionStorage.getItem("messagesIds");
    intList = list.split(',').map(function (item) {
        return parseInt(item);
    });
    getSelectedMessages2();
});
function getSelectedMessages2() {
    $.ajax({
        url: '/Cleopatra/GetSelectedMessages/',
        type: 'POST',
        //contentType: "application/json",
        dataType: "json",
        data: { messageIds: intList },
        success: function (data) {
            headerHolder.append(`${data.value.messagesVM[0].kullaniciAdi}`);
            $.each(data.value.messagesVM, function (index, message) {
                if (message.isMesajiGonderenKullanici) {
                    if (message.mesajYaziIcerigi !== null) {
                        chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div></br>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="20" height="20">${message.mesajYaziIcerigi}
                                <div class="text-muted small text-nowrap py-2 px-3 ml-3 mt-2">
                                        ${message.mesajGelmeTarihi}
                                 </div>
                                </div>
                            </div>
                            `);
                    } else {
                        chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div></br>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                      <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="20" height="20">
                                    <img src="${message.mesajEki}""width="200" height="200">
                                <div class="text-muted small text-nowrap py-2 px-3 ml-3 mt-2">
                                        ${message.mesajGelmeTarihi}
                                 </div>
                                </div>
                           </div>
                            `);

                    }

                } else {
                    if (message.mesajYaziIcerigi !== null) {
                        chatHolder.append(`
                            <div class="chat-message-right pb-4">
                                <div></br>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    
                                        <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="20" height="20">
                                        ${message.mesajYaziIcerigi}
                                <div class="text-muted small text-nowrap py-2 px-3 ml-3 mt-2">
                                        ${message.mesajGelmeTarihi}
                                 </div>
                                </div>

                            </div>
                            `);
                    } else {
                        chatHolder.append(`

                            <div class="chat-message-right pb-4">
                                <div></br>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>

                                        <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="20" height="20">
                                        ${message.mesajEki}
                                <div class="text-muted small text-nowrap py-2 px-3 ml-3 mt-2">
                                        ${message.mesajGelmeTarihi}
                                 </div>
                                </div>

                            </div>
                            `);

                    }
                }
            });
        },
        error: function (data) {
            alert("error!");
        }
    });
}