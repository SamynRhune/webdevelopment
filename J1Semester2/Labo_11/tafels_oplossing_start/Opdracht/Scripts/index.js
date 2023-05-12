const setup = () => {
    let GLOBAL = {
        tabellen : [],
        nummersopslag : []
    }

    const klikbtn = () =>{
        leegmaken();

        let tekst = document.getElementById("tekst");

        check(tekst.value.replace(/^0+/, ""),null);
        opbouwen();

        //leegmaken kan bijgewerkt worden
        tekst.value = "";

    }

    const check = (waarde,datum) => {
        if(isNaN((waarde))|| waarde ===""){
            alert("Je moet een getal ingeven!");
        }else{

            if(datum == null){
               let nu = new Date();
               datum = nu.getHours() +":" + nu.getMinutes() + ":" + nu.getSeconds();
           }
            maaktabel(waarde,datum);
            opslaan(waarde,datum);

        }
    }

    const maaktabel = (getal,datum) => {
        let omhulling = document.getElementById("omhullend");

        let tabel = document.createElement("div");
        tabel.setAttribute("class","tabellen");

        let kop = document.createElement("div");


        kop.innerHTML = "Tafel van " + getal + " aangemaakt op: " + datum;


        kop.setAttribute("class","koppen");
        tabel.appendChild(kop);

        for(let i = 1; i <= 10 ; i++){
            let lijn = document.createElement("div");
            let vermenig = i * getal;
            lijn.innerHTML = getal + " x " + i +" = " + vermenig;
            lijn.setAttribute("class", "lijnen");
            if(i%2 === 0){
                lijn.style.backgroundColor = "lightgray";
            }
            tabel.appendChild(lijn);
        }
        GLOBAL.tabellen.push(tabel);
    }

    const leegmaken = () => {
        let omhulling = document.getElementById("omhullend");
        while(omhulling.firstChild){
            omhulling.removeChild(omhulling.firstChild);
        }
    }

    const opbouwen = () => {
        let omhulling = document.getElementById("omhullend");
        for(let i = 0; i < GLOBAL.tabellen.length ; i++){
            omhulling.appendChild(GLOBAL.tabellen[i]);
        }
    }

    const inladen = () =>{
        let lijst = JSON.parse(localStorage.getItem("vermeniggetal"));
        if(lijst !== null && lijst !== undefined){
            for(let i = 0; i < lijst.length ; i++){
                check(lijst[i][0],lijst[i][1]);
            }
            opbouwen();
        }

    }

    const opslaan = (waarde, datum)  => {
        GLOBAL.nummersopslag.push([waarde,datum]);
        let opslaan = JSON.stringify(GLOBAL.nummersopslag);
        localStorage.setItem("vermeniggetal",opslaan);
    }

//-------------------------------------------------------------

    inladen();

    let knop = document.getElementById("knop");
    knop.addEventListener("click", klikbtn);

}
window.addEventListener("load", setup);