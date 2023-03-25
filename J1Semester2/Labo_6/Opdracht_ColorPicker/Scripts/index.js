const setup = () => {

    let red = document.getElementsByClassName("redslider");
    let green = document.getElementsByClassName("greenslider");
    let blue = document.getElementsByClassName("blueslider");
    let block = document.getElementsByClassName("colorBlock");
    let numberlist = document.getElementsByClassName("colornumber");
    let knop = document.getElementById("save");



    const update = () => {

        let redvalue = red[0].value;
        let greenvalue = green[0].value;
        let bluevalue = blue[0].value;

        numberlist[0].innerHTML = red[0].value;
        numberlist[1].innerHTML = green[0].value;
        numberlist[2].innerHTML = blue[0].value;

        block[0].style.backgroundColor = `rgb(${redvalue} , ${greenvalue}, ${bluevalue})`;

        //console.log(red[0].value + ", " + green[0].value + ", " + blue[0].value);

    }

    const opslaan = () => {

        let opslag = document.getElementById("opslag");

        let redvalue = red[0].value;
        let greenvalue = green[0].value;
        let bluevalue = blue[0].value;

        let newBlock = document.createElement('div');
        newBlock.style.backgroundColor = `rgb(${redvalue} , ${greenvalue}, ${bluevalue})`;
        newBlock.style.margin = '0px 0px 0px 5px';

        opslag.appendChild(newBlock);

        let xButton = document.createElement('input');


        xButton.setAttribute('type', "button");
        xButton.setAttribute('value',"x");

        newBlock.appendChild(xButton);

        xButton.addEventListener('click',()=>xKlik(xButton));

    }
    const xKlik = (xButton) => {
        opslag.removeChild(xButton.parentNode);
    }

    red[0].addEventListener("change",update)
    red[0].addEventListener("input",update);
    green[0].addEventListener("change",update);
    green[0].addEventListener("input",update);
    blue[0].addEventListener("change",update);
    blue[0].addEventListener("input",update);
    knop.addEventListener("click",opslaan);




}
window.addEventListener("load", setup);