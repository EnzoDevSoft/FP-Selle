let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let conteiner = document.querySelector('.conteiner')
let items = conteiner.querySelectorAll('.List .Item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1


nextButton.onclick = () => {
     let itemOld = conteiner.querySelector('.List .Item.active')
     itemOld.classList.remove('active')

     active = active + 1 > lastPosition ? 0 : active + 1
     items[active].classList.add('active')
}


prevButton.onclick = () => {
    console.log("Botão prev")
}