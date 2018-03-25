import { Provider } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import { Loading } from 'BizComponent'

import AppWithNavigationState from './navigators'
import store from './store'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppWithNavigationState />
          <Loading />
        </View>
      </Provider>
    )
  }
}
