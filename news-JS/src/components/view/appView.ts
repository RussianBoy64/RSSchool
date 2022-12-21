import News from './news/news';
import Sources from './sources/sources';
import { Article, ArticleSource, ResponseNews, ResponseSources } from '../../types/interfaces';

export class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ResponseNews) {
    const values: Article[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: ResponseSources) {
    const values: ArticleSource[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
