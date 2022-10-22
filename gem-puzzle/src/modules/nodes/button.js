export default async function createBtn(
  className = '',
  text = '',
  isDisabled = false
) {
  const button = document.createElement('button')
  button.classList.add('btn')
  button.classList.add(className)
  button.textContent = text
  button.disabled = isDisabled

  return button
}
