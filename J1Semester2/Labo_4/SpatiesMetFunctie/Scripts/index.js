const setup = () => {


    let knop = document.getElementById('knop');


    const maakMetSpaties = (inputText) => {

        let tekst = document.getElementById('tekst');

        let nieuwtekst = "";


        tekst = tekst.value.replaceAll(" ","");

        for(let i = 0;i < tekst.length; i++){
            nieuwtekst += tekst.charAt(i) + " ";
        }

        console.log(nieuwtekst);
        return nieuwtekst;
    }



    knop.addEventListener("click",maakMetSpaties);


}
window.addEventListener("load", setup);