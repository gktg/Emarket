
$(document).ready(function () {
    getPlatformlar();
    getConversations();
    getMessages();
    searchMessages();
    getSearchedMessage();
    getSelectedMessages();//değiştir
    makeVisibleMessagesCheckBoxes();
    getGetArananMesajKonusmasi();
    $('.tool_tip').tooltip('show');
});


/*platformalari getriren fonk starts from here */
function getPlatformlar() {
    $.ajax({
        url: '/Cleopatra/PlatformlariGetir/',
        type: 'GET',
        contentType: "application/json",
        success: function (data) {
            $('#platformId').find('option').remove();
            $('#platformId').append(`<option selected value="0">Platform Seçiniz</option>`);
            $.each(data.value, function (index, platform) {
                $('#platformId').append('<option value="' + platform.tabloID + '">' + platform.sosyalMedyaPlatformAdi + '</option>')
            })
            
        },

    });
};
/*platformalari getriren fonk  ends here */

/*tum konusmalari getiren fonk starts from here */
function getConversations() {
    $(document).on('click', '#btnGetConversations', function (event) {
        event.preventDefault();
        const placeHolderDiv = $('#inboxTableBody');
        placeHolderDiv.empty();
        $('.spinnerConversations').show();
        $('#chatBody').empty();
        $('#tumKonusmaDiv').hide();
        const selectedSubeId = $('#subeId').val();
        const selectedPlatformId = $('#platformId').val();
        $.ajax({
            url: '/Cleopatra/KonusmalariGetir/',
            type: 'GET',
            contentType: "application/json",
            data: {
                subeId: selectedSubeId,
                platformId: selectedPlatformId
            },
            success: function (data) {
                if (data.value.conversationsVM.length == 0) {
                    alertim.toast("Stüdyonuzu ve platform seçiniz...", "warning");
                };
                placeHolderDiv.empty();
                $('.spinnerConversations').hide();
                $.each(data.value.conversationsVM, function (index, conversation) {
                    placeHolderDiv.append(`
					<a href="#" class="list-group-item list-group-item-action border-0 conversation" data-id=${conversation.tabloID}>
						<div class="badge bg-success float-right"></div>
						<div class="d-flex align-items-start">
                                <i class="fab fa-facebook-messenger" style="font-size:30px"></i>
							<div class="flex-grow-1 ml-3">
								 ${conversation.kullaniciAdi}
								<div class="small"><span class="fas fa-circle chat-online"></span></div>
							</div>
						</div>
					</a>
                    `);
                });
            },
            error: function () {
            }
        })

    });
};
/*tum konusmalari getiren fonk ends here */

/*aranan kelimeyi iceren konusmalari  fonk. starts from here  */
function searchMessages() {
    $(document).on('click', '#btnSearchMsg', function () {
        ClearChatBody();
        $('.spinnerConversations').show();
        const selectedSubeId = $('#subeId').val();
        const selectedPlatformId = $('#platformId').val();
        const searchText = $('#searchBox').val();
        const placeHolderDiv = $('#inboxTableBody');

        placeHolderDiv.empty();
        var urlAjax = "";
        if (selectedSubeId == 0 && selectedPlatformId == 0 && searchText != null) {
            urlAjax = '/Cleopatra/MesajlardaAraWithText/';
        } else if (selectedSubeId != 0 && selectedPlatformId == 0 && searchText != null) {
            urlAjax = '/Cleopatra/MesajlardaAraWithTextAndKurum/';
        } else if (selectedSubeId == 0 && selectedPlatformId != 0 && searchText != null) {
            urlAjax = '/Cleopatra/MesajlardaAraWithTextPlatform/';
        } else {
            urlAjax = '/Cleopatra/MesajlardaAra/';
        }
        placeHolderDiv.empty();
        $.ajax({
            url: urlAjax,
            type: 'GET',
            contentType: "application/json",
            data: {
                kurumId: selectedSubeId,
                platformId: selectedPlatformId,
                searchText: searchText
            },
            success: function (data) {
                if (data.value == null) {
                    alertim.toast("aramak istediğiniz kelimeyi giriniz", "warning");
                    $('.spinnerConversations').hide();
                }
                if (data.value.length == 0) {
                    placeHolderDiv.append(`<div style="color:red">mesaj bulunamadi</div>`);
                }
                $('.spinnerConversations').hide();
                $.each(data.value, function (index, chatPageVm) {
                    placeHolderDiv.append(`
                        <a href="#" class="list-group-item list-group-item-action border-0 searchedConversations"style="color:blue" data-mask-id=${chatPageVm.messageVM.mesajMask} data-conversation-id=${chatPageVm.conversationVM.tabloID}>
						<div class="badge bg-success"></div>
						<div class="d-flex align-items-start">
							<div class="flex-grow-1 ml-3>
								 
								<div class="small">Gönderen: ${chatPageVm.kullaniciAdi}<br/><div style="color:red">${chatPageVm.messageVM.mesajYaziIcerigi}</div></div>
							</div>
						</div>
					</a>
                        
                    `);
                })
            }
        });
    });
};
/*aranan kelimeyi içeren konusmalari  fonk.  */



