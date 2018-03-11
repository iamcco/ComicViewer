import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { home } from 'ActionCreators'

const defaultState = fromJS({
})

export default handleActions({
  [home.updateHomePage]: (state, action) => {
    console.log('reducer: ', state, action.payload)
    return state
  }
}, defaultState)
