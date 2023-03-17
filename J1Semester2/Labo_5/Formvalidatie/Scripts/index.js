const setup = () => {

let voornaam = document.getElementById("voornaam");
let achternaam = document.getElementById("familienaam");
let geboorte = document.getElementById("geboortedatum");
let email = document.getElementById("mail");
let kinderen = document.getElementById("kinderen");

let valideer = document.getElementById("valideer")


    const valideervelden = () =>{

    let voornaamcontrole = true;
    if(voornaam.value.length > 30){
        voornaamcontrole = false;
        document.getElementById('errorvn').innerHTML = "max. 30 karakters";
        document.getElementById('voornaam').style.border = "red solid 2px"
    }

    let achternaamcontrole = true;
    if(achternaam.value.length === 0){
        achternaamcontrole = false
        document.getElementById("erroran").innerHTML = "verplicht veld";
        document.getElementById('familienaam').style.border = "red solid 2px"
    }else if(achternaam.value.length > 50){
        achternaamcontrole =false;
        document.getElementById("erroran").innerHTML = "max 50 karakters";
        document.getElementById('familienaam').style.border = "red solid 2px"
    }

    let geboortecontrole = true;
    let datum = geboorte.value.split("-")
    if(datum.length !== 3){
        geboortecontrole = false;
        document.getElementById("errorgd").innerHTML = "geen geldige geboortedatum";
        document.getElementById('geboortedatum').style.border = "red solid 2px"
        }else if(datum[1]>12 || datum[1]<0){
        document.getElementById("errorgd").innerHTML = "deze maand bestaat niet";
        document.getElementById('geboortedatum').style.border = "red solid 2px"
        }else if(datum[2]>31 || datum[2]<0) {
        geboortecontrole = false;
        document.getElementById("errorgd").innerHTML = "geen geldige dag"
        document.getElementById('geboortedatum').style.border = "red solid 2px"
    }

    let emailcontrole = true;
    if(email.value.length === 0){
        emailcontrole =false;
        document.getElementById("errorem").innerHTML = "verplicht veld";
        document.getElementById('mail').style.border = "red solid 2px"
        }
    let index = 0;
    let gevonden = 0;
    while(gevonden < 2 && index < email.value.length){
        if(email.value.charAt(index)==="@"){
            gevonden++;
    }
        index++;
    }
    if(gevonden === 2 || email.value.indexOf("@")===0 || email.value.indexOf("@")=== (email.value.length)-1){
        document.getElementById("errorem").innerHTML = "geen geldig email";
        document.getElementById('mail').style.border = "red solid 2px"
        emailcontrole = false;
    }

    let kinderencontrole = true;
    if(kinderen.value < 0){
        document.getElementById("errorkind").innerHTML = "is geen positief getal";
        document.getElementById('kinderen').style.border = "red solid 2px"
        kinderencontrole = false;
    }else if(kinderen.value> 99){
        document.getElementById("errorkind").innerHTML = "is te vruchtbaar";
        document.getElementById('kinderen').style.border = "red solid 2px"
        kinderencontrole = false;
    }

    if(kinderencontrole && emailcontrole && geboortecontrole && achternaamcontrole && voornaamcontrole){
        window.alert("sometext");
    }

    }


    valideer.addEventListener("click",valideervelden);

}
window.addEventListener("load", setup);