/*arama sonucunda gelen konusmaya tiklaninca... starts from here  */
var konusmaId = 0;
function getSearchedMessage() {
    $(document).on('click', '.searchedConversations', function () {
        event.preventDefault();
        $('#tumKonusmaDiv').hide();
        const chatHolder = $("#chatBody");
        chatHolder.empty();
        $('.spinnerMessages').show();
        const mesajMask = $(this).attr('data-mask-id');
        const conversationId = $(this).attr('data-conversation-id');
        $.ajax({
            url: '/Cleopatra/MesajiGetir/',
            type: 'GET',
            contentType: "application/json",
            data: {
                konusmaId: conversationId,
                mesajMask: mesajMask
            },
            success: function (data) {
                $('.spinnerMessages').hide();
                $('#tumKonusmaDiv').show();
                const message = data.value.messageVM;
                konusmaId = message.sosyalMedyaKonusmaID;
                if (message.isMesajiGonderenKullanici) {
                    if (message.mesajYaziIcerigi !== null) {
                        chatHolder.append(`
                             <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                            </div>
                            `);
                    } else {
                        chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}"  class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                            </div>
                            `);
                    }

                } else {
                    if (message.mesajYaziIcerigi !== null) {
                        chatHolder.append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                            </div>
                            `);
                    } else {
                        chatHolder.append(` 
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}"  class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30" aranan-konusma-id=${conversationId}>
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                            </div>
                            `);
                    }
                }


            },
            error: function () {
                alert("error");
            }
        })
    });

};
/*arama sonucunda gelen konusmaya tiklaninca...ends here */

