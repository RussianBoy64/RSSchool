// API data

type Endpoint = 'sources' | 'everything';

enum RequestMethod {
  get = 'GET',
}

interface Options {
  [key: string]: string;
}

interface ResponceSettings {
  endpoint: Endpoint;
  options?: Options;
}

interface Article {
  source: ArticleSource;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}

interface ArticleSource {
  id: string;
  name: string;
}

interface Source {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

interface ResponseNews {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface ResponseSources {
  status: string;
  sources: Source[];
}

interface ResponseError {
  status: string;
  code: string;
  message: string;
}

export {
  Endpoint,
  RequestMethod,
  Options,
  ResponceSettings,
  Article,
  ArticleSource,
  ResponseNews,
  ResponseSources,
  ResponseError,
};
