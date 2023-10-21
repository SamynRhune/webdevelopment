const setup = () => {
    let GLOBAL = {
        alletaken:[]
    }

    const openNieuweTaak = () =>{
        clearInputVelden();
        createInputVelden();



    }
    const clearInputVelden = () =>{
        let inputvelden = document.getElementById("inputvelden");
        while(inputvelden.hasChildNodes()){
            inputvelden.removeChild(inputvelden.firstChild);
        }
    }

    const createInputVelden = () =>{
        let inputvelden = document.getElementById("inputvelden");

        let labelvtn = document.createElement("label");
        labelvtn.textContent = "Naam: ";

        let vraagtaaknaam = document.createElement("input");
        vraagtaaknaam.setAttribute("type","text");
        vraagtaaknaam.setAttribute("id","naam");
        labelvtn.appendChild(vraagtaaknaam);

        let labelvdm = document.createElement("label");
        labelvdm.textContent = "Deadline: ";

        let vraagdatum = document.createElement("input");
        vraagdatum.setAttribute("type","date");
        vraagdatum.setAttribute("id", "datum");
        labelvdm.appendChild(vraagdatum);

        let labelvbs = document.createElement("label");
        labelvbs.textContent = "Beschrijving";

        let vraagbeschrijving = document.createElement("input");
        vraagbeschrijving.setAttribute("type","text");
        vraagbeschrijving.setAttribute("id", "beschrijving");
        labelvbs.appendChild(vraagbeschrijving);

        let labeldringend = document.createElement("label");
        labeldringend.textContent = "Dringend    ";

        let vraagdringend = document.createElement("input");
        vraagdringend.setAttribute("type","radio");
        vraagdringend.setAttribute("name","dringenheid");
        vraagdringend.setAttribute("id","dringend");
        labeldringend.appendChild(vraagdringend);

        let labelnormaal = document.createElement("label");
        labelnormaal.textContent = "Normaal: ";

        let vraagnormaal = document.createElement("input");
        vraagnormaal.setAttribute("type","radio");
        vraagnormaal.setAttribute("name","dringenheid");
        vraagnormaal.setAttribute("id","normaal");
        labelnormaal.appendChild(vraagnormaal);

        let labellong= document.createElement("label");
        labellong.textContent = "Long term: ";

        let vraaglongterm = document.createElement("input");
        vraaglongterm.setAttribute("type","radio");
        vraaglongterm.setAttribute("name","dringenheid");
        vraaglongterm.setAttribute("id","long_term");
        labellong.appendChild(vraaglongterm);

        let br = document.createElement("br");

        labelvtn.appendChild(br);
        inputvelden.appendChild(labelvtn);

        labelvbs.appendChild(br);
        inputvelden.appendChild(labelvbs)

        inputvelden.appendChild(labelvdm);

        inputvelden.appendChild(labeldringend);

        inputvelden.appendChild(labelnormaal);

        inputvelden.appendChild(labellong);

        let bevestig = document.createElement("input");
        bevestig.setAttribute("type","button");
        bevestig.setAttribute("value","OK!");
        bevestig.setAttribute("id","bevestig");
        inputvelden.appendChild(bevestig);

        let bevestigknop = document.getElementById("bevestig");
        bevestigknop.addEventListener("click",voegTaakToe);

    }

    const voegTaakToe = () => {
        if(valideer()){

                let naam = document.getElementById("naam");
                let beschrijving = document.getElementById("beschrijving");
                let datum = document.getElementById("datum");
                let prioriteit = document.getElementsByName("dringenheid");


            let vak = checkedPrioriteit(prioriteit)

            maakTaak(naam.value,beschrijving.value,datum.value,vak);

            clearInputVelden();

            maakPlusKnop();

        }else{
            console.log("fuck you");
        }
    }

    const maakPlusKnop = () =>{
        let inputvelden = document.getElementById("inputvelden");

        let plusknop = document.createElement("input");
        plusknop.setAttribute("type","button");
        plusknop.setAttribute("id","toevoegen");
        plusknop.setAttribute("value","+");

        inputvelden.appendChild(plusknop);

        plusknop.addEventListener("click", openNieuweTaak);

    }

    const checkedPrioriteit = (prioriteit) =>{
        let found = "";
        let i = 0;
        while(found === "" &&  i < prioriteit.length){
            if(prioriteit[i].checked){
                found = prioriteit[i].getAttribute("id");
            }
            i++;
        }
        return found;
    }
    const valideer = () =>{
        let naam = document.getElementById("naam");
        let prioriteit = document.getElementsByName("dringenheid");
        let datum = document.getElementById("datum");

        for(let i = 0 ; i < prioriteit.length ; i++){
            if(prioriteit[i].checked && naam.value.length > 1 && datum.value !== ""){
                return true;
            }
        }

    }
    const maakTaak = (naam,beschrijving,datum,prioriteit) => {

        let taken = [];
        taken.push(naam,beschrijving,datum,prioriteit);
        GLOBAL.alletaken.push(taken);
        let takenstring = JSON.stringify(GLOBAL.alletaken);

        localStorage.setItem("taken",takenstring);



        let taak = document.createElement("div");

        let tnaam = document.createElement("h2");
        tnaam.textContent = naam;
        taak.appendChild(tnaam);

        let tbes = document.createElement("p");
        tbes.textContent = beschrijving + "\n";
        taak.appendChild(tbes);

        let tdat = document.createElement("span");
        tdat.textContent = datum ;
        tbes.appendChild(tdat);

        if(prioriteit === "dringend"){
            taak.style.backgroundColor = "lightcoral";
        }else if(prioriteit === "normaal"){
            taak.style.backgroundColor = "lightgoldenrodyellow";
        }else{
            taak.style.backgroundColor = "lightgreen";
        }

        let data = datum.split("-");
        let deadline = new Date(data[0],data[1],data[2]);

        let vandaagArray = [];
        vandaagArray.push(new Date().getFullYear(),new Date().getMonth()+1, new Date().getDate());
        let vandaag = new Date(vandaagArray[0],vandaagArray[1],vandaagArray[2]);

        if(deadline < vandaag){
            taak.style.border = "solid red 3px";
        }else{
            taak.style.border = "solid black 3px";
        }

        addTaak(taak);

    }

    const addTaak = (taak) => {
        let groep = document.getElementById("takenplan");
        groep.appendChild(taak);
    }

    const heropbouw = () => {
        let alletaken = JSON.parse(localStorage.getItem("taken"));

        for(let i = 0 ; i < alletaken.length ; i++){
            maakTaak(alletaken[i][0],alletaken[i][1],alletaken[i][2],alletaken[i][3]);

        }
        clearInputVelden();

        maakPlusKnop();
    }
    const sorteer = () => {
        console.log(GLOBAL.alletaken);
        let sorteerbeer = GLOBAL.alletaken.sort(function (a, b) {
                if (a[2] > b[2]) {
                    return 1
                } else {
                    return -1;
                }

            }
        );
        console.log(GLOBAL.alletaken);
        localStorage.setItem("taken",JSON.stringify(GLOBAL.alletaken));
        console.log(sorteerbeer);
        location.reload();

    }

    let toevoegenknop = document.getElementById("toevoegen");
    toevoegenknop.addEventListener("click", openNieuweTaak);
    heropbouw();
    let sorteerknop = document.getElementById("sorteer");
    sorteerknop.addEventListener("click",sorteer);
}
window.addEventListener("load", setup);