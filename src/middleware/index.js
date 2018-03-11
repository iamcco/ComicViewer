import { createEpicMiddleware } from 'redux-observable'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import { rootEpic } from '../actions'

const epicMiddleware = createEpicMiddleware(rootEpic)

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

export const addListener = createReduxBoundAddListener('root')

export default [epicMiddleware, navMiddleware]
