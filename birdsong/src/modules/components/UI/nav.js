import createLink from './link'

export default async function createNav() {
  const nav = document.createElement('nav')
  const navList = document.createElement('ul')
  const mainPageLink = await createLink('./', '_blank', 'Main', 'nav__link')
  const quizLink = await createLink('./quiz', '_blank', 'Quiz', 'nav__link')

  return nav
}
