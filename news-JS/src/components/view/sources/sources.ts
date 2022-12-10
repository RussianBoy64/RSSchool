import './sources.css';
import { IArticleSouce } from '../../../types/interfaces';

class Sources {
  draw(data: IArticleSouce[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp')!;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp!.content.cloneNode(true) as Element;

      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment);
  }
}

export default Sources;
