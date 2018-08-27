text_box = document.getElementById('text_input');
choices = document.getElementsByTagName('li');
span = document.getElementById('span');

empty_choices();

initial_jamo = {
    g: [0],
    k: [15, 0],
    gg: [1],
    kk: [1],
    n: [2],
    d: [3],
    t: [16, 3],
    dd: [4],
    tt: [4],
    r: [5],
    l: [5],
    m: [6],
    b: [7],
    p: [17, 7],
    bb: [8],
    pp: [8],
    s: [9],
    ss: [10],
    ng: [11],
    j: [12],
    jj: [13],
    ch: [14],
    h: [18]
}

medial_jamo = {
    a: [0, 1],
    ae: [1],
    ya: [2, 3],
    yae: [3],
    eo: [4],
    e: [5, 1, 4, 18],
    yeo: [6],
    ye: [7, 3, 6],
    o: [8, 11],
    wa: [9, 10],
    wae: [10],
    oe: [11],
    yo: [12],
    u: [13, 19],
    weo: [14],
    we: [15, 14],
    wi: [16],
    yu: [17],
    eu: [18],
    ui: [19],
    i: [20]
}

final_jamo = {
    q: [0],
    e: [1, 4, 7, 8, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27],
    k: [1, 2, 24, 3, 9],
    g: [1, 2, 3, 9],
    kk: [2],
    ks: [3],
    gs: [3],
    n: [4, 21, 5, 6],
    nj: [5],
    nh: [6],
    t: [7, 22, 23, 25, 12, 13],
    d: [7],
    l: [8, 9, 10, 11, 12, 13, 14, 15],
    lk: [9],
    lg: [9],
    lm: [10],
    lb: [11, 14],
    ls: [12],
    lt: [13],
    lp: [14, 11],
    lh: [15],
    m: [16, 10],
    p: [17, 18, 26, 11, 14],
    b: [17, 18, 11, 14],
    bs: [18],
    ps: [18],
    s: [19, 20],
    ss: [20],
    ng: [21],
    h: [27]
}

re = /(([kgdtbpsj])\2{0,1}|[nrlmh]|ch)?((?:w|y)?(?:[aeiou]|ae|eo|eu|oe|ui))((?:([kgs])\5{0,1}|[ndtlmbph]|ng|ks|gs|nj|nh|lk|lg|lm|lb|ls|lt|lp|lh|bs|ps))?$/m;
re_num = /(.*)(\d)(\D*)$/m;

function update_list(event){
    var text_value = text_box.value;

    key = Number(event.key);
    if(key > 0 && key < 10){
        replace_text(text_value, key - 1);
    }

    empty_choices();

    var choice_list = get_choice_list(text_value);

    if(choice_list != null){
        populate_choices(choice_list);
    }
}

function remove_num(match, p1, p2, p3, offset, string){
    return [p1, p3].join('');
}

function replace_text(text, number){
    text = text.replace(re_num, remove_num);

    if(choices[number].innerText != ''){
        text = text.replace(re, choices[number].innerText);
    }

    text_box.value = text;
}

function empty_choices(){
    for(var i = 0; i < choices.length; i++){
        choices[i].innerText = '';
        choices[i].style.visibility = 'hidden';
    }

    span.innerHTML = '';
}

function populate_choices(choice_list){
    for(var i = 0; i < choices.length; i++){
        if (i >= choice_list.length){
            break;
        }
        choices[i].innerText = choice_list[i];
        choices[i].style.visibility = 'visible';
    }
}

function get_choice_list(text){
    var match = text.match(re);
    var return_val = [];
    var extra = [];

    if(match == null){
        return null;
    }

    span.innerHTML = match[0];

    start = match[1];
    middle = match[3];
    final = match[4];

    if(start == null){
        start = 'ng';
    }
    if(final == null){
        final = 'q';
        extra = [1, 4, 7, 8, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27];
    }

    start = initial_jamo[start];
    middle = medial_jamo[middle];
    final = final_jamo[final];

    for(var i in start){
        for(var j in middle){
            for(var k in final){
                var string = String.fromCharCode(start[i] * 588 + middle[j] * 28 + final[k] + 44032);
                return_val.push(string);
            }
        }
    }

    if(return_val.length < choices.length && extra.length > 0){
        for(var i in start){
            for(var j in middle){
                for(var k in extra){
                    var string = String.fromCharCode(start[i] * 588 + middle[j] * 28 + extra[k] + 44032);
                    return_val.push(string);
                }
            }
        }
    }

    return return_val;
}
