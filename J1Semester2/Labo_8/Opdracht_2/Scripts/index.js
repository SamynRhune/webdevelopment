const setup = () => {

    let student = {
        voornaam : "Bart",
        achternaam : "Depoorter",
        geboortedag : new Date("1973-11-11"),
        adres :{
            straat: "Berkenstraat",
            huisnummer : "8",
            postcode : "8800",
            gemeente : "Roeselare"
        }

    }
    console.log(JSON.stringify(student));

    //----------------------------------

    let student2 = {"voornaam":"Bart","achternaam":"Depoorter","geboortedag":"1973-11-11T00:00:00.000Z","adres":{"straat":"Berkenstraat","huisnummer":"8","postcode":"8800","gemeente":"Roeselare"}};
    console.log(JSON.stringify(student2));

    //____________________________________
    console.log("vergelijken");
    console.log();
    console.log(student.adres.straat);
    console.log(student2.adres.straat);

    console.log(typeof student.geboortedag);
}
window.addEventListener("load", setup);