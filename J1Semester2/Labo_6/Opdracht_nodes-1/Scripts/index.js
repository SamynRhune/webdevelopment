const setup = () => {
    let lichaam = document.querySelector('body');
    let paragraaf = document.querySelector('p');
    let tekst = document.createTextNode("Good job");
    paragraaf.parentNode.removeChild(paragraaf);

    lichaam.appendChild(tekst);





}
window.addEventListener("load", setup);