const setup = () => {

    let items = document.querySelectorAll('li');
    for(let i = 0 ; i < items.length ; i++){
        items[i].setAttribute('class','listitem')
    }

    let listitems = document.getElementsByClassName("listitem");
    for(let i = 0 ; i < listitems.length ; i++){
        listitems[i].style.color = 'red';
    }

    let foto = document.createElement("img");
    foto.setAttribute("src","Images/FOTO.jpg");
    foto.setAttribute("alt","Foto van mezelf");
    foto.style.height = '250px';
    foto.style.width = 'auto';

    let body = document.querySelector('body');
    body.appendChild(foto);

}
window.addEventListener("load", setup);