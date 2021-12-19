$(document).ready(function () {
    $('.header-mobile-nav').click(function (event) {
        $('.header-mobile-nav,.header-nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.header-link').click(function (event) {
        $('.header-mobile-nav,.header-nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
});