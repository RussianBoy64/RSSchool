import createWrapper from './wrapper'

export default async function createHeaderNode() {
  // create header
  const header = document.createElement('header')
  header.classList.add('header')

  // create wrapper
  const wrapper = createWrapper()

  // create headerInner
  const headerInner = document.createElement('div')
  headerInner.classList.add('header__inner')

  // create headerLogo
  const headerLogo = document.createElement('div')
  const logoImg = document.createElement('img')
  const title = document.createElement('h1')

  headerLogo.classList.add('header__logo')
  logoImg.src = './assets/logo.png'
  logoImg.alt = 'app logo'
  title.textContent = 'Gem-puzzle'

  // create settingsBtn
  const settingsBtn = document.createElement('i')
  settingsBtn.classList.add('fa-solid')
  settingsBtn.classList.add('fa-gear')
  settingsBtn.classList.add('settings__btn')

  // collect header

  headerLogo.append(logoImg)
  headerLogo.append(title)

  headerInner.append(headerLogo)
  headerInner.append(settingsBtn)

  wrapper.append(headerInner)

  header.append(wrapper)

  return header
}
