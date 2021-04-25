feather.replace();

var convo = document.getElementById('convo');
convo.scrollTo(0, convo.scrollHeight);

$(function(){
    $.get('src/js/conversation.json', function(response){
        // console.log(response);

        var html = '';
        $.each(response, function(index, value){
            let conversation = value.conversations;
            let status = (conversation.status == 'unread') ? 'text-unread' : '';

            if(conversation.type == "group"){
                let firstFour = conversation.member.slice(0, 4);
                let moreMember = conversation.member.length - 4;
                // console.log(firstFour);

                html += '<button type="button" class="conversations btn-convo btn-convo-'+ index +' py-2 px-3" id="'+ index +'" onclick="openConversation('+ index +')">';
                    html += '<div class="image-wrapper image-wrapper-group mr-2">';
                        html += '<span>';
                            html += '<img src="'+ firstFour[0].profile_picture +'" alt="'+ firstFour[0].name +'" class="img-fluid-group">';
                            html += '<img src="'+ firstFour[1].profile_picture +'" alt="'+ firstFour[1].name +'" class="img-fluid-group">';
                        html += '</span>';
                        html += '<span class="position-relative">';
                            html += '<img src="'+ firstFour[2].profile_picture +'" alt="'+ firstFour[0].name +'" class="img-fluid-group">';
                            html += '<img src="'+ firstFour[3].profile_picture +'" alt="'+ firstFour[1].name +'" class="img-fluid-group">';
                        html += '<span class="count-members">+'+moreMember+'</span>';
                        html += '</span>';
                    html += '</div>';
                    html += '<div class="persons-chat w-100">';
                        html += '<span class="persons-name">'+ conversation.group_name +'</span>';
                        html += '<span class="persons-text text-muted">';
                            html += '<span class="text text-truncate">Aiony Haust: text here</span>';
                            html += '<span>10:32PM</span>';
                        html += '</span>';
                    html += '</div>';
                html += '</button>';
            }else{
                html += '<button type="button" class="conversations btn-convo btn-convo-'+ index +' py-2 px-3" id="'+ index +'" onclick="openConversation('+ index +')">';
                    html += '<div class="image-wrapper mr-2">';
                        html += '<img src="' + conversation.member.profile_picture + '" alt="' + conversation.member.name + '" class="img-fluid-cover">';
                        html += '<span class="person-status ' + conversation.member.account_status + '"></span>';
                    html += '</div>';
                    html += '<div class="persons-chat w-100">';
                        html += '<span class="persons-name">' + conversation.member.name + '</span>';
                        html += '<span class="persons-text text-muted '+ status +'">';
                            html += '<span class="text text-truncate">'+ conversation.text_from + ': ' + conversation.last_text +'</span>';
                            html += '<span>'+ conversation.date_time +'</span>';
                        html += '</span>';
                    html += '</div>';
                html += '</button>';   
            }

            $('#conversation-area').html(html);
        });

        $('#search-name').on('keyup', function(){
            let searchName = $(this).val();
            let searchResults = [];
            let search_html = '';
            let noResult = '';

            // clean or empty conversation area
            $('#conversation-area').empty();
            // ends here           

            // search name
            response.filter(function(value){
                let flags = "gi";
                let pattern = new RegExp(searchName, flags);

                if (value.conversations.type == "group"){
                    let result = pattern.test(value.conversations.group_name);
                    if(result){
                        searchResults.push(value);    
                    }
                }else{
                    let result = pattern.test(value.conversations.member.name);
                    if(result){
                        searchResults.push(value);    
                    }
                }
            });

            // console.log(searchResults);
            // ends here

            // show results
            if(searchResults.length != 0){
                $.each(searchResults, function(index, value){
                    
                    let conversation = value.conversations;
                    let status = (conversation.status == 'unread') ? 'text-unread' : '';

                    if(conversation.type == "group"){
                        let firstFour = conversation.member.slice(0, 4);
                        let moreMember = conversation.member.length - 4;
                        // console.log(firstFour);

                        search_html += '<button type="button" class="conversations btn-convo btn-convo-'+ index +' py-2 px-3" id="'+ index +'" onclick="openConversation('+ index +')">';
                            search_html += '<div class="image-wrapper image-wrapper-group mr-2">';
                                search_html += '<span>';
                                    search_html += '<img src="'+ firstFour[0].profile_picture +'" alt="'+ firstFour[0].name +'" class="img-fluid-group">';
                                    search_html += '<img src="'+ firstFour[1].profile_picture +'" alt="'+ firstFour[1].name +'" class="img-fluid-group">';
                                search_html += '</span>';
                                search_html += '<span class="position-relative">';
                                    search_html += '<img src="'+ firstFour[2].profile_picture +'" alt="'+ firstFour[0].name +'" class="img-fluid-group">';
                                    search_html += '<img src="'+ firstFour[3].profile_picture +'" alt="'+ firstFour[1].name +'" class="img-fluid-group">';
                                search_html += '<span class="count-members">+'+moreMember+'</span>';
                                search_html += '</span>';
                            search_html += '</div>';
                            search_html += '<div class="persons-chat w-100">';
                                search_html += '<span class="persons-name">'+ conversation.group_name +'</span>';
                                search_html += '<span class="persons-text text-muted">';
                                    search_html += '<span class="text text-truncate">Aiony Haust: text here</span>';
                                    search_html += '<span>10:32PM</span>';
                                search_html += '</span>';
                            search_html += '</div>';
                        search_html += '</button>';
                    }else{
                        search_html += '<button type="button" class="conversations btn-convo btn-convo-'+ index +' py-2 px-3" id="'+ index +'" onclick="openConversation('+ index +')">';
                            search_html += '<div class="image-wrapper mr-2">';
                                search_html += '<img src="' + conversation.member.profile_picture + '" alt="' + conversation.member.name + '" class="img-fluid-cover">';
                                search_html += '<span class="person-status ' + conversation.member.account_status + '"></span>';
                            search_html += '</div>';
                            search_html += '<div class="persons-chat w-100">';
                                search_html += '<span class="persons-name">' + conversation.member.name + '</span>';
                                search_html += '<span class="persons-text text-muted '+ status +'">';
                                    search_html += '<span class="text text-truncate">'+ conversation.text_from + ': ' + conversation.last_text +'</span>';
                                    search_html += '<span>'+ conversation.date_time +'</span>';
                                search_html += '</span>';
                            search_html += '</div>';
                        search_html += '</button>';   
                    }

                    $('#conversation-area').html(search_html);
                });
            }else{
                // let noResultFound = '<div>No conversation found...</div>';
                // $('#conversation-area').empty();
                // $('#conversation-area').html(noResultFound);
                // show spinner every call of event
                let spinners = '\
                <div class="spinner-border text-primary" role="status">\
                    <span class="sr-only">Loading...</span>\
                </div>\
                <div class="mt-3">Searching conversation...</div><br>';

                $('#conversation-area').html(spinners);
                // ends here
                
                $('#conversation-area').addClass('text-center');
                $('#conversation-area').addClass('mt-5');
            }
            
            if(searchName == ""){
                $('#conversation-area').empty();
                $('#conversation-area').html(html);
                $('#conversation-area').removeClass('text-center');
                $('#conversation-area').removeClass('mt-5');
            }
        });
    });

    $('.btn-information').on('click', function(){
        $('#more-option-area').toggleClass('col-3');
        $('#more-option-area').toggleClass('d-none');

        $('#chat-content-area').toggleClass('col-5');
        $('#chat-content-area').toggleClass('col-8');
    });

    $('.btn-block').on('click', function(){
        $('#modal').removeClass('fade');
        $('#modal').addClass('show');
        $('#modal').addClass('d-block');
    });

    $('.btn-cancel').on('click', function(){
        $('#modal').addClass('fade');
        $('#modal').removeClass('show');
        $('#modal').removeClass('d-block');
    });
});

function openConversation(index){
    let btnConvo = $('.btn-convo-'+index).children(1).children()[3];
    if(btnConvo.classList.contains('text-unread')){
        btnConvo.classList.remove('text-unread');
    }
}