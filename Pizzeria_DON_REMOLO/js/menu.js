// переменная, которая должна содержать фон для кнопки с заказом
window['backgroundOrderBtn'] = '#FF4E4E';

menuBtn.addEventListener('touchstart', function () {
    const menuDistance = menuBtn.getBoundingClientRect().left;
    menuBtn.classList.toggle("active");
    menuBtn.querySelector('.btn-menu-icon').classList.toggle("btn-after");
    if (containermenu.getBoundingClientRect().left < 0) {
        containermenu.style.left = menuDistance - 1 + 'px';
    } else {
        containermenu.style.left = '-100%'
    }
    // containermenu.classList.toggle("nohide");
})

icons.addEventListener('touchstart', function (event) {
    const icons = document.querySelectorAll('.icon');
    const icon = event.target.closest('.icon');
    if (!icon) return;
    for (let item of icons) {
        item.style.backgroundColor = "#E8E8E8";
        item.querySelector('img').classList.remove('icon-color');
    }

    const iconIdAttr = icon.getAttribute('id');
    const iconImg = icon.querySelector('img');

    // создаем переменные для слайда
    const icon1 = document.querySelector('.card-pizza'); // первая категория товара
    const icon2 = document.querySelector('.breaded'); // вторая категория товара
    const icon3 = document.querySelector('.drink'); // третья категория товара
    const icon4 = document.querySelector('.sweets'); // четвертая категория товара
    // ширина: ширина блока с товарами + отступ между ними
    const width = icon2.getBoundingClientRect().left - icon1.getBoundingClientRect().right + icon1.offsetWidth;
    //  высота товара
    const height = document.querySelector('.card-products');
    const orderBtn = document.querySelector('.order-button');

    switch (iconIdAttr) {
        case "icon-1":
            icon.style.backgroundColor = "#FF4E4E";
            iconImg.classList.add('icon-color');

            icon2.style.left = width + 'px';
            icon3.style.left = width * 2 + 'px';
            icon4.style.left = width * 3 + 'px';
            icon1.style.left = 0;

            // увеличиваем/уменьшаем высоту для видимсоти товара
            height.style.height = '600px';
            // записываем соответсвующий фон в кнопку заказа
            backgroundOrderBtn = '#FF4E4E';
            if (orderBtn) orderBtn.style.background = backgroundOrderBtn;
            break;
        case "icon-2":
            icon.style.backgroundColor = "#FFA73F";
            iconImg.classList.add('icon-color');

            icon1.style.left = width * (-1) + 'px';
            icon3.style.left = width + 'px';
            icon4.style.left = width * 2 + 'px';
            icon2.style.left = 0;

            // увеличиваем/уменьшаем высоту для видимсоти товара
            height.style.height = '600px';
            // записываем соответсвующий фон в кнопку заказа
            backgroundOrderBtn = '#FFA73F';

            if (orderBtn) orderBtn.style.background = backgroundOrderBtn;
            break;
        case "icon-3":
            icon.style.backgroundColor = "#50C2E7";
            iconImg.classList.add('icon-color');

            icon1.style.left = width * (-2) + 'px';
            icon2.style.left = width * (-1) + 'px';
            icon4.style.left = width + 'px';
            icon3.style.left = 0;
            // увеличиваем/уменьшаем высоту для видимсоти товара
            height.style.height = '800px';
            // записываем соответсвующий фон в кнопку заказа
            backgroundOrderBtn = '#50C2E7';

            if (orderBtn) orderBtn.style.background = backgroundOrderBtn;
            break;
        case "icon-4":
            icon.style.backgroundColor = "#FF678C";
            iconImg.classList.add('icon-color');

            icon1.style.left = width * (-3) + 'px';
            icon2.style.left = width * (-2) + 'px';
            icon3.style.left = width * (-1) + 'px';
            icon4.style.left = 0;

            // увеличиваем/уменьшаем высоту для видимсоти товара
            height.style.height = '600px';
            // записываем соответсвующий фон в кнопку заказа
            backgroundOrderBtn = '#FF678C';
            if (orderBtn) orderBtn.style.background = backgroundOrderBtn;
            break;
    }

})




