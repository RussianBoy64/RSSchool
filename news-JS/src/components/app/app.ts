/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
      .addEventListener('click', (event) => this.controller.getNews(event, (data) => this.view.drawNews(data)));
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
