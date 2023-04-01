let global = {
     AANTAL_HORIZONTAAL:4,
     AANTAL_VERTICAAL:3,
     AANTAL_KAARTEN:6,
    EERSTE_KAART:null,
    TWEEDE_KAART:null,
    AAN_DE_BEURT:1
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
    console.log(kaarten);
    console.log(voorlopig);
    kaarten = voorlopig;
    console.log(kaarten);

    for (let i = 0; i < kaarten.length; i++) {
        speelveld.appendChild(kaarten[i]);
    }


//speelveld aanmaken

    const sizeUpdate = () => {


        let spelbord = document.getElementById("spelbord");
        let breedteX = (window.innerWidth -5 );
        let breedteY = (window.innerHeight -5 );
        let indexHB = breedteY/breedteX;

        //spelbord.style.width = window.innerWidth + "px";
        //spelbord.style.height = window.innerHeight + "px";


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
                if(indexHB<1){
                    let kaart = kaarten[i];
                    let tustijd = (breedteX / global.AANTAL_HORIZONTAAL)-5;
                    kaart.style.marginLeft = "0px";
                    kaart.style.marginRight = "0px";
                    kaart.setAttribute("height",tustijd );
                    kaart.setAttribute("width", "auto");
                }else {


                    let kaart = kaarten[i];
                    let tustijd = (breedteX / global.AANTAL_HORIZONTAAL)-5;
                    kaart.style.marginLeft = "0px";
                    kaart.style.marginRight = "0px";
                    kaart.setAttribute("height",tustijd );
                    kaart.setAttribute("width", "auto");
                }
            }

        }
    }
    sizeUpdate();
    window.addEventListener("resize", sizeUpdate);

// beurt aanmaken


    //klikken op een kaart
    const clickCard = () => {


        for (let i = 0; i < kaarten.length; i++) {
            console.log(global.TWEEDE_KAART + "voor if")

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

            //Eerste kaart is opslaan
            if (global.EERSTE_KAART == null) {
                global.EERSTE_KAART = kaart;
            } else {
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
                    console.log("Je mag niet 2 keer dezelfde kaart kiezen");
                    let timer = setTimeout(function() {turnCardsToBackground(kaart1,kaart2)}, 500);
                    console.log(global.TWEEDE_KAART + "voor stopbeurt");
                    let timer2 = setTimeout(stopBeurt,600);
                    console.log(global.TWEEDE_KAART + "na stopbeurt");

                } else {
                    // de 2 juiste kaarten


                    let timer = setTimeout(function() {setHidden(kaart1,kaart2)}, 500)
                    console.log("Je hebt het juist");
                    let timer2 = setTimeout(stopBeurt,600);
                }
            } else {
                // verkeerde kaart
                console.log("Je duwde op een andere kaart");
                let timer = setTimeout(function() {turnCardsToBackground(kaart1,kaart2)}, 500);
                let timer2 = setTimeout(stopBeurt,600);

            }
        }
        //kaart omdraaien
        const turnCardsToBackground = (kaart1,kaart2) => {

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
    startBeurt();
}
window.addEventListener("load", setup);