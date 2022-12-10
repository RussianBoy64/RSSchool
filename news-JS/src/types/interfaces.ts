// API data

interface APIkey {
  apiKey: string;
}

interface IArticle {
  source: IArticleSouce;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}

interface IArticleSouce {
  id: string;
  name: string;
}

interface ISource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

interface IResponseNews {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

interface IResponseSources {
  status: string;
  sources: ISource[];
}

interface IResponseError {
  status: string;
  code: string;
  message: string;
}

interface callBack<T> {
  (data: T): void;
}

export { APIkey, IArticle, IArticleSouce, IResponseNews, IResponseSources, IResponseError, callBack };
