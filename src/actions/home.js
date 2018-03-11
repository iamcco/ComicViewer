import { createActions } from 'redux-actions'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import { Request } from 'Utils'
import jsdom from 'jsdom-jscore-rn'

const actionCreators = createActions({
},
'UPDATE_HOME_PAGE',
'FETCH_HOME_PAGE'
)

const fetchHomePage = (action$) => {
  return action$.ofType(actionCreators.fetchHomePage)
    .switchMap(action => {
      return Observable.fromPromise(Request.get({
        uri: '/'
      })).switchMap(res => {
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
        const data = {
          hotComic: win.document.querySelectorAll('#ConmmandComicTab1_Content0 li'),
          owaliComic: win.document.querySelectorAll('#ConmmandComicTab1_Content1 li'),
          newComic: win.document.querySelectorAll('#ConmmandComicTab1_Content2 li')
        }
        Object.keys(data).forEach(key => {
          if (data[key]) {
            data[key] = Array.from(data[key]).map(item => {
              const url = item.querySelector('a')
              const image = item.querySelector('img')
              const name = item.querySelector('i')
              // TODO: try/catch
              return {
                url: (url && url.href) || '',
                image: (image && image.src) || '',
                name: name.textContent || ''
              }
            })
          }
        })
        return actionCreators.updateHomePage(data)
      }).catch((e) => {
        console.log(e)
        return Observable.of({ type: 'xxxxx' })
      })
    })
}

export const epic = combineEpics(fetchHomePage)

export default actionCreators
