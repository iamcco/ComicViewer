import { createActions } from 'redux-actions'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import { Request } from 'Utils'
import jsdom from 'jsdom-jscore-rn'
import { Loading } from 'BizComponent'

const { LoadingHandler } = Loading

// 首页漫画类别 ID
const HOT_COMIC_LIST = [
  {
    id: '#ConmmandComicTab1_Content0 li',
    name: '热门连载漫画'
  }, {
    id: '#ConmmandComicTab1_Content1 li',
    name: '经典完结漫画'
  }, {
    id: '#ConmmandComicTab1_Content2 li',
    name: '最新上架漫画'
  }
]

// 漫画分类 ID
const CATEGORY_LIST = [
  '#nav li a',
  '#mini_nav a'
]

// comic slide id
const COMIC_SLIDE_ID = '#digit_index_co .digit_index_co_l a'

const actionCreators = createActions({
},
'UPDATE_COMICS',
'FETCH_CATEGORIES'
)

// https://bdd.zgxhxxmh.com/photo/120x168/20180325124420304.jpg
// => https://bdd.zgxhxxmh.com/photo/20180325124420304.jpg
const resolveImageUrl = (url = '') => {
  return url.replace(/\d+x\d+\//, '')
}

// 通过漫画主页 url 获取漫画 ID，example: /colist_241700.html
const getComicIdByPageUrl = (url = '') => {
  return url.replace(/[^\d]/g, '')
}

// 获取热门漫画数据
const getHotComicsByDom = ({ document }) => HOT_COMIC_LIST.map((type) => {
  let comicList = []
  const nodeList = document.querySelectorAll(type.id)
  if (nodeList) {
    comicList = Array.from(nodeList).map(node => {
      const aTag = node.querySelector('a')
      const imgTag = node.querySelector('img')
      const iTag = node.querySelector('i')
      const url = (aTag && aTag.href) || ''

      return {
        id: getComicIdByPageUrl(url),
        url,
        image: resolveImageUrl(imgTag && imgTag.src),
        name: iTag.textContent || ''
      }
    })
  }
  return {
    name: type.name,
    comicList
  }
})

// 获取漫画分类数据
const getCategoriesByDom = ({ document }) => CATEGORY_LIST.reduce((pre, next) => {
  const nodeList = document.querySelectorAll(next.id)
  if (nodeList) {
    return pre.concat(Array.from(nodeList).map((node) => ({
      url: node.href,
      id: (node.href || '').split('/')[1] || '',
      name: node.textContent
    })))
  }
  return pre
}, [])

// 获取轮播漫画
const getSlideByDom = ({ document }) => {
  const nodeList = document.querySelectorAll(COMIC_SLIDE_ID)
  if (nodeList) {
    return Array.from(nodeList).map(node => {
      const url = node.href || ''
      const tagImage = node.querySelector('img')
      return {
        id: getComicIdByPageUrl(url),
        url,
        image: resolveImageUrl(tagImage && tagImage.src),
        name: node.textContent
      }
    })
  }
  return []
}

// 获取漫画数据
const fetchCategories = (action$) => {
  return action$.ofType(actionCreators.fetchCategories)
    .do(LoadingHandler.show)
    .switchMap(action => {
      return Observable.fromPromise(Request.get({uri: '/'}))
        .do(LoadingHandler.hide)
        .switchMap(res => {
          if (res.status === 0) {
            return Observable.fromPromise(new Promise((resolve, reject) => {
              jsdom.env(res.data, (err, win) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(win)
                }
              })
            }))
          } else {
            throw res
          }
        }).map(win => {
          return actionCreators.updateComics({
            categories: getCategoriesByDom(win),
            hotComics: getHotComicsByDom(win),
            slides: getSlideByDom(win)
          })
        }).catch((e) => {
          console.log(e)
          return Observable.of({ type: 'xxxxx' })
        })
    })
}

export const epic = combineEpics(fetchCategories)

export default actionCreators
