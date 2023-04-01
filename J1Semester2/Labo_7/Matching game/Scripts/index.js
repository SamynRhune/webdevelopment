let global = {
     AANTAL_HORIZONTAAL:4,
     AANTAL_VERTICAAL:3,
     AANTAL_KAARTEN:6,
    EERSTE_KAART:null,
    TWEEDE_KAART:null,

};



const setup = () => {


// Maakt alle kaarten aan
    let kaarten = [];
    for (let i = 1; i <= global.AANTAL_KAARTEN; i++) {
        //steekt eerste kaart in de array
        let kaart1 = document.createElement("img");
        kaart1.setAttribute("src", "Images/achtergrond.png");
        kaart1.setAttribute("class", i + "picture eerst");
        kaarten.push(kaart1);

        //steekt dezelfde maar 2de kaart in de array
        let kaart2 = document.createElement("img");
        kaart2.setAttribute("src", "Images/achtergrond.png");
        kaart2.setAttribute("class", i + "picture tweede");
        kaarten.push(kaart2);
    }
    let speelveld = document.querySelector("div");

    //steekt kaarten in random volgorde in array
    let voorlopig = [];
    for(let i = 0; i < global.AANTAL_KAARTEN*2;i++){
        let index = Math.round(Math.random()*i);
        let wisselkaart = kaarten[0];
        voorlopig.splice(index,0,wisselkaart);
        kaarten.shift();
    }
    kaarten = voorlopig;

    for (let i = 0; i < kaarten.length; i++) {
        speelveld.appendChild(kaarten[i]);
    }

//speelveld grootte aanmaken
    const sizeUpdate = () => {

        let breedteX = (window.innerWidth -5 );
        let breedteY = (window.innerHeight -5 );
        let indexHB = breedteY/breedteX;

        //grootte van de kaarten
        for (let i = 0; i < kaarten.length; i++) {
            //BREED
            if(indexHB <= (global.AANTAL_VERTICAAL/global.AANTAL_HORIZONTAAL)){
                let kaart = kaarten[i];
                let breedteKaart = breedteY / global.AANTAL_VERTICAAL;
                if((breedteX/breedteKaart)>4){
                    //als er meer dan 4 kaarten op een rij kunnen
                        let totaleMargin = breedteX - (4*breedteKaart);
                        let marginPerKant = (totaleMargin/8)-2;
                    kaart.style.marginLeft = marginPerKant + "px";
                    kaart.style.marginRight = marginPerKant + "px";
                    kaart.setAttribute("width", breedteKaart );
                    kaart.setAttribute("height", "auto");
                    console.log(kaart.getAttribute("margin-left"))

                }else{
                    //als er maar 4 kaarten op een rij kunnen
                    kaart.setAttribute("width", breedteKaart );
                    kaart.setAttribute("height", "auto");
                }


            }else{
                //SMAL

                    let kaart = kaarten[i];
                    let tustijd = (breedteX / global.AANTAL_HORIZONTAAL)-5;
                    kaart.style.marginLeft = "0px";
                    kaart.style.marginRight = "0px";
                    kaart.setAttribute("height",tustijd );
                    kaart.setAttribute("width", "auto");

            }

        }
    }
    sizeUpdate();
    window.addEventListener("resize", sizeUpdate);

// beurt aanmaken


    //klikken op een kaart
    const clickCard = () => {


        for (let i = 0; i < kaarten.length; i++) {
            //console.log(global.TWEEDE_KAART + "voor if")

                kaarten[i].addEventListener('click', function () {
                    if (global.TWEEDE_KAART === null) {
                        turnCardToPicture(kaarten[i]);

                    }
                });


        }

        //naar foto omdraaien kaart
        const turnCardToPicture = (kaart) => {
            let number = kaart.getAttribute("class").charAt(0);
            kaart.setAttribute("src", "Images/" + number + ".png");
            let audio = new Audio("Sounds/" + number + ".mp3");
            console.log(audio);
            audio.play();


            //Eerste kaart is opslaan
            if (global.EERSTE_KAART == null) {
                global.EERSTE_KAART = kaart;
            } else {
                //tweede kaart opslaan
                global.TWEEDE_KAART = kaart;

                controleKaarten();
            }
        }

        //controleren de kaarten
        const controleKaarten = () => {
            let eerstekaartKlasse = global.EERSTE_KAART.getAttribute("class");
            let tweedekaartKlasse = global.TWEEDE_KAART.getAttribute("class");
            let kaart1 = global.EERSTE_KAART;
            let kaart2 = global.TWEEDE_KAART;


            if (eerstekaartKlasse.charAt(0) === tweedekaartKlasse.charAt(0)) {
                if (eerstekaartKlasse === tweedekaartKlasse) {

                    //2 keer exact dezelfde kaart
                    global.TWEEDE_KAART = null;

                } else {
                    // de 2 juiste kaarten
                    let timer = setTimeout(function() {setHidden(kaart1,kaart2)}, 1500)
                    let timer2 = setTimeout(stopBeurt,1600);
                    let timer3 = setTimeout(rightPing,1000);


                }
            } else {
                // verkeerde kaart
                let timer = setTimeout(function() {turnCardsToBackground(kaart1,kaart2)}, 1500);
                let timer2 = setTimeout(stopBeurt,1600);

            }
        }
        //kaart omdraaien
        const turnCardsToBackground = (kaart1,kaart2) => {
            let audio = new Audio("Sounds/flipcard.mp3");
            audio.play();
            kaart1.setAttribute("src", "Images/achtergrond.png");
            kaart2.setAttribute("src", "Images/achtergrond.png");

        }

        //geselecteerde kaarten verbergen
        const setHidden = (kaart1,kaart2) => {
            kaart1.style.visibility = "hidden";
            kaart2.style.visibility = "hidden";
        }
    }

    const startBeurt = () => {
        if (global.TWEEDE_KAART == null) {
            clickCard();
        }
    }

    //geselecteerde kaarten op null zetten
    const stopBeurt = () => {

            global.EERSTE_KAART = null;
            global.TWEEDE_KAART = null;


    }
    const rightPing = () => {
        let audio = new Audio("Sounds/ping.mp3");
        audio.play();
    }
    startBeurt();
}
window.addEventListener("load", setup);