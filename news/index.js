;(() => {
  'use strict'
  class e {
    constructor() {
      ;(this.news = new (class {
        draw(e) {
          const t = e.length >= 10 ? e.filter((e, t) => t < 10) : e,
            r = document.createDocumentFragment(),
            s = document.querySelector('#newsItemTemp')
          t.forEach((e, t) => {
            const o = s.content.cloneNode(!0)
            t % 2 && o.querySelector('.news__item').classList.add('alt'),
              (o.querySelector(
                '.news__meta-photo'
              ).style.backgroundImage = `url(${
                e.urlToImage || 'images/news_placeholder.jpg'
              })`),
              (o.querySelector('.news__meta-author').textContent =
                e.author || e.source.name),
              (o.querySelector('.news__meta-date').textContent = e.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-')),
              (o.querySelector('.news__description-title').textContent =
                e.title),
              (o.querySelector('.news__description-source').textContent =
                e.source.name),
              (o.querySelector('.news__description-content').textContent =
                e.description),
              o.querySelector('.news__read-more a').setAttribute('href', e.url),
              r.append(o)
          }),
            (document.querySelector('.news').innerHTML = ''),
            document.querySelector('.news').appendChild(r)
        }
      })()),
        (this.sources = new (class {
          draw(e) {
            var t
            const r = document.createDocumentFragment(),
              s = document.querySelector('#sourceItemTemp')
            e.forEach((e) => {
              var t
              const o = s.content.cloneNode(!0)
              ;(o.querySelector('.source__item-name').textContent = e.name),
                null === (t = o.querySelector('.source__item')) ||
                  void 0 === t ||
                  t.setAttribute('data-source-id', e.id),
                r.append(o)
            }),
              null === (t = document.querySelector('.sources')) ||
                void 0 === t ||
                t.append(r)
          }
        })())
    }
    drawNews(e) {
      const t = (null == e ? void 0 : e.articles)
        ? null == e
          ? void 0
          : e.articles
        : []
      this.news.draw(t)
    }
    drawSources(e) {
      const t = (null == e ? void 0 : e.sources)
        ? null == e
          ? void 0
          : e.sources
        : []
      this.sources.draw(t)
    }
  }
  new (class {
    constructor() {
      ;(this.controller = new (class extends class extends class {
        constructor(e, t) {
          ;(this.baseLink = e), (this.options = t)
        }
        getResp(
          { endpoint: e, options: t = {} },
          r = () => {
            console.error('No callback for GET response')
          }
        ) {
          this.load('GET', e, r, t)
        }
        errorHandler(e) {
          if (!e.ok)
            throw (
              ((401 !== e.status && 404 !== e.status) ||
                console.log(
                  `Sorry, but there is ${e.status} error: ${e.statusText}`
                ),
              Error(e.statusText))
            )
          return e
        }
        makeUrl(e, t) {
          const r = Object.assign(Object.assign({}, this.options), e)
          let s = `${this.baseLink}${t}?`
          return (
            Object.keys(r).forEach((e) => {
              s += `${e}=${r[e]}&`
            }),
            s.slice(0, -1)
          )
        }
        load(e, t, r, s) {
          fetch(this.makeUrl(s, t), { method: e })
            .then(this.errorHandler)
            .then((e) => e.json())
            .then((e) => r(e))
            .catch((e) => console.error(e))
        }
      } {
        constructor() {
          super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: '0717b9ab45cd496ea9140a51b4f87012',
          })
        }
      } {
        getSources(e) {
          super.getResp({ endpoint: 'sources' }, e)
        }
        getNews(e, t) {
          let r = e.target
          const s = e.currentTarget
          for (; r !== s; ) {
            if (r.classList.contains('source__item')) {
              const e = r.getAttribute('data-source-id')
              return void (
                s.getAttribute('data-source') !== e &&
                (s.setAttribute('data-source', e),
                super.getResp(
                  { endpoint: 'everything', options: { sources: e } },
                  t
                ))
              )
            }
            r = r.parentNode
          }
        }
      })()),
        (this.view = new e())
    }
    start() {
      document
        .querySelector('.sources')
        .addEventListener('click', (e) =>
          this.controller.getNews(e, (e) => this.view.drawNews(e))
        ),
        this.controller.getSources((e) => this.view.drawSources(e))
    }
  })().start()
})()
