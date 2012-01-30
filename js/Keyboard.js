var keyObjects = [];
var special_keys = {
    17: "ctrl",
    18: "alt",
    91: "meta", // left
    92: "meta", // right
    32: "space",

    27: "esc",
    9 : "tab",
    20: "caps",
    16: "shift",
    8 : "backspace",
    13: "return",

    /*
    36: "home",
    35: "end",
    33: "pageup",
    34: "pagedown",
    46: "delete",

    37: "left",
    38: "up",
    39: "right",
    40: "down",
    */

    188: "<",
    192: "`",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    48: "0",
    189: "-",
    187: "=",

    219: "[",
    221: "]",

    186: ";",
    222: "'",
    220: "\\",

    188: ",",
    190: ".",
    191: "/",
}

function initKeyboard()
{
     var keyboardUl = document.getElementById("keyboard");
     for ( var index=0; index < keyboardUl.children.length; index++ )
     {
         keyObjects[keyboardUl.children[index].textContent] = keyboardUl.children[index];
     }
}
function toggleShift()
{
    $('.letter').toggleClass('uppercase');
    $('.symbol span').toggle();
}
function highlightKey(keyText)
{
    $(keyObjects[keyText]).addClass("highlighted");
    $(keyObjects[keyText]).removeClass("easeout");
}


function removeLetterFromTarget() {
    activeTarget.word = activeTarget.word.substring(1);
    if (activeTarget.word.length > 0) {
        scene.removeChild(activeTarget.text3D);
        activeTarget.text3D = createText( activeTarget.x, activeTarget.y, activeTarget.z, activeTarget.word, true );
        scene.addObject(activeTarget.text3D);
    }
    else {
        scene.removeChild(activeTarget.text3D);
        scene.removeChild(activeTarget.enemy3D);

        var indexTarget = enemies.indexOf(activeTarget);
        if (indexTarget != -1)
            enemies.splice( indexTarget, 1 );

        activeTarget = null;
    }
}

function recognizeWord(e){
    var unicode = e.keyCode ? e.keyCode : e.charCode;
    var actualkey = String.fromCharCode(unicode).toLowerCase();
    highlightKey(actualkey);

    if (activeTarget == null){
        for (i=0; i < enemies.length; i++) {
            if ( enemies[i].word.charAt(0) == actualkey) {
                activeTarget = enemies[i];
                removeLetterFromTarget();
                break;
            }
        }
        // if there is no enemy starting by this letter
        if( activeTarget == null){
            noOfMistakes++;
        }
    }
    else{
        if( activeTarget.word.charAt(0) == actualkey)
            removeLetterFromTarget();
        else
            noOfMistakes++;
    }
//    console.log(activeTarget);
}
function unhighlight(e)
{
    var unicode = e.keyCode ? e.keyCode : e.charCode;
    var actualkey = String.fromCharCode(unicode).toLowerCase();
    if (actualkey)
    {
        $(keyObjects[actualkey]).removeClass("highlighted");
        $(keyObjects[actualkey]).addClass("easeout");
    }
}
document.onkeydown=recognizeWord;
document.onkeyup=unhighlight;
//$(document).bind('keydown', 'shift', toggleShift);
//$(document).bind('keyup', 'shift', toggleShift);
