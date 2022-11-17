import createWrapper from './wrapper'
import createLogo from './logo'
import createNav from './UI/nav'

export default async function createHeader(lang) {
  const header = document.createElement('header')
  const wrapper = await createWrapper()
  const logo = await createLogo()
  const nav = await createNav(lang)

  header.classList.add('header')
  wrapper.classList.add('header__inner')

  header.append(wrapper)
  wrapper.append(logo)
  wrapper.append(nav)

  return header
}
