const setup = () => {
    let GLOBAL = {
        aantalrijen:10,
        aantalkolommen:10,
        firstklik:true
    }

    const opstartGame = () => {
        verwijderAlleKinderen();
        GLOBAL.firstklik = true;

        let speelveld = document.getElementById("speelveld");
        speelveld.style.width = "500px";
        speelveld.style.height = "500px";
        speelveld.style.display = "grid";
        speelveld.style.gridTemplateColumns = "repeat(10, 1fr)"; // 10 columns
        speelveld.style.gridGap = "0px"; // Adjust the gap between divs


        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                let blok = document.createElement("div");
                blok.style.display = "inline-block";
                blok.style.height = "35px";
                blok.style.width = "50px";
                blok.style.textAlign = "center";
                blok.style.paddingTop = "15px";
                //blok.style.border = "solid black 1px";
                blok.style.backgroundColor = "blue";
                blok.style.position = "relative"; // Set relative positioning
                blok.setAttribute("id", "_" + row + "." + column + "/");
                blok.addEventListener("click", () => klikBlok(blok));
                blok.addEventListener("contextmenu",() => klikBlok(blok));


                geefBom(blok);


                speelveld.appendChild(blok);
            }

        }

        let doorgeefblokid = localStorage.getItem("doorgeefblok");
        //doorgeefblok = JSON.parse(doorgeefblok);
        if(doorgeefblokid !== null ){
            let doorgeefblok = geefBlokMetId(doorgeefblokid);
            if(!heeftKindMetId(doorgeefblokid) || telBommen(doorgeefblok) !== 0){
                location.reload();
            }else {
                localStorage.removeItem("doorgeefblok");
                klikBlok(doorgeefblok);
            }
        }
    }

        //nieuw loop
