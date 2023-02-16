const setup = () => {



    window.alert('Dit is een mededeling');
    window.confirm('Weet je het zeker');
    window.prompt('Wat is je naam', 'Onbekend');
    console.log(window.confirm('Weet je het zeker'));
    console.log(window.confirm('Weet je het zeker'));
    console.log(window.prompt('ja of nee', 'onbekend'));
    console.log(window.prompt('ja of nee', 'onbekend'));
}
window.addEventListener("load", setup);