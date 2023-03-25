const setup = () => {
    let knop = document.getElementById("knop");
    const klik = () => {



        let div = document.querySelector('div');

        div.textContent="Dit is een tekst";



    }

    knop.addEventListener('click',klik)
}
window.addEventListener("load", setup);