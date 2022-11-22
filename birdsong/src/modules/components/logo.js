export default async function createLogo() {
  const logo = document.createElement('a')
  const logoImg = document.createElement('img')
  const logoText = document.createElement('span')

  logo.classList.add('logo')
  logoImg.classList.add('logo__img')
  logoText.classList.add('logo__text')

  logo.href = './'
  logoImg.src = '../../assets/logo.png'
  logoImg.alt = 'application logo'
  logoText.textContent = 'Birdsong'

  logo.append(logoImg)
  logo.append(logoText)

  return logo
}
