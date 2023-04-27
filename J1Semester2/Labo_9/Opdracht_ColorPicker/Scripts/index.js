const setup = () => {

    let red = document.getElementsByClassName("redslider");
    let green = document.getElementsByClassName("greenslider");
    let blue = document.getElementsByClassName("blueslider");
    let block = document.getElementsByClassName("colorBlock");
    let numberlist = document.getElementsByClassName("colornumber");
    let knop = document.getElementById("save");
    let lijst = [];


    const update = () => {

        let redvalue = red[0].value;
        let greenvalue = green[0].value;
        let bluevalue = blue[0].value;

        localStorage.setItem("rood",redvalue);
        localStorage.setItem("groen",greenvalue);
        localStorage.setItem("blauw",bluevalue);


        herlaad();
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

        lijst.push(newBlock.style.backgroundColor);


        let jsonString = JSON.stringify(lijst);

        localStorage.setItem("list",jsonString);

        opslag.appendChild(newBlock);

        //create button
        let xButton = document.createElement('input');


        xButton.setAttribute('type', "button");
        xButton.setAttribute('value',"x");

        newBlock.appendChild(xButton);

        xButton.addEventListener('click',()=>xKlik(xButton));

    }
    const xKlik = (xButton) => {
        opslag.removeChild(xButton.parentNode);
        let stijl = xButton.parentElement.style.backgroundColor;
        let json = JSON.parse(localStorage.getItem("list"));

        json.splice(json.indexOf(stijl),1);

        localStorage.setItem("list",JSON.stringify(json));
    }

    red[0].addEventListener("change",update)
    red[0].addEventListener("input",update);
    green[0].addEventListener("change",update);
    green[0].addEventListener("input",update);
    blue[0].addEventListener("change",update);
    blue[0].addEventListener("input",update);
    knop.addEventListener("click",opslaan);



    //______________________________________________________
    const herlaad = () =>{
        numberlist[0].innerHTML = localStorage.getItem("rood");
        numberlist[1].innerHTML = localStorage.getItem("groen");
        numberlist[2].innerHTML = localStorage.getItem("blauw");

        red[0].setAttribute("value", localStorage.getItem("rood"));
        green[0].setAttribute("value", localStorage.getItem("groen"));
        blue[0].setAttribute("value", localStorage.getItem("blauw"));

        block[0].style.backgroundColor = `rgb(${localStorage.getItem("rood")} , ${localStorage.getItem("groen")}, ${localStorage.getItem("blauw")})`;

    }
    const laadBlokken = () =>{
        let opslag = document.getElementById("opslag");



        let arr = JSON.parse(localStorage.getItem("list"));


        for(let i = 0; i < arr.length ; i++){

            let style = arr[i];

            let newBlock = document.createElement('div');
            newBlock.style.backgroundColor = style;
            newBlock.style.margin = '0px 0px 0px 5px';

            opslag.appendChild(newBlock);


            //create button
            let xButton = document.createElement('input');


            xButton.setAttribute('type', "button");
            xButton.setAttribute('value',"x");

            newBlock.appendChild(xButton);

            xButton.addEventListener('click',()=>xKlik(xButton));

        }
    }
    const begin = () => {
        let lijst2 = JSON.parse(localStorage.getItem("list"));
        for(let i = 0 ; i < lijst2.length ; i++){
            lijst.push(lijst2[i])
        }
    }



    herlaad();
    laadBlokken();
    begin();

}
window.addEventListener("load", setup);


