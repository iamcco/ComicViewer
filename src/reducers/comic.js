import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { comic } from 'ActionCreators'

const defaultState = fromJS({
  /*
   * {
   *    id: <string> category id
   *    title: <string> category title,
   *    url: <string> category url,
   * }
  */
  categories: [],
  /*
   * {
   *    id: <string> category id
   *    list: [
   *        {
   *            id: <string> comic id
   *            url: <string> page url
   *            image: <string> image url
   *            name: <string> name
   *        }
   *        ...
   *    ],
   * }
  */
  comics: {},
  /*
   * name: <string> comic name
   * image: <string> image url
   * author: <string> author
   * updateTime: <string> update time
   * status: <string> comic's status
   * totalChapter: <number> comic's total chapters
   * description: <string>
   * chapters: [
   *    {
   *        name: <string> chapter name
   *        url: <string> chapter page url
   *    }
   * ]
  */
  comicDetail: {},
  /*
   * {
   *    id: <string> comic id
   *    url: <string> comic page url
   *    image: <string> image url
   *    name: <string> comic name
   * }
  */
  slides: [],
  /*
   * {
   *    name: <string> type name
   *    comicList: [
   *        {
   *            id: <string> comic id
   *            url: <string> comic page url
   *            image: <string> image url
   *            name: <string> comic name
   *        }
   *    ]
   * }
  */
  hotComics: []
})

export default handleActions({
  [comic.updateComics]: (state, action) => {
    const data = action.payload || {}
    return state.withMutations(map => {
      Object.keys(data).forEach(key => {
        map = map.set(key, fromJS(data[key]))
      })
    })
  }
}, defaultState)
