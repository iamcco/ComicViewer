import { Provider } from 'react-redux'
import React, { Component } from 'react'

import store from './store'
import AppWithNavigationState from './navigators'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
