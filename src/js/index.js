feather.replace();

var convo = document.getElementById('convo');
convo.scrollTo(0, convo.scrollHeight);

$(function(){
    $.get('src/js/conversation.json', function(response){
        // console.log(response);

        var html = '';
        $.each(response, function(index, value){
            html += '<button type="button" class="conversations btn-convo py-2 px-3 mb-1" id="'+index+'">';
                html += '<div class="image-wrapper mr-2">';
                    html += '<img src="' + value['profile_picture'] + '" alt="' + value['name'] + '" class="img-fluid-cover">';
                    html += '<span class="person-status ' + value['account_status'] + '"></span>';
                html += '</div>';
                html += '<div class="persons-chat">';
                    html += '<span class="persons-name">' + value['name'] + '</span>';
                    html += '<span class="persons-text text-muted text-truncate">' + value['last_text'] + '</span>';
                html += '</div>';
            html += '</button>';

            $('#conversation-area').html(html);
        });

        $('#search-name').on('keyup', function(){
            $('#conversation-area').empty();
            // let search_html = '';

            response.filter(function(value, index){
                if (value.name == $('#search-name').val().toLowerCase().trim()){
                    // search_html += '<button type="button" class="conversations btn-convo py-2 px-3 mb-1" id="'+index+'">';
                    //     search_html += '<div class="image-wrapper mr-2">';
                    //         search_html += '<img src="' + value['profile_picture'] + '" alt="' + value['name'] + '" class="img-fluid-cover">';
                    //         search_html += '<span class="person-status ' + value['account_status'] + '"></span>';
                    //     search_html += '</div>';
                    //     search_html += '<div class="persons-chat">';
                    //         search_html += '<span class="persons-name">' + value['name'] + '</span>';
                    //         search_html += '<span class="persons-text text-muted text-truncate">' + value['last_text'] + '</span>';
                    //     search_html += '</div>';
                    // search_html += '</button>';

                    // $('#conversation-area').html(search_html);
                }
            });
        });
    });
});