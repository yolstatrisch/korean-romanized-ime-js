$(function(){
    $('#text_input').highlightWithinTextarea({
        highlight:[
            {
                highlight: /(([kgdtbpsj])\2{0,1}|[nrlmh]|ch)?((?:w|y)?(?:[aeiou]|ae|eo|eu|oe|ui))((?:([kgs])\5{0,1}|[ndtlmbph]|l[kgmbstph]|n[gjh]|[kgbp]s))?$/m,
                className: 'highlight'
            }
        ]
    });

    updateTextBox = function updateHighlight(){
        $('#text_input').highlightWithinTextarea('update');
    }
});
