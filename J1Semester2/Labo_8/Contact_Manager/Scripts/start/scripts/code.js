let personen = [];
let id = 0;

// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht

//update de ingevulde gegevens
const update = () => {
    voornaam = document.getElementById("txtVoornaam");
    familienaam = document.getElementById("txtFamilienaam");
    geboortedatum = document.getElementById("txtGeboorteDatum");
    email = document.getElementById("txtEmail");
    kinderen = document.getElementById("txtAantalKinderen");


}



const bewaarBewerktePersoon = () => {
    console.log("Klik op de knop bewaar");

    // valideer alle input data en controleer of er geen errors meer zijn

    if(valideer()) {
        update();


        let nieuw = {
            id: id,
            voornaam: "",
            familienaam: "",
            geboortedatum: "",
            email: "",
            kinderen: ""
        };
        nieuw.voornaam = voornaam.value;
        nieuw.familienaam = familienaam.value;
        nieuw.geboortedatum = geboortedatum.value;
        nieuw.email = email.value;
        nieuw.kinderen = kinderen.value;


//kijken of het een nieuwe persoon of aanpassing is
        if (id == personen.length) {
            personen.push(nieuw);
        } else {
            personen[id] = nieuw;
        }


        let vak = document.getElementById("lstPersonen");

        // verwijder alle kinderen
        while (vak.hasChildNodes()) {
            let child = vak.firstChild;
            vak.removeChild(child);
        }

        //voeg alle kinderen terug toe
        for (let i = 0; i < personen.length; i++) {
            let node = document.createElement("option");
            node.text = personen[i].voornaam + " " + personen[i].familienaam;
            vak.appendChild(node);
        }


        // indien ok, bewaar de ingegeven data.
        // een nieuw aangemaakte persoon voegen we toe
        // een bestaande persoon in de lijst passen we aan

        // zorg ervoor dat de naam en voornaam ook aangepast en/of zichtbaar zijn in de lijst na updaten
    }
};

// Event listener (btnNieuw click)
const bewerkNieuwePersoon = () => {
    console.log("Klik op de knop nieuw");
    voornaam.value = "";
    familienaam.value = "";
    geboortedatum.value = "";
    email.value = "";
    kinderen.value = "";

    id = personen.length;
    // Zet de user interface klaar om de gegevens van een nieuwe persoon in te voeren
};
const klikLijst = () => {
    let persoon = {
        id : 0,
        voornaam : "",
        familienaam : "",
        geboortedatum : "",
        email : "",
        kinderen : ""
    };

    for(let i = 0 ; i < personen.length ; i++ ){
        let lijst = document.getElementById("lstPersonen");
        if(lijst.options[i].selected){
            persoon = personen[i];
        }
    }
    voornaam.value = persoon.voornaam;
    familienaam.value = persoon.familienaam;
    geboortedatum.value = persoon.geboortedatum;
    email.value = persoon.email;
    kinderen.value = persoon.kinderen;
    id = persoon.id;
}


// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    // voeg een change listener toe aan lstPersonen. Bij het klikken op een option element in de lijst
    // moet de data van die persoon getoond worden in het formulier
    let aanpas = document.getElementById("lstPersonen")
    aanpas.addEventListener("click",klikLijst);


};

window.addEventListener("load", setup);