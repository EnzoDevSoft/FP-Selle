const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.conteiner');
const list = container.querySelector('.List'); 
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


if (window.innerWidth > 1024) {
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('button, a, li');

    let mouseX = 0;
    let mouseY = 0;

  
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });


    function animate() {
        
        cursor.style.transform = `translate(${mouseX - (cursor.offsetWidth / 2)}px, ${mouseY - (cursor.offsetHeight / 2)}px)`;
        
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
    
 
    requestAnimationFrame(animate);

    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });

    
    container.addEventListener('mouseleave', () => {
        const carImg = document.querySelector('.Item.active .car-img');
        if (carImg) {
            carImg.style.transform = 'translateY(-50%)';
        }
    });
}