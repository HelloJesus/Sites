const navBtn = document.querySelector('.nav-button')
const mobileNav = document.querySelector('.mobile-nav')
const body = document.body;

//Открытие меню
navBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleMobileNav()
})

//Закрытие меню
window.addEventListener('click', function () {

    if (body.classList.contains('no-scroll')) {
        toggleMobileNav()
    }
})

mobileNav.addEventListener('click', function (event) {
    event.stopPropagation();
})

function toggleMobileNav() {
    mobileNav.classList.toggle('mobile-nav-active')
    navBtn.classList.toggle('nav-button-close')
    body.classList.toggle('no-scroll')
}