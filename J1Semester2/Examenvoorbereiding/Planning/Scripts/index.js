const setup = () => {
let GLOBAL = {
    dagen:7,
    actueleDag:0,
    activiteiten: [[],[],[],[],[],[],[]],
    slaapplaats: [null,null,null,null,null,null,null]

}


    const update = () =>{
        clearAlles();
        maakKop();
        maakActiviteit();
        maakSlaapPlaats();
        maakLocatie();
        updateActiviteiten();
        updateSlaapPlaatsen();
        updateLocaties();
    }

    const maakKop = () =>{
        let kop = document.createElement("div");
        kop.style.display = "inline-block" ;

        if(GLOBAL.actueleDag !== 0) {
            let kopLknop = document.createElement("input");
            kopLknop.setAttribute("type", "button");
            kopLknop.setAttribute("value", "<-");
            kopLknop.setAttribute("id", "kopLknop");
            kop.appendChild(kopLknop);

            kopLknop.addEventListener("click",verlaagDag);
        }


            let kopH2 = document.createElement("h2");
            kopH2.textContent = "Dag " + (GLOBAL.actueleDag + 1);
            kopH2.style.display = "inline-block";
            kop.appendChild(kopH2);

        if(GLOBAL.actueleDag !== GLOBAL.dagen) {
            let kopRknop = document.createElement("input");
            kopRknop.setAttribute("type", "button");
            kopRknop.setAttribute("value", "->");
            kopRknop.setAttribute("id", "kopRknop");
            kop.appendChild(kopRknop);
            kopRknop.addEventListener("click",verhoogDag);
        }

        let lichaam = document.getElementById("omvang");

        lichaam.appendChild(kop);
    }

    const maakActiviteit = () =>{
        let activiteit = document.createElement("div");
        activiteit.setAttribute("id","activiteit");

        let actH2 = document.createElement("h2");
        actH2.textContent = "Activiteit";
        actH2.style.display = "inline-block";
        activiteit.appendChild(actH2);

        let actplusknop = document.createElement("input");
        actplusknop.setAttribute("type","button");
        actplusknop.setAttribute("value","+");
        actplusknop.setAttribute("id","actplus");
        activiteit.appendChild(actplusknop);
        actplusknop.addEventListener("click",voegActiviteitToe);

        let lichaam = document.getElementById("omvang");
        lichaam.appendChild(activiteit);
    }

    const maakSlaapPlaats = () =>{
        let slaapplaats = document.createElement("div");
        slaapplaats.setAttribute("id","slaapplaatsen");

        let slaH2 = document.createElement("h2");
        slaH2.textContent = "Slaapplaats";
        slaH2.style.display = "inline-block";
        slaapplaats.appendChild(slaH2);

        let slaplusknop = document.createElement("input");
        slaplusknop.setAttribute("type","button");
        if(GLOBAL.slaapplaats[GLOBAL.actueleDag] === null){
            slaplusknop.setAttribute("value","+");
        }else{
            slaplusknop.setAttribute("value","change");
        }
        slaplusknop.setAttribute("id","actplus");
        slaapplaats.appendChild(slaplusknop);

        let lichaam = document.getElementById("omvang");
        lichaam.appendChild(slaapplaats);

        slaplusknop.addEventListener("click",voegSlaapplaatsToe);
    }

    const maakLocatie = () =>{
        let locatie = document.createElement("div");

        let locH2 = document.createElement("h2");
        locH2.textContent = "Locatie";
        locH2.style.display = "inline-block";
        locatie.appendChild(locH2);

        let lichaam = document.getElementById("omvang");
        lichaam.appendChild(locatie);
    }

    const verhoogDag = () =>{
        GLOBAL.actueleDag++;
        update();
    }

    const verlaagDag = () =>{
        GLOBAL.actueleDag--;
        update();
    }
    const clearAlles = () =>{
        let omvang = document.getElementById("omvang");

        while(omvang.hasChildNodes()){
            omvang.removeChild(omvang.firstChild);
        }
    }

    //Start vragen lijst voor activiteit
    const voegActiviteitToe = () =>{
        clearAlles();
        let omvang = document.getElementById("omvang");

        let vraag1 = document.createElement("span");
        vraag1.textContent = "Naam van de activiteit";
        omvang.appendChild(vraag1);

        let br8 = document.createElement("br");
        omvang.appendChild(br8);

        let input1 = document.createElement("input");
        input1.setAttribute("type","text");
        input1.setAttribute("id","antwoord1");
        input1.setAttribute("placeholder","vb. zwemmen");
        omvang.appendChild(input1);



        let br1 = document.createElement("br");
        omvang.appendChild(br1);

        let vraag2 = document.createElement("span");
        vraag2.setAttribute("id","v2");
        vraag2.textContent = "Soort activiteit";
        omvang.appendChild(vraag2);

        let bol1 = document.createElement("input");
        bol1.setAttribute("type","radio");
        bol1.setAttribute("id","cu");
        bol1.setAttribute("name","radio1");
        omvang.appendChild(bol1);

        let bol2 = document.createElement("input");
        bol2.setAttribute("type","radio");
        bol2.setAttribute("id","sp");
        bol2.setAttribute("name","radio1");
        omvang.appendChild(bol2);

        let bol3 = document.createElement("input");
        bol3.setAttribute("type","radio");
        bol3.setAttribute("id","ch");
        bol3.setAttribute("name","radio1");
        omvang.appendChild(bol3);

        let br2 = document.createElement("br");
        omvang.appendChild(br2);

        let vraag3 = document.createElement("span");
        vraag3.textContent = "Locatie van Activiteit";
        omvang.appendChild(vraag3);

        let br7 = document.createElement("br");
        omvang.appendChild(br7);

        let input31 = document.createElement("input");
        input31.setAttribute("type","text");
        input31.setAttribute("id","antwoord31");
        input31.setAttribute("placeholder","GEMEENTE");
        omvang.appendChild(input31);

        let br3 = document.createElement("br");
        omvang.appendChild(br3);

        let input32 = document.createElement("input");
        input32.setAttribute("type","text");
        input32.setAttribute("id","antwoord32");
        input32.setAttribute("placeholder","STRAAT");
        omvang.appendChild(input32);

        let br4 = document.createElement("br");
        omvang.appendChild(br4);

        let input33 = document.createElement("input");
        input33.setAttribute("type","number");
        input33.setAttribute("id","antwoord33");
        input33.setAttribute("placeholder","NUMMER");
        omvang.appendChild(input33);

        let br5 = document.createElement("br");
        omvang.appendChild(br5);

        let input34 = document.createElement("input");
        input34.setAttribute("type","text");
        input34.setAttribute("id","antwoord34");
        input34.setAttribute("placeholder","LAND");
        omvang.appendChild(input34);

        let br6 = document.createElement("br");
        omvang.appendChild(br6);

        let vraag4 = document.createElement("span");
        vraag4.textContent = "Uur van activiteit";
        omvang.appendChild(vraag4);

        let br9 = document.createElement("br");
        omvang.appendChild(br9);

        let input4 = document.createElement("input");
        input4.setAttribute("type","text");
        input4.setAttribute("id","antwoord4");
        input4.setAttribute("placeholder","UU:MM");
        omvang.appendChild(input4);

        let br10 = document.createElement("br");
        omvang.appendChild(br10);

        let cancel = document.createElement("input");
        cancel.setAttribute("type","button");
        cancel.setAttribute("value","Cancel")

        cancel.addEventListener("click",update);
        omvang.appendChild(cancel);

        let add = document.createElement("input");
        add.setAttribute("type","button");
        add.setAttribute("value","ADD");
        omvang.appendChild(add);

        add.addEventListener("click",valideerActiviteit);
    }

    //kijkt of activiteit voldoet aan voorwaarden
    const valideerActiviteit = () =>{

        let doorgaan = true;

        let a1 = document.getElementById("antwoord1");
        if(a1.value.length < 3){
            //rood zetten
            a1.style.border = "solid red 2px";
            doorgaan = false;
        }


        let a2 = document.getElementsByName("radio1");
        let index = null;
        for(let i = 0 ; i < a2.length ; i++){
            if(a2[i].checked===true){
                index = a2[i].getAttribute("id");
            }
        }
        if(index ===null){
            //rood zetten
            let v2 = document.getElementById("v2")
            v2.style.border = "solid red 2px";
            doorgaan = false;
        }

        let a31 = document.getElementById("antwoord31");
        if(!(a31.value.length > 3)){
            doorgaan = false;
            a31.style.border = "solid red 2px";
        }
        let a32 = document.getElementById("antwoord32");
        if(!(a32.value.length > 3)){
            doorgaan = false;
            a32.style.border = "solid red 2px";
        }
        let a33 = document.getElementById("antwoord33");
        if(a33.value <=0){
            doorgaan =false;
            a33.style.border = "solid red 2px";
        }
        let a34 = document.getElementById("antwoord34");
        if(!(a34.value.length > 3)){
            doorgaan = false;
            a34.style.border = "solid red 2px";
        }

        let adres = (a34.value + " " + a31.value +" " + a32.value +" "+ a33.value );

        let a4 = document.getElementById("antwoord4");
        if(a4.value.length === 5 &&
            a4.value.substring(2,3)===":" &&
            !(isNaN(a4.value.substring(0,2))) &&
            !(isNaN(a4.value.substring(3,5))) &&
            (parseInt(a4.value.substring(0,2))<=24) &&
            (parseInt(a4.value.substring(0,2))>=0)&&
            (parseInt(a4.value.substring(3,5)))<=60 &&
            (parseInt(a4.value.substring(3,5)))>=0){
            console.log("alles ok");
        }else{
            doorgaan = false;
            a4.style.border = "solid red 2px";

        }
        console.log(a4.value);
        console.log(doorgaan);



        //als validatie voltooid is
        if(doorgaan){
            GLOBAL.activiteiten[GLOBAL.actueleDag].push(a1.value+"/"+index+"/"+adres+"/"+a4.value);
            console.log(a1.value+"/"+index+"/"+adres+"/"+a4.value);

            update();


        }

    }
    //einde validatie

    const updateActiviteiten = () =>{
        if(GLOBAL.activiteiten[GLOBAL.actueleDag].length ===0){
            console.log("Geen activiteiten");
        }else{
            for(let i = 0 ; i < GLOBAL.activiteiten[GLOBAL.actueleDag].length ; i++){
                let string = GLOBAL.activiteiten[GLOBAL.actueleDag][i];

                let naam = string.substring(0,string.indexOf("/"));
                console.log(naam);

                let soort = string.substring(string.indexOf("/")+1,string.indexOf("/")+3)
                console.log(soort);

                let locatie = string.substring(string.indexOf("/")+4,string.lastIndexOf("/"))
                console.log(locatie);

                let uur = string.substring(string.lastIndexOf("/")+1,string.length);
                console.log(uur);

                createActiviteit(naam,soort,locatie,uur)
            }
        }
    }

    const createActiviteit = (naam,soort,locatie,uur) =>{
        let act = document.createElement("div");

        let acth3 = document.createElement("h3");
        acth3.textContent = naam;
        act.appendChild(acth3);

        let actlu = document.createElement("span");
        actlu.textContent = locatie +", "+ uur;
        act.appendChild(actlu);

        if(soort === "ch"){
            act.style.backgroundColor = "lightblue";
        }else if(soort === "cu"){
            act.style.backgroundColor = "yellow";
        }else{
            act.style.backgroundColor = "green";
        }

        let activiteit = document.getElementById("activiteit");
        activiteit.appendChild(act);
    }

    const voegSlaapplaatsToe = () =>{
        clearAlles();
        let omvang = document.getElementById("omvang");

        let vraag1 = document.createElement("span");
        vraag1.textContent = "Naam van de slaapplaats";
        omvang.appendChild(vraag1);

        let br8 = document.createElement("br");
        omvang.appendChild(br8);

        let input1 = document.createElement("input");
        input1.setAttribute("type","text");
        input1.setAttribute("id","antwoord1");
        input1.setAttribute("placeholder","vb. zwemmen");
        omvang.appendChild(input1);



        let br1 = document.createElement("br");
        omvang.appendChild(br1);


        let vraag3 = document.createElement("span");
        vraag3.textContent = "Locatie van Slaapplaats";
        omvang.appendChild(vraag3);

        let br7 = document.createElement("br");
        omvang.appendChild(br7);

        let input31 = document.createElement("input");
        input31.setAttribute("type","text");
        input31.setAttribute("id","antwoord31");
        input31.setAttribute("placeholder","GEMEENTE");
        omvang.appendChild(input31);

        let br3 = document.createElement("br");
        omvang.appendChild(br3);

        let input32 = document.createElement("input");
        input32.setAttribute("type","text");
        input32.setAttribute("id","antwoord32");
        input32.setAttribute("placeholder","STRAAT");
        omvang.appendChild(input32);

        let br4 = document.createElement("br");
        omvang.appendChild(br4);

        let input33 = document.createElement("input");
        input33.setAttribute("type","number");
        input33.setAttribute("id","antwoord33");
        input33.setAttribute("placeholder","NUMMER");
        omvang.appendChild(input33);

        let br5 = document.createElement("br");
        omvang.appendChild(br5);

        let input34 = document.createElement("input");
        input34.setAttribute("type","text");
        input34.setAttribute("id","antwoord34");
        input34.setAttribute("placeholder","LAND");
        omvang.appendChild(input34);

        let br6 = document.createElement("br");
        omvang.appendChild(br6);

        let vraag4 = document.createElement("span");
        vraag4.textContent = "Uur van inchecken";
        omvang.appendChild(vraag4);

        let br9 = document.createElement("br");
        omvang.appendChild(br9);

        let input4 = document.createElement("input");
        input4.setAttribute("type","text");
        input4.setAttribute("id","antwoord4");
        input4.setAttribute("placeholder","UU:MM");
        omvang.appendChild(input4);

        let br10 = document.createElement("br");
        omvang.appendChild(br10);

        let cancel = document.createElement("input");
        cancel.setAttribute("type","button");
        cancel.setAttribute("value","Cancel")

        cancel.addEventListener("click",update);
        omvang.appendChild(cancel);

        let add = document.createElement("input");
        add.setAttribute("type","button");
        add.setAttribute("value","ADD");
        omvang.appendChild(add);

        add.addEventListener("click",valideerSlaapplaats);
    }

    const valideerSlaapplaats = () => {
        let doorgaan = true;

        let a1 = document.getElementById("antwoord1");
        if(a1.value.length < 3){
            //rood zetten
            a1.style.border = "solid red 2px";
            doorgaan = false;
        }


        let a31 = document.getElementById("antwoord31");
        if(!(a31.value.length > 3)){
            doorgaan = false;
            a31.style.border = "solid red 2px";
        }
        let a32 = document.getElementById("antwoord32");
        if(!(a32.value.length > 3)){
            doorgaan = false;
            a32.style.border = "solid red 2px";
        }
        let a33 = document.getElementById("antwoord33");
        if(a33.value <=0){
            doorgaan =false;
            a33.style.border = "solid red 2px";
        }
        let a34 = document.getElementById("antwoord34");
        if(!(a34.value.length > 3)){
            doorgaan = false;
            a34.style.border = "solid red 2px";
        }

        let adres = (a34.value + " " + a31.value +" " + a32.value +" "+ a33.value );

        let a4 = document.getElementById("antwoord4");
        if(a4.value.length === 5 &&
            a4.value.substring(2,3)===":" &&
            !(isNaN(a4.value.substring(0,2))) &&
            !(isNaN(a4.value.substring(3,5))) &&
            (parseInt(a4.value.substring(0,2))<=24) &&
            (parseInt(a4.value.substring(0,2))>=0)&&
            (parseInt(a4.value.substring(3,5)))<=60 &&
            (parseInt(a4.value.substring(3,5)))>=0){
            console.log("alles ok");
        }else{
            doorgaan = false;
            a4.style.border = "solid red 2px";

        }

        console.log(doorgaan);



        //als validatie voltooid is
        if(doorgaan){
            GLOBAL.slaapplaats[GLOBAL.actueleDag] = (a1.value+"/"+"/"+adres+"/"+a4.value);
            console.log("begin" + a1.value+"/"+adres+"/"+a4.value);

            update();


        }
    }

    const updateSlaapPlaatsen = () =>{
        let slaapplaats = document.getElementById("slaapplaatsen");

        let string = GLOBAL.slaapplaats[GLOBAL.actueleDag];
        if(string === null){
            //textje
            let niks = document.createElement("span");
            niks.textContent = "Geen slaapplaatsen";

            let br = document.createElement("br")
            slaapplaats.appendChild(br);

            slaapplaats.appendChild(niks);

        }else{

            let div = document.createElement("div");
            div.style.backgroundColor = "orange";

            let naam = string.substring(0,string.indexOf("/"));
            let loc = string.substring(string.indexOf("/")+2,string.lastIndexOf("/"));
            let uur = string.substring(string.lastIndexOf("/")+1,string.length);

            let slah3 = document.createElement("h3");
            slah3.textContent = naam;

            let slasp = document.createElement("span");
            slasp.textContent = loc + ", " + uur;

            div.appendChild(slah3);
            div.appendChild(slasp);
            slaapplaats.appendChild(div);


        }
    }

    const updateLocaties = () =>{
        let alleslijst = [];
        if(GLOBAL.activiteiten[GLOBAL.actueleDag] !==null) {
            for (let i = 0; i < GLOBAL.activiteiten[GLOBAL.actueleDag].length; i++) {
                alleslijst.push(GLOBAL.activiteiten[GLOBAL.actueleDag][i]);
            }
        }
        if(GLOBAL.slaapplaats[GLOBAL.actueleDag]!==null) {
            alleslijst.push(GLOBAL.slaapplaats[GLOBAL.actueleDag]);
        }

        if(alleslijst[0] !== null) {
            let uurlijst = []
            for (let i = 0; i < alleslijst.length; i++) {
                uurlijst.push(alleslijst[i].substring(alleslijst[i].lastIndexOf("/") + 1, alleslijst[i].length))
            }
            uurlijst = uurlijst.sort();

            let volgordelijst = [];
            for(let i = 0 ; i < uurlijst.length ; i++){
                for(let ind = 0 ; ind < alleslijst.length ; ind++) {
                    if(alleslijst[ind].includes(uurlijst[i])){
                        volgordelijst[i] = alleslijst[ind];
                    }
                }
            }
            console.log(volgordelijst);


        }

    }



    update();

}
window.addEventListener("load", setup);