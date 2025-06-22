// Seleciona todos os elementos necessários do HTML
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.conteiner');
const list = container.querySelector('.List'); // Não estava sendo usado, mas mantido caso precise
const items = container.querySelectorAll('.List .Item');
const indicator = document.querySelector('.indicators');
const dots = indicator.querySelectorAll('ul li');
const number = indicator.querySelector('.number');

// Variáveis para controlar o estado do slider
let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

// Array com as cores de fundo
const backgroundColors = [
    'radial-gradient(#7f3d9e, #6d00d9)', 
    'radial-gradient(#3b3a3f, #000000)', 
    'radial-gradient(#4b5860, #15222a)'
];

function setSlider() {
    const itemOld = container.querySelector('.List .Item.active');
    if (itemOld) {
        itemOld.classList.remove('active');
    }
    items[active].classList.add('active');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[active].classList.add('active');
    number.innerHTML = '0' + (active + 1);
    container.style.backgroundImage = backgroundColors[active];
}

nextButton.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    setSlider();
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    setSlider();
}

setSlider();

// LÓGICA DO MENU MOBILE
const menuIcon = document.querySelector('.mobile-menu-icon');
const closeIcon = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuIcon && closeIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
    
    closeIcon.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}


// --- LÓGICA OTIMIZADA PARA CURSOR E PARALLAX (APENAS DESKTOP) ---
if (window.innerWidth > 1024) {
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('button, a, li');

    // Variáveis para guardar a posição do mouse
    let mouseX = 0;
    let mouseY = 0;

    // Listener apenas para atualizar as coordenadas
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Loop de animação otimizado
    function animate() {
        // Animação do cursor
        cursor.style.transform = `translate(${mouseX - (cursor.offsetWidth / 2)}px, ${mouseY - (cursor.offsetHeight / 2)}px)`;
        
        // Animação do carro
        const carImg = document.querySelector('.Item.active .car-img');
        if (carImg) {
            const rect = container.getBoundingClientRect();
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 40;
            const rotateY = (centerX - x) / 40;
            carImg.style.transform = `translateY(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        requestAnimationFrame(animate);
    }
    
    // Inicia o loop de animação
    requestAnimationFrame(animate);

    // Efeito de "crescer" do cursor
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });

    // Reset da posição do carro ao sair
    container.addEventListener('mouseleave', () => {
        const carImg = document.querySelector('.Item.active .car-img');
        if (carImg) {
            carImg.style.transform = 'translateY(-50%)';
        }
    });
}