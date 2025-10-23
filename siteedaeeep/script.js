document.addEventListener('DOMContentLoaded', function() {
    const menuHamburger = document.querySelector('.menu-hamburger');
    const nav = document.querySelector('.cabeçalho');

    // Menu hambúrguer (abrir/fechar painel)
    if (menuHamburger && nav) {
        menuHamburger.addEventListener('click', function(event) {
            event.stopPropagation();
            nav.classList.toggle('active');
        });

        // Fechar o painel quando clicar fora
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !menuHamburger.contains(event.target)) {
                nav.classList.remove('active');
            }
        });
    }

    // Submenus: detectar <li> que contém <ul> (não depende de classes no HTML)
    let submenuParents = [];
    if (nav) {
        submenuParents = Array.from(nav.querySelectorAll('li')).filter(li => li.querySelector('ul'));
    }

    // marca os elementos com classes para o CSS (se desejar)
    submenuParents.forEach(li => {
        li.classList.add('has-submenu');
        const childUl = li.querySelector(':scope > ul');
        if (childUl) childUl.classList.add('sub-cursos');
    });

    // Fecha todos os submenus irmãos (mantém apenas o 'current' aberto)
    const closeSiblings = (current) => {
        submenuParents.forEach(p => {
            if (p !== current) p.classList.remove('open');
        });
    };

    submenuParents.forEach(parent => {
        let closeTimer = null;
        const submenu = parent.querySelector(':scope > ul');
        const triggerLink = parent.querySelector(':scope > a');

        // Mostrar submenu ao passar o mouse
        parent.addEventListener('mouseenter', () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            // fecha irmãos para comportamento exclusivo
            closeSiblings(parent);
            parent.classList.add('open');
        });

        // Fechar com pequeno atraso ao sair
        parent.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => parent.classList.remove('open'), 250);
        });

        // Em dispositivos de toque, ao clicar no link do pai alterna o submenu
        if (triggerLink && submenu) {
            triggerLink.addEventListener('click', (e) => {
                // Previna navegação quando houver submenu — primeiro clique abre, segundo clica no link
                e.preventDefault();
                const willOpen = !parent.classList.contains('open');
                if (willOpen) {
                    // fechar irmãos antes de abrir este
                    closeSiblings(parent);
                    parent.classList.add('open');
                } else {
                    parent.classList.remove('open');
                }
            });
        }
    });

    // Fechar submenus apenas quando clicar fora do painel de navegação
    document.addEventListener('click', (e) => {
        // se não houver nav, fechamos tudo por segurança
        if (!nav || !nav.contains(e.target)) {
            submenuParents.forEach(p => p.classList.remove('open'));
        }
        // se clicou dentro do nav, não alteramos outros submenus — permite múltiplos abertos
    });
});
