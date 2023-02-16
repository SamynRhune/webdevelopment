const setup = () => {

    let knop = document.getElementById("knop");

    const bereken = () =>{
        let word = document.getElementById("word");
        let number1 = document.getElementById("number1");
        let number2 = document.getElementById("number2");
        let txtOutput = document.getElementById("txtOutput");

        let substring = word.value.substring(number1.value,number2.value);

        txtOutput.innerHTML = substring;


    }







    knop = document.addEventListener("click", bereken);

}
window.addEventListener("load", setup);