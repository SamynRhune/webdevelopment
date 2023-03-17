const setup = () => {

    let knop = document.getElementById("startButton");
    let trigram = document.getElementById("trigramText");
    let returnText = document.getElementById("TxtOutput");


    const berekenTrigram = () => {

        let outputText = "";

        if (trigram.value.length > 2){

            for(let i = 0 ; i < (trigram.value.length - 2); i++){
                 outputText += trigram.value.substring(i,i+3) + " ";
            }

        }else{

            outputText = 'String is te kort voor een Trigram te maken';
        }

        returnText.innerHTML = outputText;

    }


    knop.addEventListener("click",berekenTrigram);

}
window.addEventListener("load", setup);