import quiz from '../Quiz'
import quizData from '../../data/quizData'

import createWrapper from './wrapper'
import createLink from './UI/link'
import createQuizPage from './quizPage'
import { createDescription } from './quizPage'

export default async function createMain(path) {
  const main = document.createElement('main')
  const wrapper = await createWrapper()

  main.classList.add('main')

  // add content
  if (path === '/') {
    const content = await loadMainPage()
    wrapper.append(content)
  } else if (path.includes('quiz')) {
    const content = await createQuizPage()
    wrapper.append(content)
  } else if (path.includes('results')) {
    const content = await loadResultsPage()
    wrapper.append(content)
  } else if (path.includes('gallery')) {
    const content = await loadGalleryPage()
    wrapper.append(content)
  }

  main.append(wrapper)

  return main
}

async function loadMainPage() {
  const lang = quiz.lang
  const mainInner = document.createElement('div')
  const title = document.createElement('h1')
  const startLink = await createLink(
    '/quiz.html',
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

  startLink.addEventListener('click', quiz.startQuiz)

  return mainInner
}

async function loadResultsPage() {
  const {lang, score} = quiz
  const mainInner = document.createElement('div')
  const title = document.createElement('h1')
  const subtitle = document.createElement('p')
  const startLink = await createLink(
    '/quiz.html',
    lang === 'en' ? 'Start over' : 'Начать заново',
    'link'
  )

  mainInner.classList.add('main__inner')
  title.classList.add('main__title')
  subtitle.classList.add('main__subtitle')

  title.textContent = lang === 'en' ? 'Сongratulations!' : 'Поздравляем!'

  if (score === 30) {
    subtitle.textContent = lang === 'en' ? `You win! You score ${score} out of 30 points!` : `Вы выйграли! Ваш счет ${score} из 30 баллов!`
  } else {
    subtitle.textContent = lang === 'en' ? `You have scored ${score} out of 30 points! Start over?` : `Вы набрали ${score} из 30 баллов! Начать заново?`
  }

  mainInner.append(title)
  mainInner.append(subtitle)
  mainInner.append(startLink)
  

  startLink.addEventListener('click', quiz.startQuiz)

  return mainInner
}

async function loadGalleryPage() {
  const mainInner = document.createElement('div')
  const {lang} = quiz
  const birdsData = quizData[lang].birds

  for (let currentClass in birdsData) {
    const birdsClass = birdsData[currentClass]
    
    birdsClass.forEach(async birdData => {
      const descriprionNode = await createDescription(lang, currentClass, birdData)
      
      mainInner.append(descriprionNode)
    })
  }

  mainInner.classList.add('main__inner')

  return mainInner
}