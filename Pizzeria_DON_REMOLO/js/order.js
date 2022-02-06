function order(card) {
    // собираем данные товара для добавления их в корзину
    const items = {
        id: card.getAttribute('id'),
        title: card.querySelector('h4').innerText,
        price: parseInt((card.querySelector('h5').innerText).slice(2)),
        img: card.querySelector('img').getAttribute('src')
    }

    // записываем собранные данные в перменную
    const orderCardHtml = `<div class="order-card-wrapper"><div class="order-card" id="${items.id}">
    <div class="card-wrapper">
        <img src="${items.img}" alt="">
        <div class="card-description">
            <h4>${items.title}</h4>
            <p>$ ${items.price}<span class="card-float">.00</span></p>
        </div>
        <div class="card-counter">
            <h3 class="calc" data-action="minus">-</h3>
            <div class="counter" data-counter>1</div>
            <h3 class="calc" data-action="plus">+</h3>
        </div>
    </div>
</div>
<button class="delete-button">Eliminar</button>
</div>`;

    // добавляем данные на страницу
    document.querySelector('.order-list').insertAdjacentHTML('beforeend', orderCardHtml)
}


