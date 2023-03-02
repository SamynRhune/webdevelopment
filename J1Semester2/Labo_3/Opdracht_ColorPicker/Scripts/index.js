const setup = () => {

    let red = document.getElementsByClassName("redslider");
    let green = document.getElementsByClassName("greenslider");
    let blue = document.getElementsByClassName("blueslider");
    let block = document.getElementsByClassName("colorBlock");
    let numberlist = document.getElementsByClassName("colornumber");



    const update = () => {
        let red = document.getElementsByClassName("redslider");
        let green = document.getElementsByClassName("greenslider");
        let blue = document.getElementsByClassName("blueslider");
        let redvalue = red[0].value;
        let greenvalue = green[0].value;
        let bluevalue = blue[0].value;

        numberlist[0].innerHTML = red[0].value;
        numberlist[1].innerHTML = green[0].value;
        numberlist[2].innerHTML = blue[0].value;
        block[0].style.backgroundColor = `rgb(${redvalue} , ${greenvalue}, ${bluevalue})`;

        //console.log(red[0].value + ", " + green[0].value + ", " + blue[0].value);

    }

    red[0].addEventListener("change",update)
    red[0].addEventListener("input",update);
    green[0].addEventListener("change",update);
    green[0].addEventListener("input",update);
    blue[0].addEventListener("change",update);
    blue[0].addEventListener("input",update);



}
window.addEventListener("load", setup);