const rates = {};
const elmSellUSD = document.querySelector('[data-value="SellUSD"]');
const elmSellEUR = document.querySelector('[data-value="SellEUR"]');
const elmSellRUB = document.querySelector('[data-value="SellRUB"]');

const elmBuyUSD = document.querySelector('[data-value="BuyUSD"]');
const elmBuyEUR = document.querySelector('[data-value="BuyEUR"]');
const elmBuyRUB = document.querySelector('[data-value="BuyRUB"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrency();

setInterval(getCurrency, 10000);

async function getCurrency() {
    const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const data = await response.json();
    const result = data;

    rates.USD = result[0];
    rates.EUR = result[1];
    rates.RUB = result[2];

    elmBuyUSD.innerText = (parseFloat(rates.USD.sale)).toFixed(2);
    elmBuyEUR.innerText = (parseFloat(rates.EUR.sale)).toFixed(2);
    elmBuyRUB.innerText = (parseFloat(rates.RUB.sale)).toFixed(3);

    elmSellUSD.innerText = (parseFloat(rates.USD.buy)).toFixed(2);
    elmSellEUR.innerText = (parseFloat(rates.EUR.buy)).toFixed(2);
    elmSellRUB.innerText = (parseFloat(rates.RUB.buy)).toFixed(3);
}

input.oninput = convertValue;
select.oninput = convertValue;

function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].sale).toFixed(3);
}