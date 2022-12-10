import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '0717b9ab45cd496ea9140a51b4f87012',
    });
  }
}

export default AppLoader;
