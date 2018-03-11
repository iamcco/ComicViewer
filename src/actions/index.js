/*
 * @providesModule ActionCreators
*/

import { combineEpics } from 'redux-observable'

import { epic as homeEpic } from './home'

export { default as home } from './home'

export const rootEpic = combineEpics(homeEpic)
