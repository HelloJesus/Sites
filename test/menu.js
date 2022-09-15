const menuBtn = document.querySelector(".menu-toggler")
const menu = document.querySelector(".menu")

menuBtn.addEventListener("click", function () {
    menu.classList.toggle("menu-active")
})

menuBtn.addEventListener("click", function () {
    if (menu.classList.contains(".menu-active")) {
        menu.classList.toggle("menu")
    }
})