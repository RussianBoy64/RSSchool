/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources<T>(callback: (data: T) => void): void {
    super.getResp<T>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews<T>(event: Event, callback: (data: T) => void) {
    let target = event.target as HTMLElement;
    const newsContainer = event.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id')!;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId!);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
