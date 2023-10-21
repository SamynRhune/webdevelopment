const setup = () => {
    let GLOBAL = {
        breedte: 500,
        hoogte: 500,
        aantalImages: 5,
        bommen: [0],
        levend: true,
        wachtend: null,
        highscore: 0,
        huidigescore:0
    }


    const ZetSpelbordOk = () => {
      let spelbord = document.getElementById("speelveld");
      spelbord.style.width = GLOBAL.breedte + "px";
      spelbord.style.height = GLOBAL.hoogte + "px";


    }

    const startGame = () => {
      haalStartWeg();
      GLOBAL.levend = true;

      spawnImage();


    }

    const haalStartWeg = () =>{
        let startknop = document.getElementById("startbutton");
        let topinfo = startknop.parentElement;
        topinfo.removeChild(startknop);
    }

    const spawnImage = () =>{
        let image = document.createElement("img");
        let link = "Images/" + Math.round(Math.random()*(GLOBAL.aantalImages-1)) + ".png";
        image.setAttribute("src",link);
        image.setAttribute("alt","klikfoto");
        image.setAttribute("id","target");

        image.style.left = Math.round(Math.random()*GLOBAL.breedte) + "px";
        image.style.top = Math.round(Math.random()*GLOBAL.hoogte) + "px";
        image.style.position = "absolute";

        let speelveld = document.getElementById("speelveld");
        speelveld.appendChild(image);

        image.addEventListener("click",valideer);

        GLOBAL.wachtend = setTimeout(setDood,3000);

    }

    const valideer = () => {
        clearTimeout(GLOBAL.wachtend);
        //controleren of je dood bent door timeout
        if(GLOBAL.levend) {
            let foto = parseInt(getIndexFoto());
            //heb je op een bom geklikt
            if (GLOBAL.bommen.includes(foto)) {
                console.log("boem");
                verwijderTarget();
                GLOBAL.levend = false;
                plaatsStartknop();
                GLOBAL.huidigescore = 0;

            } else {

                console.log("lekker");
                verwijderTarget();
                spawnImage();
                GLOBAL.huidigescore++;
                if(GLOBAL.huidigescore>GLOBAL.highscore){
                    updateHighScore();
                }

            }
        }else{
            verwijderTarget();
            console.log("je bent te laat");
            plaatsStartknop();
        }

    }

    const plaatsStartknop = () =>{
        let info = document.getElementById("topinfo");

        let startknop = document.createElement("input");
        startknop.setAttribute("type","button");
        startknop.setAttribute("id","startbutton");
        startknop.setAttribute("value","start");

        info.appendChild(startknop);

        startknop.addEventListener("click",startGame);
    }

    const setDood = () =>{
        if(GLOBAL.bommen.includes(getIndexFoto())){
            verwijderTarget();
            spawnImage();
            GLOBAL.huidigescore++;
            if(GLOBAL.huidigescore>GLOBAL.highscore){
                updateHighScore();
            }
        }else{
            GLOBAL.levend = false;
            verwijderTarget();
            plaatsStartknop();

        }

    }

    const verwijderTarget = () =>{
        let target = document.getElementById("target");
        target.parentElement.removeChild(target);

    }

    const getIndexFoto = () => {
        let target = document.getElementById("target");
        let source = target.getAttribute("src");
        while(source.indexOf("/")!== -1){
            source = source.slice(source.indexOf("/")+1);
            console.log(source);
        }
        source = source.slice(0,source.indexOf("."));
        source = parseInt(source);
        return source
    }
    const updateHighScore = () =>{
        let high = document.getElementById("highscore");
        GLOBAL.highscore =GLOBAL.huidigescore
        high.textContent = GLOBAL.highscore;
    }




    ZetSpelbordOk();


    let start = document.getElementById("startbutton");
    start.addEventListener("click",startGame);
    updateHighScore();
}
window.addEventListener("load", setup);