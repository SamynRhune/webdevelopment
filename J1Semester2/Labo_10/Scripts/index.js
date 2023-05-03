const setup = () => {
let GLOBAL = {
    urls : [],
    alleinfo: []
    }


const klik = () => {
    let tekst = document.getElementById("tekst");
    let splitlijst = tekst.value.split(" ")

    let keywords = "";
    for(let i = 1; i < splitlijst.length ;i++){
        keywords+= splitlijst[i] + "+";
    }
    keywords = keywords.substring(0,keywords.length-1);


    if(splitlijst[0]==="/y"){
        openyt(keywords);
    }else if(splitlijst[0]==="/g"){
        opengo(keywords);
    }else if(splitlijst[0]==="/t"){
        opentw(keywords);
    }else if(splitlijst[0]==="/i"){
        openin(keywords);
    }else if(splitlijst[0].charAt(0)==='/'){
        window.alert("Unknown command prefix");
    }else{
        window.alert("Invalid Command");
    }
}
const openyt = (keywords) =>{
    console.log("yt: " + keywords);
    window.open(("https://www.youtube.com/results?search_query="+keywords), "_blank");
    GLOBAL.urls.push("https://www.youtube.com/results?search_query="+keywords);
    maakblok('red','Youtube',keywords);
}
const opengo = (keywords) =>{
    console.log("google: " + keywords);
    window.open(("https://www.google.com/search?q="+keywords), "_blank");
    GLOBAL.urls.push("https://www.google.com/search?q="+keywords);
    maakblok('blue','Google',keywords);
}
const opentw = (keywords) => {
    console.log("twitter: " + keywords);
    window.open("https://twitter.com/hashtag/"+keywords, "_blank");
    GLOBAL.urls.push("https://twitter.com/hashtag/"+keywords);
    maakblok('lightskyblue','Twitter',keywords);
}
const openin = (keywords) => {
    console.log("instagram: " + keywords);
    window.open("https://www.instagram.com/explore/tags/"+keywords+"/", "_blank");
    GLOBAL.urls.push("https://www.instagram.com/explore/tags/"+keywords+"/");
    maakblok('purple','Instagram',keywords);
}
const maakblok = (kleur,platform,keywords) =>{
    let rij = document.getElementById('rij');

    let blok = document.createElement('div');
    blok.setAttribute('id','blok'+(GLOBAL.urls.length-1));
    blok.style.backgroundColor = kleur;
    //blok.style.height = '50px';
    blok.classList.add('col-4');

    let hoofd = document.createElement("h3");
    hoofd.innerHTML = platform;
    blok.appendChild(hoofd);

    let span = document.createElement('span');
    span.innerHTML = keywords.replace('+',' ') ;
    blok.appendChild(span);

    let br = document.createElement('br');
    blok.appendChild(br);

    let urlknop = document.createElement('input');
    urlknop.setAttribute('type','button');
    urlknop.setAttribute('value','Go!');
    blok.appendChild(urlknop);

    urlknop.addEventListener('click',()=>openviaknop(urlknop));

    rij.appendChild(blok);

    let info = [];
    info.push(kleur);
    info.push(platform);
    info.push(keywords);
    info.push(GLOBAL.urls[(GLOBAL.urls.length-1)]);

    GLOBAL.alleinfo.push(info);

    let jsonstring = JSON.stringify(GLOBAL.alleinfo);
    localStorage.setItem('list',jsonstring);
}
const openviaknop = (urlknop) =>{
    let ouder = urlknop.parentElement;
    let bloknaam = ouder.getAttribute('id');
    let index = bloknaam.replace('blok','');
    window.open(GLOBAL.urls[index],"_blank");
}

let knop = document.getElementById("knop");
knop.addEventListener("click", klik);

const heropstart = () =>{
    let info = JSON.parse(localStorage.getItem('list'));

    for(let i = 0 ; i < info.length ; i++){
        GLOBAL.urls.push(info[i][3]);
        maakblok(info[i][0],info[i][1],info[i][2]);

    }

}
heropstart();




}
window.addEventListener("load", setup);