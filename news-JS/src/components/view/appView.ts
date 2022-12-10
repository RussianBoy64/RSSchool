import News from './news/news';
import Sources from './sources/sources';
import { IArticle, IArticleSouce, IResponseNews, IResponseSources } from '../../types/interfaces';

export class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: IResponseNews) {
    const values: IArticle[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: IResponseSources) {
    const values: IArticleSouce[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