//        let controleerblok = speelveld.firstChild;
//        telBommen(controleerblok);
//        while(controleerblok !== speelveld.lastChild){
//            controleerblok = controleerblok.nextSibling;
//            telBommen(controleerblok);
//
    //    }
    //}

    const geefBom = (blok) => {
        let bomgetal = Math.random();
        bomgetal = Math.round(bomgetal*10);

        if(bomgetal===6){
            //blok.textContent = "B";

            let id = blok.getAttribute("id");
            blok.style.backgroundColor = "blue";
            blok.setAttribute("id",id + "b");



        }else{
            //nog iets verzinnen
        }
    }

    const telBommen = (blok) => {
        //console.log(blok.getAttribute("id").substring(blok.getAttribute("id").length-1,blok.getAttribute("id").length));
        if(blok.getAttribute("id").substring(blok.getAttribute("id").length-1,blok.getAttribute("id").length) !== "b") {


            //hieruit verkrijgen we de rij en de kolom
            let locatie = blok.getAttribute("id");
            locatie = locatie.substring(1, locatie.indexOf("/"));
            let rij = parseInt(locatie.substring(0, locatie.indexOf(".")));
            let kolom = parseInt(locatie.substring(locatie.indexOf(".") + 1, locatie.length));

            let teller = 0;
            // lange kant errond
            if (heeftKindMetId(maakidbom((rij + 1), kolom))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom((rij - 1), kolom))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom(rij, (kolom + 1)))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom(rij, (kolom - 1)))) {
                teller++;
            }
            // hoeken
            if (heeftKindMetId(maakidbom((rij + 1), (kolom + 1)))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom((rij + 1), (kolom - 1)))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom((rij - 1), (kolom + 1)))) {
                teller++;
            }
            if (heeftKindMetId(maakidbom((rij - 1), (kolom - 1)))) {
                teller++;
            }

            return teller;
        }
    }

    const heeftKindMetId = (id) => {
        let speelveld = document.getElementById("speelveld");
        let escapedId = id.replace(/([!"#$%&'()*+,-./:;<=>?@[\]^`{|}~])/g, "\\$1");
        let selector = `#${escapedId}`;
        let kind = speelveld.querySelector(selector);
        return kind !== null;
    };

    const geefBlokMetId = (id) => {
        let speelveld = document.getElementById("speelveld");
        let escapedId = id.replace(/([!"#$%&'()*+,-./:;<=>?@[\]^`{|}~])/g, "\\$1");
        let selector = `#${escapedId}`;
        return speelveld.querySelector(selector);
    }

    const maakidbom = (rij, kolom) =>{
        return "_" + rij + "." + kolom + "/b";
    }
    const maakid = (rij, kolom) =>{
        return "_" + rij + "." + kolom + "/";
    }

    const klikBlok = (blok) =>{
        event.preventDefault();
        let id = blok.getAttribute("id");
        if (event.button !== 2) {

        if(blok.style.backgroundColor !== "red") {
            if (!GLOBAL.firstklik) {

            if (id.substring(id.length - 1, id.length) === "b") {

                //Als je verloren bent
                console.log("Game Over")
                verwijderAlleKinderen();
                let win = document.createElement("h1");
                win.textContent = "GAME OVER";

                let speelveld = document.getElementById("speelveld");


                let restart = document.createElement("input");
                restart.setAttribute("type","button");
                restart.setAttribute("value","restart");
                restart.addEventListener("click",herladen);

                let home = document.createElement("input");
                home.setAttribute("type","button");
                home.setAttribute("value","home");
                home.addEventListener("click",naarHome);


                speelveld.appendChild(win);
                speelveld.appendChild(restart);
                speelveld.appendChild(home);

                // Terug naar home

            } else {
                let aantalbommen = telBommen(blok);
                if(aantalbommen !== 0) {
                    blok.textContent = aantalbommen;
                }
                blok.style.color = "white";
                blok.style.backgroundColor = "gray";
                if (aantalbommen === 0) {


                    // buren checken op nul waardes
                    let locatie = blok.getAttribute("id");
                    locatie = locatie.substring(1, locatie.indexOf("/"));
                    let rij = parseInt(locatie.substring(0, locatie.indexOf(".")));
                    let kolom = parseInt(locatie.substring(locatie.indexOf(".") + 1, locatie.length));

                    //console.log(rij + "ret" + kolom);

                    let speelveld = document.getElementById("speelveld");

                    if (heeftKindMetId(maakid((rij + 1), kolom))) {
                        let blok = geefBlokMetId(maakid(rij + 1, kolom));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid((rij - 1), kolom))) {
                        let blok = geefBlokMetId(maakid(rij - 1, kolom));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid(rij, (kolom + 1)))) {
                        let blok = geefBlokMetId(maakid(rij, kolom + 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid(rij, (kolom - 1)))) {
                        let blok = geefBlokMetId(maakid(rij, kolom - 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    // hoeken
                    if (heeftKindMetId(maakid((rij + 1), (kolom + 1)))) {
                        let blok = geefBlokMetId(maakid(rij + 1, kolom + 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid((rij + 1), (kolom - 1)))) {
                        let blok = geefBlokMetId(maakid(rij + 1, kolom - 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid((rij - 1), (kolom + 1)))) {
                        let blok = geefBlokMetId(maakid(rij - 1, kolom + 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                    if (heeftKindMetId(maakid((rij - 1), (kolom - 1)))) {
                        let blok = geefBlokMetId(maakid(rij - 1, kolom - 1));
                        let kleur = blok.style.backgroundColor;
                        if (kleur === "blue") {
                            klikBlok(blok);
                        }
                    }
                }
                checkForWin();
            }
        }else{
                if(telBommen(blok) !== 0){
                    //let doorgeefblok = JSON.stringify(blok.getAttribute("id"));
                    localStorage.setItem("doorgeefblok",blok.getAttribute("id"));
                    location.reload();
                }else{
                    //normaal starten
                    GLOBAL.firstklik = false;
                    klikBlok(blok);
                }
            }
        }
        }else {
            let color = blok.style.backgroundColor;
            if (color !== "gray") {


                if (color === "red") {
                    blok.style.backgroundColor = "blue";
                } else {
                    blok.style.backgroundColor = "red";
                }
                checkForWin();
            }
        }
    }

    const checkForWin = () =>{
        if(!checkIfBlue()){
            //bekijk of er een win is
            if(checkIfBombsRed() && checkIfNotBombsGray()){
                //Als je gewonnen bent
                console.log("Je hebt gewonnen")
                verwijderAlleKinderen();
                let win = document.createElement("h1");
                win.textContent = "Proficiat je hebt gewonnen wil je een lolly";

                let speelveld = document.getElementById("speelveld");


                let restart = document.createElement("input");
                restart.setAttribute("type","button");
                restart.setAttribute("value","restart");
                restart.addEventListener("click",herladen);

                let home = document.createElement("input");
                home.setAttribute("type","button");
                home.setAttribute("value","home");
                home.addEventListener("click",naarHome);


                speelveld.appendChild(win);
                speelveld.appendChild(restart);
                speelveld.appendChild(home);
            }

        }


    }

    const herladen = () => {
        location.reload();
    }

    const naarHome = () => {
        window.location.href = "https://www.google.be";
    }

    const checkIfBlue = () => {
        let speelveld = document.getElementById("speelveld");
        let blok = speelveld.firstChild
        let blauwgevonden = false;
        while(!blauwgevonden && blok !== null){
            if(blok.style.backgroundColor === "blue"){
                blauwgevonden = true;
            }
            blok = blok.nextSibling;
        }
        return blauwgevonden;
    }

    const checkIfBombsRed = () => {
        let bommen = document.querySelectorAll('div[id$=\"b\"]');
        let bommenrood = true;
        for (let i = 0 ; i < bommen.length ; i++ ){
            if(bommen[i].style.backgroundColor !== "red"){
                bommenrood = false;
            }
        }
        //console.log(bommenrood);
        return bommenrood;
    }

    const checkIfNotBombsGray = () => {
        let nietbommen = document.querySelectorAll('div[id$=\"/\"]');
        let nietbommengrijs = true;
        for (let i = 0 ; i < nietbommen.length ; i++ ){
            if(nietbommen[i].style.backgroundColor !== "gray"){
                nietbommengrijs = false;
            }
        }
        //console.log(nietbommengrijs);
        return nietbommengrijs;
    }



    const verwijderAlleKinderen = () => {
        let speelveld = document.getElementById("speelveld");
        while(speelveld.hasChildNodes()){
            speelveld.removeChild(speelveld.firstChild);
        }
    }


    opstartGame();




}
window.addEventListener("load", setup);