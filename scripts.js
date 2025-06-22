const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.conteiner');
const items = container.querySelectorAll('.List .Item');
const indicator = document.querySelector('.indicators');
const dots = indicator.querySelectorAll('ul li');
const number = indicator.querySelector('.number');

let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

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

// --- LÓGICA DO MENU MOBILE ---
const menuIcon = document.querySelector('.mobile-menu-icon');
const closeIcon = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

closeIcon.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});