document.addEventListener('DOMContentLoaded', function() {
    const menuHamburger = document.querySelector('.menu-hamburger');
    const nav = document.querySelector('.cabeçalho');

    menuHamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Fechar o menu quando clicar fora dele
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuHamburger.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
});