/*btn-read starts from here*/
function getMessages() {
    $(document).on('click', '.conversation', function (event) {
        event.preventDefault();
        const chatHolder = $("#chatBody");
        chatHolder.empty();
        $('.spinnerMessages').show();
        const id = $(this).attr('data-id');
        $.ajax({
            url: '/Cleopatra/MesajlariGetir/',
            type: 'GET',
            contentType: "application/json",
            data: {
                id: id,
            },
            success: function (data) {
                chatHolder.append(`
                                </br>
                                <div class="float-right" style="margin-top:-56px;margin-right:12px">
                            <label title="secilen mesajlari getir">
                           <input type="image" id="btnGetSelectedMessages" src="/img/shareMessages.png" style="display:none;max-height:33px;max-width:33px;margin-top:-30px"/>
                                <label class="switch" title="mesajlari seçin">
                                <input type="checkbox" id="togBtn" style="background: white; border-color: white">
                                <div class="slider round"id="checkBoxSlider">
                                <span class="on">seç</span>
                                <span class="off"></span>
                                </div>
                                </label>
                                </div>
                                

                                
                                      
                                  `);
                $('.spinnerMessages').hide();
                $.each(data.value.messagesVM, function (index, message) {
                    if (message.isMesajiGonderenKullanici) {
                        if (message.mesajYaziIcerigi !== null) {
                            chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}" style="display:none">
                                </div>
                            </div>
                            `);
                        } else {
                            chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}"  style="display:none">
                                </div>
                           </div>
                            `);

                        }

                    } else {
                        if (message.mesajYaziIcerigi !== null) {
                            chatHolder.append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}"  style="display:none">
                                </div>
                            </div>
                            `);
                        } else {
                            chatHolder.append(` 
                                 
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}"  style="display:none">
                                </div>
                            </div>
                            `);

                        }
                    }
                });


            },
            error: function () {
            }
        })


    });
};
/*btn-read ends here*/

/*aranan mesajin tum mesajlarini getiren fonk starts from here*/
function getGetArananMesajKonusmasi() {
    $(document).on('click', '#btnArananKonusma', function (event) {

        event.preventDefault();
        ClearChatBody();
        $('#tumKonusmaDiv').hide();
        $('.spinnerMessages').show();
        const id = $("#aranan-konusma-id").val();
        $.ajax({
            url: '/Cleopatra/MesajlariGetir/',
            type: 'GET',
            contentType: "application/json",
            data: {
                id: konusmaId,
            },
            success: function (data) {

                const chatHolder = $("#chatBody");
                chatHolder.append(`
                                   </br>
                                <div class="float-right" style="margin-top:-56px;margin-right:12px">
                            <label title="secilen mesajlari getir">
                           <input type="image" id="btnGetSelectedMessages" src="/img/shareMessages.png" style="display:none;max-height:33px;max-width:33px;margin-top:-30px"/>
                                <label class="switch" title="mesajlari seçin">
                                <input type="checkbox" id="togBtn" style="background: white; border-color: white">
                                <div class="slider round"id="checkBoxSlider">
                                <span class="on">seç</span>
                                <span class="off"></span>
                                </div>
                                </label>
                                </div>
                                      
                                  `);
                $('.spinnerMessages').hide();
                $.each(data.value.messagesVM, function (index, message) {
                    if (message.isMesajiGonderenKullanici) {
                        if (message.mesajYaziIcerigi !== null) {
                            chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}" style="display:none">
                                </div>
                            </div>
                            `);
                        } else {
                            chatHolder.append(`
                            <div class="chat-message-left pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Sharon Lessman" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    <div class="font-weight-bold mb-1">${message.kullaniciAdi}</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}" style="display:none">
                                </div>
                            </div>
                            `);

                        }

                    } else {
                        if (message.mesajYaziIcerigi !== null) {
                            chatHolder.append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    ${message.mesajYaziIcerigi}
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}" style="display:none">
                                </div>
                            </div>
                            `);
                        } else {
                            chatHolder.append(` 
                                 
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${data.value.imagePathForChatBox}" class="rounded-circle mr-1" alt="Chris Wood" width="30" height="30">
                                    <div class="text-muted small text-nowrap mt-2">${message.mesajGelmeTarihi} </div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1">Siz</div>
                                    <img src="${message.mesajEki}""width="200" height="200">
                                </div>
                                <div>
                                            <input type="checkbox" class="chckbxMessage" id=" ${message.tabloID}" style="display:none">
                                </div>
                            </div>
                            `);

                        }
                    }
                });


            },
            error: function () {
            }
        })

    });
};
/*aranan mesajin tum mesajlarini getiren fonk starts from here*/

/* checkBox ile secilen mesajlari ayri sayfada getiren fonk. starts from here */
function getSelectedMessages() {
    $(document).on('click', '#btnGetSelectedMessages', function () {
        var list = [];
        //$('#chatBody input:checked')
        $('#chatBody .chckbxMessage:checked').each(function () {
            list.push(parseInt(this.id));//checked id'leri bu listede  tut
        });
        if (list.length <= 0) {
            alertim.toast("mesaj seçiniz", "warning");
        }
        else {
            sessionStorage.setItem("messagesIds", list); //local storage'e gonder
            location.href = "/Cleopatra/GetSelectedMessagesPage";//bu adrese git
        }
    }
    )
};
/* checkBox ile secilen mesajlari ayri sayfada getiren fonk. ends here */

/* chatBody'i clear'layan fonks. starts from here */
function ClearChatBody() {
    const chatHolder = $("#chatBody");
    chatHolder.empty();
};
/* chatBody'i clear'layan fonks. ends here */

/* btnGetVisibleBoxes(checkbox'lari visible yapan buton) starts from here */
function makeVisibleMessagesCheckBoxes() {
    $(document).on('click', '#togBtn', function () {

        if ($('#togBtn').is(':checked')) {
            $("#btnGetSelectedMessages").show();
            $('#chatBody [type="checkbox"]').each(function (index, checkbox) {

                $(checkbox).show();

            });

        }
        else {
            $("#btnGetSelectedMessages").hide();
            $('#chatBody [type="checkbox"]').each(function (index, checkbox) {

                $(checkbox).hide();

            });
        }
    });
};
/* btnGetVisibleBoxes(checkbox'lari visible yapan buton) ends here */