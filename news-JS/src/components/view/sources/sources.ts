/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import { ArticleSource } from '../../../types/interfaces';

class Sources {
  public draw(data: Array<ArticleSource>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp')!;

    data.forEach((item: ArticleSource) => {
      const sourceClone = sourceItemTemp!.content.cloneNode(true) as Element;

      sourceClone.querySelector<HTMLSpanElement>('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector<HTMLDivElement>('.source__item')?.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector<HTMLDivElement>('.sources')?.append(fragment);
  }
}

export default Sources;
