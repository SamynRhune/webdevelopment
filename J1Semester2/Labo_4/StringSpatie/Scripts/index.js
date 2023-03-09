const setup = () => {

    let knop = document.getElementById('knop');

    const update = () => {
        let tekst = document.getElementById('tekst');

        let nieuwtekst = "";


        tekst = tekst.value.replaceAll(" ","");

        for(let i = 0;i < tekst.length; i++){
            nieuwtekst += tekst.charAt(i) + " ";
        }

        console.log(nieuwtekst);

    }
    knop.addEventListener("click",update);

}
window.addEventListener("load", setup);