const navLinks = document.querySelectorAll('.nav__link')
const mainNode = document.querySelector('.main')

const routes = {
  404: 'pages/404/index.html',
  '/': 'pages/main/index.html',
  '/donate': 'pages/donate/index.html',
}

function route(event) {
  event = event || window.event
  event.preventDefault()
  window.history.pushState({}, '', event.target.href)
  console.log(event.target.href)
  window.scrollTo(0, 0)

  locationHandler()
}

async function locationHandler() {
  const path = window.location.pathname
  const route = routes[path] || routes[404]
  console.log(route)
  const data = await fetch(route)
  const html = await data.text()

  mainNode.innerHTML = html
}

function initRouter() {
  window.onpopstate = locationHandler
  window.route = route

  locationHandler()
}

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', route)
})

export default initRouter
