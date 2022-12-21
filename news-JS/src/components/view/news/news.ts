/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import { Article } from '../../../types/interfaces';

class News {
  public draw(data: Array<Article>) {
    const news: Array<Article> = data.length >= 10 ? data.filter((_item: Article, index: number) => index < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp')!;

    news.forEach((item: Article, index: number) => {
      const newsClone: HTMLElement = newsItemTemp!.content.cloneNode(true) as HTMLElement;

      if (index % 2) {
        const newItem: HTMLDivElement = newsClone.querySelector('.news__item')!;
        newItem.classList.add('alt');
      }

      newsClone.querySelector<HTMLDivElement>('.news__meta-photo')!.style.backgroundImage = `url(${
        item.urlToImage || 'images/newsplaceholder.jpg'
      })`;
      newsClone.querySelector<HTMLLIElement>('.news__meta-author')!.textContent = item.author || item.source.name;
      newsClone.querySelector<HTMLLIElement>('.news__meta-date')!.textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      newsClone.querySelector<HTMLHeadingElement>('.news__description-title')!.textContent = item.title;
      newsClone.querySelector<HTMLHeadingElement>('.news__description-source')!.textContent = item.source.name;
      newsClone.querySelector<HTMLParagraphElement>('.news__description-content')!.textContent = item.description;
      newsClone.querySelector<HTMLAnchorElement>('.news__read-more a')!.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    document.querySelector<HTMLDivElement>('.news')!.innerHTML = '';
    document.querySelector<HTMLDivElement>('.news')!.appendChild(fragment);
  }
}

export default News;
