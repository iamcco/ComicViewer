/*
 * @providesModule ActionCreators
*/

import { combineEpics } from 'redux-observable'

import { epic as homeEpic } from './home'
import { epic as comicEpic } from './comic'

export { default as home } from './home'
export { default as comic } from './comic'

export const rootEpic = combineEpics(homeEpic, comicEpic)
