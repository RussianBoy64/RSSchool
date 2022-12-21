/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ResponseNews, ResponseSources } from '../../types/interfaces';

class App {
  public controller: AppController;
  public view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document
      .querySelector<HTMLDivElement>('.sources')!
      .addEventListener('click', (event) =>
        this.controller.getNews<ResponseNews>(event, (data) => this.view.drawNews(data))
      );
    this.controller.getSources<ResponseSources>((data) => this.view.drawSources(data));
  }
}

export default App;
