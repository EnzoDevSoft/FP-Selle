// Seleciona todos os elementos necessários do HTML
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.conteiner');
const list = container.querySelector('.List');
const items = container.querySelectorAll('.List .Item');
const indicator = document.querySelector('.indicators');
const dots = indicator.querySelectorAll('ul li');
const number = indicator.querySelector('.number');

// Variáveis para controlar o estado do slider
let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

// Array com as cores de fundo para cada slide
const backgroundColors = [
    'radial-gradient(#7f3d9e, #6d00d9)', 
    'radial-gradient(#3b3a3f, #000000)', 
    'radial-gradient(#4b5860, #15222a)'
];

// NOVA LÓGICA DO CARROSSEL
function setSlider() {
    // Calcula o deslocamento para a esquerda com base no slide ativo
    const offset = -items[active].offsetLeft;
    list.style.transform = `translateX(${offset}px)`;

    // Remove a classe 'active' do slide anterior e a adiciona ao novo
    const itemOld = container.querySelector('.List .Item.active');
    if (itemOld) {
        itemOld.classList.remove('active');
    }
    items[active].classList.add('active');

    // Atualiza os indicadores (bolinhas)
    dots.forEach(dot => dot.classList.remove('active'));
    dots[active].classList.add('active');

    // Atualiza o número do slide
    number.innerHTML = '0' + (active + 1);

    // Atualiza a cor de fundo
    container.style.backgroundImage = backgroundColors[active];
}

// Lógica dos botões
nextButton.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    setSlider();
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    setSlider();
}

// Inicia o slider na posição correta
setSlider();

// LÓGICA DO MENU MOBILE (continua igual e funcional)
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