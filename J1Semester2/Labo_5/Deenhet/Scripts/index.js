const setup = () => {

    let zin = 'Gisteren zat de jongen op de stoep en at de helft van de appel';
    let array = zin.split(" ");
    let output = "";

    for(let i = 0 ; i < array.length; i++){
        if(array[i] === 'de'){
            output +='het ';
        }else{
            output += array[i] + " ";
        }
    }

    console.log(output);

}
window.addEventListener("load", setup);