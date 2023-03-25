const setup = () => {

    let gemeentes = [];
    let vak = document.getElementById("keuze");

    while(gemeentes.at(-1) !== "stop"){

        gemeentes.push(window.prompt("Gemeente"));
//  prompt("geef een gemeente")
    }
    gemeentes.pop();
    gemeentes.sort();

    for(let i = 0 ; i < gemeentes.length ; i++){
        vak.innerHTML += "<option> " + gemeentes[i] + "</option>";
    }




    console.log(gemeentes);

}
window.addEventListener("load", setup);