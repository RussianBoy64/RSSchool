export default async function createLogo() {
  const logo = document.createElement('div')
  const logoImg = document.createElement('img')
  const logoText = document.createElement('span')

  logo.classList.add('logo')
  logoImg.classList.add('logo__img')
  logoText.classList.add('logo__text')

  logoImg.src = '../../assets/logo.png'
  logoImg.alt = 'application logo'
  logoText.textContent = 'Birdsong'

  logo.append(logoImg)
  logo.append(logoText)

  return logo
}
