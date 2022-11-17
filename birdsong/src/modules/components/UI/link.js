export default async function createLink(
  href,
  target = '_blank',
  text,
  className = 'link'
) {
  const link = document.createElement('a')

  link.classList.add(className)

  link.href = href
  link.target = target
  link.textContent = text

  return link
}
