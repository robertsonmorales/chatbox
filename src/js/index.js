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
            let searchName = $(this).val();
            let searchResults = [];
            let fixName = searchName.split(' ');
            let names = [];
            let search_html = '';
            let noResult = '';

            // clean or empty conversation area
            $('#conversation-area').empty();
            // ends here

            // first character of name is uppercase
            for (let i = 0; i < fixName.length; i++) {
                names.push(fixName[i].charAt(0).toUpperCase() + fixName[i].slice(1));
            }
            // ends here

            // search name
            response.filter(function(value){
                if (value.name.includes(names.join(' '))){
                    searchResults.push(value);
                }
            });
            // ends here

            // show results
            if(searchResults.length != 0){
                $.each(searchResults, function(key, value){
                    search_html += '<button type="button" class="conversations btn-convo py-2 px-3 mb-1" id="'+key+'">';
                        search_html += '<div class="image-wrapper mr-2">';
                            search_html += '<img src="' + value['profile_picture'] + '" alt="' + value['name'] + '" class="img-fluid-cover">';
                            search_html += '<span class="person-status ' + value['account_status'] + '"></span>';
                        search_html += '</div>';
                        search_html += '<div class="persons-chat">';
                            search_html += '<span class="persons-name">' + value['name'] + '</span>';
                            search_html += '<span class="persons-text text-muted text-truncate">' + value['last_text'] + '</span>';
                        search_html += '</div>';
                    search_html += '</button>';

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