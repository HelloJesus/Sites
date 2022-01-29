

document.onclick = function (event) {
    event.preventDefault();
    const orderButton = document.querySelector('.products-wrapper')
    const cardBtn = event.target.closest('.card-btn');
    const checkOrderBtn = document.querySelector('.order-button');

    let totalPrice = 0;
    if (event.target.closest('.order-button')) {
        const order = document.querySelector('.order');
        // const line = document.querySelector('.line');
        order.style.bottom = 0;

        console.log(document.querySelector('.order').clientHeight);
        // order.addEventListener('mousedown', () => {
        //     // Для ПК
        //     line.style.opacity = 0
        //     // order.style.transform = 'translate(0px, 30px)'
        // })
        // order.addEventListener('mouseup', () => {
        //     // Для ПК
        //     order.style.transform = 'none'
        //     line.style.opacity = 1
        // })
        order.addEventListener('touchmove', (evt) => {
            const line = evt.target.querySelector('.line');
            if (!evt.target.closest('.line')) return;
            if (evt.changedTouches[0].pageY < 281) return;
            console.log(270 - evt.changedTouches[0].pageY)
            // console.log(`Top: ${order.getBoundingClientRect().top}`)
            // Для моб. девайсов
            // line.style.opacity = 1;

            // order.style.transform = `translate(0px, ${evt.changedTouches[0].pageX}px)`
            order.style.bottom = (270 - evt.changedTouches[0].pageY) + 'px';


        })
        order.addEventListener('touchend', () => {
            // Для моб. девайсов
            if (parseInt(order.style.bottom) < (-300)) {
                console.log('hello')
                order.style.bottom = -659 + 'px';
            } else {
                order.style.bottom = 0;
            }
            // order.style.opacity = 1
        })
    }
    // проверяем нажатие добавления товара
    if (!cardBtn) {
        return;
    }



    // записываем карточку товара в переменную
    const card = cardBtn.closest('.card');
    // парсим стоимость товара с карточки
    const cardPrice = parseInt((card.querySelector('#cardPrice').innerText).slice(2));
    totalPrice = orderButton.querySelector('.price');

    // проверяем есть ли сумма денег на товар в кнопке
    if (totalPrice) {
        // получаем сумму денег с кнопки
        totalPrice = parseInt(totalPrice.innerHTML);

    };

    if (!cardBtn.classList.contains('active')) {
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
        console.log(cardBtn.classList.contains('active'))
    } else if (cardBtn.classList.contains('active')) {
        cardBtn.classList.remove('active');
        totalPrice = totalPrice - cardPrice;
        orderButton.querySelector('.price').innerText = totalPrice;
        countItems.innerText = parseInt(countItems.innerText) - 1;

        if (parseInt(countItems.innerText) == 0) {
            // если список товаров в корзине 0, тогда удаляем кнопку заказа
            orderButton.querySelector('.order-button').remove();
        }
    }

    // создаем кнопку, если ее еще нет
    const orderDiv = document.createElement('div');
    if (!checkOrderBtn) {
        const html = `
        <div class="order-text">
            <p class="total-items"><span id="countItems">1</span> Items</p>
            <p class="total-price"><span class="dollar">$ </span><span class="price">${totalPrice}</span><span
                    class="float-price">.00</span>
            </p>
        </div>
        <div class="order-img">
            <img src="./img/order.svg">
        </div>`
        orderDiv.classList.add('order-button')
        orderDiv.insertAdjacentHTML('beforeend', html)
        orderButton.append(orderDiv)
    }

    // если фон пустой, ставим начальный
    if (!backgroundOrderBtn) backgroundOrderBtn = '#FF678C';
    orderDiv.style.background = backgroundOrderBtn;


}
