import createWrapper from './wrapper'
import createLink from './UI/link'
import createQuizPage from './quizPage'

export default async function createMain(lang, question, score, path) {
  const main = document.createElement('main')
  const wrapper = await createWrapper()

  main.classList.add('main')

  // add content
  if (path === '/') {
    const content = await loadMainPage(lang)
    wrapper.append(content)
  } else if (path.includes('quiz')) {
    
    const content = await createQuizPage(lang, question, score)
    wrapper.append(content)
  }

  main.append(wrapper)

  return main
}

async function loadMainPage(lang) {
  const mainInner = document.createElement('div')
  const title = document.createElement('h1')
  const startLink = await createLink(
    '/quiz',
    lang === 'en' ? 'Start Quiz' : 'Начать викторину',
    'link'
  )

  mainInner.classList.add('main__inner')
  title.classList.add('main__title')
  title.innerHTML =
    lang === 'en'
      ? 'Guess the birds</br>by their song'
      : 'Угадай птицу</br>по ее пению'

  mainInner.append(title)
  mainInner.append(startLink)

  return mainInner
}
