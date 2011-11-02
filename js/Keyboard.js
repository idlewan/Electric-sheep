
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
//    console.log(actualkey);

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
document.onkeydown=recognizeWord;
