export default async function createLink(href, text, className = 'link') {
  const link = document.createElement('a')

  link.classList.add(className)

  link.href = href
  link.textContent = text

  return link
}
