const setup = () => {
}
window.addEventListener("load", setup);
const family = ['Ann','Gert','Niels','Mark','Johan'];
console.log(family.length);
for(let i = 0;i<5;i++){

    console.log(family[i]);
    i++;
}
const voegNaamToe = () =>{
    let nieuw = prompt("Enter new name","Michiel");
    family.push(nieuw);
}
voegNaamToe();
console.log(family);
console.log(family.toString());