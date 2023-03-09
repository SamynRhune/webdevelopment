const setup = () => {

let zin = "De man van An";
let gevondenteller = 0;
let tekstteller = 0;
let done = false

    while(tekstteller !== -1){
        tekstteller = zin.toLowerCase().indexOf('an',tekstteller+1);
        gevondenteller += 1;
    }
    gevondenteller -=1;
    console.log(gevondenteller);


}
window.addEventListener("load", setup);