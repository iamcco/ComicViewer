import {
  combineReducers
} from 'redux'

import nav from './nav'
import home from './home'
import comic from './comic'

export default combineReducers({
  nav,
  home,
  comic
})
