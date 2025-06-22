
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

// Lógica dos botões
nextButton.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    setSlider();
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    setSlider();
}



const cursor = document.querySelector('.cursor');
const interactiveElements = document.querySelectorAll('button, a, li, input');


window.addEventListener('mousemove', (e) => {
    
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
    });
});



container.addEventListener('mousemove', (e) => {
    const carImg = document.querySelector('.Item.active .car-img');
    if (!carImg) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 40; 
    const rotateY = (centerX - x) / 40;

    carImg.style.transform = `translate(-40%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});


container.addEventListener('mouseleave', () => {
    const carImg = document.querySelector('.Item.active .car-img');
    if (carImg) {
        carImg.style.transform = 'translate(-40%, -50%)';
    }
});



setSlider();