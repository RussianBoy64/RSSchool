/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import { IArticleSouce } from '../../../types/interfaces';

class Sources {
  public draw(data: Array<IArticleSouce>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp')!;

    data.forEach((item: IArticleSouce) => {
      const sourceClone = sourceItemTemp!.content.cloneNode(true) as Element;

      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
