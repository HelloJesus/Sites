// const productsWrapper = document.querySelector('.products-wrapper');

document.addEventListener('touchstart', function (event) {
    event.preventDefault();
    const orderButton = document.querySelector('.products-wrapper')
    const cardBtn = event.target.closest('.card-btn');
    // const cardCounter = event.target.closest('.card-counter');
    const checkOrderBtn = document.querySelector('.order-button');

    let totalPrice = 0;
    let card;
    let cardPrice;

    // проверяем нажатие добавления товара
    if (event.target.closest('.card-btn')) {
        // записываем карточку товара в переменную
        card = cardBtn.closest('.card');
        // парсим стоимость товара с карточки
        cardPrice = parseInt((card.querySelector('#cardPrice').innerText).slice(2));
        totalPrice = orderButton.querySelector('.price');

        // проверяем есть ли сумма денег на товар в кнопке
        if (totalPrice) {
            // получаем сумму денег с кнопки
            totalPrice = parseInt(totalPrice.innerHTML);
        };

        if (!cardBtn.classList.contains('active')) {
            // добавляем товары в корзину
            order(card);

            // добавляем сумму к уже существующей
            totalPrice = totalPrice + cardPrice;
            // если блок кнопки существует, то меняем содержимое блока суммы в кнопке
            if (orderButton.querySelector('.price')) {
                // сумма денег
                orderButton.querySelector('.price').innerText = totalPrice;
                // количество товара
                countItems.innerText = parseInt(countItems.innerText) + 1;
            }

            cardBtn.classList.add('active')

        } else if (cardBtn.classList.contains('active')) {

            // удаляем товар с корзины с заданным id
            const cardId = card.getAttribute('id');
            const orderById = (document.querySelector('.order-list')).querySelector(`#${cardId}`);
            orderById.parentNode.remove();

            cardBtn.classList.remove('active');
            if ((+orderById.querySelector('[data-counter]').innerText) > 1) {
                totalPrice = totalPrice - (+(orderById.querySelector('p').innerText).slice(2)) * (+orderById.querySelector('[data-counter]').innerText);
            } else {
                totalPrice = totalPrice - cardPrice;
            }

            orderButton.querySelector('.price').innerText = totalPrice;
            countItems.innerText = parseInt(countItems.innerText) - 1;

            if (parseInt(countItems.innerText) == 0) {
                // если список товаров в корзине 0, тогда удаляем кнопку заказа
                orderBtn.remove();
            }
        }
        // копируем цену из кнопки заказа в карточку заказа
        const checkPrice = document.querySelector('.checkout-price');
        checkPrice.innerText = totalPrice;

        // создаем кнопку корзины, если ее еще нет
        const orderDiv = document.createElement('div');
        if (!checkOrderBtn) {
            const orderDivHtml = `
        <div class="order-text">
            <p class="total-items"><span id="countItems">1</span> Items</p>
            <p class="total-price"><span class="dollar">$ </span><span class="price">${totalPrice}</span><span
                    class="float-price">.00</span>
            </p>
        </div>
        <div class="order-img">
            <img src="./img/order.svg">
        </div>`
            orderDiv.classList.add('order-button');
            orderDiv.id = 'orderBtn';
            orderDiv.insertAdjacentHTML('beforeend', orderDivHtml);
            orderButton.append(orderDiv);
        }

        // если фон пустой, ставим начальный
        if (!backgroundOrderBtn) backgroundOrderBtn = '#FF678C';
        orderDiv.style.background = backgroundOrderBtn;

    } else if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const orderCard = event.target.closest('.order-card');
        const checkOutPrice = document.querySelector('.checkout-price');
        const counter = orderCard.querySelector('[data-counter]');
        const orderCardCounter = +(orderCard.querySelector('p').innerText).slice(2);

        if (event.target.dataset.action === 'plus') {
            counter.innerText = ++counter.innerText;
            checkOutPrice.innerText = +checkOutPrice.innerText + orderCardCounter;
            orderButton.querySelector('.price').innerText = checkOutPrice.innerText;
        }
        if (event.target.dataset.action === 'minus') {
            if (parseInt(counter.innerText) > 1) {
                counter.innerText = --counter.innerText;
                checkOutPrice.innerText = +checkOutPrice.innerText - orderCardCounter;
                orderButton.querySelector('.price').innerText = checkOutPrice.innerText
            }
        }
    } else if (event.target.closest('.card-wrapper')) {
        // если нажали по блоку с увеличением/уменьшением кол-ва товара, то вернуться
        if (event.target.closest('.card-counter')) return;
        const orderCard = event.target.closest('.order-card');

        if (!parseInt(orderCard.style.left)) {
            orderCard.style.left = '-103px';
        } else {
            orderCard.style.left = 0;
        }


        console.log(orderCard.style.left)
    } else if (event.target.closest('.delete-button')) {
        const btnDelete = event.target.closest('.delete-button');
        const orderCard = btnDelete.parentNode;
        const orderCardId = orderCard.querySelector('.order-card').getAttribute('id');
        // const orderById = orderCard.querySelector(`#${cardId}`);

        const cardId = document.querySelector('.card-products').querySelector(`#${orderCardId}`);
        cardId.querySelector('.card-btn').classList.remove('active');

        const counter = +(orderCard.querySelector('[data-counter]').innerText);
        const orderCardCounter = +(orderCard.querySelector('p').innerText).slice(2);
        const checkOutPrice = document.querySelector('.checkout-price');

        checkOutPrice.innerText = +checkOutPrice.innerText - orderCardCounter * counter;
        orderButton.querySelector('.price').innerText = checkOutPrice.innerText;
        countItems.innerText = parseInt(countItems.innerText) - 1;
        if (parseInt(countItems.innerText) == 0) {
            orderBtn.remove();
        }

        orderCard.style.left = '-100%';

        function orderCardRemove() {
            orderCard.remove();
        }
        setTimeout(orderCardRemove, 200);


    } else if (event.target == deleteOrderList) {
        const orderList = document.querySelector('.order-list');
        const checkOutPrice = document.querySelector('.checkout-price');

        for (let itemOrderList of orderList.querySelectorAll('.order-card-wrapper')) {
            const orderCardId = itemOrderList.querySelector('.order-card').getAttribute('id');
            const cardId = document.querySelector('.card-products').querySelector(`#${orderCardId}`);
            cardId.querySelector('.card-btn').classList.remove('active');

            itemOrderList.remove();
        }
        countItems.innerText = 0;
        orderBtn.remove();
        checkOutPrice.innerText = 0;
    }

})
