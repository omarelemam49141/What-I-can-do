fetch("https://api.currencyfreaks.com/latest?apikey=8c500a2cb4ba4718abd9fe9e9ec59c33")
.then((result) => {
    let currency = result.json();
    return currency;
}).then((currency) => {
    let convert = currency.rates;

    //get currency holders & input
    let dollars = document.querySelector("#currency"),
        egyptian = document.querySelector('.egyptian'),
        saudi = document.querySelector('.saudi');
    
    dollars.onkeyup = function () {
        egyptian.innerHTML = (this.value * convert['EGP']).toFixed(2);
        saudi.innerHTML = (this.value * convert['SAR']).toFixed(2);
    }
})

//serial
let serialContainer = document.querySelector('.serial'),
    generate = document.querySelector('.generate'),
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    serialNumber = "",
    count = 10;

generate.onclick = function () {
    serialNumber = "";
    for (let i = 0; i < count; i++) {
        serialNumber += chars[Math.floor(Math.random() * chars.length)];
    }

    serialContainer.innerHTML = serialNumber;
}