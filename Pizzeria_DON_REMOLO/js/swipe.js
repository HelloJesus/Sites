document.addEventListener('touchstart', function (event) {
    const order = document.querySelector('.order');
    if (event.target.closest('.order-button')) {
        order.style.transition = 'bottom 0.3s ease';
        order.style.bottom = 0;
        document.body.style.overflow = "hidden";

        // реализация свайпа корзины вниз
        order.addEventListener('touchstart', (evt) => {
            order.style.removeProperty('transition');
            const firstTouch = evt.touches[0];
            y1 = firstTouch.clientY;
        })

        order.addEventListener('touchmove', (evt) => {
            const line = evt.target.querySelector('.line');

            if (!evt.target.closest('.line')) return;
            let y2 = evt.touches[0].clientY;
            // не поднимать блок выше Значения bottom = 0
            if (y2 < y1) {
                order.style.bottom = 0;
                return;
            }
            let yDiff = y1 - y2;

            order.style.bottom = yDiff + 'px';

        })
        order.addEventListener('touchend', () => {
            order.style.transition = 'bottom 0.3s ease';
            if (parseInt(order.style.bottom) < (-200)) {
                order.style.bottom = -order.offsetHeight + 'px';
                document.body.style.overflow = "";
            } else {
                order.style.bottom = 0;
            }
        })
    } else if (!event.target.closest('.order')) {
        order.style.bottom = -order.offsetHeight + 'px';
        document.body.style.overflow = "";
    }
})
