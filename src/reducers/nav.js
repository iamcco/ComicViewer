import { RootNavigator, initialRouteName } from '../navigators'

// init router state
const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(initialRouteName))

export default (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
