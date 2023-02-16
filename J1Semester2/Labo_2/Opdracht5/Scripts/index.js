const setup = () => {

    const wijzigen = () =>{

        let txtOutput = document.getElementById("txtOutput");

        let resultaat = 'Welkom!';

        txtOutput.innerHTML = resultaat;
    }


    let bouton = document.getElementById("bouton");
    bouton.addEventListener("click", wijzigen);

}
window.addEventListener("load", setup);