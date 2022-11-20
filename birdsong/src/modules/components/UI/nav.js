import createLink from './link'
import quizData from '../../../data/quizData'
import quiz from '../../Quiz'

export default async function createNav(lang) {
  const nav = document.createElement('nav')
  const navList = document.createElement('ul')
  const linksData = quizData[lang]['links']

  nav.classList.add('nav')
  navList.classList.add('nav__list')

  // create links
  for (let linkName in linksData) {
    const { href, text, className } = linksData[linkName]
    const link = await createLink(href, text, className)
    const li = document.createElement('li')

    li.classList.add('list__item')
    li.append(link)
    navList.append(li)

    if (linkName === 'quiz') {
      link.addEventListener('click', quiz.startQuiz)
    }
  }

  nav.append(navList)

  return nav
}
