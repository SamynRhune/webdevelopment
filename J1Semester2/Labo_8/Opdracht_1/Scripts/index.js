const setup = () => {
    let vandaag;
    vandaag = new Date();
    //console.log(vandaag);
    let verjaardag;
    verjaardag = new Date(2023,2,17);
    //console.log(verjaardag);
    let verschil = vandaag-verjaardag;
    console.log(Math.round(verschil/1000/60/60/24));
}
window.addEventListener("load", setup);