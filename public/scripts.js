let url = '/items.json';
let prices = [];
let container = document.getElementById('container');
let searchbar = document.getElementById('search-bar');

fetch(url)
    .then(res => res.json())
    .then(data => {
        prices = data;
        //prices.forEach(item => createRow(item));
        //createItemCard(prices[1]);
    })

searchbar.addEventListener('keyup', (e) => {
    let str = e.target.value.toLowerCase();

    if (str.length === 0) {
        hideContainer();
    } else if (str.length >= 3) {
        showContainer();
        clearContainer();
        let resultBox = document.createElement('div');
        let results = prices.filter(item => {
            return (item.item.toLowerCase().includes(str));
        });
        console.log(results);
        results.forEach(item => {
            createItemCard(item);
        });
        container.appendChild(resultBox);
    }
});

function createRow(item) {
    let row = document.createElement('div');
    let name = item.item;
    let cost = item.cost;
    row.classList.add('row');
    row.innerHTML = `${name}: ${cost}`;
    container.appendChild(row);
}

function createItemCard(item) {
    showContainer();
    let card = document.createElement('div');
    let name = item.item;
    let cost = item.cost;
    let pic = item.img;
    let category = item.category;
    let coin = '/images/gold_coin.png';

    card.classList.add('item-card');
    card.innerHTML = `
        <div class="card-top">
        <div class="card-text">
        <span class="card-title">${name}</span><br />
        <span class="card-category">${category}</span>
        </div>
        <img class="item-pic" src=${pic}><br />
        </div>
        <div class="card-bottom">
        <span class="card-cost">${cost}
        <img class="coin-pic" src="${coin}"></span>
        </div>
    `;

    container.appendChild(card);
}

function hideContainer() {
    container.style.visibility = 'hidden';
}

function showContainer() {
    container.style.visibility = 'visible';
}

function clearContainer() {
    while (container.lastChild) {
        container.removeChild(container.firstChild);
    }
}

hideContainer();