const setup = () => {

    let Prijslijst = document.getElementsByClassName("prijs")
    let Qproductlijst = document.getElementsByClassName("quantity");
    let Btwlijst = document.getElementsByClassName("btw");
    let Subtotlijst = document.getElementsByClassName("subtotaal");
    let tot = document.getElementById("totaal");

    let knop = document.getElementById("Bereken");


   const update = () => {
       let tussentotaal =0;
       for (let i = 0; i < Prijslijst.length; i++) {
           let qproducti = parseInt(Qproductlijst[i].value,10);
           let btwi = parseInt(Btwlijst[i].textContent,10);
           let prijs = parseFloat(Prijslijst[i].textContent,10);

           let antwoord = prijs * qproducti *(1+( btwi/100));
           Subtotlijst[i].innerHTML = antwoord.toFixed(2) + " Euro";

            tussentotaal += antwoord;
            tot.innerHTML = tussentotaal + " Euro";

       }
   }

   knop.addEventListener("click",update);

    console.log(parseInt(Btwlijst[0].textContent,10));
}
window.addEventListener("load", setup);