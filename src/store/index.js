import {
  createStore,
  applyMiddleware
} from 'redux'
import appReducer from '../reducers'
import middleware from '../middleware'

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
)
