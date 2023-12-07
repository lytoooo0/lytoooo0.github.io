function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
  }
  
function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

var num = 1;
drawTextLines();

var codes = "";
document.getElementById("display_but").onclick = function displayResult() {
    var raw_code = document.getElementById("input_area");
    codes = raw_code.value.trimEnd().split(/ +/);
    console.log(codes);

    var temp = "";
    var display_block = document.getElementById("display");
    for (i = 0; i < codes.length; i++) {
        temp += "<button class=\"hidden_button\" onclick=\"triggerHide(this)\" id=\"display_but_"+i.toString()+"\">" + new TextDecoder().decode(base64ToBytes(codes[i])) + "</button><br>";
    }
    display_block.innerHTML = temp;
}

function triggerHide(trigger_element) {
    document.getElementById(trigger_element.id).className = "display_button";
}

function randomSel() {
    var count = 0;
    var ranum = getRandomInt(codes.length);
    while (true) {
        var element = document.getElementById("display_but_"+ranum.toString());
        if (element.className == "sel_button") {
            ranum = getRandomInt(codes.length);
            count++;
            if (count >= codes.length) return;
        } else {
            element.className = "sel_button";
            break;
        }
    }
    console.log(ranum);
}
function getRandomInt(max) {
    var num = Math.floor(Math.random() * max);
    return num;
}

document.getElementById("copy_but").onclick = function copy2Clipboard() {
    var result = document.getElementById("result");
    navigator.clipboard.writeText(result.textContent);
    result.select();
}

document.getElementById("generate_but").onclick = function generateEcoding() {
    var result = "";
    for (i = 1; i <= num; i++) {
        var raw_text = document.getElementById("text_"+i.toString()).value;
        result += bytesToBase64(new TextEncoder().encode(raw_text)) + " ";
    }
    document.getElementById("result").textContent = result;
}

document.getElementById("generate_clear_but").onclick = function generateEcoding() {
    var result = "";
    for (i = 1; i <= num; i++) {
        var elmt = document.getElementById("text_"+i.toString());
        var raw_text = elmt.value;
        result += bytesToBase64(new TextEncoder().encode(raw_text)) + " ";
        elmt.value = "";
    }
    document.getElementById("result").textContent = result;
}

document.getElementById("add_but").onclick = function addTextLine() {
    num = num+1;
    drawTextLines();
};

document.getElementById("minus_but").onclick = function minusTextLine() {
    if (num>1) {
        num = num-1;
    }
    drawTextLines();
};

function drawTextLines() {
    var textlines = "";
    for (i = 1; i <= num; i++) {
        textlines += "<label id=\"label_"+i.toString()+"\">"+i.toString()+". </label>";
        textlines += "<input type=\"text\" id=\"text_"+i.toString()+"\"></input><br>";
    }
    // input type="text" id="text_1"><br>
    document.getElementById("TextLines").innerHTML = textlines;
}
