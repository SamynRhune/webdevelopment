const setup = () => {

    let roker = document.getElementById("roker");
    let moedertaal = document.getElementsByName("moedertaal");
    let buurland = document.getElementById("buurland");
    let bestellingen = document.getElementById("bestelling");

    let knop = document.getElementById("knop");


    const print = () =>{
        if(roker.checked){
            console.log("Is een roker")
        }else{
            console.log("Is geen roker")
        }

            for(let i = 0 ; i < moedertaal.length ; i++){
                if(moedertaal[i].checked){
                    console.log("moedertaal is "+ moedertaal[i].value);
                }
            }
        console.log("favoriete buurland is " + buurland.value);

        let artikelen = "bestelling bestaat uit"
        for(let i = 0 ; i < bestellingen.options.length;i++){
            if(bestellingen.options[i].selected){
                artikelen += " " + bestellingen.options[i].text.toLowerCase();
            }
        }
        console.log(artikelen);

    }



    knop.addEventListener("click",print)

}
window.addEventListener("load", setup);