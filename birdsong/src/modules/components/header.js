import createWrapper from './wrapper'

export default async function createHeader() {
  const header = document.createElement('header')
  const wrapper = await createWrapper()
  const headerInner = document.createElement('div')

  header.classList.add('header')

  header.append(wrapper)

  return header
}
