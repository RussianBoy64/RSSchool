const burgerBtn = document.querySelector('.burger-menu')
const menu = document.querySelector('header .nav')
const menuLinks = menu.querySelectorAll('header .nav__link')

function menuToggle() {
  menu.classList.toggle('open')
}

function menuClose() {
  menu.classList.remove('open')
}

burgerBtn.addEventListener('click', menuToggle)

menuLinks.forEach((link) => {
  link.addEventListener('click', menuClose)
})

export { menuToggle, menuClose }
