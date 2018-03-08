import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Hello ComicViewer</Text>
      </View>
    )
  }
}
