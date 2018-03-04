import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Hello ComicViewer</Text>
      </View>
    )
  }
}
