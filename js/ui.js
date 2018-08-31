$(function(){
    $('#text_input').highlightWithinTextarea({
        highlight: re
    });

    $('#text_input').css('border-radius', '3px');
    $('#text_input').parent().css('border-radius', '3px');
    $('#text_input').parent().children('div').css('border-radius', '3px');

    $('#text_input').css('border-width', '1px');
    $('.hwt-container').css('margin', '0');
    $('.hwt-container').css('padding', '0');
    $('.hwt-container').css('font-family', 'Calibri');
    $('.hwt-container').css('font-size', '2em');

    updateTextBox = function updateHighlight(){
        $('#text_input').highlightWithinTextarea('update');
    }

    setBorder = function setBottomBorder(rad){
        $('#text_input').css('border-bottom-left-radius', rad);
        $('#text_input').css('border-bottom-right-radius', rad);
        $('#text_input').parent().css('border-bottom-left-radius', rad);
        $('#text_input').parent().css('border-bottom-right-radius', rad);
        $('#text_input').parent().children('div').css('border-bottom-left-radius', rad);
        $('#text_input').parent().children('div').css('border-bottom-right-radius', rad);
    }

    moveToMarker = function moveDivToMarker(){
        mark = document.getElementsByTagName('mark');
        text = document.getElementById('text_input');

        if(mark.length > 0){
            offset = mark[0].getBoundingClientRect();
            offset_text = text.getBoundingClientRect();
            offset_left = offset.left;
            offset_text_left = offset_text.left;

            diff = offset_left - offset_text_left - 1;

            $('#choice_content').css('left', diff + 'px');
            $('#choice_content').css('top', '3em');
        }
    }

    $('#text_input').on('keydown', function(event){
        var elements = Number(ordered_list.id);

        if((event.originalEvent.keyCode == 13 || event.originalEvent.keyCode == 38 || event.originalEvent.keyCode == 40) && selected != null && selected < elements){
            event.preventDefault();
        }
    });

    $('#text_input').on('keyup', function(event){
        var elements = Number(ordered_list.id);

        switch (event.originalEvent.keyCode){
            case 13:{
                setBorder('3px');
                var text_value = text_box.value;

                if(selected != null && selected < elements){
                    replace_text(text_value, selected);

                    selected = null;
                    select_choice(selected);
                }
                break;
            }
            case 37:{
                break;
            }
            case 38:{
                if(selected == null) selected = 0;
                selected = mod(selected - 1, elements);
                select_choice(choices[selected]);
                break;
            }
            case 39:{
                break;
            }
            case 40:{
                if(selected == null) selected = -1;
                selected = mod(selected + 1, elements);
                select_choice(choices[selected]);
                break;
            }
            default:
                setBorder('3px');
                var text_value = text_box.value;

                selected = null;
                select_choice(selected);

                var key = Number(event.originalEvent.key);
                var size = Number(ordered_list.id);

                if(key > 0 && key <= size){
                    replace_text(text_value, key - 1);
                }
                else{
                    update_list(text_value);
                }

                moveToMarker();
        }
    });
});
