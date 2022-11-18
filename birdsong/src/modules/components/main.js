import createWrapper from './wrapper'
import createLink from './UI/link'

export default async function createMain() {
  const main = document.createElement('main')
  const wrapper = await createWrapper()
  const path = window.location.pathname

  main.classList.add('main')

  // add content
  if (path === '/') {
    const content = await loadMainPage()
    wrapper.append(content)
  }

  main.append(wrapper)

  return main
}

async function loadMainPage() {
  const mainInner = document.createElement('div')
  const title = document.createElement('h1')
  const startLink = await createLink('/quiz', 'Start Quiz', 'link')

  mainInner.classList.add('main__inner')
  title.classList.add('main__title')
  title.innerHTML = 'Guess the birds</br>by their song'

  mainInner.append(title)
  mainInner.append(startLink)

  return mainInner
}
