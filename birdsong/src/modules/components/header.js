import createWrapper from './wrapper'
import createLogo from './logo'

export default async function createHeader() {
  const header = document.createElement('header')
  const wrapper = await createWrapper()
  const headerInner = document.createElement('div')
  const logo = await createLogo()

  header.classList.add('header')
  headerInner.classList.add('header__inner')

  header.append(wrapper)
  wrapper.append(headerInner)
  headerInner.append(logo)

  return header
}
