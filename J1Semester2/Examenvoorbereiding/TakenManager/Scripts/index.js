const setup = () => {
    let GLOBAL = {
        takenlijst : []
    }


    const opstart = () =>{
        let bodys = document.getElementsByTagName("body");
        let body = bodys[0];

        let infoTaak = document.createElement("h1");
        infoTaak.textContent = "Taak info";
        infoTaak.style.marginBottom = "0px";

        let vragenlijst = document.getElementById("vragenlijst");

        let naamtxt = document.createElement("span");
        naamtxt.textContent = "Naam:";
        let naaminput = document.createElement("input");
        naaminput.setAttribute("id","naaminput");
        naaminput.setAttribute("type","text");

        let br1 = document.createElement("br");

        let datumtxt = document.createElement("span");
        datumtxt.textContent = "Datum: ";
        let datuminput = document.createElement("input");
        datuminput.setAttribute("id","datuminput");
        datuminput.setAttribute("type","date");

        let br2 = document.createElement("br");

        let persoontxt = document.createElement("span");
        persoontxt.textContent = "Kies persoon: ";
        persoontxt.setAttribute("id","persoontxt");
        let br3 = document.createElement("br");
        let persoon1txt = document.createElement("span");
        persoon1txt.textContent = "Rhune";
        let persoonb1 = document.createElement("input");
        persoonb1.setAttribute("type","radio");
        persoonb1.setAttribute("name","persoon");
        persoonb1.setAttribute("id","pRhune");
        let br4 = document.createElement("br");
        let persoon2txt = document.createElement("span");
        persoon2txt.textContent = "Niels";
        let persoonb2 = document.createElement("input");
        persoonb2.setAttribute("type","radio");
        persoonb2.setAttribute("name","persoon");
        persoonb2.setAttribute("id","pNiels");
        let br5 = document.createElement("br");
        let persoon3txt = document.createElement("span");
        persoon3txt.textContent = "Ann";
        let persoonb3 = document.createElement("input");
        persoonb3.setAttribute("type","radio");
        persoonb3.setAttribute("name","persoon");
        persoonb3.setAttribute("id","pAnn");
        let br6 = document.createElement("br");
        let persoon4txt = document.createElement("span");
        persoon4txt.textContent = "Gert";
        let persoonb4 = document.createElement("input");
        persoonb4.setAttribute("type","radio");
        persoonb4.setAttribute("name","persoon");
        persoonb4.setAttribute("id","pGert");

        let br7 = document.createElement("br");

        let beschtxt = document.createElement("span");
        beschtxt.textContent = "Beschrijving: ";
        let beschinput = document.createElement("input");
        beschinput.setAttribute("type","text");
        beschinput.setAttribute("id","beschinput");

        let br8 = document.createElement("br");

        let knop = document.createElement("input");
        knop.setAttribute("type","button");
        knop.setAttribute("value","save");
        knop.addEventListener("click",valideer);

        let sknop = document.createElement("input");
        sknop.setAttribute("type","button");
        sknop.setAttribute("value","sorteer");
        sknop.addEventListener("click",sorteerTaken);

        let br9 = document.createElement("br");
        let br10 = document.createElement("br");

        let txtlijst = document.createElement("h1");
        txtlijst.textContent = "Openstaande taken";
        txtlijst.style.marginBottom = "10px";



        vragenlijst.appendChild(infoTaak);
        vragenlijst.appendChild(br9);
        vragenlijst.appendChild(naamtxt);
        vragenlijst.appendChild(naaminput);
        vragenlijst.appendChild(br1);
        vragenlijst.appendChild(datumtxt);
        vragenlijst.appendChild(datuminput);
        vragenlijst.appendChild(br2);
        vragenlijst.appendChild(persoontxt);
        vragenlijst.appendChild(br3);
        vragenlijst.appendChild(persoon1txt);
        vragenlijst.appendChild(persoonb1);
        vragenlijst.appendChild(br4);
        vragenlijst.appendChild(persoon2txt);
        vragenlijst.appendChild(persoonb2);
        vragenlijst.appendChild(br5);
        vragenlijst.appendChild(persoon3txt);
        vragenlijst.appendChild(persoonb3);
        vragenlijst.appendChild(br6);
        vragenlijst.appendChild(persoon4txt);
        vragenlijst.appendChild(persoonb4);
        vragenlijst.appendChild(br7);
        vragenlijst.appendChild(beschtxt);
        vragenlijst.appendChild(beschinput);
        vragenlijst.appendChild(br8);
        vragenlijst.appendChild(knop);
        vragenlijst.appendChild(sknop);
        vragenlijst.appendChild(br10);
        vragenlijst.appendChild(txtlijst);

        takenOpnieuwAanmaken();


    }
    const takenOpnieuwAanmaken = () =>{
        //taken opnieuw invoegen
        let opgeslagentaken = JSON.parse(localStorage.getItem("takenlijst"));
        if(opgeslagentaken !== null) {
            for (let i = 0; i < opgeslagentaken.length; i++) {
                maakTaakAan(opgeslagentaken[i][0],opgeslagentaken[i][1],opgeslagentaken[i][2],opgeslagentaken[i][3]);
            }
        }
    }

    const valideer = () =>{
        let naam = document.getElementById("naaminput");
        let datum =document.getElementById("datuminput");
        let persoonlijst = document.getElementsByName("persoon");
        let beschrijving = document.getElementById("beschinput");
        let persoontxt = document.getElementById("persoontxt");

    //vorige valideer mogelijks resetten
        naam.style.border = "solid black 1px";
        datum.style.border = "solid black 1px";
        persoontxt.style.border = "solid 1px black";

        let validatiegeslaagd = true;

        if(naam.value === ""){
            validatiegeslaagd = false;
            naam.style.border = "solid red 2px";
        }
        if(datum.value === ""){
            validatiegeslaagd =false;
            datum.style.border = "solid red 2px";
        }
        let persoongekozen = false;
        for(let i = 0 ; i < persoonlijst.length ; i ++){
            if(persoonlijst[i].checked){
                persoongekozen = true;
            }
        }
        if(!persoongekozen){
            validatiegeslaagd =false;
            persoontxt.style.border = "solid 2px red";
        }
        if(beschrijving.value === ""){
            console.log("beschrijving is leeg");
        }

        if(validatiegeslaagd){
            let persoon = null;
            let i = 0;
            while(persoon === null && i < persoonlijst.length){
                if(persoonlijst[i].checked){
                    persoon = persoonlijst[i];
                }else{
                    i++;
                }
            }
            let persoonnaam = (persoon.getAttribute("id").substring(1,persoon.getAttribute("id").length));
            maakTaakAan(naam.value,datum.value,persoonnaam,beschrijving.value);
            localStorage.setItem("takenlijst",JSON.stringify(GLOBAL.takenlijst));
        }
    }

    const maakTaakAan = (naam,datum,persoonnaam,beschrijving) => {
        let takenlijst = document.getElementById("takenlijst");

        let taak = document.createElement("div");

        let taaknaam = document.createElement("h3");
        taaknaam.textContent = naam;

        let taakdatum = document.createElement("span");
        taakdatum.textContent = datum;
        if(Date.parse(datum) < Date.now()){
            taak.style.border = "solid red 2px";
        }else{
            taak.style.border = "solid black 1px";
        }

        let taakpersoon = document.createElement("span");
        taakpersoon.textContent = persoonnaam;

        if(persoonnaam === "Niels"){
            taak.style.backgroundColor = "lightcyan";
        }else if(persoonnaam === "Rhune"){
            taak.style.backgroundColor = "lightpink";
        }else if(persoonnaam === "Ann"){
            taak.style.backgroundColor = "lightyellow";
        }else if(persoonnaam === "Gert"){
            taak.style.backgroundColor = "lightskyblue";
        }else{
            taak.style.backgroundColor = "red";
        }

        let taakbesch = document.createElement("span");
        if(beschrijving === ""){
            taakbesch.textContent = "Geen beschrijving beschikbaar";
        }else{
            taakbesch.textContent = beschrijving;
        }



        let xknop = document.createElement("input");
        xknop.setAttribute("type","button");
        xknop.setAttribute("value","X");
        xknop.addEventListener("click",()=>verwijderTaak(xknop));

        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");
        //alles appenden
        taak.appendChild(taaknaam);
        taak.appendChild(taakdatum);
        taak.appendChild(br1);
        taak.appendChild(taakpersoon);
        taak.appendChild(br2)
        taak.appendChild(taakbesch);
        taak.appendChild(br3);
        taak.appendChild(xknop);


        takenlijst.appendChild(taak);

        GLOBAL.takenlijst.push([naam,datum,persoonnaam,beschrijving])
    }

    const verwijderTaak = (xknop) =>{

       let lijst = [];
       lijst = getAlleTaken();
       if(lijst.indexOf(xknop.parentElement)===0){
           GLOBAL.takenlijst.shift();
       }else {
           GLOBAL.takenlijst.splice(lijst.indexOf(xknop.parentElement), 1);
       }
       localStorage.setItem("takenlijst",JSON.stringify(GLOBAL.takenlijst));
        xknop.parentElement.remove();

    }

    const getAlleTaken = () =>{
        let takenlijst = document.getElementById("takenlijst");

        let lijst = [];

        while(takenlijst.hasChildNodes()){

            //while(takenlijst.firstChild.hasChildNodes()){
            //  taaklijst.push(takenlijst.firstChild.firstChild.textContent);
            //    takenlijst.firstChild.removeChild(takenlijst.firstChild.firstChild);
            //}
            lijst.push(takenlijst.firstChild);
            takenlijst.removeChild(takenlijst.firstChild);
        }
        for(let i = 0 ; i < lijst.length ; i++){
            takenlijst.appendChild(lijst[i]);
        }
        console.log(lijst);
        return lijst;
    }

    const sorteerTaken = () =>{

        let sorteerbeer = GLOBAL.takenlijst.sort(function (a, b) {
                if (a[1] > b[1]) {
                    return 1
                } else {
                    return -1;
                }

            }
        );

        GLOBAL.takenlijst = sorteerbeer;
        localStorage.setItem("takenlijst",JSON.stringify(GLOBAL.takenlijst));

        location.reload();
    }
    console.log("spagheett")
    opstart();
}
window.addEventListener("load", setup);