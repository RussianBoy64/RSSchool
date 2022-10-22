import createWrapper from './wrapper'

export default async function createFooterNode() {
  // create footer
  const footer = document.createElement('footer')
  footer.classList.add('footer')

  // create wrapper
  const wrapper = createWrapper()

  // create author-info
  const authorInfo = document.createElement('div')
  authorInfo.classList.add('author-info')

  // collect schoolColumn
  const schoolColumn = document.createElement('div')
  const schoolLink = document.createElement('a')
  const schoolLogo = document.createElement('img')

  schoolColumn.classList.add('author-info__item')
  schoolLink.href = 'https://rs.school/js/'
  schoolLogo.src = 'https://rs.school/images/rs_school_js.svg'
  schoolLogo.alt = 'RS School'

  schoolLink.append(schoolLogo)
  schoolColumn.append(schoolLink)

  // collect yearColumn
  const yearColumn = document.createElement('div')
  const yearText = document.createElement('span')

  yearColumn.classList.add('author-info__item')
  yearText.textContent = '2022'

  yearColumn.append(yearText)

  // collect authorColumn
  const authorColumn = document.createElement('div')
  const authorLinkContainer = document.createElement('div')
  const authorLink = document.createElement('a')
  const gitHubIcon = document.createElement('i')

  authorColumn.classList.add('author-info__item')
  authorLinkContainer.classList.add('github-link')
  authorLink.href = 'https://github.com/RussianBoy64'
  authorLink.textContent = 'RussianBoy64'
  gitHubIcon.classList.add('fa-brands')
  gitHubIcon.classList.add('fa-github')
  gitHubIcon.classList.add('github-icon')

  authorLink.prepend(gitHubIcon)
  authorLinkContainer.append(authorLink)
  authorColumn.append(authorLinkContainer)

  // collect footer
  authorInfo.append(schoolColumn)
  authorInfo.append(yearColumn)
  authorInfo.append(authorColumn)
  wrapper.append(authorInfo)
  footer.append(wrapper)

  return footer
}
