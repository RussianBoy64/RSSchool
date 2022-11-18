import quiz from '../../Quiz'

import createHeader from '../header';

export default async function createLangControl(lang) {
    const langContolWrapper = document.createElement('form');
    const enRadio = await createRadio('langControl', 'en', 'en', lang === 'en')
    const ruRadio = await createRadio('langControl', 'ru', 'ru', lang === 'ru')
    const enLabel = await createLabel('en', 'en')
    const ruLabel = await createLabel('ru', 'ru')
    const delimeter = document.createElement('span')

    langContolWrapper.classList.add('lang__wrapper')

    delimeter.textContent = '/'

    langContolWrapper.append(enRadio)
    langContolWrapper.append(enLabel)
    langContolWrapper.append(delimeter)
    langContolWrapper.append(ruRadio)
    langContolWrapper.append(ruLabel)

    langContolWrapper.addEventListener('change', setLanguage)
    
    return langContolWrapper
}

async function createRadio(name, id, value, checked) {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.id = id;
    radio.value = value;
    radio.checked = checked;

    radio.classList.add('lang__radio')

    return radio
}

async function createLabel(id, text) {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = text;

    label.classList.add('lang__label')

    return label
}

async function setLanguage(event) {
    event.preventDefault()


    const lang = event.target.value
    quiz.lang = lang

    const headerCurrent = document.querySelector('.header');
    const headerTranslated = await createHeader(quiz.lang)
    
    headerCurrent.replaceWith(headerTranslated)

    // const textsNodes = document.querySelectorAll('[data-text]')
    // console.log(textsNodes)

    // textsNodes.forEach((textNode) => {
    //   const text = textNode.dataset.text
    //   textNode.textContent = data[this.lang]
    // })
  }