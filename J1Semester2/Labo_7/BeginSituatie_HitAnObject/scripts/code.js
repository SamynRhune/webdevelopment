let global = {
    IMAGE_COUNT: 5,  // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/",  // map van de figuren
    IMAGE_PATH_SUFFIX: ".png",  // extensie van de figuren
    MOVE_DELAY: 3000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 0,    // aantal hits
    timeoutId: 0 // id van de timeout timer, zodat we die kunnen annuleren
};


const setup = () => {
    let knop = document.getElementById("knop");

    const startGame = () =>{
        let knop = document.getElementById("knop");
        let target=document.getElementById("target");



        knop.style.display = "none";

        //zet de score van vorige game weer op nul
        global.score = 0;
        let punten = document.getElementById("count");
        punten.textContent = global.score;


        //zet de timer aan
        global.timeoutId = setTimeout(moveTarget,1000);

        target.addEventListener('click',checkImage);

    }


    knop.addEventListener('click',startGame);

}
const checkImage = () => {
    let target = document.getElementById("target");
    let source = target.getAttribute("src");
    let knop = document.getElementById("knop")

    if(source==="images/0.png"){
        clearTimeout(global.timeoutId);

        alert("Game over");


        //verbergt knop
        knop.style.display = "inline";

    }else{
        moveTarget();


        // score omhoog
        let punten = document.getElementById("count");
        global.score++;
        punten.textContent = global.score;

    }
}


const changeTarget = () =>{
    let target=document.getElementById("target");
    let pictureVar = global.IMAGE_PATH_PREFIX + Math.round(Math.random()*4);
    pictureVar += global.IMAGE_PATH_SUFFIX;
    target.setAttribute('src',pictureVar);
    target.append();
    }

const moveTarget = () => {
    clearTimeout(global.timeoutId);
    let target=document.getElementById("target");
    let playField = document.getElementById("playField")
    //verander tekening
    changeTarget();

    // verplaats de target
    let maxX = playField.clientWidth - target.offsetWidth;
    let maxY = playField.clientHeight - target.offsetHeight;

    let left=Math.floor(Math.random()*maxX + playField.offsetLeft);
    let top=Math.floor(Math.random()*maxY + playField.offsetTop);
    target.style.left=left+"px";
    target.style.top=top+"px";
    global.timeoutId = setTimeout(moveTarget,5000);
}




window.addEventListener("load", setup);


