import { toggleBackdrop, hideBackdrop } from './backdrop'

const burgerBtn = document.querySelector('.burger-menu')
const menu = document.querySelector('header .nav')
const menuLinks = menu.querySelectorAll('header .nav__link')

function menuToggle() {
  menu.classList.toggle('open')
  burgerBtn.classList.toggle('open')
  toggleBackdrop()
}

function menuClose() {
  menu.classList.remove('open')
  burgerBtn.classList.remove('open')
  hideBackdrop()
}

burgerBtn.addEventListener('click', menuToggle)

menuLinks.forEach((link) => {
  link.addEventListener('click', menuClose)
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    menuClose()
    hideBackdrop()
  }
})

export { menuToggle, menuClose }
