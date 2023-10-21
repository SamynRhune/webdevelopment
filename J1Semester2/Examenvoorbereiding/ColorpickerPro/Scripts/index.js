const setup = () => {

    let GLOBAL = {
        kleurlijst : []
    }

    const geefwaardes = () =>{
        //geeft de nieuwe waardes aan
            let groenslider = document.getElementById("groen");
            let roodslider = document.getElementById("rood");
            let blueslider = document.getElementById("blue");

            let groentext = document.getElementById("groenwaarde");
            let roodtext = document.getElementById("roodwaarde");
            let bluetext = document.getElementById("bluewaarde");

            groentext.textContent = Math.round(groenslider.value);
            roodtext.textContent = Math.round(roodslider.value);
            bluetext.textContent = Math.round(blueslider.value);

            let hoofd = document.getElementById("hoofdkleur");
            let kleur = "rgb(" +roodslider.value + ", " + groenslider.value + ", " + blueslider.value + ")";
            hoofd.style.backgroundColor = kleur;

            localStorage.setItem("color", kleur);

    }



    const opstart = () =>{
        //veranderingen waarnemen
        let groenslider = document.getElementById("groen");
        let roodslider = document.getElementById("rood");
        let blueslider = document.getElementById("blue");
        let saveknop = document.getElementById("savebutton")

        //input toevoegen aan eventlistenerr
        groenslider.addEventListener("change",geefwaardes);
        roodslider.addEventListener("change",geefwaardes);
        blueslider.addEventListener("change",geefwaardes);
        groenslider.addEventListener("input",geefwaardes);
        roodslider.addEventListener("input",geefwaardes);
        blueslider.addEventListener("input",geefwaardes);
        saveknop.addEventListener("click",voegElementToeAanRij);

        //eerste keer of niet
        let kleur = null;
           kleur =  localStorage.getItem("color");
        if(kleur !==null){
            //console.log("uitvoeren")
            //geeft de hoofdkleur zijn waardes
            let opgeslagenkleur = localStorage.getItem("color");

            let hoofdkleur = document.getElementById("hoofdkleur");
            hoofdkleur.style.backgroundColor = opgeslagenkleur;

            let roodkleur = (opgeslagenkleur.substring(opgeslagenkleur.indexOf("(")+1,opgeslagenkleur.indexOf(","))).trim();
            let groenkleur = (opgeslagenkleur.substring(opgeslagenkleur.indexOf(",")+1,opgeslagenkleur.lastIndexOf(","))).trim();
            let blauwkleur = (opgeslagenkleur.substring(opgeslagenkleur.lastIndexOf(",")+1,opgeslagenkleur.indexOf(")"))).trim();

            groenslider.value = groenkleur;
            roodslider.value = roodkleur;
            blueslider.value = blauwkleur;

            geefwaardes();

            //geeft de lijst zijn waardes
            let lijst = JSON.parse(localStorage.getItem("colors"));
            GLOBAL.kleurlijst = JSON.parse(localStorage.getItem("colors"));
            if(lijst !== null){
                let opslag = document.getElementById("coloropslag");
            for(let i = 0 ; i < lijst.length ; i++) {


                let nieuwblok = document.createElement("div");
                nieuwblok.setAttribute("class", "lijstblok");
                nieuwblok.style.backgroundColor = lijst[i];

                let deleteknop = document.createElement("input");
                deleteknop.setAttribute("type", "button");
                deleteknop.setAttribute("value", "x");

                deleteknop.addEventListener("click", () => verwijderblok(deleteknop));

                nieuwblok.appendChild(deleteknop);
                opslag.appendChild(nieuwblok);


            }
            }

        }else{
            console.log("eerste keer")
            geefwaardes();
        }
    }

    //voeg element toe aan rij
    const voegElementToeAanRij = () =>{
        let opslag = document.getElementById("coloropslag");
        let kleur = localStorage.getItem("color");

        let nieuwblok = document.createElement("div");
        nieuwblok.setAttribute("class","lijstblok");
        nieuwblok.style.backgroundColor = kleur;

        let deleteknop = document.createElement("input");
        deleteknop.setAttribute("type","button");
        deleteknop.setAttribute("value","x");

        deleteknop.addEventListener("click",() =>verwijderblok(deleteknop));

        nieuwblok.appendChild(deleteknop);
        opslag.appendChild(nieuwblok);

        if(GLOBAL.kleurlijst===null){
            GLOBAL.kleurlijst = [];
        }

        GLOBAL.kleurlijst.push(kleur);
        localStorage.setItem("colors",JSON.stringify(GLOBAL.kleurlijst));

    }

    //verwijderd blok uit alle lijsten
    const verwijderblok = (deleteknop) =>{
        let vader = deleteknop.parentElement;
        let kleur = vader.style.backgroundColor.toString();
        GLOBAL.kleurlijst.splice(GLOBAL.kleurlijst.indexOf(kleur),1);
        localStorage.setItem("colors",JSON.stringify(GLOBAL.kleurlijst));
        vader.remove();
    }
    opstart();

}
window.addEventListener("load", setup);